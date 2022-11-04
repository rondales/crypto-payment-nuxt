<template>
  <div :class="classes">
    <PaymentIcon v-if="icon" class="icon" :path="icon" :type="iconType" />
    <div class="textwrap">
      <p v-if="text" class="text"><span v-html="text"></span></p>
      <PaymentButton v-if="url" size="icon" icon="outerlink" :url="link" />
    </div>
    <slot />
  </div>
</template>

<script>
import PaymentIcon from '@/components/organisms/Payment/ww/fragments/Icon'
import PaymentButton from '@/components/organisms/Payment/ww/fragments/Button'
export default {
  name: 'PaymentTitle',
  components: {
    PaymentIcon,
    PaymentButton
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    iconType: {
      type: String,
      default: 'svg'
    },
    text: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    type: {
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
      let array = { action: true }
      array[this.type] = true
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
.action {
  @include flex(space-between, center);
  &.network {
    .icon {
      width: 2.5rem;
    }
    .text {
      flex: 1;
      @include font(1rem, 400, 0.04em, 1.8, $en_go);
    }
  }
  .textwrap {
    flex: 1;
  }
  .icon {
    width: 1.3rem;
    font-size: 0;
    @include media(sp) {
      width: 1.5rem;
    }
  }
  .text {
    flex: 1;
    padding: 0 0.5rem;
    color: var(--Text);
    @include font(0.8rem, 400, 0.04em, 1.8, $en_go);
    @include media(sp) {
      font-size: 1rem;
    }
  }
}
</style>
