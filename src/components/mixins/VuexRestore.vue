<script>
export default {
  name: 'VuexRestore',
  computed: {
    web3Instance() {
      return this.$store.state.web3.instance
    },
    web3ChainId() {
      return this.$store.state.web3.chainId
    },
    root() {
      const theme = this.$store.state.theme
      return { theme: theme }
    },
    modulePayment() {
      return this.$store.state.payment
    },
    isNeedRestore() {
      return !this.web3Instance && !this.web3ChainId
    }
  },
  methods: {
    generateRestoreParameter() {
      const rootData = this.root
      const paymentData = this.modulePayment
      const data = {
        theme: rootData.theme,
        payment: paymentData
      }
      return btoa(JSON.stringify(data))
    },
    restoreVuex(param) {
      const decodeData = atob(param)
      const data = JSON.parse(decodeData)
      this.$store.dispatch('changeTheme', data.theme)
      this.$store.dispatch('payment/update', data.payment)
    }
  }
}
</script>