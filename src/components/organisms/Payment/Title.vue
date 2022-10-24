<template>
  <div :class="classes">
    <PaymentText
      :tag="title[type]['tag']"
      :color="title[type]['color']"
      :type="title[type]['type']"
      :html="html"
    />
    <span v-if="emoji" class="emoji" v-html="emoji"></span>
    <PaymentIcon v-if="icon" class="icon" :path="icon" />
    <slot v-if="this.$slots" />
  </div>
</template>

<script>
import PaymentText from '@/components/organisms/Payment/Text'
import PaymentIcon from '@/components/organisms/Payment/Icon'
export default {
  name: 'PaymentTitle',
  components: {
    PaymentText,
    PaymentIcon
  },
  props: {
    type: {
      type: String,
      default: 'span'
    },

    html: {
      type: [String, Number]
    },

    emoji: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    layout: {
      type: String,
      default: 's'
    },
    tag: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      title: {
        h2_g: {
          color: 'g',
          tag: 'h2',
          type: 'h2b'
        },
        h2: {
          color: '',
          tag: 'h2',
          type: 'h3b'
        },
        h3_g: {
          color: 'g',
          tag: 'h3',
          type: 'h3b'
        },
        h3: {
          color: '',
          tag: 'h3',
          type: 'h4b'
        },
        h4: {
          color: '',
          tag: 'h4',
          type: 'h4b'
        },
        h4_g: {
          color: 'g',
          tag: 'h4',
          type: 'h4b'
        }
      }
    }
  },
  filters: {},
  computed: {
    classes() {
      // return "text__" + this.type;
      let array = { title: true }
      array[this.type] = true
      array['layout_' + this.layout] = true
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
.title {
  @include flex(space-between, center);
  // margin-bottom: 2rem;
  .emoji {
    margin-left: 0.3rem;
  }
  .icon {
    width: 2rem;
  }

  &.h3_g {
    .button {
      &::v-deep {
        .button.size_icon {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
  &.layout {
    &_c {
      @include flex(center, center);
    }
    &_modalTitle {
      @include flex(flex-end, center);
      flex-direction: row-reverse;
      .emoji {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
