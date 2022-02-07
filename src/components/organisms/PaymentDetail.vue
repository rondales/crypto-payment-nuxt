<template>
  <div class="payment_handleprice">
    <div class="payment_handleprice-pricewrap">
      <div class="add-flex j-between billed a-center">
        <div class="add-flex j-between a-center">
          <figure>
            <img src="@/assets/images/usdt.png" alt="">
          </figure>
          <dl>
            <dt>
              Amount billed
            </dt>
            <dd>
              {{ paymentRequestSymbol }}
            </dd>
          </dl>
        </div>
        <div class="usdt-price">
          <p>
            {{ paymentRequestAmount }}
          </p>
        </div>
      </div>
      <div class="payment_detailwrap">
        <div class="payment_desc add-flex j-between mb-2">
          <p class="grd">
            Payment detail
          </p>
          <figure class="reload" @click="reload">
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/reload.svg">
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/reload-l.svg">
          </figure>
        </div>
        <div class="payment_detail add-flex j-between mb-1">
          <div class="payment_detail-name add-flex a-center mb-1">
            <figure>
              <img :src="userTokenIcon">
            </figure>
            <p>
              {{ userTokenSymbol }}
            </p>
          </div>
          <div class="payment_detail-value">
            <p>
              {{ userTokenPaymentAmount }}
            </p>
          </div>
        </div>
        <div class="payment-box" v-if="isDetailState && isExpiredExchange">
          <div class="add-flex a-center j-between">
            <div class="add-flex a-center">
              <img src="@/assets/images/warning.svg" alt="">
              <div class="payment-box_desc">
                <p>
                  Price Updated
                </p>
              </div>
            </div>
            <div class="payment-box_btn" @click="updateExchange">
              Accept
            </div>
          </div>
        </div>
        <div class="dattail-lists mt-1" v-if="isDetailState">
          <div class="dattail-list add-flex j-between mb-1">
            <p>Exchange Eate</p>
            <p>1USDT＝ {{ userTokenExchangeRate }}{{ userTokenSymbol }}<img src="@/assets/images/exchange.svg" alt=""></p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Route</p>
            <p>{{ tradeRoute }}</p>
          </div>
          <!--
          @todo Implement it when you are able to get various data from the contract
          <div class="dattail-list add-flex j-between mb-1">
            <p>Minimum received</p>
            <p>388.213 BUSD</p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Price Impact</p>
            <p>-9.29%</p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Liquidity Provider Fee</p>
            <p>0.002367 BNB</p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Slippage tolerance</p>
            <p>0.50%</p>
          </div>
          -->
          <div class="dattail-list add-flex j-between mb-2">
            <p>Platform Fee</p>
            <p>{{ platformFee }} {{ nativeTokenSymbol }}</p>
          </div>
          <p class="dattail-list_desc">
            Output is estimated. You will receive at least 1001.00 USDT or the transaction will revert.
          </p>
        </div>
        <div class="payment-status mt-3 mb-3" v-if="!isDetailState">
          <div v-if="isProcessingState">
            <img class="mb-2 spin" src="@/assets/images/loading.svg" alt="processing">
            <p class="payment-status_title">
              Waiting for Confimation
            </p>
            <p class="payment-status_desc mb-2">
              Pay 1000.00 USDT for 1000.00 USDT
            </p>
          </div>
          <div v-else-if="isSuccessedState">
            <img class="mb-2" src="@/assets/images/check.svg" alt="success">
            <p class="payment-status_title mb-1">
              Transaction Submitted
            </p>
          </div>
          <div v-else>
            <img class="mb-2" src="@/assets/images/multiply.svg" alt="failure">
            <p class="payment-status_desc mb-2">
              The transaction cannot succeed due to error: execution
              <br>
              reverted: PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT.
            </p>
          </div>
          <a href="/" class="payment-status_btn">
            View on explorer
            <img src="@/assets/images/link-icon.svg" alt="">
          </a>
        </div>
        <button :class="{inactive: isExpiredExchange}" class="btn __g __l mb-2" @click="pushData" v-if="isDetailState">
          Confirm Wallet
        </button>
        <button class="btn __g __l mb-2 inactive" v-else-if="isProcessingState">
          processing…
        </button>
        <button class="btn __g __l mb-2" @click="transitionSucceedUrl" v-else-if="isSuccessedState">
          Back to Payee’s Services
        </button>
        <button class="btn __g __l mb-2" @click="pushData" v-else>
          Try again
        </button>
        <p class="via">
          via Uniswap：Slash Payment
          <span>
            <img src="@/assets/images/slash-s.svg" alt="">
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { NETWORKS } from '@/constants'
import { BscTokens, EthereumTokens } from '@/contracts/tokens'
import { networkList } from '@/enum/network'
import { errorCodeList } from '@/enum/error_code'

export default {
  name: 'PaymentDetail',
  data() {
    return{
      pageStateList: {
        detail: 1,
        processing: 2,
        successed: 3,
        failured: 4
      },
      pageState: 1,
      expiredExchange: false,
      contract: {
        address: null,
        abi: null
      },
      returnUrls: {
        succeed: null,
        failured: null
      }
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    nativeTokenSymbol() {
      return NETWORKS[
        this.$store.state.web3.chainId
      ].symbol
    },
    paymentRequestSymbol() {
      return this.$store.state.payment.symbol
    },
    paymentRequestAmount() {
      return this.$store.state.payment.amount
    },
    userTokenSymbol() {
      return this.$store.state.payment.token.symbol
    },
    userTokenPaymentAmount() {
      return this.$store.state.payment.token.amount
    },
    userTokenExchangeRate() {
      return this.$store.state.payment.token.rate
    },
    userTokenIcon() {
      const chainId = this.$store.state.web3.chainId
      const symbol = this.$store.state.payment.token.symbol
      const tokens =
        NETWORKS[1].chainId === chainId || NETWORKS[3].chainId === chainId
        ? EthereumTokens
        : NETWORKS[56].chainId === chainId || NETWORKS[97].chainId === chainId
        ? BscTokens
        : null
      if (tokens !== null) {
        return symbol in tokens
          ? tokens[symbol].icon
          : require('@/assets/images/symbol/unknown.svg')
      } else {
        return require('@/assets/images/symbol/unknown.svg')
      }
    },
    tradeRoute() {
      const chainId = this.$store.state.web3.chainId
      const nativeTokenSymbols = [
        'ETH', 'BNB', 'MATIC', 'AVAX',
        'WETH', 'WBNB', 'WMATIC', 'WAVAX'
      ]
      let route = ''
      switch(chainId) {
        case NETWORKS[1].chainId:
        case NETWORKS[3].chainId:
          route = nativeTokenSymbols.includes(this.userTokenSymbol)
            ? `WETH ⇨ ${this.paymentRequestSymbol}`
            : `${this.userTokenSymbol} ⇨ WETH ⇨ ${this.paymentRequestSymbol}`
          break
        case NETWORKS[56].chainId:
        case NETWORKS[97].chainId:
          route = nativeTokenSymbols.includes(this.userTokenSymbol)
            ? `WBNB ⇨ ${this.paymentRequestSymbol}`
            : `${this.userTokenSymbol} ⇨ WBNB ⇨ ${this.paymentRequestSymbol}`
          break
        case NETWORKS[137].chainId:
        case NETWORKS[80001].chainId:
          route = nativeTokenSymbols.includes(this.userTokenSymbol)
            ? `WMATIC ⇨ ${this.paymentRequestSymbol}`
            : `${this.userTokenSymbol} ⇨ WMATIC ⇨ ${this.paymentRequestSymbol}`
          break
        case NETWORKS[43114].chainId:
        case NETWORKS[43113].chainId:
          route = nativeTokenSymbols.includes(this.userTokenSymbol)
            ? `WAVAX ⇨ ${this.paymentRequestSymbol}`
            : `${this.userTokenSymbol} ⇨ WAVAX ⇨ ${this.paymentRequestSymbol}`
          break
      }
      return route
    },
    platformFee() {
      return this.$store.state.payment.fee
    },
    isDetailState() {
      return this.pageState === this.pageStateList.detail
    },
    isProcessingState() {
      return this.pageState === this.pageStateList.processing
    },
    isSuccessedState() {
      return this.pageState === this.pageStateList.successed
    },
    isFailuredState() {
      return this.pageState === this.pageStateList.failured
    },
    isExpiredExchange() {
      return this.expiredExchange
    },
  },
  methods: {
    apiGetContract() {
      const url = `${this.baseUrl}/api/v1/payment/contract`
      const request = { params: new URLSearchParams([
        ['payment_token', this.$route.params.token],
        ['network_type', this.$store.state.web3.chainId]
      ])}
      return this.axios.get(url, request)
    },
    apiGetPaymentCompletedUrl() {
      const url = `${this.baseUrl}/api/v1/payment/setting`
      const request = { params: new URLSearchParams([
        ['payment_token', this.$route.params.token]
      ])}
      return this.axios.get(url, request)
    },
    reload(){
      location.reload();
    },
    exchangeExpireTimer() {
      this.timer = setTimeout(() => {
        this.expiredExchange = true;
      }, 60000);
    },
    updateExchange() {
      this.$web3.getTokenExchangeData(
        this.$store.state.web3.instance,
        this.$store.state.web3.chainId,
        this.$store.state.account.address,
        this.contract,
        this.$store.state.payment.token,
        this.paymentRequestTokenAmount
      ).then((exchange) => {
        this.$store.dispatch('payment/updateFee', exchange.fee)
        this.$store.dispatch('payment/updateToken', {
          amount: exchange.requireAmount,
          rate: exchange.rate
        })
        this.equivalent = exchange.equivalentAmount
        this.requireAmount = exchange.requireAmount
        this.exchangeRate = exchange.rate
        if (!this.timer) clearTimeout(this.timer)
        this.expiredExchange = false
        this.loadedExchange = true
        this.exchangeExpireTimer()
      })
    },
    transitionSucceedUrl() {
      window.location = this.returnUrls.succeed
    },
    pushData(){
      // @todo Update the transaction after approval in Metamask
      const params = {
        payment_token: this.$route.params.token,
        network_type: networkList[this.$store.state.connection.networkId].type,
        contract_address: this.contract.address,
        wallet_address: this.$store.state.connection.walletAddress,
        pay_symbol: this.$store.state.payment.token.symbol,
        pay_amount: this.$store.state.payment.token.amount
      }
      this.apiUpdateTransaction(params).catch((error) => {
        let message
        if ('errors' in error.response.data) {
          message = errorCodeList[error.response.data.errors.shift()].msg
        } else {
          message = 'Please reapply for payment again.'
        }
        this.showErrorModal(message)
      })
    },
    apiUpdateTransaction(params) {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/payment/transaction'
      return this.axios.patch(url, params)
    },
    updateTransactionForComplete() {
      // @todo Set the transaction address returned from the blockchain to "transaction_address" in "params"
      const params = {
        payment_token: this.$route.params.token,
        transaction_address: 'test_transaction_address'
      }

      this.apiUpdateTransaction(params).catch((error) => {
        let message
        if ('errors' in error.response.data) {
          message = errorCodeList[error.response.data.errors.shift()].msg
        } else {
          message = 'Please reapply for payment again.'
        }
        this.showErrorModal(message)
      })
    },
    showErrorModal(message) {
      this.$store.dispatch('openModal', {
        target: 'error-modal',
        size: 'small',
        message: message
      })
    }
  },
  created(){
    this.$store.dispatch('payment/update', {
      domain: this.$route.query.receiver,
      orderCode: this.$route.query.code,
      symbol: this.$route.query.symbol,
      amount: this.$route.query.amount
    })
    this.apiGetPaymentCompletedUrl().then((response) => {
      this.returnUrls.succeed = response.data.succeeded_return_url
      this.returnUrls.failured = response.data.failured_return_url
    })
    this.apiGetContract().then((response) => {
      this.contract.address = response.data.address
      this.contract.abi = JSON.parse(response.data.args)
      this.exchangeExpireTimer()
    })
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

  .dattail-lists{
    .dattail-list{
      p{
        font-size: 11px;
        font-weight: 100;
        img{
          margin-left: 8px;
        }
      }
    }
    .dattail-list_desc{
      font-size: 11px;
      font-weight: 100;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
  }
  .reload{
    cursor: pointer;
    img{
      vertical-align: middle;
    }
  }
  .payment_detail{
    &-name{
      p{
        font-size: 16px;
        font-weight: 100;
        line-height: 25px;
        margin-left: 7px;
      }
      figure {
        width: 25px;
        height: 25px;
      }
    }
    &-value{
      font-size: 20px;
      font-weight: 100;
      margin-left: 16px;
    }
  }
  .payment-status{
    text-align: center;
    margin: auto;
    &_title{
      font-size: 18px;
      font-weight: 100;
    }
    &_desc{
      font-size: 10px;
      font-weight: 100;
    }
    &_btn{
      font-size: 12px;
      font-weight: 100;
      cursor: pointer;
      background: $gradation-pale;
      padding: 4px 16px;
      border-radius: 12px;
      color: #fff;
      img{
        vertical-align: middle;
      }
    }
  }
  .via{
    font-size: 12px;
    font-weight: 100;
    text-align: center;
    line-height: 20px;
    img{
      width: 20px;
      height: 20px;
      margin-left: 5px;
    }
  }
}
</style>