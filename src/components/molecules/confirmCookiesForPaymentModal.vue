<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Caution
      </h3>
    </div>
    <div class="separate-line"></div>
    <div class="body">
      <h4 class="body__title">
        This feature uses cookies
      </h4>
      <p class="desc mt-1">
        In order to provide secure payments to our customers, Slash Web3 Payment temporarily retains uniquely identifiable information about the customer's terminal until the payment is completed when the wallet is connected.
        <br>
        By connecting your Wallet, you agree to our Privacy Policy.&nbsp;
        <a target="_blank" href="https://slash-fi.gitbook.io/docs/support/data-protection-and-privacy-policy">Learn more.</a>
      </p>
      <div class="checkbox-container mt-2">
        <input id="confirm" type="checkbox" ref="confirmed" @click="updateConfirmedStatus()">
        <label for="confirm">I agree to the Privacy Policy & accept the use of cookies.</label>
      </div>
      <div class="btn-container mt-4">
        <button
          class="btn __g __l non-translate"
          :class="{ inactive: !isConfirmed }"
          @click="handleAgreement()"
        >
          OK
        </button>
        <button
          class="btn __g __l mt-1 non-translate"
          @click="handleCancel()"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirmCookiesForPaymentModal',
  data () {
    return { confirmed: false }
  },
  computed: {
    classes() {
      const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
      return classes
    },
    isConfirmed() {
      return this.confirmed
    }
  },
  methods: {
    handleAgreement() {
      this.$store.dispatch('payment/updateAllowCookiesStatus', true)
      this.$store.dispatch('modal/hide')
    },
    handleCancel() {
      this.$router.back()
    },
    updateConfirmedStatus() {
      this.confirmed = this.$refs.confirmed.checked
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
      background: url(/assets/images/cookie.svg) no-repeat center center;
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
      img {
        border-radius: 8px;
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