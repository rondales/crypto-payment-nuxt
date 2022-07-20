<template>
  <div :class="classes">
    <div class="head">
      <ul>
        <li :class="{ active: !status }">
          <button @click="toList">
            <PaymentText type="h4b" html="Lists" />
          </button>
        </li>
        <li :class="{ active: status }">
          <button @click="toToken">
            <PaymentText type="h4b" html="Tokens" />
          </button>
        </li>
      </ul>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
export default {
  name: "PaymentTitle",
  components: {
    PaymentText,
  },
  props: {
    status: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  filters: {},
  computed: {
    classes() {
      let array = { tab: true };
      // array[this.type] = true;
      return array;
    },
  },
  methods: {
    toList() {
      this.$emit("changeToList");
    },
    toToken() {
      this.$emit("changeToToken");
    },
  },
  created() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.tab {
  .head {
    // background-color: var(--color_bg_parts);

    ul {
      @include flex(flex-start, flex-start);
    }

    li {
      flex: 1;
      // padding: 0.5rem;
      border-radius: 0.5rem 0.5rem 0 0;
      &.active {
        background-color: var(--Base2);
        // button {
        //   background: $gradation-pale;
        // }
      }

      transition: background-color 200ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      @include media(pc) {
        &:hover {
          background-color: var(--Base3);
        }
      }
    }
    button {
      text-align: center;
      display: block;
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }
  .body {
    background-color: var(--Base2);
    padding: 2rem;
    border-radius: 0 0 0.5rem 0.5rem;
    @include media(sp) {
      padding: 1.5rem 1rem;
    }
  }
}
</style>
