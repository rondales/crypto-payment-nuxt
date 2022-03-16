<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Receive Token
      </h3>
    </div>
    <div class="body">
      <figure>
        <img src="@/assets/images/icon/usdt-l.svg">
      </figure>
      <h4>
        Tether USDT
      </h4>
      <p href="https://coinmarketcap.com/currencies/tether/">
        https://coinmarketcap.com/currencies/tether/
      </p>
      <button @click="slectedToken" class="btn __m">
        Submit
      </button>
      <span>
        Submited cannot be changed later.
      </span>
    </div>
    <button class="close" @click="hideModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
  </div>
</template>

<script>

  export default {
    name: 'walletModal',
    computed: {
      classes() {
        return [ 'modal-box', `--${this.$store.state.modal.size}` ]
      }
    },
    methods: {
      hideModal() {
        this.$store.dispatch('modal/hide')
      },
      slectedToken(){
        this.$store.dispatch('account/selectReceiveToken')
        this.$store.dispatch('modal/hide')
      },
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
      background: $gradation-light;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
    &__desc {
      font-weight: 100;
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
    text-align: center;
    figure{
      width: 70px;
      height: 70px;
      margin: 0 auto 16px;
      display: inline-block;
    }
    h4{
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 32px;
    }
    p{
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 40px;
    }
    span{
      font-size: 13px;
      font-weight: 400;
    }
    @include media(pc) {
      padding: 24px 24px 40px;
    }
    @include media(sp) {
      padding: 16px 12px 48px;
    }
    .btn {
      width: 100%;
      text-align: center;
      font-size: 18px;
      margin-bottom: 24px;
      &.__m {
        background: $gradation-double;
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