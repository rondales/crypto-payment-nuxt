<template>
  <div>
    <PaymentModal
      title="Select a Network"
      :text="
        isSupportedNetwork
          ? 'Please select the network you wish to switch to.'
          : 'The currently connected network is not supported.<br />Please select a supported network below to switch networks.'
      "
    >
      <!-- TODO 確認の仕方 -->
      <!-- <p class="d-todo">{{ $options.name }}</p> -->

      <!-- iconをファイル名で取得したい -->
      <PaymentButton
        v-for="network in supportedNetworks"
        :key="network.chainId"
        :class="{ __pg: isCurrentNetwork(network.chainId) }"
        icon="network.icon"
        :text="Canetwork.namencel"
        size="m"
        @click.native="switchNetwork(network.chainId)"
      />

      <div class="d-btnwrap bottomCloseBtn">
        <PaymentButton
          color="cancel"
          text="CLOSE"
          icon="dismiss"
          size="s"
          @click.native="hideModal()"
        />
      </div>
    </PaymentModal>
    <!-- <div :class="classes">
      <div class="header">
        <h3 class="header__title">Select a Network</h3>
        <p v-if="isSupportedNetwork" class="header__desc">
          Please select the network you wish to switch to.
        </p>
        <p v-else class="header__desc">
          The currently connected network is not supported.
          <br />
          Please select a supported network below to switch networks.
        </p>
      </div>
      <div class="body add-flex j-between">
        <button
          v-for="network in supportedNetworks"
          :key="network.chainId"
          class="btn __m half"
          :class="{ __pg: isCurrentNetwork(network.chainId) }"
          @click="switchNetwork(network.chainId)"
        >
          <span class="btn-icon">
            <img :src="network.icon" />
          </span>
          {{ network.name }}
        </button>
      </div>
      <button v-if="isSupportedNetwork" class="close" @click="hideModal">
        <img src="@/assets/images/cross.svg" />
      </button>
    </div> -->
  </div>
</template>

<script>
import AvailableNetworks from "@/network";
import PaymentModal from "@/components/organisms/Payment/Modal";
// import PaymentText from "@/components/organisms/Payment/Text";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "networkModal",
  components: {
    // PaymentText,
    PaymentButton,
    // PaymentTitle,
    PaymentModal,
  },
  computed: {
    classes() {
      const classes = ["modal-box", `--${this.$store.state.modal.size}`];
      return classes;
    },
    supportedNetworks() {
      return AvailableNetworks;
    },
    isCurrentNetwork() {
      return (chainId) => {
        return chainId === this.$store.state.web3.chainId;
      };
    },
    isSupportedNetwork() {
      const systemAvailableNetworks = Object.values(AvailableNetworks).map(
        (network) => {
          return network.chainId;
        }
      );
      return systemAvailableNetworks.includes(this.$store.state.web3.chainId);
    },
  },
  methods: {
    hideModal() {
      this.$store.dispatch("modal/hide");
    },
    switchNetwork(chainId) {
      this.$web3
        .switchChain(this.$store.state.web3.instance, chainId)
        .then(() => {
          this.$store.dispatch("web3/updateChainId", chainId);
          this.hideModal();
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 4902) {
            this.showAddChainModal(chainId);
          }
        });
    },
    showAddChainModal(chainId) {
      this.$store.dispatch("modal/show", {
        target: "add-chain-modal",
        size: "small",
        params: {
          chainId: chainId,
          hideCloseButton: false,
          lastModalTarget: "switch-network-for-admin-modal",
          lastModalSize: "medium",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
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
  background: var(--color_bg);
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
    .btn {
      width: 100% !important;
      &:nth-child(1) {
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
