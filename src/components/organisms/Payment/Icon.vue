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
  IconArry () {
    return {
      ...this.path, 
      img: this.path && require(`@/assets/images/icon/${this.path}.svg?component`)
    }
  }
  },
  created() {},
  mounted(){},
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

  &::before {
    // iconの真ん中合わせ用
    // content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: red;
    transform-origin: center center;
    transform: translate3d(-50%, -50%, 0) rotate(0deg) scale(1, 1);
    top: 50%;
    left: 50%;
    border-radius: 100%;
  }
}
svg {
  width: 100%;
}
</style>
