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
import {
  HTTP_CODES,
  STATUS_PUBLISHED,
  STATUS_PROCESSING,
  STATUS_RESULT_FAILURE,
  STATUS_RESULT_SUCCESS
} from '@/constants'

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
    receiver() {
      return this.paymentData.domain
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
    }
  },
  methods: {
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
    openModal(target, size) {
      this.$store.dispatch('modal/show', { target: target, size: size })
    },
    switchColorTheme(color) {
      this.$store.dispatch('changeTheme', color)
    }
  },
  created() {
    if (this.restoreParam) {
      this.restoreVuex(this.restoreParam)
      this.$router.push({ path: `/payment/wallets/${this.paymentToken}` })
    } else {
      if (this.paymentId !== this.paymentToken && this.$route.name !== 'entrance') {
        this.$router.push({ path: `/payment/${this.paymentToken}` })
      } else {
        this.apiGetTransactionData().then((transactionResponse) => {
          const transactionData = transactionResponse.data
          switch(transactionData.status) {
            case this.transactionStatusList.published:
              this.$store.dispatch('payment/updateStatus', STATUS_PUBLISHED)
              if (transactionData.base_amount === null && this.$route.name !== 'entrance') {
                this.$router.push({ path: `/payment/${this.paymentToken}` })
              } else {
                this.apiGetReceivedData().then((receivedResponse) => {
                  const receivedData = receivedResponse.data
                  this.$store.dispatch('web3/initialize')
                  this.$store.dispatch('account/initialize')
                  this.$store.dispatch('payment/initialize')
                  this.$store.dispatch('payment/update', {
                    id: this.paymentToken,
                    domain: receivedData.domain,
                    orderCode: receivedData.order_code,
                    symbol: transactionData.base_symbol,
                    amount: NumberFormat('0.00', transactionData.base_amount)
                  })
                  if (transactionData.email === null && this.$route.name !== 'receipt') {
                    this.$router.push({ path: `/payment/receipt/${this.paymentToken}` })
                  } else if (this.$route.name !== 'wallets') {
                    this.$router.push({ path: `/payment/wallets/${this.paymentToken}` })
                  }
                }).catch(() => {
                  if (this.$route.name !== 'entrance') {
                    this.$router.push({ path: `/payment/${this.paymentToken}` })
                  }
                })
              }
              break
            case this.transactionStatusList.processing:
              this.$store.dispatch('payment/updateStatus', STATUS_PROCESSING)
              this.$store.dispatch('payment/updateTransactionHash', transactionData.transaction_address)
              break
            case this.transactionStatusList.failed:
              this.$store.dispatch('payment/updateStatus', STATUS_RESULT_FAILURE)
              this.$store.dispatch('payment/updateTransactionHash', transactionData.transaction_address)
              break
            case this.transactionStatusList.succeeded:
              this.$store.dispatch('payment/updateStatus', STATUS_RESULT_SUCCESS)
              this.$store.dispatch('payment/updateTransactionHash', transactionData.transaction_address)
          }
          if (transactionData.status !== this.transactionStatusList.published && this.$route.name !== 'wallets') {
            this.apiGetReceivedData().then((receivedResponse) => {
              const receivedData = receivedResponse.data
              this.$store.dispatch('web3/initialize')
              this.$store.dispatch('account/initialize')
              this.$store.dispatch('payment/initialize')
              this.$store.dispatch('payment/update', {
                id: this.paymentToken,
                domain: receivedData.domain,
                orderCode: receivedData.order_code,
                symbol: transactionData.base_symbol,
                amount: NumberFormat('0.00', transactionData.base_amount)
              })
              this.$store.dispatch('payment/updateToken',{
                symbol: transactionData.user_symbol,
                amount: transactionData.user_amount
              })
              this.$router.push({ path: `/payment/wallets/${this.paymentToken}` })
            }).catch(() => {
              if (this.$route.name !== 'entrance') {
                this.$router.push({ path: `/payment/${this.paymentToken}` })
              }
            })
          }
        }).catch((error) => {
          if (error.response.status === HTTP_CODES.BAD_REQUEST) {
            if (this.$route.name !== 'entrance') {
              this.$router.push({ path: `/payment/${this.paymentToken}` })
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

</style>