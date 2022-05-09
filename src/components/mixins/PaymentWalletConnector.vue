<script>
import { METAMASK, WALLET_CONNECT } from '@/constants'

export default {
  name: 'PaymentWalletConnector',
  methods: {
    connect(useProvider, modalMode) {
      const successFunc = this.$_paymentWalletConnector_getConnectSucceededFunction(modalMode)
      const failureFunc = this.$_paymentWalletConnector_getConnectFailuredFunction(useProvider)
      switch(useProvider) {
        case METAMASK:
          this.useMetaMask(successFunc, failureFunc)
          break
        case WALLET_CONNECT:
          this.useWalletConnect(successFunc, failureFunc)
          break
        default:
          this.$store.dispatch('modal/show', {
            target: 'error-modal',
            size: 'small',
            params: { message: 'This provider is not supported.' }
          })
      }
    },
    $_paymentWalletConnector_getConnectSucceededFunction(modalMode) {
      return (connectedData) => {
        this.$web3.getAccountData(connectedData.instance, connectedData.chainId)
          .then((accountData) => {
            this.$store.dispatch('web3/update', connectedData)
            this.$store.dispatch('account/update', accountData)
            if (modalMode) {
              this.$store.dispatch('modal/hide')
            }
            this.$router.push({ path: '/payment/token/' + this.$route.params.token })
          })
      }
    },
    $_paymentWalletConnector_getConnectFailuredFunction(useProvider) {
      return (error) => {
        if (useProvider === METAMASK) {
          if (error.name === 'MetamaskNotInstalledError') {
            this.$store.dispatch('modal/show', {
              target: 'error-modal',
              size: 'small',
              params: { message: error.message }
            })
          } else {
            this.$store.dispatch('modal/show', { target: 'error-metamask-modal', size: 'small'})
          }
          return
        }

        if (useProvider === WALLET_CONNECT) {
          this.$store.dispatch('modal/show', { target: 'error-wallet-modal', size: 'small'})
        }
      }
    },
  }
}
</script>