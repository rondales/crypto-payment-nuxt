<template>
  <div>
    <PaymentModal title="Get payment receipt">
      <div v-if="successfully">
        <div class="result__icon">
          <PaymentIcon path="check" />
        </div>
        <div class="result__desc">
          <PaymentText class="text" tag="p" html="Email sent successfully" />
        </div>
      </div>
      <div v-else>
        <PaymentText tag="p" class="mb-2" html="Enter the email address where you would like to receive your receipt." />
        <PaymentForm>
          <input
            type="email"
            placeholder="Input email address to receive receipt"
            v-model="email"
          />
        </PaymentForm>
        <div class="d-btnwrap">
          <PaymentButton
            :color="loading || isInvalidEmail ? 'inactive' : 'primary'"
            text="Send Email"
            @click.native="sendEmail"
            :loading="loading"
          />
          <PaymentButton
            :color="loading ? 'inactive' : 'primary'"
            text="Cancel"
            @click.native="cancel"
          />
        </div>
      </div>

      <div class="d-btnwrap bottomCloseBtn">
        <PaymentButton
          color="cancel"
          text="CLOSE"
          icon="dismiss"
          size="s"
          @click.native="hideModal"
        />
      </div>
    </PaymentModal>
  </div>
</template>

<script>
import {errorCodeList} from "@/enum/error_code";
import PaymentModal from '@/components/organisms/Payment/Modal'
import PaymentText from '@/components/organisms/Payment/Text'
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentIcon from '@/components/organisms/Payment/Icon'
import PaymentForm from '@/components/organisms/Payment/Form'

export default {
  name: "paymentReceiptEmailModal",
  components: {
    PaymentModal,
    PaymentText,
    PaymentButton,
    PaymentIcon,
    PaymentForm
  },
  data() {
    return {
      email: '',
      successfully: false,
      loading: false,
    };
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    classes() {
      return ["modal-box", `--${this.$store.state.modal.size}`];
    },
    paymentToken() {
      return this.$route.params.token
    },
    isInvalidEmail() {
      const format = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return !format.test(this.email)
    }
  },
  methods: {
    apiSendReceiptEmail() {
      this.loading = true
      const url = `${this.API_BASE_URL}/api/v1/payment/receipt/send`
      const request = {
        params: new URLSearchParams([["payment_token", this.paymentToken], ['email', this.email]]),
      };
      return this.axios.get(url, request)
    },
    sendEmail(event) {
      if (this.loading || this.isInvalidEmail) {
        return event.preventDefault()
      }
      this.loading = true
      this.apiSendReceiptEmail().then(() => {
        this.loading = false
        this.successfully = true

      }).catch(error => {
        this.loading = false
        this.successfully = false
        let message;

        if (error.response.status === 400) {
          message = errorCodeList[error.response.data.errors.shift()].msg;
        } else {
          message = "Please try again after a while.";
        }
        this.showErrorModal(message)
      })
    },
    cancel() {
      this.$store.dispatch('modal/show', {
        target: 'payment-receipt-modal',
        size: 'small'
      })
    },
    hideModal() {
      this.$store.dispatch('modal/hide')
    },
    showErrorModal(message) {
      this.$store.dispatch("modal/show", {
        target: "error-modal",
        size: "small",
        params: {
          message: message,
        },
      });
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.result {
  &__icon {
    max-width: 10rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;

    &::v-deep {
      svg {
        fill: var(--Success) !important;
      }
    }
  }
  &__desc {
    @include flex(center, center);
  }
}
</style>