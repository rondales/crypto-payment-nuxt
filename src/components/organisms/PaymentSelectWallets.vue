<template>
  <div>
    <PaymentAmountBilled
      :symbol="receiveTokenSymbol"
      :icon="setIconPath"
      :price="amount"
      size="big"
    />
    <div class="connectwallet d-payboxwrap">
      <PaymentTitle
        class="title"
        tag="p"
        type="h4"
        html="Connect Web3 wallet<br class='sp'> to make a payment"
        layout="c"
      />
      <div class="button">
        <PaymentButton
          @click.native="handleConnect(METAMASK, false)"
          size="l"
          text="MetaMask"
          icon="wallet-metamask"
          :loading="loadingMeta"
        />
        <PaymentButton
          @click.native="showWalletConnectCautionModal()"
          size="l"
          text="WalletConnect"
          icon="wallet-walletconnect"
          :loading="loadingWallet"
        />
        <PaymentButton
          class="regenerate"
          @click.native="showRegeneratePaymentUrlModal()"
          size="s"
          color="cancel"
          text="Regenerate URL"
          icon="reload"
        />
      </div>
    </div>
    <!-- <div class="payment_handleprice">
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
          @click="handleConnect(METAMASK, false)"
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
    </div> -->
  </div>
</template>

<script>
import { METAMASK } from "@/constants";
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import PaymentTitle from "@/components/organisms/Payment/Title";
import PaymentButton from "@/components/organisms/Payment/Button";
import ConnectWalletMixin from "@/components/mixins/ConnectWallet";
import PaymentWalletConnectorMixin from "@/components/mixins/PaymentWalletConnector";
import isMobile from "ismobilejs";

export default {
  name: "PaymentSelectWallets",
  mixins: [ConnectWalletMixin, PaymentWalletConnectorMixin],
  components: {
    PaymentAmountBilled,
    PaymentTitle,
    PaymentButton,
  },
  props: {
    progressTotalSteps: Number,
    progressCompletedSteps: Number
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
      receiveTokenIconPath: {
        USDT: "usdt",
        USDC: "usdc",
        DAI: "dai",
        JPYC: "jpyc",
      },
    };
  },
  computed: {
    METAMASK() {
      return METAMASK;
    },
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    currentDomain() {
      return window.location.host;
    },
    receiveTokenSymbol() {
      return this.$store.state.payment.symbol;
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[this.$store.state.payment.symbol];
    },
    setIconPath() {
      return this.receiveTokenIconPath[this.$store.state.payment.symbol];
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
    isInitialized() {
      return !this.$parent.initializing
    },
    isAgreeRisk() {
      return this.$store.state.payment.isAgreeRisk;
    },
    isMobileAndMetamaskNotInstalled() {
      return isMobile(window.navigator).any && !window.ethereum;
    },
    metamaskDeepLink() {
      return (
        "https://metamask.app.link/dapp/" +
        this.currentDomain +
        `/payment/wallets/${this.paymentToken}?dpl=1`
      );
    },
  },
  methods: {
    apiGetAvailableNetworks() {
      const url = `${this.API_BASE_URL}/api/v1/payment/contract/network`;
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
    handleConnect(provider, mode) {
      if (this.isMobileAndMetamaskNotInstalled) {
        window.location.href = this.metamaskDeepLink;
      } else {
        this.connect(provider, mode);
      }
    },
  },
  created() {
    this.$store.dispatch("web3/initialize");
    this.$store.dispatch("payment/initializeForBeforeConnectWallet");
    this.$store.dispatch("payment/updateSelectReceiptStatus", true);
    if (!this.isAgreeRisk && this.isInitialized) {
      this.showRiskDisclaimerModal();
    }
  },
  mounted() {
    setTimeout(() => {
      this.$emit('updateInitializingStatus', false)
      if (!this.isAgreeRisk) {
        this.showRiskDisclaimerModal();
      }
    }, 1500)
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
@import "@/assets/scss/delaunay.scss";
.connectwallet {
  margin-top: 4rem;
  .title {
    margin-bottom: 2rem;
  }
  .button {
    * {
      margin-top: 1rem;
      &::v-deep {
        button {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
    .regenerate {
      margin-top: 2rem;
    }
  }
}
// .payment_handleprice {
//   width: 100%;
//   dl {
//     dt {
//       font-weight: 400;
//       font-size: 15px;
//     }
//   }

//   .payment_desc {
//     p {
//       background: $gradation-pale;
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-size: 150% 150%;
//       display: inline;
//     }
//   }
//   .payment_handleprice-pricewrap {
//     width: 100%;
//   }
//   .payment_handleprice-price {
//     padding: 0;
//     width: 100%;
//     min-width: auto;
//     input {
//       line-height: 53px;
//       height: 53px;
//       font-weight: 500;
//       font-size: 18px;
//       width: 65%;
//       padding-left: 16px;
//       @include media(sp) {
//         width: 55%;
//       }
//     }
//     .currency {
//       width: 35%;
//       line-height: 53px;
//       position: relative;
//       &::before {
//         position: absolute;
//         content: "";
//         width: 1px;
//         height: 33px;
//         background: #6b6b6c;
//         left: -12px;
//       }
//       &::after {
//         content: "▲";
//         position: absolute;
//         right: 12px;
//         color: #6b6b6c;
//         font-size: 14px;
//         transform: rotate(-180deg);
//       }
//       figure {
//         line-height: 53px;
//         position: absolute;
//         img {
//           padding-top: 14px;
//         }
//       }
//       select {
//         padding-left: 36px;
//         font-weight: 400;
//         width: 100%;
//         border: none;
//         outline: none;
//       }
//     }
//     span {
//       vertical-align: middle;
//       font-size: 11px;
//     }
//   }

//   .payment-with {
//     text-align: center;
//     margin-top: 0.5rem;
//     margin-bottom: 1.5rem;
//   }
//   .payment_receiptwrap {
//     width: 100%;
//   }
//   .payment_receipt {
//     p {
//       font-size: 15px;
//     }
//     &_form {
//       height: 56px;
//       .mail {
//         height: 51px;
//         padding: 0 16px;
//         font-size: 15px;
//         width: 100%;
//       }
//     }
//   }
// }
</style>
