<template>
  <div>
    <!-- 未使用コンポーネント、問題なければ削除 -->
    <p class="d-todo">{{ $options.name }}</p>
    <PaymentTransaction type="success" title="Transaction Submitted" />
    <div class="payment-status mt-3 mb-3">
      <div>
        <img class="mb-2" src="@/assets/images/check.svg" alt="success" />
        <p class="payment-status_title mb-1">Transaction Submitted</p>
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
    <div class="payment-status_receipt mb-3">
      <a @click="openPaymentReceiptModal">Click here to get a receipt</a>
    </div>
    <a v-if="hasReturnUrl && !isReceiptMode" :href="urls.success">
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
import { STATUS_RESULT_SUCCESS } from "@/constants";
import PaymentTransaction from "@/components/organisms/Payment/Transaction";
export default {
  name: "PaymentResultSuccess",
  props: {
    urls: Object,
    token: String,
    isReceiptMode: Boolean,
  },
  components: {
    PaymentTransaction,
  },
  data() {
    return {
      cashbackTokenAmount: '',
      cashbackTokenSymbol: '',
      cashbackTokenIcon: ''
    }
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL;
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
      return this.cashbackTokenAmount && this.cashbackTokenAmount !== '0'
    },
    hasReturnUrl() {
      return this.urls.success;
    },
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
  methods: {
    apiGetTransactionRefundedData() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction/refunded`;
      const request = {
        params: new URLSearchParams([['payment_token', this.token]])
      }
      return this.axios.get(url, request)
    },
    openPaymentReceiptModal() {
      this.$store.dispatch('modal/show', {
        target: 'payment-receipt-modal',
        size: 'small'
      })
    }
  },
  created() {
    if (!this.isReceiptMode) {
      this.$store.dispatch("payment/updateStatus", STATUS_RESULT_SUCCESS);
      this.apiGetTransactionRefundedData().then((response) => {
        const responseParams = response.data
        this.cashbackTokenAmount = responseParams.cashback_token_amount
        this.cashbackTokenSymbol = responseParams.cashback_token_symbol
        this.cashbackTokenIcon = this.MERCHANT_RECEIVE_ICONS[responseParams.cashback_token_symbol]
      })
    }
  }
}
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
  padding: 0 !important;
}
</style>
