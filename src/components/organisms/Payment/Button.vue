<template>
  <div class="">
    <component :is="tag" :href="url != null ? url : ''" :class="classes">
      <Icon v-if="icon" :path="icon" />
      <div>
        <PaymentText v-if="text" :type="textsize[size]" :html="text" />
        <PaymentText
          v-if="subtext"
          class="subtext"
          type="cap"
          :html="subtext"
        />
      </div>
      <!-- TODO 動作確認loading -->
      <Icon
        class="loading spin"
        :class="{ active: loading }"
        v-if="loading"
        path="loading"
      />
    </component>
  </div>
</template>

<script>
import PaymentText from "@/components/organisms/Payment/Text";
import Icon from "@/components/organisms/Payment/Icon";
export default {
  name: "PaymentButton",
  components: {
    Icon,
    PaymentText,
  },
  props: {
    // func: {
    //   type: Object,
    //   default: {},
    // },
    icon: {
      type: String,
      default: "",
    },
    url: {
      type: String,
    },
    text: {
      type: String,
    },
    subtext: {
      type: String,
    },
    color: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "m",
    },
    layout: {
      type: String,
      default: "normal",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textsize: {
        l: "h4b",
        m: "h5",
        s: "capb",
      },
      tag: "button",
      binds: {},
    };
  },
  filters: {},
  computed: {
    classes() {
      let array = {
        button: true,
      };
      array["color_" + this.color] = true;
      array["size_" + this.size] = true;
      array["layout_" + this.layout] = true;
      return array;
    },
    setFunction() {
      // let array = {};
      // if (this.function != {}) {
      //   array = this.function;
      // }
      return {};
    },
  },

  methods: {},
  created() {
    if (this.url != null) {
      this.tag = "a";
      this.binds["href"] = this.url;
    }
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.button {
  @include flex(center, center);
  width: auto;
  position: relative;
  overflow: hidden;
  transition: color 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
    background-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
  img {
    border-radius: 100%;
    position: relative;
    z-index: 10;
  }
  &::v-deep {
    .svg {
      position: relative;
      z-index: 10;
      font-size: 0;
    }
    span {
      // margin-left: 1rem;
      display: block;
      padding: 0 1rem;
      position: relative;
      z-index: 10;
    }
  }
  &.size {
    &_s {
      border-radius: 3rem;
      padding: 1px 8px;
      $img_w: 2rem;
      min-width: 6rem;
      &::v-deep {
        .svg {
          width: $img_w * 0.7;
        }
        span {
          line-height: $img_w;
          padding: 0 0.5rem;
        }
      }
      img {
        width: $img_w;
        position: relative;
        z-index: 10;
      }
    }
    &_m {
      border-radius: 1rem;
      padding: 1rem;
      $img_w: 2rem;
      width: 100%;
      max-width: 30rem;
      margin-left: auto;
      margin-right: auto;
      @include media(sp) {
        max-width: 100%;
      }
      &::v-deep {
        .svg {
          width: $img_w;
        }
        span {
          line-height: $img_w;
        }
      }
      img {
        width: $img_w;
      }
    }
    &_l {
      border-radius: 1rem;
      padding: 1rem;
      $img_w: 3rem;
      width: 100%;
      max-width: 30rem;
      margin-left: auto;
      margin-right: auto;
      @include media(sp) {
        max-width: 100%;
      }
      &::v-deep {
        .svg {
          width: $img_w;
        }
        span {
          line-height: $img_w;
        }
      }
      img {
        width: $img_w;
      }
    }
    &_icon {
      $img_w: 2rem;
      padding: 3px;
      border-radius: 4px;

      &::v-deep {
        .svg {
          width: $img_w;
        }
      }
      img {
        width: $img_w;
      }
    }
  }
  &.color {
    &_primary {
      border: 1px solid transparent;
      &::before,
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: $gradation-pale;
        z-index: 2;
        opacity: 1;
        transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
          visibility 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      }
      &::after {
        background: $gradation-light;
        z-index: 1;
      }
      &::v-deep {
        .svg {
          svg {
            fill: #fff;
          }
        }
        span {
          color: #fff;
        }
      }
      &:hover {
        &::before {
          opacity: 0;
        }
      }
    }
    &_secondary {
      background-color: #7bc8fc;
      border: 1px solid #7bc8fc;
      &::v-deep {
        .svg {
          svg {
            fill: #fff;
          }
        }
        span {
          color: #fff;
        }
      }
      &:hover {
        background-color: rgba(#7bc8fc, 0.6);
      }
    }
    &_cancel {
      background-color: transparent;
      border: var(--color_border);
      &::v-deep {
        .svg {
          svg {
            fill: var(--Text);
          }
        }
      }
      &:hover {
        background-color: rgba(#eee, 0.2);
      }
    }
    &_inactive {
      cursor: not-allowed;
      border: 1px solid var(--color_inactive);
      background-color: var(--color_inactive);
      &::v-deep {
        .svg {
          opacity: 0.6;
          svg {
            fill: var(--color_font);
          }
        }
        span {
          opacity: 0.6;
        }
      }
    }
    &_danger {
      background-color: #fc7b7b;
      border: 1px solid #fc7b7b;
      &::v-deep {
        .svg {
          svg {
            fill: #fff;
          }
        }
      }
      span {
        color: #fff;
      }
      &:hover {
        background-color: rgba(#fc7b7b, 0.6);
      }
    }
    &_icon {
      &::v-deep {
        .svg {
          svg {
            fill: var(--color_font);
          }
        }
      }
    }
  }
  &.layout {
    &_reverse {
      flex-direction: row-reverse;
      span {
        // margin-left: 0rem;
        // margin-right: 1rem;
      }
    }
    &_left {
      @include flex(flex-start, center);
    }
    &_wallet {
      @include flex(space-between, center);
      flex-direction: row-reverse;
      padding: 1.5rem;
      .subtext {
        margin-top: 0.8rem;
      }
      &::v-deep {
        .svg {
          width: 4rem;
        }
        .text {
          text-align: left;
        }

        span {
          line-height: 1;
        }
      }
    }
  }
}
</style>
