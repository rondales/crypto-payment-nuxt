<template>
  <div class="payment_handleprice">
    <div class="payment_handleprice-pricewrap">
      <PaymentAmountBilled
        :symbol="receiveTokenSymbol"
        :icon="receiveTokenIcon"
        :price="amount"
      />

      <PaymentText
        class="payment-with"
        tag="p"
        type="connectWallet"
        html="Connect Web3 wallet to make a payment"
      />
      <button
        class="btn __m __pg icon-right full"
        @click="connect(METAMASK, false)"
      >
        <div class="loading-wrap" :class="{ active: loadingMeta }">
          <img class="spin mt" src="@/assets/images/loading.svg" />
        </div>
        <span class="btn-icon">
          <img src="@/assets/images/metamask-fox.svg" />
        </span>
        MetaMask
      </button>
      <button
        class="btn __m __pg icon-right full"
        @click="showWalletConnectCautionModal()"
      >
        <div class="loading-wrap" :class="{ active: loadingWallet }">
          <img class="spin mt" src="@/assets/images/loading.svg" />
        </div>
        <span class="btn-icon">
          <img src="@/assets/images/wallet-connect_w.svg" />
        </span>
        WalletConnect
      </button>
      <button
        class="btn __m __pg icon-right full mb-0"
        @click="showRegeneratePaymentUrlModal()"
      >
        <span class="btn-icon">
          <img src="@/assets/images/renewal.svg" />
        </span>
        Regenerate URL
      </button>
    </div>
  </div>
</template>

<script>
import { METAMASK } from "@/constants";
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import PaymentText from "@/components/organisms/Payment/Text";
import ConnectWalletMixin from "@/components/mixins/ConnectWallet";
import PaymentWalletConnectorMixin from "@/components/mixins/PaymentWalletConnector";

export default {
  name: "PaymentSelectWallets",
  mixins: [ConnectWalletMixin, PaymentWalletConnectorMixin],
  components: {
    PaymentAmountBilled,
    PaymentText,
  },
  data() {
    return {
      loadingMeta: false,
      loadingWallet: false,
      receiveTokenIcons: {
        USDT: require("@/assets/images/symbol/usdt.svg"),
        USDC: require("@/assets/images/symbol/usdc.svg"),
        DAI: require("@/assets/images/symbol/dai.svg"),
        JPYC: require("@/assets/images/symbol/jpyc.svg"),
      },
    };
  },
  computed: {
    METAMASK() {
      return METAMASK;
    },
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    receiveTokenSymbol() {
      return this.$store.state.payment.symbol;
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[this.$store.state.payment.symbol];
    },
    amount() {
      return this.$store.state.payment.amount;
    },
    status() {
      return this.$store.state.payment.status;
    },
    paymentToken() {
      return this.$route.params.token;
    },
    isAllowCookies() {
      return this.$store.state.payment.isAllowCookies;
    },
  },
  methods: {
    apiGetAvailableNetworks() {
      const url = `${this.baseUrl}/api/v1/payment/contract/network`;
      const request = {
        params: new URLSearchParams([
          ["payment_token", this.$route.params.token],
        ]),
      };
      return this.axios.get(url, request);
    },
    showRiskDisclaimerModal() {
      this.$store.dispatch("modal/show", {
        target: "caution-payment-risk-disclaimer-modal",
        size: "small",
        params: {
          isVerifiedDomain: this.$store.state.payment.isVerifiedDomain,
        },
      });
    },
    showWalletConnectCautionModal() {
      this.$store.dispatch("modal/show", {
        target: "caution-wallet-connect-modal",
        size: "small",
      });
    },
    showRegeneratePaymentUrlModal() {
      this.$store.dispatch("modal/show", {
        target: "regenerate-payment-url-modal",
        size: "small",
      });
    },
  },
  created() {
    this.$store.dispatch("account/initialize");
    this.$store.dispatch("web3/initialize");
    this.$store.dispatch("payment/initializeForBeforeConnectWallet");
    this.$store.dispatch("payment/updateSelectReceiptStatus", true);
    if (!this.isAllowCookies) {
      this.showRiskDisclaimerModal();
    }
  },
  beforeRouteLeave(to, from, next) {
    const connectedWalletPages = ["tokens", "exchange", "detail"];
    if (connectedWalletPages.includes(to.name)) {
      next(false);
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.payment_handleprice {
  width: 100%;
  dl {
    dt {
      font-weight: 400;
      font-size: 15px;
    }
  }

  .payment_desc {
    p {
      background: $gradation-pale;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
  }
  .payment_handleprice-pricewrap {
    width: 100%;
  }
  .payment_handleprice-price {
    padding: 0;
    width: 100%;
    min-width: auto;
    input {
      line-height: 53px;
      height: 53px;
      font-weight: 500;
      font-size: 18px;
      width: 65%;
      padding-left: 16px;
      @include media(sp) {
        width: 55%;
      }
    }
    .currency {
      width: 35%;
      line-height: 53px;
      position: relative;
      &::before {
        position: absolute;
        content: "";
        width: 1px;
        height: 33px;
        background: #6b6b6c;
        left: -12px;
      }
      &::after {
        content: "▲";
        position: absolute;
        right: 12px;
        color: #6b6b6c;
        font-size: 14px;
        transform: rotate(-180deg);
      }
      figure {
        line-height: 53px;
        position: absolute;
        img {
          padding-top: 14px;
        }
      }
      select {
        padding-left: 36px;
        font-weight: 400;
        width: 100%;
        border: none;
        outline: none;
      }
    }
    span {
      vertical-align: middle;
      font-size: 11px;
    }
  }

  .payment-with {
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .payment_receiptwrap {
    width: 100%;
  }
  .payment_receipt {
    p {
      font-size: 15px;
    }
    &_form {
      height: 56px;
      .mail {
        height: 51px;
        padding: 0 16px;
        font-size: 15px;
        width: 100%;
      }
    }
  }
}
</style>
