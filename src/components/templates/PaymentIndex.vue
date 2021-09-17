<template>
  <div>
    <Header />
    <div class="payment">
      <PaymentTop />
      <div>
        <div class="payment_input">
          <PaymentUsdt />
          <div class="payment-arrow">
            <img src="@/assets/images/arrow.svg" alt="">
          </div>          
          <PaymentTokens />
        </div>
      </div>
      <button v-if="!$store.state.isLogin" class="btn __g __l" @click="openModal('wallet-modal')">
        Connect to a wallet
      </button>      
      <p class="connected" v-else-if="$store.state.isLogin && !$store.state.bases">
        Select the token you want to pay for
      </p> 
      <button v-else-if="$store.state.bases" class="btn __g __l">
        Payment
      </button>      
    </div>
  </div>
</template>


<script>
import Header from "@/components/organisms/header"
import PaymentTop from '@/components/organisms/PaymentTop'
import PaymentUsdt from '@/components/organisms/PaymentUsdt'
import PaymentTokens from '@/components/organisms/PaymentTokens'

export default {
  name: 'payment',
    data() {
      return{
      }
    },
  components: {
    Header,
    PaymentTop,
    PaymentUsdt,
    PaymentTokens
  },
  methods: {
    openModal(target) {
      this.$store.dispatch("openModal", {target: target, size: "small"});
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.home{
  text-align: center;
}
.payment{
  position: absolute;
  top: calc(50% + 6rem);
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow:
    -20px 20px 70px rgba(139, 42, 225, 0.7),
    20px -20px 70px rgba(62, 185, 252, 0.7);  
  width: 100%;
  max-width: 76.7rem;
  padding: 16px;
  border-radius: 8px;  
  background: #292536;
  @include media(sp) {
    top: calc(50% + 12rem);
  }
}



.payment-arrow{
  margin-top: -10px;
  margin-bottom: -10px;
  margin-left: 24px;
}


.connected{
  text-align: center;
  font-size: 15px;
  font-weight: 100;
  padding: 24px 0;
}
</style>