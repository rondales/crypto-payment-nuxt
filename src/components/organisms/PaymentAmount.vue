<template>
  <div :class="classes">
    <!-- <PaymentTitle
      class="amount__title"
      type="h3_g"
      html="Enter the payment amount"
      emoji="&#128591;"
      layout="c"
    /> -->
    <div class="amount__title">
      <img class="image" src="@/assets/images/logo-icon.svg" />
      <p class="amount__subtitle"><span>How much would you pay?</span></p>
    </div>
    <div class="amount__form">
      <div class="selectwrap">
        <PaymentIcon :path="selectedCurrencyIcon" />
        <select name="currency" v-model="selectedCurrency">
          <option
            v-for="(currency, key) in currencies"
            class="non-translate"
            :value="currency.name"
            :key="key"
          >
            {{ currency.name }}
          </option>
        </select>
      </div>
      <div class="inputwrap">
        <input
          v-model="legalCurrencyAmount"
          class="price"
          type="number"
          inputmode="decimal"
          placeholder="0"
        />
        <span>{{ selectedCurrency }}</span>
      </div>
    </div>
    <!-- <PaymentAmountBilled
      class="amount__bill"
      :symbol="receiveTokenSymbol"
      :icon="receiveTokenIcon"
      :price="exchangedAmount"
      :priceClass="{ inactive: requireUpdateExchange }"
    /> -->
    <div class="amount__pay">
      <!-- <PaymentTitle
        class="amount__pay__title"
        v-if="!requireUpdateExchange"
        type="h3"
        html="Payment with Web3 Wallet"
        layout="c"
      /> -->
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
        :text="'Pay ' + receiveTokenSymbol + ' ' + exchangedAmount"
        icon="logo-icon"
        :color="
          requireUpdateExchange || isInvalidAmount ? 'inactive' : 'primary'
        "
        :loading="loading"
        @click.native="next"
      />
      <PaymentVia
        class="amount__pay__via"
        :text="receiveTokenSymbol + ' ' + exchangedAmount"
        :icon="false"
      />
    </div>
  </div>
</template>

<script>
import { Decimal } from 'decimal.js'
// import PaymentAmountBilled from '@/components/organisms/Payment/AmountBilled'
// import PaymentForm from '@/components/organisms/Payment/Form'
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentAction from '@/components/organisms/Payment/Action'
import PaymentIcon from '@/components/organisms/Payment/Icon'
import PaymentVia from '@/components/organisms/Payment/Via'
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
        USDT: 'crypto_currency/received_token/usdt',
        USDC: 'crypto_currency/received_token/usdc',
        DAI: 'crypto_currency/received_token/dai',
        JPYC: 'crypto_currency/received_token/jpyc',
        WETH: 'crypto_currency/received_token/weth'
      }
    }
  },
  components: {
    // PaymentAmountBilled,
    PaymentButton,
    // PaymentForm,
    PaymentAction,
    PaymentIcon,
    PaymentVia
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
      } else {
        this.exchangedAmount = 0
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
        margin_rate: this.exchangeMarginRate
      }
      return this.axios.patch(url, params, { withCredentials: true })
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
    @include flex(flex-start, center);
    margin-bottom: 3rem;
    gap: 1rem;
    .svg,
    .image {
      width: 3rem;
      height: 3rem;
    }
  }
  &__subtitle {
    // margin-bottom: 0.5rem;
    @include font(1.2rem, 600, $ls, $lh, $en_go);
    text-align: center;
    span {
      display: inline-block;
      text-align: left;
    }
    @include media(sp) {
      font-size: 1.5rem;
    }
  }
  &__form {
    margin-bottom: 2rem;
    $formh: 2rem;
    .price {
      -moz-appearance: textfield;
      min-width: 0;
    }
    .price::-webkit-outer-spin-button,
    .price::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .inputwrap {
      border-bottom: 1px solid var(--Text);
      @include flex(flex-start, baseline);
      @include font(1.44rem, 400, $ls, 1, $en_go);
      padding-bottom: 0.5rem;
      // margin-bottom: 1rem;
      input {
        @include font(2.074rem, 600, $ls, 1, $en_go);
        padding: 0rem 0.5rem;
        display: block;

        flex: 1;
        text-align: right;
        @include media(sp) {
          // padding: 0.3rem 0.5rem;
          // font-size: rem_sp(1);
        }
      }
    }

    .selectwrap {
      @include flex(flex-start, center);
      // flex-wrap: nowrap;
      // width: auto;
      // padding-left: 1rem;
      // border-left: 1px solid var(--Border);
      // display: block;
      // width: 100%;
      position: relative;
      margin-bottom: 3rem;

      @include media(pc) {
        &:hover {
          &::after {
            background-color: var(--Text);
            color: var(--Base);
          }
        }
      }
      .svg {
        width: 1.8rem;
        height: 1.8rem;
      }
      &::after {
        content: 'Currency Change';
        position: relative;
        z-index: 1;
        position: absolute;
        right: 0;
        top: 50%;
        @include font(10px, 500, 0.04em, 2, $en_go);
        border: 1px solid var(--Border);
        padding: 0 1rem;
        border-radius: 3rem;
        transform-origin: center center;
        transform: translateY(-50%);
        transition: background-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
          color 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      }
      select {
        position: relative;
        z-index: 10;
        appearance: none;
        // text-align: center;
        padding: 0rem 0.5rem;
        flex: 1;
        @include font(rem(1), 600, $ls, $formh, $en_go);
        @include media(sp) {
          font-size: rem_sp(1);
        }
      }
    }
  }
  &__bill {
    margin-bottom: 1rem;
  }
  &__pay {
    // &__title {
    //   margin-bottom: 2rem;
    // }
    &__action {
    }
    &__button {
      margin-top: 2rem;
    }
    &__via {
      margin-top: 1rem;
      display: none;
    }
  }
}
</style>
