<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Select a Wallet
      </h3>
    </div>
    <div class="body">
      <button class="btn __m full" @click="useMetamask">
        <span class="btn-icon">
          <img src="@/assets/images/metamask-fox.svg">
        </span>
          MetaMask
      </button>
      <button class="btn __m full" @click="useWalletConnect">
        <span class="btn-icon">
          <img src="@/assets/images/wallet-connect.svg">
        </span>
          WalletConnect
      </button>
    </div>
    <button class="close" @click="closeModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
  </div>
</template>

<script>
  import Web3ConnectorMixin from '@/components/mixins/Web3Connector';

  export default {
    name: 'walletModal',
    mixins: [
      Web3ConnectorMixin
    ],
    computed: {
      classes() {
        return [ 'modal-box', `--${this.$store.state.modal.size}` ]
      }
    },
    methods: {
      openModal(target, size) {
        this.$store.dispatch('openModal', {target: target, size: size});
      },
      closeModal() {
        this.$store.dispatch('closeModal')
      },
      useMetamask() {
        const successFunc = () => { this.closeModal() };
        const failureFunc = () => { this.openModal('error-metamask-modal', 'small') };
        const errorFunc = () => { this.openModal('error-metamask-modal', 'small') };
        this.connectByMetamask(successFunc, failureFunc, errorFunc);
      },
      useWalletConnect() {
        const successFunc = () => { this.closeModal() };
        const failureFunc = () => { this.openModal('error-wallet-modal', 'small') };
        const errorFunc = () => { this.openModal('error-wallet-modal', 'small') };
        this.connectByWalletConnect(successFunc, failureFunc, errorFunc);
      },
      isSelectedNetwork() {
        return !!this.$store.state.network.abbriviation;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .modal-box {
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:var(--color_bg);
    @include media(pc) {
      &.--small {
        width: 470px;
      }
      &.--medium {
        width: 760px;
      }
    }
    @include media(sp) {
      width: calc(100vw - 32px);
    }

  }
  .header {
    @include media(pc) {
      padding: 24px;
      &__title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      &__desc {
        font-size: 2rem;
      }
    }
    @include media(sp) {
      padding: 18px;
      &__title {
        font-size: 1.7rem;
      }
    }
    &__title {
      font-weight: 500;
    }
    &__desc {
      font-weight: 100;
    }
  }
  .close {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 0;

    @include media(pc) {
      top: 30px;
      right: 24px;
    }
    @include media(sp) {
      top: 24px;
      right: 24px;
    }
  }
  .body {
    @include media(pc) {
      padding: 24px 24px 40px;
    }
    @include media(sp) {
      padding: 16px 12px 48px;
    }
  }
  .footer {
    text-align: center;

    @include media(pc) {
      padding: 0 40px 40px;
    }
    @include media(sp) {
      padding: 0 32px 32px;
    }
  }
</style>