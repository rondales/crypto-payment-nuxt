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
              {{ paymentRequestTokenSymbol }}
            </dd>
          </dl>
        </div>
        <div class="usdt-price">
          <p>
            {{ paymentRequestTokenAmount }}
          </p>
        </div>
      </div>
      <div class="payment_balancewrap">
        <div class="payment_desc add-flex j-between mb-2">
          <p class="grd">
            Your Balance
          </p>
          <figure class="reload" @click="reload">
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/reload.svg">
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/reload-l.svg">
          </figure>
        </div>
        <div class="payment_balance add-flex j-between mb-1">
          <div class="payment_balance-name add-flex a-center mb-2">
            <figure>
              <img :src="tokenIcon">
            </figure>
            <p>
              {{ tokenSymbol }}
            </p>
          </div>
          <div class="payment_balance-value">
            <p>
              Balance : {{ tokenBalance | balanceFormat }} {{ tokenSymbol }}
            </p>
            <p>
              equivalent : {{ equivalent | balanceFormat }} {{ equivalentSymbol }}
            </p>
          </div>
        </div>
        <div class="payment_balance-topken border mb-2">
          <div class="payment_balance-tokenname add-flex j-between">
            <p>
              {{ tokenSymbol }}
            </p>
            <div class="payment_balance-equivalent" :class="{warning: !isBalanceEnough}">
              {{ usd | usdFormat }} {{ equivalentSymbol }} equivalent
            </div>
          </div>
          <div class="payment_balance-price">
            {{ paymentAmount | balanceFormat }}
          </div>
        </div>
        <div v-if="isExchangeLoaded && isBalanceEnough">
          <div class="payment-box" v-if="isExpiredExchange">
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
          <button :class="{inactive: isRequierExchangeUpdate}" class="btn __g __l mb-2" @click="sendTokenItems">
            Go Exchange to Payment
            <div class="loading-wrap" :class="{'active': loading}">
              <img class="spin" src="@/assets/images/loading.svg">
            </div>
          </button>
          <p class="via">
            via Uniswap：Slash Payment
            <span>
              <img src="@/assets/images/slash-s.svg" alt="">
            </span>
          </p>
        </div>
        <div v-else class="balance-warning">
          <p>balance is insufficient</p>
          <p>for this transaction.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NETWORKS } from '@/constants'
import { BscTokens, EthereumTokens } from '@/contracts/tokens'
import NumberFormat from 'number-format.js'
import VuexRestore from '@/components/mixins/VuexRestore'

export default {
  name: 'PaymentExchange',
  mixins: [VuexRestore],
  data() {
    return{
      loading: false,
      timer: null,
      loadedExchange: false,
      expiredExchange: false,
      changedPrice: false,
      equivalent: 0,
      requireAmount: 0,
      exchangeRate: 0,
      contract: {
        address: null,
        abi: null
      }
    }
  },
  filters: {
    balanceFormat(balance) {
      return NumberFormat(
        '0.0000',
        balance
      )
    },
    usdFormat(balance) {
      return NumberFormat(
        '0.00',
        balance
      )
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    tokenIcon() {
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
    paymentRequestTokenSymbol() {
      return this.$store.state.payment.symbol
    },
    paymentRequestTokenAmount() {
      return this.$store.state.payment.amount
    },
    tokenSymbol() {
      return this.$store.state.payment.token.symbol
    },
    tokenBalance() {
      return this.$store.state.payment.token.balance
    },
    paymentAmount() {
      return this.isExchangeLoaded
        ? this.isBalanceEnough
        ? this.requireAmount
        : this.tokenBalance
        : this.requireAmount
    },
    usd() {
      return parseFloat(this.paymentRequestTokenAmount) <= parseFloat(this.equivalent)
        ? this.paymentRequestTokenAmount
        : this.equivalent
    },
    equivalentSymbol() {
      return this.tokenSymbol === 'USDT'
        ? 'USD'
        : 'USDT'
    },
    paymentToken() {
      return this.$route.params.token
    },
    isBalanceEnough() {
      return parseFloat(this.tokenBalance) >= parseFloat(this.requireAmount)
    },
    isExchangeLoaded() {
      return this.loadedExchange
    },
    isExpiredExchange() {
      return this.expiredExchange
    },
    isRequierExchangeUpdate() {
      return !this.loadedExchange || this.expiredExchange
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
    exchangeExpireTimer() {
      this.timer = setTimeout(() => {
        this.expiredExchange = true;
      }, 60000);
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
    sendTokenItems(){
      this.loading = true;
      this.$router.push({
        path: `/payment/detail/${this.paymentToken}`
      });
    },
  },
  created(){
    if (this.isNeedRestore) {
      this.$router.push({
        path: `/payment/wallets/${this.paymentToken}`
      })
    } else {
      this.apiGetContract().then((response) => {
        this.contract.address = response.data.address
        this.contract.abi = JSON.parse(response.data.args)
        this.updateExchange()
      })
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

  .reload{
    cursor: pointer;
    img {
      vertical-align: middle;
    }
  }
  .payment_balance{
    &-name{
      p{
        font-size: 16px;
        font-weight: 100;
        margin-left: 11px;
        line-height: 25px;
      }
      figure {
        width: 25px;
        height: 25px;
      }
    }
    &-value{
      font-size: 13px;
      font-weight: 100;
      margin-left: 16px;
    }
    &-topken{
      width: 100%;
      padding: 12px;
      position: relative;
    }
    &-tokenname{
      p{
        font-size: 16px;
        font-weight: 200;
      }
    }
    &-equivalent{
      color: #01F63A;
      font-weight: 100;
      font-size: 11px;
      line-height: 24px;
      &.warning{
        color: #F75D68;
      }
    }
    &-price{
      text-align: right;
      width: 100%;
      font-weight: 100;
      font-size: 24px;
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
  .balance-warning{
    color: #F75D68;
    font-size: 15px;
    font-weight: 100;
    letter-spacing: 0.05em;
    text-align: center;
  }
}
</style>