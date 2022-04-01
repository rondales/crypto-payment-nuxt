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
              {{ receiveTokenSymbol }}
            </dd>
          </dl>
        </div>
        <div class="usdt-price">
          <p>
            {{ amount }}
          </p>
        </div>
      </div>
      <div class="payment-with">
        Select the network and currency you wish to pay for. If the currency you want is not on the list, you can import it by contract address &#x1f44d;
      </div>
      <div class="payment-box network">
        <div class="add-flex a-center j-between">
          <div class="add-flex a-center">
            <img :src="networkIcon">
            <div class="payment-box_desc">
              <p>
                {{ networkName }}
              </p>
            </div>
          </div>
          <div class="payment-box_btn" @click="networkModal">
            Change
          </div>
        </div>
      </div>
      <div class="body">
        <div class="toggle-btn mb-3 add-flex j-around">
          <div class="toggle-right" :class="{'active': tab === 'list'}" @click="leftTab">
            Lists
          </div>
          <div class="toggle-left" :class="{'active': tab === 'tokens'}" @click="rightTab">
            Tokens
          </div>
        </div>
        <div class="token-content" v-if="tab === 'list'">
          <p class="token-title">
            Select token
          </p>
          <div class="token-items">
            <div class="token-item add-flex j-between a-center" v-for="(token, key) in tokenList"  :key="key"  @click="selectedToken(token)">
              <div class="add-flex j-between a-center">
                <figure>
                  <img :src="token.icon" alt="">
                </figure>
                <dl>
                  <dt>
                    {{ token.symbol }}
                  </dt>
                  <dd>
                    {{ token.name }}
                  </dd>
                </dl>
              </div>
              <div class="usdt-price">
                <p>
                  {{ token.balance | balanceFormat }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="manage-content" v-else-if="tab === 'tokens'">
          <div class="manage-title">
            Enter token contract address
          </div>
          <div class="manage-desc">
            *Does not support tokenomics tokens, which have the property that transactions are subject to TAX 🙅‍♂️
          </div>
          <input class="token-dsc border" type="text" placeholder="0x0000" v-model="tokenAddress" @keyup.enter="searchToken">
          <div class="manage-wrap">
            <div class="manage-warning" v-if="validAddress">
              Enter valid token address
            </div>
            <ul class="manage-item add-flex a-center mb-2" v-for="(token, key) in tokenIdList" :key="key">
              <li>
                <img :src="token.icon">
              </li>
              <li class="token-name">
                {{ token.symbol }}
              </li>
              <li class="manage-item--right add-flex a-center j-between">
                <a :href="token.url" target="_brank">
                  <figure>
                    <img src="@/assets/images/link-icon.svg">
                  </figure>
                </a>
                <div class="manage-import" @click="importToken(key)">
                  Import
                </div>
              </li>
            </ul>
            <div class="add-flex j-between a-center">
              <div class="manage-none">
                {{ tokenCount }} Custom Token
              </div>
              <div class="manage-clear" v-if="tokenCount" @click="clearToken">
                Clear all
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumberFormat from 'number-format.js'
import VuexRestore from '@/components/mixins/VuexRestore'
import { NETWORKS } from '@/constants'

export default {
  name: 'PaymentToken',
  mixins: [VuexRestore],
  data() {
    return {
      tab: "list",
      tokenAddress: '',
      tokenCount: 0,
      tokenList: [],
      tokenIdList: [],
      validAddress: false,
      receiveTokenIcons: {
        USDT: require('@/assets/images/symbol/usdt.svg'),
        USDC: require('@/assets/images/symbol/usdc.svg'),
        DAI: require('@/assets/images/symbol/dai.svg'),
        JPYC: require('@/assets/images/symbol/jpyc.svg')
      }
    }
  },
  filters: {
    balanceFormat(balance) {
      return NumberFormat(
        '0.0000',
        balance
      )
    }
  },
  watch: {
    chainId() {
      this.getDefaultTokens()
    }
  },
  computed: {
    web3Instance() {
      return this.$store.state.web3.instance
    },
    receiveTokenSymbol() {
      return this.$store.state.payment.symbol
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[
        this.$store.state.payment.symbol
      ]
    },
    amount() {
      return this.$store.state.payment.amount
    },
    networkIcon() {
      return this.chainId
        ? NETWORKS[this.$store.state.web3.chainId].icon
        : null
    },
    networkName() {
      return this.chainId
        ? NETWORKS[this.$store.state.web3.chainId].name
        : ''
    },
    chainId() {
      return this.$store.state.web3.chainId
    },
    availableNetworks() {
      return this.$store.state.payment.availableNetworks
    },
    paymentToken() {
      return this.$route.params.token
    }
  },
  methods: {
    networkModal() {
      this.$store.dispatch("modal/show", {target: 'network-modal', size: "medium"});
    },
    leftTab(){
      this.tab = "list"
      this.isActive = true
    },
    rightTab(){
      this.tab = "tokens"
      this.isActive = true
    },
    getDefaultTokens() {
      this.$web3.getDefaultTokens(
        this.$store.state.web3.instance,
        this.$store.state.web3.chainId,
        this.$store.state.account.address
      ).then((tokens) => { this.tokenList = tokens })
    },
    clearToken(){
      this.tokenAddress = ''
      this.tokenIdList = []
      this.tokenCount = 0;
      this.validAddress = false
    },
    searchToken(event) {
      this.tokenIdList = []
      this.tokenCount = 0;
      this.validAddress = false
      this.$web3.searchToken(
        this.$store.state.web3.instance,
        event.target.value,
        this.$store.state.account.address
      ).then((response) => {
        const scanUrl = NETWORKS[
          this.$store.state.web3.chainId
        ].scanUrl
        this.tokenIdList.push({
          name: response.name,
          symbol: response.symbol,
          decimal: response.decimal,
          address: response.address,
          balance: response.balance,
          icon: response.icon,
          url: `${scanUrl}/token/${response.address}`
        })
        this.tokenCount = this.tokenIdList.length
      }).catch((error) => {
        console.log(error)
        this.tokenCount = 0
        this.tokenIdList = []
        this.validAddress = true
      })
    },
    importToken(index){
      const token = this.tokenIdList[index]
      this.tokenList.unshift({
        name: token.name,
        symbol: token.symbol,
        decimal: token.decimal,
        address: token.address,
        balance: token.balance,
        icon: token.icon
      })
      this.clearToken()
      this.tab = 'list'
    },
    selectedToken(token) {
      this.$store.dispatch('payment/updateToken', {
        name: token.name,
        symbol: token.symbol,
        decimal: token.decimal,
        address: token.address,
        balance: token.balance,
        amount: null,
      })
      this.$router.push({
        path: `/payment/exchange/${this.paymentToken}`,
      })
    },
    handleAccountChanged() {
      this.$web3.getAccountData(this.web3Instance, this.chainId).then((account) => {
        this.$store.dispatch('account/update', account)
        this.getDefaultTokens()
      })
    },
    handleChainChanged(chainId) {
      if (this.availableNetworks.includes(chainId)) {
        this.$store.dispatch('web3/updateChainId', chainId)
      } else {
        this.$store.dispatch('web3/updateChainId', null)
        this.$store.dispatch('modal/show', {
          target: 'network-modal',
          size: 'medium',
          params: {
            unsupported: true,
            hideCloseButton: true
          }
        })
      }
    }
  },
  created() {
    this.$store.dispatch('payment/updateHeaderInvoice', true)
    if (this.isNeedRestore) {
      this.$router.push({
        path: `/payment/wallets/${this.paymentToken}`
      })
    } else {
      if (this.availableNetworks.includes(this.chainId)) {
        this.$web3.getAccountData(this.web3Instance, this.chainId).then((account) => {
          this.$store.dispatch('account/update', account)
          this.getDefaultTokens()
        })
      } else {
        this.$store.dispatch('modal/show', {
          target: 'network-modal',
          size: 'medium',
          params: {
            unsupported: true,
            hideCloseButton: true
          }
        })
      }
      if (this.web3Instance) {
        this.web3Instance.currentProvider.on('accountsChanged', () => {
          this.handleAccountChanged()
        })
        this.web3Instance.currentProvider.on('chainChanged', (chainId) => {
          chainId = (this.web3Instance.utils.isHex(chainId))
            ? this.web3Instance.utils.hexToNumber(chainId)
            : chainId
          this.handleChainChanged(chainId)
        })
      }
    }
  },
  beforeDestroy() {
    if (this.web3Instance) {
      this.web3Instance.currentProvider.removeListener(
        'accountsChanged',
        this.handleAccountChanged
      )
      this.web3Instance.currentProvider.removeListener(
        'chainChanged',
        this.handleChainChanged
      )
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
    input{
      line-height: 53px;
      height: 53px;
      font-weight: 500;
      font-size: 18px;
      width: 65%;
      padding-left: 16px;
      @include media(sp) {
        width: 55%;
      }
    }
    .currency{
      width: 35%;
      line-height: 53px;
      position: relative;
      &::before{
        position: absolute;
        content: "";
        width: 1px;
        height: 33px;
        background: #6B6B6C;
        left: -12px;
      }
      &::after{
        content: "▲";
        position: absolute;
        right: 12px;
        color: #6B6B6C;
        font-size: 14px;
        transform: rotate(-180deg);
      }
      figure{
        line-height: 53px;
        position: absolute;
        img{
          padding-top: 14px;
        }
      }
      select{
        padding-left: 36px;
        font-weight: 400;
        width: 100%;
        border: none;
        outline: none;
      }
    }
    span{
      vertical-align: middle;
      font-size: 11px;
    }
  }
  .billed{
    padding-bottom: 16px;
    margin:24px 0 8px;
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
  .token-title{
    font-size: 17px;
    font-weight: 100;
    margin-bottom: 8px;
  }
  .token-item{
    padding-bottom: 8px;
    margin: 4px 0;
    figure{
      img{
        height: 38px;
        width: 38px;
        border-radius: 50%;
      }
    }
    dl{
      margin-left: 16px;
      dt{
        font-size: 15px;
        font-weight: 100;
      }
      dd{
        font-size: 14px;
        font-weight: 300;
      }
    }
  }
  .payment-with{
    text-align: left;
    font-size: 12px;
    font-weight: 100;
    padding-top: 8px;
    padding-bottom: 24px;
  }
  .payment-box{
    background: #4E455A;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 16px;
    color: #fff;
    img{
      width: 38px;
      height: 38px;
      border-radius: 10px;
    }
    &_desc{
      font-size: 11px;
      padding-left: 8px;
      font-weight: 100;
    }
    &_btn{
      cursor: pointer;
      font-size: 12px;
      font-weight: 200;
      background: $gradation-pale;
      padding: 4px 12px;
      border-radius: 10px;
    }
  }
  .payment_receiptwrap{
    width: 100%;
  }
  .payment_receipt{
    p{
      font-size: 15px;
    }
    &_form{
      height: 56px;
      .mail{
        height: 51px;
        padding: 0 16px;
        font-size: 15px;
        width: 100%;
      }
    }
  }
  .body {
    .toggle-btn{
      background: var(--color_darken);
      padding: 8px;
      border-radius: 10px;
    }
    .token-dsc{
      font-size: 14px;
      font-weight: 100;
      padding: 16px;
      margin-bottom: 24px;
      width: 100%;
    }
    .toggle-right,
    .toggle-left{
      width: 48%;
      text-align: center;
      height: 38px;
      line-height: 38px;
      margin: 0 1%;
      border-radius: 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 100;
      &.active{
        background: var(--color_inner);
      }
    }
    .token-items{
      overflow: hidden;
      overflow-y: auto;
      height: 20vh;
      &::-webkit-scrollbar{
        display: none;
      }
      .token-item{
        cursor: pointer;
      }
    }
    .manage-content{
      .manage-title{
        font-size: 15px;
        margin-bottom: 8px;
      }
      .manage-desc{
        font-size: 12px;
        font-weight: 100;
        margin-bottom: 16px;
      }
      .manage-warning{
        font-size: 15px;
        color: #E53F3F;
        margin-bottom: 8px;
      }
      .manage-none{
        font-size: 15px;
        font-weight: 100;
      }
      .manage-clear{
        font-size: 14px;
        font-weight: 100;
        background: var(--color_darken);
        border-radius: 10px;
        padding: 4px 24px;
        cursor: pointer;
      }
      .manage-item{
        font-size: 14px;
        width: 100%;
        .token-name{
          width: 60%;
          font-weight: 100;
          padding-left: 17px;
        }
      }
      .manage-item--right{
        margin-left: auto;
        width: 100px;
        .manage-import{
          height: 27px;
          background: $gradation-pale;
          padding: 4px 16px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 100;
          cursor: pointer;
          color: #fff;
        }
        figure{
          img{
            vertical-align: inherit;
          }
        }
      }
    }
  }
}
</style>