<template>
  <div>
    <div class="payment-status mt-3 mb-3">
      <div>
        <img class="mb-2" src="@/assets/images/check.svg" alt="success">
        <p class="payment-status_title mb-1">
          Transaction Submitted
        </p>
      </div>
      <a v-if="hasReturnUrl && !isReceiptMode" class="payment-status_btn" target="_blank" :href="urls.explorer">
        View on explorer
        <img src="@/assets/images/link-icon.svg" alt="another">
      </a>
    </div>
    <a v-if="hasReturnUrl && !isReceiptMode" :href="urls.success">
      <button class="btn __g __l mb-2">
        Back to Payee’s Services
      </button>
    </a>
    <a v-else target="_blank" :href="urls.explorer">
      <button class="btn __g __l mb-2">
        View on explorer
        <img class="new-tab-icon" src="@/assets/images/link-icon.svg" alt="another">
      </button>
    </a>
  </div>
</template>

<script>
import { STATUS_RESULT_SUCCESS } from '@/constants'

export default {
  name: 'PaymentResultSuccess',
  props: {
    urls: Object,
    token: String,
    isReceiptMode: Boolean
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    hasReturnUrl() {
      return (this.urls.success)
    }
  },
  methods: {
    apiGetTransactionRefundedData() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction/refunded`
      const request = {
        params: new URLSearchParams([['payment_token', this.token]])
      }
      return this.axios.get(url, request)
    }
  },
  created() {
    if (!this.isReceiptMode) {
      this.$store.dispatch('payment/updateStatus', STATUS_RESULT_SUCCESS)
      this.apiGetTransactionRefundedData().then((response) => {
        this.$store.dispatch('modal/show', {
          target: 'refund-info-modal',
          size: 'small',
          params: {
            refundedTokenAmount: response.data.refunded_token_amount,
            refundedTokenSymbol: response.data.refunded_token_symbol,
            refundedFeeAmount: response.data.refunded_fee_amount,
            refundedFeeSymbol: response.data.refunded_fee_symbol,
            cashBackAmount: response.data.cashback_amount,
            cashBackSymbol: response.data.cashback_symbol
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

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
}
.new-tab-icon {
  padding: 0!important;
}
</style>