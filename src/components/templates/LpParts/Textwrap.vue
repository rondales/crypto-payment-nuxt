<template>
  <div class="textwrap">
    <h3 class="title"><span v-html="textData.title"></span></h3>
    <p class="text"><span v-html="textData.text"></span></p>
    <div v-if="textData.link" class="link">
      <a :href="textData.link.url" class="dlp-btn__main m">
        <span>{{ textData.link.title }}</span>
        <span v-if="$store.state.theme == 'dark'">
          <img src="@/assets/images/lp/right-arrow.svg" />
        </span>
        <span v-if="$store.state.theme == 'light'">
          <img src="@/assets/images/lp/right-arrow-l.svg" />
        </span>
      </a>
    </div>
    <!-- [TODO] tag -->
    <!-- [TODO] app logo -->
  </div>
</template>

<script>
export default {
  props: {
    textData: {
      type: Object,
      required: true,
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
</style>
