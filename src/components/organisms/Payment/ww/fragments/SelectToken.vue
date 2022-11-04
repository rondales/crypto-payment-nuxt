<template>
  <div :class="classes">
    <PaymentText
      class="title"
      tag="h3"
      type="h4b"
      html="Enter token contract address"
    />
    <PaymentText
      tag="p"
      type="cap"
      html="*Does not support tokenomics tokens, which have the property that transactions are subject to TAX 🙅‍♂️"
    />
    <PaymentForm>
      <slot />
    </PaymentForm>

    <div class="foot">
      <PaymentText tag="h3" type="h5" html="0 Custom Token" />
      <PaymentButton
        @click="clearSearchedTokens()"
        size="s"
        color="cancel"
        text="Crear All"
      />
    </div>
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/ww/fragments/Text";
import PaymentButton from "@/components/organisms/Payment/ww/fragments/Button";
import PaymentForm from "@/components/organisms/Payment/ww/fragments/Form";
export default {
  name: "PaymentSelectToken",
  components: {
    PaymentText,
    PaymentButton,
    PaymentForm,
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
      let array = { tokens: true };
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
.tokens {
  .title {
    margin-bottom: 0.5rem;
  }
  .form {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .foot {
    margin-top: 2rem;
    @include flex(space-between, center);
  }
}
</style>
