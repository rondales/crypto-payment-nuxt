<template>
  <div>
    <div v-if="hasCashback">
      <div class="payment_desc add-flex j-between mb-2">
        <p class="grd">Cash Back</p>
      </div>
      <div class="payment_detail add-flex j-between mb-1">
        <div class="payment_detail-name add-flex a-center mb-1">
          <figure>
            <img :src="cashbackTokenIcon" :alt="merchantReceiveSymbol" />
          </figure>
          <p>
            {{ merchantReceiveSymbol }}
          </p>
        </div>
        <div class="payment_detail-value">
          <p>
            {{ cashbackAmount | amountFormat }}
          </p>
        </div>
      </div>
    </div>
    <div class="payment-status mt-3 mb-3">
      <div>
        <img class="mb-2" src="@/assets/images/check.svg" alt="success">
        <p class="payment-status_title mb-1">
          Transaction Submitted
        </p>
      </div>
      <a class="payment-status_btn" target="_blank" :href="urls.explorer">
        View on explorer
        <img src="@/assets/images/link-icon.svg" alt="another">
      </a>
    </div>
    <div class="payment-status_receipt mb-3">
      <a @click="openPaymentReceiptModal">Click here to get a receipt</a>
    </div>
    <a @click.prevent="closeWidgetWindow">
      <button class="btn __g __l mb-2">
        Back to Payee’s Services
      </button>
    </a>
  </div>
</template>
<script>
import { STATUS_RESULT_SUCCESS } from '@/constants'
import StringExtend from "@/utils/string_extend"

export default {
  name: 'ww-PaymentResultSuccess',
  props: {
    urls: Object,
    token: String,
    isReceiptMode: Boolean,
    cashbackAmount: String,
    merchantReceiveSymbol: String
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    MERCHANT_RECEIVE_ICONS() {
      return {
        USDT: require("@/assets/images/symbol/usdt.svg"),
        USDC: require("@/assets/images/symbol/usdc.svg"),
        DAI: require("@/assets/images/symbol/dai.svg"),
        JPYC: require("@/assets/images/symbol/jpyc.svg"),
        WETH: require('@/assets/images/symbol/eth.svg')
      }
    },
    hasCashback() {
      return this.cashbackAmount && this.cashbackAmount != 0
    },
    cashbackTokenIcon() {
      return this.MERCHANT_RECEIVE_ICONS[this.merchantReceiveSymbol]
    }
  },
  filters: {
    amountFormat(amount) {
      if (amount) {
        const splitAmount = amount.split('.')
        if (splitAmount.length > 1) {
          splitAmount[1] = StringExtend.rtrim(splitAmount[1], '0')
        }
        if(splitAmount[1]) {
          return splitAmount.join('.')
        } else {
          return splitAmount[0]
        }
      }
    },
  },
  methods: {
    openPaymentReceiptModal() {
      this.$store.dispatch('modal/show', {
        target: 'payment-receipt-modal',
        size: 'small'
      })
    },
    closeWidgetWindow() {
      window.close()
    },
    /**
     * call to Call on the payment completion screen
     * @param status number 1: success, 2: failed
     * @param params Object payment params
     */
    sendFixPaymentToParentWindow(status, params) {
      if(!window.opener) return;

      window.opener.postMessage({
        action: 'fixPayment',
        value: {paymentStatus: status, optParams: params}
      }, this.$store.state.wwPayment.parentOrigin);
    }
  },
  created() {
    this.sendFixPaymentToParentWindow(1, {payment_token: this.$route.params.token})
    if (!this.isReceiptMode) {
      this.$store.dispatch('payment/updateStatus', STATUS_RESULT_SUCCESS)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/old/style.scss';

.payment_desc {
  p {
    background: $gradation-pale;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 150% 150%;
    display: inline;
  }
}

.payment_detail {
  &-name {
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 25px;
      margin-left: 7px;
    }
    figure {
      width: 25px;
      height: 25px;
      img {
        vertical-align: baseline;
      }
    }
  }
  &-value {
    font-size: 20px;
    font-weight: 100;
    margin-left: 16px;
  }
}

.payment-status{
  text-align: center;
  margin: auto;
  &_title{
    font-size: 18px;
    font-weight: 100;
  }
  &_desc{
    font-size: 10px;
    font-weight: 100;
  }
  &_btn{
    font-size: 12px;
    font-weight: 100;
    cursor: pointer;
    background: $gradation-pale;
    padding: 4px 16px;
    border-radius: 10px;
    color: #fff;
    img{
      margin-left: 4px;
      vertical-align: middle;
    }
  }
  &_receipt {
    text-align: center;
    text-decoration: underline;
    font-size: 13px;
    font-weight: 300;
    font-family: "Poppins", sans-serif;
    letter-spacing: 0.02em;
    line-height: 1.5;
    a {
      cursor: pointer;
    }
  }
}
.new-tab-icon {
  padding: 0!important;
}
</style>