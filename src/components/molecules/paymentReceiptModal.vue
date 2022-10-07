<template>
  <div>
    <PaymentModal title="Get payment receipt">
      <PaymentText
        tag="p"
        html="You can get a receipt for this payment."
      />
      <PaymentText
        tag="p"
        html="Receipts can be obtained either by email or by downloading a PDF file."
      />
      <PaymentText
        tag="p"
        html="Please select your preferred acquisition method."
      />

      <div class="mt-3">
        <PaymentButton
          :color="loading ? 'inactive' : 'primary'"
          text="Send Email"
          @click.native="openPaymentReceiptEmailModal"
        />
        <PaymentButton
          class="mt-1"
          :color="loading ? 'inactive' : 'primary'"
          text="Download PDF"
          :loading="loading"
          @click.native="downloadPdf"
        />
      </div>

      <div class="d-btnwrap bottomCloseBtn">
        <PaymentButton
          color="cancel"
          text="CLOSE"
          icon="dismiss"
          size="s"
          @click.native="hideModal()"
        />
      </div>
    </PaymentModal>
  </div>
</template>

<script>
import {errorCodeList} from "@/enum/error_code";
import {saveAs} from 'file-saver';
import moment from 'moment'
import PaymentModal from '@/components/organisms/Payment/Modal'
import PaymentText from '@/components/organisms/Payment/Text'
import PaymentButton from '@/components/organisms/Payment/Button'

export default {
  name: "paymentReceiptModal",
  components: {
    PaymentModal,
    PaymentText,
    PaymentButton
  },
  data() {
    return {
      loading: false
    };
  },

  computed: {
    classes() {
      return ["modal-box", `--${this.$store.state.modal.size}`];
    },
    paymentToken() {
      return this.$route.params.token
    },
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    isMobileBrowser() {
      return isMobile(window.navigator).any
    },
  },
  methods: {
    hideModal() {
      this.$store.dispatch('modal/hide')
    },
    openPaymentReceiptEmailModal() {
      if (this.loading) {
        return
      }
      this.$store.dispatch('modal/show', {
        target: 'payment-receipt-email-modal',
        size: 'small'
      })
    },
    downloadPdf() {
      if (this.loading) {
        return
      }
      this.loading = true;
      this.apiDownloadPdf().then((response) => {
        this.loading = false;
        const blob = new Blob([response.data], {type: 'application/pdf'})
        const fileName = `receipt_${moment().format('DDMMYYYYhhmm')}.pdf`
        saveAs(blob, fileName)
      }).catch((error) => {
        let message;
        if (error.response.status === 400) {
          message = errorCodeList[error.response.data.errors.shift()].msg;
        } else {
          message = "Please try again after a while.";
        }
        this.loading = false;
        this.showErrorModal(message)
      })
    },
    apiDownloadPdf() {
      const url = `${this.API_BASE_URL}/api/v1/payment/receipt/download`
      return this.axios({
        url,
        method: 'get',
        responseType: 'blob',
        params: new URLSearchParams([['payment_token', this.paymentToken]]),
      })
    },
    showErrorModal(message) {
      this.$store.dispatch('modal/show', {
        target: 'error-modal',
        size: 'small',
        params: {
          message: message,
        },
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
</style>