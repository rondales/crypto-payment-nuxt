<template>
  <div class="DASHBOARD-MAIN">
    <div class="title">
      <h3>Receive Token</h3>
    </div>
    <div class="receive">
      <div class="receive-contents add-flex a-center">
        <div class="receive-content left add-flex a-center">
          <div class="receive-left add-flex a-center">
            <figure>
              <img  :src="receiveTokenIcon">
            </figure>
            <div class="token-name">
              {{ receiveTokenSymbol }}
            </div>
          </div>
          <div class="receive-right add-flex a-center">
            <p v-if="isCurrentNetworkSupport" class="receive-address">
              {{ currentNetworkAlias }}：<span>{{ currentNetworkReceiveTokenAddress }}</span>
            </p>
            <p v-else class="receive-address">
              Current network is not supported
            </p>
            <p class="receive-icon" @click="isCurrentNetworkSupport ? copy(currentNetworkReceiveTokenAddress) : null">
              <img :class="{ inactive: !isCurrentNetworkSupport }" src="@/assets/images/copy.svg">
            </p>
            <p class="receive-icon" @click="isCurrentNetworkSupport ? addToken() : null">
              <img :class="{ inactive: !isCurrentNetworkSupport }" src="@/assets/images/metamask-fox.svg">
            </p>
          </div>
        </div>
        <div :class="{active: selectTokens}" class="receive-content right add-flex a-center" @click="openBox">
          <img src="@/assets/images/contract.svg">
          <p class="receive-more">
            More
          </p>
          <img class="next" src="@/assets/images/next.svg">
          <div class="tokens-wrapper" v-if="selectTokens">
            <ul>
              <li v-for="(network, index) in receiveTokenList" :key="index">
                <img :src="network.icon">
                <div class="tokens-name">
                  <p>
                    <span>{{network.alias}}</span>
                    <span v-if="network.token.address">{{network.token.address | omittedText}}</span>
                    <span v-else>Not support</span>
                  </p>
                </div>
                <div
                  class="tokens-copy"
                  @click="network.token.address ? copy(network.token.address) : null"
                >
                  <img :class="{ inactive: !network.token.address }" src="@/assets/images/copy.svg">
                </div>
                <div
                  class="network-switch"
                  :class="{ inactive: !network.token.address }"
                  @click="network.token.address ? switchNetwork(index) : null"
                >
                  Change
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p class="receive-desc">
        *Once you have set your receiveToken, you cannot change it. If you want to change it, please connect with a different Web3 address.
      </p>
    </div>
    <div class="title">
      <h3>Networks for Deployed Payment Contract</h3>
    </div>
    <div class="deployed">
      <div class="deployed-wrapper">
        <button
          v-for="(network, index) in availableNetworks"
          :key="index"
          :class="{ active: contractsStatus[network.chainId] }"
          class="btn __s sp-fixed"
        >
          <span class="btn-icon">
            <img :src="network.icon" :alt="network.name">
          </span>
          {{network.name}}
        </button>
      </div>
      <p>
        *You can deploy or update your new network
        <router-link to="/admin/payment/settings/contract"> here</router-link>.
      </p>
    </div>
    <div class="title">
      <h3>Payment's summary</h3>
    </div>
    <div class="items">
      <dash-item v-for="(item, index) in itemList" :item-data="item" :key="index" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import NumberFormat from 'number-format.js'
import RequestUtility from '@/utils/request'
import AvailableNetworks from '@/network'
import {
  BscTokens,
  EthereumTokens,
  MaticTokens,
  AvalancheTokens
} from '@/contracts/receive_tokens'
import DashItem from "@/components/organisms/admin/AdminDashItem"

export default {
  name: 'AdminDashboardContents',
  components: { DashItem },
  props: ['contractsStatus'],
  data() {
    return {
      selectTokens: false,
      items: {
        monthlyAmount: {value: '0', text: 'monthly total amount'},
        monthlyCount: {value: '0', text: 'monthly total count'},
        weeklyAmount: {value: '0 ', text: 'weekly total amount'},
        weeklyCount: {value: '0', text: 'weekly total count'},
        todayAmount: {value: '0', text: 'today total amount'},
        todayCount: {value: '0', text: 'today total count'}
      },
      receiveTokenIcons: {
        USDT: require('@/assets/images/symbol/usdt.svg'),
        USDC: require('@/assets/images/symbol/usdc.svg'),
        DAI: require('@/assets/images/symbol/dai.svg'),
        JPYC: require('@/assets/images/symbol/jpyc.svg')
      },
      receiveTokens: {}
    }
  },
  filters: {
    omittedText(value) {
      return  value.slice(0, 6) + "…" + value.slice(-6);
    },
    omittedTextSp(value) {
      if (window.innerWidth <= 768) {
        return value.length > 8 ? value.slice(0, 8) + "…" : value;
      } else {
        return value.length > 20 ? value.slice(0, 20) + "…" : value;
      }
    },
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    itemList() {
      return Object.values(this.items)
    },
    receiveTokenSymbol() {
      return this.$store.state.account.receiveSymbol
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[
        this.$store.state.account.receiveSymbol
      ]
    },
    currentNetworkAlias() {
      if (this.$store.state.web3.chainId in this.receiveTokens) {
        return this.receiveTokens[
          this.$store.state.web3.chainId
        ].alias
      } else {
        return 'Unsupported network'
      }
    },
    currentNetworkReceiveTokenAddress() {
      if (this.$store.state.web3.chainId in this.receiveTokens) {
        return this.receiveTokens[
          this.$store.state.web3.chainId
        ].token.address
      } else {
        return ''
      }
    },
    receiveTokenList() {
      const tokens = JSON.parse(JSON.stringify(this.receiveTokens))
      if (this.$store.state.web3.chainId in tokens) {
        delete tokens[this.$store.state.web3.chainId]
      }
      return tokens
    },
    availableNetworks() {
      return AvailableNetworks
    },
    isCurrentNetworkSupport() {
      return this.$store.state.web3.chainId in this.receiveTokens
        && this.receiveTokens[
          this.$store.state.web3.chainId
        ].token.address
    },
  },
  methods: {
    apiGetPaymentSummary() {
      const now = moment()
      const url = `${this.baseUrl}/api/v1/management/summary/payment`
      const request = {
        headers: { Authorization: RequestUtility.getBearer() },
        params: new URLSearchParams([
          ['month_start', moment(moment(now).startOf('month').format('YYYY-MM-DD 00:00:00')).unix()],
          ['month_end', moment(moment(now).endOf('month').format('YYYY-MM-DD 23:59:59')).unix()],
          ['week_start', moment(moment(now).startOf('week').format('YYYY-MM-DD 00:00:00')).unix()],
          ['week_end', moment(moment(now).endOf('week').format('YYYY-MM-DD 23:59:59')).unix()],
          ['day_start', moment(moment(now).format('YYYY-MM-DD 00:00:00')).unix()],
          ['day_end', moment(moment(now).format('YYYY-MM-DD 23:59:59')).unix()],
        ])
      }
      return this.axios.get(url, request)
    },
    switchNetwork(chainId) {
      this.$web3.switchChain(
        this.$store.state.web3.instance,
        chainId
      ).then(() => { this.selectTokens = false })
    },
    copy(address) {
      this.$store.dispatch('account/copied')
      this.$clipboard(address);
    },
    addToken() {
      const token = this.receiveTokens[
        this.$store.state.web3.chainId
      ].token
      this.$web3.addToken(
        this.$store.state.web3.instance,
        token.address,
        token.abi
      )
    },
    openBox(){
      this.selectTokens = !this.selectTokens;
    },
    generateReceiveTokenList() {
      return {
        [AvailableNetworks.ethereum.chainId]: {
          alias: AvailableNetworks.ethereum.alias,
          icon: AvailableNetworks.ethereum.icon,
          token: EthereumTokens[this.receiveTokenSymbol]
        },
        [AvailableNetworks.bsc.chainId]: {
          alias: AvailableNetworks.bsc.alias,
          icon: AvailableNetworks.bsc.icon,
          token: BscTokens[this.receiveTokenSymbol]
        },
        [AvailableNetworks.matic.chainId]: {
          alias: AvailableNetworks.matic.alias,
          icon: AvailableNetworks.matic.icon,
          token: MaticTokens[this.receiveTokenSymbol]
        },
        [AvailableNetworks.avalanche.chainId]: {
          alias: AvailableNetworks.avalanche.alias,
          icon: AvailableNetworks.avalanche.icon,
          token: AvalancheTokens[this.receiveTokenSymbol]
        }
      }
    }
  },
  created() {
    this.apiGetPaymentSummary().then((response) => {
      const summary = response.data
      this.items.monthlyAmount.value = NumberFormat(`0.00 ${this.receiveTokenSymbol}`, summary.monthly.total_amount)
      this.items.monthlyCount.value = summary.monthly.total_count
      this.items.weeklyAmount.value = NumberFormat(`0.00 ${this.receiveTokenSymbol}`, summary.weekly.total_amount)
      this.items.weeklyCount.value = summary.weekly.total_count
      this.items.todayAmount.value = NumberFormat(`0.00 ${this.receiveTokenSymbol}`, summary.daily.total_amount)
      this.items.todayCount.value = summary.daily.total_count
    })
    this.receiveTokens = this.generateReceiveTokenList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.title{
  margin-bottom: 24px;
  h3{
    font-size: 20px;
    font-weight: 400;
  }
}
.receive{
  margin-bottom:  56px;
  @include media(sp) {
    margin-bottom:  24px;
  }
  .receive-contents{
    margin-bottom: 8px;
    position: relative;
    .tokens-wrapper{
      z-index: 9999;
      visibility: visible;
      position: absolute;
      right: -48px;
      top: 0px;
      margin: 0px;
      transform: translate(120px, 50px);
      background: #292536;
      width: 275px;
      max-height: 180px;
      overflow-y: scroll;
      padding: 16px;
      border-radius: 8px;
      cursor: default;
      ul{
        li{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 16px;
          padding: 4px;
          transition: all .2s;
          &:hover{
            opacity: .8;
          }
          &:last-child{
            margin-bottom: 0;
          }
          img{
            width: 28px;
            margin-right: 8px;
          }
          p{
            width: 80px;
            margin-right: 16px;
            display: block;
            &:hover{
              opacity: 1;
            }
            span{
              display: block;
              font-size: 10px;
            }
          }
          .tokens-copy{
            img{
              width: 18px;
              vertical-align: middle;
              cursor: pointer;
              &.inactive {
                cursor: default;
                opacity: 0.5;
              }
            }
          }
          .tokens-metamask{
            margin-left: 8px;
            img{
              width: 22px;
              vertical-align: initial;
              cursor: pointer;
              &.inactive {
                cursor: default;
                opacity: 0.5;
              }
            }
          }
          .network-switch{
            margin-left: 8px;
            cursor: pointer;
            font-size: 10px;
            font-weight: 200;
            background: #78668D;
            padding: 4px 12px;
            border-radius: 10px;
            &.inactive {
              cursor: default;
              opacity: 0.5;
            }
          }
        }
      }
    }
    .receive-left{
      position: relative;
      figure{
        width: 26px;
        height: 26px;
      }
      .token-name{
        margin: 0 16px 0 10px;
        @include media(sp) {
          font-size: 12px;
          margin: 0 8px;
        }
      }
      &::after{
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        width: 1px;
        height: 32px;
        background: #fff;
        @include media(sp) {
          height: 24px;
        }
      }
    }
    .receive-right{
      font-size: 15px;
      margin-left: 24px;
      @include media(sp) {
        margin-left: 8px;
      }
      .receive-address{
        text-overflow: ellipsis;
        @include media(sp) {
          font-size: 12px;
        }
      }
    }
    .receive-content{
      background: #292536;
      border-radius: 10px;
      font-size: 15px;
      margin-right: 16px;
      height: 42px;
      padding: 10px;
      margin: 0;
      @include media(sp) {
        margin-bottom: 16px;
      }
      &.left{
        @include media(sp) {
          order: 2 !important;
        }
      }
      &.right{
        margin-left: 16px;
        position: relative;
        cursor: pointer;
        &.active{
          .next{
            transform: rotate(-180deg);
          }
        }
        @include media(sp) {
          margin-left: 0;
          order: 1 !important;
          margin-bottom: 16px;
          width: auto;
        }
      }
      @include media(sp) {
        width: 100%;
        margin-right: 0;
      }
      img{
        transition: all .2s;
      }
    }
    .receive-icon{
      margin: 0 10px;
      cursor: pointer;
      img{
        width: 18px;
        vertical-align: sub;
        &.inactive {
          cursor: default;
          opacity: 0.5;
        }
      }
      &:nth-last-child(2){
        margin-left: 24px;
        @include media(sp) {
          margin-left: 16px;
        }
      }
      &:nth-last-child(1){
        img{
          width: 20px;
        }
      }
    }
    .receive-more{
      margin: 0 12px;
    }
  }
  .receive-desc{
    font-size: 11px;
  }
}
.deployed{
  margin-bottom: 56px;
  max-width: 1000px;
  .deployed-wrapper{
    display: grid;
    grid-template:
    "item-1 ...... item-2 ...... item-3 ...... item-4" auto
    / 23% 2.66% 23% 2.66% 23% 2.66% 23%;
    @include media(sp) {
      grid-template:
      "head   head   head"
      "...... ...... ......" 16px
      "item-1 item-1 item-1" auto
      "item-2 item-2 item-2" auto
      "item-3 item-3 item-3" auto
      "item-4 item-4 item-4" auto
      / 49% 2% 49%;
    }
  }
  .btn{
    font-weight: 300;
    font-size: 9px;
    text-align: left;
    padding: 0 1rem;
    opacity: .5;
    cursor: auto;
    margin-bottom: 16px;
    @include media(sp) {
      width: 100%;
      margin-bottom: 16px;
    }
    &.active{
      opacity: 1;
    }
    @for $i from 1 through 4 {
      &:nth-child(#{$i}){
        grid-area: item-#{$i};
      }
    }
  }
  .btn-icon{
    margin-right: 8px;
    img{
      width: 26px;
      height: 26px;
    }
  }
  p{
    font-size: 10px;
    a{
      line-height: 1.2;
      color: #387DF2;
      position: relative;
      &::after{
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #387DF2;
      }
    }
  }
}
.items{
  max-width: 1000px;
  display: grid;
  grid-template:
  "item-1 ...... item-2 ...... item-3 ...... item-4" auto
  "...... ...... ...... ...... ...... ...... ......" 32px
  "item-5 ...... item-6 ...... ...... ...... ......" auto
  "...... ...... ...... ...... ...... ...... ......" 32px
  / 23% 2.66% 23% 2.66% 23% 2.66% 23%;
  @include media(sp) {
    grid-template:
    "head   head   head"
    "...... ...... ......" 16px
    "item-1 item-1 item-1" auto
    "...... ...... ......" 16px
    "item-2 item-2 item-2" auto
    "...... ...... ......" 16px
    "item-3 item-3 item-3" auto
    "...... ...... ......" 16px
    "item-4 item-4 item-4" auto
    "...... ...... ......" 16px
    "item-5 item-5 item-5" auto
    "...... ...... ......" 16px
    "item-6 item-6 item-6" auto
    "...... ...... ......" 30px
    / 49% 2% 49%;
  }
  .item{
    background: #292536;
    padding: 24px;
    text-align: right;
    font-weight: 400;
    border-radius: 10px;
    &:nth-child(1){
      background: #4E455A;
    }
    h4{
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 8px;
    }
    p{
      font-weight: 400;
      font-size: 16px;
    }
    @for $i from 1 through 6 {
      &:nth-child(#{$i}){
        grid-area: item-#{$i};
      }
    }
  }
}
</style>