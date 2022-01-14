<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Select a Wallet
      </h3>
      <p class="header__desc">
        Error connecting.
        <br>
        Try Again
      </p>
    </div>
    <div class="body">
      <a class="btn __m __pg full hight add-flex a-center mb-0" @click="retry">
        <span class="btn-icon">
          <img src="@/assets/images/wallet-connect.svg">
        </span>
        <div class="btn_content">
          <h4>
            WalletConnect.
          </h4>
          <p>
            Connect Trust Wallet,Rainbow Wallet and more…
          </p>
        </div>
      </a>
    </div>
    <button class="close" @click="closeModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
  </div>
</template>

<script>
  export default {
    name: 'walletModal',
    computed: {
      classes() {
        const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
        return classes
      }
    },
    methods: {
      closeModal() {
        this.$store.dispatch('closeModal')
      },
      retry(){
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
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      &__desc {
        font-size: 1.5rem;
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
      padding: 24px 12px 48px;
      .btn_content{
        margin-left: 0;
        p{
          font-size: 10px;
        }
      }
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