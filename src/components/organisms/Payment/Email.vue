<template>
  <div class="email d-payboxwrap">
    <PaymentTitle
      type="h2_g"
      html="Do you want a receipt?"
      emoji="&#x1F9FE;"
      layout="c"
      class="title"
    />
    <!-- <PaymentText type="p" html="Email address to receive receipt" /> -->
    <PaymentForm class="form">
      <input
        type="email"
        placeholder="Input email address to receive receipt"
        v-model="email"
      />
    </PaymentForm>
    <div class="d-btnwrap">
      <PaymentButton
        size="m"
        text="Yes required"
        @click.native="requireReceipt"
        :color="email != '' ? 'primary' : 'inactive'"
        :class="{ active: email }"
      />
      <PaymentButton
        size="m"
        color="cancel"
        text="Not required"
        @click.native="noRequireReceipt"
        :class="{ inactive: loading }"
      />
    </div>
  </div>
</template>

<script>
import PaymentTitle from "@/components/organisms/Payment/Title";
// import PaymentText from "@/components/organisms/Payment/Text";
import PaymentForm from "@/components/organisms/Payment/Form";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "PaymentEmail",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    PaymentTitle,
    // PaymentText,
    PaymentForm,
    PaymentButton,
  },
  data() {
    return {
      email: "",
    };
  },
  filters: {},
  computed: {
    classes() {
      let array = {};
      // array["text__" + this.type] = true;
      return array;
    },
  },
  methods: {
    requireReceipt() {
      this.$emit("requireReceipt");
    },
    noRequireReceipt() {
      this.$emit("noRequireReceipt");
    },
  },
  created() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.email {
  .title {
    margin-bottom: 2rem;
  }
  .form {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }
}
</style>
