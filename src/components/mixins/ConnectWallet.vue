<script>
export default {
  name: 'ConnectWallet',
  methods: {
    useMetaMask(successFunc, failureFunc) {
      this.$web3.connectByMetamask()
        .then(successFunc)
        .catch(failureFunc)
    },
    useWalletConnect(successFunc, failureFunc) {
      this.$web3.connectByWalletConnect()
        .then(successFunc)
        .catch(failureFunc)
    },
  }
}
</script>