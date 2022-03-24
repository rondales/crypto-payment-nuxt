<template>
  <body :class="[classes, { contents_height: isAdminPage }]" >
    <router-view />
    <div v-if="modal.show" class="modal-base">
      <component :is="modal.target" />
    </div>
    <div class="copied" v-if="$store.state.account.isCopied">
      <img src="@/assets/images/check-mark.svg">
      <span>
        copied
      </span>
    </div>
  </body>
</template>

<script>
export default {
  name: 'App',
  components: {
    networkModal: () => import('@/components/molecules/networkModal'),
    walletModal: () => import('@/components/molecules/walletModal'),
    errorWalletModal: () => import('@/components/molecules/errorWalletModal'),
    errorMetamaskModal: () => import('@/components/molecules/errorMetamaskModal'),
    errorModal: () => import('@/components/molecules/errorModal'),
    requireSwitchNetworkModal: () => import('@/components/molecules/requireSwitchNetworkModal'),
    receiveModal: () => import('@/components/molecules/receiveModal')
  },
  computed: {
    classes() {
      return [
        `theme--${this.$store.state.theme}`,
      ];
    },
    isAdminPage() {
      return this.$route.name === 'admin'
    },
    modal() {
      return this.$store.state.modal
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

body{
    background: var(--color_bg);
    color: var(--color_font);
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
  background: rgba(0,0,0,.6);
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 9999;
}

.contents_height{
  min-height: calc(100vh - 50px);
  margin-top: 80px;
  position: relative;
  @include media(sp) {
    margin-top: 55px;
  }
}
</style>
