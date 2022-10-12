<template>
  <div :class="classes" @click="copy(copytext)">
    <div class="url">
      <PaymentText type="cap" :html="copytext" />
    </div>
    <PaymentButton icon="copy" size="icon" color="icon" />
    <!-- TODO copiedの文字の出し方を確認したい -->
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "PaymentTitle",
  components: {
    PaymentText,
    PaymentButton,
  },
  props: {
    copytext: {
      type: String,
    },
  },
  data() {
    return {};
  },
  filters: {},
  computed: {
    classes() {
      let array = { copy: true };
      // array[this.type] = true;
      return array;
    },
  },
  methods: {
    copy(value) {
      this.$store.dispatch("account/copied");
      this.$clipboard(value);
    },
  },
  created() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.copy {
  @include flex(space-between, center);
  flex-wrap: nowrap;
  padding: 1rem;
  background-color: var(--Base2);
  border-radius: 0.5rem;
  cursor: pointer;
  .url {
    width: calc(100% - 3rem);
    overflow-wrap: break-word;
  }
}
</style>
