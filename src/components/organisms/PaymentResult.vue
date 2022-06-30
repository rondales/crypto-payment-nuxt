<template>
  <div class="payment_handleprice">
    <div class="payment_handleprice-pricewrap">
      <div class="add-flex j-between billed a-center">
        <div class="add-flex j-between a-center">
          <figure>
            <img :src="merchantReceiveTokenIcon" :alt="merchantReceiveSymbol">
          </figure>
          <dl>
            <dt>
              Amount billed
            </dt>
            <dd>
              {{ merchantReceiveSymbol }}
            </dd>
          </dl>
        </div>
        <div class="usdt-price">
          <p>
            {{ merchantReceiveAmount | amountFormat }}
          </p>
        </div>
      </div>
      <div class="payment_detailwrap">
        <div class="payment_desc add-flex j-between mb-2">
          <p class="grd">
            Payment detail
          </p>
        </div>
        <div class="payment_detail add-flex j-between mb-1">
          <div class="payment_detail-name add-flex a-center mb-1">
            <figure>
              <img :src="userPaidTokenIcon" :alt="userPaidSymbol">
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
        <pending v-if="isStatusProcessing" :urls="linkUrlData" :transaction="transactionData" />
        <failure v-else-if="isStatusFailured" :urls="linkUrlData" :isReceiptMode="isReceiptMode" />
        <success v-else :urls="linkUrlData" :token="paymentToken" :isReceiptMode="isReceiptMode" />
      </div>
    </div>
  </div>
</template>

<script>
import { Decimal as BigJs } from 'decimal.js'
import ResultPending from '@/components/organisms/PaymentResultPending'
import ResultFailure from '@/components/organisms/PaymentResultFailure'
import ResultSuccess from '@/components/organisms/PaymentResultSuccess'
import {
  NETWORKS,
  STATUS_PROCESSING,
  STATUS_RESULT_FAILURE,
  STATUS_RESULT_SUCCESS
} from '@/constants'
import {
  EthereumTokens as EthereumDefaultTokens,
  BscTokens as BscDefaultTokens,
  MaticTokens as MaticDefaultTokens,
  AvalancheTokens as AvalancheDefaultTokens
} from '@/contracts/tokens'

export default {
  name: 'PaymentResult',
  components: {
    'pending': ResultPending,
    'failure': ResultFailure,
    'success': ResultSuccess
  },
  data() {
    return {
      chainId: null,
      merchantReceiveAmount: '0',
      merchantReceiveSymbol: null,
      userPaidAmount: '0',
      userPaidSymbol: null,
      transactionHash: null,
      successReturnUrl: null,
      failureReturnUrl: null,
      status: STATUS_PROCESSING,
      resultPollingTimer: null,
      merchantReceiveTokenIcons: {
        USDT: require('@/assets/images/symbol/usdt.svg'),
        USDC: require('@/assets/images/symbol/usdc.svg'),
        DAI: require('@/assets/images/symbol/dai.svg'),
        JPYC: require('@/assets/images/symbol/jpyc.svg')
      }
    }
  },
  filters: {
    amountFormat(amount) {
      return new BigJs(amount).toString()
    },
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    RESULT_CHECK_CYCLE() {
      return 5000
    },
    paymentToken() {
      return this.$route.params.token
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
      return this.merchantReceiveTokenIcons[this.merchantReceiveSymbol]
    },
    userPaidTokenIcon() {
      const tokens = this.paidNetworkDefaultTokens
      if (tokens) {
        return this.userPaidSymbol in tokens
          ? tokens[this.userPaidSymbol].icon
          : require('@/assets/images/symbol/unknown.svg')
      } else {
        return require('@/assets/images/symbol/unknown.svg')
      }
    },
    transactionData() {
      return {
        merchantReceiveAmount: this.merchantReceiveAmount,
        merchantReceiveSymbol: this.merchantReceiveSymbol,
        userPaidAmount: this.userPaidAmount,
        userPaidSymbol: this.userPaidSymbol
      }
    },
    linkUrlData() {
      const scanSiteUrl = this.chainId !== null
        ? NETWORKS[this.chainId].scanUrl
        : ''
      return {
        explorer: `${scanSiteUrl}/tx/${this.transactionHash}`,
        success: this.successReturnUrl,
        failure: this.failureReturnUrl
      }
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
      return this.chainId === NETWORKS[1].chainId
        || this.chainId === NETWORKS[5].chainId
    },
    isPaidBinance() {
      return this.chainId === NETWORKS[56].chainId
        || this.chainId === NETWORKS[97].chainId
    },
    isPaidMatic() {
      return this.chainId === NETWORKS[137].chainId
        || this.chainId === NETWORKS[80001].chainId
    },
    isPaidAvalanche() {
      return this.chainId === NETWORKS[43114].chainId
        || this.chainId === NETWORKS[43113].chainId
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
    apiReceiveData() {
      const url = `${this.API_BASE_URL}/api/v1/payment`
      const params = new URLSearchParams([['payment_token', this.paymentToken]])
      return this.axios.get(url, { params })
    },
    apiGetTransactionStatus() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction/status`
      const request = {
        params: new URLSearchParams([['payment_token', this.paymentToken]])
      }
      return this.axios.get(url, request)
    },
    showDataInitialize() {
      this.chainId = this.$store.state.web3.chainId
      this.merchantReceiveAmount = this.$store.state.payment.amount !== null
        ? this.$store.state.payment.amount
        : '0'
      this.merchantReceiveSymbol = this.$store.state.payment.symbol
      this.userPaidAmount = this.$store.state.payment.token.amount !== null
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
      this.transactionHash = data.transaction_address
      this.successReturnUrl = data.succeeded_return_url
      this.failureReturnUrl = data.failured_return_url
    },
    pollingTransactionResult() {
      this.resultPollingTimer = setInterval(() => {
        this.apiGetTransactionStatus().then((response) => {
          this.status = response.data.status
          const stopTimerStatuses = [STATUS_RESULT_FAILURE, STATUS_RESULT_SUCCESS]
          if (stopTimerStatuses.includes(response.data.status)) {
            clearInterval(this.resultPollingTimer)
          }
        })
      }, this.RESULT_CHECK_CYCLE)
    }
  },
  created(){
    this.showDataInitialize()
    this.apiGetTransaction().then((response) => {
      this.setApiResultData(response.data)
      if (this.isStatusProcessing) {
        this.pollingTransactionResult()
      }
    })
    this.apiReceiveData().then((receiveResponse) => {
      this.$store.dispatch('payment/update', {
        domain: receiveResponse.data.domain,
        orderCode: receiveResponse.data.order_code,
        isVerifiedDomain: Boolean(receiveResponse.data.is_verified_domain),
        merchantWalletAddress: receiveResponse.data.merchant_wallet_address,
      })
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

.payment_handleprice{
  width: 100%;
  dl{
    dt{
      font-weight: 400;
      font-size: 15px;
    }
  }

  .payment_desc{
    p{
      background: $gradation-pale;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
  }
  .payment_handleprice-pricewrap{
    width: 100%;
  }
  .payment_handleprice-price{
    padding: 0;
    width: 100%;
    min-width: auto;
  }
  .billed{
    padding-bottom: 16px;
    margin:24px 0 16px;
    border-bottom: 1px solid #78668D;
    figure{
      img{
        height: 46px;
        width: 46px;
        border-radius: 50%;
      }
    }
    dl{
      margin-left: 16px;
      dt{
        font-size: 10px;
        font-weight: 100;
      }
      dd{
        font-size: 18px;
        font-weight: 300;
      }
    }
  }

  .payment_detail{
    &-name{
      p{
        font-size: 16px;
        font-weight: 400;
        line-height: 25px;
        margin-left: 7px;
      }
      figure {
        width: 25px;
        height: 25px;
        img{
          vertical-align: baseline;
        }
      }
    }
    &-value{
      font-size: 20px;
      font-weight: 100;
      margin-left: 16px;
    }
  }
}
</style>