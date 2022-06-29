<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Select a Wallet
      </h3>
    </div>
    <div class="body">
      <button class="btn __m __pg icon-right full" @click="connector(METAMASK)">
        <span class="btn-icon">
          <img src="@/assets/images/metamask-fox.svg">
        </span>
          MetaMask
      </button>
      <button class="btn __m __pg icon-right full" @click="showWalletConnectCautionModal()">
        <span class="btn-icon">
          <img src="@/assets/images/wallet-connect_w.svg">
        </span>
          WalletConnect
      </button>
    </div>
    <button class="close" @click="hideModal()">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
  </div>
</template>

<script>
  import { METAMASK } from '@/constants'
  import ConnectWalletMixin from '@/components/mixins/ConnectWallet'
  import PaymentWalletConnectorMixin from '@/components/mixins/PaymentWalletConnector'
  import MerchantAdminAuthentificationMixin from '@/components/mixins/MerchantAdminAuthentification'

  export default {
    name: 'walletModal',
    mixins: [
      ConnectWalletMixin,
      PaymentWalletConnectorMixin,
      MerchantAdminAuthentificationMixin,
    ],
    computed: {
      classes() {
        return [ 'modal-box', `--${this.$store.state.modal.size}` ]
      },
      METAMASK() {
        return METAMASK
      },
      isAdminLoginMode() {
        const path = /^\/admin$/
        return path.test(this.$route.path)
      },
      isPaymentMode() {
        const path = /^\/payment\//
        return path.test(this.$route.path)
      },
    },
    methods: {
      hideModal() {
        this.$store.dispatch('modal/hide')
      },
      showWalletConnectCautionModal() {
        this.$store.dispatch('modal/show', {
          target: 'caution-wallet-connect-modal',
          size: 'small'
        })
      },
      connector() {
        if (this.isAdminLoginMode) {
          this.authentification(METAMASK, true, true)
          return
        }
        if (this.isPaymentMode) {
          this.connect(METAMASK, true)
          return
        }
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
    // .btn {
    //   &.__m {
    //     background: $gradation-pale;
    //   }
    // }
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