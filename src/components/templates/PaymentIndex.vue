<template>
  <div class="slash-bg">
    <Header
      :width="windowWidth"
      @switchColorTheme="switchColorTheme"
    />
    <div class="payment">
      <div class="menu-nav" v-if="showMenu">
        <div class="menu-nav_top">
          <img src="@/assets/images/menu.svg">
        </div>
        <div class="menu-nav_body">
          <!-- <a href="/">
            Cookie settings
          </a> -->
          <a href="https://slash-fi.gitbook.io/docs/whitepaper/slash-project-white-paper" target="_blank">
            About Slash.fi
          </a>
          <a href="https://slash-fi.gitbook.io/docs/support/help-center" target="_blank">
            FAQ
          </a>
          <a href="https://slash-fi.gitbook.io/docs/support/terms-of-use" target="_blank">
            Terms of Service
          </a>
          <a href="https://slash-fi.gitbook.io/docs/support/data-protection-and-privacy-policy" target="_blank">
            Privacy Policy
          </a>
          <a href="https://slash-fi.gitbook.io/docs/support/anti-money-laundering-policy" target="_blank">
            AML Policy
          </a>
        </div>
      </div>
      <payment-top
        :showMenu="showMenu"
        @copyLink="copyLink"
        @toggleMenu="toggleMenu"
      />
      <div class="add-flex j-between">
        <div>
          <p class="payment_Receiver mb-1" :class="{ 'domain-verified':isVerifiedDomain }">
            Payee：{{ receiver }}
          </p>
          <p class="payment_invoice-id">
            Invoice ID：{{ invoiceId }}
          </p>
        </div>
          <router-view />
      </div>
    </div>
    <div v-if="showFooterMenu" class="sp">
      <div class="fixed add-flex j-between a-center">
        <button class="btn __pg __s sp-fixed"  @click="openModal('wallet-modal', 'small')">
          <span class="icon-wrap">
            <img src="@/assets/images/wallet-connect_w.svg">
          </span>
          Connect to a wallet
        </button>
        <button class="btn __pg __s sp-fixed" @click="copyLink">
          <span class="icon-wrap">
            <img src="@/assets/images/link.svg">
          </span>
          Copy URL
        </button>
        <span class="toggle-theme">
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
  </div>
</template>


<script>
import Header from '@/components/organisms/header'
import PaymentTop from '@/components/organisms/PaymentTop'
import { DARK_THEME, LIGHT_THEME } from '@/constants'

export default {
  name: 'PaymentIndex',
  components: {
    Header,
    PaymentTop,
  },
  props: [
    'colorTheme',
    'showFooterMenu',
    'receiver',
    'isVerifiedDomain',
    'invoiceId',
    'base64VuexData'
  ],
  data() {
    return {
      windowWidth: window.innerWidth,
      showMenu: false
    }
  },
  computed: {
    darkTheme() {
      return DARK_THEME
    },
    lightTheme() {
      return LIGHT_THEME
    },
    isDarkTheme() {
      return this.colorTheme === this.darkTheme
    },
    isLightTheme() {
      return this.colorTheme === this.lightTheme
    },
    isShowMenu() {
      return this.showMenu
    }
  },
  methods: {
    openModal(target, size) {
      this.$emit('openModal', target, size)
    },
    switchColorTheme(color) {
      this.$emit('switchColorTheme', color)
    },
    handleWindowResize() {
      this.windowWidth = window.innerWidth
    },
    copyLink() {
      this.$store.dispatch('account/copied')
      const currentUrl = window.location.href
      this.$clipboard(`${currentUrl}?vx=${this.base64VuexData}`);
    },
    toggleMenu(state) {
      this.showMenu = state
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleWindowResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
  .slash-bg{
    width: 100%;
    min-height: 120vh;
    @include media(sp) {
      min-height: 140vh;
    }
    position: relative;
    &::before{
      content: "";
      background: url(/assets/images/slash-bg.png) no-repeat center center;
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 100px;
      z-index: 0;
      @include media(sp) {
        top: 70px;
      }
    }
  }
.theme--light {
  .slash-bg{
    &::before{
      content: "";
      background: url(/assets/images/slash-bg-l.png) no-repeat center center;
    }
  }
}
.home{
  text-align: center;
}
.payment{
  position: absolute;
  top: 60vh;
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow: var(--color_shadow);
  width: 100%;
  max-width: 36.1rem;
  padding: 32px 24px 24px;
  border-radius: 8px;
  background: var(--color_bg);
  @include media(sp) {
    top: calc(50% + 12rem);
  }
  &::before{
    content: "Slash.fi Web3 Payment ®︎";
    font-size: 11px;
    color: var(--color_font);
    font-weight: 100;
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: .7;
  }
  .menu-nav{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color_bg);
    padding: 32px;
    z-index: 1;
    border-radius: 10px;
  }
  .menu-nav_top{
    margin-bottom: 32px;
  }
  .menu-nav_body{
    a{
      display: block;
      font-size: 18px;
      font-weight: 100;
      margin-bottom: 24px;
    }
  }
  .payment_Receiver,
  .payment_invoice-id{
    font-weight: 400;
    font-size: 15px;
  }
  .domain-verified {
    &::after{
      content: "";
      background: url(/assets/images/domain-verified.svg) no-repeat center center;
      width: 17px;
      height: 17px;
      position: absolute;
      margin-top: 3px;
      margin-left: 8px;
    }
  }
}
.fixed{
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  padding: 16px;
  background: var(--color_darken);
  .btn{
    font-size: 12px;
    height: 4.2rem;
    line-height: 4.2rem;
    padding: 0 1.4rem;
    .icon-wrap{
      margin-right: 4px;
    }
    img{
      vertical-align: middle;
      width: 18px;
      height: 18px;
    }
  }
}
</style>