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
      <div class="payment_receiptwrap">
        <div v-if="successfully" class="payment_receipt_notification">
          <img class="mb-2" src="@/assets/images/check.svg" alt="success">
          <p class="payment_receipt_title mb-1">
            Email sent successfully
          </p>
        </div>
        <div class="payment_receipt" v-else>
          <p class="mb-3">Enter the email address where you would like to receive your receipt.</p>
          <div class="payment_receipt_form border mb-4">
            <input
              v-model="email"
              class="mail"
              type="text"
              placeholder="your@mail.com"
            />
          </div>
          <button class="btn __g __l mb-2 inactive" @click="sendEmail" :class="{ active: email }">
            Send
            <div class="loading-wrap" :class="{ active: loading }">
              <img class="spin" src="@/assets/images/loading.svg" />
            </div>
          </button>
          <button class="btn __lg btn__cancel" @click="hideModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {errorCodeList} from "@/enum/error_code";

export default {
  name: "paymentReceiptEmailModal",
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
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch('modal/hide')
    },
    sendEmail() {
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
    apiSendReceiptEmail() {
      this.loading = true
      const url = `${this.API_BASE_URL}/api/v1/payment/receipt/send`
      const request = {
        params: new URLSearchParams([["payment_token", this.paymentToken], ['email', this.email]]),
      };
      return this.axios.get(url, request)
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
      font-size: 2.3rem;
    }
  }

  &__title {
    font-weight: 500;
    text-align: center;
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

  .payment_receipt {
    &_title {
      font-size: 18px;
      font-weight: 100;
    }

    &_notification {
      text-align: center;
    }

    p {
      font-size: 13px;
    }

    &_form {
      height: 56px;

      .mail {
        height: 51px;
        padding: 0 16px;
        font-size: 15px;
        width: 100%;
      }
    }
  }

  .btn {
    font-size: 15px;
    margin: 10px auto;
    height: 5.5rem;
    line-height: 5.5rem;
    font-weight: 500;
    width: 60%;

    &__cancel {
      width: 60%;
      height: 5.5rem;
      line-height: 5.5rem;
      border-radius: 1rem;
      font-weight: 400;
    }
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
}
</style>