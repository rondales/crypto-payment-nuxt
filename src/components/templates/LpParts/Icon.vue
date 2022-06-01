<template>
  <div>
    <component :is="require(`@/assets/images/lp/${path}.svg?component`)" />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
    },
  },
  created() {},
  mounted() {
  },
  components: {},
};
</script>
<style lang="scss" scoped>
svg {
  width: 100%;
}
</style>
