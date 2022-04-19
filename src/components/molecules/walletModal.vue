<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Select a Wallet
      </h3>
    </div>
    <div class="body">
      <button class="btn __m __pg icon-right full" @click="useMetamask">
        <span class="btn-icon">
          <img src="@/assets/images/metamask-fox.svg">
        </span>
          MetaMask
      </button>
      <button class="btn __m __pg icon-right full" @click="useWalletConnect">
        <span class="btn-icon">
          <img src="@/assets/images/wallet-connect_w.svg">
        </span>
          WalletConnect
      </button>
    </div>
    <button class="close" @click="hideModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
  </div>
</template>

<script>
  import { LOGIN_TOKEN } from '@/constants'
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
      hideModal() {
        this.$store.dispatch('modal/hide')
      },
      useMetamask() {
        this.$web3.connectByMetamask().then((connectRes) => {
          this.$store.dispatch('web3/update', connectRes)
          this.$web3.getAccountData(
            connectRes.instance,
            connectRes.chainId
          ).then((accountRes) =>{
            this.$store.dispatch('account/update', accountRes)
            this.connected(connectRes.instance, accountRes.address)
          })
        }).catch((error) => {
          if (error.name === 'MetamaskNotInstalledError' ||  error.name === 'ProviderChainConnectError') {
            this.$store.dispatch('modal/show', {
              target: 'error-modal',
              size: 'small',
              params: {
                message: error.message
              }
            })
          } else {
            this.$store.dispatch('modal/show', {
              target: 'error-metamask-modal',
              size: 'small',
            })
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
            this.connected(connectRes.instance, accountRes.address)
          })
        }).catch(() => {
          this.$store.dispatch('modal/show', {
            target: 'error-wallet-modal',
            size: 'small'
          })
        })
      },
      apiConnectAuthentification(walletAddress, signature) {
        const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/management/connect'
        const params = {
          address: walletAddress,
          token: localStorage.getItem(LOGIN_TOKEN) ? localStorage.getItem(LOGIN_TOKEN) : null,
          signature: signature
        }
        return this.axios.post(url, params)
      },
      connected(web3Instance, walletAddress) {
        const adminPathPattern = /^\/admin$/
        const paymentPathPattern = /^\/payment\//

        if (adminPathPattern.test(this.$route.path)) {
          this.$web3.signWithPrivateKey(
            web3Instance,
            walletAddress
          ).then((signature) => {
            this.apiConnectAuthentification(walletAddress, signature).then((authed) => {
              localStorage.setItem(LOGIN_TOKEN, authed.data[LOGIN_TOKEN])
              this.hideModal()
              this.$router.push({ path: '/admin/dashboard' })
            })
          })
        } else if(paymentPathPattern.test(this.$route.path)) {
          this.hideModal()
          this.$router.push({
            path: '/payment/token/' + this.$route.params.token
          })
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
        font-size: 2.3rem;
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