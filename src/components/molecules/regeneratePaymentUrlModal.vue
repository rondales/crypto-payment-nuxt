<template>
  <div>
    <PaymentModal title="Regenerate URL" emoji="&#x1F501;">
      <div v-if="!isPaymentUrlRefreshed">
        <PaymentText
          tag="p"
          html=" Once the payment URL is regenerated, the current URL will no longer be available for payment, so please use the QR code or URL displayed after the payment URL is regenerated."
        />
        <PaymentConfirmCheckbox
          id="confirm"
          ref="confirmed"
          text="I agree to regenerate the payment URL."
          @clickCheckbox="updateConfirmedStatus()"
        />
        <div class="d-btnwrap">
          <PaymentButton
            class="non-translate"
            :color="isConfirmed ? 'primary' : 'inactive'"
            text="OK"
            @click.native="handleRefreshPaymentToken"
            :loading="isPaymentUrlRefreshing"
          />
          <PaymentButton
            class="non-translate"
            text="Cancel"
            @click.native="hideModal()"
          />
        </div>
      </div>
      <div v-else>
        <div class="qr_title">
          <PaymentText tag="h3" type="subtitle" html="Tap QR cord" />
          <PaymentText tag="p" html="Access with Metamask Mobile Browser" />
        </div>
        <div class="qr">
          <div class="qr_wrap">
            <a :href="metamaskMobileDeeplinkUrl">
              <vue-qrcode :value="metamaskMobileDeeplinkUrl" tag="img" />
              <img
                class="logo"
                src="@/assets/images/logo-icon.svg"
                alt="Web3 Payment"
              />
            </a>
            <img
              class="logo2"
              src="@/assets/images/logo-text.svg"
              alt="Web3 Payment"
            />
          </div>
        </div>
        <PaymentText
          class="desc"
          tag="p"
          html="You can access this page with the MetaMaskMobile browser by scanning the following QR code on a device with MetaMaskMobile installed."
        />
        <div class="deeplink">
          <a :href="metamaskMobileDeeplinkUrl"
            ><PaymentText html="Access with MetaMask Mobile Browser"
          /></a>
        </div>
        <PaymentCopy :copytext="paymentUrl" />
      </div>
      <div
        class="d-btnwrap bottomCloseBtn"
        v-if="!isPaymentUrlRefreshing && !isPaymentUrlRefreshed"
      >
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
import VueQrcode from "@chenfengyuan/vue-qrcode";
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentButton from "@/components/organisms/Payment/Button";
import PaymentConfirmCheckbox from "@/components/organisms/Payment/ConfirmCheckbox";
import PaymentCopy from "@/components/organisms/Payment/Copy";
import PaymentModal from "@/components/organisms/Payment/Modal";
import { DARK_THEME } from "@/constants";
import DeviceIdHandlerMixin from '@/components/mixins/DeviceIdHandler'

export default {
  name: "regeneratePaymentUrlModal",
  components: {
    VueQrcode,
    PaymentText,
    PaymentButton,
    PaymentConfirmCheckbox,
    PaymentCopy,
    PaymentModal,
  },
  mixins: [DeviceIdHandlerMixin],
  data() {
    return {
      confirmed: false,
      refreshing: false,
      refreshed: false,
      paymentUrl: null,
    };
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    classes() {
      const classes = ["modal-box", `--${this.$store.state.modal.size}`];
      return classes;
    },
    closeIcon() {
      return this.isDarkTheme
        ? require("@/assets/images/cross.svg")
        : require("@/assets/images/cross-l.svg");
    },
    copyIcon() {
      return this.isDarkTheme
        ? require("@/assets/images/copy.svg")
        : require("@/assets/images/copy-l.svg");
    },
    paymentToken() {
      return this.$route.params.token;
    },
    metamaskMobileDeeplinkUrl() {
      const url = new URL(this.paymentUrl);
      return `https://metamask.app.link/dapp/${url.host}${url.pathname}${url.search}`;
    },
    isConfirmed() {
      return this.confirmed;
    },
    isPaymentUrlRefreshing() {
      return this.refreshing && !this.refreshed;
    },
    isPaymentUrlRefreshed() {
      return !this.refreshing && this.refreshed;
    },
    isDarkTheme() {
      return this.$store.state.theme === DARK_THEME;
    },
  },
  methods: {
    apiRefreshPaymentToken() {
      const url = `${this.API_BASE_URL}/api/v1/payment/token/refresh`;
      const request = {
        params: new URLSearchParams([["payment_token", this.paymentToken]]),
      };
      return this.axios.get(url, request);
    },
    handleRefreshPaymentToken(event) {
      if (!this.isConfirmed) {
        return event.preventDefault()
      }
      this.refreshing = true;
      this.apiRefreshPaymentToken()
        .then((response) => {
          // this.$store.dispatch("payment/updateDeviceId", null);
          this.$_deviceIdHandler_destroy()
          this.paymentUrl = `${location.protocol}//${location.host}/payment/${response.data.token}?ucnv=1`;
          this.refreshing = false;
          this.refreshed = true;
        })
        .catch(() => {
          this.$store.dispatch("modal/show", {
            target: "error-modal",
            size: "small",
            params: {
              message:
                "Failed to refresh the Payment URL.<br>Please try again.",
            },
          });
        });
    },
    updateConfirmedStatus() {
      // this.confirmed = this.$refs.confirmed.checked;
      this.confirmed = this.$refs.confirmed.checkbox;
    },
    // copy(value) {
    //   this.$store.dispatch("account/copied");
    //   this.$clipboard(value);
    // },
    hideModal() {
      this.$store.dispatch("modal/hide");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.bodytitle {
  margin-bottom: 1rem;
}
.qr_title {
  margin-bottom: 1rem;
  &::v-deep {
    text-align: center;
    * {
      text-align: center;
    }
  }
}
.qr {
  width: 80%;
  max-width: 240px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  background: $gradation-light;
  padding: 6px;
  border-radius: 1rem;
  overflow: hidden;
  &_wrap {
    background-color: #fff;
    padding-bottom: 1rem;
    border-radius: 0.8rem;
  }
  a {
    position: relative;
    display: block;
    @include media(pc) {
      pointer-events: none;
    }
    img {
      width: 100%;
      position: relative;
      z-index: 1;
      border-radius: 1rem;
    }
  }
  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 20%;
    height: auto;
  }
  .logo2 {
    width: 38%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: -1rem;
    position: relative;
    z-index: 10;
  }
}
.desc {
  margin-bottom: 1rem;
}
.deeplink {
  width: 100%;
  // text-align: center;
  font-size: 13px;
  padding-right: 22px;
  // margin-top: 1rem;
  margin-bottom: 2rem;

  @include media(pc) {
    display: none;
  }
  a {
    color: var(--Textlink);
    text-decoration: underline;
  }
  a::after {
    content: "";
    background: url(/assets/images/logout.svg) no-repeat center center;
    width: 17px;
    height: 17px;
    position: absolute;
    margin-left: 5px;
  }
}
.url-wrap {
  position: relative;
  // width: 100%;
  padding: 15px 0 15px 18px;
  background: var(--color_box);
  border-radius: 8px;
  vertical-align: middle;
  .url {
    width: 85%;
    height: 48px;
    overflow: scroll;
    -ms-overflow-style: none;
    overflow-wrap: break-word;
    font-weight: 100;
    font-size: 1.6rem;
  }
  .url::-webkit-scrollbar {
    display: none;
  }
  figure {
    position: absolute;
    top: 22px;
    right: 15px;
    .btn-copy {
      cursor: pointer;
    }
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
//     max-height: 85%;
//     overflow: auto;
//   }
// }

// .header {
//   @include media(pc) {
//     padding: 24px 24px 0 24px;
//     &__title {
//       font-size: 2.5rem;
//       margin-bottom: 2rem;
//     }
//     &__title::before {
//       width: 2.5rem;
//       height: 2.5rem;
//     }
//     &__desc {
//       font-size: 1.6rem;
//     }
//   }
//   @include media(sp) {
//     padding: 18px 18px 0 18px;
//     &__title {
//       font-size: 2rem;
//       margin-bottom: 1rem;
//     }
//     &__title::before {
//       width: 2rem;
//       height: 2rem;
//     }
//     &__desc {
//       font-size: 1.5rem;
//     }
//   }
//   &__title {
//     font-weight: 500;
//   }
// }
// .separate-line {
//   border-bottom: 1px solid #78668d;
//   @include media(pc) {
//     margin: 0 24px;
//   }
//   @include media(sp) {
//     margin: 0 18px;
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
//     padding: 24px 24px 24px 24px;
//     &__title {
//       font-size: 2rem;
//     }
//     &__title::before {
//       width: 2.7rem;
//       height: 2.7rem;
//     }
//   }
//   @include media(sp) {
//     padding: 24px 18px 24px 18px;
//     &__title {
//       font-size: 1.8rem;
//     }
//     &__title::before {
//       width: 2.2rem;
//       height: 2.2rem;
//     }
//     .btn_content {
//       margin-left: 0;
//       p {
//         font-size: 10px;
//       }
//     }
//   }
//   &__title {
//     font-weight: 300;
//     margin-bottom: 1rem;
//     &:before {
//       content: "";
//       margin-right: 5px;
//       display: inline-block;
//       background: url(/assets/images/reuse-green.svg) no-repeat center center;
//       background-size: contain;
//       vertical-align: middle;
//     }
//   }
//   label {
//     display: block;
//     margin-top: 1rem;
//     padding: 1.5rem;
//     cursor: pointer;
//     background-color: var(--color_bg_modal);
//     border-radius: 4px;
//     @include media(sp) {
//       padding: 1rem;
//     }
//     input {
//       display: none;
//       & + span {
//         position: relative;
//         display: block;
//         padding-left: 3rem;
//         @include media(sp) {
//           padding-left: 2.5rem;
//         }
//         &::before {
//           content: "";
//           display: block;
//           width: 18px;
//           height: 18px;
//           border: 2px solid var(--color_font);
//           position: absolute;
//           left: 0;
//           top: 2px;
//           @include media(sp) {
//             width: 14px;
//             height: 14px;
//           }
//         }
//       }
//       &:checked {
//         & + span {
//           &::before {
//             background-color: var(--color_font);
//           }
//           &::after {
//             content: "";
//             display: block;
//             width: 16px;
//             height: 8px;
//             border-left: 3px solid #22b142;
//             border-bottom: 3px solid #22b142;
//             transform-origin: center center;
//             transform: rotate(-45deg);
//             position: absolute;
//             left: 1px;
//             top: 5px;
//             @include media(sp) {
//               width: 12px;
//               height: 6px;
//             }
//           }
//         }
//       }
//     }
//   }

//   .btn-container {
//     @include media(pc) {
//       padding: 0 80px 0;
//     }
//     @include media(sp) {
//       padding: 0 40px 0;
//     }
//   }

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
// #paying-accept-checkbox {
//   font-size: 1.5rem;
//   line-height: 1.5;
//   cursor: pointer;
// }
// #button-container {
//   text-align: center;
// }
// .continue-button {
//   position: relative;
//   font-size: 17px;
//   font-weight: 100;
//   cursor: pointer;
//   padding: 4px 16px;
//   border-radius: 10px;
//   border: solid 1px #fff;
//   &.__active {
//     color: #fff;
//     background: $gradation-pale;
//   }
// }
</style>
