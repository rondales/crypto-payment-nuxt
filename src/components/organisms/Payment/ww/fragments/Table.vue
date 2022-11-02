<template>
  <div :class="classes">
    <ul>
      <li v-for="(v, index) in table" :key="index">
        <dl v-if="v.title">
          <dt><span v-html="v.title"></span></dt>
          <dd>
            <span v-html="v.price"></span>
            <span class="cap" v-html="v.text"></span>
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PaymentTable',
  components: {},
  props: {
    table: {
      type: Array
    }
  },
  data() {
    return {}
  },
  filters: {},
  computed: {
    classes() {
      let array = { table: true }
      // array[this.type] = true;
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
.table {
  li {
    & + li {
      margin-top: 0rem;
    }
  }
  dl {
    @include flex(space-between, center);
    flex-wrap: nowrap;
    color: var(--Text);
    @include font(0.8rem, 400, $ls, 1, $en_go);
  }
  dd {
    display: inline-flex;
    align-items: flex-end;
    color: var(--Text);
    @include font(0.8rem, 400, $ls, 1, $en_go);
    * + * {
      margin-left: 0.3rem;
    }
    .cap {
      display: block;
      @include font(0.8rem, 400, 0.04em, 1.8, $en_go);
    }
  }
}
</style>
