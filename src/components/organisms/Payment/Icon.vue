<template>
  <div :class="classes">
    <component v-if="isSvg" :is="IconArray.img" />
    <img v-else :src="IconArray.img">
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String
    },
    type: {
      type: String,
      default: "svg"
    },
    color: {
      type: String,
      default: "text",
    }
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
          require(`@/assets/images/icon/${this.path}.${this.type}?component`),
      };
    },
    isSvg() {
      return this.type === 'svg'
    }
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
