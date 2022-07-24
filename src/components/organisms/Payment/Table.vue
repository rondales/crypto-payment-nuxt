<template>
  <div :class="classes">
    <ul>
      <li v-for="(v, index) in table" :key="index">
        <dl v-if="v.title">
          <dt><PaymentText :html="v.title" /></dt>
          <dd>
            <PaymentText type="h4b" :html="v.price" />
            <PaymentText :html="v.text" />
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
// import PaymentIcon from "@/components/organisms/Payment/Icon";
export default {
  name: "PaymentTable",
  components: {
    PaymentText,
    // PaymentIcon,
  },
  props: {
    table: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  filters: {},
  computed: {
    classes() {
      let array = { table: true };
      // array[this.type] = true;
      return array;
    },
  },
  methods: {},
  created() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.table {
  margin-top: 2rem;
  margin-bottom: 2rem;
  &::v-deep {
    span {
      line-height: 1;
    }
  }
  li {
    & + li {
      margin-top: 1.2rem;
    }
  }
  dl {
    @include flex(space-between, center);
    flex-wrap: nowrap;
  }
  dd {
    display: inline-flex;
    align-items: flex-end;
    // @include flex(space-between, center);
    * + * {
      margin-left: 0.3rem;
    }
  }
}
</style>
