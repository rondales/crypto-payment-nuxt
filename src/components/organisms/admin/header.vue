<template>
  <header class="global-header">
    <div class="global-header__inner">
      <div class="add-flex a-center">
        <h1 class="logo">
          <img class="pc" src="@/assets/images/logo.svg" alt="Web3 Payment">
          <img v-if="connected" class="sp" src="@/assets/images/logo-icon.svg" alt="Web3 Payment">
          <img v-else class="sp" src="@/assets/images/logo-sp.svg" alt="Web3 Payment">
        </h1>
        <p class="logo-sub">
          {{ subTitle }}
        </p>
        <div class="testnet-navbar" v-if="isUseTestnet" v-on:mouseover="mouseOver" v-on:mouseleave="mouseLeave">
          <span>
            Testnet
          </span>
          <div class="testnet-hovercontens" v-if="isHover">
            <p>
              You are on the Slash test network.
              If you want to use the product, Please wait for a little while longer.
              <!--Go to <a href="https://slash.fi/admin">https://slash.fi/admin</a> -->
            </p>
          </div>
        </div>
        <div v-if="isAdminPage && isConnected && isFixedReceiveToken" class="user-status">
          ReceiveToken：<img :src="receiveTokenIcon"><span>{{ receiveTokenSymbol }}</span>
        </div>
      </div>
      <div class="global-header__actions add-flex a-center">
        <div v-if="show" class="pc">
          <button v-if="connected && fixedNetwork" v-on="isAdminPage ? { click: showNetworkModal } : {}" 
            :class="{ pointer: isAdminPage }" class="btn __s sp-fixed">

            <span v-if="isSupportedNetwork" class="btn-icon">
              <img :src="networkIcon" alt="Web3 Payment">
            </span>
            {{ networkName }}
          </button>
        </div>
        <div v-if="show" class="ml-1">
          <button v-if="connected" class="account-wallet" :class="{ admin: isAdminPage }" @click="toggleSubMenu">
            <span v-if="isSupportedNetwork" class="price">{{ balance | balanceFormat }} {{ symbol }}</span>
            <span v-else class="price unknown">Balance unknown</span>
            <span v-if="!isWalletPending" class="id" :class="{ __g: isAdminPage, __pg: !isAdminPage }">{{ walletAddress | walletAddressFormat }}</span>
            <div v-else-if="isWalletPending" class="id __pg">
              <div class="loading-wrap-header loading-wrap active">
                  <img class="spin spin-header" src="@/assets/images/loading.svg">
              </div>
              Pending
            </div>
          </button>
          <button v-else class="btn __s sp-fixed" :class="{ __g: isAdminPage, __pg: !isAdminPage }"  @click="showWalletModal">
            Connect to wallet
          </button>
        </div>
        <span v-if="isPaymentPage" class="toggle-theme">
          <button
            :class="[
              'theme-button',
              '--light',
              { 'is-active': isLightTheme },
            ]"
            @click="switchColorTheme(lightTheme)"
            v-if="isDarkTheme"
          >
            <img src="@/assets/images/light.svg" alt="">
          </button>
          <button
            :class="[
              'theme-button',
              '--dark',
              { 'is-active': isDarkTheme },
            ]"
            @click="switchColorTheme(darkTheme)"
            v-if="isLightTheme"
          >
            <img src="@/assets/images/dark.svg" alt="">
          </button>
        </span>
      </div>
    </div>
    <div v-if="this.$store.state.accountMenu" class="account-menu">
      <ul>
        <li @click="openAccountModal()">
          <p>
            Account
          </p>
          <img src="@/assets/images/account.svg" alt="">
        </li>
        <li @click="editNote()" >
          <p>
            Account Note
          </p>
          <img src="@/assets/images/edit.svg" alt="">
        </li>
        <li>
          <div class="account-note">
            {{accountNote}}
          </div>
        </li>
        <li>
          <router-link class="add-flex j-between a-center" to="/admin/payment/history">
            <p>
              History
            </p>
            <img src="@/assets/images/history.svg" alt="">
          </router-link>
        </li>
        <li>
          <router-link class="add-flex j-between a-center" to="/admin/payment/settings/contract">
            <p>
              Settings
            </p>
            <img src="@/assets/images/settings.svg" alt="">
          </router-link>
        </li>
        <!-- <li>
          <router-link class="add-flex j-between a-center" to="/admin/store">
            <p>
              Store apps
            </p>
            <img src="@/assets/images/scan.svg" alt="">
          </router-link>
        </li> -->
        <li @click="disconnect()">
          <p>
            Disconnect
          </p>
          <img src="@/assets/images/logout.svg" alt="">
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import Web3 from 'web3'
import { Decimal } from 'decimal.js'
import { WALLET_CONNECT, METAMASK, DARK_THEME, LIGHT_THEME, NETWORKS } from '@/constants'
import AvailableNetworks from '@/network'

export default {
  name: 'Header',
  props: ['width'],
  data() {
    return {
      monitoringInterval: null,
      receiveTokenIcons: {
        USDT: require('@/assets/images/symbol/usdt.svg'),
        USDC: require('@/assets/images/symbol/usdc.svg'),
        DAI: require('@/assets/images/symbol/dai.svg'),
        JPYC: require('@/assets/images/symbol/jpyc.svg'),
        WETH: require('@/assets/images/symbol/eth.svg'),
        ETH: require('@/assets/images/symbol/eth.svg'),
        BNB: require('@/assets/images/symbol/bnb.svg'),
        MATIC: require('@/assets/images/symbol/matic.svg'),
        AVAX: require('@/assets/images/symbol/avax.svg')
      },
      isHover: false
    }
  },
  watch: {
    $route(to, from) {
      if(from.fullPath === "/payment") {
        this.show = true
      }
    },
    chainId(id) {
      if (id) {
        this.$web3.getAccountData(
          this.$store.state.web3.instance,
          id
        ).then((account) => {
          this.$store.dispatch('account/update', account)
        })
      }
    }
  },
  filters: {
    balanceFormat(balance) {
      return Decimal(balance).toFixed(4, Decimal.ROUND_FLOOR)
    },
    walletAddressFormat(walletAddress) {
      if ((walletAddress)) {
        const prefix = walletAddress.substr(0, 6);
        const sufix = walletAddress.slice(-4);
        return prefix + '…' + sufix;
      } else {
        return '';
      }
    }
  },
  computed: {
    MONITORING_INTERVAL_CYCLE() {
      return 3000
    },
    darkTheme() {
      return DARK_THEME
    },
    lightTheme() {
      return LIGHT_THEME
    },
    subTitle() {
      let subTitle = ''
      if (this.$route.name === 'admin') {
        subTitle = 'Apps'
      } else {
        subTitle = 'Web3 Payment'
      }
      return subTitle
    },
    isDarkTheme() {
      return this.$store.state.theme === this.darkTheme
    },
    isLightTheme() {
      return this.$store.state.theme === this.lightTheme
    },
    isAdminPage() {
      return this.$route.name === 'admin'
    },
    isPaymentPage() {
      const currentPath = this.$route.path
      const pattern = /^\/payment\//
      return pattern.test(currentPath)
    },
    isConnected() {
      return (this.$store.state.web3.instance)
    },
    isFixedReceiveToken() {
      return (this.$store.state.account.receiveSymbol)
    },
    isUseTestnet() {
      return !JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
    },
    isSupportedNetwork() {
      const systemAvailableNetworks = Object.values(AvailableNetworks).map((network) => {
        return network.chainId
      })
      return this.$store.state.web3.chainId && systemAvailableNetworks.includes(this.$store.state.web3.chainId)
    },
    receiveTokenSymbol() {
      return this.$store.state.account.receiveSymbol
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[
        this.$store.state.account.receiveSymbol
      ]
    },
    walletAddress() {
      return this.$store.state.account.address
    },
    chainId() {
      return this.$store.state.web3.chainId
    },
    networkName() {
      if (this.isSupportedNetwork) {
        return NETWORKS[
          this.$store.state.web3.chainId
        ].name
      } else {
        return 'Not supported network'
      }
    },
    networkIcon() {
      return NETWORKS[
        this.$store.state.web3.chainId
      ].icon
    },
    symbol() {
      return this.$store.state.account.symbol
    },
    balance() {
      return this.$store.state.account.balance
    },
    show() {
      const pathPattern = /^\/(admin$|admin\/.+)|(payment\/(wallets|token|detail)\/.+)/
      return pathPattern.test(this.$route.path)
    },
    connected() {
      return (this.$store.state.web3.instance)
    },
    fixedNetwork() {
      return (this.$store.state.web3.chainId)
    },
    accountNote() {
      return this.$store.state.account.note ? this.$store.state.account.note : 'No note found!'
    },
    isWalletPending() {
      return this.$store.state.wallet.pending
    },
    isSetWeb3Instance() {
      return this.$store.state.web3.instance instanceof Web3
    },
    isSetWeb3ProviderType() {
      return this.$store.state.web3.provider === METAMASK
              || this.$store.state.web3.provider === WALLET_CONNECT
    },
  },
  methods: {
    showWalletModal() {
      this.$store.dispatch('modal/show', {
        target: 'wallet-for-admin-modal',
        size: 'small'
      })
    },
    showNetworkModal() {
      this.$store.dispatch('modal/show', {
        target: 'switch-network-for-admin-modal',
        size: 'medium'
      })
    },
    switchColorTheme(color) {
      this.$emit('switchColorTheme', color)
    },
    toggleSubMenu(){
      if (this.isAdminPage) {
        this.$store.dispatch("toggleAccountMenu");
      }
    },
    openAccountModal(){
      this.$store.dispatch("modal/show", {target: 'account-modal', size: "small"});
    },
    editNote(){
      this.$store.dispatch("modal/show", {target: 'edit-account-note-modal', size: "small"});
    },
    disconnect(){
      this.toggleSubMenu()
      if (this.$store.state.web3.provider === WALLET_CONNECT) {
        this.$web3.disconnectByWalletConnect(
          this.$store.state.web3.instance
        )
      }
      this.$router.push({ path: '/admin' })
    },
    mouseOver(){
      this.isHover = true;
    },
    mouseLeave(){
      this.isHover = false;
    },
    pollAccountData() {
      if(this.isSetWeb3Instance && this.isSetWeb3ProviderType) {
        this.$web3.getAccountData(
          this.$store.state.web3.instance,
          this.$store.state.web3.chainId
        ).then((account) => {
          this.$store.dispatch('account/update', account)
        })
      }
    }
  },
  created() {
    this.monitoringInterval = setInterval(this.pollAccountData, this.MONITORING_INTERVAL_CYCLE)
  },
  beforeDestroy() {
    clearInterval(this.monitoringInterval)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/old/style.scss';
.testnet-navbar{
  background: #DE4437;
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 20px;
  margin-top: 8px;
  margin-left: 8px;
  margin-right:16px;
  @include media(sp) {
    margin: 0 0 0 2px;
    font-size: 8px;
    padding: 2px 4px;
  }
  cursor: pointer;
  position: relative;
  .testnet-hovercontens{
    position: absolute;
    top: 32px;
    left: 0;    
    p{
      width: 260px;
      background: $gray;
      padding:8px 16px;
      border-radius: 8px;
      position: relative;
      a{
        font-weight: 500;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 150% 150%;
        pointer-events: none;
        position: relative;
        &::after{
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(0, -50%);
          width: 100%;
          height: 1px;
          background: #fff;

        }
      }
      &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 20px;
        top: -15px;
        border: 8px solid transparent;
        border-bottom: 8px solid $gray;
      }
    }
  }
}
.user-status{
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  background: $gradation-light;
  padding: 2px 24px;
  border-radius:50px;
  margin-left: 16px;
  align-items: center;
  @include media(sp) {
    display: none;
  }
  img{
    width: 18px;
    height: 24px;
    margin-left: 5px;
    margin-right: 5px;
  }
  @include media(sp) {
    font-size: 12px;
    margin-left: 16px;
    padding: 2px 12px;
  }
  span{
    vertical-align: bottom;
  }
}
.global-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:var(--color_border);
  width: 100%;
  position: fixed;
  top: 0;
  background: var(--color_bg);
  z-index: 1000;
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
  &__actions {
    margin-left: auto;
  }
  @include media(pc) {
    height: 80px;
    padding: 0 24px;
    .logo {
      height: 36px;
    }
    .logo-sub{
      margin-top: 10px;
      margin-left: 16px;
      font-size: 14px;
    }
  }
  @include media(sp) {
    height: 55px;
    padding: 0 20px;
    bottom: 0;
    width: 100%;
    .logo {
      height: 29px;
    }
    .logo-sub{
      display: none;
    }
  }
  .logo {
    white-space: nowrap;
  }
  .sp-fixed{
    @include media(sp) {
      width: 100%;
    }
  }
  .theme-button{
    margin-right: 2rem;
    width: 54px;
    height: 54px;
    vertical-align: middle;
    @include media(sp) {
      width: 32px;
      height: 32px;
      margin-right: 0;
    }
    span{
      margin-right: 8px;
    }
  }
  .btn-icon img {
    width: 26px;
    height: 26px;
  }
}
.account-wallet {
  font-weight: 700;
  display: flex;
  align-items: center;
  background: var(--color_darken);
  cursor: default;
  &.admin {
    cursor: pointer;
  }
  @include media(pc) {
    height: 42px;
    border-radius: 8px;
    padding: 7px 0 7px 7px;
    font-size: 1.2rem;
    .price {
      margin-left: 24px;
      color: #fff;
      &.unknown {
        margin-left: 10px;
        font-weight: 100;
      }
    }
    .id {
      max-width: 192px;
      height: 36px;
      line-height: 36px;
      border-radius: 8px;
      padding: 0 16px;
      margin-left: 16px;
      margin-right: 3px;
      color: #fff;
      box-sizing: border-box;
      &.__g {
        background: $gradation;
      }
      &.__pg {
        background: $gradation-pale;
      }
    }
  }
  @include media(sp) {
    border-radius: 8px;
    padding: 4px;
    font-weight: 400;
    font-size: 14px;
    width: 100%;
    letter-spacing: 0.05em;
    .price{
      max-width: 115px;
      margin: 0 8px;
      color: #fff;
      font-size: 11px;
      &.unknown {
        margin-left: 0px;
      }
    }
    .id {
      max-width: 140px;
      height: 2.5rem;
      line-height: 2.5rem;
      border-radius: 8px;
      padding: 0 10px;
      margin-left: 0;
      margin-right: 0;
      color: #fff;
      box-sizing: border-box;
      font-size: 11px;
      &.__g {
        background: $gradation;
      }
      &.__pg {
        background: $gradation-pale;
      }
    }
  }
  .id {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
}
.btn {
  cursor: default;
  &.__s {
    @include media(sp) {
      height: 3rem;
      font-size: 10px;
      padding: 0 1rem;
    }
  }
  &.pointer {
    cursor: pointer;
  }
}
.toggle-theme {
  text-align: center;
  @include media(pc) {
    margin-left: 24px;
  }
  @include media(sp) {
    margin-left: 8px;
  }
}
.theme-button {
  font-size: 0;
  @include media(pc) {
    .emoji {
      font-size: 28px;
    }
  }
  @include media(sp) {
    .emoji {
      font-size: 2rem;
    }
    &.is-active {
      display: none;
    }
  }
  .emoji {
    font-style: normal;
  }
  &--light {
    grid-row: 1;
    grid-column: 1;
  }
  &--dark {
    grid-row: 1;
    grid-column: 3;
  }
}
.account-menu{
  position: absolute;
  right: 24px;
  top: 70px;
  background: #292536;
  padding: 24px 16px;
  border-radius: 10px;
  @include media(sp) {
    width: 90%;
  }
  ul{
    li{
      font-size: 15px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
      a{
        width: 100%;
      }
      &:nth-child(2){
        img{
          cursor: pointer;
        }
      }
      &:nth-child(3){
        cursor: unset;
        &:hover{
          opacity: 1;
        }
      }
      &:last-child{
        margin-bottom: 0;
      }
      .account-note{
        overflow: scroll;
        background: #171522;
        border-radius: 8px;
        padding: 8px;
        resize: none;
        width: 200px;
        height: 100%;
        max-height: 100px;
        font-size: 11px;
        @include media(sp) {
          width: 100%;
        }
      }
    }
  }
}
.loading-wrap-header {
  display: contents !important;
}
.spin-header {
  height: 20px !important;
  width: 20px !important;
}
</style>