<script>
import AvailableNetworks from '@/network'

export default {
  name: 'Web3ProviderEvents',
  computed: {
    web3() {
      return this.$store.state.web3.instance
    },
    provider() {
      return (this.web3)
        ? this.web3.currentProvider
        : null
    },
    systemAvailableNetworks() {
      return Object.values(AvailableNetworks).map((network) => {
        return network.chainId
      })
    },
    paymentAvailableNetworks() {
      return this.$store.state.payment.availableNetworks
    }
  },
  methods: {
    handleAccountChanged() {
      const currentPath = this.$route.path
      const adminPath = /^\/admin\/(\/|\w)+$/
      const paymentPath = /^\/payment\//
      if (adminPath.test(currentPath)) {
        this.$router.push({ path: '/admin' })
      } else if (paymentPath.test(currentPath)) {
        this.$router.push({ path: `/payment/wallets/${this.$route.params.token}` })
      }
    },
    handleChainChanged(chainId) {
      chainId = (this.web3.utils.isHex(chainId))
          ? this.web3.utils.hexToNumber(chainId)
          : chainId
      const currentPath = this.$route.path
      const adminPath = /^\/admin\/(\/|\w)+$/
      const paymentPath = /^\/payment\//
      let availableNetwork = false

      if (adminPath.test(currentPath)) {
        availableNetwork = this.systemAvailableNetworks.includes(chainId)
      } else if (paymentPath.test(currentPath)) {
        availableNetwork = this.paymentAvailableNetworks.includes(chainId)
      }

      if (availableNetwork) {
        this.$web3.getAccountData(this.web3, chainId).then((accountData) => {
          this.$store.dispatch('web3/updateChainId', chainId)
          this.$store.dispatch('account/update', accountData)
        })
      } else {
        this.$store.dispatch('openModal', {
          target: 'error-modal',
          size: 'small',
          message: 'The current network does not support it.'
        })
      }
    }
  },
  created() {
    if (this.provider) {
      this.provider.on('accountsChanged', () => {
        this.handleAccountChanged()
      })
      this.provider.on('chainChanged', (chainId) => {
        chainId = (this.web3.utils.isHex(chainId))
          ? this.web3.utils.hexToNumber(chainId)
          : chainId
        this.handleChainChanged(chainId)
      })
    }
  },
  beforeDestroy() {
    if (this.provider) {
      this.provider.removeListener(
        'accountsChanged',
        this.handleAccountChanged
      )
      this.provider.removeListener(
        'chainChanged',
        this.handleChainChanged
      )
    }
  }
}
</script>
