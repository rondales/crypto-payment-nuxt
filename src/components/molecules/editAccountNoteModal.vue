<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Account Note
      </h3>
    </div>
    <div class="body">
      <p class="sub-title">Apps terminal Note</p>
      <div class="text-wrap">
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <button @click="confirm" class="save-note">
        Save Note
        <img src="@/assets/images/edit.svg" alt="">
      </button>
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
      // edit AccountNote
      confirm(){
        alert("edit AccountNote")
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
      text-align: center;
      textarea{
        font-size: 16px;
        resize: none;
        width:100%;
        height:160px;
        background: #171522;
        padding: 16px;
        border-radius: 10px;
        outline: none;
        margin-bottom: 16px;
      }
    }
    .save-note{
      margin: auto;
      display: block;
      font-size: 16px;
      img{
        vertical-align: middle;
        margin-left: 8px;
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