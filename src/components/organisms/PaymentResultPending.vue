<template>
  <div>
    <div class="payment-status mt-3 mb-3">
      <div>
        <img class="mb-2 spin" src="@/assets/images/loading.svg" alt="processing">
        <p class="payment-status_title">
          Waiting for transaction result
        </p>
        <p v-if="hasTransactionData" class="payment-status_desc mb-2">
          Pay {{ transaction.userPaidAmount }} {{ transaction.userPaidSymbol }} for {{ transaction.merchantReceiveAmount }} {{ transaction.merchantReceiveSymbol }}
        </p>
      </div>
      <a v-if="hasExplorerUrl" class="payment-status_btn" target="_blank" :href="urls.explorer">
        View on explorer
        <img src="@/assets/images/link-icon.svg" alt="another">
      </a>
    </div>
    <button class="btn __g __l mb-2 inactive">processing…</button>
    <p class="via">
      via Slash Payment
      <span>
        <img src="@/assets/images/slash-s.svg" alt="slash">
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'PaymentResultPending',
  props: {
    urls: Object,
    transaction: Object
  },
  computed: {
    hasExplorerUrl() {
      return (urls.explorer)
    },
    hasTransactionData() {
      return transaction.userPaidAmount
        && transaction.userPaidSymbol
        && transaction.merchantReceiveAmount
        && transaction.merchantReceiveSymbol
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
.via{
  font-size: 12px;
  font-weight: 100;
  text-align: center;
  line-height: 20px;
  img{
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
}
</style>