<template>
  <div>
    <Header />
    <div class="payment">
      <div class="menu-nav" v-if="$store.state.humberger">
        <div class="menu-nav_top">
          <img src="@/assets/images/menu.svg">
        </div>
        <div class="menu-nav_body">
          <a href="/">
            Cookie settings
          </a>
          <a href="/">
            About Slash.fi
          </a>
          <a href="/">
            Frequently Asked Questions
          </a>
          <a href="/">
            Terms or Service
          </a>
          <a href="/">
            Privacy Policy
          </a>
          <a href="/">
            AML・KYC Policy
          </a>
        </div>
      </div>
      <payment-top />
      <div class="add-flex j-between">
        <div>
          <p class="payment_Receiver mb-1">
            Receiver：{{ merchantDomain }}
          </p>
          <p class="payment_invoice-id">
            Invoice ID: {{ invoiceId }}
          </p>
        </div>
          <router-view />
      </div>
    </div>
    <div class="sp">
      <div class="fixed add-flex j-between a-center">
        <button class="btn __pg __s sp-fixed"  @click="openModal('wallet-modal', 'small')">
          <span class="icon-wrap">
            <img src="@/assets/images/wallet-connect_w.svg">
          </span>
          Connect to a wallet
        </button>
        <button class="btn __pg __s sp-fixed">
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
      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/organisms/header'
import PaymentTop from '@/components/organisms/PaymentTop'

export default {
  name: 'PaymentIndex',
  components: {
    Header,
    PaymentTop,
  },
  computed: {
    merchantDomain: function() {
      return this.$store.state.paymentData.merchantDomain
    },
    invoiceId: function() {
      return this.$store.state.paymentData.orderCode
    }
  },
  methods: {
    openModal(target, size) {
      this.$store.dispatch('openModal', { target: target, size: size });
    },
    changeTheme(theme) {
      this.$store.dispatch("changeTheme", theme);
    }
  },
  filters: {
    maskText(text) {
      text = "*************";
      return text;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

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
    font-size: 15px;
  }
}
.fixed{
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  padding: 16px 8px;
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