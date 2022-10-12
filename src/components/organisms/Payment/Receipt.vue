<template>
  <div class="reciept">
    <!-- <p class="text">
      <span
        >Do you want a receipt for this payment?<br />You can get it by Email or
        PDF.</span
      >
    </p>
    <p v-if="isReservingMode" class="text">
      <span
        >"While waiting for the payment result, you can reserve an e-mail
        address to send the receipt and download the receipt.</span
      >
    </p> -->
    <div class="reciept__box">
      <PaymentForm>
        <input
          type="email"
          :placeholder="
            isSent ? 'Receipt has been sent' : 'Send to email address'
          "
          v-model="email"
          :disabled="isSent || isRegisterdEmail"
        />
        <PaymentButton
          v-if="!isReservingMode"
          size="s"
          class="sendbutton"
          :text="emailButtonText"
          :color="isInvalidEmail || sending || isSent ? 'inactive' : 'primary'"
          :loading="sending"
          layout="reverse"
          @click.native="sendEmail"
        />
      </PaymentForm>
      <PaymentButton
        v-if="!isReservingMode"
        class="pdfbutton"
        size="s"
        text="PDF"
        :color="downloading ? 'inactive' : ''"
        icon="download"
        :loading="downloading"
        @click.native="downloadPdf"
      />
    </div>
    <PaymentConfirmCheckbox
      v-if="isReservingMode"
      id="reserve"
      ref="reserved"
      text="Download receipt after payment is completed"
      @clickCheckbox="updateDownloadReserveStatus()"
    />
  </div>
</template>
<script>
import moment from 'moment'
import { saveAs } from 'file-saver'
import { HTTP_CODES, STATUS_RESULT_SUCCESS } from '@/constants'
import { errorCodeList } from '@/enum/error_code'
import PaymentForm from '@/components/organisms/Payment/Form'
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentConfirmCheckbox from '@/components/organisms/Payment/ConfirmCheckbox'

export default {
  name: 'PaymentReceipt',
  components: {
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
      const format =
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
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
        .finally(() => (this.sending = false))
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
        .finally(() => (this.downloading = false))
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

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';

.reciept {
  &__box {
    @include flex(flex-start, center);
    gap: 0rem;
    flex-wrap: nowrap;
    .form {
      flex: 1;
      &::v-deep {
        .form__wrap {
          padding: 0.5rem;
          padding-left: 1rem;
          input {
            font-size: 14px;
            padding: 0;
            @include media(sp) {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .sendbutton {
    &::v-deep {
      .button.size_s {
        min-width: 4rem;
      }
    }
  }
  .pdfbutton {
    // margin-top: 1rem;
    &::v-deep {
      .button.size_s {
        min-width: 4rem;
        margin-left: auto;
        margin-right: auto;
        gap: 4px;
        position: relative;
        &::before {
          content: '';
          width: 0%;
          height: 1px;
          background-color: var(--Text);
          position: absolute;
          bottom: 0;
          left: 0;
          transition: width 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
            visibility 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
        }
        @include media(pc) {
          &:hover {
            &::before {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .text {
    margin-bottom: 1rem;
    @include font(0.8rem, 400, $ls, $lh, $en_go);
  }
}
</style>
