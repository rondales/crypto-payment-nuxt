<template>
  <div class="DASHBOARD">
    <div v-if="!$store.state.account.receive.isSelected && !$store.state.account.receive.isSettingComplete" class="DASHBOARD-one">
      <div class="title-gradation">
        Welcome to Slash Payment
      </div>
      <p class="welcome-desc">
        Slash Payment is the easiest and most secure way to accept crypto payments for your service or store.
      </p>
      <div class="title-gradation">
        Step 1
      </div>
      <p class="welcome-desc">
        First of all, please select the token we support that you want to receive as sales.
        <br>
        *The token you set here cannot be changed later. If you want to change the token, you will need to connect with a new Web3 address.
      </p>
      <div class="title">
        Select ReceiveToken
      </div>
      <div class="welcome-receice_contents">
        <div class="welcome-receice_tokens add-flex ">
          <div class="welcome-receice_token one" @click="switchToken(tabs.usdt)" :class="{ active: selectUsdt }">
            <figure>
              <img src="@/assets/images/icon/usdt-l.svg">
            </figure>
            <p class="welcome-receice_name">
              USDT
              <br>
              USD-peg
            </p>
            <div class="welcome-receice_box gradation-orange">
              Recommend
            </div>
          </div>
          <div class="welcome-receice_token two" @click="switchToken(tabs.usdc)" :class="{ active: selectUsdc }">
            <figure>
              <img src="@/assets/images/icon/usdc-l.svg">
            </figure>
            <p class="welcome-receice_name">
              USDC
              <br>
              USD-peg
            </p>
            <div class="welcome-receice_box gradation-dark">
              better
            </div>
          </div>
          <div class="welcome-receice_token tree" @click="switchToken(tabs.dai)" :class="{ active: selectDai }">
            <figure>
              <img src="@/assets/images/icon/dai-l.svg">
            </figure>
            <p class="welcome-receice_name">
              DAI
              <br>
              USD-peg
            </p>
            <div class="welcome-receice_box gradation-dark">
              better
            </div>
          </div>
          <div class="welcome-receice_token four" @click="switchToken(tabs.jpyc)" :class="{ active: selectJpyc }">
            <figure>
              <img src="@/assets/images/icon/jpyc-l.svg">
            </figure>
            <p class="welcome-receice_name">
              JPYC
              <br>
              USD-peg
            </p>
            <div class="welcome-receice_box gradation-gray">
              beta ver.
            </div>
          </div>
        </div>
          <button @click="slectedToken" class="welcome-receice_btn">
            Confirm
          </button>
      </div>
    </div>
    <div v-if="$store.state.account.receive.isSelected && !$store.state.account.receive.isSettingComplete" class="DASHBOARD-two">
      <div class="title-gradation">
        Welcome to Slash Payment
      </div>
      <p class="welcome-desc">
        Slash Payment is the easiest and most secure way to accept crypto payments for your service or store.
      </p>
      <div class="title-gradation">
        Step 2
      </div>
      <p class="welcome-desc">
        Slashのペイメントコントラクトをネットワーク毎にデプロイしましょう。
        <br>
        *支払いを受け入れるネットワーク毎にデプロイが必要です。
      </p>
      <div class="welcome-image">
        <figure>
          <img src="@/assets/images/setting-image.svg">
        </figure>
        <div class="welcome-receice_contents auto">
          <button @click="goSettings" class="welcome-receice_btn">
            Go Settings
          </button>
        </div>
      </div>
    </div>
    <div class="DASHBOARD-MAIN" v-if="$store.state.account.receive.isSettingComplete">
      <div class="receive">
        <div class="receive-contents add-flex a-center">
          <div class="receive-content left add-flex a-center">
            <div class="receive-left add-flex a-center">
              <figure>
                <img  src="@/assets/images/symbol/usdt.svg">
              </figure>
              <div class="token-name">
                USDT
              </div>
            </div>
            <div class="receive-right add-flex a-center">
              <p class="receive-address">
                Ethereum：<span>{{tokenAddress | omittedTextSp}}</span>
              </p>
              <p class="receive-icon" @click="copy(tokenAddress)">
                <img src="@/assets/images/copy.svg">
              </p>
              <p class="receive-icon" @click="addMetamask">
                <img src="@/assets/images/metamask-fox.svg">
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
                <li>
                  <img src="@/assets/images/icon/eth.svg">
                  <div class="tokens-name">
                    <p>
                      <span>{{tokenName}}</span>
                      <span>{{tokenAddress | omittedText}}</span>
                    </p>
                  </div>
                  <div class="tokens-copy" @click="copy(tokenAddress)">
                    <img src="@/assets/images/copy.svg">
                  </div>
                  <div class="tokens-metamask" @click="addMetamask">
                    <img src="@/assets/images/metamask-fox.svg">
                  </div>
                </li>
                <li>
                  <img src="@/assets/images/icon/dai.svg">
                  <div class="tokens-name">
                    <p>
                      <span>Tron20</span>
                      <span>TR7NHq...zgjLj6t</span>
                    </p>
                  </div>
                  <div class="tokens-copy" @click="copy(tokenAddress)">
                    <img src="@/assets/images/copy.svg">
                  </div>
                  <div class="tokens-metamask" @click="addMetamask">
                    <img src="@/assets/images/metamask-fox.svg">
                  </div>
                </li>
                <li>
                  <img src="@/assets/images/icon/dai.svg">
                  <div class="tokens-name">
                    <p>
                      <span>Tron20</span>
                      <span>TR7NHq...zgjLj6t</span>
                    </p>
                  </div>
                  <div class="tokens-copy" @click="copy(tokenAddress)">
                    <img src="@/assets/images/copy.svg">
                  </div>
                  <div class="tokens-metamask" @click="addMetamask">
                    <img src="@/assets/images/metamask-fox.svg">
                  </div>
                </li>
                <li>
                  <img src="@/assets/images/icon/dai.svg">
                  <div class="tokens-name">
                    <p>
                      <span>Tron20</span>
                      <span>TR7NHq...zgjLj6t</span>
                    </p>
                  </div>
                  <div class="tokens-copy" @click="copy(tokenAddress)">
                    <img src="@/assets/images/copy.svg">
                  </div>
                  <div class="tokens-metamask" @click="addMetamask">
                    <img src="@/assets/images/metamask-fox.svg">
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
        <h3>
          Networks for Deployed Payment Contract
        </h3>
      </div>
      <div class="deployed">
        <div class="deployed-wrapper add-flex j-between">
          <button :class="{'active': networkName === 'Ethereum'}" class="btn __s sp-fixed">
            <span class="btn-icon">
              <img src="@/assets/images/network/ethereum.svg" alt="Web3 Payment">
            </span>
            Ethereum Main net
          </button>
          <button :class="{'active': networkName === 'BSC Mainnet'}" class="btn __s sp-fixed">
            <span class="btn-icon">
              <img src="@/assets/images/network/binance.svg" alt="Web3 Payment">
            </span>
            Binance Smart Chain Mainnet
          </button>
          <button :class="{'active': networkName === 'Matic Mainnet'}" class="btn __s sp-fixed">
            <span class="btn-icon">
              <img src="@/assets/images/network/matic.svg" alt="Web3 Payment">
            </span>
            Matic Network（Polygon）
          </button>
          <button :class="{'active': networkName === 'Avalanche Mainnet'}" class="btn __s sp-fixed">
            <span class="btn-icon">
              <img src="@/assets/images/network/avalanche.svg" alt="Web3 Payment">
            </span>
            Avalanche Mainnet C-Chain
          </button>
        </div>
        <p>
          *You can deploy or update your new network <a href="/">here</a>.
        </p>
      </div>
      <div class="title">
        <h3>
          Payment's summary
        </h3>
      </div>
      <div class="items">
        <dash-item v-for="(item, index) in itemList" :item-data="item" :key="index" />
      </div>
    </div>
  </div>
</template>


<script>
import moment from 'moment'
import NumberFormat from 'number-format.js'
import DashItem from "@/components/organisms/admin/AdminDashItem"
import Web3ProviderEvents from '@/components/mixins/Web3ProviderEvents'
import RequestUtility from '@/utils/request'
import { NETWORKS } from '@/constants'

export default {
  name: 'PaymentTop',
  mixins: [Web3ProviderEvents],
  components: {
    DashItem
  },
  data() {
    return{
      currentTab: null,
      success: true,
      items: {
        monthlyAmount: {value: '0 USDT', text: 'monthly total amount'},
        monthlyCount: {value: '0', text: 'monthly total count'},
        weeklyAmount: {value: '0 USDT', text: 'weekly total amount'},
        weeklyCount: {value: '0', text: 'weekly total count'},
        todayAmount: {value: '0 USDT', text: 'today total amount'},
        todayCount: {value: '0', text: 'today total amount'}
      },
      tabs: {
        usdt: 1,
        usdc: 2,
        dai: 3,
        jpyc: 4
      },
      tokenName: 'Ethereum',
      tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      selectTokens: false,
    }
  },
  computed: {
    selectUsdt() {
      return this.currentTab === this.tabs.usdt
    },
    selectUsdc() {
      return this.currentTab === this.tabs.usdc
    },
    selectDai() {
      return this.currentTab === this.tabs.dai
    },
    selectJpyc() {
      return this.currentTab === this.tabs.jpyc
    },
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    itemList() {
      return Object.values(this.items)
    },
    networkName() {
      if (this.$store.state.web3.chainId !== null) {
        return NETWORKS[
          this.$store.state.web3.chainId
        ].name
      } else {
        return ''
      }
    },
  },
  methods: {
    copy(value) {
      this.$store.dispatch('account/copied')
      this.$clipboard(value);
    },
    // 受け取るトークンを選択中
    switchToken(targetTab) {
      this.currentTab = targetTab
    },
    // 受け取るトークンを選択後モーダルを表示
    slectedToken(){
      this.$store.dispatch('modal/show', {
        target: 'receive-modal',
        size: 'small'
      })
    },
    // Settingへ移動
    goSettings(){
      this.$router.push('/admin/web3payment?id=2')
      // 設定完了
      this.$store.dispatch('account/settingComplete')
    },
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
    // ネットワーク一覧を表示/非表示
    openBox(){
      this.selectTokens = !this.selectTokens;
    },
    // メタマスクにTokenを登録
    addMetamask(){
      alert("Register the tokenAddress in the MetaMask")
    }
  },
  created() {
    this.currentTab = this.tabs.usdt;
    this.apiGetPaymentSummary().then((response) => {
      const summary = response.data
      this.items.monthlyAmount.value = NumberFormat('0.00 USDT', summary.monthly.total_amount)
      this.items.monthlyCount.value = summary.monthly.total_count
      this.items.weeklyAmount.value = NumberFormat('0.00 USDT', summary.weekly.total_amount)
      this.items.weeklyCount.value = summary.weekly.total_count
      this.items.todayAmount.value = NumberFormat('0.00 USDT', summary.daily.total_amount)
      this.items.todayCount.value = summary.daily.total_count
    })
  },
  // アドレスを短縮表示
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
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.DASHBOARD{
  margin-bottom: 120px;
  .title-gradation{
    background: $gradation-light;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 150% 150%;
    font-weight: 600;
    display: inline-block;
    font-size: 24px;
    margin-bottom: 8px;
  }
  .welcome-desc{
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 44px;
  }
  .welcome-image{
    width: fit-content;
    @include media(sp) {
      width: 80%;
      margin: auto;
    }
    figure{
      width: 500px;
      margin-bottom: 48px;
      @include media(sp) {
        width: 300px;
      }
    }
  }
  .title{
    margin-bottom: 24px;
    h3{
      font-size: 20px;
      font-weight: 400;
    }
  }
  .welcome-receice_contents{
    text-align: center;
    width: fit-content;
    
    &.auto{
      margin: auto;
    }
    .welcome-receice_btnwrap{
      margin: auto;
    }
    .welcome-receice_tokens{
      justify-content: left;
      margin-bottom: 48px;
      @include media(sp) {
        justify-content: space-evenly;
      }
      .one, .two, .tree, .four{
        text-align: center;
        padding: 8px 16px;
        border-radius: 10px;
        width: 120px;
        background: #292536;
        cursor: pointer;
        margin: 0 16px 0 0;
        @include media(sp) {
          margin-bottom: 16px;
        }
        figure{
          margin: 0 auto 10px;
          width: 70px;
        }
        &.active{
          background: #4E455A;
          border: 1px solid #fff;
          padding: 7px 15px;
        }
      }
      @include media(sp) {
        .two{
          margin-right: 0;
        }
      }
      .four{
        margin-right: 0;
      }
      .welcome-receice_name{
        font-size: 14px;
        margin-bottom: 10px;
      }
      .welcome-receice_box{
        font-size: 10px;
        font-weight: 300;
        padding: 8px 10px;
        &.gradation-orange{
          background: $gradation-orange;
        }
        &.gradation-dark{
          background: $gradation;
        }
        &.gradation-gray{
          background: #5D5D5D;
        }
      }
    }
    .welcome-receice_btn{
      background: $gradation-light;
      display: inline-block;
      text-align: center;
      font-size: 14px;
      width: 260px;
      height: 54px;
      line-height: 54px;
      border-radius: 8px;
      cursor: pointer;
    }
  }
  .receive{
    margin-bottom:  56px;
    @include media(sp) {
      margin-bottom:  24px;
    }
    .receive-contents{
      margin-bottom: 8px;
      cursor: pointer;
      position: relative;
      .tokens-wrapper{
        z-index: 9999;
        visibility: visible;
        position: absolute;
        right: 0px;
        top: 0px;
        margin: 0px;
        transform: translate(120px, 50px);
        background: #292536;
        width: 242px;
        max-height: 180px;
        overflow-y: scroll;
        padding: 16px;
        border-radius: 8px;
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
              margin-right: 8px;
            }
            p{
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
                vertical-align: initial;
              }
            }
            .tokens-metamask{
              margin-left: 8px;
              img{
                width: 22px;
                vertical-align: initial;
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
          margin: 0 16px;
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
        padding: 10px 16px;
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
    .btn{
      width: 214px;
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
}
</style>