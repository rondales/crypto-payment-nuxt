<template>
  <payment-index
    :colorTheme="colorTheme"
    :showFooterMenu="showFooterMenu"
    :receiver="receiver"
    :invoiceId="invoiceId"
    :base64VuexData="base64VuexData"
    @openModal="openModal"
    @switchColorTheme="switchColorTheme"
  />
</template>

<script>
import NumberFormat from 'number-format.js'
import PaymentIndex from '@/components/templates/PaymentIndex'
import VuexRestore from '@/components/mixins/VuexRestore'
import { HTTP_CODES, STATUS_PUBLISHED, MERCHANT_DOMAIN_VERIFIED } from '@/constants'
import AvailableNetworks from '@/network'

export default {
  name: 'payment',
  mixins: [VuexRestore],
  components: {
    PaymentIndex
  },
  data() {
    return {
      transactionStatusList: {
        published: 1,
        processing: 2,
        failed: 3,
        succeeded: 4
      }
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    colorTheme() {
      return this.$store.state.theme
    },
    paymentData() {
      return this.$store.state.payment
    },
    paymentId() {
      return this.paymentData.id
    },
    merchantWalletAddress() {
      return this.paymentData.merchantWalletAddress
    },
    isVerifiedDomain() {
      return this.paymentData.isVerifiedDomain == MERCHANT_DOMAIN_VERIFIED
    },
    receiver() {
      if (!this.isVerifiedDomain) {
        const omittedMerchantWalletAddress = this.merchantWalletAddress.slice(0, 6) 
          + "…" + this.merchantWalletAddress.slice(-6)
        return omittedMerchantWalletAddress
      }
      return this.paymentData.domain 
        + `<img class="domain-verified-check" src="${require('@/assets/images/check.svg')}" alt="verified">`
    },
    invoiceId() {
      return this.paymentData.orderCode
    },
    paymentToken() {
      return this.$route.params.token
    },
    base64VuexData() {
      return this.generateRestoreParameter()
    },
    restoreParam() {
      return this.$route.query.vx
    },
    showFooterMenu() {
      return this.$route.name === 'wallets'
    },
    currentRouteName() {
      return this.$route.name
    },
    isRestorePayment() {
      return (this.$route.query.vx)
    },
    isPaymentDifferent() {
      return this.paymentId !== this.paymentToken
    },
  },
  methods: {
    showWarningModal(message) {
      this.$store.dispatch('modal/show', {
        target: 'warning-modal',
        size: 'small',
        params: {
          message: message
        }
      })
    },
    apiGetReceivedData() {
      const url = `${this.baseUrl}/api/v1/payment`
      const params = new URLSearchParams([['payment_token', this.paymentToken]])
      return this.axios.get(url, { params })
    },
    apiGetTransactionData() {
      const url = `${this.baseUrl}/api/v1/payment/transaction`
      const params = new URLSearchParams([['payment_token', this.paymentToken]])
      return this.axios.get(url, { params })
    },
    apiGetAvailableNetworks() {
      const url = `${this.baseUrl}/api/v1/payment/contract/network`
      const request = { params: new URLSearchParams([['payment_token', this.$route.params.token]])}
      return this.axios.get(url, request)
    },
    redirectToEntrancePage(currentRouteName, paymentToken) {
      if (currentRouteName !== 'entrance') {
        this.$router.push({ path: `/payment/${paymentToken}` })
      }
    },
    redirectToInputEmailPage(currentRouteName, paymentToken) {
      if (currentRouteName !== 'receipt') {
        this.$router.push({ path: `/payment/receipt/${paymentToken}` })
      }
    },
    redirectToConnectWalletPage(currentRouteName, paymentToken) {
      if (currentRouteName !== 'wallets') {
        this.$router.push({ path: `/payment/wallets/${paymentToken}` })
      }
    },
    redirectByTransactionState(currentRouteName, paymentToken, transactionData) {
      if (transactionData.base_amount === null) {
        this.redirectToEntrancePage(currentRouteName, paymentToken)
        return
      }
      this.apiGetReceivedData().then((receiveResponse) => {
        const receiveData = receiveResponse.data
        this.initializeVuex()
        this.updatePaymentDataForVuex(
          paymentToken,
          receiveData.domain,
          receiveData.order_code,
          receiveData.allow_currencies,
          receiveData.is_verified_domain,
          receiveData.merchant_wallet_address,
          transactionData.base_symbol,
          transactionData.base_amount
        )
        this.apiGetAvailableNetworks().then((networkResponse) => {
          const networks = Object.values(AvailableNetworks).map((network) => {
            return network.chainId
          }).filter(item => networkResponse.data.networks.includes(item))
          this.updatePaymentAvailableNetworksForVuex(networks)

          if (
            transactionData.email === null
            && !['wallets', 'token', 'exchange', 'detail'].includes(currentRouteName)
          ) {
            this.redirectToInputEmailPage(currentRouteName, paymentToken)
            return
          }
          this.redirectToConnectWalletPage(currentRouteName, paymentToken)
        })
      })
    },
    redirectForSentWeb3(currentRouteName, paymentToken, transactionData) {
      this.apiGetReceiveData().then((response) => {
        const receiveData = response.data
        this.initializeVuex()
        this.updatePaymentDataForVuex(
          paymentToken,
          receiveData.domain,
          receiveData.order_code,
          receiveData.allow_currencies,
          receiveData.is_verified_domain,
          receiveData.merchant_wallet_address,
          transactionData.base_symbol,
          transactionData.base_amount
        )
        this.updatePaymentTokenForVuex(
          transactionData.user_symbol,
          transactionData.user_amount
        )
        this.updatePaymentTransactionAddressForVuex(transactionData.transaction_address)
        this.redirectToConnectWalletPage(currentRouteName, paymentToken)
      }).catch(() => {
        this.redirectToEntrancePage(currentRouteName, paymentToken)
      })
    },
    initializeVuex() {
      this.$store.dispatch('web3/initialize')
      this.$store.dispatch('account/initialize')
      this.$store.dispatch('payment/initialize')
    },
    updatePaymentDataForVuex(
      paymentToken,
      merchantDomain,
      merchantOrderCode,
      merchantAllowCurrencies,
      merchantIsVerifiedDomain,
      merchantWalletAddress,
      merchantReceiveSymbol,
      merchantReceiveAmount
    ) {
      this.$store.dispatch('payment/update', {
        id: paymentToken,
        domain: merchantDomain,
        orderCode: merchantOrderCode,
        symbol: merchantReceiveSymbol,
        isVerifiedDomain: merchantIsVerifiedDomain,
        merchantWalletAddress: merchantWalletAddress,
        amount: NumberFormat('0.00', merchantReceiveAmount)
      })
      this.$store.dispatch('payment/updateAllowCurrencies', merchantAllowCurrencies)
    },
    updatePaymentTokenForVuex(paidSymbol, paidAmount) {
      this.$store.dispatch('payment/updateToken',{
        symbol: paidSymbol,
        amount: paidAmount
      })
    },
    updatePaymentTransactionAddressForVuex(transactionAddress) {
      this.$store.dispatch('payment/updateTransactionHash', transactionAddress)
    },
    updatePaymentAvailableNetworksForVuex(networks) {
      this.$store.dispatch('payment/updateAvailableNetworks', networks)
    },
    updateTransactionStatusForVuex(status) {
      this.$store.dispatch('payment/updateStatus', status)
    },
    openModal(target, size) {
      this.$store.dispatch('modal/show', { target: target, size: size })
    },
    switchColorTheme(color) {
      this.$store.dispatch('changeTheme', color)
    }
  },
  created() {
    if (this.isRestorePayment) {
      this.restoreVuex(this.restoreParam)
      this.redirectToConnectWalletPage(this.currentRouteName, this.paymentToken)
      return
    }
    if (this.isPaymentDifferent) {
      this.redirectToEntrancePage(this.currentRouteName, this.paymentToken)
      return
    }
    this.apiGetTransactionData().then((response) => {
      const transactionData = response.data
      this.updateTransactionStatusForVuex(transactionData.status)
      if (transactionData.status === STATUS_PUBLISHED) {
        this.redirectByTransactionState(this.currentRouteName, this.paymentToken, transactionData)
        return
      }
      this.redirectForSentWeb3(this.currentRouteName, this.paymentToken, transactionData)
    }).catch((error) => {
      if (error.response.status === HTTP_CODES.BAD_REQUEST) {
        this.redirectToEntrancePage(this.currentRouteName, this.paymentToken)
      }
    })
    if (!this.isVerifiedDomain) {
      this.showWarningModal('We cannot guarantee the reliability of this payee!')
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/style.scss';
  .domain-verified-check {
    height: 12px;
    margin-left: 5px;
  }
</style>