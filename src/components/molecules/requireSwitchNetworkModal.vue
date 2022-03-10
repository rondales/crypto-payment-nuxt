<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Switch network
      </h3>
      <p class="header__desc">
        The current network does not support this transaction.
        <br>
        Please click the button below to switch to the corresponding network.
      </p>
    </div>
    <div class="body add-flex j-between">
      <button class="btn __m __pg full" @click="switchNetwork">
        <span class="btn-icon">
          <img :src="networkIcon">
        </span>
          {{ networkName }}
      </button>
    </div>
  </div>
</template>

<script>
import { NETWORKS } from '@/constants'

export default {
  name: 'networkModal',
  computed: {
    classes() {
      const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
      return classes
    },
    chainId() {
      return this.$store.state.modal.params.chainId
    },
    networkName() {
      return NETWORKS[this.chainId].name
    },
    networkIcon() {
      return NETWORKS[this.chainId].icon
    }
  },
  methods: {
    switchNetwork() {
      this.$web3.switchChain(
        this.$store.state.web3.instance,
        this.chainId
      ).then(() => {
        this.$store.dispatch('web3/updateChainId', this.chainId)
        this.$store.dispatch('modal/hide')
      })
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
      padding: 24px 24px;
    }
    @include media(sp) {
      padding: 24px 12px 48px;
      flex-wrap: wrap;
      .btn{
        width: 100% !important;
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