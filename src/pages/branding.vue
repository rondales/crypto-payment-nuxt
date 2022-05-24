<template>
  <div class="lp-wrapper">
    <branding-index/>
  </div>
</template>

<script>
import BrandingIndex from '../components/templates/BrandingIndex.vue'
export default {
  name: 'payment',
  components: {
    BrandingIndex
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.lp-wrapper{
  text-align: center;
  padding-top: 100px;
  background: var(--color_lp_bg);
  @include media(sp) {
    padding-top: 62px;
  }
  a{
    display: block;
    font: 24px;
    color: #fff;
    margin-bottom: 20px;
  }
}
</style>