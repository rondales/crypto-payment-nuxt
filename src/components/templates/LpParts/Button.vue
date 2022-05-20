<template>
  <a
    :class="linkClass"
    :href="isExternalLink(link.url) ? link.url : ''"
    :tabindex="!link.status ? -1 : ''"
    :target="isExternalLink(link.url) ? '_blank' : ''"
    @click.prevent.stop="link.func"
  >
    <!-- [TODO] @clickの出力 -->
    <!-- [TODO] hoverのcss-->
    <LpIcon
      v-if="!link.iconAfter && link.icon"
      class="icon"
      :path="link.icon"
    />
    <span>{{ link.title }}</span>
    <LpIcon v-if="link.iconAfter && link.icon" class="icon" :path="link.icon" />
  </a>
</template>

<script>
import LpIcon from "@/components/templates/LpParts/Icon";
export default {
  components: {
    LpIcon,
  },
  props: {
    link: {
      type: Object,
      default: () => ({
        title: "",
        url: "",
        icon: "",
        status: true,
        func: "",
      }),
    },
    type: {
      type: String,
      default: "main",
    },
    size: {
      type: String,
      default: "m",
    },
  },
  computed: {
    linkClass() {
      let classname = "lpButton " + this.type + " " + this.size;

      return classname;
    },
  },
  methods: {
    // 外部リンクかどうかチェック
    isExternalLink(link) {
      return /^https?:\/\//.test(link);
    },
    testfunc() {
      console.log("click!");
    },
    enterApp() {
      this.$store.dispatch("changeTheme", "dark");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.lpButton {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  margin: rem(0.5);
  color: #fff;
  transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
    visibility 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
  @include media(pc) {
    &:hover {
      opacity: 1;
    }
  }

  &.l {
    @include font(rem(2), 600, 0.02em, 1, $ff);
    height: rem(8);
    padding: 0 rem(4);
    width: 100%;
    border-radius: rem(0.5);
    @include media(sp) {
      height: rem(4);
      @include font(rem(1), 600, 0.02em, 1, $ff);
      padding: 0 rem(1);
    }
    .icon {
      width: rem(3);
      @include media(sp) {
        width: rem(2);
      }
    }
    * + * {
      margin-left: rem(1);
    }
  }
  &.m {
    @include font(rem(pow(1)), 500, 0.02em, 1, $ff);
    height: rem(4);
    padding: 0 rem(4);
    border-radius: rem(3);
    .icon {
      width: rem(2);
    }
    * + * {
      margin-left: rem(0.5);
    }
  }
  &.s {
    @include font(rem(1), 500, 0.02em, 1, $ff);
    height: rem(3);
    padding: 0 rem(3);
    border-radius: rem(3);
    .icon {
      width: rem(1.5);
    }
    * + * {
      margin-left: rem(1);
    }
  }
  &.main {
    @extend .lpButton;
    background: $gradation;
    background: $gradation-pale;
    background: $gradation-light;
    // background-color: red;
  }
  &.sub {
    @extend .lpButton;
    background: var(--color_inner);
  }
  &.noactive {
    @extend .lpButton;
    pointer-events: none;
    background: var(--color_bg_parts);
    border: 1px solid var(--color_border);
  }
}
</style>
