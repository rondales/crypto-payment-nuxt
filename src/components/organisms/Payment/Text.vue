<template>
  <div class="text">
    <components :class="classes" :is="tag" v-html="html"></components>
  </div>
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
      type: [String, Number],
    },
    color: {
      type: String,
      default: "normal",
    },
    emoji: {
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
      // return "text__" + this.type;
      let array = {};
      array["text__" + this.type] = true;
      array["color__" + this.color] = true;
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

.text {
  font-size: 0;
  color: var(--Text);
  &.color {
    &__red {
      color: var(--Alert);
    }
    &__green {
      color: var(--Success);
    }
    &__g {
      background: $gradation-light;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  &__h0 {
    // amount price
    @extend .text;
    @include font(3.1rem, 600, $ls, $lh, $en_go);
  }
  &__h1 {
    // process percent
    @extend .text;
    @include font(2.45rem, 600, $ls, $lh, $en_go);
  }
  &__h1b {
    // INVOICE title
    @extend .text;
    @include font(2.45rem, 600, $ls, $lh, $en_go);
  }
  &__h2b {
    // price big
    @extend .text;
    @include font(1.95rem, 600, $ls, $lh, $en_go);
    & + .emoji {
      font-size: 1.95rem;
    }
  }
  // &__h2 {
  // @extend .text;
  //   @include font(1.93rem, 400, $ls, $lh, $en_go);
  // }
  &__h3 {
    @extend .text;
    @include font(1.57rem, 400, $ls, $lh, $en_go);
  }
  &__h3b {
    // Modal title / price / waiting confirm / gradation title
    @extend .text;
    @include font(1.57rem, 600, $ls, $lh, $en_go);
    & + .emoji {
      font-size: 1.57rem;
    }
  }
  &__h3 {
    @extend .text;
    @include font(1.57rem, 400, $ls, $lh, $en_go);
  }
  &__h4b {
    // symbol / buttun m / subtitle
    @extend .text;
    @include font(1.25rem, 600, $ls, $lh, $en_go);
  }
  &__h4 {
    @extend .text;
    @include font(1.25rem, 400, 0.04em, $lh, $en_go);
  }
  &__h5 {
    // token button  / input / tab title / import
    @extend .text;
    @include font(1rem, 600, 0.04em, $lh, $en_go);
  }
  &__p {
    // 本文
    @extend .text;
    @include font(1rem, 400, $ls, $lh, $en_go);
  }
  &__capb {
    @extend .text;
    @include font(0.8rem, 500, 0.04em, 1.8, $en_go);
  }
  &__cap {
    // buttuns
    @extend .text;
    @include font(0.8rem, 400, 0.04em, 1.8, $en_go);
  }

  &__modalTitle {
    @include font(2.5rem, 500, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 2rem;
    }
  }
  &__subtitle {
    @include font(1.25rem, 500, $ls, $lh, $en_go);
  }
  &__minititle {
    @include font(1rem, 300, $ls, $lh, $en_go);
  }
  &__lead {
    @include font(1.1rem, 500, $ls, $lh, $en_go);
  }

  &__connectWallet {
    @include font(0.875rem, 400, $ls, $lh, $en_go);
    white-space: nowrap;
  }
  &__copylink {
    @include font(0.9rem, 300, $ls, $lh, $en_go);
  }
  &__price {
    @include font(1.5rem, 500, $ls, $lh, $en_go);
  }
  &__symbol {
    @include font(1rem, 500, $ls, $lh, $en_go);
  }
  &__header {
    &__sub {
      @include font(1rem, 500, $ls, 1, $en_go);
    }
    &__testnet {
      @include font(0.8rem, 400, $ls, 1, $en_go);
    }
  }
  &__token {
    &__title {
      @include font(0.8rem, 400, $ls, $lh, $en_go);
      line-height: 1;
      // @include font(0.8rem, 300, $ls, 1, $en_go);
    }
    &__symbol {
      @extend .text__subtitle;
    }
  }
}
</style>
