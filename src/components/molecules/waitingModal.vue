<template>
  <div :class="classes">
    <div class="header">
      <figure>
        <img src="@/assets/images/connecting.svg" alt="">
      </figure>
      <h3 class="header__title">
        Waiting for Confimation
      </h3>
    </div>
    <div class="body">
      <p class="mb-2">
        Pay 1001.00 USDT for 1001.00 USDT
      </p>
      <p>
        Confirm this transaction your wallet
      </p>
    </div>
    <button class="close" @click="closeModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>    
  </div>
</template>

<script>

  export default {
    name: 'walletModal',
    components: {
    },
    data() {
      return {
        num: "",
      };
    },   
    mounted() {
      setTimeout(() => {
        this.closeModal();
        this.openModal();
      }, 1000);
    },     
    computed: {
      classes() {
        const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
        return classes
      }
    },
    methods: {
      closeModal() {
        this.$store.dispatch('closeModal')
      },
      openModal() {
        this.$store.dispatch("openModal", {target: "submitted-modal", size: "small"});
        // errorModal this.$store.dispatch("openModal", {target: "dismiss-modal", size: "small"});
        this.$store.dispatch("selectBases", this.basesValues)
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
    text-align: center;
    figure{
      margin-bottom: 32px;
    }
    @include media(pc) {
      padding: 48px 24px 0;
      &__title {
        font-size: 17px;
        margin-bottom: 8px;
      }
      &__desc {
        font-size: 2rem;
      }
    }
    @include media(sp) {
      padding: 18px;
      &__title {
        font-size: 16px;
        margin-bottom: 8px;
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
    text-align: center;
    p{
      font-size: 13px;
      font-weight: 100;
    }
    @include media(pc) {
      padding: 0 24px 40px;
    }
    @include media(sp) {
      padding: 16px 12px 48px;
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