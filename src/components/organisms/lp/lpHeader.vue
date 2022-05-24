<template>
  <header
    class="lp-header"
    :class="{ active: $store.state.hamberger === true }"
  >
    <div class="lp-header__wrap">
      <div class="lp-header__inner">
        <div class="lp-header__logo">
          <img src="@/assets/images/lp/lp-logo.svg" alt="Web3 Payment" />
        </div>
        <div class="lp-header__navwrap">
          <div
            class="lp-header__hamburger tb"
            @click="open()"
            :class="{ active: $store.state.hamberger === true }"
          >
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="lp-header__nav">
            <div v-for="(list, index) in nav" :key="index">
              <router-link
                  :to="{
                      name: list.name,
                      hash: list.link
                  }"
              >
                  {{list.title}}
              </router-link>
            </div>
            <button
              :class="[
                'theme-button',
                '--light',
                { 'is-active': $store.state.theme == 'light' },
              ]"
              @click="changeTheme('light')"
              v-if="$store.state.theme == 'dark'"
            >
              <img src="@/assets/images/lp/dark.svg" alt="" />
            </button>
            <button
              :class="[
                'theme-button',
                '--dark',
                { 'is-active': $store.state.theme == 'dark' },
              ]"
              @click="changeTheme('dark')"
              v-if="$store.state.theme == 'light'"
            >
              <img src="@/assets/images/lp/light.svg" alt="" />
            </button>
            <LpButton :link="cvLink" type="main" size="s" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="lp-header__hambergernav"
      :class="{ active: $store.state.hamberger === true }"
    >
      <button
        :class="[
          'theme-button',
          '--light',
          { 'is-active': $store.state.theme == 'light' },
        ]"
        @click="changeTheme('light')"
        v-if="$store.state.theme == 'dark'"
      >
        <img src="@/assets/images/lp/dark.svg" alt="" />
      </button>
      <button
        :class="[
          'theme-button',
          '--dark',
          { 'is-active': $store.state.theme == 'dark' },
        ]"
        @click="changeTheme('dark')"
        v-if="$store.state.theme == 'light'"
      >
        <img src="@/assets/images/lp/light.svg" alt="" />
      </button>
      <a
        v-for="(link, key) in nav"
        :key="key"
        :href="localUrl+link.link"
        @click="close()"
        >{{ link.title }}</a
      >
      <LpButton :link="cvLink" type="main" size="s" />
    </div>
  </header>
</template>

<script>
import LpButton from "@/components/templates/LpParts/Button";
export default {
  name: "Header",
  components: {
    LpButton,
  },
  data() {
    return {
      nav: [
        {
          name: "home",
          link: "#developers",
          title: "Developers",
        },
        {
          name: "home",
          link: "#fee-ecosystem",
          title: "Fee & Ecosystem",
        },
        {
          name: "home",
          link: "#roadmap",
          title: "Roadmap",
        },
        {
          name: "media_kit",
          link: "",
          title: "Media Kit",
        },
      ],
      cvLink: {
        title: "Enter App",
        icon: "",
        url: "",
        func: "enterApp",
        status: true,
      },
      localUrl: "",
    };
  },
  created(){
    this.localUrl = location.origin
  },
  mounted() {

  },
  methods: {
    changeTheme(theme) {
      this.$store.dispatch("changeTheme", theme);
      this.$store.dispatch("hamberger", { hamberger: false });
    },
    open() {
      this.$store.dispatch("hamberger", { hamberger: true });
    },
    close() {
      this.$store.dispatch("hamberger", { hamberger: false });
    },
    // enterApp() {
    // Button.vueに記述
    //   this.$store.dispatch("changeTheme", "dark");
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.lp-header {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  // background: var(--color_lp_bg);
  // @include media(pc) {
  //   height: 100px;
  //   padding: 0 36px;
  //   .logo {
  //     height: 36px;
  //     width: 100%;
  //   }
  // }
  // @include media(tb) {
  //   padding: 0 !important;
  // }
  // @include media(tb) {
  //   display: block;
  //   height: 0vh !important;
  //   text-align: left;
  //   &.active {
  //     height: 100vh !important;
  //     .link-wrap {
  //       display: block !important;
  //     }
  //   }
  // }
  &__wrap {
    @extend .section__wrap;
    @include rem_padding(1, 0, 1, 0);
    position: relative;
    z-index: 100;
  }
  &__inner {
    @include flex(space-between, center);
  }
  &__logo {
    width: rem(18);
    @include media(sp) {
      width: rem(15);
    }
  }

  &__nav {
    @include flex(flex-end, center);
    @include media(tb) {
      display: none;
    }

    * {
      margin-right: rem(0.5);
      @include media(tb) {
        margin-right: 0;
        margin-bottom: rem(1);
      }
    }

    button{
      margin-right: rem(2);
      @include media(tb) {
        margin-right: 0;
        margin-bottom: rem(1);
      }
    }
    a {
      @include font(rem(1.1), $fw, $ls, $lh, $en_go);
    }
    .theme-button {
      width: rem(2);
    }
  }
  &__hamburger {
    &.active {
      li {
        transition: opacity 200ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
          top 200ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
          transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1) 200ms;
        &:nth-child(1) {
          top: 50%;
          transform-origin: center center;
          transform: rotate(-45deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          top: 50%;
          transform-origin: center center;
          transform: rotate(45deg);
        }
      }
    }
    ul {
      width: rem(1.5);
      height: rem(1);
      position: relative;
    }
    li {
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: var(--color_font);
      display: block;
      left: 0;
      transition: opacity 200ms cubic-bezier(0.25, 0.1, 0.25, 1) 200ms,
        top 200ms cubic-bezier(0.25, 0.1, 0.25, 1) 200ms,
        transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;

      &:nth-child(1) {
        top: 0;
      }
      &:nth-child(2) {
        top: 50%;
      }
      &:nth-child(3) {
        top: 100%;
      }
    }
  }
  &__hambergernav {
    transform-origin: center center;
    transform: translate(0%, -100%);
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 5;
    background: var(--color_lp_bg);
    opacity: 0;
    visibility: hidden;
    @include flex(center, center);
    flex-direction: column;
    padding-top: 100px;
    padding-bottom: 40px;
    transition: transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1),
      visibility 200ms cubic-bezier(0.25, 0.1, 0.25, 1),
      opacity 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
    &.active {
      transform: translate(0%, 0%);
      opacity: 1;
      visibility: visible;
    }
    * {
      @include media(tb) {
        margin-right: 0;
        margin-bottom: rem(1);
      }
    }
    a {
      @include font(rem(1.1), $fw, $ls, $lh, $en_go);
    }
    .theme-button {
      width: rem(2);
    }
  }

  //   &__actions {
  //     width: 20%;
  //     @include media(tb) {
  //       width: 100%;
  //     }
  //   }
  //   &__head {
  //     @include media(tb) {
  //       display: flex;
  //       justify-content: space-between;
  //       align-items: center;
  //       padding: 16px;
  //       background: var(--color_lp_bg);
  //     }
  //   }
  //   .logo-wrap {
  //     width: 80%;
  //     @include media(tb) {
  //       width: 100%;
  //       display: block !important;
  //     }
  //     .link-wrap {
  //       width: 50%;
  //       margin-left: 20%;
  //       @include media(tb) {
  //         width: 100%;
  //         display: none !important;
  //         margin: 0;
  //         padding: 80px 60px 0;
  //       }
  //       &.active {
  //         display: block !important;
  //       }
  //       span {
  //         @include media(tb) {
  //           width: 100%;
  //           display: block !important;
  //           margin-bottom: 32px;
  //         }
  //         a {
  //           font-size: 18px;
  //           font-weight: 400;
  //         }
  //       }
  //     }
  //   }

  //   .logo {
  //     white-space: nowrap;
  //     @include media(tb) {
  //       width: 50%;
  //     }
  //   }
  //   .theme-button {
  //     margin-right: 3rem;
  //     vertical-align: middle;
  //     width: 32px;
  //     height: 32px;
  //     img {
  //       width: 32px;
  //       height: 32px;
  //     }
  //     span {
  //       margin-right: 8px;
  //     }
  //   }
  //   .app-link {
  //     border-radius: 0.6rem;
  //     padding: 0;
  //     height: 4.2rem;
  //     line-height: 4.2rem;
  //     @include media(tb) {
  //       width: 100% !important;
  //       margin: auto;
  //       height: 6rem;
  //       line-height: 6rem;
  //     }
  //     a {
  //       display: block;
  //       padding: 0 4rem;
  //       color: #fff;
  //     }
  //   }
  // }

  // .toggle-theme {
  //   text-align: center;
  //   @include media(pc) {
  //     margin-left: 0;
  //   }
  //   @include media(tb) {
  //     width: 10% !important;
  //   }
  // }
  // .theme-button {
  //   font-size: 0;
  //   @include media(pc) {
  //     .emoji {
  //       font-size: 28px;
  //     }
  //   }
  //   @include media(tb) {
  //     .emoji {
  //       font-size: 2rem;
  //     }
  //     &.is-active {
  //       display: none;
  //     }
  //   }
  //   &--light {
  //     grid-row: 1;
  //     grid-column: 1;
  //   }
  //   &--dark {
  //     grid-row: 1;
  //     grid-column: 3;
  //   }
  // }
  // .hamburger {
  //   display: block;
  //   position: relative;
  //   width: 24px;
  //   height: 24px;
  //   overflow: hidden;
  //   z-index: 2;
  //   &.active {
  //     .menu-btn {
  //       top: 0;
  //     }
  //   }
  //   .menu-btn {
  //     position: absolute;
  //     top: -23px;
  //   }
}
</style>
