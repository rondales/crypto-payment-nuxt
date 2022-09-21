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

    <PaymentResultPending
      v-if="isStatusProcessing"
      :explorer-url="explorerUrl"
      :merchant-receive-symbol="merchantReceiveSymbol"
      :merchant-receive-amount="filterMerchantReceiveAmount"
      :user-paid-symbol="userPaidSymbol"
      :user-paid-amount="filterUserPaidAmount"
    />
    <PaymentResultFailure
      v-else-if="isStatusFailured"
      :explorer-url="explorerUrl"
      :back-url="failureReturnUrl"
    />
    <PaymentResultSuccess
      v-else-if="isStatusSucceeded"
      :payment-token="paymentToken"
      :explorer-url="explorerUrl"
      :back-url="successReturnUrl"
      :is-paid-ethereum="isPaidEthereum"
      :is-paid-binance="isPaidBinance"
      :is-paid-matic="isPaidMatic"
      :is-paid-avalanche="isPaidAvalanche"
    />
  </div>
</template>

<script>
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import PaymentTitle from "@/components/organisms/Payment/Title";
import PaymentResultPending from "@/components/organisms/PaymentResultPending";
import PaymentResultFailure from "@/components/organisms/PaymentResultFailure";
import PaymentResultSuccess from "@/components/organisms/PaymentResultSuccess";
import { Decimal as BigJs } from "decimal.js";
import {
  NETWORKS,
  STATUS_PROCESSING,
  STATUS_RESULT_FAILURE,
  STATUS_RESULT_SUCCESS,
} from "@/constants";
import {
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalacheReceiveTokens,
} from "@/contracts/receive_tokens";
import {
  EthereumTokens as EthereumDefaultTokens,
  BscTokens as BscDefaultTokens,
  MaticTokens as MaticDefaultTokens,
  AvalancheTokens as AvalancheDefaultTokens,
} from "@/contracts/tokens";

export default {
  name: "PaymentResult",
  components: {
    PaymentAmountBilled,
    PaymentTitle,
    PaymentResultPending,
    PaymentResultFailure,
    PaymentResultSuccess
  },
  props: {
    progressTotalSteps: Number,
    progressCompletedSteps: Number
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
      resultPollingTimer: null
    };
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
    merchantReceiveTokens() {
      if (this.isPaidEthereum) {
        return EthereumReceiveTokens;
      } else if (this.isPaidBinance) {
        return BscReceiveTokens;
      } else if (this.isPaidMatic) {
        return MaticReceiveTokens;
      } else if (this.isPaidAvalanche) {
        return AvalacheReceiveTokens;
      } else {
        return {};
      }
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
      const tokens = this.merchantReceiveTokens
      return this.merchantReceiveSymbol in tokens
        ? tokens[this.merchantReceiveSymbol].iconPath
        : "crypto_currency/unknown";
    },
    userPaidTokenIcon() {
      const tokens = this.paidNetworkDefaultTokens;
      if (tokens) {
        return this.userPaidSymbol in tokens
          ? tokens[this.userPaidSymbol].iconPath
          : "crypto_currency/unknown";
      } else {
        return "crypto_currency/unknown";
      }
    },
    explorerUrl() {
      return this.chainId !== null && this.chainId in NETWORKS
        ? `${NETWORKS[this.chainId].scanUrl}/tx/${this.transactionHash}`
        : ''
    },
    isReceiptMode() {
      return "rcpt" in this.$route.query;
    },
    isStatusProcessing() {
      return this.status === STATUS_PROCESSING;
    },
    isStatusFailured() {
      return this.status === STATUS_RESULT_FAILURE;
    },
    isStatusSucceeded() {
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
      this.status = data.status
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
    }
  },
  created() {
    this.$emit('updateProgressTotalSteps', 2)
    this.showDataInitialize();
    this.apiGetTransaction().then((response) => {
      this.setApiResultData(response.data);
      if (this.isStatusProcessing) {
        this.pollingTransactionResult();
      }
      this.$emit('incrementProgressCompletedSteps')
      setTimeout(() => {
        this.$emit('updateInitializingStatus', false)
      }, 1500)
    })
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
</style>
