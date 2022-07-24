<template>
  <div :class="classes">
    <div class="modal__header">
      <PaymentTitle
        class="modal__title"
        type="h3"
        :html="title"
        :emoji="emoji"
        layout="modalTitle"
      />
      <PaymentText class="modal__lead" v-if="text" tag="p" :html="text" />
    </div>
    <div class="modal__body">
      <slot />
    </div>
    <PaymentButton
      v-if="closeDisplay"
      icon="dismiss"
      @click.native="hideModal"
      size="icon"
      color="icon"
      class="close"
    />
  </div>
</template>


<script>
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentTitle from "@/components/organisms/Payment/Title";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "cautionPaymentEiskDisclaimerModal",
  components: {
    PaymentText,
    PaymentButton,
    PaymentTitle,
  },
  props: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    emoji: {
      type: String,
    },
    closeDisplay: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      const classes = ["modal", `--${this.$store.state.modal.size}`];
      return classes;
    },
  },
  methods: {
    hideModal() {
      this.$store.dispatch("modal/hide");
      // if (this.isAccepted) {
      //   this.$store.dispatch("modal/hide");
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";

.modal {
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color_bg);
  padding: 36px 24px;
  @include media(pc) {
    max-height: 70%;
    overflow: auto;
    &.--small {
      width: 470px;
    }
    &.--medium {
      width: 760px;
    }
  }
  @include media(sp) {
    padding: 24px 18px;
    width: calc(100vw - 32px);
    max-height: 85%;
    overflow: auto;
  }
  &__header {
    position: relative;
    padding-bottom: 1.5rem;
    // @include media(sp) {
    //   // padding-bottom: 181re,px;
    // }

    &::after {
      // content: "";
      display: block;
      width: 100%;
      border-bottom: 1px solid #78668d;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  &__title {
    &::before {
      // content: "";
      margin-right: 5px;
      display: inline-block;
      background: url(/assets/images/caution.svg) no-repeat center center;
      background-size: contain;
      vertical-align: middle;
      width: 2.5rem;
      height: 2.5rem;
      @include media(sp) {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  &__lead {
    margin-top: 2rem;
    @include media(sp) {
      margin-top: 1rem;
    }
    &::v-deep {
      a {
        margin-top: 0.5rem;
        display: inline-block;
        color: #5492f5;
        text-decoration: underline;
        &::v-deep {
          span {
            color: #5492f5;
          }
        }
      }
    }
  }
  &__body {
    // margin-top: 2rem;
  }
  .d-btnwrap {
    margin-top: 2rem;
    &.bottomCloseBtn {
      margin-top: 2rem;
      &::v-deep {
        button {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
  }
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;

  // width: 16px;
  // height: 16px;
  // font-size: 0;
  // @include media(pc) {
  //   top: 30px;
  //   right: 24px;
  // }
  // @include media(sp) {
  //   top: 24px;
  //   right: 24px;
  // }
}
</style>
