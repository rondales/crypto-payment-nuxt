<template>
  <div>
    <PaymentModal
      title="Warning"
      text="The following contracts have been suspended for various reasons.<br />Please contact the help desk for details."
    >
      <!-- TODO 確認の仕方 -->
      <!-- <p class="d-todo">{{ $options.name }}</p> -->
      <PaymentText tag="h4" type="h5" html="Suspended contracts" />
      <ul class="list_network">
        <li v-for="network in contractSuspendedNetworks" :key="network.chainId">
          <PaymentText :html="network.name" />
        </li>
      </ul>
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
        <h3 class="header__title">Warning</h3>
        <p class="header__desc">
          The following contracts have been suspended for various reasons.
          <br />
          Please contact the help desk for details.
        </p>
      </div>
      <div class="body">
        <h4 class="title">Suspended contracts</h4>
        <ul class="list_network">
          <li
            v-for="network in contractSuspendedNetworks"
            :key="network.chainId"
          >
            {{ network.name }}
          </li>
        </ul>
      </div>
      <button class="close" @click="hideModal">
        <img src="@/assets/images/cross.svg" />
        close
      </button>
    </div> -->
  </div>
</template>

<script>
import AvailableNetworks from "@/network";
import PaymentModal from "@/components/organisms/Payment/Modal";
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "contractStatusModal",
  components: {
    PaymentText,
    PaymentButton,
    PaymentModal,
  },
  data() {
    return {
      networks: [],
    };
  },
  computed: {
    classes() {
      const classes = ["modal-box", `--${this.$store.state.modal.size}`];
      return classes;
    },
    paymentAvailableNetworks() {
      return this.$store.state.modal.params.availableNetworks;
    },
    contractSuspendedNetworks() {
      return Object.values(AvailableNetworks).filter((network) =>
        this.paymentAvailableNetworks.includes(network.chainId)
      );
    },
  },
  methods: {
    hideModal() {
      this.$store.dispatch("modal/hide");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.list_network {
  margin: 1rem 0;
  li {
    margin-left: 25px;
  }
}
// .modal-box {
//   border-radius: 10px;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background: var(--color_bg);
//   @include media(pc) {
//     &.--small {
//       width: 470px;
//     }
//     &.--medium {
//       width: 760px;
//     }
//   }
//   @include media(sp) {
//     width: calc(100vw - 32px);
//   }
// }
// .header {
//   @include media(pc) {
//     padding: 24px;
//     &__title {
//       font-size: 2.5rem;
//       margin-bottom: 2rem;
//     }
//     &__desc {
//       font-size: 2rem;
//     }
//   }
//   @include media(sp) {
//     padding: 18px;
//     &__title {
//       font-size: 2rem;
//       margin-bottom: 1rem;
//     }
//     &__desc {
//       font-size: 1.5rem;
//     }
//   }
//   &__title {
//     font-weight: 500;
//   }
//   &__desc {
//     font-weight: 100;
//     ul {
//       list-style: circle;
//     }
//   }
// }
// .close {
//   position: absolute;
//   width: 16px;
//   height: 16px;
//   font-size: 0;
//   @include media(pc) {
//     top: 30px;
//     right: 24px;
//   }
//   @include media(sp) {
//     top: 24px;
//     right: 24px;
//   }
// }
// .body {
//   .title {
//     font-weight: 500;
//     margin-bottom: 0.5rem;
//   }
//   .list_network {
//     font-weight: 100;
//     li {
//       list-style: circle;
//       margin-left: 25px;
//     }
//   }
//   @include media(pc) {
//     padding: 24px 24px 40px;
//     .title {
//       font-size: 2rem;
//     }
//     .list_network {
//       font-size: 1.7rem;
//     }
//   }
//   @include media(sp) {
//     padding: 24px 12px 48px;
//     .title {
//       font-size: 1.7rem;
//     }
//     .list_network {
//       font-size: 1.5rem;
//     }
//   }
// }
// .footer {
//   text-align: center;

//   @include media(pc) {
//     padding: 0 40px 40px;
//   }
//   @include media(sp) {
//     padding: 0 32px 32px;
//   }
// }
</style>
