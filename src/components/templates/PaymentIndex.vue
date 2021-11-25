<template>
  <div>
    <Header />
    <div class="payment">
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
  box-shadow:
    -20px 20px 70px rgba(139, 42, 225, 0.7),
    20px -20px 70px rgba(62, 185, 252, 0.7);
  width: 100%;
  max-width: 36.1rem;
  padding: 32px 24px 24px;
  border-radius: 8px;
  background: #292536;
  @include media(sp) {
    top: calc(50% + 12rem);
  }
  .payment_Receiver,
  .payment_invoice-id{
    font-size: 15px;
  }  
}
</style>