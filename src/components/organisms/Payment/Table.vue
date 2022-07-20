<template>
  <div :class="classes">
    <!-- <PaymentIcon path="logo-icon" /> -->
    <dl>
      <dt><PaymentText html="Minimum received" /></dt>
      <dd><PaymentText html="1,000 USDT" /></dd>
    </dl>
    <dl>
      <dt><PaymentText html="Minimum received" /></dt>
      <dd>
        <PaymentText type="h4b" html="1,000" />
        <PaymentText html="USDT" />
      </dd>
    </dl>
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
    type: {
      type: String,
      default: "span",
    },
  },
  data() {
    return {};
  },
  filters: {},
  computed: {
    classes() {
      let array = { table: true };
      array[this.type] = true;
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
  dl {
    @include flex(space-between, center);
    flex-wrap: nowrap;
    & + dl {
      margin-top: 1.2rem;
    }
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
