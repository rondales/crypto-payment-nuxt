<template>
  <div>
    <img :src="require(`@/assets/images/lp/${this.path}.svg`)" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    path: {
      type: String,
    },
  },
};
</script>
