<template>
  <div :class="classes">
    <div class="form__wrap">
      <slot />
    </div>
    <span v-if="error" class="error" v-html="error"></span>
  </div>
</template>

<script>
export default {
  name: 'PaymentTitle',
  components: {},
  props: {
    error: {
      type: String
    }
  },
  data() {
    return {}
  },
  filters: {},
  computed: {
    classes() {
      let array = { form: true }
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
.form {
  $formh: 2rem;
  &__wrap {
    border: 1px solid var(--Border);
    border-radius: 6px;
    @include flex(flex-start, center);
    flex-wrap: nowrap;
    padding: 0.5rem 1rem;
    &::v-deep {
      input {
        @include font(1rem, 600, $ls, $formh, $en_go);
        padding: 0rem 0.5rem;
        display: block;
        flex: 1;
      }
      select {
        appearance: none;
        text-align: center;
        padding: 0rem 0.5rem;
        @include font(1rem, 600, $ls, $formh, $en_go);
      }
    }
  }
  .error {
    margin-top: 0.5rem;
    color: var(--Alert);
    @include font(10px, 400, 0.04em, 1.8, $en_go);
  }
}
</style>
