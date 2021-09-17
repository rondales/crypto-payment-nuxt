<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Select a Network
      </h3>
      <p class="header__desc">
        Select a network of tokens to pay for.
      </p>
    </div>
    <div class="body add-flex j-between">
      <button class="btn __m half" @click="networkValue('eth')">
        <span class="btn-icon">
          <img src="@/assets/images/eth.svg">
        </span> 
          Ethereum Main net
      </button>
      <button class="btn __m half" @click="networkValue('bsc')">
        <span class="btn-icon">
          <img src="@/assets/images/bsc.svg">
        </span> 
          Binance Smart Chain Mainnet
      </button>
    </div>
    <button class="close" @click="closeModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
  </div>
</template>

<script>

  export default {
    name: 'networkModal',
    components: {
    },
    data() {
      return {
        num: "",
      };
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
      networkValue(currency) {
        this.$store.dispatch('selectNetwork', currency)
      }
    },
    mounted() {
      
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
      padding: 24px 24px 40px;
    }
    @include media(sp) {
      padding: 24px 12px 48px;
      flex-wrap: wrap;
      .btn{
        width: 100% !important;
        &:nth-child(1){
          margin-bottom: 16px;
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
</style>