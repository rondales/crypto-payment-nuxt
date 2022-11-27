<template>
  <div :class="classes">
    <div class="token__icon">
      <PaymentIcon class="tokenicon" :path="icon" :type="iconType" />
      <PaymentIcon
        class="networkicon"
        v-if="networkIcon"
        :path="networkIcon"
        :type="iconType"
      />
    </div>
    <div class="token__textwrap">
      <p class="title"><span v-html="title"></span></p>
      <p class="symbol non-translate"><span v-html="symbol"></span></p>
      <p class="symboltext non-translate"><span v-html="symboltext"></span></p>
    </div>
  </div>
</template>
<script>
import PaymentIcon from '@/components/organisms/Payment/Icon'
export default {
  name: 'PaymentToken',
  components: {
    PaymentIcon
  },
  props: {
    icon: {
      type: String,
      default: 'usdt'
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
    size: {
      type: String,
      default: ''
    },
    networkIcon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  filters: {},
  computed: {
    classes() {
      let array = { token: true }
      array[this.size] = true
      return array
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

.token {
  @include flex(flex-start, center);
  width: auto;
  &.s {
    .token {
      &__icon {
        margin-right: 0.5rem;
        .tokenicon {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
  &__icon {
    position: relative;
    margin-right: 1rem;
    .tokenicon {
      width: 2rem;
      height: 2rem;
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
    .networkicon {
      position: absolute;
      width: 1.2rem;
      height: 1.2rem;
      bottom: -0.3rem;
      right: -0.3rem;
      border-radius: 100%;
    }
  }
  &__textwrap {
    &::v-deep {
      p {
        line-height: 1;
      }
    }
    * + * {
      margin-top: 0.3rem;
    }
    .title {
      @include font(10px, 400, $ls, 1, $en_go);
    }
    .symbol {
      @include font(1rem, 600, $ls, 1, $en_go);
      @include media(sp) {
        @include media(sp) {
          font-size: 1.2rem;
        }
      }
    }
    .symboltext {
      @include font(10px, 400, $ls, 1, $en_go);
    }
  }
}
</style>
