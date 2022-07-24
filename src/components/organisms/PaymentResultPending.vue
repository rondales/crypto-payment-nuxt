<template>
  <div>
    <!-- 未使用コンポーネント、問題なければ削除 -->
    <p class="d-todo">{{ $options.name }}</p>
    <!-- <PaymentTransaction
      type="loading"
      title="Waiting for Confimation"
      :text="setText"
      :link="link"
    /> -->
    <!-- <PaymentVia /> -->
    <div class="payment-status mt-3 mb-3">
      <div>
        <img
          class="mb-2 spin"
          src="@/assets/images/loading.svg"
          alt="processing"
        />
        <p class="payment-status_title">Waiting for transaction result</p>
        <p v-if="hasTransactionData" class="payment-status_desc mb-2">
          Pay {{ transaction.userPaidAmount | amountFormat }}
          {{ transaction.userPaidSymbol }} for
          {{ transaction.merchantReceiveAmount | amountFormat }}
          {{ transaction.merchantReceiveSymbol }}
        </p>
      </div>
      <a
        v-if="hasExplorerUrl"
        class="payment-status_btn"
        target="_blank"
        :href="urls.explorer"
      >
        View on explorer
        <img src="@/assets/images/link-icon.svg" alt="another" />
      </a>
    </div>
    <button class="btn __g __l mb-2 inactive">processing…</button>
    <PaymentVia />
  </div>
</template>

<script>
import { Decimal as BigJs } from "decimal.js";
// import PaymentTitle from "@/components/organisms/Payment/Title";
// import PaymentForm from "@/components/organisms/Payment/Form";
// import PaymentButton from "@/components/organisms/Payment/Button";
// import PaymentTransaction from "@/components/organisms/Payment/Transaction";
import PaymentVia from "@/components/organisms/Payment/Via";
export default {
  name: "PaymentResultPending",
  props: {
    urls: Object,
    transaction: Object,
  },
  data() {
    return {
      link: {
        url: "",
        icon: "",
        title: "",
        color: "",
      },
    };
  },
  components: {
    // PaymentTransaction,
    PaymentVia,
  },
  filters: {
    amountFormat(amount) {
      return new BigJs(amount).toString();
    },
  },
  computed: {
    hasExplorerUrl() {
      return this.urls.explorer;
    },
    hasTransactionData() {
      return (
        this.transaction.userPaidAmount &&
        this.transaction.userPaidSymbol &&
        this.transaction.merchantReceiveAmount &&
        this.transaction.merchantReceiveSymbol
      );
    },
    setText() {
      // let text =
      //   "Pay " +
      //   this.amountFormat(this.transaction.userPaidAmount) +
      //   this.transaction.userPaidSymbol +
      //   " for " +
      //   this.amountFormat(this.transaction.merchantReceiveAmount) +
      //   this.transaction.merchantReceiveSymbol;

      // return text;
      return "";
    },
  },
  created() {
    if (this.hasReturnUrl) {
      this.link.url = this.urls.explorer;
      this.link.icon = "outerlink";
      this.link.title = "View on explorer";
      this.link.color = "g";
    } else {
      this.link.url = "";
      this.link.title = "processing…";
      this.link.color = "cancel";
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.payment-status {
  text-align: center;
  margin: auto;
  &_title {
    font-size: 18px;
    font-weight: 100;
  }
  &_desc {
    font-size: 10px;
    font-weight: 100;
  }
  &_btn {
    font-size: 12px;
    font-weight: 100;
    cursor: pointer;
    background: $gradation-pale;
    padding: 4px 16px;
    border-radius: 10px;
    color: #fff;
    img {
      margin-left: 4px;
      vertical-align: middle;
    }
  }
}
.via {
  font-size: 12px;
  font-weight: 100;
  text-align: center;
  line-height: 20px;
  img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
}
</style>
