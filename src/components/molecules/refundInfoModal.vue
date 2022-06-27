<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Refunded information
      </h3>
      <p class="header__desc">
        Slippage collections were refunded.
        <br>
        Refund information is below.
        <br>
        <span class="notice">*&nbsp;Tokens are refunded in merchant's receive token.</span>
      </p>
    </div>
    <div class="body add-flex j-between">
      <div v-if="cashBackAmount != '0'" class="refund-item mt-2 mb-3">
          <h3>Cashback amount</h3>
          <p>{{ cashBackAmount }}&nbsp;{{ refundedTokenSymbol }}</p>
        </div>
        <div v-if="refundedTokenAmount" class="refund-item mt-2 mb-3">
          <h3>Token refunded amount</h3>
          <p>{{ refundedTokenAmount }}&nbsp;{{ refundedTokenSymbol }}</p>
        </div>
        <div v-if="refundedFeeAmount" class="refund-item">
          <h3>Fee refunded amount</h3>
          <p>{{ refundedFeeAmount }}&nbsp;{{ refundedFeeSymbol }}</p>
        </div>
    </div>
    <button class="close" @click="hideModal">
      <img v-if="$store.state.theme == 'dark'" src="@/assets/images/cross.svg">
      <img v-if="$store.state.theme == 'light'" src="@/assets/images/cross-l.svg">
      close
    </button>
  </div>
</template>

<script>

export default {
  name: 'networkModal',
  data() {
    return {
      networks: []
    };
  },
  computed: {
    classes() {
      const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
      return classes
    },
    refundedTokenAmount() {
      return this.$store.state.modal.params.refundedTokenAmount
    },
    refundedTokenSymbol() {
      return this.$store.state.modal.params.refundedTokenSymbol
    },
    refundedFeeAmount() {
      return this.$store.state.modal.params.refundedFeeAmount
    },
    refundedFeeSymbol() {
      return this.$store.state.modal.params.refundedFeeSymbol
    },
    cashBackAmount() {
      return this.$store.state.modal.params.cashBackAmount
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch('modal/hide')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

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
    background:var(--color_bg);
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
    @include media(pc) {
      padding: 12px;
      &__title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      &__desc {
        font-size: 1.7rem;
        .notice{
          font-weight: 100;
          font-size: 1.4rem;
        }
      }
    }
    @include media(sp) {
      padding: 18px;
      &__title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      &__desc {
        font-size: 1.5rem;
        .notice{
          font-weight: 100;
          font-size: 1.2rem;
        }
      }
    }
    &__title {
      font-weight: 500;
    }
    &__desc {
      font-weight: 100;
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
    @include media(pc) {
      padding: 5px 24px 40px;
      font-size: 1.5rem;
    }
    @include media(sp) {
      padding: 12px 12px 48px;
      flex-wrap: wrap;
      font-size: 1.5rem;
    }
    .refund-item{
      width: 100%;
      h3 {
        font-weight: 500;
        font-size: 1.7rem;
      }
      p {
        font-weight: 200;
        margin-right: 30px;
        text-align: right;
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