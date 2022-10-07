<template>
  <div :class="classes">
    <PaymentTitle
      class="amount__title"
      type="h3_g"
      html="Enter the payment amount"
      emoji="&#128591;"
      layout="c"
    />
    <PaymentTitle
      class="amount__subtitle"
      type="h3"
      html="How much would you pay?"
      layout=""
    />
    <PaymentForm class="amount__form">
      <input
        v-model="legalCurrencyAmount"
        class="price"
        type="text"
        placeholder="0"
      />
      <div class="selectwrap">
        <PaymentIcon :path="selectedCurrencyIcon" />
        <select name="currency" v-model="selectedCurrency">
          <option
            v-for="(currency, key) in currencies"
            :value="currency.name"
            :key="key"
          >
            {{ currency.name }}
          </option>
        </select>
      </div>
    </PaymentForm>
    <PaymentAmountBilled
      class="amount__bill"
      :symbol="receiveTokenSymbol"
      :icon="receiveTokenIcon"
      :price="exchangedAmount"
      :priceClass="{ inactive: requireUpdateExchange }"
    />
    <div class="amount__pay">
      <PaymentTitle
        class="amount__pay__title"
        v-if="!requireUpdateExchange"
        type="h3"
        html="Payment with Web3 Wallet"
        layout="c"
      />
      <PaymentAction
        class="amount__pay__action"
        v-if="requireUpdateExchange"
        icon="attention"
        text="Price Updated"
      >
        <PaymentButton
          text="Accept"
          size="s"
          @click.native="updateExchangeData()"
        />
      </PaymentAction>

      <PaymentButton
        class="amount__pay__button"
        size="l"
        text="Go Payment"
        icon="logo-icon"
        :color="
          requireUpdateExchange || isInvalidAmount ? 'inactive' : 'primary'
        "
        :loading="loading"
        @click.native="next"
      />
    </div>
  </div>
</template>

<script>
import { Decimal } from 'decimal.js'
import PaymentAmountBilled from '@/components/organisms/Payment/AmountBilled'
import PaymentTitle from '@/components/organisms/Payment/Title'
import PaymentForm from '@/components/organisms/Payment/Form'
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentAction from '@/components/organisms/Payment/Action'
import PaymentIcon from '@/components/organisms/Payment/Icon'
import { errorCodeList } from '@/enum/error_code'
import { CURRENCIES } from '@/constants'

export default {
  name: 'PaymentAmount',
  props: {
    progressTotalSteps: Number,
    progressCompletedSteps: Number
  },
  data() {
    return {
      loading: false,
      requireUpdateExchange: false,
      legalCurrencyAmount: null,
      selectedCurrency: null,
      exchangedAmount: 0,
      exchangeRate: null,
      exchangeMarginRate: null,
      exchangeTimer: null,
      receiveTokenIcons: {
        USDT: 'usdt',
        USDC: 'usdc',
        DAI: 'dai',
        JPYC: 'jpyc',
        WETH: 'eth'
      }
    }
  },
  components: {
    PaymentAmountBilled,
    PaymentButton,
    PaymentTitle,
    PaymentForm,
    PaymentAction,
    PaymentIcon
  },
  watch: {
    legalCurrencyAmount: function () {
      this.calculationExchange()
    },
    selectedCurrency: function (currency) {
      this.updateExchangeData(currency)
    }
  },
  computed: {
    receiveTokenSymbol() {
      return this.$store.state.payment.symbol
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[this.$store.state.payment.symbol]
    },
    currencies() {
      let list = {}
      Object.entries(this.$store.state.payment.allowCurrencies).forEach(
        ([key, value]) => {
          if (value) {
            list[key] = CURRENCIES[key]
          }
        }
      )
      return list
    },
    selectedCurrencyName() {
      return CURRENCIES[this.selectedCurrency].name
    },
    selectedCurrencyIcon() {
      return CURRENCIES[this.selectedCurrency].iconPath
    },
    classes() {
      let array = { amount: true }
      return array
    },
    isInvalidAmount() {
      return Decimal(this.exchangedAmount).lessThan('0.000001')
    }
  },
  methods: {
    calculationExchange() {
      if (this.legalCurrencyAmount && this.exchangeRate) {
        this.exchangedAmount = Decimal.div(
          this.legalCurrencyAmount,
          this.exchangeRate
        )
          .toDP(6, Decimal.ROUND_CEIL)
          .toString()
      }
    },
    updateDefaultCurrency() {
      this.selectedCurrency = Object.values(this.currencies)[0].name
    },
    updateExchangeData(currency = null) {
      if (currency === null) currency = this.selectedCurrency
      this.apiGetExchangeRate(currency)
        .then((response) => {
          this.exchangeRate = response.data.include_margin_rate
          this.exchangeMarginRate = response.data.margin_rate
          if (this.legalCurrencyAmount) this.calculationExchange()
          this.requireUpdateExchange = false
          this.exchangeTimer = setTimeout(() => {
            this.requireUpdateExchange = true
            clearTimeout(this.exchangeTimer)
          }, 60000)
          this.$emit('incrementProgressCompletedSteps')
          setTimeout(() => {
            this.$emit('updateInitializingStatus', false)
          }, 1500)
        })
        .catch((error) => {
          let message
          if ('errors' in error.response.data) {
            message = errorCodeList[error.response.data.errors.shift()].msg
          } else {
            message = 'Please try again after a while.'
          }
          this.showErrorModal(message)
        })
    },
    apiGetExchangeRate(currency) {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/exchange'
      const params = new URLSearchParams([
        ['payment_token', this.$route.params.token],
        ['legal_currency', currency]
      ])
      return this.axios.get(url, { params })
    },
    apiUpdateTransaction() {
      const url =
        process.env.VUE_APP_API_BASE_URL + '/api/v1/payment/transaction'
      const params = {
        payment_token: this.$route.params.token,
        base_currency: CURRENCIES[this.selectedCurrency].name,
        base_amount: this.legalCurrencyAmount,
        exchanged_amount: this.exchangedAmount,
        rate: this.exchangeRate,
        margin_rate: this.exchangeMarginRate,
      };
      return this.axios.patch(url, params, { withCredentials: true });
    },
    next() {
      if (this.requireUpdateExchange || this.isInvalidAmount) return
      this.loading = true
      this.apiUpdateTransaction()
        .then(() => {
          this.$store.dispatch('payment/updateAmount', this.exchangedAmount)
          this.$router.replace({
            path: 'wallets/' + this.$route.params.token
          })
        })
        .catch((error) => {
          let message

          if (error.response.status === 400) {
            message = errorCodeList[error.response.data.errors.shift()].msg
          } else {
            message = 'Please try again after a while.'
          }
          this.loading = false
          this.showErrorModal(message)
        })
    },
    showErrorModal(message) {
      this.$store.dispatch('modal/show', {
        target: 'error-modal',
        size: 'small',
        params: {
          message: message
        }
      })
    }
  },
  created() {
    this.updateDefaultCurrency()
    this.updateExchangeData(this.selectedCurrency)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.amount {
  &__title {
    margin-bottom: 2rem;
  }
  &__subtitle {
    margin-bottom: 0.5rem;
  }
  &__form {
    margin-bottom: 2rem;
    .selectwrap {
      @include flex(flex-start, center);
      flex-wrap: nowrap;
      width: auto;
      padding-left: 1rem;
      border-left: 1px solid var(--Border);
      .svg {
        width: 2.5rem;
        height: 2.5rem;
      }
      select {
        flex: 1;
      }
    }
  }
  &__bill {
    margin-bottom: 4rem;
  }
  &__pay {
    &__title {
      margin-bottom: 2rem;
    }
    &__action {
      margin-bottom: 1rem;
    }
    &__button {
      margin: 1rem;
    }
  }
}
</style>
