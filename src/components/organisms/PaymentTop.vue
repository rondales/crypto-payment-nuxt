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
        <div v-if="prevMode" class="logo copy" @click="prevPage">
          <figure>
            <img :src="prevIcon">
          </figure>
        </div>
        <div v-else class="logo copy" @click="copyLink">
          <figure>
            <img :src="linkIcon">
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
      <div class="hamburger" @click="open()" :class="{'active': $store.state.hamberger === true}">
        <button type="button" class="menu-btn" >
          <img :src="hamburgerIcon" alt="">
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import VuexRestore from '@/components/mixins/VuexRestore'

export default {
  name: 'PaymentTop',
  mixins: [VuexRestore],
  data() {
    return{
      success: true,
      invoice: false,
      address: "hogefugahogefuga",
      currentRouteName: ''
    }
  },
  watch: {
    $route(route) {
      this.currentRouteName = route.name
    }
  },
  computed: {
    linkIcon() {
      return this.$store.state.theme === 'light'
        ? require('@/assets/images/link-l.svg')
        : require('@/assets/images/link.svg')
    },
    prevIcon() {
      return this.$store.state.theme === 'light'
        ? require('@/assets/images/left-arrow-l.svg')
        : require('@/assets/images/left-arrow.svg')
    },
    hamburgerIcon() {
      return this.$store.state.theme === 'light'
        ? require('@/assets/images/hamburger-light.svg')
        : require('@/assets/images/hamburger.svg')
    },
    prevMode() {
      return ((this.currentRouteName === 'exchange' || this.currentRouteName === 'detail') && this.$store.state.payment.status === 1)
    }
  },
  methods: {
    open() {
      this.$store.dispatch("hamberger", {hamberger: true});
    },
    copyLink() {
      const currentUrl = window.location.href
      const restoreParam = this.generateRestoreParameter()
      this.$clipboard(`${currentUrl}?vx=${restoreParam}`);
    },
    prevPage() {
      switch(this.currentRouteName) {
        case 'detail':
          this.$router.push({ path: `/payment/exchange/${this.$route.params.token}` })
          break
        case 'exchange':
          this.$router.push({ path: `/payment/token/${this.$route.params.token}` })
          break
        default:
          this.$router.back()
      }
    }
  }
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