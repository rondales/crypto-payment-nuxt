<template>
  <div :class="classes">
    <label :for="id">
      <input
        :id="id"
        type="checkbox"
        ref="checkbox"
        v-model="checkbox"
        @change="clickCheckbox()"
      />
      <span v-html="text"></span>
    </label>
  </div>
</template>

<script>
// import PaymentText from '@/components/organisms/Payment/Text'
export default {
  name: 'PaymentConfirmCheckbox',
  components: {
    // PaymentText
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checkbox: ''
    }
  },
  filters: {},
  computed: {
    classes() {
      let array = { confirmCheckbox: true }
      // array[this.type] = true;
      return array
    }
  },
  methods: {
    clickCheckbox() {
      this.$emit('clickCheckbox', this.$refs.checkbox.checked)
    }
  },
  created() {},
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.confirmCheckbox {
  label {
    display: block;
    margin-top: 1rem;
    padding: 1rem;
    cursor: pointer;
    background-color: var(--Base2);
    border-radius: 4px;
    @include font(0.8rem, 400, $ls, 1.2rem, $en_go);
    @include media(sp) {
      padding: 1rem;
    }
    input {
      display: none;
      & + * {
        position: relative;
        display: block;
        padding-left: 2rem;
        // @include media(sp) {
        //   padding-left: 2rem;
        // }
        &::before {
          content: '';
          display: block;
          width: 1rem;
          height: 1rem;
          border: 2px solid var(--Text);
          position: absolute;
          left: 0;
          top: 0.1rem;
          @include media(sp) {
            // width: 14px;
            // height: 14px;
            // top: 0;
          }
        }
      }
      &:checked {
        & + * {
          &::before {
            background-color: var(--Text);
            // background-color: var(--Success);
          }
          &::after {
            content: '';
            display: block;
            width: 0.8rem;
            height: 0.4rem;
            border-left: 3px solid var(--Success);
            border-bottom: 3px solid var(--Success);
            // border-left: 3px solid var(--Text);
            // border-bottom: 3px solid var(--Text);
            transform-origin: center center;
            transform: rotate(-45deg);
            position: absolute;
            left: 0.1rem;
            top: 6px;
            @include media(sp) {
              top: 4px;
              border-left: 2px solid var(--Success);
              border-bottom: 2px solid var(--Success);
            }
          }
        }
      }
    }
  }
}
</style>
