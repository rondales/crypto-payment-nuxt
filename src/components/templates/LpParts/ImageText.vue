<template>
  <div class="textimgwrap" :class="data.layout">
      <LpAnimation
        v-if="data.canvas"
        canvasClass="textimgwrap"
        :type="data.canvas"
      />
      <LpImage
        v-if="!data.canvas"
        :imgData="data.image"
        class="textimgwrap__image"
      />
      <LpTextwrap class="textimgwrap__textwrap" :textData="data" />
  </div>
</template>

<script>
import LpAnimation from "@/components/templates/LpAnimation";
import LpImage from "@/components/templates/LpParts/Image";
import LpTextwrap from "@/components/templates/LpParts/Textwrap";
export default {
  components: {
    LpImage,
    LpAnimation,
    LpTextwrap,
  },
  props: {
    data: {
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
.textimgwrap {
  @include flex(flex-start, flex-start);
  flex-wrap: nowrap;
  // display: grid;
  // grid-template-columns: repeat(7, 1fr);
  // gap: rem(4);
  margin-bottom: rem(6);
  @include media(sp) {
    display: block;
  }
  &.r {
    [class$="__image"] {
      order: 2;
      margin-left: rem(4);
      margin-right: 0;
      @include media(sp) {
        margin-left: 0;
      }
    }
    [class$="__canvas"] {
      order: 2;
      margin-left: rem(4);
      margin-right: 0;
      @include media(sp) {
        margin-left: 0;
      }
    }
    [class$="__textwrap"] {
      // padding-left: 0;
      // padding-right: rem(4);
    }
  }

  &.c {
    flex-wrap: wrap;
    // // grid-template-columns: repeat(1, 1fr);
    flex-direction: column;
    [class$="__image"] {
      margin-right: 0;
      margin-bottom: rem(4);

      // width: 100%;
    }
    [class$="__textwrap"] {
      // grid-column: span 2;
      padding-right: 65%;
      position: relative;
      @include media(sp) {
        padding-right: 0;
        grid-column: span 5;
      }
      &::v-deep {
        .absTest {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          @include media(sp) {
            width: 100%;
            position: relative;
          }
        }
        .logos {
          margin-top: -1rem;
          @include media(sp) {
            margin-top: rem(1);
          }
        }
      }
    }
  }
  &__canvas {
    flex: 2;
    // grid-column: span 3;
    position: relative;
    z-index: 1;
    margin-right: rem(4);
    @include media(sp) {
      margin-bottom: rem(2);
      // grid-column: span 5;
    }
    &::v-deep {
      div {
        position: relative;
        width: 100%;
        &::before {
          content: "";
          display: block;
          width: 100%;
          padding-top: 100%;
        }
        canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }
      }
    }
  }
  &__image {
    flex: 1;
    margin-right: rem(4);

    @include media(sp) {
      margin-right: 0;
      margin-bottom: rem(2);
      &::v-deep {
        position: relative;
        &::before {
          content: "";
          width: 100%;
          display: block;
          padding-top: 100%;
        }
        img {
          position: absolute;
          height: 100%;
          width: 100%;
          object-fit: cover;
          top: 0;
          left: 0;
        }
      }
    }
  }
  &__textwrap {
    flex: 2;
  }
}
</style>
