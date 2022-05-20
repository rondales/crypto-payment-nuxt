<template>
  <div class="textwrap">
    <h3 class="title"><span v-html="textData.title"></span></h3>
    <p class="text"><span v-html="textData.text"></span></p>
    <div v-if="textData.link" class="link">
      <LpButton :link="textData.link" type="main" size="s" />
    </div>
    <!-- [TODO] tag -->
    <!-- [TODO] app logo -->
  </div>
</template>

<script>
import LpButton from "@/components/templates/LpParts/Button";
export default {
  components: {
    LpButton,
  },
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
.title {
  @include font(rem(pow(3)), 700, $ls, $lh, $en_go);
  background: $gradation-light;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: rem(2);
  // word-break: break-all;
  overflow-wrap: break-word;
}
.text {
  @include font(rem(pow(0)), $fw, $ls, $lh, $en_go);
  // word-break: break-all;
  overflow-wrap: break-word;
}
.link {
  margin-top: rem(2);
}
</style>
