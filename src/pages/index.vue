<template>
  <div>
    <lp-index />
  </div>
</template>

<script>
// import LpIndex from "@/components/templates/LpIndex";
import LpIndex from "@/components/templates/LpIndexD";
export default {
  name: "payment",
  components: {
    LpIndex,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
</style>
