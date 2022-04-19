<template>
  <div class="ADMIN">
    <div>
      <Header />
      <div class="connect-wallet">
        <dl>
          <dt>
            <img src="@/assets/images/logo-icon.svg" class="" alt="Slash Payment">
            Slash.fi
          </dt>
          <dd>
            <p>Apps</p>
          </dd>
          <dd class="connect-buttons">
            <button class="btn __m icon-right full" @click="useMetamask">
              <span class="btn-icon">
                <img src="@/assets/images/metamask-fox.svg">
              </span>
              MetaMask
            </button>
            <button class="btn __m icon-right full" @click="useWalletConnect">
              <span class="btn-icon">
                <img src="@/assets/images/wallet-connect.svg">
              </span>
              WalletConnect
            </button>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN_TOKEN } from '@/constants'
import Header from "@/components/organisms/header"

export default {
  name: 'MerchantLogin',
  components: {
    Header
  },
  methods: {
    useMetamask() {
      this.$web3.connectByMetamask().then((provider) => {
        this.walletConnected(provider)
      }).catch((error) => {
        if (error.name === 'MetamaskNotInstalledError') {
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
            size: 'small'
          })
        }
      })
    },
    useWalletConnect() {
      this.$web3.connectByWalletConnect().then((provider) => {
        this.walletConnected(provider)
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
        direct_token: this.$route.query.token ? this.$route.query.token : null,
        signature: signature
      }
      return this.axios.post(url, params)
    },
    walletConnected(provider) {
      this.$web3.getAccountData(
        provider.instance,
        provider.chainId
      ).then((account) =>{
        this.$web3.signWithPrivateKey(
          provider.instance,
          account.address
        ).then((signature) => {
          this.apiConnectAuthentification(
            account.address,
            signature
          ).then((authed) => {
            this.$store.dispatch('web3/update', provider)
            this.$store.dispatch('account/update', account)
            localStorage.setItem(LOGIN_TOKEN, authed.data[LOGIN_TOKEN])
            this.$router.push({ path: '/admin/dashboard' })
          })
        })
      })
    }
  },
  created() {
    this.$store.dispatch('web3/initialize')
    this.$store.dispatch('account/initialize')
    if (process.env.VUE_APP_MANAGEMENT_AUTO_LOGIN === 'true') {
      if (this.$web3.isConnectedByWalletConnect()) {
        this.$web3.connectByWalletConnect().then((provider) => {
          this.walletConnected(provider)
        })
      } else {
        const web3 = this.$web3.getWeb3Instance()
        this.$web3.getAccounts(web3).then((accounts) => {
          if (accounts.length > 0) {
            this.$web3.connectByMetamask().then((provider) => {
              this.walletConnected(provider)
            })
          }
        })
      }
    } else {
      if (localStorage.getItem(LOGIN_TOKEN)) {
        localStorage.removeItem(LOGIN_TOKEN)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
header{
  .logo{
    width: 250px;
    height: 100%;
  }
}
.connect-wallet{
  position: absolute;
  top: calc(50% + 6rem);
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow:
    -20px 20px 70px rgba(139, 42, 225, 0.7),
    20px -20px 70px rgba(62, 185, 252, 0.7);
  width: 100%;
  max-width: 38.4rem;
  padding: 16px;
  border-radius: 8px;
  background: #292536;
  padding: 50px 24px 32px;
  @include media(sp) {
    top: 20%;
    transform: translate(-50%,0);
  }
  dl{
    dt{
        text-align: center;
        margin-bottom: 32px;
        letter-spacing: 0.05em;
        font-weight: 500;
        font-size: 30px;
        line-height: 30px;
        color: #fff;
      img{
        width: 30px;
      }
    }
    dd{
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #fff;
      p{
        margin-bottom: 32px;
      }
      &.connect-buttons {
        .btn{
          background: #352D40 !important;
        }
      }
      .btn-icon {
        text-align: right;
      }
    }
  }
}
</style>