<template>
  <div :class="classes">
    <div class="transaction__icon">
      <PaymentIcon :class="iconClasses" :path="imgArr[type]" />
    </div>
    <div class="transaction__textwrap">
      <PaymentText
        v-if="title"
        class="title"
        tag="p"
        type="h3b"
        :html="title"
      />
      <PaymentText v-if="text" class="text" tag="p" :html="text" />
      <PaymentText v-if="cap" tag="p" type="cap" :html="cap" />
      <PaymentButton
        v-if="explorerUrl"
        class="button mt-0"
        size="s"
        color="primary"
        icon="outerlink"
        text="View on explorer"
        :url="explorerUrl"
        layout="reverse"
      />
    </div>
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentIcon from "@/components/organisms/Payment/Icon";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "PaymentTransaction",
  components: {
    PaymentButton,
    PaymentText,
    PaymentIcon
  },
  props: {
    type: {
      type: String,
      default: "loading",
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    cap: {
      type: String,
      default: "",
    },
    explorerUrl: {
      type: String,
      default: "",
    },
    link: {
      type: Object,
      default: () => {
        return {
          color: '',
          title: '',
          url: ''
        }
      }
    },
  },
  data() {
    return {
      imgArr: {
        loading: "loading",
        dismiss: "dismiss",
        success: "check",
      },
    };
  },
  filters: {},
  computed: {
    classes() {
      let array = { transaction: true };
      array[this.type] = true;

      return array;
    },
    iconClasses() {
      let array = { icon: true };
      if (this.type == "loading") {
        array["spin"] = true;
      }
      return array;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.transaction {
  margin-top: 2rem;
  margin-bottom: 2rem;
  &.success {
    &::v-deep {
      svg {
        fill: var(--Success);
      }
    }
  }
  &.dismiss {
    &::v-deep {
      svg {
        fill: var(--Alert);
      }
    }
  }
  &__icon {
    max-width: 10rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
  }
  &__textwrap {
    text-align: center;
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
    .title {
      margin-bottom: 0.5rem;
    }
    .text {
      margin-bottom: 0.5rem;
    }
    .button {
      margin-left: auto;
      margin-right: auto;
      margin-top: 2rem;
    }
  }
  &__foot {
    margin-top: 1rem;
    & > * + * {
      margin-top: 1rem;
    }
  }
}
</style>
