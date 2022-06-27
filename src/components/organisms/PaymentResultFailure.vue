<template>
  <div>
    <div class="payment-status mt-3 mb-3">
      <div>
        <img class="mb-2" src="@/assets/images/multiply.svg" alt="failure">
        <p class="payment-status_desc mb-2">
          The transaction cannot succeed due to error: execution
          <br>
          Check the reason for the reverted from Explorer.
        </p>
      </div>
      <a v-if="hasReturnUrl && !isReceiptMode" class="payment-status_btn" target="_blank" :href="urls.explorer">
        View on explorer
        <img src="@/assets/images/link-icon.svg" alt="another">
      </a>
    </div>
    <a v-if="hasReturnUrl && !isReceiptMode" :href="urls.failure">
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
import { STATUS_RESULT_FAILURE } from '@/constants'

export default {
  name: 'PaymentResultFailure',
  props: {
    urls: Object,
    isReceiptMode: Boolean
  },
  computed: {
    hasReturnUrl() {
      return (this.urls.failure)
    }
  },
  created() {
    this.$store.dispatch('payment/updateStatus', STATUS_RESULT_FAILURE)
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