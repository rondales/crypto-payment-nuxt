<template>
  <components :class="classes" :is="tag" v-html="html"></components>
</template>

<script>
export default {
  name: "PaymentText",
  props: {
    tag: {
      type: String,
      default: "span",
    },
    type: {
      type: String,
      default: "p",
    },
    html: {
      type: String,
    },
  },
  data() {
    return {};
  },
  filters: {},
  computed: {
    classes() {
      return "text__" + this.type;
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
.text {
  &__modalTitle {
    @include font(2.5rem, 500, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 2rem;
    }
  }
  // &__lead {
  //   @include font(16px, $fw, $ls, $lh, $en_go);
  //   @include media(sp) {
  //     font-size: 13px;
  //   }
  // }
  &__p {
    @include font(16px, 300, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 13px;
    }
  }
}
</style>
