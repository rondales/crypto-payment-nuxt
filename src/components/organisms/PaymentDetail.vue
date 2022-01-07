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
              {{ symbol }}
            </dd>
          </dl>
        </div>
        <div class="usdt-price" :class="{'inactive': changedPrice && !processing}">
          <p>
            {{ amount }}
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
              <img :src="tokenIcon">
            </figure>
            <p>
              {{ selectedSymbol }}
            </p>
          </div>
          <div class="payment_detail-value">
            <p>
              {{ payAmount }}
            </p>
          </div>
        </div>
        <div class="payment-box" v-if="changedPrice && !processing">
          <div class="add-flex a-center j-between">
            <div class="add-flex a-center">
              <img src="@/assets/images/warning.svg" alt="">
              <div class="payment-box_desc">
                <p>
                  Price Updated
                </p>
              </div>
            </div>
            <div class="payment-box_btn" @click="updatePrice">
              Accept
            </div>
          </div>
        </div>
        <div class="dattail-lists mt-1" v-if="!processing">
          <div class="dattail-list add-flex j-between mb-1">
            <p>Exchange Eate</p>
            <p>1USDT＝ 1USDT<img src="@/assets/images/exchange.svg" alt=""></p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Route</p>
            <p>BNB ⇨ BUSD</p>
          </div>
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
            <p>xSUSHI Fee</p>
            <p>0.0004735 BNB%</p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Slippage tolerance</p>
            <p>0.50%</p>
          </div>
          <div class="dattail-list add-flex j-between mb-2">
            <p>Platform Fee</p>
            <p>0.0004735 BNB</p>
          </div>
          <p class="dattail-list_desc">
            Output is estimated. You will receive at least 1001.00 USDT or the transaction will revert.
          </p>
        </div>
        <div class="payment-status mt-3 mb-3" v-if="processing">
          <img class="mb-2 spin" src="@/assets/images/loading.svg" v-if="processing && status === 0" alt="">
          <p class="payment-status_title" v-if="processing && status === 0">
            Waiting for Confimation
          </p>
          <p class="payment-status_desc mb-2" v-if="processing && status === 0">
            Pay 1000.00 USDT for 1000.00 USDT
          </p>

          <img class="mb-2" src="@/assets/images/check.svg" v-if="processing && status === 1" alt="">
          <p class="payment-status_title mb-1" v-if="processing && status === 1">
            Transaction Submitted
          </p>

          <img class="mb-2" src="@/assets/images/multiply.svg" v-if="processing && status === 2" alt="">
          <p class="payment-status_desc mb-2" v-if="processing && status === 2">
            The transaction cannot succeed due to error: execution 
            <br>
            reverted: PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT.
          </p>

          <a href="/" class="payment-status_btn">
            View on explorer
            <img src="@/assets/images/link-icon.svg" alt="">
          </a>
        </div>
        <button :class="{'inactive': changedPrice}" class="btn __g __l mb-2" @click="pushData" v-if="!processing">
          Confirm Wallet
        </button>
        <button class="btn __g __l mb-2 inactive" v-if="processing && status === 0">
          processing…
        </button>
        <button class="btn __g __l mb-2" @click="pushData" v-if="processing && status === 1">
          Back to Payee’s Services
        </button>
        <button class="btn __g __l mb-2" @click="pushData" v-if="processing && status === 2">
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
/*
@todo Web3ConnectTeam

In this page, you need to implement the following process or function.

1. Obtaining and displaying information on gas bills and other items related to payment
2. Transaction approval on the wallet side(clicked confirm wallet button)
3. Sending transactions to smart contracts
4. Transaction transmission result reception

* Since the contract address to send the transaction is stored in the DB, implement the process to get it by API (Web App Team)

*/
import { networkList } from '@/enum/network'
import { errorCodeList } from '@/enum/error_code'

export default {
  name: 'PaymentDetail',
  data() {
    return{
      changedPrice: false,
      tokenIcon: "",
      processing: false,
      status: 0,
      contractAddress: null
    }
  },
  computed: {
    symbol() {
      return this.$store.state.paymentData.base_symbol
    },
    amount() {
      return this.$store.state.paymentData.base_amount
    },
    selectedSymbol() {
      return this.$store.state.paymentData.selectTokenSymbol
    },
    payAmount() {
      return this.$store.state.paymentData.selectTokenAmount
    }
  },
  methods: {
    reload(){
      location.reload();
    },
    pushData(){
      // @todo Update the transaction after approval in Metamask
      const params = {
        payment_token: this.$route.params.token,
        network_type: networkList[this.$store.state.connection.networkId].type,
        contract_address: this.contractAddress,
        wallet_address: this.$store.state.connection.walletAddress,
        pay_symbol: this.$store.state.paymentData.selectTokenSymbol,
        pay_amount: this.$store.state.paymentData.selectTokenAmount
      }
      this.apiUpdateTransaction(params).then(() => {
        this.processing = true;
        setTimeout(() => {
          this.status = 2;
        }, 3000);
      }).catch((error) => {
        let message
        if ('errors' in error.response.data) {
          message = errorCodeList[error.response.data.errors.shift()].msg
        } else {
          message = 'Please reapply for payment again.'
        }
        this.showErrorModal(message)
      })
    },
    updatePrice(){
      this.changedPrice = false;
      setTimeout(() => {
        this.changedPrice = true;
      }, 3000);
    },
    apiGetContract() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/payment/contract'
      const params = new URLSearchParams([
        ['payment_token', this.$route.params.token],
        ['network_type', networkList[this.$store.state.connection.networkId].type]
      ])
      return this.axios.get(url, { params })
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

      this.apiUpdateTransaction(params).then(() => {
        // @todo Change the status according to the result of sending a transaction to the blockchain
        this.processing = true;
        setTimeout(() => {
          this.status = 2;
        }, 3000);
      }).catch((error) => {
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
    this.apiGetContract().then((response) => {
      console.log('get contract address')
      this.contractAddress = response.data.address
    }).catch((error) => {
      console.log('get contract address err')
      let message
      if ('errors' in error.response.data) {
        message = errorCodeList[error.response.data.errors.shift()].msg
      } else {
        message = 'Please reapply for payment again.'
      }
      this.showErrorModal(message)
    })

    const params = {
      receiver: this.$route.query.receiver,
      orderCode: this.$route.query.code,
      symbol: this.$route.query.symbol,
      amount: this.$route.query.amount,
      email: this.$route.query.email,
      selectTokenSymbol: this.$route.query.token,
      selectTokenAmount: this.$route.query.token_amount
    }
    this.$store.dispatch('setPaymentData', params)

    setTimeout(() => {
      this.changedPrice = true;
    }, 3000);
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
  }
  .payment_detail{
    &-name{
      p{
        font-size: 16px;
        font-weight: 100;
        margin-left: 16px;
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
    img{
      width: 20px;
      height: 20px;
    }
  }
}
</style>