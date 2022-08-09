<template>
  <div class="slash-bg">
    <!-- header -->
    <header class="global-header">
      <div class="global-header__inner">
        <div class="add-flex a-center">
          <h1 class="logo">
            <img class="pc" src="@/assets/images/logo.svg" alt="Web3 Payment" />
            <img
              class="sp"
              src="@/assets/images/logo-sp.svg"
              alt="Web3 Payment"
            />
          </h1>
          <p class="logo-sub">Test Page</p>
        </div>
      </div>
    </header>

    <!-- content -->
    <div class="payment">
      <div class="payment_top">
        <div class="payment_headbox add-flex j-between a-center">
          <div class="logo add-flex a-end">
            <figure>
              <img src="@/assets/images/slash.svg" />
            </figure>
            <div class="product_name">Generate Payment URL</div>
          </div>
        </div>
      </div>
      <div class="add-flex j-between">
        <div class="payment_handleprice">
          <div class="payment_receiptwrap">
            <div class="payment_desc mb-2 mt-1">
              <p>You can issue a Payment URL</p>
            </div>
            <div class="payment_receipt">
              <div v-if="isDevelopmentMode">
                <p class="mb-1">Environment</p>
                <div class="payment_receipt_form border mb-2">
                  <select v-model="environment">
                    <option :value="environmentList.local">Local</option>
                    <option :value="environmentList.staging" selected>
                      Staging
                    </option>
                    <option :value="environmentList.testnet" selected>
                      Testnet
                    </option>
                    <option :value="environmentList.mainnet">Mainnet</option>
                  </select>
                </div>
              </div>
              <p class="mb-1">Authentication Token</p>
              <div class="payment_receipt_form border mb-2">
                <input
                  type="text"
                  v-model="orderToken"
                  placeholder="Reference AdminPage"
                />
              </div>
              <p class="mb-1">Hash Token</p>
              <div class="payment_receipt_form border mb-2">
                <input
                  type="text"
                  v-model="hashToken"
                  placeholder="Reference AdminPage"
                />
              </div>
              <p class="mb-1">Order Code</p>
              <div class="payment_receipt_form border mb-2">
                <input
                  type="text"
                  v-model="orderCode"
                  placeholder="Unique order code"
                />
              </div>
              <p class="mb-1">Amount</p>
              <div class="payment_receipt_form border mb-2">
                <input
                  type="text"
                  v-model="amount"
                  placeholder="Payment amount"
                />
              </div>
                <p class="mb-1">Currency</p>
                <div class="payment_receipt_form border mb-2">
                  <select v-model="amountType">
                    <option value="">Payee Default Token</option>
                    <option
                      v-for="(currency, key) in currencies"
                      :value="currency.name"
                      :key="key"
                    >
                      {{ currency.name }}
                    </option>
                  </select>
                </div>
            </div>
            <button
              class="btn __g __l mt-4 mb-1"
              :class="{ active: !isProcessing, inactive: isProcessing }"
              @click="publishPaymentUrl"
            >
              Publish
              <div class="loading-wrap" :class="{ active: isProcessing }">
                <img class="spin" src="@/assets/images/loading.svg" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isModaiOpen" class="modal-base">
      <div class="modal-box --small">
        <div class="header">
          <h3 class="header__title">Payment URL</h3>
        </div>
        <div class="body">
          <div class="qr">
            <div class="qr_wrap">
              <div class="qr_item">
                <vue-qrcode v-model="paymentUrl" tag="img" />
                <img
                  class="logo"
                  src="@/assets/images/logo-icon.svg"
                  alt="Web3 Payment"
                />
                <img
                  class="logo2"
                  src="@/assets/images/logo-text.svg"
                  alt="Web3 Payment"
                />
              </div >
            </div>
          </div>
          <div class="url mt-5">
            <input type="text" v-model="paymentUrl" disabled />
          </div>
          <div class="copy mt-2" @click="copyPaymentUrl">Copy Address</div>
        </div>
        <button class="close" @click="hideModal">
          <img src="@/assets/images/cross.svg" />
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import JsSHA from "jssha";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { DEVELOPMENT, CURRENCIES } from "@/constants";

export default {
  name: "paymentTest",
  components: { VueQrcode },
  data() {
    return {
      processing: false,
      modalOpen: false,
      environmentList: {
        local: 1,
        staging: 2,
        testnet: 3,
        mainnet: 4,
      },
      environment: 2,
      orderToken: "",
      hashToken: "",
      orderCode: "",
      amountType: "",
      amount: "",
      paymentUrl: "",
    };
  },
  computed: {
    baseUrl() {
      if (this.isDevelopmentMode) {
        switch (this.environment) {
          case this.environmentList.local:
            return process.env.VUE_APP_API_BASE_URL;
          case this.environmentList.staging:
            return "https://stg.slash.fi";
          case this.environmentList.testnet:
            return "https://testnet.slash.fi";
          case this.environmentList.mainnet:
            return "https://slash.fi";
          default:
            return "https://stg.slash.fi";
        }
      } else {
        return "https://testnet.slash.fi";
      }
    },
    isProcessing() {
      return this.processing;
    },
    isModaiOpen() {
      return this.modalOpen;
    },
    isDevelopmentMode() {
      return process.env.NODE_ENV === DEVELOPMENT;
    },
    currencies() {
      return CURRENCIES;
    }
  },
  methods: {
    apiGetPaymentUrl(hash) {
      const url = `${this.baseUrl}/api/v1/payment/receive`;
      let data = {
        identification_token: this.orderToken,
        order_code: this.orderCode,
        verify_token: hash,
        amount_type: this.amountType
      };
      if (this.amount !== "") data.amount = this.amount;
      return this.axios.post(url, data);
    },
    publishPaymentUrl() {
      this.processing = true;
      const hashRaw = `${this.orderCode}::${this.amount}::${this.hashToken}`;
      const sha = new JsSHA("SHA-256", "TEXT");
      sha.update(hashRaw);
      this.apiGetPaymentUrl(sha.getHash("HEX"))
        .then((response) => {
          this.paymentUrl = response.data.url;
          this.modalOpen = true;
          this.processing = false;
        })
        .catch(() => {
          this.$store.dispatch("modal/show", {
            target: "error-modal",
            size: "small",
            params: {
              message: "Failed to publish the Payment URL.",
            },
          });
          this.processing = false;
        });
    },
    hideModal() {
      this.modalOpen = false;
    },
    copyPaymentUrl() {
      this.$store.dispatch("account/copied");
      this.$clipboard(this.paymentUrl);
    },
  },
  created() {
    const strSet = "abcdefghijklmnopqrstuvwxyz0123456789";
    const strLength = strSet.length;
    let generated = "";
    for (let i = 0; i < 16; i++) {
      generated += strSet[Math.floor(Math.random() * strLength)];
    }
    this.orderCode = `test-${generated}`;
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

// Header
.global-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--color_border);
  width: 100%;
  position: fixed;
  top: 0;
  background: var(--color_bg);
  z-index: 1000;
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
  @include media(pc) {
    height: 80px;
    padding: 0 24px;
    .logo {
      height: 36px;
    }
    .logo-sub {
      margin-top: 10px;
      margin-left: 16px;
      font-size: 14px;
    }
  }
  @include media(sp) {
    height: 55px;
    padding: 0 20px;
    bottom: 0;
    .logo {
      height: 29px;
    }
    .logo-sub {
      display: none;
    }
  }
  .logo {
    white-space: nowrap;
  }
}

// Content
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
.slash-bg {
  width: 100%;
  min-height: 130vh;
  @include media(sp) {
    min-height: 140vh;
  }
  position: relative;
  &::before {
    content: "";
    background: url(/assets/images/slash-bg.png) no-repeat center center;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 100px;
    z-index: 0;
    @include media(sp) {
      top: 70px;
    }
  }
}
.payment {
  position: absolute;
  top: 75vh;
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
}
.payment_handleprice {
  width: 100%;
  .payment_desc {
    p {
      background: $gradation-pale;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
  }
  .payment_receiptwrap {
    width: 100%;
  }
  .payment_receipt {
    p {
      font-size: 15px;
      font-weight: 400;
    }
    &_form {
      height: 56px;
      input,
      select {
        width: 100%;
        height: 51px;
        padding: 0 16px;
        font-size: 15px;
        outline: none;
      }
    }
  }
  .btn {
    position: relative;
  }
}

// Modal
.modal-base {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 9999;
}
.modal-box {
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color_bg);
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
    padding: 24px;
    &__title {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
    &__desc {
      font-size: 2rem;
    }
  }
  @include media(sp) {
    padding: 18px;
    &__title {
      font-size: 1.7rem;
    }
  }
  &__title {
    font-weight: 500;
  }
  &__desc {
    font-weight: 300;
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
    padding: 24px 24px 40px;
  }
  @include media(sp) {
    padding: 16px 12px 48px;
  }
  .qr {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    background: $gradation-light;
    padding: 6px;
    border-radius: 1rem;
    overflow: hidden;
    &_wrap {
      background-color: #fff;
      padding-bottom: 1rem;
    }
    &_item {
      position: relative;
      display: block;
      @include media(pc) {
        pointer-events: none;
      }
      img {
        width: 100%;
        position: relative;
        z-index: 1;
      }
    }
    .logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      width: 20%;
      height: auto;
    }
    .logo2 {
      width: 38%;
      margin-left: auto;
      margin-right: auto;
      display: block;
      margin-top: -1rem;
      position: relative;
      z-index: 10;
    }
  }
  .url {
    width: 100%;
    input {
      width: 100%;
      height: 56px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #78668d;
      border-radius: 8px;
      font-size: 17px;
    }
  }
  .copy {
    color: #8e86ad;
    font-size: 17px;
    position: relative;
    display: inline-block;
    font-weight: 300;
    cursor: pointer;
    &::after {
      content: "";
      background: url(/assets/images/copy-address.svg) no-repeat center center;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      right: -40px;
      transform: translate(-50%, -60%);
    }
  }
  // .btn {
  //   &.__m {
  //     background: $gradation-pale;
  //   }
  // }
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
