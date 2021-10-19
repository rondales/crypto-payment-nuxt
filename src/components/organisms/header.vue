<template>
  <header class="global-header">
    <div class="global-header__inner">
      <div class="add-flex a-center">
        <h1 class="logo"><img src="@/assets/images/logo.svg" alt="Web3 Payment"></h1>
        <div class="user-status" :class="{'is-admin': $route.name === 'admin'}">
          merchant
        </div>
        <div @click="open()" class="humberger" :class="{'active': $store.state.humberger === true}">
          <button type="button" class="menu-btn" >
            <img src="@/assets/images/humberger.png" alt="">
          </button>    
        </div>
      </div>
      <div class="global-header__actions">
        <button v-if="$store.state.network === null" class="btn __s sp-fixed" @click="networkModal('network-modal')">
          <span class="btn-icon">
            <img src="@/assets/images/select.svg" alt="Web3 Payment">
          </span>
          Select Network
        </button>

        <button v-else-if="$store.state.network === 'eth'" class="btn __s sp-fixed">
          <span class="btn-icon">
            <img src="@/assets/images/h-eth.svg" alt="Web3 Payment">
          </span>
          Ethereum
        </button>

        <button v-else-if="$store.state.network === 'bsc'" class="btn __s sp-fixed">
          <span class="btn-icon">
            <img src="@/assets/images/h-bsc.svg" alt="Web3 Payment">
          </span>
          BSC
        </button>

        <button v-if="$store.state.isLogin && $store.state.network === 'eth'" class="account-wallet">
          <span class="price">0.04247ETH</span>
          <span class="id">{{ formatWalletAddress }}</span>
        </button>
        <button v-else-if="$store.state.isLogin && $store.state.network === 'bsc'" class="account-wallet">
          <span class="price">0.04247BNB</span>
          <span class="id">{{ formatWalletAddress }}</span>
        </button>
        <button v-else-if="$store.state.isLogin && $store.state.network === null" class="account-wallet">
          <span class="price">Network not selected</span>
          <span class="id">{{ formatWalletAddress }}</span>
        </button>
        <!-- <p v-else-if="$store.state.isLogin">
          selec Network
        </p> -->
        <button v-else class="btn __g __s sp-fixed"  @click="walletModal('wallet-modal')">
          Connect to a wallet
        </button>
      </div>
    </div>
  </header>
</template>

<script>

  export default {
    name: 'Header',
    data(){
      return{
        humberger: false
      }
    },
    components: {
    },
    computed: {
      formatWalletAddress() {
        if ((this.$store.state.web3.walletAddress)) {
          const prefix = this.$store.state.web3.walletAddress.substr(0, 6);
          const sufix = this.$store.state.web3.walletAddress.slice(-4);
          return prefix + '…' + sufix;
        } else {
          return '';
        }
      }
    },
    methods: {
    networkModal(target) {
      this.$store.dispatch("openModal", {target: target, size: "medium"});
    },
    walletModal(target) {
      this.$store.dispatch("openModal", {target: target, size: "small"});
    },
    open(){
      this.$store.dispatch("humberger", {humberger: true});
    }
    },
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
  .humberger{
    display: none;
    @include media(sp) {
      display: block;
      position: relative;
      width: 24px;
      height: 24px;
      overflow: hidden;
      margin-left: 32px;
      &.active{
        .menu-btn{
          top: 0;
        }
      }
      .menu-btn{
        position: absolute;
        top: -24px;
      }
    }
  }
  .is-admin{
    display: block;
  }
  .global-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #58466E;
    width: 100%;
    position: fixed;
    top: 0;
    background: #171522;
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
    }
    @include media(sp) {
      height: 72px;
      padding: 0 24px;
      bottom: 0;
      .logo {
        height: 24px;
      }
    }
    .logo {
      white-space: nowrap;
    }
    &__actions {
      display: flex;
      align-items: center;
      @include media(sp) {
        height: auto;
        padding: 24px;
        position: fixed;
        bottom: 0;
        left: 0;
        transform: translate(0,0);
        z-index: 99;
        display: flex;
        flex-wrap: wrap;
        background: #171522;
        width: 100%;
      }
    }
    .sp-fixed{
      @include media(sp) {
        width: 100%;
        &:nth-child(1){
          margin-bottom: 8px;
        }
      }
    }
    button{
      margin-right: 2rem;
      @include media(sp) {
        margin-right: 0;
      }
      span{
        margin-right: 8px;
      }
    }
  }
  .account-wallet {
    font-weight: 700;
    display: flex;
    align-items: center;
    background: $light-black;
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
        height: 42px;
        line-height: 42px;
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
  .btn-icon{}
</style>