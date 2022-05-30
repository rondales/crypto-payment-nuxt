<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Select a Network
      </h3>
      <p v-if="unsupported" class="header__desc">
        The current network is unsupported.
        <br>
        Select a network of tokens to pay for.
      </p>
      <p v-else class="header__desc">
        Select a network of tokens to pay for.
      </p>
    </div>
    <div class="body add-flex j-between">
      <button
        v-for="(network, key) in networks"
        :key="key"
        class="btn __m half"
        :class="{ __pg: isCurrentNetwork(network.chainId), half: !isNetworkOnlyOne, full: isNetworkOnlyOne }"
        @click="switchNetwork(network.chainId)"
      >
        <span class="btn-icon">
          <img :src="network.icon">
        </span>
          {{network.name}}
      </button>
    </div>
    <button v-if="!unsupported" class="close" @click="hideModal">
      <img v-if="$store.state.theme == 'dark'" src="@/assets/images/cross.svg">
      <img v-if="$store.state.theme == 'light'" src="@/assets/images/cross-l.svg">
      閉じる
    </button>
  </div>
</template>

<script>
import AvailableNetworks from '@/network'

export default {
  name: 'networkModal',
  data() {
    return {
      networks: []
    };
  },
  computed: {
    classes() {
      const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
      return classes
    },
    paymentAvailableNetworks() {
      return this.$store.state.payment.availableNetworks
    },
    isCurrentNetwork() {
      return (chainId) => {
        return chainId === this.$store.state.web3.chainId
      }
    },
    isNetworkOnlyOne() {
      return this.$store.state.modal.params.itemCount === 1
    },
    unsupported() {
      return 'unsupported' in this.$store.state.modal.params
        ? this.$store.state.modal.params.unsupported
        : false
    },
    require() {
      return 'hideCloseButton' in this.$store.state.modal.params
        ? this.$store.state.modal.params.hideCloseButton
        : false
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch('modal/hide')
    },
    switchNetwork(chainId) {
      this.$web3.switchChain(
        this.$store.state.web3.instance,
        chainId
      ).then(() => {
        this.$store.dispatch('web3/updateChainId', chainId)
        this.hideModal()
      })
    }
  },
  created() {
    this.networks = Object.values(AvailableNetworks).filter(
      network => this.paymentAvailableNetworks.includes(network.chainId)
    )
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  @include media(pc) {
    .btn:nth-child(n + 3) {
      margin-top: 25px;
    }
  }
  @include media(sp) {
    .btn:not(:last-child) {
      margin-bottom: 16px;
    }
  }

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