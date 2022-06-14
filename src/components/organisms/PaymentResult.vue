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
            {{ merchantReceiveAmount }}
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
              {{ userPaidAmount }}
            </p>
          </div>
        </div>
        <pending v-if="isProcessingState" :urls="linkUrlData" :transaction="transactionData" />
        <failure v-else-if="isFailuredState" :urls="linkUrlData" />
        <success v-else :urls="linkUrlData" :token="paymentToken" />
      </div>
    </div>
  </div>
</template>

<script>
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
      merchantReceiveAmount: null,
      merchantReceiveSymbol: null,
      userPaidAmount: null,
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
      const scanSiteUrl = NETWORKS[this.chainId].scanUrl
      return {
        explorer: `${scanSiteUrl}/address/${this.transactionHash}`,
        success: this.successReturnUrl,
        failure: this.failureReturnUrl
      }
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
      return this.chainId === NETWORKS[0].chainId
        || this.chainId === NETWORKS[3].chainId
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
      return this.axios.get(url, { payment_token: this.paymentToken })
    },
    apiGetTransactionStatus() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction/status`
      return this.axios.get(url, { payment_token: this.paymentToken })
    },
    showDataInitialize() {
      this.chainId = this.$store.state.web3.chainId
      this.merchantReceiveAmount = this.$store.state.payment.amount
      this.merchantReceiveSymbol = this.$store.state.payment.symbol
      this.userPaidAmount = this.$store.state.payment.token.amount
      this.userPaidSymbol = this.$store.state.payment.token.symbol
      this.transactionHash = this.$store.state.payment.transactionHash
    },
    setApiResultData(data) {
      this.chainId = data.network_type
      this.merchantReceiveAmount = data.base_amount
      this.merchantReceiveSymbol = data.base_symbol
      this.userPaidAmount = data.base_amount
      this.userPaidSymbol = data.base_symbol
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
  },
  beforeDestroy() {
    clearInterval(this.resultPollingTimer)
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