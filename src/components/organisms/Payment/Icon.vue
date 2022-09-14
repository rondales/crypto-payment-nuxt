<template>
  <div :class="classes">
    <component :is="IconArray.img" />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
    },
    color: {
      type: String,
      default: "text",
    },
  },
  computed: {
    classes() {
      let array = { svg: true };
      array["color__" + this.color] = true;
      return array;
    },
    IconArray() {
      return {
        ...this.path,
        img:
          this.path &&
          require(`@/assets/images/icon/${this.path}.svg?component`),
      };
    },
  },
  created() {},
  mounted() {},
  components: {},
};
</script>
<style lang="scss" scoped>
.svg {
  font-size: 0;
  position: relative;
  display: flex;
  align-items: center;
  &.color {
    &__text {
      svg {
        fill: var(--color_font);
      }
    }
  }
}
svg {
  width: 100%;
}
</style>
