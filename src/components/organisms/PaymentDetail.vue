<template>
  <div class="payment_handleprice">
    <div class="payment_handleprice-pricewrap">
      <div class="add-flex j-between billed a-center">
        <div class="add-flex j-between a-center">
          <figure>
            <img :src="receiveTokenIcon" alt="">
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
          <figure v-if="isDetailState" class="reload" @click="reload">
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
            <p>Exchange Rate</p>
            <p>1 {{ paymentRequestSymbol }} ＝ {{ userTokenExchangeRate }} {{ userTokenSymbol }}<img src="@/assets/images/exchange.svg" alt=""></p>
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
          -->
          <div v-if="isDifferentToken" class="dattail-list add-flex j-between mb-1">
            <p>Slippage tolerance</p>
            <p>{{ slippageTolerance }}%</p>
          </div>
          <div class="dattail-list add-flex j-between mb-2">
            <p>Platform Fee</p>
            <p>{{ platformFee }} {{ nativeTokenSymbol }}</p>
          </div>
          <p class="dattail-list_desc">
            Output is estimated. You will receive at least {{ paymentRequestAmount }} {{ paymentRequestSymbol }} or the transaction will revert.
          </p>
        </div>
        <div class="payment-status mt-3 mb-3" v-if="!isDetailState">
          <div v-if="isProcessingState">
            <img class="mb-2 spin" src="@/assets/images/loading.svg" alt="processing">
            <p class="payment-status_title">
              Waiting for Confimation
            </p>
            <p class="payment-status_desc mb-2">
              Pay {{ userTokenPaymentAmount }} {{ userTokenSymbol }} for {{ paymentRequestAmount }} {{ paymentRequestSymbol }}
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
              Check the reason for the reverted from Explorer.
            </p>
          </div>
          <a
            v-if="isProcessingState 
            || (isSuccessedState && hasSuccessReturnUrl)
            || (isFailuredState && hasFailureReturnUrl)"
            class="payment-status_btn"
            target="_blank"
            :href="transactionUrl"
          >
            View on explorer
            <img src="@/assets/images/link-icon.svg" alt="">
          </a>
        </div>
        <button
          v-if="isDetailState"
          class="btn __g __l mb-2"
          :class="{inactive: isExpiredExchange || isWalletPending}"
          @click="payment"
        >
          Confirm Wallet
          <div class="loading-wrap" :class="{active: isWalletPending}">
            <img class="spin" src="@/assets/images/loading.svg">
          </div>
        </button>
        <button
          v-else-if="isProcessingState"
          class="btn __g __l mb-2 inactive"
        >
          processing…
        </button>
        <button
          v-else-if="(isSuccessedState && hasSuccessReturnUrl) || (isFailuredState && hasFailureReturnUrl)"
          class="btn __g __l mb-2"
          @click="backToMerchant"
        >
          Back to Payee’s Services
        </button>
        <a
          v-else
          :href="transactionUrl"
          target="_blank"
        >
          <button class="btn __g __l mb-2">
            View on explorer
            <img class="new-tab-icon" src="@/assets/images/link-icon.svg" alt="">
          </button>
        </a>
        <p class="via" v-if="isDetailState || isProcessingState">
          via Slash Payment
          <span>
            <img src="@/assets/images/slash-s.svg" alt="">
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VuexRestore from '@/components/mixins/VuexRestore'
import {
  NETWORKS,
  STATUS_PUBLISHED,
  STATUS_PROCESSING,
  STATUS_RESULT_FAILURE,
  STATUS_RESULT_SUCCESS,
  MERCHANT_NEW_TRANSACTION,
  MERCHANT_NEW_TRANSACTION_PARAM_LIST
} from '@/constants'
import {
  BscTokens,
  EthereumTokens,
  MaticTokens,
  AvalancheTokens
} from '@/contracts/tokens'
import {
  BscTokens as BscReceiveTokens,
  EthereumTokens as EthereumReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalacheReceiveTokens
} from '@/contracts/receive_tokens'

export default {
  name: 'PaymentDetail',
  mixins: [VuexRestore],
  data() {
    return{
      pageStateList: {
        detail: 1,
        processing: 2,
        successed: 3,
        failured: 4
      },
      pageState: 1,
      monitoringInterval: null,
      exchangeTimer: null,
      expiredExchange: false,
      refundedTokenAmount: null,
      refundedFeeAmount: null,
      contract: {
        address: null,
        abi: null
      },
      returnUrls: {
        succeed: null,
        failured: null
      },
      receiveTokenIcons: {
        USDT: require('@/assets/images/symbol/usdt.svg'),
        USDC: require('@/assets/images/symbol/usdc.svg'),
        DAI: require('@/assets/images/symbol/dai.svg'),
        JPYC: require('@/assets/images/symbol/jpyc.svg')
      }
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    slippageTolerance() {
      return process.env.VUE_APP_PAYMENT_SLIPPAGE_TOLERANCE
    },
    web3Instance() {
      return this.$store.state.web3.instance
    },
    transactionUrl() {
      const chainId = this.$store.state.web3.chainId
      const transactionHash = this.$store.state.payment.transactionHash
      const scanSiteUrl = NETWORKS[chainId].scanUrl
      if (transactionHash) {
        return `${scanSiteUrl}/tx/${transactionHash}`
      } else {
        return ''
      }
    },
    nativeTokenSymbol() {
      return this.$store.state.web3.chainId
        ? NETWORKS[this.$store.state.web3.chainId].symbol
        : ''
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[
        this.$store.state.payment.symbol
      ]
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
        : NETWORKS[137].chainId === chainId || NETWORKS[80001].chainId === chainId
        ? MaticTokens
        : NETWORKS[43113].chainId === chainId || NETWORKS[43114].chainId === chainId
        ? AvalancheTokens
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
      if (!this.isDifferentToken) return this.paymentRequestSymbol;
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
    paymentToken() {
      return this.$route.params.token
    },
    paymentStatus() {
      return this.$store.state.payment.status
    },
    transactionHash() {
      return this.$store.state.payment.transactionHash
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
    isPublishedTransactionHash() {
      return (this.transactionHash)
    },
    isDifferentToken() {
      let receiveToken
      switch(this.$store.state.web3.chainId) {
        case NETWORKS[1].chainId:
        case NETWORKS[3].chainId:
          receiveToken = EthereumReceiveTokens[this.paymentRequestSymbol]
          break
        case NETWORKS[56].chainId:
        case NETWORKS[97].chainId:
          receiveToken = BscReceiveTokens[this.paymentRequestSymbol]
          break
        case NETWORKS[137].chainId:
        case NETWORKS[80001].chainId:
          receiveToken = MaticReceiveTokens[this.paymentRequestSymbol]
          break
        case NETWORKS[43113].chainId:
        case NETWORKS[43114].chainId:
          receiveToken = AvalacheReceiveTokens[this.paymentRequestSymbol]
      }
      const receiveTokenAddress = receiveToken.address.toLowerCase()
      const paymentTokenAddress = this.$store.state.payment.token.address
        ? this.$store.state.payment.token.address.toLowerCase()
        : ''
      return receiveTokenAddress !== paymentTokenAddress
    },
    hasSuccessReturnUrl() {
      return this.returnUrls.succeed != null
    },
    hasFailureReturnUrl() {
      return this.returnUrls.failured != null
    },
    isWalletPending() {
      return this.$store.state.payment.walletPending
    }
  },
  watch: {
    refundedFeeAmount() {
      this.$store.dispatch('modal/show', {
        target: 'refund-info-modal',
        size: 'small',
        params: {
          refundedTokenAmount: this.refundedTokenAmount,
          refundedFeeAmount: this.refundedFeeAmount,
          refundedFeeSymbol: this.nativeTokenSymbol
        }
      })
    }
  },
  methods: {
    apiGetTransaction() {
      const url = `${this.baseUrl}/api/v1/payment/transaction`
      const request = { params: new URLSearchParams([
        ['payment_token', this.$route.params.token]
      ])}
      return this.axios.get(url, request)
    },
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
    apiUpdateTransaction(params) {
      const url = `${this.baseUrl}/api/v1/payment/transaction`
      return this.axios.patch(url, params)
    },
    reload() {
      const tokenContract = this.$web3.getTokenContract(
        this.$store.state.web3.instance,
        this.$store.state.web3.chainId,
        this.$store.state.payment.token.address
      )
      this.$web3.getBalance(
        this.$store.state.web3.instance,
        this.$store.state.account.address,
        tokenContract
      ).then((balance) => {
        this.$store.dispatch('payment/updateToken', {
          balance: balance
        })
        this.updateExchange()
      })
    },
    exchangeExpireTimer() {
      this.exchangeTimer = setTimeout(() => {
        this.expiredExchange = true;
      }, 30000);
    },
    updateExchange() {
      this.$web3.getTokenExchangeData(
        this.$store.state.web3.instance,
        this.$store.state.web3.chainId,
        this.$store.state.account.address,
        this.contract,
        this.$store.state.payment.token,
        this.paymentRequestSymbol,
        this.paymentRequestAmount,
        this.slippageTolerance
      ).then((exchange) => {
        this.$store.dispatch('payment/updateFee', exchange.fee)
        this.$store.dispatch('payment/updateDecimalUnit', exchange.requestTokenDecimal)
        this.$store.dispatch('payment/updateToken', {
          amount: exchange.requireAmount,
          rate: exchange.rate
        })
        this.$store.dispatch('payment/updateAmountWei', exchange.requestAmountWei)
        this.equivalent = exchange.equivalentAmount
        this.requireAmount = exchange.requireAmount
        this.exchangeRate = exchange.rate
        if (!this.timer) clearTimeout(this.timer)
        this.expiredExchange = false
        this.loadedExchange = true
        this.exchangeExpireTimer()
      })
    },
    backToMerchant() {
      window.location = this.isSuccessedState
        ? this.returnUrls.succeed
        : this.returnUrls.failured
    },
    payment() {
      this.$store.dispatch('wallet/updatePendingStatus', true)
      clearTimeout(this.exchangeTimer)
      if(this.$store.state.payment.token.address == null) {
        this.handleSendTransaction()
      } else {
        this.checkContractApproved().then((approved) => {
          if (approved) {
            this.handleSendTransaction()
          } else {
            this.contractApprove().then((receipt) => {
              if (receipt.status == true) {
                this.handleSendTransaction()
              } else {
                this.$store.dispatch('payment/updateStatus', STATUS_RESULT_FAILURE)
                this.pageState = this.pageStateList.failured
                this.$store.dispatch('wallet/updatePendingStatus', false)
              }
            }).catch(error => {
              if(error.code == '4001') {this.$store.dispatch('wallet/updatePendingStatus', false)}
            }) 
          }
        })
      }
    },
    handleSendTransaction(){
      this.sendTransaction().on('transactionHash', (transactionHash) => {
        this.$store.dispatch('payment/updateStatus', STATUS_PROCESSING)
        this.pageState = this.pageStateList.processing
        this.$store.dispatch('payment/updateTransactionHash', transactionHash)
        this.apiUpdateTransaction({
          payment_token: this.$route.params.token,
          network_type: this.$store.state.web3.chainId,
          contract_address: this.contract.address,
          transaction_address: transactionHash,
          wallet_address: this.$store.state.account.address,
          pay_symbol: this.userTokenSymbol,
          pay_amount: this.userTokenPaymentAmount
        }).then(() => {
          this.checkTransactionStatus(transactionHash)
        })
      }).on('error', (error) => {
        if (error.code == '4001') {
          this.$store.dispatch('payment/updateStatus', STATUS_PUBLISHED)
          this.pageState = this.pageStateList.detail
          this.$store.dispatch('wallet/updatePendingStatus', false)
        }
      }).then((txReceipt) => {
        this.$store.dispatch('wallet/updatePendingStatus', false)
        const events = Object.values(txReceipt.events)
        const result = this.getRefundInfo(events)
        this.refundedTokenAmount = result.refundedTokenAmount
        this.refundedFeeAmount = result.refundedFeeAmount
      })
    },
    getRefundInfo(events) {
      const eventName = MERCHANT_NEW_TRANSACTION
      const eventParams = MERCHANT_NEW_TRANSACTION_PARAM_LIST 
      const result = this.$web3.getEventLog(this.$store.state.web3.instance, eventName, eventParams, events)
      const tokenDecimalUnit = this.$store.state.payment.decimalUnit
      const tokenWeiUnit = this.$web3.getTokenUnit(tokenDecimalUnit)
      const refundTokenInWei = result[6]
      const refundedTokenAmount = this.$store.state.web3.instance.utils.fromWei(refundTokenInWei, tokenWeiUnit)
      const refundedFeeAmount =  this.$store.state.web3.instance.utils.fromWei(result[7], 'ether')
      return {
        refundedTokenAmount: refundedTokenAmount,
        refundedFeeAmount: refundedFeeAmount
      }
    },
    checkContractApproved() {
      return this.$web3.checkTokenApproved(
        this.$store.state.web3.instance,
        this.$store.state.web3.chainId,
        this.$store.state.account.address,
        this.contract,
        this.$store.state.payment.token
      )
    },
    contractApprove() {
      return this.$web3.tokenApprove(
        this.$store.state.web3.instance,
        this.$store.state.web3.chainId,
        this.$store.state.account.address,
        this.contract,
        this.$store.state.payment.token
      )
    },
    sendTransaction() {
      return this.$web3.sendPaymentTransaction(
        this.$store.state.web3.instance,
        this.$store.state.web3.chainId,
        this.$store.state.account.address,
        this.contract,
        this.$store.state.payment.token,
        this.userTokenPaymentAmount,
        this.$store.state.payment.fee,
        this.$store.state.payment.amountWei
      )
    },
    checkTransactionStatus(transactionHash) {
      this.monitoringInterval = setInterval(() => {
        this.$web3.monitoringTransaction(
          this.$store.state.web3.instance,
          transactionHash
        ).then((receipt) => {
          if (receipt) {
            clearInterval(this.monitoringInterval)
            if (receipt.status) {
              this.$store.dispatch('payment/updateStatus', STATUS_RESULT_SUCCESS)
              this.pageState = this.pageStateList.successed
            } else {
              this.$store.dispatch('payment/updateStatus', STATUS_RESULT_FAILURE)
              this.pageState = this.pageStateList.failured
            }
          }
        })
      }, 3000)
    },
    checkCurrentNetwork(chainId) {
      this.apiGetTransaction().then((response) => {
        if (chainId !== response.data.network_type) {
          this.$store.dispatch('modal/show', {
            target: 'require-switch-network-modal',
            size: 'small',
            params: {
              chainId: response.data.network_type
            }
          })
        } else {
          if (
            this.$store.state.modal.show
            && this.$store.state.modal.target === 'require-switch-network-modal'
          ) {
            this.$store.dispatch('modal/hide')
          }
        }
      })
    },
    handleChainChanged(chainId) {
      if (this.pageState === this.pageStateList.detail) {
        this.$store.dispatch('web3/updateChainId', chainId)
        this.$router.push({ path: `/payment/token/${this.paymentToken}` })
      } else {
        this.checkCurrentNetwork(chainId)
      }
    },
    handleAccountChanged() {
      if (this.pageState === this.pageStateList.detail) {
        this.$router.push({ path: `/payment/token/${this.paymentToken}` })
      }
    }
  },
  created(){
    this.$store.dispatch('payment/updateHeaderInvoice', true)
    if (this.isNeedRestore) {
      this.$router.push({
        path: `/payment/wallets/${this.paymentToken}`
      })
    } else {
      if (this.paymentStatus !== STATUS_PUBLISHED) {
        this.checkCurrentNetwork(this.$store.state.web3.chainId)
      }
      this.apiGetPaymentCompletedUrl().then((response) => {
        this.returnUrls.succeed = response.data.succeeded_return_url
        this.returnUrls.failured = response.data.failured_return_url
      })
      this.apiGetContract().then((response) => {
        this.contract.address = response.data.address
        this.contract.abi = JSON.parse(response.data.args)
        this.exchangeExpireTimer()
      })
      switch(this.paymentStatus) {
        case STATUS_PUBLISHED:
          this.pageState = this.pageStateList.detail
          break
        case STATUS_PROCESSING:
          this.pageState = this.pageStateList.processing
          this.checkTransactionStatus(this.transactionHash)
          break
        case STATUS_RESULT_FAILURE:
          this.pageState = this.pageStateList.failured
          break
        case STATUS_RESULT_SUCCESS:
          this.pageState = this.pageStateList.successed
          break
        default:
          this.pageState = this.pageStateList.detail
      }
      if (this.web3Instance) {
        this.web3Instance.currentProvider.on('chainChanged', (chainId) => {
          chainId = (this.web3.utils.isHex(chainId))
            ? this.web3.utils.hexToNumber(chainId)
            : chainId
          this.handleChainChanged(chainId)
        })
        this.web3Instance.currentProvider.on('accountChanged', () => {
          this.handleAccountChanged()
        })
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.monitoringInterval)
    clearTimeout(this.exchangeTimer)
    if (this.web3Instance) {
      this.web3Instance.currentProvider.removeListener('chainChanged', this.handleChainChanged)
      this.web3Instance.currentProvider.removeListener('accountChanged', this.handleAccountChanged)
    }
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
      border-radius: 10px;
      color: #fff;
      img{
        margin-left: 4px;
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
  .new-tab-icon {
    padding: 0!important;
  }
}
</style>