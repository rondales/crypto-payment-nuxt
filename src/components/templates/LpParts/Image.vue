<template>
  <figure>
    <img :src="setImgPath" :alt="imgData.alt" />
  </figure>
</template>

<script>
export default {
  components: {},
  props: {
    imgData: {
      type: Object,
      required: true,
      default: () => ({
        src: "",
        alt: "",
        lightSrc: "",
      }),
    },
  },
  computed: {
    setImgPath() {
      if (this.imgData.lightSrc != "" && this.$store.state.theme == "light") {
        return require("@/assets/images/" + this.imgData.lightSrc);
      } else {
        return require("@/assets/images/" + this.imgData.src);
      }
      // return require("@/assets/images/" + this.imgData.src);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
