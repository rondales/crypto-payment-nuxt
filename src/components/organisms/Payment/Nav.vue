<template>
  <div :class="classes">
    <div><PaymentIcon path="left-arrow" /></div>
    <PaymentText tag="p" type="h1b" color="g" html="INVOICE" />
    <div><PaymentIcon path="cancel" /></div>
  </div>
</template>

<script>
import PaymentIcon from "@/components/organisms/Payment/Icon";
import PaymentText from "@/components/organisms/Payment/Text";
export default {
  name: "PaymentNav",
  components: {
    PaymentIcon,
    PaymentText,
  },
  props: {
    // type: {
    //   type: String,
    //   default: "span",
    // },
  },
  data() {
    return {};
  },
  filters: {},
  computed: {
    classes() {
      let array = { nav: true };
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
.nav {
  @include flex(space-between, center);
  margin-bottom: 2rem;
  & > * {
    &:nth-child(1),
    &:nth-child(3) {
      width: 2.5rem;
      font-size: 0;
    }
  }
}
</style>
