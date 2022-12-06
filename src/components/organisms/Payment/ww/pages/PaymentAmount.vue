<template>
  <div :class="classes">
    <div class="amount__title">
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
      <div class="inputwrap non-translate">
        <input
          class="price"
          inputmode="decimal"
          placeholder="0"
          v-model="legalCurrencyAmount"
          @input="formatFiatAmount"
          @focus="formatFiatAmount"
          @blur="formatFiatAmount"
        />
        <span>{{ selectedCurrency }}</span>
      </div>
    </div>
    <div class="amount__pay">
      <PaymentButton
        class="amount__pay__button non-translate"
        size="l"
        :text="'Pay ' + receiveTokenSymbol + ' ' + exchangedAmount"
        icon="logo-icon"
        :color="isInvalidAmount ? 'inactive' : 'primary'"
        :loading="loading"
        @click.native="next"
      />
    </div>
  </div>
</template>

<script>
import { Decimal } from 'decimal.js'
import PaymentButton from '@/components/organisms/Payment/ww/fragments/Button'
import PaymentIcon from '@/components/organisms/Payment/ww/fragments/Icon'
import { errorCodeList } from '@/enum/error_code'
import { CURRENCIES } from '@/constants'

export default {
  name: 'ww-PaymentAmount',
  props: {
    progressTotalSteps: Number,
    progressCompletedSteps: Number
  },
  data() {
    return {
      loading: false,
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
    PaymentButton,
    PaymentIcon
  },
  watch: {
    selectedCurrency() {
      clearInterval(this.exchangeTimer)
      this.updateExchangeData()
    }
  },
  computed: {
    RATE_UPDATE_INTERVAL() {
      return 60000
    },
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
    formatFiatAmount(event) {
      if (
        this.legalCurrencyAmount === null ||
        this.legalCurrencyAmount === ''
      ) {
        this.calculationExchange()
        return
      }
      if (event.type === 'input') {
        let amount = this.legalCurrencyAmount.replace(/[^0-9.,]/gi, '')
        if (event.data === ',') {
          amount = amount.replace(/,/gi, '.')
        }
        if (event.data === '.' && (amount.match(/\./gi) || []).length > 1) {
          amount = amount.slice(0, -1)
        }
        let explodeAmount = amount.split('.')
        if (explodeAmount.length > 1) {
          explodeAmount[1] = explodeAmount[1].slice(0, 2)
          amount = explodeAmount.join('.')
        }
        this.legalCurrencyAmount = amount
        this.calculationExchange()
        return
      }
      if (event.type === 'focus') {
        this.legalCurrencyAmount = Decimal(
          this.legalCurrencyAmount.replace(/,/gi, '')
        ).toString()
        return
      }
      if (event.type === 'blur') {
        this.legalCurrencyAmount = Decimal(
          this.legalCurrencyAmount.replace(/,/gi, '')
        )
          .toNumber()
          .toLocaleString('en-US')
        return
      }
    },
    calculationExchange() {
      if (this.legalCurrencyAmount && this.exchangeRate) {
        const amount = Decimal(
          this.legalCurrencyAmount.replace(/,/g, '')
        ).toString()
        this.exchangedAmount = Decimal.div(amount, this.exchangeRate)
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
          this.exchangeTimer = setInterval(() => {
            clearInterval(this.exchangeTimer)
            this.updateExchangeData()
          }, this.RATE_UPDATE_INTERVAL)
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
      const amount = Decimal(
        this.legalCurrencyAmount.replace(/,/g, '')
      ).toString()
      const params = {
        payment_token: this.$route.params.token,
        base_currency: CURRENCIES[this.selectedCurrency].name,
        base_amount: amount,
        exchanged_amount: this.exchangedAmount,
        rate: this.exchangeRate,
        margin_rate: this.exchangeMarginRate
      }
      return this.axios.patch(url, params, { withCredentials: true })
    },
    next() {
      if (this.isInvalidAmount) return
      this.loading = true
      this.apiUpdateTransaction()
        .then(() => {
          this.$store.dispatch('payment/updateAmount', this.exchangedAmount)
          this.$router.push({ 
            name: 'ww-wallets', 
            params: { token: this.$route.params.token },
            query: this.$route.query
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
    this.updateExchangeData()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.amount {
  &__title {
    // @include flex(flex-start, center);
    margin: 1rem;
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
      @include flex(flex-start, center);
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
          font-size: 2.488rem;
        }
      }
      span {
        transform: translateY(4px);
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
