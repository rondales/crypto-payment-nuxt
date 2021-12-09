<template>
  <div class="payment_top">
    <div class="payment_headbox add-flex j-between a-center">
      <div v-if="!$store.state.invoicePage" class="logo add-flex a-end">
        <figure>
          <img src="@/assets/images/slash.svg">
        </figure>
        <div class="product_name">
          Web3 Payment
        </div>
      </div>
      <div class="add-flex a-end j-between" v-if="$store.state.invoicePage">
        <div class="logo copy" @click="copyLink(address)">
          <figure>
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/link.svg">
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/link-l.svg">
          </figure>
        </div>
      </div>
      <div v-if="$store.state.invoicePage">
        <div class="logo">
          <figure>
            <img src="@/assets/images/invoice.svg">
          </figure>
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
      success: true,
      invoice: false,
      address: "hogefugahogefuga"
    }
  },
  methods: {
    open(){
      this.$store.dispatch("humberger", {humberger: true});
    },
    copyLink(value){
      this.$clipboard(value);
    },
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
  .copy{
    cursor: pointer;
  }
  .hamburger{
    display: block;
    position: relative;
    width: 24px;
    height: 24px;
    overflow: hidden;
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