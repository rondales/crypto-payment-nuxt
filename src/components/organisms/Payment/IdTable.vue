<template>
  <div :class="classes">
    <PaymentIcon class="icon" path="logo-icon" />
    <div class="table">
      <dl v-for="(item, index) in table" :key="index">
        <dt><PaymentText type="cap" :html="item.title" /></dt>
        <dd>
          <PaymentText type="cap" :html="item.text" />
          <!-- TODO Payeeの時表示するか確認？ -->
          <!-- <img v-if="isVerifiedDomain" :src="domainVerifiedIcon" /> -->
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import PaymentIcon from "@/components/organisms/Payment/Icon";
import PaymentText from "@/components/organisms/Payment/Text";
export default {
  name: "PaymentIdTable",
  components: {
    PaymentIcon,
    PaymentText,
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
      let array = { ids: true };
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
.ids {
  @include flex(space-between, center);
  .icon {
    width: 5rem;
    margin-right: 2rem;
  }
  .table {
  }
  dl {
    font-size: 0;
    // @include flex(flex-end, center);
    @include flex(flex-start, center);
    & + dl {
      margin-top: 3px;
    }
  }
  dt,
  dd {
    font-size: 0;
    white-space: nowrap;
  }
  dt {
    width: 5rem;
    &::v-deep {
      span {
        color: var(--SubText);
      }
    }
  }
  dd {
    // width: 10rem;
    width: auto;
  }
}
</style>
