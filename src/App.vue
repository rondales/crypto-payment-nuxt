<template>
  <body class="scroll-lock min-height" :class="classes" >
    <router-view />
    <div v-if="$store.state.modal.isShow" class="modal-base">
      <component :is="$store.state.modal.target" />
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
    detailModal: () => import('@/components/molecules/detailModal'),
    waitingModal: () => import('@/components/molecules/waitingModal'),
    submittedModal: () => import('@/components/molecules/submittedModal'),
    dismissModal: () => import('@/components/molecules/dismissModal'),
  },
  computed: {
    classes() {
      return [
        `theme--${this.$store.state.theme}`,
      ];
    },
  },
  updated(){
    if(!(this.$route.path == "/payment")){
      this.$store.dispatch("currentPath", {invoicePage: true});
    }
    else{
      this.$store.dispatch("currentPath", {invoicePage: false});
    }
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
  z-index: 100;
}
.min-height{
  min-height: 120vh;
}
</style>
