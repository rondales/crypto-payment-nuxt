<template>
  <h2 :class="setClass + ''">
    <span class="title" v-html="title.title"></span>
    <span class="subtitle" v-html="title.subtitle"></span>
  </h2>
</template>

<script>
export default {
  props: {
    // type: {
    //   type: String,
    //   default: "page", // page, section
    // },
    title: {
      type: Object,
      required: true,
      default: () => ({
        title: "",
        subtitle: "",
        lead: "",
        text: "",
      }),
    },
    color: {
      type: String,
      default: "w",
    },
  },
  computed: {
    setClass() {
      return "titlewrap " + this.color;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.titlewrap {
  margin-bottom: rem(4);
  text-align: center;
  @include media(sp) {
    margin-bottom: rem(2);
  }
  &.g {
    * {
      background: $gradation-light;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .title {
    @include font(rem(3), 700, 0em, 1.5, $ff);
    display: block;
    @include media(sp) {
      @include font(rem(2), 700, 0em, 1.5, $ff);
    }
  }
  .subtitle {
    @include font(rem(3), 700, 0em, 1.5, $ff);
    @include media(sp) {
      @include font(rem(2), 700, 0em, 1.5, $ff);
    }
  }
}
// h1 {
//   @include font(pow(4) + rem, $fw, $ls, $lh, $en_go);
// }
// h2 {
//   @include font(pow(3) + rem, $fw, $ls, $lh, $en_go);
// }
// .sub {
//   @include font(pow(2) + rem, $fw, $ls, $lh, $en_go);
// }
// .lead {
//   @include font(pow(1) + rem, $fw, $ls, $lh, $en_go);
// }
// .text {
//   @include font(pow(0) + rem, $fw, $ls, $lh, $en_go);
// }
</style>
