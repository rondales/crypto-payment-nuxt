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
  &__subtitle {
    @include font(20px, 500, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 18px;
    }
  }
  &__minititle {
    @include font(16px, 300, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 12px;
    }
  }
  &__lead {
    @include font(18px, 500, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 15px;
    }
  }

  &__p {
    @include font(15px, 300, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 13px;
    }
  }
  &__cap {
    @include font(12px, 300, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 11px;
    }
  }

  &__connectWallet {
    @include font(14px, 400, $ls, $lh, $en_go);
    white-space: nowrap;
  }
  &__copylink {
    @include font(15px, 300, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 13px;
    }
  }
  &__price {
    @include font(24px, 500, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 22px;
    }
  }
  &__symbol {
    @include font(16px, 500, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: 14px;
    }
  }
}
</style>
