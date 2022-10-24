<template>
  <PaymentModal
    title="Risk Disclaimer"
    emoji="&#x26a0;"
    text="Read the risk disclaimer carefully, and check the following options to acknowledge confirmation."
    :closeDisplay="false"
  >
    <div class="riskBox" v-if="isUnVerifiedDomain">
      <PaymentText
        tag="p"
        html="Do you understand the purpose of this transaction and have you
          verified that there is no risk of fraud?"
      />
      <PaymentConfirmCheckbox
        id="confirm"
        ref="confirmed"
        text="I understand the purpose of this transaction and have verified that there is no fear of fraud."
        @clickCheckbox="updateConfirmedStatus()"
      />
    </div>
    <div class="riskBox" v-if="isUnVerifiedDomain">
      <PaymentText
        tag="p"
        html="No refund of funds from us can be made if you are successful in this
          transaction. If there is a dispute with Payee, the parties will need
          to resolve it among themselves. Do you still want to continue with
          this transaction?"
      />
      <PaymentConfirmCheckbox
        id="accept"
        ref="accepted"
        text="I understand the risk and continue this transaction."
        @clickCheckbox="updateAcceptedStatus()"
      />
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
      <PaymentConfirmCheckbox
        id="agree"
        ref="agreed"
        text="I understand and agree."
        @clickCheckbox="updateAgreedStatus()"
      />
    </div>
    <div class="d-btnwrap">
      <PaymentButton
        :color="isAllAccepted ? 'primary' : 'inactive'"
        text="OK"
        @click.native="handleOk()"
      />
      <PaymentButton
        color="cancel"
        text="Cancel"
        @click.native="handleCancel()"
      />
    </div>
  </PaymentModal>
  <!-- <div :class="classes">
    <div class="header">
      <PaymentTitle
        class="header__title"
        type="h3"
        html="Risk Disclaimer"
        emoji="&#x26a0;"
        layout="iconBefore"
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
          <PaymentConfirmCheckbox
            id="confirm"
            ref="confirmed"
            text="I understand the purpose of this transaction and have verified that there is no fear of fraud."
            @clickCheckbox="updateConfirmedStatus()"
          />
        </div>
        <div class="riskBox">
          <PaymentText
            tag="p"
            html="No refund of funds from us can be made if you are successful in this
          transaction. If there is a dispute with Payee, the parties will need
          to resolve it among themselves. Do you still want to continue with
          this transaction?"
          />
          <PaymentConfirmCheckbox
            id="accept"
            ref="accepted"
            text="I understand the risk and continue this transaction."
            @clickCheckbox="updateAcceptedStatus()"
          />
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
        <PaymentConfirmCheckbox
          id="agree"
          ref="agreed"
          text="I understand and agree."
          @clickCheckbox="updateAgreedStatus()"
        />
      </div>

      <div class="d-btnwrap">
        <PaymentButton
          :color="isAllAccepted ? 'primary' : 'inactive'"
          text="OK"
          @click.native="handleOk()"
        />
        <PaymentButton
          color="cancel"
          text="Cancel"
          @click.native="handleCancel()"
        />
      </div>
    </div>
  </div> -->
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
// import PaymentTitle from "@/components/organisms/Payment/Title";
import PaymentButton from "@/components/organisms/Payment/Button";
import PaymentConfirmCheckbox from "@/components/organisms/Payment/ConfirmCheckbox";
import PaymentModal from "@/components/organisms/Payment/Modal";
export default {
  name: "cautionPaymentEiskDisclaimerModal",

  components: {
    PaymentText,
    PaymentButton,
    // PaymentTitle,
    PaymentConfirmCheckbox,
    PaymentModal,
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
      this.confirmed = this.$refs.confirmed.checkbox;
    },
    updateAcceptedStatus() {
      this.accepted = this.$refs.accepted.checkbox;
    },
    updateAgreedStatus() {
      this.agreed = this.$refs.agreed.checkbox;
    },

    handleOk() {
      this.$store.dispatch("payment/updateAgreeRiskStatus", true);
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
@import "@/assets/scss/delaunay.scss";
.riskBox {
  margin-top: 2rem;
  padding-top: 2rem;
  // @include media(sp) {
  //   margin-top: 2rem;
  // }
  border-top: 1px solid var(--Border);
  &:first-child {
    margin-top: 0;
  }
  a {
    color: var(--Textlink);
    text-decoration: underline;
    &::v-deep {
      span {
        color: var(--Textlink);
      }
    }
  }
  & + .d-btnwrap {
    margin-top: 3rem;
    @include media(sp) {
      margin-top: 2rem;
    }
  }
}
// .modal-box {
//   border-radius: 10px;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background: var(--color_bg);
//   padding: 36px 24px;
//   @include media(pc) {
//     max-height: 70%;
//     overflow: auto;
//     &.--small {
//       width: 470px;
//     }
//     &.--medium {
//       width: 760px;
//     }
//   }
//   @include media(sp) {
//     padding: 24px 18px;
//     width: calc(100vw - 32px);
//     max-height: 85%;
//     overflow: auto;
//   }
// }
// .header {
//   position: relative;
//   padding-bottom: 24px;
//   @include media(sp) {
//     padding-bottom: 18px;
//   }
//   &__title {
//     margin-bottom: 2rem;
//     @include media(sp) {
//       margin-bottom: 1rem;
//     }
//     &::before {
//       // content: "";
//       margin-right: 5px;
//       display: inline-block;
//       background: url(/assets/images/caution.svg) no-repeat center center;
//       background-size: contain;
//       vertical-align: middle;
//       width: 2.5rem;
//       height: 2.5rem;
//       @include media(sp) {
//         width: 2rem;
//         height: 2rem;
//       }
//     }
//   }
//   &::after {
//     content: "";
//     display: block;
//     width: 100%;
//     border-bottom: 1px solid #78668d;
//     position: absolute;
//     bottom: 0;
//     left: 0;
//   }
// }

// .close {
//   position: absolute;
//   width: 16px;
//   height: 16px;
//   font-size: 0;
//   @include media(pc) {
//     top: 30px;
//     right: 24px;
//   }
//   @include media(sp) {
//     top: 24px;
//     right: 24px;
//   }
// }
// .body {
//   @include media(sp) {
//     .btn_content {
//       margin-left: 0;
//       p {
//         font-size: 10px;
//       }
//     }
//   }

//   .btn-container {
//     @include media(pc) {
//       padding: 0 80px 0;
//     }
//     @include media(sp) {
//       padding: 0 40px 0;
//     }
//   }
// }
// .footer {
//   text-align: center;

//   @include media(pc) {
//     padding: 0 40px 40px;
//   }
//   @include media(sp) {
//     padding: 0 32px 32px;
//   }
// }
// #paying-accept-checkbox {
//   font-size: 1.5rem;
//   line-height: 1.5;
//   cursor: pointer;
// }
// #button-container {
//   text-align: center;
// }
// .continue-button {
//   position: relative;
//   font-size: 17px;
//   font-weight: 100;
//   cursor: pointer;
//   padding: 4px 16px;
//   border-radius: 10px;
//   border: solid 1px #fff;
//   &.__active {
//     color: #fff;
//     background: $gradation-pale;
//   }
// }
</style>
