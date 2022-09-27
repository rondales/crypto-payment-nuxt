<template>
  <div>
    <PaymentTitle v-if="hasCashback" class="mt-2 result__title" type="h2_g" html="Cash Back" />
    <PaymentAmountBilled
      v-if="hasCashback"
      class="result__receivedToken"
      :icon="cashbackTokenIcon"
      :symbol="cashbackTokenSymbol"
      :price="cashbackTokenAmount"
    />

    <PaymentTransaction
      class="result__transaction"
      type="success"
      title="Transaction Submitted"
      text=""
      :explorer-url="explorerUrl"
      :link="linkData"
    />
  </div>
</template>

<script>
import { STATUS_RESULT_SUCCESS } from "@/constants";
import {
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalacheReceiveTokens,
} from "@/contracts/receive_tokens";
import PaymentTitle from "@/components/organisms/Payment/Title";
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import PaymentTransaction from "@/components/organisms/Payment/Transaction";
export default {
  name: "PaymentResultSuccess",
  props: {
    paymentToken: String,
    explorerUrl: String,
    backUrl: String,
    isReceiptMode: Boolean,
    isPaidEthereum: Boolean,
    isPaidBinance: Boolean,
    isPaidMatic: Boolean,
    isPaidAvalanche: Boolean
  },
  components: {
    PaymentTitle,
    PaymentAmountBilled,
    PaymentTransaction
  },
  data() {
    return {
      cashbackTokenAmount: '',
      cashbackTokenSymbol: ''
    }
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    MERCHANT_RECEIVE_ICONS() {
      return {
        USDT: require("@/assets/images/symbol/usdt.svg"),
        USDC: require("@/assets/images/symbol/usdc.svg"),
        DAI: require("@/assets/images/symbol/dai.svg"),
        JPYC: require("@/assets/images/symbol/jpyc.svg"),
        WETH: require('@/assets/images/symbol/eth.svg')
      }
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
    cashbackTokenIcon() {
      return this.cashbackTokenSymbol in this.merchantReceiveTokens
        ? this.merchantReceiveTokens[this.cashbackTokenSymbol].iconPath
        : 'crypto_currency/unknown'
    },
    linkData() {
      return {
        color: 'primary',
        title: 'Back to Payee’s Services',
        url: this.backUrl
      }
    },
    hasCashback() {
      return this.cashbackAmount && this.cashbackAmount != 0
    },
    hasReturnUrl() {
      return this.urls.success;
    },
  },
  methods: {
    apiGetTransactionRefundedData() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction/refunded`;
      const request = {
        params: new URLSearchParams([['payment_token', this.paymentToken]])
      }
      return this.axios.get(url, request)
    },
    openPaymentReceiptModal() {
      this.$store.dispatch('modal/show', {
        target: 'payment-receipt-modal',
        size: 'small'
      })
    }
  },
  created() {
    if (!this.isReceiptMode) {
      this.$store.dispatch("payment/updateStatus", STATUS_RESULT_SUCCESS);
      this.apiGetTransactionRefundedData().then((response) => {
        this.cashbackTokenAmount = response.data.cashback_token_amount
        this.cashbackTokenSymbol = response.data.cashback_token_symbol
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";

.result {
  &__title {
    margin-bottom: 2rem;
  }
}
</style>
