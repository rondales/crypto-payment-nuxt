<template>
  <div class="scroll-lock">
    <router-view />
    <div v-if="$store.state.modal.isShow" class="modal-base">
      <component :is="$store.state.modal.target" />
    </div>    
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    networkModal: () => import('@/components/molecules/networkModal'),
    walletModal: () => import('@/components/molecules/walletModal'),
    tokenModal: () => import('@/components/molecules/tokenModal'),
    errorWalletModal: () => import('@/components/molecules/errorWalletModal'),
    errorMetamaskModal: () => import('@/components/molecules/errorMetamaskModal'),
    manageModal: () => import('@/components/molecules/manageModal'),
    detailModal: () => import('@/components/molecules/detailModal'),
    waitingModal: () => import('@/components/molecules/waitingModal'),
    submittedModal: () => import('@/components/molecules/submittedModal'),
    dismissModal: () => import('@/components/molecules/dismissModal'),
  },
}
</script>

<style lang="scss">
  @import '@/assets/scss/style.scss';
  
body {
  background: #171522;
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
</style>
