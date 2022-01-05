<template>
  <component v-if="showComponent" :is="showComponent" />
</template>

<script>
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
  methods: {
    apiReceiveData() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/payment'
      const params = new URLSearchParams([['payment_token', this.$route.params.token]])
      return this.axios.get(url, { params })
    },
    apiPublishTransaction() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/payment/transaction'
      const params = new URLSearchParams([['payment_token', this.$route.params.token]])
      return this.axios.post(url, params)
    },
    apiGetTransactionState() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/payment/transaction/state'
      const params = new URLSearchParams([['payment_token', this.$route.params.token]])
      return this.axios.get(url, { params })
    },
    showErrorModal(message) {
      this.$store.dispatch('openModal', {
        target: 'error-modal',
        size: 'small',
        message: message
      })
    }
  },
  created() {
    this.apiReceiveData().then((res) => {
      this.$store.dispatch('setReceiveData', res.data)
      this.apiPublishTransaction().then(() => {
        this.showComponent = (this.$store.state.paymentData.base_amount === null) ? 'PaymentAmount' : 'PaymentEmail'
      }).catch((error) => {
        if (error.response.status === 400) {
          if (error.response.data.errors.includes(2110)) {
            this.apiGetTransactionState().then((res) => {
              switch(res.data.state) {
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
