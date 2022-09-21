<template>
  <div>
    <PaymentTransaction
      class="result__transaction"
      type="loading"
      title="Waiting for Confimation"
      :text="descriptionText"
      :explorerUrl="explorerUrl"
    />
  </div>
</template>

<script>
import PaymentTransaction from "@/components/organisms/Payment/Transaction";
export default {
  name: "PaymentResultPending",
  props: {
    explorerUrl: String,
    merchantReceiveSymbol: String,
    merchantReceiveAmount: String,
    userPaidSymbol: String,
    userPaidAmount: String
  },
  components: {
    PaymentTransaction
  },
  computed: {
    descriptionText() {
      return `Pay ${this.userPaidAmount}${this.userPaidSymbol} for ${this.merchantReceiveAmount}${this.merchantReceiveSymbol}`
    }
  }
};
</script>