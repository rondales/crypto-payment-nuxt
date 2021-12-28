<template>
  <div class="payment_handleprice">
    <div class="payment_desc mb-3">
      <p>
        Enter the payment amount
      </p>
      <span>&#128591;</span>
    </div>
    <div class="payment_handleprice-pricewrap">
      <p class="mb-3">How much would you pay?</p>
      <div class="payment_handleprice-price add-flex border j-between">
        <input v-model="legalTenderAmount" class="price" type="text" placeholder="0">
        <div class="add-flex currency a-center">
          <figure>
            <img :src="selectedCurrencyIcon">
          </figure>
          <select name="currency" v-model="selectedCurrency">
            <option disabled value="">{{ selectedCurrencyName }}</option>
            <option v-for="(currency, key) in currencies" :value="currency.name" :key="key">
              {{ currency.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="add-flex j-between billed a-center">
        <div class="add-flex j-between a-center">
          <figure>
            <img src="@/assets/images/usdt.png" alt="">
          </figure>
          <dl>
            <dt>
              Amount billed
            </dt>
            <dd>
              USDT
            </dd>
          </dl>
        </div>
        <div class="usdt-price" :class="{'inactive': requireUpdateExchange}">
          <p>
            {{ exchangedAmount }}
          </p>
        </div>
      </div>
      <div v-if="!requireUpdateExchange" class="payment-with">
        Payment with Web3 Wallet
      </div>
      <div>
        <div class="payment-box" v-if="requireUpdateExchange">
          <div class="add-flex a-center j-between">
            <div class="add-flex a-center">
              <img src="@/assets/images/warning.svg" alt="">
              <div class="payment-box_desc">
                <p>
                  Price Updated
                </p>
              </div>
            </div>
            <div class="payment-box_btn" @click="updateExchangedAmount">
              Accept
            </div>
          </div>
        </div>
        <button :class="{'inactive': requireUpdateExchange}" class="btn __g __l" @click="next">
          <img v-if="requireUpdateExchange" src="@/assets/images/slash-s_inactive.svg" alt="">
          <img v-else src="@/assets/images/slash-s.svg" alt="">
          Go Payment
          <div class="loading-wrap" :class="{'active': loading}">
            <img class="spin" src="@/assets/images/loading.svg">
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyList } from '@/enum/currency'
import { errorCodeList } from '@/enum/error_code'

export default {
  name: 'PaymentAmount',
  data() {
    return {
      loading: false,
      requireUpdateExchange: false,
      legalTenderAmount: 0,
      selectedCurrency: currencyList['JPY'].name,
      exchangedAmount: 0,
      exchangeRate: 100,
      exchangeMarginRate: 3.5
    }
  },
  watch: {
    legalTenderAmount: function(amount) {
      this.calculationExchange(amount)
    }
  },
  computed: {
    currencies() {
      return currencyList
    },
    selectedCurrencyName() {
      return currencyList[this.selectedCurrency].name
    },
    selectedCurrencyIcon() {
      return currencyList[this.selectedCurrency].icon
    }
  },
  methods: {
    exchangedAmountCountdown() {
      setTimeout(() => {
        this.requireUpdateExchange = true
      }, 5000)
    },
    updateExchangedAmount() {
      // @todo We will implement the exchange rate acquisition API as soon as the requirements are determined
      this.requireUpdateExchange = false
      this.exchangedAmountCountdown()
    },
    calculationExchange(amount) {
      // @todo We will implement the exchange rate acquisition API as soon as the requirements are determined
      // this.exchangedAmount = amount * exchangeRate
      this.exchangedAmount = amount
    },
    apiUpdateTransaction() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/payment/transaction'
      const params = {
        payment_token: this.$route.params.token,
        base_currency: currencyList[this.selectedCurrency].name,
        base_amount: this.legalTenderAmount,
        exchanged_amount: this.exchangedAmount,
        rate: this.exchangeRate,
        margin_rate: this.exchangeMarginRate
      }
      return this.axios.patch(url, params)
    },
    next() {
      this.loading = true
      this.apiUpdateTransaction().then(() => {
        this.$store.dispatch('setPaymentBaseAmount', this.exchangedAmount)
        this.$router.push({
          path: 'receipt/' + this.$route.params.token,
        })
      }).catch((error) => {
        let message

        if (error.response.status === 400) {
          message = errorCodeList[
            error.response.data.errors.shift()
          ].msg
        } else {
          message = 'Please try again after a while.'
        }
        this.loading = false
        this.$store.dispatch('openModal', {
          target: 'error-modal',
          size: 'small',
          message: message
        })
      })
    }
  },
  created() {
    this.exchangedAmountCountdown()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.payment_handleprice{
  width: 100%;

  dl{
    dt{
      font-weight: 400;
      font-size: 15px;
    }
  }

  .payment_desc{
    p{
      background: $gradation-pale;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
  }

  .payment_handleprice-pricewrap{
    width: 100%;
  }

  .payment_handleprice-price{
    padding: 0;
    width: 100%;
    min-width: auto;
    input{
      line-height: 53px;
      height: 53px;
      font-weight: 500;
      font-size: 18px;
      width: 65%;
      padding-left: 16px;
      @include media(sp) {
        width: 55%;
      }
    }
    .currency{
      width: 35%;
      line-height: 53px;
      position: relative;
      &::before{
        position: absolute;
        content: "";
        width: 1px;
        height: 33px;
        background: #6B6B6C;
        left: -12px;
      }
      &::after{
        content: "▲";
        position: absolute;
        right: 12px;
        color: #6B6B6C;
        font-size: 14px;
        transform: rotate(-180deg);
      }
      figure{
        line-height: 53px;
        position: absolute;
        img{
          padding-top: 14px;
        }
      }
      select{
        padding-left: 36px;
        font-weight: 400;
        width: 100%;
        border: none;
        outline: none;
      }
    }
    span{
      vertical-align: middle;
      font-size: 11px;
    }
  }

  .billed{
    padding-bottom: 16px;
    margin:24px 0 16px;
    border-bottom: 1px solid #78668D;
    figure{
      img{
        height: 46px;
        width: 46px;
        border-radius: 50%;
      }
    }
    dl{
      margin-left: 16px;
      dt{
        font-size: 10px;
        font-weight: 100;
      }
      dd{
        font-size: 18px;
        font-weight: 300;
      }
    }
  }

  .payment-with{
    text-align: center;
    font-size: 18px;
    font-weight: 200;
    padding-top: 8px;
    padding-bottom: 24px;
  }
}
</style>