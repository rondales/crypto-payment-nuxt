<template>
  <div :class="classes">
    <!-- <LogoIcon class="icon" /> -->
    <PaymentIcon class="icon" path="logo-icon" />
    <div class="table">
      <dl v-for="(item, index) in table" :key="index">
        <dt>
          <span v-html="item.title" :non-translate="true"></span>
        </dt>
        <dd>
          <span v-html="item.text" :non-translate="true"></span>
          {{ item.verified }}
          <PaymentIcon
            v-if="item.verified"
            class="verified"
            path="domain-verified"
          />
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import PaymentIcon from '@/components/organisms/Payment/Icon'
// import PaymentText from '@/components/organisms/Payment/Text'
// import LogoIcon from '@/components/common/LogoIcon'
export default {
  name: 'PaymentIdTable',
  components: {
    // LogoIcon,
    PaymentIcon
    // PaymentText
  },
  props: {
    table: {
      type: Array
    },
    isVerifiedDomain: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  filters: {},
  computed: {
    classes() {
      let array = { ids: true }
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
.ids {
  @include flex(space-between, center);
  gap: 3px;
  .icon {
    width: 3rem;
  }
  .table {
  }
  dl {
    font-size: 0;
    @include flex(flex-start, center);
  }
  dt,
  dd {
    white-space: nowrap;
    color: var(--Text);
    @include font(10px, 400, 0.08em, 1.8, $en_go);
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
    display: inline-flex;
    align-items: center;
    .verified {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      margin-left: 0.5rem;
      // svg {
      //   fill: var(--Text);
      // }
      // &::v-deep {
      //   svg {
      //     fill: var(--Text);
      //   }
      // }
    }
  }
}
</style>
