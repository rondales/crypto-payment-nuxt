<template>
  <div class="payment_usdt add-flex border j-between">
    <div class="payment_usdt_name add-flex j-between a-center">
      <div class="payment_usdt_logo">
        <img src="@/assets/images/usdt.png" alt="">
      </div>
      <dl>
        <dt>
          Total Payment
        </dt>
        <dd>
          USDT
        </dd>
      </dl>
    </div>
    <div class="payment_usdt-price border j-between">
      <input type="text" placeholder="1001.00">
      <span>
        0.1 % Fees included
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentUsdt',
    data() {
      return{
        success: false
      }
    },
  components: {
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.payment-arrow{
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translate(0, -50%);
}
.payment_usdt{
  padding: 24px;
  dl{
    dt{
      font-weight: 400;
      font-size: 15px;
    }
  }  
  .payment_usdt_name{
    width: 28%;
    @include media(sp) {
      width: 100%;
      justify-content: flex-start;
      margin-bottom: 16px;
    }
  }
  .payment_usdt_logo{
    img{
      border-radius: 8px;
    }
    @include media(sp) {
      margin-right: 16px;
    }    
  }
  .payment_usdt-price{
    padding: 10px 16px;
    min-width: 410px;
    width: 410px;
    @include media(sp) {
      width: 100%;
      min-width: auto;
    }
    input{
      font-weight: 500;
      font-size: 25px;
      width: 70%;
      height: 100%;  
      @include media(sp) {
        width: 55%;
      }          
    }
    span{
      vertical-align: middle;
      font-size: 11px;
    }
  }
}
.payment_usdt{
  dl{
    dd{
      font-size: 25px;
    }
  }  
}

</style>