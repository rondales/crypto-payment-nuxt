<template>
  <div :class="classes">
    <div class="left">
      <PaymentToken
        :icon="icon"
        :icon-type="iconType"
        :title="title"
        :symbol="symbol"
        :symboltext="symboltext"
        :size="tokenSize"
      />
    </div>
    <div class="right">
      <div v-if="table" class="balance">
        <dl class="non-translate" v-for="(dl, index) in table" :key="index">
          <dt><span v-html="dl.title"></span></dt>
          <dd>
            <span class="balance_price" v-html="dl.price"></span>
            <span class="balance_symbol" v-html="dl.symbol"></span>
          </dd>
        </dl>
      </div>
      <p v-else class="price"><span v-html="price"></span></p>
    </div>
  </div>
</template>

<script>
import PaymentToken from '@/components/organisms/Payment/ww/fragments/Token'
export default {
  name: 'PaymentAmountBilled',
  components: {
    PaymentToken
  },
  props: {
    icon: {
      type: String,
      default: require('@/assets/images/usdt.png')
    },
    iconType: {
      type: String,
      default: 'svg'
    },
    symbol: {
      type: String,
      default: 'USDT'
    },
    title: {
      type: String,
      default: ''
    },
    symboltext: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      default: 1
    },
    priceClass: {
      type: Object
    },
    table: {
      type: Array
    },
    size: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      priceSize: 'h3b',
      tokenSize: 'm'
    }
  },
  filters: {},
  computed: {
    classes() {
      let array = { billed: true }
      array[this.size] = true
      if (this.table) {
        array['table'] = true
      }
      return array
    }
  },
  methods: {},
  created() {
    if (this.size == 'big') {
      this.priceSize = 'h0'
      this.tokenSize = 's'
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.billed {
  // margin: 1.5rem 0 1rem;
  @include flex(space-between, center);
  flex-wrap: no-wrap;
  background-color: var(--Base2);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  @include media(sp) {
    padding: 0.8rem 1rem;
  }
  &.table {
    @include flex(space-between, flex-start);
    padding: 0rem;
    background-color: transparent;
  }
  &.bg {
    background: $gradation-pale;
    cursor: pointer;
  }
  &.big {
    @include flex(center, center);
    flex-direction: column;
    padding: 0.8rem 1rem 1rem;
    // width: calc(100% + 3rem);
    // margin-left: -1.5rem;
    // @include media(sp) {
    //   width: calc(100% + 5vw);
    //   margin-left: 5vw;
    // }
    &::before {
      content: 'Amout of money';
      @include font(10px, 500, 0.04em, 1.8, $en_go);
      color: var(--SubText);
      width: 100%;
      text-align: center;
    }
    .price {
      @include font(1.728rem, 600, $ls, 1, $en_go);
      margin-top: 1rem;
      @include media(sp) {
        @include font(2.074rem, 600, $ls, 1, $en_go);
      }
    }
  }
  .price {
    text-align: right;
    @include font(1.2rem, 600, $ls, 1, $en_go);
    color: var(--Text);
    @include media(sp) {
      font-size: 1.44rem;
    }
    &::v-deep {
      span {
        line-height: 1;
      }
    }
  }
  .balance {
    dl {
      @include flex(space-between, flex-end);
      gap: 1rem;
      // width: 12rem;
      flex-wrap: nowrap;
      &::v-deep {
        span {
          line-height: 1;
        }
      }
      & + dl {
        margin-top: 0.5rem;
      }
    }
    dt {
      opacity: 0.6;
      @include font(0.8rem, 400, $ls, 1, $en_go);
    }
    dd {
      display: inline-flex;
      align-items: flex-end;
      gap: 0.2rem;
    }
    &_price {
      color: var(--Text);
      @include font(1rem, 500, $ls, 1, $en_go);
    }
    &_symbol {
      color: var(--Text);
      @include font(0.8rem, 400, $ls, 1, $en_go);
    }
  }
}
</style>
