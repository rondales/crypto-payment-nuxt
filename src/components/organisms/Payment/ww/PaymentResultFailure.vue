<template>
  <div>
    <div class="payment-status mt-3 mb-3">
      <div>
        <img class="mb-2" src="@/assets/images/multiply.svg" alt="failure">
        <p class="payment-status_desc mb-2">
          Invalid Transaction.
          <br>
          Check the transaction in Explorer.
        </p>
      </div>
      <a class="payment-status_btn" target="_blank" :href="urls.explorer">
        View on explorer
        <img src="@/assets/images/link-icon.svg" alt="another">
      </a>
    </div>
    <a @click.prevent="closeWidgetWindow">
      <button class="btn __g __l mb-2">
        Back to Payee’s Services
      </button>
    </a>
  </div>
</template>

<script>
import { STATUS_RESULT_FAILURE } from '@/constants'

export default {
  name: 'ww-PaymentResultFailure',
  props: {
    urls: Object,
    isReceiptMode: Boolean
  },
  methods: {
    closeWidgetWindow() {
      window.close()
    }
  },
  created() {
    // Notify payment result to parent window. status 初期値=0, 成功=1, 失敗=2
    window.opener.SLASH_FIN.fixPayment(2, {payment_token: this.$route.params.token});
    this.$store.dispatch('payment/updateStatus', STATUS_RESULT_FAILURE)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/old/style.scss';

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