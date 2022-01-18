<template>
  <header class="global-header">
    <div class="global-header__inner">
      <div class="add-flex a-center">
        <h1 class="logo">
          <img class="pc" src="@/assets/images/logo.svg" alt="Web3 Payment">
          <img class="sp" src="@/assets/images/logo-icon.svg" alt="Web3 Payment">
        </h1>
        <p class="logo-sub">
          Web3 Payment
        </p>
        <div class="user-status" :class="{'is-admin': $route.name === 'admin'}">
          merchant
        </div>
      </div>
      <div class="global-header__actions add-flex a-center">
        <span class="toggle-theme pc">
          <button
            :class="[
              'theme-button',
              '--light',
              { 'is-active': $store.state.theme == 'light' },
            ]"
            @click="changeTheme('light')"
            v-if="$store.state.theme == 'dark'"
          >
            <img src="@/assets/images/light.svg" alt="">
          </button>
          <button
            :class="[
              'theme-button',
              '--dark',
              { 'is-active': $store.state.theme == 'dark' },
            ]"
            @click="changeTheme('dark')"
            v-if="$store.state.theme == 'light'"
          >
            <img src="@/assets/images/dark.svg" alt="">
          </button>
        </span>
        <div v-if="show" class="pc">
          <button v-if="connected" class="btn __s sp-fixed">
            <span class="btn-icon">
              <img :src="networkIcon" alt="Web3 Payment">
            </span>
            {{ networkName }}
          </button>
        </div>
        <div v-if="show" class="ml-2">
          <button v-if="connected" class="account-wallet">
            <span class="price">{{ balance | balanceFormat }}{{ symbol }}</span>
            <span class="id">{{ walletAddress | walletAddressFormat }}</span>
          </button>
          <button v-else class="btn __g __s sp-fixed"  @click="openModal('wallet-modal', 'small')">
            Connect to a wallet
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { NETWORKS } from '@/constants'

export default {
  name: 'Header',
  watch: {
    $route(to, from) {
      if(from.fullPath === "/payment") {
        this.show = true
      }
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
    walletAddress() {
      return this.$store.state.account.address
    },
    networkName() {
      return NETWORKS[
        this.$store.state.web3.chainId
      ].name
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
      const pathPattern = /^\/(admin$|admin\/.+)|(payment\/(wallets|token|exchange|detail)\/.+)/
      return pathPattern.test(this.$route.path)
    },
    connected() {
      return (this.$store.state.web3.instance)
    }
  },
  methods: {
    changeTheme(theme) {
      this.$store.dispatch("changeTheme", theme);
    },
    openModal(target, size) {
      this.$store.dispatch('openModal', {target: target, size: size});
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';
  .user-status{
    display: none;
    font-size: 14px;
    font-weight: 200;
    line-height: 24px;
    background: $gradation-light;
    padding: 2px 24px;
    border-radius:50px;
    margin-left: 32px;
    @include media(sp) {
      font-size: 12px;
      margin-left: 16px;
      padding: 2px 12px;
    }
  }
  .is-admin{
    display: block;
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
      width: 1110px;
    }
    @include media(pc) {
      height: 100px;
      padding: 0 80px;
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
      height: 72px;
      padding: 0 24px;
      bottom: 0;
      .logo {
        height: 36px;
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
    @include media(pc) {
      height: 42px;
      border-radius: 8px;
      padding: 7px 0 7px 7px;
      font-size: 1.2rem;
      .price {
        margin-left: 24px;
      }
      .id {
        max-width: 192px;
        height: 36px;
        line-height: 36px;
        border-radius: 8px;
        padding: 0 16px;
        margin-left: 16px;
        margin-right: 0;
        background: $gradation;
        box-sizing: border-box;
      }
    }
    @include media(sp) {
      border-radius: 8px;
      padding: 4px;
      font-size: 1rem;
      width: 100%;
      .price{
        width: 50%;
        margin-right: 0;
      }
      .id {
        max-width: 192px;
        width: 50%;
        height: 34px;
        line-height: 34px;
        border-radius: 8px;
        padding: 0 16px;
        margin-left: 0;
        margin-right: 0;
        background: $gradation;
        box-sizing: border-box;
      }
    }
    .id {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      display: block;
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
</style>