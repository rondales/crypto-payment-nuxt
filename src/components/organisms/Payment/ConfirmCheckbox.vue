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
      <PaymentText type="p" :html="text" />
    </label>
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
export default {
  name: "PaymentConfirmCheckbox",
  components: {
    PaymentText,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      checkbox: "",
    };
  },
  filters: {},
  computed: {
    classes() {
      let array = { confirmCheckbox: true };
      // array[this.type] = true;
      return array;
    },
  },
  methods: {
    clickCheckbox() {
      this.$emit("clickCheckbox", this.$refs.checkbox.checked);
    },
  },
  created() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.confirmCheckbox {
  label {
    display: block;
    margin-top: 1rem;
    padding: 1rem;
    cursor: pointer;
    background-color: var(--Base2);
    border-radius: 4px;
    @include media(sp) {
      padding: 1rem;
    }
    input {
      display: none;
      & + * {
        position: relative;
        display: block;
        padding-left: 2rem;
        @include media(sp) {
          padding-left: 2.5rem;
        }
        &::before {
          content: "";
          display: block;
          width: 18px;
          height: 18px;
          border: 2px solid var(--Text);
          position: absolute;
          left: 0;
          top: 2px;
          @include media(sp) {
            width: 14px;
            height: 14px;
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
            content: "";
            display: block;
            width: 16px;
            height: 8px;
            border-left: 3px solid var(--Success);
            border-bottom: 3px solid var(--Success);
            // border-left: 3px solid var(--Text);
            // border-bottom: 3px solid var(--Text);
            transform-origin: center center;
            transform: rotate(-45deg);
            position: absolute;
            left: 1px;
            top: 5px;
            @include media(sp) {
              width: 12px;
              height: 6px;
            }
          }
        }
      }
    }
  }
}
</style>
