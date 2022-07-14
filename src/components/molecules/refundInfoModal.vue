<template>
  <div :class="classes">
    <div class="header">
      <PaymentText
        class="header__title"
        tag="h3"
        type="modalTitle"
        html="Refunded information"
      />
      <PaymentText
        tag="p"
        html="Slippage collections were refunded.<br />Refund information is below."
      />
      <PaymentText
        class="cap"
        tag="p"
        type="cap"
        html=" *&nbsp;Tokens are refunded in merchant's receive token."
      />
    </div>
    <div class="body add-flex j-between">
      <div v-if="cashBackAmount != '0'" class="refund-item mt-2 mb-3">
        <PaymentText tag="h3" type="subtitle" html="Cashback amount" />
        <p>{{ cashBackAmount }}&nbsp;{{ refundedTokenSymbol }}</p>
      </div>
      <div v-if="refundedTokenAmount" class="refund-item mb-3">
        <PaymentText tag="h3" type="p" html="Token refunded amount" />
        <p class="pricewrap">
          <PaymentText class="price" type="price" :html="refundedTokenAmount" />
          <PaymentText
            class="symbol"
            type="symbol"
            :html="refundedTokenSymbol"
          />
        </p>
      </div>
      <div v-if="refundedFeeAmount" class="refund-item">
        <PaymentText tag="h3" type="p" html="Fee refunded amount" />
        <p class="pricewrap">
          <PaymentText class="price" type="price" :html="refundedFeeAmount" />
          <PaymentText class="symbol" type="symbol" :html="refundedFeeSymbol" />
        </p>
      </div>
    </div>
    <button class="close" @click="hideModal">
      <img
        v-if="$store.state.theme == 'dark'"
        src="@/assets/images/cross.svg"
      />
      <img
        v-if="$store.state.theme == 'light'"
        src="@/assets/images/cross-l.svg"
      />
      close
    </button>
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
// import Payment from "../../pages/payment.vue";
export default {
  name: "networkModal",
  data() {
    return {
      networks: [],
    };
  },
  components: { PaymentText },
  computed: {
    classes() {
      const classes = ["modal-box", `--${this.$store.state.modal.size}`];
      return classes;
    },
    params() {
      return this.$store.state.modal.params;
    },
    refundedTokenAmount() {
      return this.params.refundedTokenAmount;
    },
    refundedTokenSymbol() {
      return this.params.refundedTokenSymbol;
    },
    refundedFeeAmount() {
      return this.params.refundedFeeAmount;
    },
    refundedFeeSymbol() {
      return this.params.refundedFeeSymbol;
    },
    cashBackAmount() {
      return this.params.cashBackAmount;
    },
  },
  methods: {
    hideModal() {
      this.$store.dispatch("modal/hide");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

@include media(pc) {
  .btn:nth-child(n + 3) {
    margin-top: 25px;
  }
}
@include media(sp) {
  .btn:not(:last-child) {
    margin-bottom: 16px;
  }
}

.modal-box {
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color_bg);
  padding: 24px;
  @include media(pc) {
    &.--small {
      width: 470px;
    }
    &.--medium {
      width: 760px;
    }
  }
  @include media(sp) {
    width: calc(100vw - 32px);
  }
}
.header {
  margin-bottom: 2rem;
  @include media(sp) {
    margin-bottom: 1rem;
  }
  &__title {
    margin-bottom: 2rem;
    @include media(sp) {
      margin-bottom: 1rem;
    }
  }
  .cap {
    margin-top: 0.5rem;
  }
}
.close {
  position: absolute;
  width: 16px;
  height: 16px;
  font-size: 0;

  @include media(pc) {
    top: 30px;
    right: 24px;
  }
  @include media(sp) {
    top: 24px;
    right: 24px;
  }
}
.body {
  // @include media(pc) {
  //   padding: 5px 24px 40px;
  //   font-size: 1.5rem;
  // }
  // @include media(sp) {
  //   padding: 12px 12px 48px;
  //   flex-wrap: wrap;
  //   font-size: 1.5rem;
  // }
  .refund-item {
    width: 100%;
    h3 {
      // font-weight: 500;
      // font-size: 1.7rem;
      margin-bottom: 4px;
    }
    p {
      // font-weight: 200;
      // margin-right: 30px;
      text-align: right;
      .price {
        display: inline-block;
      }
      .symbol {
        display: inline-block;
        margin-left: 1rem;
      }
    }
    .pricewrap {
      background-color: var(--color_bg_modal);
      padding: 3px 6px;
    }
  }
}
.footer {
  text-align: center;

  @include media(pc) {
    padding: 0 40px 40px;
  }
  @include media(sp) {
    padding: 0 32px 32px;
  }
}
</style>
