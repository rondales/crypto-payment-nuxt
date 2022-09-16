<template>
  <payment-index
    ref="paymentIndex"
    :colorTheme="colorTheme"
    :receiver="receiver"
    :isVerifiedDomain="isVerifiedDomain"
    :invoiceId="invoiceId"
    :base64VuexData="base64VuexData"
    @openModal="openModal"
    @switchColorTheme="switchColorTheme"
  />
</template>

<script>
import PaymentIndex from '@/components/templates/PaymentIndex'
import { STATUS_PUBLISHED } from '@/constants'

export default {
  name: 'payments-uiswitchable',
  components: { PaymentIndex },
  watch: {
    $route() {
      this.checkAndSetAvailableNetworks()
    },
    chainId() {
      if (this.isRequestConnectedWalletPage) {
        this.handleChainChanged()
      }
    },
    userAccountAddress() {
      if (this.isRequestConnectedWalletPage) {
        this.handleAccountChanged()
      }
    }
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    urlQueries() {
      return this.$route.query
    },
    storedWeb3Data() {
      return this.$store.state.web3
    },
    storedAccountData() {
      return this.$store.state.account
    },
    storedPaymentData() {
      return this.$store.state.payment
    },
    colorTheme() {
      return this.$store.state.theme
    },
    receiver() {
      if (!this.isVerifiedDomain && this.merchantAccountAddress) {
        const omittedMerchantAccountAddress = this.merchantAccountAddress.substr(0, 10)
          + "…" + this.merchantAccountAddress.substr(-10)
        return omittedMerchantAccountAddress
      }
      return this.storedPaymentData.domain
    },
    invoiceId() {
      return this.storedPaymentData.orderCode
    },
    base64VuexData() {
      return ''
    },
    web3Instance() {
      return this.storedWeb3Data.instance
    },
    chainId() {
      return this.storedWeb3Data.chainId
    },
    providerType() {
      return this.storedWeb3Data.provider
    },
    userAccountAddress() {
      return this.storedAccountData.address
    },
    merchantAccountAddress() {
      return this.storedPaymentData.merchantWalletAddress
    },
    urlPaymentToken() {
      return this.$route.params.token
    },
    storedPaymentToken() {
      return this.storedPaymentData.id
    },
    isVerifiedDomain() {
      return this.storedPaymentData.isVerifiedDomain
    },
    isDifferentPayment() {
      return this.urlPaymentToken !== this.storedPaymentToken
    },
    isSelectedReceipt() {
      return this.storedPaymentData.isSelectedReceipt
    },
    isSentTransactionToBlockChain() {
      return this.storedPaymentData.status !== STATUS_PUBLISHED
    },
    isRequestEntrancePage() {
      return this.$route.name === 'ww-entrance'
    },
    isRequestSelectReceiptPage() {
      return this.$route.name === 'ww-receipt'
    },
    isRequestedSelectWalletPage() {
      return this.$route.name === 'ww-wallets'
    },
    isRequestConnectedWalletPage() {
      const targetPages = ['ww-token', 'ww-exchange', 'ww-detail']
      return targetPages.includes(this.$route.name)
    },
    isRequestResultPage() {
      return this.$route.name === 'ww-result'
    }
  },
  methods: {
    apiGetMerchantContractAvailableStatus() {
      const url = `${this.API_BASE_URL}/api/v1/payment/merchant/status`
      const request = { params: new URLSearchParams([['payment_token', this.urlPaymentToken]])}
      return this.axios.get(url, request)
    },
    apiGetTransactionState() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction/state`
      const request = { params: new URLSearchParams([['payment_token', this.urlPaymentToken]]) }
      return this.axios.get(url, request)
    },
    getAccountDataFromBlockChain() {
      const func = this.$web3.getAccountData(
        this.web3Instance,
        this.chainId
      )
      return func.catch(this.getAccountDataFromBlockChain)
    },
    openModal(target, size) {
      this.$store.dispatch('modal/show', { target: target, size: size })
    },
    switchColorTheme(color) {
      this.$store.dispatch('changeTheme', color)
    },
    checkAndSetAvailableNetworks() {
      this.apiGetMerchantContractAvailableStatus()
        .then((response) => {
          const availableNetworks = Object.keys(response.data.statuses)
            .filter(key => !response.data.statuses[key])
            .map(Number)
          this.$store.dispatch('payment/updateAvailableNetworks', availableNetworks)
          if (!availableNetworks.length) {
            this.$store.dispatch('modal/show', {
              target: 'error-not-exist-available-payment-contract-modal',
              size: 'small',
              params: { returnUrl: response.data.return_url }
            })
          }
        })
    },
    handleRedirect() {
      this.apiGetTransactionState()
        .then((response) => {
          this.$refs.paymentIndex.incrementProgressCompletedSteps()
          const state = response.data.state
          if (state === 'close' && !this.isRequestResultPage) {
            return this.$router.replace({
              name: 'ww-result',
              params: { token: this.urlPaymentToken }
            })
          }
          if (
            (!this.isDifferentPayment && state === 'unset_base_amount' && !this.isRequestEntrancePage)
            || (this.isDifferentPayment && !this.isRequestEntrancePage && !this.isRequestResultPage)
          ) {
            return this.$router.replace({
              name: 'ww-entrance',
              params: { token: this.urlPaymentToken },
              query: this.urlQueries
            })
          }
          if (this.isRequestSelectReceiptPage && this.isSelectedReceipt) {
            this.$refs.paymentIndex.updateProgressTotalSteps(
              this.$refs.paymentIndex.progressCompletedSteps
            )
            return this.$router.replace({
              name: 'ww-wallets',
              params: { token: this.urlPaymentToken }
            })
          }
          if (this.isRequestSelectReceiptPage || this.isRequestedSelectWalletPage) {
            this.$refs.paymentIndex.updateProgressTotalSteps(
              this.$refs.paymentIndex.progressCompletedSteps
            )
          }
        })
    },
    handleChainChanged() {
      this.getAccountDataFromBlockChain()
        .then((data) => {
          this.$store.dispatch('account/update', data)
        })
    },
    handleAccountChanged() {
      this.getAccountDataFromBlockChain()
        .then((data) => {
          this.$store.dispatch('account/update', data)
        })
    }
  },
  created() {
    this.checkAndSetAvailableNetworks()
    this.handleRedirect()
  }
}
</script>