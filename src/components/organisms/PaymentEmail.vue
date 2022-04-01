<template>
  <div class="payment_handleprice">
    <div class="payment_handleprice-pricewrap">
      <div class="add-flex j-between billed a-center">
        <div class="add-flex j-between a-center">
          <figure>
            <img :src="receiveTokenIcon" alt="">
          </figure>
          <dl>
            <dt>
              Amount billed
            </dt>
            <dd>
              {{ receiveTokenSymbol }}
            </dd>
          </dl>
        </div>
        <div class="usdt-price">
          <p>
            {{ amount }}
          </p>
        </div>
      </div>
    </div>
    <div class="payment_receiptwrap">
      <div class="payment_desc mb-2 mt-1">
        <p>
          Do you want a receipt?
        </p>
        <span>&#x1F9FE;</span>
      </div>
      <div class="payment_receipt">
        <p class="mb-1">
          Email address to receive receipt
        </p>
        <div class="payment_receipt_form border mb-2">
          <input v-model="email" class="mail" type="text" placeholder="your@mail.com">
        </div>
      </div>
      <button class="btn __g __l inactive mb-2" @click="requireReceipt" :class="{'active': email}">
        Yes required
        <div class="loading-wrap" :class="{'active': loading}">
          <img class="spin" src="@/assets/images/loading.svg">
        </div>
      </button>
      <button class="btn __g __l" @click="next" :class="{'inactive': loading}">
        Not required
      </button>
    </div>
  </div>
</template>

<script>
import {errorCodeList} from '@/enum/error_code'

export default {
  name: 'PaymentEmail',
  data() {
    return {
      email: '',
      loading: false,
      receiveTokenIcons: {
        USDT: require('@/assets/images/symbol/usdt.svg'),
        USDC: require('@/assets/images/symbol/usdc.svg'),
        DAI: require('@/assets/images/symbol/dai.svg'),
        JPYC: require('@/assets/images/symbol/jpyc.svg')
      }
    }
  },
  computed: {
    receiveTokenSymbol() {
      return this.$store.state.payment.symbol
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[
        this.$store.state.payment.symbol
      ]
    },
    amount() {
      return this.$store.state.payment.amount
    }
  },
  methods: {
    apiUpdateTransaction() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/payment/transaction'
      const params = {
        payment_token: this.$route.params.token,
        email: this.email
      }
      return this.axios.patch(url, params)
    },
    requireReceipt() {
      this.loading = true
      this.apiUpdateTransaction().then(() => {
        this.next()
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
        this.$store.dispatch('modal/show', {
          target: 'error-modal',
          size: 'small',
          params: {
            message: message
          }
        })
      })
    },
    next() {
      this.$router.push({
        path: '/payment/wallets/' + this.$route.params.token
      })
    },
  },
  created() {
    this.$store.dispatch('payment/updateHeaderInvoice', false)
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

  .payment_desc{
    p{
      background: $gradation-pale;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
  }

  .payment_receiptwrap{
    width: 100%;
  }

  .payment_receipt{
    p{
      font-size: 15px;
      font-weight: 400;
    }
    &_form{
      height: 56px;
      .mail{
        height: 51px;
        padding: 0 16px;
        font-size: 15px;
        width: 100%;
      }
    }
  }

  .btn{
    position: relative;
  }
}
</style>