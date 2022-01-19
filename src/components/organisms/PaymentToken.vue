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
              USDT
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
          <div class="payment-box_btn" @click="networkModal('network-modal')">
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
            <ul class="manage-item add-flex a-center j-between mb-2" v-for="(token, key) in tokenIdList" :key="key">
              <li>
                <img :src="token.icon">
              </li>
              <li class="token-name">
                {{ token.symbol }}
                <br>
                <span>
                  {{ token.name }}
                </span>
              </li>
              <li class="manage-item--right add-flex a-center j-between">
                <a href="https://sauna.finance/" target="_brank">
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
import { NETWORKS } from '@/constants'

export default {
  name: 'PaymentToken',
  data() {
    return {
      tab: "list",
      tokenAddress: '',
      tokenCount: 0,
      tokenList: [],
      tokenIdList: [],
      validAddress: false,
    }
  },
  filters: {
    balanceFormat(balance) {
      const pattern = /^[0-9]+.[0-9]+$/
      if (pattern.test(balance)) {
        let balanceSplit = balance.toString().split('.')
        if (balanceSplit[1].length > 4) {
          balanceSplit[1] = balanceSplit[1].substr(0, 4)
        } else {
          balanceSplit[1] = (balanceSplit[1] + '0000').slice(-4)
        }
        balance = balanceSplit[0] + '.' + balanceSplit[1]
      }
      return balance
    }
  },
  watch: {
    chainId() {
      this.getDefaultTokens()
    }
  },
  computed: {
    amount() {
      return this.$store.state.payment.amount
    },
    networkIcon() {
      return NETWORKS[
        this.$store.state.web3.chainId
      ].icon
    },
    networkName() {
      return NETWORKS[
        this.$store.state.web3.chainId
      ].name
    },
    chainId() {
      return this.$store.state.web3.chainId
    }
  },
  methods: {
    networkModal(target) {
      this.$store.dispatch("openModal", {target: target, size: "medium"});
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
      this.$web3.searchToken(
        this.$store.state.web3.instance,
        event.target.value,
        this.$store.state.account.address
      ).then((response) => {
        this.tokenIdList.push({
          name: response.name,
          symbol: response.symbol,
          balance: response.balance,
          address: response.address,
          icon: response.icon
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
        balance: token.balance,
        icon: token.icon
      })
      this.clearToken()
      this.tab = 'list'
    },
    selectedToken(token) {
      this.$store.dispatch('payment/updatePaySymbol', { paySymbol: token.symbol })
      this.$router.push({
        path: '/payment/exchange/' + this.$route.params.token,
        query: {
          receiver: this.$store.state.payment.domain,
          code: this.$store.state.payment.orderCode,
          symbol: this.$store.state.payment.symbol,
          amount: this.$store.state.payment.amount,
          token: token.symbol
        }
      })
    }
  },
  created() {
    this.getDefaultTokens()
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
      border-radius: 20px;
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
          font-weight: 100;
          margin-right: 5%;
          span{
            font-size: 12px;
          }
        }
      }
      .manage-item--right{
        width: 32%;
        .manage-import{
          background: $gradation-pale;
          padding: 4px 16px;
          border-radius: 12px;
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