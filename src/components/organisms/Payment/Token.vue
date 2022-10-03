<template>
  <div :class="classes">
    <PaymentIcon :path="icon" :type="iconType" />
    <div class="textwrap">
      <PaymentText tag="p" type="cap" :html="title" />
      <PaymentText tag="p" class="symbol" type="h4b" :html="symbol" />
      <PaymentText tag="p" type="cap" :html="symboltext" />
    </div>
  </div>
</template>
<script>
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentIcon from "@/components/organisms/Payment/Icon";
export default {
  name: "PaymentToken",
  components: {
    PaymentText,
    PaymentIcon,
  },
  props: {
    icon: {
      type: String,
      default: "usdt",
    },
    iconType: {
      type: String,
      default: "svg"
    },
    symbol: {
      type: String,
      default: "USDT",
    },
    title: {
      type: String,
      default: "",
    },
    symboltext: {
      type: String,
      default: "",
    },
    size: {
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
      let array = { token: true };
      array[this.size] = true;
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

.token {
  @include flex(flex-start, center);
  width: auto;
  &.s {
    .svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
    }
  }
  .svg {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    &:v-deep {
      svg {
        height: 100%;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  img {
    width: 2.5rem;
    margin-right: 0.5rem;
  }
  &::v-deep {
    p {
      line-height: 1;
    }
  }
  .textwrap {
    * + * {
      margin-top: 0.3rem;
    }
  }
}
</style>
