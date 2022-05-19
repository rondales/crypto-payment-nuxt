<template>
  <div>
    <component :is="svg" />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
    },
  },
  computed: {
    svg() {
      return () => import(`@/assets/images/lp/${this.path}.svg`);
    },
  },
};
</script>
