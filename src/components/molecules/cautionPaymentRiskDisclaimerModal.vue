<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Risk Disclaimer
      </h3>
      <p class="header__desc">
        Read the risk disclaimer carefully, and check the following options to acknowledge confirmation.
      </p>
    </div>
    <div class="separate-line"></div>
    <div class="body">
      <div v-if="isUnVerifiedDomain">
        <p class="desc mt-2">
          Do you understand the purpose of this transaction and have you verified that there is no risk of fraud?
        </p>
        <div class="checkbox-container mt-2">
          <input id="confirm" type="checkbox" ref="confirmed" @click="updateConfirmedStatus()">
          <label for="confirm">I understand the purpose of this transaction and have verified that there is no fear of fraud.</label>
        </div>
        <p class="desc mt-2">
          No refund of funds from us can be made if you are successful in this transaction. If there is a dispute with Payee, the parties will need to resolve it among themselves. Do you still want to continue with this transaction?
        </p>
        <div class="checkbox-container mt-2">
          <input id="accept" type="checkbox" ref="accepted" @click="updateAcceptedStatus()">
          <label for="accept">I understand the risk and continue this transaction.</label>
        </div>
      </div>

      <p class="desc mt-2">
        Slash Web3 Payment temporarily retains information that uniquely identifies your terminal from the time you connect the wallet until the transaction is completed in order to provide secure payment, can you agree?
        <br>
        By connecting your Wallet, you agree to our Privacy Policy.&nbsp;
        <a target="_blank" href="https://slash-fi.gitbook.io/docs/support/data-protection-and-privacy-policy">Learn more.</a>
      </p>
      <div class="checkbox-container mt-2">
        <input id="agree" type="checkbox" ref="agreed" @click="updateAgreedStatus()">
        <label for="agree">I understand and agree.</label>
      </div>

      <div class="btn-container mt-3">
        <button
          class="btn __g __l non-translate"
          :class="{ inactive: !isAllAccepted }"
          @click="handleOk()"
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
    name: 'cautionPaymentEiskDisclaimerModal',
    data () {
      return {
        confirmed: false,
        accepted: false,
        agreed: false,
      }
    },
    computed: {
      classes() {
        const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
        return classes
      },
      isUnVerifiedDomain() {
        return !this.$store.state.modal.params.isVerifiedDomain
      },
      isAllAccepted() {
        return this.isUnVerifiedDomain
          ? this.confirmed && this.accepted && this.agreed
          : this.agreed
      },
      isShowCancelButton() {
        return 'returnUrl' in this.$store.state.modal.params
          && this.$store.state.modal.params.returnUrl !== null
      }
    },
    methods: {
      hideModal() {
        if(this.isAccepted) {
          this.$store.dispatch('modal/hide')
        }
      },
      returnToMerchant() {
        location.href = this.$store.state.modal.params.returnUrl
      },
      updateConfirmedStatus() {
        this.confirmed = this.$refs.confirmed.checked
      },
      updateAcceptedStatus() {
        this.accepted = this.$refs.accepted.checked
      },
      updateAgreedStatus() {
        this.agreed = this.$refs.agreed.checked
      },
      handleOk() {
        this.$store.dispatch('payment/updateAllowCookiesStatus', true)
        this.$store.dispatch('modal/hide')
      },
      handleCancel() {
        this.$router.back()
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
      max-height: 70%;
      overflow: auto;
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
      padding: 24px;
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
      padding: 18px;
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
    &__title::before {
      content: "";
      margin-right: 5px;
      display: inline-block;
      background: url(/assets/images/caution.svg) no-repeat center center;
      background-size: contain;
      vertical-align: middle;
    }
    &__desc {
      font-weight: 100;
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
      padding: 0 24px 24px 24px;
    }
    @include media(sp) {
      padding: 0 24px 18px 18px;
      .btn_content{
        margin-left: 0;
        p{
          font-size: 10px;
        }
      }
    }
    .desc {
      font-weight: 100;
      font-size: 1.6rem;
      a {
        color: #5492F5;
        font-weight: 200;
      }
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