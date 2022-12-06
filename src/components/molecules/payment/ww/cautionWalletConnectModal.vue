<template>
    <div>
      <PaymentModal
        title="Caution"
        text='Operation cannot be guaranteed when connecting with WalletConnect.<br />See the documentation for more information.<br><a
          href="https://slash-fi.gitbook.io/docs/support/help-center/notes-on-wallet-connect"
          target="_blank"
          class="textlink"
          ><span>See to Document</span></a
        >'
      >
        <div class="btnwrap">
          <PaymentButton
            text=" I understood and will connect"
            size="m"
            @click.native="connector()"
          />
  
          <PaymentButton
            text="Cancel"
            color="cancel"
            size="m"
            @click.native="hideModal()"
          />
        </div>
  
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
      <!-- <div :class="classes">
        <div class="header">
          <h3 class="header__title">Caution</h3>
          <p class="header__desc">
            Operation cannot be guaranteed when connecting with WalletConnect.
            <br />
            See the documentation for more information.
          </p>
          <a
            class="link"
            href="https://slash-fi.gitbook.io/docs/support/help-center/notes-on-wallet-connect"
            target="_blank"
          >
            See to Document
          </a>
        </div>
        <div class="body">
          <button class="btn __g __l mb-2" @click="connector()">
            I understood and will connect
          </button>
          <button class="btn __g __l" @click="hideModal()">Cancel</button>
        </div>
        <button class="close" @click="hideModal()">
          <img src="@/assets/images/cross.svg" />
          close
        </button>
      </div> -->
    </div>
  </template>
  
  <script>
  import { WALLET_CONNECT } from "@/constants";
  import ConnectWalletMixin from "@/components/mixins/ww/ConnectWallet";
  import PaymentWalletConnectorMixin from "@/components/mixins/ww/PaymentWalletConnector";
  import MerchantAdminAuthentificationMixin from "@/components/mixins/MerchantAdminAuthentification";
  // import MerchantContract from "@/contracts/merchant";
  import PaymentModal from "@/components/organisms/Payment/ww/fragments/Modal";
  // import PaymentText from "@/components/organisms/Payment/Text";
  import PaymentButton from "@/components/organisms/Payment/ww/fragments/Button";
  export default {
    name: "WwCautionWalletConnectModal",
    mixins: [
      ConnectWalletMixin,
      PaymentWalletConnectorMixin,
      MerchantAdminAuthentificationMixin,
    ],
    components: {
      // PaymentText,
      PaymentButton,
      PaymentModal,
    },
    computed: {
      classes() {
        return ["modal-box", `--${this.$store.state.modal.size}`];
      },
      isAdminLoginMode() {
        const path = /^\/admin$/;
        return path.test(this.$route.path);
      },
      isPaymentMode() {
        const path = /^\/payments-uiswitchable\//;
        return path.test(this.$route.path);
      },
    },
    methods: {
      apiSetDeviceIdentification() {
        const url = `${this.API_BASE_URL}/api/v1/payment/token/refresh`;
        const request = {
          params: new URLSearchParams([["payment_token", this.paymentToken]]),
        };
        return this.axios.get(url, request);
      },
      hideModal() {
        this.$store.dispatch("modal/hide");
      },
      connector() {
        this.hideModal();
        if (this.isAdminLoginMode) {
          this.authentification(WALLET_CONNECT, true, true);
          return;
        }
        if (this.isPaymentMode) {
          this.apiSetDeviceIdentification;
          this.connect(WALLET_CONNECT, true);
          return;
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  @import "@/assets/scss/style.scss";
  @import "@/assets/scss/delaunay.scss";
  
  .textlink {
    @include font(1rem, $fw, $ls, $lh, $ff);
  }
  .btnwrap {
    & > * + * {
      margin-top: 0.5rem;
    }
  }
  // .modal-box {
  //   border-radius: 10px;
  //   position: fixed;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   background: var(--color_bg);
  //   @include media(pc) {
  //     &.--small {
  //       width: 470px;
  //     }
  //     &.--medium {
  //       width: 760px;
  //     }
  //   }
  //   @include media(sp) {
  //     width: calc(100vw - 32px);
  //   }
  // }
  // .header {
  //   @include media(pc) {
  //     padding: 24px;
  //     &__title {
  //       font-size: 2.5rem;
  //       margin-bottom: 2rem;
  //     }
  //     &__desc {
  //       font-size: 2rem;
  //     }
  //     & .link {
  //       font-weight: 300;
  //       font-size: 1.5rem;
  //     }
  //   }
  //   @include media(sp) {
  //     padding: 18px;
  //     &__title {
  //       font-size: 1.7rem;
  //     }
  //     &__desc {
  //       font-size: 1.6rem;
  //     }
  //     & .link {
  //       font-size: 1.4rem;
  //     }
  //   }
  //   &__title {
  //     font-weight: 500;
  //   }
  //   &__desc {
  //     font-weight: 100;
  //   }
  //   & .link {
  //     font-weight: 300;
  //   }
  //   & .link::after {
  //     content: "";
  //     background: url(/assets/images/link-icon.svg) no-repeat center center;
  //     width: 17px;
  //     height: 17px;
  //     position: absolute;
  //     margin-top: 8px;
  //     margin-left: 8px;
  //   }
  // }
  // .close {
  //   position: absolute;
  //   width: 16px;
  //   height: 16px;
  //   font-size: 0;
  
  //   @include media(pc) {
  //     top: 30px;
  //     right: 24px;
  //   }
  //   @include media(sp) {
  //     top: 24px;
  //     right: 24px;
  //   }
  // }
  // .body {
  //   @include media(pc) {
  //     padding: 24px 24px 40px;
  //   }
  //   @include media(sp) {
  //     padding: 16px 12px 48px;
  //   }
  //   // .btn {
  //   //   &.__m {
  //   //     background: $gradation-pale;
  //   //   }
  //   // }
  // }
  // .footer {
  //   text-align: center;
  
  //   @include media(pc) {
  //     padding: 0 40px 40px;
  //   }
  //   @include media(sp) {
  //     padding: 0 32px 32px;
  //   }
  // }
  </style>
  