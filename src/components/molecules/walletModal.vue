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
      openModal(target, size, message = '') {
        this.$store.dispatch('openModal', {target: target, size: size, message: message});
      },
      closeModal() {
        this.$store.dispatch('closeModal')
      },
      useMetamask() {
        this.$web3.connectByMetamask().then((connectRes) => {
          this.$store.dispatch('web3/update', connectRes)
          this.$web3.getAccountData(
            connectRes.instance,
            connectRes.chainId
          ).then((accountRes) =>{
            this.$store.dispatch('account/update', accountRes)
            const pathRegPattern = /^\/payment\//
            let nextPath
            if (pathRegPattern.test(this.$route.path)) {
              nextPath = '/payment/token/' + this.$route.params.token
            }
            this.closeModal()
            this.$router.push({ path: nextPath })
          })
        }).catch((error) => {
          if (error.name === 'MetamaskNotInstalledError' ||  error.name === 'ProviderChainConnectError') {
            this.openModal('error-modal', 'small', error.message)
          } else {
            this.openModal('error-metamask-modal', 'small')
          }
        })
      },
      useWalletConnect() {
        this.$web3.connectByWalletConnect().then((connectRes) => {
          this.$store.dispatch('web3/update', connectRes)
          this.$web3.getAccountData(
            connectRes.instance,
            connectRes.chainId
          ).then((accountRes) =>{
            this.$store.dispatch('account/update', accountRes)
            const pathRegPattern = /^\/payment\//
            let nextPath
            if (pathRegPattern.test(this.$route.path)) {
              nextPath = '/payment/token/' + this.$route.params.token
            }
            this.closeModal()
            this.$router.push({ path: nextPath })
          })
        }).catch(() => {
          this.openModal('error-wallet-modal', 'small')
        })
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