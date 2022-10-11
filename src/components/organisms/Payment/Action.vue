<template>
  <div :class="classes">
    <PaymentIcon v-if="icon" class="icon" :path="icon" :type="iconType" />
    <div class="textwrap">
      <PaymentText v-if="text" class="text" tag="p" type="h5" :html="text" />
      <PaymentButton v-if="url" size="icon" icon="outerlink" :url="link" />
    </div>
    <!-- <PaymentButton size="s" text="Change" /> -->
    <slot />
  </div>
</template>

<script>
import PaymentIcon from "@/components/organisms/Payment/Icon";
import PaymentButton from "@/components/organisms/Payment/Button";
import PaymentText from "@/components/organisms/Payment/Text";
export default {
  name: "PaymentTitle",
  components: {
    PaymentIcon,
    PaymentButton,
    PaymentText,
  },
  props: {
    icon: {
      type: String,
      default: "",
    },
    iconType: {
      type: String,
      default: "svg"
    },
    text: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  filters: {},
  computed: {
    classes() {
      let array = { action: true };
      // array[this.type] = true;
      return array;
    },
  },
  methods: {},
  created() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.action {
  @include flex(space-between, center);
  // background-color: var(--Base2);
  // border: 1px solid var(--Border);
  // padding: 0.5rem;
  // border-radius: 0.5rem;
  // @include media(sp) {
  //   padding: 0.5rem;
  // }
  .textwrap {
    flex: 1;
  }
  .icon {
    // width: 4rem;
    width: 2rem;
    font-size: 0;
  }
  .text {
    flex: 1;
    padding: 0 0.5rem;
  }
}
</style>
