<template>
  <div class="slash-bg">
    <div class="payment">
      <div class="payment_top">
        <div class="payment_headbox add-flex j-between a-center">
          <div class="logo add-flex a-end">
            <figure>
              <img src="@/assets/images/slash.svg"/>
            </figure>
            <div class="product_name">Generate Payment URL</div>
          </div>
        </div>
      </div>
      <div class="add-flex j-between">
        <div class="payment_handle_price">
          <div class="payment_desc mb-2 mt-1">
            <p>Please wait for Generate</p>
            <p>Payment URL</p>
            <div class="payment_loading mt-2 mb-2" v-if="loading">
              <div class="loading-wrap" :class="{ active: loading }">
                <img class="spin" src="@/assets/images/loading.svg"/>
              </div>
            </div>
            <button class="btn __g __l mb-2 mt-2" v-else @click="refresh">
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {errorCodeList} from "@/enum/error_code";

export default {
  name: "PaymentQrCode",
  data() {
    return {
      loading: false,
      csrfToken: {}
    };
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    }
  },
  methods: {
    apiGetPaymentToken() {
      const url = `${this.API_BASE_URL}/api/v1/payment/generate`
      return this.axios.post(url,
      {
        ...this.csrfToken,
        payment_token: this.$route.params.payment_token,
      }, {
            withCredentials: true,
          });
    },
    apiGetCsrfToken() {
      const url = `${this.API_BASE_URL}/api/v1/security/csrf`
      return this.axios({
        url,
        method: 'get',
        dataType: "JSON",
        withCredentials: true,
      });
    },
    refresh() {
      this.handlePayment()
    },
    async handlePayment() {
      this.loading = true
      try {
        const csrfRes = await this.apiGetCsrfToken()
        this.csrfToken = {...csrfRes.data}
        const payment = await this.apiGetPaymentToken()

        this.$router.push({name: 'entrance', params: {token: payment.data.token}})

      } catch (error) {
        this.loading = false
        console.log({error})
        let message;
        if (error.response.status === 400) {
          message = errorCodeList[error.response.data.errors.shift()].msg;
        } else {
          message = "Please try again after a while.";
        }
        this.showErrorModal(message);
      }
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

  },
  created() {
    this.handlePayment()
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";

.slash-bg {
  width: 100%;
  min-height: 100vh;
  position: relative;

  &::before {
    content: "";
    background: url(/assets/images/slash-bg.png) no-repeat center center;
    width: 100%;
    height: 66vh;
    position: fixed;
    top: 60px;
    z-index: 0;
    @include media(sp) {
      height: 95vh;
      top: 70px;
    }
  }

  .payment {
    position: absolute;
    top: 45vh;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: var(--color_shadow);
    width: 100%;
    max-width: 36.1rem;
    padding: 32px 24px 24px;
    border-radius: 8px;
    background: var(--color_bg);
    @include media(sp) {
      top: calc(35% + 12rem);
    }

    &::before {
      content: "Slash.fi Web3 Payment ®︎";
      font-size: 11px;
      color: var(--color_font);
      font-weight: 300;
      position: absolute;
      bottom: -60px;
      left: 50%;
      transform: translate(-50%, 0);
      opacity: 0.7;
    }

    .payment_top {
      margin-bottom: 16px;

      .logo {
        .product_name {
          font-size: 15px;
          margin-left: 16px;
          font-weight: 300;
        }
      }
    }

    .payment_handle_price {
      width: 100%;

      .payment_desc {
        p {
          background: $gradation-pale;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 150% 150%;
        }
      }

      .payment_loading {
        height: 40px;
        display: flex;
        position: relative;
        background: #ffff;
        width: 40px;
        margin: 0 auto;

        .loading-wrap {
          background: none;
        }
      }
    }
  }
}
</style>

