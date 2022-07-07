<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Regenerate URL
      </h3>
    </div>
    <div class="separate-line"></div>
    <div v-if="!isPaymentUrlRefreshed" class="body">
      <h4 class="body__title">
        Regenerate payment URL
      </h4>
      <p class="desc mt-1">
        Once the payment URL is regenerated, the current URL will no longer be available for payment, so please use the QR code or URL displayed after the payment URL is regenerated.
      </p>
      <div class="checkbox-container mt-2">
        <input id="confirm" type="checkbox" ref="confirmed" @click="updateConfirmedStatus()">
        <label for="confirm">I agree to regenerate the payment URL.</label>
      </div>
      <div class="btn-container mt-4">
        <button
          class="btn __g __l non-translate"
          :class="{ inactive: !isConfirmed }"
          @click="handleRefreshPaymentToken()"
        >
          OK
          <div class="loading-wrap" :class="{ active: isPaymentUrlRefreshing }">
            <img class="spin" src="@/assets/images/loading.svg">
          </div>
        </button>
        <button
          v-if="!isPaymentUrlRefreshed"
          class="btn __g __l mt-1 non-translate"
          :class="{ inactive: isPaymentUrlRefreshing }"
          @click="hideModal()"
        >
          Cancel
        </button>
      </div>
    </div>
    <div v-else class="body">
      <p class="desc">
        You can access this page with the MetaMaskMobile browser by scanning the following QR code on a device with MetaMaskMobile installed.
      </p>
      <div class="qr mt-4">
        <a :href="metamaskMobileDeeplinkUrl">
          <vue-qrcode :value="metamaskMobileDeeplinkUrl" tag="img" />
        </a>
      </div>
      <div class="deeplink mt-2">
        <a :href="metamaskMobileDeeplinkUrl">Access with MetaMask Mobile Browser</a>
      </div>
      <div class="url-wrap add-flex mt-5">
        <div class="url">
          {{ paymentUrl }}
        </div>
        <figure>
          <img class="btn-copy" :src="copyIcon" @click="copy(paymentUrl)">
        </figure>
      </div>
    </div>
    <button
      v-if="!isPaymentUrlRefreshing && !isPaymentUrlRefreshed"
      class="close"
      @click="hideModal()"
    >
      <img :src="closeIcon">
      close
    </button>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { DARK_THEME } from '@/constants'

export default {
  name: 'regeneratePaymentUrlModal',
  components: { VueQrcode },
  data () {
    return {
      confirmed: false,
      refreshing: false,
      refreshed: false,
      paymentUrl: null
    }
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    classes() {
      const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
      return classes
    },
    closeIcon() {
      return this.isDarkTheme
        ? require('@/assets/images/cross.svg')
        : require('@/assets/images/cross-l.svg')
    },
    copyIcon() {
      return this.isDarkTheme
        ? require('@/assets/images/copy.svg')
        : require('@/assets/images/copy-l.svg')
    },
    paymentToken() {
      return this.$route.params.token
    },
    metamaskMobileDeeplinkUrl() {
      const url = new URL(this.paymentUrl)
      return `https://metamask.app.link/dapp/${url.host}${url.pathname}`
    },
    isConfirmed() {
      return this.confirmed
    },
    isPaymentUrlRefreshing() {
      return this.refreshing && !this.refreshed
    },
    isPaymentUrlRefreshed() {
      return !this.refreshing && this.refreshed
    },
    isDarkTheme() {
      return this.$store.state.theme === DARK_THEME
    }
  },
  methods: {
    apiRefreshPaymentToken() {
      const url = `${this.API_BASE_URL}/api/v1/payment/token/refresh`
      const request = { params: new URLSearchParams([['payment_token', this.paymentToken]])}
      return this.axios.get(url, request)
    },
    handleRefreshPaymentToken() {
      this.refreshing = true
      this.apiRefreshPaymentToken()
        .then((response) => {
          this.$store.dispatch('payment/updateDeviceId', null)
          this.paymentUrl = `${location.protocol}//${location.host}/payment/wallets/${response.data.token}`
          this.refreshing = false
          this.refreshed = true
        })
        .catch(() => {
          this.$store.dispatch('modal/show', {
            target: 'error-modal',
            size: 'small',
            params: {
              message: 'Failed to refresh the Payment URL.<br>Please try again.'
            }
          })
        })
    },
    updateConfirmedStatus() {
      this.confirmed = this.$refs.confirmed.checked
    },
    copy(value) {
      this.$store.dispatch('account/copied')
      this.$clipboard(value);
    },
    hideModal() {
      this.$store.dispatch('modal/hide')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

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
      max-height: 85%;
      overflow: auto;
    }
  }
  .header {
    @include media(pc) {
      padding: 24px 24px 0 24px;
      &__title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      &__title::before {
        width: 2.5rem;
        height: 2.5rem;
      }
      &__desc {
        font-size: 1.6rem;
      }
    }
    @include media(sp) {
      padding: 18px 18px 0 18px;
      &__title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      &__title::before {
        width: 2rem;
        height: 2rem;
      }
      &__desc {
        font-size: 1.5rem;
      }
    }
    &__title {
      font-weight: 500;
    }
  }
  .separate-line {
    border-bottom: 1px solid #78668D;
    @include media(pc) {
      margin: 0 24px;
    }
    @include media(sp) {
      margin: 0 18px;
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
      padding: 24px 24px 24px 24px;
      &__title {
        font-size: 2rem;
      }
      &__title::before {
        width: 2.7rem;
        height: 2.7rem;
      }
    }
    @include media(sp) {
      padding: 24px 18px 24px 18px;
      &__title {
        font-size: 1.8rem;
      }
      &__title::before {
        width: 2.2rem;
        height: 2.2rem;
      }
      .btn_content{
        margin-left: 0;
        p{
          font-size: 10px;
        }
      }
    }
    &__title {
      font-weight: 300;
    }
    &__title:before {
      content: "";
      margin-right: 5px;
      display: inline-block;
      background: url(/assets/images/reuse-green.svg) no-repeat center center;
      background-size: contain;
      vertical-align: middle;
    }
    .desc {
      font-weight: 100;
      font-size: 1.6rem;
    }
    .checkbox-container {
      position: relative;
      font-weight: 100;
      font-size: 1.4rem;
      input[type="checkbox"] {
          display: none;
      }
      input[type="checkbox"]+label {
        display: none;
        cursor: pointer;
        display: inline-block;
        position: relative;
        padding-left: 30px;
        padding-right: 10px;
      }
      input[type="checkbox"]+label::before{
        content: "";
        position: absolute;
        display: block;
        box-sizing: border-box;
        width: 18px;
        height: 18px;
        left: 0;
        top: 0%;
        border: 2px solid;
        border-radius: 2px;
        border-color:  var(--color_font);
        background-color: var(--color_bg);
      }
      input[type="checkbox"]:checked+label::after{
        content: "";
        position: absolute;
        display: block;
        box-sizing: border-box;
        width: 15px;
        height: 6px;
        margin-top: 5px;
        top: 0%;
        left: 3px;
        transform: rotate(-45deg);
        border-bottom: 3px solid;
        border-left: 3px solid;
        border-color:  #44d866;
      }
    }
    .btn-container {
      @include media(pc) {
        padding: 0 80px 0;
      }
      @include media(sp) {
        padding: 0 40px 0;
      }
    }
    .qr {
      width: 100%;
      text-align: center;
      a {
        @include media(pc) {
          pointer-events: none;
        }
      }
      img {
        border-radius: 8px;
      }
    }
    .deeplink {
      width: 100%;
      text-align: center;
      font-size: 13px;
      @include media(pc) {
        display: none;
      }
      a::after {
        content: "";
        background: url(/assets/images/logout.svg) no-repeat center center;
        width: 17px;
        height: 17px;
        position: absolute;
        margin-left: 5px;
      }
    }
    .url-wrap {
      position: relative;
      // width: 100%;
      padding: 15px 0 15px 18px;
      background: var(--color_box);
      border-radius: 8px;
      vertical-align: middle;
      .url {
        width: 85%;
        height: 48px;
        overflow: scroll;
        -ms-overflow-style: none;
        overflow-wrap: break-word;
        font-weight: 100;
        font-size: 1.6rem;
      }
      .url::-webkit-scrollbar {
        display: none;
      }
      figure {
        position: absolute;
        top: 22px;
        right: 15px;
        .btn-copy {
          cursor: pointer;
        }
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
  #paying-accept-checkbox {
    font-size: 1.5rem;
    line-height: 1.5;
    cursor: pointer;
  }
  #button-container {
    text-align: center;
  }
  .continue-button {
    position: relative;
    font-size: 17px;
    font-weight: 100;
    cursor: pointer;
    padding: 4px 16px;
    border-radius: 10px;
    border: solid 1px #fff;
    &.__active {
      color: #fff;
      background: $gradation-pale;
    }
  }
</style>