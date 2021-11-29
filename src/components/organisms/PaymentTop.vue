<template>
  <div class="payment_top">
    <div class="payment_headbox add-flex j-around a-center">
      <div class="logo add-flex a-end">
        <figure>
          <img src="@/assets/images/slash.svg">
        </figure>
        <div class="product_name">
          Web3 Payment
        </div>
      </div>
      <div class="hamburger" @click="open()" :class="{'active': $store.state.humberger === true}">
        <button type="button" class="menu-btn" >
          <img v-if="$store.state.theme == 'dark'" src="@/assets/images/hamburger.svg" alt="">
          <img v-if="$store.state.theme == 'light'" src="@/assets/images/hamburger-light.svg" alt="">
        </button> 
      </div>      
    </div>
  </div>
</template>


<script>
export default {
  name: 'PaymentTop',
    data() {
      return{
        success: true
      }
    },
  methods: {
    open(){
      this.$store.dispatch("humberger", {humberger: true});
    }
  },
  components: {
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.payment_top{
  margin-bottom: 16px;
  .logo{
    .product_name{
      font-size: 15px;
      margin-left: 16px;
      font-weight: 100;
    }
  }
  .hamburger{
    display: block;
    position: relative;
    width: 24px;
    height: 24px;
    overflow: hidden;
    margin-left: 32px;
    z-index: 2;
    &.active{
      .menu-btn{
        top: 0;
      }
    }
    .menu-btn{
      position: absolute;
      top: -23px;
    }
  } 
}
</style>