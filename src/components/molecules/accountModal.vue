<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Account
      </h3>
    </div>
    <div class="body">
      <div class="contents-wrap">
        <div class="add-flex j-between mb-1">
          <p class="sub-title">
            Connected  with Metamask
          </p>
          <span @click="switchMyWallet()">
            Change
          </span>
        </div>
        <p class="current-address">
          {{currentAddres | omittedText}}
        </p>
        <div class="add-flex j-left">
          <div class="copy" @click="copy(currentAddres)">
            <img src="@/assets/images/copy.svg">
            Copy Address
          </div>
          <div class="view-explorer">
            <img src="@/assets/images/explore.svg">
            View on the Explorer
          </div>
        </div>
      </div>
      <button @click="disconnect" class="save-note">
        Disconnect
        <img src="@/assets/images/logout.svg" alt="">
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
      },
      currentAddres(){
        return this.$store.state.account.address;
      }
    },
    methods: {
      hideModal() {
        this.$store.dispatch('modal/hide')
      },
      toggleSubMenu(){
        this.$store.dispatch("toggleAccountMenu");
      },
      disconnect(){
        this.hideModal()
        this.toggleSubMenu()
        this.$router.push({ path: '/admin' })
      },
      switchMyWallet(){
        alert("switch metamask")
      },
      copy(value) {
        this.$store.dispatch('account/copied')
        this.$clipboard(value);
      }
    },
    filters: {
      omittedText(value) {
        return  value.slice(0, 6) + "…" + value.slice(-6);
      },
    },
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
    .contents-wrap{
      border: 1px solid #707070;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 32px;
      .sub-title{
        font-size: 11px;
      }
      span{
        font-size: 11px;
        color: #5294F5;
        border: 1px solid #5294F5;
        border-radius: 20px;
        padding: 2px 24px;
        cursor: pointer;
      }
      .current-address{
        position: relative;
        margin-left: 24px;
        margin-bottom: 16px;
        &::after{
          position: absolute;
          left: -16px;
          top: 50%;
          transform: translate(-50%,-52%);
          content: "";
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
        }
      }
      .copy,
      .view-explorer{
        img{
          width: 18px;
          height: 18px;
        }
        font-size: 14px;
      }
      .view-explorer{
        margin-left: 16px;
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