<template>
  <div>
    <PaymentText
      class="text mb-1"
      tag="p"
      html="Do you want a receipt for this payment?<br>You can get it by Email or PDF."
    />
    <PaymentText
      v-if="isReservingMode"
      class="text mb-1"
      tag="p"
      html="While waiting for the payment result, you can reserve an e-mail address to send the receipt and download the receipt." />
    <PaymentForm>
      <input
        type="email"
        :placeholder="isSent ? 'Receipt has been sent' : 'Send to email address'"
        v-model="email"
        :disabled="isSent || isRegisterdEmail"
      />
      <PaymentButton
        v-if="!isReservingMode"
        size="s"
        :text="emailButtonText"
        :color="isInvalidEmail || sending || isSent ? 'inactive' : 'primary'"
        :loading="sending"
        layout="reverse"
        @click.native="sendEmail"
      />
    </PaymentForm>
    <PaymentConfirmCheckbox
      v-if="isReservingMode"
      id="reserve"
      ref="reserved"
      text="Download receipt after payment is completed"
      @clickCheckbox="updateDownloadReserveStatus()"
    />
    <PaymentButton
      v-else
      class="button mt-1"
      size="s"
      text="Download PDF"
      :color="downloading ? 'inactive': 'primary'"
      layout="reverse"
      :loading="downloading"
      @click.native="downloadPdf"
    />
  </div>
</template>
<script>
import moment from 'moment'
import { saveAs } from 'file-saver'
import {
  HTTP_CODES,
  STATUS_RESULT_SUCCESS
} from '@/constants'
import { errorCodeList } from '@/enum/error_code'
import PaymentText from '@/components/organisms/Payment/Text'
import PaymentForm from '@/components/organisms/Payment/Form'
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentConfirmCheckbox from '@/components/organisms/Payment/ConfirmCheckbox'

export default {
  name: 'PaymentReceipt',
  components: {
    PaymentText,
    PaymentForm,
    PaymentButton,
    PaymentConfirmCheckbox
  },
  props: {
    paymentToken: String,
    status: Number,
    isRegisterdEmail: Boolean,
    isReservingMode: Boolean
  },
  data() {
    return {
      descriptionText: '',
      email: '',
      sending: false,
      sent: false,
      downloading: false,
      reservedDownload: false
    }
  },
  watch: {
    isReservingMode() {
      if (!this.isPaymentSucceeded) return
      if (!this.isInvalidEmail) this.sendEmail()
      if (this.reservedDownload) this.downloadPdf()
    }
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    emailButtonText() {
      if (this.isReservingMode) return 'Set'
      if (this.isSent) return 'Sent'
      return 'Send'
    },
    isPaymentSucceeded() {
      return this.status === STATUS_RESULT_SUCCESS
    },
    isInvalidEmail() {
      const format = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return !format.test(this.email)
    },
    isSent() {
      return this.sent || this.isRegisterdEmail
    }
  },
  methods: {
    apiSendReceiptByEmail() {
      const url = `${this.API_BASE_URL}/api/v1/payment/receipt/send`
      const request = {
        params: new URLSearchParams([
          ['payment_token', this.paymentToken],
          ['email', this.email]
        ])
      }
      return this.axios.get(url, request)
    },
    apiDownloadReceiptPdf() {
      const url = `${this.API_BASE_URL}/api/v1/payment/receipt/download`
      return this.axios({
        url,
        method: 'get',
        responseType: 'blob',
        params: new URLSearchParams([['payment_token', this.paymentToken]])
      })
    },
    sendEmail() {
      if (this.sending || this.isSent || this.isInvalidEmail) return
      this.sending = true
      this.apiSendReceiptByEmail()
        .then(() => {
          this.sent = true
          this.email = ''
        })
        .catch((error) => {
          let message = 'Please try again after a while.'
          if (error.response.status === HTTP_CODES.BAD_REQUEST) {
            message = errorCodeList[error.response.data.errors.shift()].msg
          }
          this.showErrorModal(message)
        })
        .finally(() => this.sending = false)
    },
    downloadPdf() {
      if (this.downloading) return
      this.downloading = true
      this.apiDownloadReceiptPdf()
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/pdf' })
          const fileName = `receipt_${moment().format('DDMMYYYYhhmm')}.pdf`
          saveAs(blob, fileName)
        })
        .catch((error) => {
          let message = 'Please try again after a while.'
          if (error.response.status === HTTP_CODES.BAD_REQUEST) {
            message = errorCodeList[error.response.data.errors.shift()].msg
          }
          this.showErrorModal(message)
        })
        .finally(() => this.downloading = false)
    },
    updateDownloadReserveStatus() {
      this.reservedDownload = this.$refs.reserved.checkbox
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
  }
}
</script>