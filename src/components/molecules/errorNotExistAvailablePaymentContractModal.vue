<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Error
      </h3>
      <p class="header__desc">
        This payment cannot be continued due to merchant's circumstances.
        <br>
        Please contact the merchant for details.
      </p>
    </div>
    <div class="body">
      <a class="btn __g __l mb-0" :href="returnUrl">
        Back to Merchant
      </a>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'errorNotExistAvailablePaymentContractModal',
    computed: {
      classes() {
        const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
        return classes
      },
      returnUrl() {
        return this.$store.state.modal.params.returnUrl
      }
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
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      &__desc {
        font-size: 1.5rem;
      }
    }
    &__title {
      font-weight: 500;
    }
    &__desc {
      font-weight: 100;
    }
  }
  .body {
    @include media(pc) {
      padding: 24px 50px 40px;
    }
    @include media(sp) {
      padding: 24px 12px 48px;
      .btn_content{
        margin-left: 0;
        p{
          font-size: 10px;
        }
      }
    }
  }
</style>