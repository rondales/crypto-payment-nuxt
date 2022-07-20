<template>
  <div>
    <!-- TODO 確認の仕方 -->
    <PaymentAmountBilled class="bill" size="big" />
    <PaymentEmail
      @noRequireReceipt="next"
      @requireReceipt="requireReceipt"
      :inputmodel="mail"
    />
    <!-- <div class="payment_handleprice add-flex j-between">
      <div class="payment_handleprice-pricewrap">
        <PaymentAmountBilled />
      </div>
      <div class="payment_receiptwrap">
        <div class="payment_desc mb-2 mt-1">
          <p>Do you want a receipt?</p>
          <span>&#x1F9FE;</span>
        </div>
        <div class="payment_receipt">
          <p class="mb-1">Email address to receive receipt</p>
          <div class="payment_receipt_form border mb-2">
            <input
              v-model="mail"
              class="mail"
              type="text"
              placeholder="your@mail.com"
            />
          </div>
        </div>
        <button class="btn __g __l inactive mb-2" :class="{ active: mail }">
          Yes required
        </button>
        <button class="btn __g __l">Not required</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import PaymentEmail from "@/components/organisms/Payment/Email";

export default {
  name: "PaymentInvoice",
  data() {
    return {
      Receiver: "E-check.online",
      mail: "",
      price: 1000.0,
      invoiceId: "hogehogefugafuga",
    };
  },
  components: {
    PaymentAmountBilled,
    PaymentEmail,
  },
  mounted() {},
  methods: {},
  filters: {
    maskText(text) {
      text = "*************";
      return text;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.bill {
  margin-bottom: 2rem;
}
// .payment_handleprice {
//   dl {
//     dt {
//       font-weight: 400;
//       font-size: 15px;
//     }
//   }

//   .payment_desc {
//     p {
//       background: $gradation-pale;
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-size: 150% 150%;
//       display: inline;
//     }
//   }
//   .payment_handleprice-pricewrap {
//     width: 100%;
//   }
//   .payment_handleprice-price {
//     padding: 0;
//     width: 100%;
//     min-width: auto;
//     input {
//       line-height: 53px;
//       height: 53px;
//       font-weight: 500;
//       font-size: 18px;
//       width: 65%;
//       padding-left: 16px;
//       @include media(sp) {
//         width: 55%;
//       }
//     }
//     .currency {
//       width: 35%;
//       line-height: 53px;
//       position: relative;
//       &::before {
//         position: absolute;
//         content: "";
//         width: 1px;
//         height: 33px;
//         background: #6b6b6c;
//         left: -12px;
//       }
//       &::after {
//         content: "▲";
//         position: absolute;
//         right: 12px;
//         color: #6b6b6c;
//         font-size: 14px;
//         transform: rotate(-180deg);
//       }
//       figure {
//         line-height: 53px;
//         position: absolute;
//         img {
//           padding-top: 14px;
//         }
//       }
//       select {
//         padding-left: 36px;
//         font-weight: 400;
//         width: 100%;
//         border: none;
//         outline: none;
//       }
//     }
//     span {
//       vertical-align: middle;
//       font-size: 11px;
//     }
//   }

//   .payment-with {
//     text-align: center;
//     font-size: 18px;
//     font-weight: 200;
//     padding-top: 8px;
//     padding-bottom: 24px;
//   }

//   .payment_receiptwrap {
//     width: 100%;
//   }
//   .payment_receipt {
//     p {
//       font-size: 15px;
//     }
//     &_form {
//       height: 56px;
//       .mail {
//         height: 51px;
//         padding: 0 16px;
//         font-size: 15px;
//         width: 100%;
//       }
//     }
//   }
// }
</style>
