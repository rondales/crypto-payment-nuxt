<template>
  <div :class="[classes, { contents_height: isAdminPage }]">
    <router-view />
    <div v-if="modal.show" class="modal-base">
      <component :is="modal.target" />
    </div>
    <div class="copied" v-if="$store.state.account.isCopied">
      <img src="@/assets/images/check-mark.svg" />
      <span> copied </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    meta: [{ vmid: "seo-robot-setting", name: "robots", content: "none" }],
  },
  components: {
    adminContractPausedModal: () =>
      import("@/components/molecules/adminContractPausedModal"),
    networkModal: () => import("@/components/molecules/networkModal"),
    walletModal: () => import("@/components/molecules/walletModal"),
    cautionWalletConnectModal: () =>
      import("@/components/molecules/cautionWalletConnectModal"),
    errorWalletModal: () => import("@/components/molecules/errorWalletModal"),
    errorMetamaskModal: () =>
      import("@/components/molecules/errorMetamaskModal"),
    errorCurrentNetworkModal: () =>
      import("@/components/molecules/errorCurrentNetworkModal"),
    errorNotExistAvailablePaymentContractModal: () =>
      import(
        "@/components/molecules/errorNotExistAvailablePaymentContractModal"
      ),
    errorForbiddenBackPaymentModal: () =>
      import("@/components/molecules/errorForbiddenBackPaymentModal"),
    switchNetworkForAdminModal: () =>
      import("@/components/molecules/switchNetworkForAdminModal"),
    errorModal: () => import("@/components/molecules/errorModal"),
    receiveModal: () => import("@/components/molecules/receiveModal"),
    editNoteModal: () => import("@/components/molecules/editNoteModal"),
    urlRefreshModal: () => import("@/components/molecules/urlRefreshModal"),
    plugInsTokenRefreshModal: () => import("@/components/molecules/plugInsTokenRefreshModal"),
    plugInsTokenDeleteModal: () => import("@/components/molecules/plugInsTokenDeleteModal"),
    deleteRowModal: () => import("@/components/molecules/deleteRowModal"),
    createDeeplinkModal: () => import("@/components/molecules/createDeeplinkModal"),
    openQrModal: () => import("@/components/molecules/openQrModal"),
    editAccountNoteModal: () =>
      import("@/components/molecules/editAccountNoteModal"),
    accountModal: () => import("@/components/molecules/accountModal"),
    contractIssuanceModal: () =>
      import("@/components/molecules/contractIssuanceModal"),
    regeneratePaymentUrlModal: () =>
      import("@/components/molecules/regeneratePaymentUrlModal"),
    contractCashbackChangeModal: () =>
      import("@/components/molecules/contractCashbackChangeModal"),
    contractReceiveAddressChangeModal: () =>
      import("@/components/molecules/contractReceiveAddressChangeModal"),
    cautionPaymentRiskDisclaimerModal: () =>
      import("@/components/molecules/cautionPaymentRiskDisclaimerModal"),
    addChainModal: () => import("@/components/molecules/addChainModal"),
  },
  computed: {
    classes() {
      return ["main", `theme--${this.$store.state.theme}`];
    },
    isAdminPage() {
      return this.$route.name === "admin";
    },
    modal() {
      return this.$store.state.modal;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

div.main {
  background: var(--color_bg);
  color: var(--color_font);
  overflow: hidden;
}
.theme--light {
  @each $item in $colors-array {
    --#{$item}: #{map-get($light-theme, #{$item})};
  }
}

.theme--dark {
  @each $item in $colors-array {
    --#{$item}: #{map-get($dark-theme, #{$item})};
  }
}
.modal-base {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  // width: 100vw;
  // height: 100vh;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
}

.contents_height {
  min-height: calc(100vh - 50px);
  margin-top: 80px;
  position: relative;
  @include media(sp) {
    margin-top: 55px;
  }
}
</style>
