<template>
  <div class="lp-wrapper">
    <lp-index/>
  </div>
</template>

<script>
import LpIndex from '@/components/templates/LpIndex'
export default {
  name: 'payment',
  components: {
    LpIndex
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