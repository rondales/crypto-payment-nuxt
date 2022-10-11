<template>
  <div class="payment_top">
    <div class="payment_headbox add-flex j-between a-center">
      <div v-if="isInvoiceHeaderMode" class="add-flex a-end j-between">
        <div
          v-if="isCurrentRequestConnectWalletPage"
          class="logo copy"
          @click="showRegeneratePaymentUrlModal()"
        >
          <figure>
            <img :src="scanIcon" />
          </figure>
        </div>
        <div
          v-else-if="isCurrentBeforeSendTransactionPages"
          class="logo copy"
          @click="prevPage()"
        >
          <figure>
            <img :src="prevIcon" />
          </figure>
        </div>
        <div
          v-else-if="isCurrentResultPage"
          class="logo copy"
          @click="copyLink()"
        >
          <figure>
            <img :src="linkIcon" />
          </figure>
        </div>
      </div>
      <div v-if="isInvoiceHeaderMode">
        <div class="logo">
          <figure>
            <img src="@/assets/images/invoice.svg" />
          </figure>
        </div>
      </div>
      <div v-else class="logo add-flex a-end">
        <figure>
          <img src="@/assets/images/slash.svg" />
        </figure>
        <div class="product_name">Web3 Payment</div>
      </div>
      <div class="hamburger" @click="hideMenu" :class="{ active: showMenu }">
        <button type="button" class="menu-btn">
          <img :src="hamburgerIcon" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import VuexRestore from "@/components/mixins/VuexRestore";

export default {
  name: "PaymentTop",
  mixins: [VuexRestore],
  props: ["showMenu"],
  data() {
    return {
      success: true,
      invoice: false,
      address: "hogefugahogefuga",
      currentRouteName: "",
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
        (this.currentRouteName === "ww-exchange" ||
          this.currentRouteName === "ww-detail") &&
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
      return this.$route.name === "ww-wallets";
    },
    isCurrentBeforeSendTransactionPages() {
      const pages = ["ww-token", "ww-exchange", "ww-detail"];
      return pages.includes(this.$route.name);
    },
    isCurrentResultPage() {
      return this.$route.name === "ww-result";
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.payment_top {
  margin-bottom: 16px;
  .logo {
    .product_name {
      font-size: 15px;
      margin-left: 16px;
      font-weight: 300;
    }
  }
  .copy {
    cursor: pointer;
  }
  .hamburger {
    display: block;
    position: relative;
    width: 24px;
    height: 24px;
    overflow: hidden;
    z-index: 2;
    &.active {
      .menu-btn {
        top: 0;
      }
    }
    .menu-btn {
      position: absolute;
      top: -23px;
    }
  }
}
</style>
