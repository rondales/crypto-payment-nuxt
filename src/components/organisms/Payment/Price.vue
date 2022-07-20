<template>
  <div :class="classes">
    <div class="head">
      <PaymentText tag="p" type="h4b" :html="symbol" />
      <PaymentText :color="setCapColor" type="cap" :html="cap + cap2" />
    </div>
    <PaymentText class="price" tag="p" type="h2b" :html="price" />
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
export default {
  name: "PaymentPrice",
  components: {
    PaymentText,
  },
  props: {
    symbol: {
      type: String,
      default: "USDT",
    },
    cap: {
      type: String,
      default: "",
    },
    cap2: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "0",
    },
    status: {
      type: String,
      default: "success",
    },
  },
  data() {
    return {
      capColor: {
        success: "green",
        error: "red",
      },
    };
  },
  filters: {},
  computed: {
    classes() {
      let array = { priceBox: true };
      array[this.type] = true;
      return array;
    },
    setCapColor() {
      return this.capColor[this.status];
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
.priceBox {
  // background-color: var(--color_bg_parts);
  border: 1px solid var(--Border);
  padding: 1.5rem;
  border-radius: 1rem;
  .head {
    @include flex(space-between, center);
    margin-bottom: 1rem;
  }
  .price {
    text-align: right;
  }
}
</style>
