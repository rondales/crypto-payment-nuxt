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
    }
  },
  methods: {
    apiReceiveData() {
      const url = `${this.baseUrl}/api/v1/payment`
      const params = new URLSearchParams([['payment_token', this.$route.params.token]])
      return this.axios.get(url, { params })
    },
    apiPublishTransaction() {
      const url = `${this.baseUrl}/api/v1/payment/transaction`
      const params = new URLSearchParams([['payment_token', this.$route.params.token]])
      return this.axios.post(url, params)
    },
    apiGetTransactionState() {
      const url = `${this.baseUrl}/api/v1/payment/transaction/state`
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
    this.apiReceiveData().then((response) => {
      const responseData = response.data
      // @todo If symbols other than USDT are allowed, the amount format specification needs to be reviewed
      const formatedAmount = NumberFormat('0.00', responseData.amount)

      this.$store.dispatch('changeTheme', responseData.display_theme)
      this.$store.dispatch('payment/update', {
        domain: responseData.domain,
        orderCode: responseData.order_code,
        symbol: (responseData.symbol === null) ? 'USDT' : responseData.symbol,
        amount: formatedAmount
      })

      this.apiPublishTransaction().then(() => {
        this.showComponent = (this.$store.state.payment.amount === null) ? 'PaymentAmount' : 'PaymentEmail'
      }).catch((error) => {
        if (error.response.status === 400) {
          if (error.response.data.errors.includes(2110)) {
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
