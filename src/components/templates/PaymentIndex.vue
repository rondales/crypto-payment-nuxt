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
            Receiver：{{Receiver}}
          </p>
          <p class="payment_invoice-id">
            Invoice ID: {{invoiceId | maskText}}
          </p>      
        </div>
          <router-view /> 
      </div>
    </div>
  </div>
</template>


<script>
import Header from "@/components/organisms/header"
import PaymentTop from '@/components/organisms/PaymentTop'

export default {
  name: 'payment',
    data() {
      return {
        Receiver: "E-check.online",
        invoiceId: "hogehogefugafuga",        
      }
    },
  components: {
    Header,
    PaymentTop,
  },
  methods: {
    openModal(target) {
      this.$store.dispatch("openModal", {target: target, size: "small"});
    },
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
</style>