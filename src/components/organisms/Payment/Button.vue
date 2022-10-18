<template>
  <div class="">
    <component
      :is="tag"
      :href="url != null ? url : ''"
      :target="target"
      :class="classes"
    >
      <div v-if="icon">
        <div class="svg" v-if="icon == 'logo-icon'">
          <LogoIcon />
        </div>
        <Icon v-else :type="iconType" :path="icon" />
      </div>
      <div class="textwrap" v-if="text">
        <span v-html="text"></span>
        <span v-if="subtext" class="subtext" v-html="subtext"></span>
      </div>
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
// import PaymentText from '@/components/organisms/Payment/Text'
import Icon from '@/components/organisms/Payment/Icon'
import LogoIcon from '@/components/common/LogoIcon'
export default {
  name: 'PaymentButton',
  components: {
    Icon,
    LogoIcon
    // PaymentText
  },
  props: {
    // func: {
    //   type: Object,
    //   default: {},
    // },
    icon: {
      type: String,
      default: ''
    },
    iconType: {
      type: String,
      default: 'svg'
    },
    url: {
      type: String
    },
    target: {
      type: String,
      default: '_self'
    },
    text: {
      type: String
    },
    subtext: {
      type: String
    },
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'm'
    },
    layout: {
      type: String,
      default: 'normal'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      textsize: {
        l: 'h4b',
        m: 'h5',
        s: 'capb'
      },
      tag: 'button',
      binds: {}
    }
  },
  filters: {},
  computed: {
    classes() {
      let array = {
        button: true
      }
      array['color_' + this.color] = true
      array['size_' + this.size] = true
      array['layout_' + this.layout] = true
      return array
    },
    setFunction() {
      // let array = {};
      // if (this.function != {}) {
      //   array = this.function;
      // }
      return {}
    }
  },

  methods: {},
  created() {
    if (this.url != null) {
      this.tag = 'a'
      this.binds['href'] = this.url
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.button {
  @include flex(center, center);
  width: auto;
  flex-wrap: nowrap;
  position: relative;
  overflow: hidden;
  transition: color 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
    background-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
  gap: 0.5rem;
  &::v-deep {
    .svg {
      position: relative;
      z-index: 10;
      font-size: 0;
    }
    span {
      // margin-left: 1rem;
      display: block;
      position: relative;
      z-index: 10;
    }
  }
  &.size {
    &_s {
      border-radius: 3rem;
      padding: 1px 0.8rem;
      $img_w: 1.6rem;
      min-width: 6rem;
      z-index: 1;
      @include font(0.8rem, 400, 0.04em, $img_w, $en_go);
      &::v-deep {
        .svg {
          width: $img_w * 0.7;
          height: $img_w * 0.7;
        }
      }
    }
    &_m {
      border-radius: 1rem;
      padding: 0.5rem 1rem;
      $img_w: 2rem;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      z-index: 1;
      @include font(1rem, 600, 0.04em, $img_w, $en_go);
      @include media(sp) {
        max-width: 100%;
      }
      &::v-deep {
        .svg {
          width: $img_w;
          height: $img_w;
        }
      }
    }
    &_l {
      border-radius: 1rem;
      padding: 0.5rem 1rem;
      $img_w: 2.5rem;
      width: 100%;
      // max-width: 15rem;
      margin-left: auto;
      margin-right: auto;
      z-index: 1;
      @include font(1.1rem, 600, $ls, $img_w, $en_go);
      @include media(sp) {
        max-width: 100%;
      }
      &::v-deep {
        .svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }
    &_icon {
      $img_w: 1.6rem;
      padding: 3px;
      border-radius: 4px;

      &::v-deep {
        .svg {
          width: $img_w;
          height: $img_w;
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
        content: '';
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
        // background: $gradation-light;
        background: $gradation-orange;
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
      border: 1px solid var(--Border);
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
      border: 1px solid var(--Button3);
      background-color: var(--Button3);
      &::v-deep {
        .svg {
          opacity: 0.6;
          svg {
            fill: var(--SubText);
          }
        }
        span {
          opacity: 0.6;
        }
      }
    }
    &_danger {
      background-color: var(--Alert);
      border: 1px solid var(--Alert);
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
        background-color: rgba(var(--Alert), 0.6);
      }
    }
    &_icon {
      &::v-deep {
        .svg {
          svg {
            fill: var(--Text);
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
      flex-wrap: nowrap;
      .subtext {
        margin-top: 0.5rem;
        @include font(0.8rem, 400, 0.04em, 1.8, $en_go);
        &::v-deep {
          span {
            line-height: 1.6;
          }
        }
      }
      &::v-deep {
        .svg {
          width: 4rem;
        }
        .text {
          text-align: left;
        }
        .textwrap {
          flex: 1;
        }

        span {
          line-height: 1;
          padding-left: 0;
        }
      }
    }
  }
}
</style>
