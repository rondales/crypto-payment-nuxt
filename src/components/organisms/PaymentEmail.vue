<template>
  <div>
    <PaymentAmountBilled
      :symbol="receiveTokenSymbol"
      :icon="setIconPath"
      :price="amount"
      size="big"
      class="bill"
    />
    <PaymentEmailComp
      @noRequireReceipt="next"
      @requireReceipt="requireReceipt"
      :loading="loading"
    />
  </div>
</template>

<script>
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import PaymentEmailComp from "@/components/organisms/Payment/Email";
import { errorCodeList } from "@/enum/error_code";

export default {
  name: "PaymentEmail",
  props: {
    progressTotalSteps: Number,
    progressCompletedSteps: Number
  },
  data() {
    return {
      email: "",
      loading: false,
    };
  },
  components: {
    PaymentAmountBilled,
    PaymentEmailComp,
  },
  computed: {
    RECEIVED_TOKEN_ICON_PATH() {
      return {
        USDT: "crypto_currency/usdt",
        USDC: "crypto_currency/usdc",
        DAI: "crypto_currency/dai",
        JPYC: "crypto_currency/jpyc",
        WETH: "crypto_currency/weth",
      };
    },
    receiveTokenSymbol() {
      return this.$store.state.payment.symbol;
    },
    setIconPath() {
      return this.RECEIVED_TOKEN_ICON_PATH[this.$store.state.payment.symbol];
    },
    amount() {
      return this.$store.state.payment.amount;
    },
  },
  methods: {
    apiUpdateTransaction() {
      const url =
        process.env.VUE_APP_API_BASE_URL + "/api/v1/payment/transaction";
      const params = {
        payment_token: this.$route.params.token,
        email: this.email,
      };
      return this.axios.patch(url, params);
    },
    requireReceipt(email) {
      this.loading = true;
      this.email = email;
      this.apiUpdateTransaction()
        .then(() => {
          this.next();
        })
        .catch((error) => {
          let message;
          if (error.response.status === 400) {
            message = errorCodeList[error.response.data.errors.shift()].msg;
          } else {
            message = "Please try again after a while.";
          }
          this.loading = false;
          this.$store.dispatch("modal/show", {
            target: "error-modal",
            size: "small",
            params: {
              message: message,
            },
          });
        });
    },
    next() {
      this.$store.dispatch("payment/updateSelectReceiptStatus", true);
      this.$router.replace({
        path: "/payment/wallets/" + this.$route.params.token,
      });
    },
  },
  created() {
    this.$store.dispatch("payment/updateHeaderInvoice", false);
    this.$emit('updateProgressTotalSteps', this.progressCompletedSteps)
  },
  mounted() {
    setTimeout(() => {
      this.$emit('updateInitializingStatus', false)
    }, 1500)
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.bill {
  margin-bottom: 2rem;
}
</style>
