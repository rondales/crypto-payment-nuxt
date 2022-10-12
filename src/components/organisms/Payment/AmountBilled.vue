<template>
  <div class="d-payboxwrap">
    <div :class="classes">
      <!-- TODO style 最終調整 -->
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
          <dl v-for="(dl, index) in table" :key="index">
            <dt><PaymentText type="p" :html="dl.title" /></dt>
            <dd>
              <PaymentText type="h4b" :html="dl.price" />
              <PaymentText type="p" :html="dl.symbol" />
            </dd>
          </dl>
        </div>
        <PaymentText
          class="price"
          v-else
          tag="p"
          :type="priceSize"
          :html="price"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
// import PaymentIcon from "@m/components/organisms/Payment/Icon";
import PaymentToken from "@/components/organisms/Payment/Token";
export default {
  name: "PaymentAmountBilled",
  components: {
    // PaymentButton,
    PaymentText,
    // PaymentIcon,
    PaymentToken,
  },
  props: {
    icon: {
      type: String,
      default: require("@/assets/images/usdt.png"),
    },
    iconType: {
      type: String,
      default: "svg",
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
    price: {
      type: [String, Number],
      default: 1,
    },
    priceClass: {
      type: Object,
    },
    table: {
      type: Array,
    },
    size: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      priceSize: "h3b",
      tokenSize: "m",
    };
  },
  filters: {},
  computed: {
    classes() {
      let array = { billed: true };
      array[this.size] = true;
      if (this.table) {
        array["table"] = true;
      }
      return array;
    },
  },
  methods: {},
  created() {
    if (this.size == "big") {
      this.priceSize = "h0";
      this.tokenSize = "s";
    }
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.billed {
  // margin: 1.5rem 0 1rem;
  @include flex(space-between, center);
  flex-wrap: no-wrap;
  background-color: var(--Base2);
  // background: $gradation-pale;
  padding: 1rem;
  border-radius: 0.5rem;
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
    flex-direction: column-reverse;
    padding: 2.5rem 1rem 2rem;
    flex-direction: column;
    padding: 1.5rem 1rem;
    &::before {
      content: "Amout of money";
      @include font(0.8rem, 500, 0.04em, 1.8, $en_go);
      color: var(--SubText);
      width: 100%;
      text-align: center;
    }
    .price {
      margin-top: 0.5rem;
    }
  }
  .left {
  }

  .price {
    text-align: right;
    &::v-deep {
      span {
        line-height: 1;
      }
    }
  }
  .balance {
    dl {
      @include flex(flex-end, flex-end);
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
      margin-right: 0.3rem;
    }
    dd {
      display: inline-flex;
      align-items: flex-end;

      * + * {
        margin-left: 3px;
      }
    }
  }
  // figure {
  //   img {
  //     height: 46px;
  //     width: 46px;
  //     border-radius: 50%;
  //   }
  // }
}
</style>
