<template>
  <div class="result">
    <PaymentAmountBilled
      class="result__bill"
      :symbol="merchantReceiveSymbol"
      :icon="merchantReceiveTokenIcon"
      :price="filterMerchantReceiveAmount"
      size="big"
    />
    <PaymentTitle class="result__title" type="h2_g" html="Payment detail" />
    <PaymentAmountBilled
      class="result__receivedToken"
      :symbol="userPaidSymbol"
      :icon="userPaidTokenIcon"
      :price="filterUserPaidAmount"
    />

    <PaymentTransaction
      class="result__transaction"
      :type="transaction.type"
      :title="transaction.title"
      :text="transaction.text"
      :link="transaction.link"
      :explorerUrl="transaction.explorerUrl"
    />
    <!--
    <div v-if="isStatusProcessing">
      <PaymentButton color="inactive" text="Processing…" />
      <PaymentVia />
    </div>
    {{ isStatusFailured }}
    <pending
      v-if="isStatusProcessing"
      :urls="linkUrlData"
      :transaction="transactionData"
    />
    <failure
      v-else-if="isStatusFailured"
      :urls="linkUrlData"
      :isReceiptMode="isReceiptMode"
    />
    <success
      v-else
      :urls="linkUrlData"
      :token="paymentToken"
      :isReceiptMode="isReceiptMode"
    /> -->

    <!--   <div class="payment_handleprice"><div class="payment_handleprice-pricewrap">
      <PaymentAmountBilled
        :symbol="userPaidSymbol"
        :icon="userPaidTokenIcon"
        :price="userPaidAmount | amountFormat"
      />
      <div class="payment_detailwrap">
        <div class="payment_desc add-flex j-between mb-2">
          <p class="grd">Payment detail</p>
        </div>
        <div class="payment_detail add-flex j-between mb-1">
          <div class="payment_detail-name add-flex a-center mb-1">
            <figure>
              <img :src="userPaidTokenIcon" :alt="userPaidSymbol" />
            </figure>
            <p>
              {{ userPaidSymbol }}
            </p>
          </div>
          <div class="payment_detail-value">
            <p>
              {{ userPaidAmount | amountFormat }}
            </p>
          </div>
        </div>
        <pending
          v-if="isStatusProcessing"
          :urls="linkUrlData"
          :transaction="transactionData"
        />
        <failure
          v-else-if="isStatusFailured"
          :urls="linkUrlData"
          :isReceiptMode="isReceiptMode"
        />
        <success
          v-else
          :urls="linkUrlData"
          :token="paymentToken"
          :isReceiptMode="isReceiptMode"
        />
      </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import PaymentTitle from "@/components/organisms/Payment/Title";
import PaymentTransaction from "@/components/organisms/Payment/Transaction";
// import PaymentVia from "@/components/organisms/Payment/Via";
// import PaymentButton from "@/components/organisms/Payment/Button";
import { Decimal as BigJs } from "decimal.js";
// import ResultPending from "@/components/organisms/PaymentResultPending";
// import ResultFailure from "@/components/organisms/PaymentResultFailure";
// import ResultSuccess from "@/components/organisms/PaymentResultSuccess";
import {
  NETWORKS,
  STATUS_PROCESSING,
  STATUS_RESULT_FAILURE,
  STATUS_RESULT_SUCCESS,
} from "@/constants";
import {
  EthereumTokens as EthereumDefaultTokens,
  BscTokens as BscDefaultTokens,
  MaticTokens as MaticDefaultTokens,
  AvalancheTokens as AvalancheDefaultTokens,
} from "@/contracts/tokens";

export default {
  name: "PaymentResult",
  components: {
    // pending: ResultPending,
    // failure: ResultFailure,
    // success: ResultSuccess,
    PaymentAmountBilled,
    PaymentTitle,
    PaymentTransaction,
    // PaymentVia,
    // PaymentButton,
  },
  data() {
    return {
      chainId: null,
      merchantReceiveAmount: "0",
      merchantReceiveSymbol: null,
      userPaidAmount: "0",
      userPaidSymbol: null,
      transactionHash: null,
      successReturnUrl: null,
      failureReturnUrl: null,
      status: STATUS_PROCESSING,
      resultPollingTimer: null,
      merchantReceiveTokenIcons: {
        USDT: "usdt",
        USDC: "usdc",
        DAI: "dai",
        JPYC: "jpyc",
      },
      transactionMode: "loading",
      transaction: {
        type: "loading",
        title: "",
        text: "",
        explorerUrl: "",
        link: {
          url: "",
          title: "",
          color: "",
        },
        // loading: {
        //   type: "loading",
        //   title: "",
        //   text: "",
        //   explorerUrl: this.linkUrlData.explorer
        //     ? this.linkUrlData.explorer
        //     : "",
        //   link: {
        //     url: "",
        //     title: "",
        //     color: "",
        //   },
        // },
        // dismiss: {
        //   type: "dismiss",
        //   title: "",
        //   text: "",
        //   explorerUrl: this.linkUrlData.explorer
        //     ? this.linkUrlData.explorer
        //     : "",
        //   link: {
        //     url: "",
        //     title: "",
        //     color: "",
        //   },
        // },
        // success: {
        //   type: "success",
        //   title: "",
        //   text: "",
        //   explorerUrl: this.linkUrlData.explorer
        //     ? this.linkUrlData.explorer
        //     : "",
        //   link: {
        //     url: "",
        //     title: "",
        //     color: "",
        //   },
        // },
      },
    };
  },
  filters: {
    amountFormat(amount) {
      return new BigJs(amount).toString();
    },
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    RESULT_CHECK_CYCLE() {
      return 5000;
    },
    paymentToken() {
      return this.$route.params.token;
    },
    paidNetworkDefaultTokens() {
      if (this.isPaidEthereum) {
        return EthereumDefaultTokens;
      } else if (this.isPaidBinance) {
        return BscDefaultTokens;
      } else if (this.isPaidMatic) {
        return MaticDefaultTokens;
      } else if (this.isPaidAvalanche) {
        return AvalancheDefaultTokens;
      } else {
        return null;
      }
    },
    merchantReceiveTokenIcon() {
      return this.merchantReceiveTokenIcons[this.merchantReceiveSymbol];
    },
    userPaidTokenIcon() {
      const tokens = this.paidNetworkDefaultTokens;
      // if (tokens) {
      //   return this.userPaidSymbol in tokens
      //     ? tokens[this.userPaidSymbol].icon
      //     : require("@/assets/images/symbol/unknown.svg");
      // } else {
      //   return require("@/assets/images/symbol/unknown.svg");
      // }
      if (tokens) {
        return this.userPaidSymbol in tokens
          ? tokens[this.userPaidSymbol].iconPath
          : "network-unknown";
      } else {
        return "network-unknown";
      }
    },
    transactionData() {
      return {
        merchantReceiveAmount: this.merchantReceiveAmount,
        merchantReceiveSymbol: this.merchantReceiveSymbol,
        userPaidAmount: this.userPaidAmount,
        userPaidSymbol: this.userPaidSymbol,
      };
    },
    linkUrlData() {
      const scanSiteUrl =
        this.chainId !== null ? NETWORKS[this.chainId].scanUrl : "";
      return {
        explorer: `${scanSiteUrl}/tx/${this.transactionHash}`,
        success: this.successReturnUrl,
        failure: this.failureReturnUrl,
      };
    },
    isReceiptMode() {
      return "rcpt" in this.$route.query;
    },
    isStatusProcessing() {
      // this.transactionMode = "loading";
      return this.status === STATUS_PROCESSING;
    },
    isStatusFailured() {
      // this.transactionMode = "dismiss";
      return this.status === STATUS_RESULT_FAILURE;
    },
    isStatusSucceeded() {
      // this.transactionMode = "success";
      return this.status === STATUS_RESULT_SUCCESS;
    },
    isPaidEthereum() {
      return (
        this.chainId === NETWORKS[1].chainId ||
        this.chainId === NETWORKS[5].chainId
      );
    },
    isPaidBinance() {
      return (
        this.chainId === NETWORKS[56].chainId ||
        this.chainId === NETWORKS[97].chainId
      );
    },
    isPaidMatic() {
      return (
        this.chainId === NETWORKS[137].chainId ||
        this.chainId === NETWORKS[80001].chainId
      );
    },
    isPaidAvalanche() {
      return (
        this.chainId === NETWORKS[43114].chainId ||
        this.chainId === NETWORKS[43113].chainId
      );
    },
    filterMerchantReceiveAmount() {
      return new BigJs(this.merchantReceiveAmount).toString();
    },
    filterUserPaidAmount() {
      return new BigJs(this.userPaidAmount).toString();
    },
    // constructTransactionText(transactionData) {
    //   // return transactionData.userPaidAmount;
    //   return (
    //     "Pay " +
    //     amountFormat(transactionData.userPaidAmount) +
    //     transactionData.userPaidSymbol +
    //     " for " +
    //     amountFormat(transactionData.merchantReceiveAmount) +
    //     transactionData.merchantReceiveSymbol
    //   );
    // },
  },
  methods: {
    apiGetTransaction() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction`;
      const request = {
        params: new URLSearchParams([["payment_token", this.paymentToken]]),
      };
      return this.axios.get(url, request);
    },
    apiGetTransactionStatus() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction/status`;
      const request = {
        params: new URLSearchParams([["payment_token", this.paymentToken]]),
      };
      return this.axios.get(url, request);
    },
    showDataInitialize() {
      this.chainId = this.$store.state.web3.chainId;
      this.merchantReceiveAmount =
        this.$store.state.payment.amount !== null
          ? this.$store.state.payment.amount
          : "0";
      this.merchantReceiveSymbol = this.$store.state.payment.symbol;
      this.userPaidAmount =
        this.$store.state.payment.token.amount !== null
          ? this.$store.state.payment.token.amount
          : "0";
      this.userPaidSymbol = this.$store.state.payment.token.symbol;
      this.transactionHash = this.$store.state.payment.transactionHash;
    },
    setApiResultData(data) {
      this.chainId = data.network_type;
      this.merchantReceiveAmount = data.base_amount;
      this.merchantReceiveSymbol = data.base_symbol;
      this.userPaidAmount = data.user_amount;
      this.userPaidSymbol = data.user_symbol;
      this.transactionHash = data.transaction_address;
      this.successReturnUrl = data.succeeded_return_url;
      this.failureReturnUrl = data.failured_return_url;
      this.$store.dispatch("payment/update", {
        domain: data.domain,
        orderCode: data.order_code,
        isVerifiedDomain: Boolean(data.is_verified_domain),
        merchantWalletAddress: data.merchant_wallet_address,
      });
    },
    pollingTransactionResult() {
      this.resultPollingTimer = setInterval(() => {
        this.apiGetTransactionStatus().then((response) => {
          this.status = response.data.status;
          const stopTimerStatuses = [
            STATUS_RESULT_FAILURE,
            STATUS_RESULT_SUCCESS,
          ];
          if (stopTimerStatuses.includes(response.data.status)) {
            clearInterval(this.resultPollingTimer);
          }
        });
      }, this.RESULT_CHECK_CYCLE);
    },
  },
  created() {
    this.showDataInitialize();
    this.apiGetTransaction().then((response) => {
      this.setApiResultData(response.data);
      if (this.isStatusProcessing) {
        this.pollingTransactionResult();
      }
    });

    if (this.linkUrlData.explorer) {
      this.transaction.explorerUrl = this.linkUrlData.explorer;
    }

    if (this.status === STATUS_PROCESSING) {
      this.transaction.type = "loading";
      this.transaction.title = "Waiting for Confimation";
      let paidAmount = new BigJs(
        this.transactionData.userPaidAmount
      ).toString();
      let merchantReceiveAmount = new BigJs(
        this.transactionData.merchantReceiveAmount
      ).toString();
      this.transaction.text =
        "Pay " +
        paidAmount +
        " " +
        this.transactionData.userPaidSymbol +
        " for " +
        merchantReceiveAmount +
        " " +
        this.transactionData.merchantReceiveSymbol;
      if (this.linkUrlData.explorer) {
        this.transaction.link.url = this.linkUrlData.explorer;
        this.transaction.link.icon = "outerlink";
        this.transaction.link.title = "View on explorer";
        this.transaction.link.url = "";
        this.transaction.link.title = "Processing...";
        this.transaction.link.color = "inactive";
      }
    } else if (this.status === STATUS_RESULT_FAILURE) {
      this.transaction.type = "dismiss";
      this.transaction.text =
        "The transaction cannot succeed due to error: execution <br />Check the reason for the reverted from Explorer.";

      if (this.linkUrlData.explorer && !this.isReceiptMode) {
        this.transaction.link.url = this.linkUrlData.failure;
        this.transaction.link.title = "Back to Payee’s Services";
      }
    } else if (this.status === STATUS_RESULT_SUCCESS) {
      this.transaction.type = "success";
      this.transaction.title = "Transaction Submitted";
      this.transaction.text = "";
      if (this.linkUrlData.success) {
        this.transaction.link.url = this.linkUrlData.success;
        this.transaction.link.title = "Back to Payee’s Services";
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.resultPollingTimer);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("modal/show", {
      target: "error-forbidden-back-payment-modal",
      size: "small",
    });
    next(false);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.result {
  &__bill {
    margin-bottom: 2rem;
  }
  &__title {
    margin-bottom: 2rem;
  }
  &__balance {
    margin-bottom: 2rem;
  }
  &__update {
    margin-bottom: 2rem;
  }
  &__price {
    margin-bottom: 2rem;
  }
  &__btnwrap {
    margin-top: 2rem;
    div + div {
      margin-top: 0.5rem;
    }
  }
}
// .payment_handleprice {
//   width: 100%;
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
//   }

//   .payment_detail {
//     &-name {
//       p {
//         font-size: 16px;
//         font-weight: 400;
//         line-height: 25px;
//         margin-left: 7px;
//       }
//       figure {
//         width: 25px;
//         height: 25px;
//         img {
//           vertical-align: baseline;
//         }
//       }
//     }
//     &-value {
//       font-size: 20px;
//       font-weight: 100;
//       margin-left: 16px;
//     }
//   }
// }
</style>
