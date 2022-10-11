<template>
  <div class="result">
    <PaymentAmountBilled
      class="result__bill"
      :symbol="merchantReceiveSymbol"
      :icon="merchantReceiveTokenIcon"
      :price="merchantReceiveAmount | formatAmount"
      size="big"
    />

    <!-- <PaymentTitle class="result__title" type="h3_g" html="Payment status" /> -->
    <PaymentTransaction
      class="result__transaction"
      :type="transactionType"
      :title="transactionTitle"
      :text="transactionText"
      :explorer-url="explorerUrl"
    />

    <!-- <PaymentTitle class="result__title" type="h3_g" html="Payment detail" />
    <PaymentAmountBilled
      class="result__receivedToken"
      title="Paid Amount"
      :symbol="userPaidSymbol"
      :icon="userPaidTokenIcon"
      icon-type="png"
      :price="userPaidAmount | formatAmount"
    />
    <PaymentAmountBilled
      v-if="hasCashback"
      class="result__receivedToken"
      title="Cash Back"
      :symbol="merchantReceiveSymbol"
      :icon="merchantReceiveTokenIcon"
      :price="cashbackAmount | formatAmount"
    /> -->

    <div v-if="isStatusProcessing || isStatusSucceeded">
      <PaymentTitle
        class="result__title"
        type="h4_g"
        html="Do you want a receipt?"
        layout="c"
      />
      <PaymentReceipt
        :payment-token="paymentToken"
        :is-registerd-email="Boolean(email)"
        :is-reserving-mode="status === STATUS_PROCESSING"
        :status="status"
      />
    </div>

    <PaymentButton
      v-if="(isStatusSucceeded || isStatusFailured) && backUrl"
      class="result__button"
      text="Back to Payee’s Services"
      :url="backUrl"
      color="primary"
      layout="reverse"
    />
  </div>
</template>

<script>
import PaymentAmountBilled from '@/components/organisms/Payment/AmountBilled'
import PaymentTitle from '@/components/organisms/Payment/Title'
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentReceipt from '@/components/organisms/Payment/Receipt'
import PaymentTransaction from '@/components/organisms/Payment/Transaction'
import { Decimal } from 'decimal.js'
import {
  NETWORKS,
  STATUS_PROCESSING,
  STATUS_RESULT_FAILURE,
  STATUS_RESULT_SUCCESS
} from '@/constants'
import {
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalacheReceiveTokens
} from '@/contracts/receive_tokens'
import {
  EthereumTokens as EthereumDefaultTokens,
  BscTokens as BscDefaultTokens,
  MaticTokens as MaticDefaultTokens,
  AvalancheTokens as AvalancheDefaultTokens
} from '@/contracts/tokens'

export default {
  name: 'PaymentResult',
  components: {
    PaymentAmountBilled,
    PaymentTitle,
    PaymentButton,
    PaymentReceipt,
    PaymentTransaction
  },
  props: {
    progressTotalSteps: Number,
    progressCompletedSteps: Number
  },
  data() {
    return {
      chainId: null,
      merchantReceiveAmount: '0',
      merchantReceiveSymbol: null,
      userPaidAmount: '0',
      userPaidSymbol: null,
      cashbackAmount: '0',
      transactionHash: null,
      successReturnUrl: null,
      failureReturnUrl: null,
      email: null,
      status: STATUS_PROCESSING,
      transactionType: 'loading',
      transactionTitle: 'Waiting for tx result',
      transactionText: '',
      resultPollingTimer: null
    }
  },
  filters: {
    formatAmount(amount) {
      if (!amount) return '0'
      return Decimal(amount).toString()
    }
  },
  watch: {
    status(newStatus) {
      if (newStatus === STATUS_PROCESSING) {
        this.transactionType = 'loading'
        this.transactionTitle = 'Waiting for transaction result'
      }
      if (newStatus === STATUS_RESULT_SUCCESS) {
        this.transactionType = 'success'
        this.transactionTitle = 'Transaction Submitted'
        this.transactionText = ''
      }
      if (newStatus === STATUS_RESULT_FAILURE) {
        this.transactionType = 'dismiss'
        this.transactionTitle = 'Invalid Transaction'
        this.transactionText = 'Check the transaction in Explorer.'
      }
    }
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    RESULT_CHECK_CYCLE() {
      return 5000
    },
    STATUS_PROCESSING() {
      return STATUS_PROCESSING
    },
    paymentToken() {
      return this.$route.params.token
    },
    merchantReceiveTokens() {
      if (this.isPaidEthereum) {
        return EthereumReceiveTokens
      } else if (this.isPaidBinance) {
        return BscReceiveTokens
      } else if (this.isPaidMatic) {
        return MaticReceiveTokens
      } else if (this.isPaidAvalanche) {
        return AvalacheReceiveTokens
      } else {
        return {}
      }
    },
    paidNetworkDefaultTokens() {
      if (this.isPaidEthereum) {
        return EthereumDefaultTokens
      } else if (this.isPaidBinance) {
        return BscDefaultTokens
      } else if (this.isPaidMatic) {
        return MaticDefaultTokens
      } else if (this.isPaidAvalanche) {
        return AvalancheDefaultTokens
      } else {
        return null
      }
    },
    merchantReceiveTokenIcon() {
      const tokens = this.merchantReceiveTokens
      return this.merchantReceiveSymbol in tokens
        ? tokens[this.merchantReceiveSymbol].iconPath
        : 'crypto_currency/unknown'
    },
    userPaidTokenIcon() {
      const tokens = this.paidNetworkDefaultTokens
      if (tokens) {
        return this.userPaidSymbol in tokens
          ? tokens[this.userPaidSymbol].iconPath
          : 'crypto_currency/unknown'
      } else {
        return 'crypto_currency/unknown'
      }
    },
    explorerUrl() {
      return this.chainId !== null && this.chainId in NETWORKS
        ? `${NETWORKS[this.chainId].scanUrl}/tx/${this.transactionHash}`
        : ''
    },
    backUrl() {
      return this.isStatusSucceeded
        ? this.successReturnUrl
        : this.failureReturnUrl
    },
    isReceiptMode() {
      return 'rcpt' in this.$route.query
    },
    isStatusProcessing() {
      return this.status === STATUS_PROCESSING
    },
    isStatusFailured() {
      return this.status === STATUS_RESULT_FAILURE
    },
    isStatusSucceeded() {
      return this.status === STATUS_RESULT_SUCCESS
    },
    isPaidEthereum() {
      return (
        this.chainId === NETWORKS[1].chainId ||
        this.chainId === NETWORKS[5].chainId
      )
    },
    isPaidBinance() {
      return (
        this.chainId === NETWORKS[56].chainId ||
        this.chainId === NETWORKS[97].chainId
      )
    },
    isPaidMatic() {
      return (
        this.chainId === NETWORKS[137].chainId ||
        this.chainId === NETWORKS[80001].chainId
      )
    },
    isPaidAvalanche() {
      return (
        this.chainId === NETWORKS[43114].chainId ||
        this.chainId === NETWORKS[43113].chainId
      )
    },
    hasCashback() {
      if (!this.cashbackAmount) return false
      return Decimal(this.cashbackAmount).toString() !== '0'
    }
  },
  methods: {
    apiGetTransaction() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction`
      const request = {
        params: new URLSearchParams([['payment_token', this.paymentToken]])
      }
      return this.axios.get(url, request)
    },
    showDataInitialize() {
      this.chainId = this.$store.state.web3.chainId
      this.merchantReceiveAmount =
        this.$store.state.payment.amount !== null
          ? this.$store.state.payment.amount
          : '0'
      this.merchantReceiveSymbol = this.$store.state.payment.symbol
      this.userPaidAmount =
        this.$store.state.payment.token.amount !== null
          ? this.$store.state.payment.token.amount
          : '0'
      this.userPaidSymbol = this.$store.state.payment.token.symbol
      this.transactionHash = this.$store.state.payment.transactionHash
    },
    setApiResultData(data) {
      this.chainId = data.network_type
      this.merchantReceiveAmount = data.base_amount
      this.merchantReceiveSymbol = data.base_symbol
      this.userPaidAmount = data.user_amount
      this.userPaidSymbol = data.user_symbol
      this.cashbackAmount = data.cashback_amount
      this.transactionHash = data.transaction_address
      this.successReturnUrl = data.succeeded_return_url
      this.failureReturnUrl = data.failured_return_url
      this.email = data.email
      this.status = data.status
      this.$store.dispatch('payment/update', {
        domain: data.domain,
        orderCode: data.order_code,
        isVerifiedDomain: Boolean(data.is_verified_domain),
        merchantWalletAddress: data.merchant_wallet_address
      })
    },
    pollingTransactionResult() {
      this.resultPollingTimer = setInterval(() => {
        this.apiGetTransaction().then((response) => {
          this.setApiResultData(response.data)
          const stopTimerStatuses = [
            STATUS_RESULT_FAILURE,
            STATUS_RESULT_SUCCESS
          ]
          if (stopTimerStatuses.includes(response.data.status)) {
            clearInterval(this.resultPollingTimer)
          }
        })
      }, this.RESULT_CHECK_CYCLE)
    }
  },
  created() {
    this.$emit('updateProgressTotalSteps', 2)
    this.showDataInitialize()
    Decimal.set({ toExpNeg: -20 })
    this.apiGetTransaction().then((response) => {
      this.setApiResultData(response.data)
      if (this.isStatusProcessing) {
        const filterAmount = (amount) => {
          return Decimal(amount).toString()
        }
        this.transactionText = `Pay ${filterAmount(this.userPaidAmount)}${
          this.userPaidSymbol
        } for ${filterAmount(this.merchantReceiveAmount)}${
          this.merchantReceiveSymbol
        }`
        this.pollingTransactionResult()
      }
      this.$emit('incrementProgressCompletedSteps')
      setTimeout(() => {
        this.$emit('updateInitializingStatus', false)
      }, 1500)
    })
  },
  beforeDestroy() {
    clearInterval(this.resultPollingTimer)
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('modal/show', {
      target: 'error-forbidden-back-payment-modal',
      size: 'small'
    })
    next(false)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.result {
  &__bill {
    margin-bottom: 2rem;
  }
  &__title {
    margin-bottom: 0.5rem;
  }
  // &__balance {
  //   margin-bottom: 1rem;
  // }
  &__transaction {
    margin-bottom: 2rem;
  }
  &__receivedToken {
    padding: 1rem;
    margin-bottom: 2rem;
  }
  // &__update {
  //   margin-bottom: 1rem;
  // }
  // &__price {
  //   margin-bottom: 1rem;
  // }
  // &__btnwrap {
  //   margin-top: 2rem;
  //   div + div {
  //     margin-top: 0.5rem;
  //   }
  // }
}
</style>
