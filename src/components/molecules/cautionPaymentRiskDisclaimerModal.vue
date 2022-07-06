<template>
  <div :class="classes">
    <div class="header">
      <PaymentText
        class="header__title"
        tag="h3"
        type="modalTitle"
        html="Risk Disclaimer"
      />
      <PaymentText
        tag="p"
        html="Read the risk disclaimer carefully, and check the following options to acknowledge confirmation."
      />
    </div>
    <div class="body">
      <div v-if="isUnVerifiedDomain">
        <div class="riskBox">
          <PaymentText
            tag="p"
            html="Do you understand the purpose of this transaction and have you
          verified that there is no risk of fraud?"
          />
          <label for="confirm">
            <input
              id="confirm"
              type="checkbox"
              ref="confirmed"
              @click="updateConfirmedStatus()"
            />
            <PaymentText
              html="I understand the purpose of this transaction and have verified
              that there is no fear of fraud."
            />
          </label>
        </div>
        <div class="riskBox">
          <PaymentText
            tag="p"
            html="No refund of funds from us can be made if you are successful in this
          transaction. If there is a dispute with Payee, the parties will need
          to resolve it among themselves. Do you still want to continue with
          this transaction?"
          />
          <label for="accept">
            <input
              id="accept"
              type="checkbox"
              ref="accepted"
              @click="updateAcceptedStatus()"
            />
            <PaymentText
              html="I understand the risk and continue this transaction."
            />
          </label>
        </div>
      </div>
      <div class="riskBox">
        <PaymentText
          tag="p"
          html="Slash Web3 Payment temporarily retains information that uniquely
          identifies your terminal from the time you connect the wallet until
          the transaction is completed in order to provide secure payment, can
          you agree? <br /> By connecting your Wallet, you agree to our Privacy Policy."
        />
        <a
          target="_blank"
          href="https://slash-fi.gitbook.io/docs/support/data-protection-and-privacy-policy"
        >
          <PaymentText html="Learn more."
        /></a>
        <label for="agree">
          <input
            id="agree"
            type="checkbox"
            ref="agreed"
            @click="updateAgreedStatus()"
          />
          <PaymentText html="I understand and agree." />
        </label>
      </div>

      <div class="btn-container mt-3">
        <button
          class="btn __g __l non-translate"
          :class="{ inactive: !isAllAccepted }"
          @click="handleOk()"
        >
          OK
        </button>
        <button class="btn __g __l mt-1 non-translate" @click="handleCancel()">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import PaymentButton from "@/components/organisms/Payment/Button";
import PaymentText from "@/components/organisms/Payment/Text";
export default {
  name: "cautionPaymentEiskDisclaimerModal",
  components: {
    // PaymentButton,
    PaymentText,
  },
  data() {
    return {
      confirmed: false,
      accepted: false,
      agreed: false,
    };
  },
  computed: {
    classes() {
      const classes = ["modal-box", `--${this.$store.state.modal.size}`];
      return classes;
    },
    isUnVerifiedDomain() {
      return !this.$store.state.modal.params.isVerifiedDomain;
    },
    isAllAccepted() {
      return this.isUnVerifiedDomain
        ? this.confirmed && this.accepted && this.agreed
        : this.agreed;
    },
    isShowCancelButton() {
      return (
        "returnUrl" in this.$store.state.modal.params &&
        this.$store.state.modal.params.returnUrl !== null
      );
    },
  },
  methods: {
    hideModal() {
      if (this.isAccepted) {
        this.$store.dispatch("modal/hide");
      }
    },
    returnToMerchant() {
      location.href = this.$store.state.modal.params.returnUrl;
    },
    updateConfirmedStatus() {
      this.confirmed = this.$refs.confirmed.checked;
    },
    updateAcceptedStatus() {
      this.accepted = this.$refs.accepted.checked;
    },
    updateAgreedStatus() {
      this.agreed = this.$refs.agreed.checked;
    },
    handleOk() {
      this.$store.dispatch("payment/updateAllowCookiesStatus", true);
      this.$store.dispatch("modal/hide");
    },
    handleCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.modal-box {
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color_bg);
  padding: 36px 24px;
  @include media(pc) {
    max-height: 70%;
    overflow: auto;
    &.--small {
      width: 470px;
    }
    &.--medium {
      width: 760px;
    }
  }
  @include media(sp) {
    padding: 24px 18px;
    width: calc(100vw - 32px);
    max-height: 85%;
    overflow: auto;
  }
}
.header {
  position: relative;
  padding-bottom: 24px;
  @include media(sp) {
    padding-bottom: 18px;
  }
  &__title {
    margin-bottom: 2rem;
    @include media(sp) {
      margin-bottom: 1rem;
    }
    &::before {
      content: "";
      margin-right: 5px;
      display: inline-block;
      background: url(/assets/images/caution.svg) no-repeat center center;
      background-size: contain;
      vertical-align: middle;
      width: 2.5rem;
      height: 2.5rem;
      @include media(sp) {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  &::after {
    content: "";
    display: block;
    width: 100%;
    border-bottom: 1px solid #78668d;
    position: absolute;
    bottom: 0;
    left: 0;
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
  @include media(sp) {
    .btn_content {
      margin-left: 0;
      p {
        font-size: 10px;
      }
    }
  }

  .btn-container {
    @include media(pc) {
      padding: 0 80px 0;
    }
    @include media(sp) {
      padding: 0 40px 0;
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
#paying-accept-checkbox {
  font-size: 1.5rem;
  line-height: 1.5;
  cursor: pointer;
}
#button-container {
  text-align: center;
}
.continue-button {
  position: relative;
  font-size: 17px;
  font-weight: 100;
  cursor: pointer;
  padding: 4px 16px;
  border-radius: 10px;
  border: solid 1px #fff;
  &.__active {
    color: #fff;
    background: $gradation-pale;
  }
}

.riskBox {
  margin-top: 3rem;
  @include media(sp) {
    margin-top: 2rem;
  }
  a {
    color: #5492f5;
    text-decoration: underline;
  }
  label {
    display: block;
    margin-top: 1rem;
    padding: 1.5rem;
    cursor: pointer;
    background-color: var(--color_bg_modal);
    border-radius: 4px;
    @include media(sp) {
      padding: 1rem;
    }
    input {
      display: none;
      & + span {
        position: relative;
        display: block;
        padding-left: 3rem;
        @include media(sp) {
          padding-left: 2.5rem;
        }
        &::before {
          content: "";
          display: block;
          width: 18px;
          height: 18px;
          border: 2px solid var(--color_font);
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
        & + span {
          &::before {
            background-color: var(--color_font);
          }
          &::after {
            content: "";
            display: block;
            width: 16px;
            height: 8px;
            border-left: 3px solid #22b142;
            border-bottom: 3px solid #22b142;
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
