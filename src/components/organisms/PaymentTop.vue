<template>
  <div class="">
    <div v-if="isInvoiceHeaderMode" class="payhead">
      <PaymentTitle type="h2_g" html="INVOICE" />
      <div>
        <PaymentButton
          :icon="invoiceIcon.icon"
          @click.native="handle_function_call(invoiceIcon.func)"
          size="icon"
          color="icon"
        />
      </div>
    </div>
    <div v-else class="payhead">
      <!-- <PaymentIcon class="" path="logo-text" />
        <PaymentText tag="p" type="h5" html="Web3 Payment" /> -->
    </div>
    <!-- <div class="payment_top">
      <div v-if="isInvoiceHeaderMode">
        <div
          v-if="isCurrentRequestConnectWalletPage"
          class="logo copy"
          @click="showRegeneratePaymentUrlModal()"
        >
          <PaymentIcon path="scan" />
        </div>
        <div
          v-else-if="isCurrentBeforeSendTransactionPages"
          class="logo copy"
          @click="prevPage()"
        >
          <PaymentIcon path="left-arrow" />
        </div>
        <div
          v-else-if="isCurrentResultPage"
          class="logo copy"
          @click="copyLink()"
        >
          <PaymentIcon path="link" />
        </div>
        <PaymentTitle type="h2_g" html="INVOICE" layout="c" />
      </div>
      <div v-else>
        <PaymentIcon class="" path="logo-text" />
        <PaymentText tag="p" type="h5" html="Web3 Payment" />
      </div>
      <div class="hamburger" @click="hideMenu" :class="{ active: showMenu }">
        <button type="button" class="menu-btn">
          <span>a</span>
        </button>
      </div>
    </div> -->
  </div>
</template>


<script>
import VuexRestore from "@/components/mixins/VuexRestore";
import PaymentTitle from "@/components/organisms/Payment/Title";
// import PaymentText from "@/components/organisms/Payment/Text";
// import PaymentIcon from "@/components/organisms/Payment/Icon";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "PaymentTop",
  mixins: [VuexRestore],
  props: ["showMenu"],
  components: {
    PaymentTitle,
    // PaymentText,
    // PaymentIcon,
    PaymentButton,
  },
  data() {
    return {
      success: true,
      invoice: false,
      address: "hogefugahogefuga",
      currentRouteName: "",
      invoiceIcon: {
        icon: "",
        func: "",
      },
    };
  },
  watch: {
    $route(route) {
      this.currentRouteName = route.name;
    },
  },
  computed: {
    scanIcon() {
      return this.isDarkTheme
        ? require("@/assets/images/camera-scan.svg")
        : require("@/assets/images/camera-scan-l.svg");
    },
    linkIcon() {
      return this.isDarkTheme
        ? require("@/assets/images/link.svg")
        : require("@/assets/images/link-l.svg");
    },
    prevIcon() {
      return this.isDarkTheme
        ? require("@/assets/images/left-arrow.svg")
        : require("@/assets/images/left-arrow-l.svg");
    },
    hamburgerIcon() {
      return this.isDarkTheme
        ? require("@/assets/images/hamburger.svg")
        : require("@/assets/images/hamburger-light.svg");
    },
    prevMode() {
      return (
        (this.currentRouteName === "exchange" ||
          this.currentRouteName === "detail") &&
        this.$store.state.payment.status === 1
      );
    },
    isInvoiceHeaderMode() {
      return (
        this.isCurrentRequestConnectWalletPage ||
        this.isCurrentBeforeSendTransactionPages ||
        this.isCurrentResultPage
      );
    },
    isCurrentRequestConnectWalletPage() {
      return this.$route.name === "wallets";
    },
    isCurrentBeforeSendTransactionPages() {
      const pages = ["token", "exchange", "detail"];
      return pages.includes(this.$route.name);
    },
    isCurrentResultPage() {
      return this.$route.name === "result";
    },
    isDarkTheme() {
      return this.$store.state.theme === "dark";
    },
  },
  methods: {
    open() {
      this.$store.dispatch("hamberger", { hamberger: true });
    },
    hideMenu() {
      this.$emit("toggleMenu", !this.showMenu);
    },
    copyLink() {
      this.$emit("copyLink");
    },
    prevPage() {
      this.$router.back();
    },
    showRegeneratePaymentUrlModal() {
      this.$store.dispatch("modal/show", {
        target: "regenerate-payment-url-modal",
        size: "small",
      });
    },
    handle_function_call(function_name) {
      console.log(function_name);
      if (function_name == "showRegeneratePaymentUrlModal") {
        this.showRegeneratePaymentUrlModal();
      } else if (function_name == "prevPage") {
        this.prevPage();
      } else if (function_name == "copyLink") {
        this.copyLink();
      }
    },
  },
  created() {
    if (this.isInvoiceHeaderMode) {
      if (this.isCurrentRequestConnectWalletPage) {
        // this.invoiceIcon.icon = "scan";
        // this.invoiceIcon.func = "showRegeneratePaymentUrlModal";
      } else if (this.isCurrentBeforeSendTransactionPages) {
        this.invoiceIcon.icon = "left-arrow";
        this.invoiceIcon.func = "prevPage";
      } else if (this.isCurrentResultPage) {
        this.invoiceIcon.icon = "link";
        this.invoiceIcon.func = "copyLink";
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.payhead {
  margin-top: 3rem;
  @include flex(space-between, center);
  margin-bottom: 2rem;
  & > * {
    &:nth-child(2) {
      width: auto;
    }
    &:nth-child(1),
    &:nth-child(3) {
      width: 2.5rem;
      font-size: 0;
    }
  }
  // padding: 4rem 0;
  // .svg {
  //   margin-bottom: 0.5rem;
  // }
}
// .payment_top {
//   margin-bottom: 16px;
//   .logo {
//     .product_name {
//       font-size: 15px;
//       margin-left: 16px;
//       font-weight: 300;
//     }
//   }
//   .copy {
//     cursor: pointer;
//   }
//   .hamburger {
//     display: block;
//     position: relative;
//     width: 24px;
//     height: 24px;
//     overflow: hidden;
//     z-index: 2;
//     &.active {
//       .menu-btn {
//         top: 0;
//       }
//     }
//     .menu-btn {
//       position: absolute;
//       top: -23px;
//     }
//   }
// }
</style>
