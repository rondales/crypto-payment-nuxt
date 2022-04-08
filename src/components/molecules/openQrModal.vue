<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        URL／QR Code
      </h3>
    </div>
    <div class="body">
      <div class="dsc">
        In order to activate the Slash Store Apps, you must issue a deep link to activate your In order to activate the Slash Store Apps, you must issue a deep link to activate your 
      </div>

      <div class="qr-image-wrap">
        <img class="qr-image" src="@/assets/images/qr-image-sample.png">
        <div class="qr-image-dsc add-flex j-center a-center">
          <img src="@/assets/images/scan.svg">
          <p>
            Scan in Slash StoreApp
          </p>
        </div>
      </div>
      <div class="text-wrap">
        <p>
          {{url}}
        </p>
        <img @click="copy(url)" class="copy" src="@/assets/images/copy.svg">
      </div>

      <button @click="confirm" class="btn __l">
        <span>
          OK
        </span>
      </button>
    </div>
    <button class="close" @click="hideModal">
      <img src="@/assets/images/cross.svg">
      <span>
        閉じる
      </span>
    </button>
  </div>
</template>

<script>

  export default {
    name: 'walletModal',
    data(){
      return{
        url: "https://slash.fi/store_apps/de51c6e1d6ef6wc26ec1e51vc5e15ve3f463ef43"
      }
    },
    computed: {
      classes() {
        return [ 'modal-box', `--${this.$store.state.modal.size}` ]
      }
    },
    methods: {
      hideModal() {
        this.$store.dispatch('modal/hide')
      },
      copy(value) {
        this.$store.dispatch('account/copied')
        this.$clipboard(value);
      },
      // remove the linkage URL
      delete(){
        alert("delete")
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
    background: #292536;
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
      img{
        width: 20px;
        margin-right: 8px;
        vertical-align: baseline;
      }
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
    @include media(pc) {
      padding: 0 24px 40px;
    }
    @include media(sp) {
      padding: 0 12px 48px;
    }
    .sub-title{
      font-size: 18px;
      margin-bottom: 16px;
    }
    .text-wrap{
      padding: 16px;
      background: #171522;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;
      p{
        width: 70%;
        font-size: 11px;
        word-break: break-word;
      }
    }
    .dsc{
      font-size: 12px;
      font-weight: 200;
      margin-bottom: 32px;
    }
    .qr-image-wrap{
      text-align: center;
      .qr-image{
        border-radius: 8px;
        margin-bottom: 32px;
      }
    }
    .qr-image-dsc{
      text-align: center;
      margin-bottom: 40px;
      img{
        width: 30px;
        margin-right: 8px;
      }
      p{
        font-size: 12px;
      }
    }
    .btn{
      font-size: 20px;
      width: 60%;
      margin: auto;
      img{
        padding: 0 12px 4px 0 !important;
        width: 30px;
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