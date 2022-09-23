<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">Get payment receipt</h3>
      <button class="close" @click="hideModal">
        <img
          v-if="$store.state.theme == 'dark'"
          src="@/assets/images/cross.svg"
        />
        <img
          v-if="$store.state.theme == 'light'"
          src="@/assets/images/cross-l.svg"
        />
        close
      </button>
    </div>
    <div class="body">
      <p class="body__desc">You can get a receipt for this payment.</p>
      <p class="body__desc">Receipts can be obtained either by email or by downloading a PDF file.</p>
      <p class="body__desc mb-4">Please select your preferred acquisition method.</p>
      <button @click="openPaymentReceiptEmailModal" class="btn __l">
        Send Email
      </button>
      <button @click="downloadPdf" class="btn __l" :class="{ inactive: loading}">
        Download PDF
        <div class="loading-wrap" :class="{ active: loading }">
          <img class="spin" src="@/assets/images/loading.svg" />
        </div>
      </button>
    </div>

    <div class="footer">
      <button class="btn __g __l mt-1 non-translate" @click="hideModal">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>

import {errorCodeList} from "@/enum/error_code";
import {saveAs} from 'file-saver';
import moment from 'moment'

export default {
  name: "paymentReceiptModal",
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
  },
  methods: {
    hideModal() {
      this.$store.dispatch('modal/hide')
    },
    openPaymentReceiptEmailModal() {
      this.$store.dispatch('modal/show', {
        target: 'payment-receipt-email-modal',
        size: 'small'
      })
    },
    downloadPdf() {
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
      this.$store.dispatch("modal/show", {
        target: "error-modal",
        size: "small",
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

.modal-box {
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background:var(--color_bg);
  @include media(pc) {
    &.--small {
      width: 470px;
    }
    &.--medium {
      width: 760px;
    }
  }
  @include media(sp) {
    width: calc(100vw - 32px);
  }
}

.header {
  @include media(pc) {
    padding: 24px 24px 0 24px;
    &__title {
      font-size: 2.5rem;
      margin-bottom: 4rem;
    }
  }
  @include media(sp) {
    padding: 18px;
    &__title {
      font-size: 2rem;
    }
  }

  &__title {
    text-align: center;
    font-weight: 500;
  }

}

.close {
  position: absolute;
  width: 16px;
  height: 16px;
  font-size: 0;

  @include media(pc) {
    top: 30px;
    right: 24px;
  }
  @include media(sp) {
    top: 24px;
    right: 24px;
  }
}

.body {
  @include media(pc) {
    padding: 0 24px 40px;
  }
  @include media(sp) {
    padding: 0 12px 48px;
  }

  &__desc {
    font-size: 13px;
  }

  .btn {
    font-size: 17px;
    font-weight: 500;
    text-align: center;
    margin: 10px auto;
    height: 5.5rem;
    line-height: 5.5rem;
    color: #fff;
    background: $gradation-pale;
  }
}

.footer {
  text-align: center;
  @include media(pc) {
    padding: 0 40px 40px;
  }
  @include media(sp) {
    padding: 0 32px 32px;
  }

  .btn {
    font-size: 18px;
    text-align: center;
    margin: 10px auto;
    width: 80%;
    height: 5.5rem;
    line-height: 5.5rem;
    border-radius: 1rem;
    font-weight: 400;

  }
}
</style>