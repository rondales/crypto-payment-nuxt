<template>
  <div>
    <PaymentModal title="Select a Wallet">
      <div class="button">
        <PaymentButton
          @click.native="connector(METAMASK)"
          size="l"
          text="MetaMask"
          icon="wallet-metamask"
        />
        <PaymentButton
          @click.native="connector(METAMASK)"
          size="l"
          text="Fireblocks"
          icon="fireblocks"
        />
        <PaymentButton
          @click.native="showWalletConnectCautionModal()"
          size="l"
          text="WalletConnect"
          icon="wallet-walletconnect"
        />
      </div>
      <p class="duplicate-ext-disclaimer mt-1 mb-1">If both Metamask and Fireblocks coexist in extensions to chrome, 
        it will not work. Only one of the extensions should be enabled.</p>
      <div class="d-btnwrap bottomCloseBtn">
        <PaymentButton
          color="cancel"
          text="CLOSE"
          icon="dismiss"
          size="s"
          @click.native="hideModal()"
        />
      </div>
    </PaymentModal>
  </div>
</template>

<script>
import { METAMASK } from "@/constants";
import ConnectWalletMixin from "@/components/mixins/ConnectWallet";
import PaymentWalletConnectorMixin from "@/components/mixins/PaymentWalletConnector";
import MerchantAdminAuthentificationMixin from "@/components/mixins/MerchantAdminAuthentification";
import PaymentModal from "@/components/organisms/Payment/Modal";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "walletModal",
  mixins: [
    ConnectWalletMixin,
    PaymentWalletConnectorMixin,
    MerchantAdminAuthentificationMixin,
  ],
  components: {
    PaymentButton,
    PaymentModal,
  },
  computed: {
    classes() {
      return ["modal-box", `--${this.$store.state.modal.size}`];
    },
    METAMASK() {
      return METAMASK;
    },
    isAdminLoginMode() {
      const path = /^\/admin$/;
      return path.test(this.$route.path);
    },
    isPaymentMode() {
      const path = /^\/payment\//;
      return path.test(this.$route.path);
    },
  },
  methods: {
    hideModal() {
      this.$store.dispatch("modal/hide");
    },
    showWalletConnectCautionModal() {
      this.$store.dispatch("modal/show", {
        target: "caution-wallet-connect-modal",
        size: "small",
      });
    },
    connector() {
      if (this.isAdminLoginMode) {
        this.authentification(METAMASK, true, true);
        return;
      }
      if (this.isPaymentMode) {
        this.connect(METAMASK, true);
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
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
}
.duplicate-ext-disclaimer {
  font-size: 10px;
}
</style>
