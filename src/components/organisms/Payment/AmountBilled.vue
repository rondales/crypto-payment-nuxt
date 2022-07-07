<template>
  <div class="billed">
    <div class="left add-flex j-between a-center">
      <figure>
        <img :src="icon" :alt="symbol" />
      </figure>
      <dl>
        <dt><PaymentText type="cap" html="Amount billed" /></dt>
        <dd><PaymentText type="subtitle" :html="symbol" /></dd>
      </dl>
    </div>
    <div class="usdt-price" :class="priceClass">
      <PaymentText tag="p" type="price" :html="price" />
    </div>
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
export default {
  name: "PaymentAmountBilled",
  components: {
    // PaymentButton,
    PaymentText,
  },
  props: {
    icon: {
      type: String,
      default: require("@/assets/images/usdt.png"),
    },
    symbol: {
      type: String,
      default: "USDT",
    },
    price: {
      type: [Number, String],
      default: 1,
    },
    priceClass: {
      type: Object,
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
.billed {
  padding-bottom: 16px;
  margin: 24px 0 16px;
  border-bottom: 1px solid #78668d;
  @include flex(space-between, center);
  flex-wrap: no-wrap;

  .left {
    @include flex(flex-start, center);
    width: auto;
  }
  figure {
    img {
      height: 46px;
      width: 46px;
      border-radius: 50%;
    }
  }
  dl {
    margin-left: 16px;
    dt,
    dd {
      line-height: 1;
      font-size: 0;
    }
    dt {
      margin-bottom: 4px;
    }
    &::v-deep {
      span {
        line-height: 1;
      }
    }
  }
}
</style>
