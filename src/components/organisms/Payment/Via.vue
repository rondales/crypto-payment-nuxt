<template>
  <div :class="classes">
    <PaymentText tag="p" type="cap" :html="'via ' + text" />
    <PaymentIcon v-if="icon" class="icon" path="logo-icon" />
  </div>
</template>

<script>
import PaymentText from '@/components/organisms/Payment/Text'
import PaymentIcon from '@/components/organisms/Payment/Icon'
export default {
  name: 'PaymentPrice',
  components: {
    PaymentText,
    PaymentIcon
  },
  props: {
    type: {
      type: String,
      default: 'span'
    },
    text: {
      type: String,
      default: 'Slash Payment'
    },
    icon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  filters: {},
  computed: {
    classes() {
      let array = { via: true }
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
.via {
  @include flex(center, center);
  .icon {
    width: 1.5rem;
    margin-left: 0.5rem;
  }
}
</style>
