<template>
  <component
    v-if="showComponent"
    :is="showComponent"
    :progressTotalSteps="progressTotalSteps"
    :progressCompletedSteps="progressCompletedSteps"
    @updateInitializingStatus="updateInitializingStatus"
    @updateProgressTotalSteps="updateProgressTotalSteps"
    @incrementProgressCompletedSteps="incrementProgressCompletedSteps"
  />
</template>

<script>
import { Decimal } from 'decimal.js'
import PaymentAmount from '@/components/organisms/PaymentAmount'
import { errorCodeList } from '@/enum/error_code'
import DisplayConfig from '@/components/mixins/DisplayConfig.vue'

export default {
  name: 'PaymentEntrance',
  mixins: [DisplayConfig],
  components: {
    PaymentAmount
  },
  props: {
    progressTotalSteps: Number,
    progressCompletedSteps: Number
  },
  data() {
    return {
      showComponent: null
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    paymentToken() {
      return this.$route.params.token
    },
    paymentData() {
      return this.$store.state.payment
    },
    isAccessFromDeepLink() {
      return 'dpl' in this.$route.query
    },
    isAccessFromRegeneratedUrl() {
      return 'ucnv' in this.$route.query
    }
  },
  methods: {
    apiReceiveData() {
      const url = `${this.baseUrl}/api/v1/payment`
      const params = new URLSearchParams([['payment_token', this.paymentToken]])
      return this.axios.get(url, { params })
    },
    apiPublishTransaction() {
      const url = `${this.baseUrl}/api/v1/payment/transaction`
      const params = new URLSearchParams([['payment_token', this.paymentToken]])
      return this.axios.post(url, params)
    },
    apiGetTransactionData() {
      const url = `${this.baseUrl}/api/v1/payment/transaction`
      const params = new URLSearchParams([['payment_token', this.paymentToken]])
      return this.axios.get(url, { params })
    },
    apiGetTransactionState() {
      const url = `${this.baseUrl}/api/v1/payment/transaction/state`
      const params = new URLSearchParams([['payment_token', this.paymentToken]])
      return this.axios.get(url, { params })
    },
    showErrorModal(message) {
      this.$store.dispatch('modal/show', {
        target: 'error-modal',
        size: 'small',
        params: {
          message: message
        }
      })
    },
    updateInitializingStatus(initializing) {
      this.$emit('updateInitializingStatus', initializing)
    },
    updateProgressTotalSteps(step) {
      this.$emit('updateProgressTotalSteps', step)
    },
    incrementProgressCompletedSteps() {
      this.$emit('incrementProgressCompletedSteps')
    },
    formatAmount(amount) {
      return (amount) ? Decimal(amount).toString() : amount
    }
  },
  created() {
    this.$store.dispatch('wallet/initialize')
    if (this.paymentData.id !== null && this.paymentData.id !== this.paymentToken) {
      this.$store.dispatch('web3/initialize')
      this.$store.dispatch('account/initialize')
      this.$store.dispatch('payment/initialize')
    } else {
      this.$store.dispatch('payment/updateHeaderInvoice', false)
    }
    this.apiReceiveData().then((receiveResponse) => {
      this.$store.dispatch('changeTheme', receiveResponse.data.display_theme)
      this.$store.dispatch('payment/update', {
        id: this.paymentToken,
        domain: receiveResponse.data.domain,
        orderCode: receiveResponse.data.order_code,
        symbol: receiveResponse.data.symbol,
        isVerifiedDomain: Boolean(receiveResponse.data.is_verified_domain),
        merchantWalletAddress: receiveResponse.data.merchant_wallet_address,
        amount: this.formatAmount(receiveResponse.data.amount)
      })
      this.$store.dispatch('payment/updateAllowCurrencies', receiveResponse.data.allow_currencies)
      if (receiveResponse.data.is_cancelled) {
        return
      }
      this.$emit('incrementProgressCompletedSteps')
      this.apiPublishTransaction().then(() => {
        this.$emit('updateProgressTotalSteps', 5)
        this.$emit('incrementProgressCompletedSteps')
        if (receiveResponse.data.amount) {
          this.$router.push({ name: 'wallets', params: { token: this.paymentToken } })
        } else {
          this.showComponent ='PaymentAmount'
        }
      }).catch((error) => {
        if (error.response.status === 400) {
          if (error.response.data.errors.includes(2110)) {
            this.apiGetTransactionData().then((transactionResponse) => {
              this.$emit('incrementProgressCompletedSteps')
              this.$store.dispatch('payment/updateAmount', this.formatAmount(transactionResponse.data.base_amount))
              if (transactionResponse.data.base_amount == null) {
                this.showComponent = 'PaymentAmount'
                this.$emit('updateProgressTotalSteps', 7)
                this.$emit('incrementProgressCompletedSteps')
              } else {
                if (this.isAccessFromDeepLink || this.isAccessFromRegeneratedUrl) {
                  this.$store.dispatch('payment/updateAgreeRiskStatus', true)
                  this.$emit('incrementProgressCompletedSteps')
                  this.$emit('updateProgressTotalSteps', 5)
                  this.$router.replace({
                    path: '/payment/wallets/' + this.$route.params.token
                  })
                } else {
                  this.$emit('updateProgressTotalSteps', 4)
                  this.$router.replace({
                    path: '/payment/wallets/' + this.$route.params.token
                  })
                }
              }
            }).catch((error) => {
              console.log(error)
              this.showErrorModal('Please try again after a while.')
            })
          } else {
            this.showErrorModal(
              errorCodeList[
                error.response.data.errors.shift()
              ].msg
            )
          }
        } else {
          this.showErrorModal('Please try again after a while.')
        }
      })
    }).catch((error) => {
      if (error.response.status === 400 && error.response.data.errors.includes(2022)) {
        this.showErrorModal(
          errorCodeList[
            error.response.data.errors.shift()
          ].msg
        )
      } else {
        this.showErrorModal('Please try again after a while.')
      }
    })
  }
}
</script>
