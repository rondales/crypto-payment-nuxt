<template>
  <div>
    <div class="payhead">
      <PaymentTitle type="h2_g" html="INVOICE" />
      <div>
        <PaymentButton
          :icon="invoiceIcon.icon"
          @click.native="handle_function_call(invoiceIcon.func)"
          size="icon"
          color="icon"
        />
      </div>
    </div>
  </div>
</template>


<script>
import PaymentTitle from "@/components/organisms/Payment/Title";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "PaymentTop",
  components: {
    PaymentTitle,
    PaymentButton,
  },
  data() {
    return {
      invoiceIcon: {
        icon: "",
        func: "",
      },
    };
  },
  watch: {
    $route(route) {
      this.setIconData(route.name)
    },
  },
  methods: {
    copyLink() {
      this.$emit("copyLink");
    },
    prevPage() {
      this.$router.back();
    },
    handle_function_call(function_name) {
      if (function_name == "prevPage") {
        this.prevPage();
      } else if (function_name == "copyLink") {
        this.copyLink();
      }
    },
    setIconData(routeName) {
      this.invoiceIcon.icon = ""
      this.invoiceIcon.func = ""
      if (["token", "exchange", "detail"].includes(routeName)) {
        this.invoiceIcon.icon = "left-arrow";
        this.invoiceIcon.func = "prevPage";
      } else if (routeName === 'result') {
        this.invoiceIcon.icon = "link";
        this.invoiceIcon.func = "copyLink";
      }
    }
  },
  created() {
    this.setIconData(this.$route.name)
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.payhead {
  // margin-top: 3rem;
  @include flex(space-between, center);
  margin-bottom: 2rem;
  & > * {
    &:nth-child(2) {
      width: auto;
    }
    &:nth-child(1),
    &:nth-child(3) {
      width: 2.5rem;
      font-size: 0;
    }
  }
}
</style>
