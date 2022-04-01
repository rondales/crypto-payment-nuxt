<template>
  <component v-if="showComponent" :is="showComponent" />
</template>

<script>
import NumberFormat from 'number-format.js'
import PaymentAmount from '@/components/organisms/PaymentAmount'
import PaymentEmail from '@/components/organisms/PaymentEmail'
import { errorCodeList } from '@/enum/error_code'

export default {
  name: 'PaymentEntrance',
  components: {
    PaymentAmount,
    PaymentEmail
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
    }
  },
  created() {
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
        amount: NumberFormat('0.00', receiveResponse.data.amount)
      })
      this.apiPublishTransaction().then(() => {
        this.showComponent = (receiveResponse.data.amount === null) ? 'PaymentAmount' : 'PaymentEmail'
      }).catch((error) => {
        if (error.response.status === 400) {
          if (error.response.data.errors.includes(2110)) {
            this.apiGetTransactionData().then((transactionResponse) => {
              this.$store.dispatch('payment/updateAmount', NumberFormat('0.00', transactionResponse.data.base_amount))
              this.apiGetTransactionState().then((response) => {
                switch(response.data.state) {
                  case 'unset_base_amount':
                    this.showComponent = 'PaymentAmount'
                    break;
                  case 'unset_email':
                    this.showComponent = 'PaymentEmail'
                    break;
                  case 'unset_token':
                    this.$router.push({
                      path: '/payment/wallets/' + this.$route.params.token
                    })
                    break;
                  case 'close':
                    this.showErrorModal('This transaction is closed.')
                }
              }).catch(() => {
                this.showErrorModal('Please try again after a while.')
              })
            }).catch(() => {
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
      if (error.response.status === 400) {
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
