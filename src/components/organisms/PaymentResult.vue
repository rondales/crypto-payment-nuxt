<template>
  <div class="result">
    <PaymentAmountBilled
      class="result__bill"
      :symbol="merchantReceiveSymbol"
      :icon="merchantReceiveTokenIcon"
      :price="merchantReceiveAmount | formatAmount"
      size="big"
    />
    <PaymentTransaction
      class="result__transaction"
      :type="transactionType"
      :title="transactionTitle"
      :text="transactionText"
      :explorer-url="explorerUrl"
    />
    <PaymentAmountBilled
      v-if="hasCashback"
      class="result__receivedToken"
      title="Cash Back"
      :symbol="merchantReceiveSymbol"
      :icon="merchantReceiveTokenIcon"
      :price="cashbackAmount | formatAmount"
    />
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
      v-if="
        (isStatusSucceeded || isStatusFailured) && backUrl && !isMetamaskBrowser
      "
      class="result__button"
      text="Back to Payee’s Services"
      :url="backUrl"
      color="primary"
      layout="reverse"
      size="l"
    />
    <!-- <div class="opensafari">
      <div class="close" @click="deleteOpenSafari"></div>
      <span
        >Please return to Safari or Chrome from the Metamask Mobile App by your
        own actions. You can also return to Safari or Chrome by clicking on the
        “Open in Browser” link below.</span
      >
    </div> -->
    <PaymentButton
      text="openBrowserModal"
      size="s"
      color="primary"
      @click.native="showModal('openBrowserModal')"
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
import isMobile from 'ismobilejs'
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
      resultPollingTimer: null,
      openSafariFlg: true
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
        : 'crypto_currency/unknown-small'
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
      let backUrl
      if (this.isStatusSucceeded && this.successReturnUrl) {
        backUrl = this.successReturnUrl
      } else if (this.isStatusFailured && this.failureReturnUrl) {
        backUrl = this.failureReturnUrl
      }
      return backUrl
        ? backUrl + '?payment_token=' + this.$route.params.token
        : null
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
    },
    isMobile() {
      return isMobile(window.navigator).any
    },
    metamaskInstalled() {
      return window.ethereum ? true : false
    },
    isMetamaskBrowser() {
      return this.isMobile && this.metamaskInstalled
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
        merchantWalletAddress: data.merchant_wallet_address,
        status: data.status,
        successReturnUrl: data.succeeded_return_url,
        failReturnUrl: data.failured_return_url
      })
    },
    pollingTransactionResult() {
      this.resultPollingTimer = setInterval(() => {
        this.apiGetTransaction().then((response) => {
          this.setApiResultData(response.data)
          this.handleAddMerchantSiteRedirectParam()
          const stopTimerStatuses = [
            STATUS_RESULT_FAILURE,
            STATUS_RESULT_SUCCESS
          ]
          if (stopTimerStatuses.includes(response.data.status)) {
            clearInterval(this.resultPollingTimer)
          }
        })
      }, this.RESULT_CHECK_CYCLE)
    },
    handleAddMerchantSiteRedirectParam() {
      if (
        this.status == STATUS_RESULT_FAILURE ||
        this.status == STATUS_RESULT_SUCCESS
      ) {
        if (this.backUrl != null && this.isMetamaskBrowser) {
          history.pushState(
            {},
            null,
            this.$route.path + '?redirect=' + this.backUrl
          )
        }
      }
    },
    handleMerchantSiteRedirect() {
      if (this.$route.query.redirect) {
        window.open(this.$route.query.redirect, '_blank').focus()
      }
    },
    deleteOpenSafari() {
      this.openSafariFlg = false
    },
    showModal(target) {
      this.$store.dispatch('modal/show', {
        target: target,
        size: 'small',
        params: {
          message: 'This is dummy massage.'
        }
      })
    }
  },
  created() {
    this.$emit('updateProgressTotalSteps', 2)
    this.showDataInitialize()
    Decimal.set({ toExpNeg: -20 })
    this.apiGetTransaction().then((response) => {
      this.setApiResultData(response.data)
      this.handleMerchantSiteRedirect()
      this.handleAddMerchantSiteRedirectParam()
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

  &__transaction {
    margin-bottom: 2rem;
  }
  &__receivedToken {
    padding: 1rem;
    margin-bottom: 2rem;
  }
  &__button {
    margin-top: 2rem;
  }
}
// .opensafari {
//   position: fixed;
//   bottom: 1rem;
//   width: 90%;
//   left: 5%;
//   z-index: 1000;
//   @include font(12px, 400, 0.04em, 1.6, $en_go);
//   background-color: var(--Base3);
//   padding: 1rem;
//   border-radius: 1rem;
//   display: none;
//   @include media(sp) {
//     display: block;
//     bottom: 4rem;
//   }
//   .close {
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: 1.5rem;
//     height: 1.5rem;
//     background-color: var(--Base2);
//     border-radius: 100%;
//     transform: translate(0.5rem, -0.5rem);
//     cursor: pointer;
//     border: 1px solid var(--Border);
//     &::before,
//     &::after {
//       content: '';
//       display: block;
//       width: 1rem;
//       height: 1px;
//       position: absolute;
//       background-color: var(--Text);
//       top: 50%;
//       left: 50%;
//       transform-origin: center center;
//       transform: translate(-50%, -50%) rotate(45deg) scale(1, 1);
//     }
//     &::after {
//       transform: translate(-50%, -50%) rotate(-45deg) scale(1, 1);
//     }
//   }
// }
.opensafari {
  position: fixed;
  width: 90%;
  left: 5%;
  height: 80%;
  top: 10%;
  z-index: 1000;
  background-color: var(--Base3);
  padding: 1rem;
  border-radius: 1rem;
  @include font(12px, 400, 0.04em, 1.6, $en_go);
  // display: none;
  // @include media(sp) {
  //   display: block;
  //   bottom: 4rem;
  // }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 3rem;
    height: 3rem;
    background-color: var(--Base2);
    border-radius: 100%;
    transform: translate(0.5rem, -0.5rem);
    cursor: pointer;
    border: 1px solid var(--Border);
    &::before,
    &::after {
      content: '';
      display: block;
      width: 1rem;
      height: 1px;
      position: absolute;
      background-color: var(--Text);
      top: 50%;
      left: 50%;
      transform-origin: center center;
      transform: translate(-50%, -50%) rotate(45deg) scale(1, 1);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(-45deg) scale(1, 1);
    }
  }
}
</style>
