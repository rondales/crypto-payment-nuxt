<template>
  <component :class="iconClass" :is="svg" />
</template>

<script>
export default {
  components: {},
  props: {
    path: {
      type: String,
    },
  },
  data: function () {
    return {
      iconClass: this.path.indexOf("stroke") !== -1 ? "p-icon__stroke" : "",
    };
  },
  computed: {
    svg() {
      return () => import(`~/assets/icon/${this.path}.svg`);
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
