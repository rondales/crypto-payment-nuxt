<template>
  <a v-bind="aHref">
    <!-- <a v-bind="aHref" @click.prevent.stop="handle_function_call(link.func)"> -->
    <!-- [TODO] @clickの出力 -->
    <LpIcon
      v-if="!link.iconAfter && link.icon"
      class="icon before"
      :path="link.icon"
    />
    <span>{{ link.title }}</span>
    <LpIcon
      v-if="link.iconAfter && link.icon"
      class="icon after"
      :path="link.icon"
    />
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

    aHref() {
      let prop = {};
      prop["class"] = this.linkClass;

      if (!this.link.status) {
        prop["tabindex"] = "-1";
      } else {
        if (typeof this.link.func != "undefined") {
          this.$emit(this.link.func);
          console.log(this.link.func);
        } else {
          prop["href"] = this.isExternalLink(this.link.url)
            ? this.link.url
            : "";
          prop["target"] = this.isExternalLink(this.link.url) ? "_blank" : "";
        }
      }
      return prop;
    },
    setFunc() {
      return "";
      // return { click.stop.prevent: this.testfunc() };
    },
  },
  methods: {
    // 外部リンクかどうかチェック
    isExternalLink(url) {
      let reg = new RegExp("^(https?:)?//" + document.domain);
      return url.match(reg) || url.charAt(0) === "/"; //boolean
    },
    handle_function_call(function_name) {
      this[function_name]();
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
  overflow: hidden;

  margin: rem(0.5);
  color: #fff;
  transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
    visibility 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
  @include media(pc) {
    &:hover {
      opacity: 1;
    }
  }
  .icon {
    &.before {
      margin-left: -6%;
    }
    &::v-deep {
      display: flex;
      svg {
        align-self: center;
        fill: #fff;
      }
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
      width: rem(4);
      @include media(sp) {
        width: rem(3);
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
    padding: 0 rem(3);
    border-radius: rem(3);
    .icon {
      width: rem(3);
    }
    * + * {
      margin-left: rem(0.5);
    }
  }
  &.s {
    @include font(rem(1), 500, 0.02em, 1, $ff);
    height: rem(3);
    padding: 0 rem(1.2);
    border-radius: rem(3);
    .icon {
      width: rem(2);
    }
    * + * {
      margin-left: rem(0.5);
    }
  }
  &.main {
    @extend .lpButton;
    position: relative;
    * {
      position: relative;
      z-index: 10;
    }

    &::before,
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      z-index: 5;
    }
    &::before {
      background: $gradation-light;
      opacity: 1;
    }
    &::after {
      background: $gradation-pale;
      background: $gradation-orange;
      opacity: 0;
    }
    .icon.after {
      transform-origin: center center;
      transform: translate(0%, 0%);
      transition: transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    }
    @include media(pc) {
      &:hover {
        &::before {
          opacity: 0;
        }
        &::after {
          opacity: 1;
        }
        .icon.after {
          transform: translate(5px, 0%);
        }
      }
    }
  }
  &.main2 {
    @extend .lpButton;
    position: relative;
    * {
      position: relative;
      z-index: 10;
    }

    &::before,
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      z-index: 5;
    }
    &::before {
      background: $gradation-orange;

      opacity: 1;
    }
    &::after {
      background: $gradation-light;
      opacity: 0;
    }
    .icon.after {
      transform-origin: center center;
      transform: translate(0%, 0%);
      transition: transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    }
    @include media(pc) {
      &:hover {
        &::before {
          opacity: 0;
        }
        &::after {
          opacity: 1;
        }
        .icon.after {
          transform: translate(5px, 0%);
        }
      }
    }
  }
  &.sub {
    @extend .lpButton;
    background-color: var(--color_update);
    transition: background-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    @include media(pc) {
      &:hover {
        background-color: #6a68ed;
      }
    }
  }
  &.simple {
    padding: 0 rem(0);
    border-radius: 0;
    color: var(--color_font);
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: var(--color_font);
      bottom: 0;
      right: 0;
      transition: width 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    }
    .icon {
      transform-origin: center center;
      transform: translate(0%, 0%);
      transition: transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    }
    @include media(pc) {
      &:hover {
        &::before {
          width: 0;
        }
        .icon {
          transform: translate(5px, 0%);
        }
      }
    }
    .icon {
      width: rem(2);
      &::v-deep {
        svg {
          fill: var(--color_font);
        }
      }
    }
  }
  &.noactive {
    @extend .lpButton;
    pointer-events: none;
    background: var(--color_inactive);
    border: 1px solid var(--color_inactive);
    * {
      opacity: 0.6;
    }
    // color: var(--color_box);
    // .icon {
    //   &::v-deep {
    //     svg {
    //       fill: var(--color_box);
    //     }
    //   }
    // }
  }
}
</style>
