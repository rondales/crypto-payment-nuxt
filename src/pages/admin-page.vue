<template>
  <div class="ADMIN">
    <admin-index />
  </div>
</template>

<script>
import { LOGIN_TOKEN, METAMASK, WALLET_CONNECT } from '@/constants'
import AdminIndex from '@/components/templates/AdminIndex'
import AvailableNetworks from '@/network'

export default {
  name: 'adminPage',
  components: {
    AdminIndex
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    web3() {
      return this.$store.state.web3
    },
    account() {
      return this.$store.state.account
    }
  },
  methods: {
    apiConnectAuthentification(walletAddress) {
      const url = `${this.baseUrl}/api/v1/management/connect`
      const params = {
        address: walletAddress,
        token: localStorage.getItem(LOGIN_TOKEN)
      }
      return this.axios.post(url, params)
    },
    handleChainChanged(chainId) {
      const systemAvailableNetworks = Object.values(AvailableNetworks).map((network) => {
        return network.chainId
      })
      if (!systemAvailableNetworks.includes(chainId)) {
        return this.$store.dispatch('modal/show', {
          target: 'error-modal',
          size: 'small',
          params: {
            message: 'The current network does not support it.'
          }
        })
      }
      this.$web3.getAccountData(this.web3.instance, chainId).then((accountData) => {
        this.$store.dispatch('web3/updateChainId', chainId)
        this.$store.dispatch('account/update', accountData)
      })
    },
    forceLogout() {
      this.$router.push({ path: '/admin' })
    }
  },
  created() {
    if (!this.web3.instance) {
      if (this.web3.provider === METAMASK) {
        const web3Instance = this.$web3.getWeb3Instance()
        this.$web3.getAccounts(web3Instance).then((accounts) => {
          if (accounts.length > 0 && accounts[0].toLowerCase() === this.account.address.toLowerCase()) {
            this.apiConnectAuthentification(this.account.address).then(() => {
              this.$web3.connectByMetamask().then((provider) => {
                this.$web3.getAccountData(provider.instance, provider.chainId).then((account) => {
                  this.$store.dispatch('web3/update', provider)
                  this.$store.dispatch('account/update', account)
                }).catch(() => {
                  this.forceLogout()
                })
              }).catch(() => {
                this.forceLogout()
              })
            }).catch(() => {
              this.forceLogout()
            })
          } else {
            this.forceLogout()
          }
        }).catch(() => {
          this.forceLogout()
        })
      } else if(this.web3.provider === WALLET_CONNECT) {
        if (this.$web3.isConnectedByWalletConnect()) {
          this.apiConnectAuthentification(this.account.address).then(() => {
            this.$web3.connectByWalletConnect().then((provider) => {
              this.$web3.getAccountData(provider.instance, provider.chainId).then((account) => {
                this.$store.dispatch('web3/update', provider)
                this.$store.dispatch('account/update', account)
              }).catch(() => {
                this.forceLogout()
              })
            }).catch(() => {
              this.forceLogout()
            })
          }).catch(() => {
            this.forceLogout()
          })
        } else {
          this.forceLogout()
        }
      } else {
        this.forceLogout()
      }
    } else {
      this.web3.instance.currentProvider.on('chainChanged', (chainId) => {
        chainId = (this.web3.instance.utils.isHex(chainId))
          ? this.web3.instance.utils.hexToNumber(chainId)
          : chainId
        this.handleChainChanged(chainId)
      })
    }
  },
  beforeDestroy() {
    if (this.web3.instance) {
      this.web3.instance.currentProvider.removeListener(
        'chainChanged',
        this.handleChainChanged
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
</style>