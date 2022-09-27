<template>
  <div>
    <PaymentTransaction
      class="result__transaction"
      type="dismiss"
      title="Invalid Transaction"
      text="Check the transaction in Explorer."
      :explorer-url="explorerUrl"
      :link="linkData"
    />
  </div>
</template>

<script>
import { STATUS_RESULT_FAILURE } from "@/constants";
import PaymentTransaction from "@/components/organisms/Payment/Transaction";
export default {
  name: "PaymentResultFailure",
  props: {
    explorerUrl: String,
    backUrl: String
  },
  components: {
    PaymentTransaction,
  },
  computed: {
    linkData() {
      return {
        color: 'primary',
        title: 'Back to Payee’s Services',
        url: this.backUrl
      }
    }
  },
  created() {
    this.$store.dispatch("payment/updateStatus", STATUS_RESULT_FAILURE);
  },
};
</script>