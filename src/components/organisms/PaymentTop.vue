<template>
  <div class="payment_top">
    <div class="payment_headbox add-flex j-between a-center">
      <div v-if="!isInvoiceHeaderMode" class="logo add-flex a-end">
        <figure>
          <img src="@/assets/images/slash.svg">
        </figure>
        <div class="product_name">
          Web3 Payment
        </div>
      </div>
      <div v-if="isInvoiceHeaderMode" class="add-flex a-end j-between">
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
      <div v-if="isInvoiceHeaderMode">
        <div class="logo">
          <figure>
            <img src="@/assets/images/invoice.svg">
          </figure>
        </div>
      </div>
      <div class="hamburger" @click="hideMenu" :class="{active: showMenu}">
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
  props: ['showMenu'],
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
    },
    isInvoiceHeaderMode() {
      return this.$store.state.payment.headerInvoice
    }
  },
  methods: {
    open() {
      this.$store.dispatch("hamberger", {hamberger: true});
    },
    hideMenu() {
      this.$emit('toggleMenu', !this.showMenu)
    },
    copyLink() {
      this.$emit('copyLink')
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