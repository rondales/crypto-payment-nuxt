<template>
  <div :class="classes">
    <div class="transaction__icon">
      <PaymentIcon :class="iconClasses" :path="imgArr[type]" />
    </div>
    <div class="transaction__textwrap">
      <p class="title"><span v-html="title"></span></p>
      <p v-if="text" class="text non-translate"><span v-html="text"></span></p>
      <p v-if="cap" class="cap"><span v-html="cap"></span></p>
      <PaymentButton
        v-if="explorerUrl"
        class="button non-translate"
        size="s"
        color="primary"
        icon="outerlink"
        text="View on explorer"
        :url="explorerUrl"
        target="_blank"
        layout="reverse"
      />
    </div>
  </div>
</template>

<script>
import PaymentIcon from '@/components/organisms/Payment/Icon'
import PaymentButton from '@/components/organisms/Payment/Button'
export default {
  name: 'PaymentTransaction',
  components: {
    PaymentButton,
    PaymentIcon
  },
  props: {
    type: {
      type: String,
      default: 'loading'
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    cap: {
      type: String,
      default: ''
    },
    explorerUrl: {
      type: String,
      default: ''
    },
    link: {
      type: Object,
      default: () => {
        return {
          color: '',
          title: '',
          url: ''
        }
      }
    }
  },
  data() {
    return {
      imgArr: {
        loading: 'loading',
        dismiss: 'dismiss',
        success: 'check'
      }
    }
  },
  filters: {},
  computed: {
    classes() {
      let array = { transaction: true }
      array[this.type] = true

      return array
    },
    iconClasses() {
      let array = { icon: true }
      if (this.type == 'loading') {
        array['spin'] = true
      }
      return array
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.transaction {
  // margin-top: 2rem;
  // margin-bottom: 2rem;
  &.success {
    &::v-deep {
      svg {
        fill: var(--Success);
      }
    }
  }
  &.dismiss {
    &::v-deep {
      svg {
        fill: var(--Alert);
      }
    }
  }
  &__icon {
    max-width: 5rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
  }
  &__textwrap {
    text-align: center;
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
    .title {
      margin-bottom: 0.5rem;
      @include font(1.2rem, 600, $ls, $lh, $en_go);
      color: var(--Text);
    }
    .text {
      margin-bottom: 0.5rem;
      @include font(0.8rem, 400, $ls, $lh, $en_go);
      color: var(--Text);
    }
    .cap {
      @include font(10px, 400, 0.04em, 1.8, $en_go);
      color: var(--Text);
    }
    .button {
      margin-left: auto;
      margin-right: auto;
      margin-top: 1rem;
    }
  }
  &__foot {
    margin-top: 1rem;
    & > * + * {
      margin-top: 1rem;
    }
  }
}
</style>
