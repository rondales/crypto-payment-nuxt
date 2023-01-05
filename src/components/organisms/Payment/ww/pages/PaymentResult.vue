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
      v-if="isStatusProcessing || isStatusSucceeded || isStatusFailured"
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
    <p class="title" v-if="isCancelledByMerchant">This payment has been cancelled, 
      please contact the Merchant for more information.
      <br>
      <br>
      Payment Token: {{ this.$route.params.token }}
    </p>
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

    <PaymentButton v-if="isStatusSucceeded || isStatusFailured"
      class="result__button"
      text="Back to Payee’s Services"
      @click.native="closeWidgetWindow"
      color="primary"
      layout="reverse"
      size="l"
    />

    <!-- 下部バナーの時 -->
    <div v-if="shouldShowNavigateBanner" class="openOriginalBrowser">
      <div class="close" @click="deleteOpenOriginalBrowser"></div>
      <img
        class="image"
        src="@/assets/images/openbrowser.png"
        alt="Open Browser"
      />
      <span
        >Switching back to Safari or Chrome browsers from Web3 Mobile Apps
        browsers such as Metamask or Coinbase Wallet will need to be done by
        you.</span
      >
    </div>
  </div>
</template>

<script>
import PaymentAmountBilled from '@/components/organisms/Payment/ww/fragments/AmountBilled'
import PaymentTitle from '@/components/organisms/Payment/ww/fragments/Title'
import PaymentButton from '@/components/organisms/Payment/ww/fragments/Button'
import PaymentReceipt from '@/components/organisms/Payment/ww/fragments/Receipt'
import PaymentTransaction from '@/components/organisms/Payment/ww/fragments/Transaction'
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
  AvalancheTokens as AvalacheReceiveTokens,
  DogeTokens as DogeReceiveTokens,
  AstrTokens as AstrReceiveTokens
} from '@/contracts/receive_tokens'
import {
  EthereumTokens as EthereumDefaultTokens,
  BscTokens as BscDefaultTokens,
  MaticTokens as MaticDefaultTokens,
  AvalancheTokens as AvalancheDefaultTokens,
  DogeTokens as DogeDefaultTokens,
  AstrTokens as AstrDefaultTokens
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
      status: null,
      isCancelledByMerchant: false,
      transactionType: 'loading',
      transactionTitle: 'Waiting for tx result',
      resultPollingTimer: null,
      openOriginalBrowserFlg: true
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
      }
      if (newStatus === STATUS_RESULT_FAILURE) {
        this.transactionType = 'dismiss'
        this.transactionTitle = 'Invalid Transaction'
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
    RECEIVED_TOKEN_ICON_PATH() {
      return {
        USDT: 'crypto_currency/received_token/usdt',
        USDC: 'crypto_currency/received_token/usdc',
        DAI: 'crypto_currency/received_token/dai',
        JPYC: 'crypto_currency/received_token/jpyc',
        WETH: 'crypto_currency/received_token/weth',
        ETH: 'crypto_currency/received_token/eth',
        BNB: 'crypto_currency/received_token/bnb',
        MATIC: 'crypto_currency/received_token/matic',
        AVAX: 'crypto_currency/received_token/avax',
        DOGE: 'crypto_currency/received_token/doge',
        ASTR: 'crypto_currency/received_token/astr'
      }
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
      } else if (this.isPaidDoge) {
        return DogeReceiveTokens
      } else if (this.isPaidAstr) {
        return AstrReceiveTokens
      } else {
        return {}
>>>>>>> add stg astar
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
      } else if (this.isPaidDoge) {
        return DogeDefaultTokens
      } else if (this.isPaidAstr) {
        return AstrDefaultTokens
      } else {
        return null
      }
    },
    merchantReceiveTokenIcon() {
      return this.RECEIVED_TOKEN_ICON_PATH[this.$store.state.payment.symbol] 
        ? this.RECEIVED_TOKEN_ICON_PATH[this.$store.state.payment.symbol] 
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
    isPaidDoge() {
      return (
        this.chainId === NETWORKS[568].chainId ||
        this.chainId === NETWORKS[2000].chainId
      )
    },
    isPaidAstr() {
      return (
        this.chainId === NETWORKS[592].chainId ||
        this.chainId === NETWORKS[81].chainId
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
    },
    shouldShowNavigateBanner() {
      return this.openOriginalBrowserFlg 
        && (this.isStatusSucceeded || this.isStatusFailured)
        && this.isMetamaskBrowser
    },
    transactionText() {
      let transactionText = ''
      if (this.isStatusProcessing) {
        transactionText = `Pay ${this.filterAmount(this.userPaidAmount)}${
            this.userPaidSymbol
          } for ${this.filterAmount(this.merchantReceiveAmount)}${
            this.merchantReceiveSymbol
          }`
      } else if (this.isStatusFailured) {
        transactionText = 'Check the transaction in Explorer.'
      }
      return transactionText
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
      this.isCancelledByMerchant = data.is_cancelled
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
      this.apiGetTransaction().then((response) => {
        this.setApiResultData(response.data)
        this.handleAddMerchantSiteRedirectParam()
        if(response.data.status == STATUS_RESULT_FAILURE || response.data.is_cancelled) {
          this.sendFixPaymentToParentWindow(2, {payment_token: this.$route.params.token})
          clearTimeout(this.resultPollingTimer)
        }
        if(response.data.status == STATUS_RESULT_SUCCESS) {
          this.sendFixPaymentToParentWindow(1, {payment_token: this.$route.params.token})
          clearTimeout(this.resultPollingTimer)
        }
      })
      this.resultPollingTimer = setTimeout(this.pollingTransactionResult, this.RESULT_CHECK_CYCLE)
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
    deleteOpenOriginalBrowser() {
      this.openOriginalBrowserFlg = false
    },
    showModal(target) {
      this.$store.dispatch('modal/show', {
        target: target,
        size: 'small',
        params: {
          message: 'This is dummy massage.'
        }
      })
    },
    filterAmount(amount) {
      return Decimal(amount).toString()
    },
    closeWidgetWindow() {
      window.close()
    },
    /**
     * call to Call on the payment completion screen
     * @param status number 1: success, 2: failed
     * @param params Object payment params
     */
    sendFixPaymentToParentWindow(status, params) {
      if(!window.opener) return;

      window.opener.postMessage({
        action: 'fixPayment',
        value: {paymentStatus: status, optParams: params}
      }, this.$store.state.wwPayment.parentOrigin);
    }
  },
  created() {
    this.$emit('updateProgressTotalSteps', 2)
    this.showDataInitialize()
    Decimal.set({ toExpNeg: -20 })
    this.pollingTransactionResult()
    this.handleMerchantSiteRedirect()
    setTimeout(() => {
      this.$emit('updateInitializingStatus', false)
    }, 1500)
  },
  beforeDestroy() {
    clearTimeout(this.resultPollingTimer)
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

.title {
    margin-bottom: 1rem;
    @include font(1rem, 400, $ls, $lh, $en_go);
    text-align: center;
    color: var(--Text);
    // br {
    // display: none;
    // @include media(sp) {
    //   display: block;
    // }
    // }
  }
.openOriginalBrowser {
  @include flex(center, center);
  gap: 1rem;
  position: fixed;
  width: 90%;
  left: 5%;
  // height: 80%;
  bottom: 3rem;
  z-index: 1000;
  background-color: var(--Base3);
  padding: 1rem;
  border-radius: 1rem;

  @include font(11px, 400, 0.04em, 1.6, $en_go);
  // display: none;
  // @include media(sp) {
  //   display: block;
  //   bottom: 4rem;
  // }
  img {
    width: 40%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
  span {
    flex: 1;
  }
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
