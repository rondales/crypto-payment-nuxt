<template>
  <div :class="classes">
    <!-- <LogoIcon class="icon" /> -->
    <PaymentIcon class="icon" path="logo-icon" />
    <div class="table">
      <dl v-for="(item, index) in table" :key="index">
        <dt>
          <PaymentText type="cap" :html="item.title" :non-translate="true" />
        </dt>
        <dd>
          <PaymentText type="cap" :html="item.text" :non-translate="true" />
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
import PaymentText from '@/components/organisms/Payment/Text'
// import LogoIcon from '@/components/common/LogoIcon'
export default {
  name: 'PaymentIdTable',
  components: {
    // LogoIcon,
    PaymentIcon,
    PaymentText
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
  .icon {
    width: 5rem;
    margin-right: 2rem;
  }
  .table {
  }
  dl {
    font-size: 0;
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
