<template>
  <div :class="classes">
    <component :is="IconArry.img" />
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
    IconArry() {
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
  &.color {
    &__color {
    }
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
