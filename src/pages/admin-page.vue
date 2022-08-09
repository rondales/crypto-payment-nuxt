<template>
  <div class="ADMIN">
    <admin-index />
  </div>
</template>

<script>
import Web3 from 'web3'
import { METAMASK, WALLET_CONNECT } from '@/constants'
import AvailableNetworks from '@/network'
import AdminIndex from '@/components/templates/AdminIndex'
import MerchantAdminAuthentificationMixin from '@/components/mixins/MerchantAdminAuthentification'

export default {
  name: 'adminPage',
  components: {
    AdminIndex
  },
  mixins: [MerchantAdminAuthentificationMixin],
  computed: {
    web3() {
      return this.$store.state.web3
    },
    account() {
      return this.$store.state.account
    },
    isSetWeb3Instance() {
      return this.$store.state.web3.instance instanceof Web3
    },
    isSetWeb3ProviderType() {
      return this.$store.state.web3.provider === METAMASK
              || this.$store.state.web3.provider === WALLET_CONNECT
    },
    merchantPausedNetworkStatus() {
      return this.$store.state.merchant.pausedNetworkStatus
    }
  },
  watch: {
    merchantPausedNetworkStatus(newStatus) {
      const networks = Object.values(AvailableNetworks).map((network) => {
        return network.chainId
      }).filter(item => newStatus[item] == true)
      if (networks && networks.length > 0) {
        const availableNetworkCount = networks.length
        this.$store.dispatch('modal/show', {
          target: 'admin-contract-paused-modal',
          size: availableNetworkCount > 1 ? 'medium' : 'small',
          params: {
            availableNetworks: networks,
            itemCount: availableNetworkCount
          }
        })
      }
    }
  },
  methods: {
    handleChainChanged(chainId) {
      const systemAvailableNetworks = Object.values(AvailableNetworks).map((network) => {
        return network.chainId
      })
      if (!systemAvailableNetworks.includes(chainId)) {
        this.$store.dispatch('modal/show', {
          target: 'switch-network-for-admin-modal',
          size: 'medium',
        })
      } else {
        const currentModalTarget = this.$store.state.modal.target
        if (currentModalTarget === 'switch-network-for-admin-modal') {
          this.$store.dispatch('modal/hide')
        }
      }
      this.$web3.getAccountData(this.web3.instance, chainId).then((accountData) => {
        this.$store.dispatch('web3/updateChainId', chainId)
        this.$store.dispatch('account/update', accountData)
      })
    },
    handleAccountsChanged(account) {
      if(!account[0]) {
        this.forceLogout()
        return
      }
      const newAccAddress = account[0].toLowerCase()
      if(this.account.address && newAccAddress != this.account.address.toLowerCase()) {
        this.authentification(
          this.$store.state.web3.provider,
          false,
          false
        )
      }
    },
    forceLogout() {
      this.$router.push({ path: '/admin' })
    },
    restoreWeb3Instance(provider) {
      switch (provider) {
        case METAMASK:
          this.resotreProviderForMetaMask()
          break
        case WALLET_CONNECT:
          this.restoreProviderForWalletConnect()
          break
        default:
          this.forceLogout()
          return
      }
    },
    resotreProviderForMetaMask() {
      const web3Instance = this.$web3.getWeb3Instance()
      this.checkSameAccount(web3Instance)
        .then((isAccountSame) => {
          if (!isAccountSame) {
            this.forceLogout()
            return
          }
        })
        .then(() => {
          return this.getCurrentChainId(web3Instance)
        })
        .then((currentChainId) => {
          this.$store.dispatch('web3/updateInstance', web3Instance)
          this.$store.dispatch('web3/updateChainId', currentChainId)
          this.setEventsListener()
        })
        .catch(() => {
          this.forceLogout()
        })
    },
    restoreProviderForWalletConnect() {
      if (!this.$web3.isConnectedByWalletConnect()) {
        this.forceLogout()
        return
      }
      this.$web3.connectByWalletConnect()
        .then((provider) => {
          const checkResult = this.checkSameAccount(provider.instance)
          return {
            web3: provider,
            isAccountSame: checkResult
          }
        })
        .then((checkedData) => {
          if (!checkedData.isAccountSame) {
            this.forceLogout()
            return
          }
          this.$store.dispatch('web3/updateInstance', checkedData.web3.instance)
          this.$store.dispatch('web3/updateChainId', checkedData.web3.chainId)
          this.setEventsListener()
        })
        .catch(() => {
          this.forceLogout()
        })
    },
    checkSameAccount(web3Instance) {
      return this.$web3.getAccounts(web3Instance)
        .then((accounts) => {
          return accounts.length && accounts[0].toLowerCase() === this.account.address.toLowerCase()
        })
    },
    checkSupportedChain(chainId) {
      return Object.values(AvailableNetworks)
              .map((network) => { return network.chainId })
              .includes(chainId)
    },
    getCurrentChainId(web3Instance) {
      return this.$web3.getCurrentChainId(web3Instance)
    },
    setEventsListener() {
      this.web3.instance.currentProvider.on('chainChanged', (chainId) => {
        chainId = (this.web3.instance.utils.isHex(chainId))
          ? this.web3.instance.utils.hexToNumber(chainId)
          : chainId
        this.handleChainChanged(chainId)
      })
      this.web3.instance.currentProvider.on('accountsChanged', this.handleAccountsChanged)
    }
  },
  created() {
    if (this.isSetWeb3Instance && this.isSetWeb3ProviderType) {
      this.setEventsListener()
    } else if (!this.isSetWeb3Instance && this.isSetWeb3ProviderType) {
      this.restoreWeb3Instance(this.web3.provider)
    } else {
      this.forceLogout()
    }
  },
  beforeDestroy() {
    if (this.web3.instance) {
      this.web3.instance.currentProvider.removeListener(
        'chainChanged',
        this.handleChainChanged
      )
      this.web3.instance.currentProvider.removeListener(
        'accountsChanged',
        this.handleAccountsChanged
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
</style>