<template>
  <div :class="classes">
    <div class="head">
      <p class="symbol"><span v-html="symbol"></span></p>
      <p class="cap" :class="setCapColor"><span v-html="cap + cap2"></span></p>
    </div>
    <p class="price"><span v-html="price"></span></p>
  </div>
</template>

<script>
export default {
  name: 'PaymentPrice',
  components: {},
  props: {
    symbol: {
      type: String,
      default: 'USDT'
    },
    cap: {
      type: [String, Number],
      default: ''
    },
    cap2: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      default: '0'
    },
    status: {
      type: String,
      default: 'success'
    }
  },
  data() {
    return {
      capColor: {
        success: 'green',
        error: 'red'
      }
    }
  },
  filters: {},
  computed: {
    classes() {
      let array = { priceBox: true }
      array[this.type] = true
      return array
    },
    setCapColor() {
      return this.capColor[this.status]
    }
  },
  methods: {},
  created() {},
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.priceBox {
  border: 1px solid var(--Border);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  .head {
    @include flex(space-between, center);
    margin-bottom: 0.5rem;
  }
  .symbol {
    @include font(1.2rem, 600, $ls, $lh, $en_go);
    color: var(--Text);
  }
  .cap {
    @include font(0.8rem, 400, 0.04em, 1.8, $en_go);
    color: var(--Text);
    &.red {
      color: var(--Alert);
    }
    &.green {
      color: var(--Success);
    }
  }
  .price {
    text-align: right;
    @include font(1.44rem, 600, $ls, $lh, $en_go);
    color: var(--Text);
  }
}
</style>
