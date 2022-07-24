<template>
  <div>
    <!-- 未使用コンポーネント、問題なければ削除 -->
    <!-- <p class="d-todo">{{ $options.name }}</p> -->
    <PaymentTransaction
      type="dismiss"
      title="Waiting for Confimation"
      text="The transaction cannot succeed due to error: execution reverted: PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT."
      :link="link"
    />
    <div class="payment-status mt-3 mb-3">
      <div>
        <img class="mb-2" src="@/assets/images/multiply.svg" alt="failure" />
        <p class="payment-status_desc mb-2">
          The transaction cannot succeed due to error: execution
          <br />
          Check the reason for the reverted from Explorer.
        </p>
      </div>
      <a
        v-if="hasReturnUrl && !isReceiptMode"
        class="payment-status_btn"
        target="_blank"
        :href="urls.explorer"
      >
        View on explorer
        <img src="@/assets/images/link-icon.svg" alt="another" />
      </a>
    </div>
    <a v-if="hasReturnUrl && !isReceiptMode" :href="urls.failure">
      <button class="btn __g __l mb-2">Back to Payee’s Services</button>
    </a>
    <a v-else target="_blank" :href="urls.explorer">
      <button class="btn __g __l mb-2">
        View on explorer
        <img
          class="new-tab-icon"
          src="@/assets/images/link-icon.svg"
          alt="another"
        />
      </button>
    </a>
  </div>
</template>

<script>
import { STATUS_RESULT_FAILURE } from "@/constants";
import PaymentTransaction from "@/components/organisms/Payment/Transaction";
export default {
  name: "PaymentResultFailure",
  props: {
    urls: Object,
    isReceiptMode: Boolean,
  },
  data() {
    return {
      link: {
        url: "",
        icon: "",
        title: "",
        color: "g",
      },
    };
  },
  components: {
    PaymentTransaction,
  },
  computed: {
    hasReturnUrl() {
      return this.urls.failure;
    },
  },
  created() {
    this.$store.dispatch("payment/updateStatus", STATUS_RESULT_FAILURE);

    if (this.hasReturnUrl && !this.isReceiptMode) {
      this.link.url = this.urls.explorer;
      this.link.icon = "outerlink";
      this.link.title = "View on explorer";
    } else {
      this.link.url = this.urls.failure;
      this.link.title = "Back to Payee’s Services";
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
.new-tab-icon {
  padding: 0 !important;
}
</style>
