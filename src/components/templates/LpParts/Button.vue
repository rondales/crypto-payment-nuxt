<template>
  <!-- TODO : iconを前後に入れられるように・modalのリンクをつけられるように・actionを追加できるように -->
  <a
    :href="isExternalLink(link.url) ? link.url : ''"
    :to="isExternalLink(link.url) ? '' : link.url"
    :target="isExternalLink(link.url) ? '_blank' : ''"
  >
    <span>{{ link.title }}</span>
  </a>
</template>

<script>
export default {
  props: {
    link: {
      type: Object, //url or label
    },
  },
  methods: {
    // 外部リンクかどうかチェック
    isExternalLink(link) {
      return /^https?:\/\//.test(link);
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: blue;
}
</style>
