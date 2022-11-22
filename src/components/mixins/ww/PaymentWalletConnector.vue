<script>
import { 
  METAMASK,
  WALLET_CONNECT,
  STATUS_RESULT_FAILURE,
  STATUS_RESULT_SUCCESS,
  STATUS_PROCESSING } from '@/constants'
import DeviceIdHandlerMixin from '@/components/mixins/DeviceIdHandler'

export default {
  name: 'PaymentWalletConnector',
  mixins: [DeviceIdHandlerMixin],
  computed: {
    $_paymentWalletConnector_API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    $_paymentWalletConnector_paymentToken() {
      return this.$route.params.token
    },
    $_paymentWalletConnector_deviceId() {
      return this.$_deviceIdHandler_get()
    },
    $_paymentWalletConnector_isSetDeviceId() {
      return this.$_paymentWalletConnector_deviceId !== null
    }
  },
  methods: {
    connect(useProvider, modalMode) {
      this.$_paymentWalletConnector_apiGetTransactionStatus().then((response) => {
        // Redirect to Result Page if status is Processing, Failure or Success
        if([STATUS_RESULT_FAILURE, STATUS_RESULT_SUCCESS, STATUS_PROCESSING].includes(response.data.status)) {
          this.$_paymentWalletConnector_redirectToPaymentResultPage()
        } else {
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
        }
      })
    },
    $_paymentWalletConnector_apiGetTransactionLockStatus() {
      const url = `${this.$_paymentWalletConnector_API_BASE_URL}/api/v1/payment/transaction/lock/status`
      const request = {
        params: new URLSearchParams([
          ['payment_token', this.$_paymentWalletConnector_paymentToken]
        ])
      }
      return this.axios.get(url, request)
    },
    $_paymentWalletConnector_apiGetTransactionStatus() {
      const url = `${this.$_paymentWalletConnector_API_BASE_URL}/api/v1/payment/transaction/status`
      const request = {
        params: new URLSearchParams([
          ['payment_token', this.$_paymentWalletConnector_paymentToken]
        ])
      }
      return this.axios.get(url, request)
    },
    $_paymentWalletConnector_redirectToPaymentResultPage() {
      this.$router.replace({
        name: 'ww-result',
        params: { token: this.$_paymentWalletConnector_paymentToken }
      })
    },
    $_paymentWalletConnector_apiGetTransactionDeviceIdMatchingStatus() {
      const url = `${this.$_paymentWalletConnector_API_BASE_URL}/api/v1/payment/transaction/lock/match`
      const request = {
        params: new URLSearchParams([
          ['payment_token', this.$_paymentWalletConnector_paymentToken],
          ['device_id', this.$_paymentWalletConnector_deviceId]
        ])
      }
      return this.axios.get(url, request)
    },
    $_paymentWalletConnector_apiGetDeviceId() {
      const url = `${this.$_paymentWalletConnector_API_BASE_URL}/api/v1/payment/transaction/lock`
      const request = {
        params: new URLSearchParams([
          ['payment_token', this.$_paymentWalletConnector_paymentToken]
        ])
      }
      return this.axios.get(url, request)
    },
    $_paymentWalletConnector_getConnectSucceededFunction(modalMode) {
      return (connectedData) => {
        this.$_paymentWalletConnector_apiGetTransactionLockStatus()
          .then((response) => {
            if (response.data.lock && !this.$_paymentWalletConnector_isSetDeviceId) {
              return Promise.reject()
            } else if (response.data.lock && this.$_paymentWalletConnector_isSetDeviceId) {
              return this.$_paymentWalletConnector_apiGetTransactionDeviceIdMatchingStatus()
                .then((response) => {
                  if (response.data.match) {
                    return Promise.resolve(this.$_paymentWalletConnector_deviceId)
                  } else {
                    return Promise.reject()
                  }
                })
            } else {
              return this.$_paymentWalletConnector_apiGetDeviceId()
                .then((response) => {
                  return Promise.resolve(response.data.device_id)
                })
            }
          })
          .then((deviceId) => {
            // this.$store.dispatch('payment/updateDeviceId', deviceId)
            this.$_deviceIdHandler_update(deviceId)
            return Promise.resolve()
          })
          .then(() => {
            return this.$web3.getAccountData(connectedData.instance, connectedData.chainId)
          })
          .then((accountData) => {
            this.$store.dispatch('web3/update', connectedData)
            this.$store.dispatch('account/update', accountData)
            if (modalMode) {
              this.$store.dispatch('modal/hide')
            }
            this.$router.push({ name: 'ww-token', params: { token: this.$route.params.token } })
          })
          .catch(() => {
            this.$store.dispatch('modal/show', {
              target: 'error-modal',
              size: 'small',
              params: {
                message: 'Payment cannot be continued due to the possibility of duplicate payment.'
              }
            })
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
            // this.$store.dispatch('modal/show', { target: 'error-metamask-modal', size: 'small'})
          }
          return
        }

        // if (useProvider === WALLET_CONNECT) {
        //   this.$store.dispatch('modal/show', { target: 'error-wallet-modal', size: 'small'})
        // }
      }
    },
  }
}
</script>