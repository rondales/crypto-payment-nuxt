<template>
  <div :class="classes">
    <div class="header">
      <figure>
        <img src="@/assets/images/submitted.svg" alt="">
      </figure>
      <h3 class="header__title">
        Transaction Submitted
      </h3>
    </div>
    <div class="body">
      <a href="/">View on explorer</a>
      <div class="btn __g __l mt-2" @click="back">
        Back to Receiver’s Services
      </div>      
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
      back(){
        this.$store.dispatch('closeModal')
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
    background:$light-black;
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
      padding: 18px 18px 0;
      &__title {
        font-size: 17px;
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
      padding: 0 12px 48px;
    }
    a{
      font-size: 12px;
      font-weight: 100;
      color: #63A6F2;
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