<template>
  <header
    class="lp-header"
    :class="{ active: $store.state.hamberger === true }"
  >
    <div class="lp-header__wrap">
      <div class="lp-header__inner">
        <div class="add-flex a-center">
          <a href="/" class="lp-header__logo">
            <img src="@/assets/images/lp/lp-logo.svg" alt="Slash Payment" />
          </a>
          <div class="testnet-navbar" v-if="!isUseMainnet">Testnet</div>
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
                {{ list.title }}
              </router-link>
            </div>
            <button
              :class="[
                'theme-button',
                '--light',
                { 'is-active': $store.state.theme == 'light' }
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
                { 'is-active': $store.state.theme == 'dark' }
              ]"
              @click="changeTheme('dark')"
              v-if="$store.state.theme == 'light'"
            >
              <img src="@/assets/images/lp/light.svg" alt="" />
            </button>
            <LpButton
              v-if="isEnableEnterApp"
              class="non-translate"
              :link="cvLink1"
              type="main"
              size="s"
            />
            <LpButton
              v-else-if="isUseMainnet"
              class="disable non-translate"
              :link="cvLink2"
              type="main"
              size="s"
              font="small"
            />
            <LpButton
              v-else
              class="disable non-translate"
              :link="cvLink3"
              type="main"
              size="s"
              font="small"
            />
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
          { 'is-active': $store.state.theme == 'light' }
        ]"
        @click="
          changeTheme('light')
          close()
        "
        v-if="$store.state.theme == 'dark'"
      >
        <img src="@/assets/images/lp/dark.svg" alt="" />
      </button>
      <button
        :class="[
          'theme-button',
          '--dark',
          { 'is-active': $store.state.theme == 'dark' }
        ]"
        @click="
          changeTheme('dark')
          close()
        "
        v-if="$store.state.theme == 'light'"
      >
        <img src="@/assets/images/lp/light.svg" alt="" />
      </button>
        <div v-for="(list, key) in nav" :key="key">
          <router-link
              :to="{
                  name: list.name,
                  hash: list.link
              }"
          >
              {{list.title}}
          </router-link>
        </div>
        <LpButton v-if="isMobile" class="disable non-translate" :link="cvLink4" type="main" size="m" />
        <LpButton v-else-if="isEnableEnterApp"  class="non-translate" :link="cvLink1" type="main" size="m" />
        <LpButton v-else-if="isUseMainnet"  class="disable non-translate" :link="cvLink2" type="main" size="m" font="small" />
        <LpButton v-else class="disable non-translate" :link="cvLink3" type="main" size="m" font="small" />
    </div>
  </header>
</template>

<script>
import LpButton from '@/components/templates/LpParts/Button'
export default {
  name: 'Header',
  components: {
    LpButton
  },
  props: {
    isUseMainnet: Boolean,
    isEnableEnterApp: Boolean,
    isMobile: Boolean
  },
  data() {
    return {
      nav: [
        {
          name: 'home',
          link: '#developers',
          title: 'Developers'
        },
        {
          name: 'home',
          link: '#fee-ecosystem',
          title: 'Fee & Ecosystem'
        },
        {
          name: 'home',
          link: '#roadmap',
          title: 'Roadmap'
        },
        {
          name: 'media_kit',
          link: '',
          title: 'Media Kit'
        }
      ],
      cvLink1: {
        title: 'Enter App',
        icon: '',
        url: '',
        func: 'enterApp',
        status: true
      },
      cvLink2: {
        title: 'Coming Soon',
        icon: '',
        url: '',
        func: 'enterApp',
        status: true
      },
      cvLink3: {
        title: 'Launch June 30, 2022',
        icon: '',
        url: '',
        func: 'enterApp',
        status: true
      },
      cvLink4: {
        title: "EnterApp for PC only",
        icon: "",
        url: "",
        func: "enterApp",
        status: true,
      },
      localUrl: "",
    };
  },
  created() {
    this.localUrl = location.origin
  },
  methods: {
    mouseOver() {
      this.isHover = true
    },
    mouseLeave() {
      this.isHover = false
    },
    changeTheme(theme) {
      this.$store.dispatch('changeTheme', theme)
      document.body.classList.remove('theme--dark')
      document.body.classList.remove('theme--light')
      document.body.classList.add('theme--' + this.$store.state.theme)
    },
    open() {
      this.$store.dispatch('hamberger', { hamberger: true })
    },
    close() {
      this.$store.dispatch('hamberger', { hamberger: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.lp-header {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  @include media(tb) {
    background-color: var(--Base);
  }
  .testnet-navbar {
    background: #de4437;
    color: #fff;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 20px;
    margin-top: 2px;
    margin-left: 8px;
    margin-right: 16px;
    height: 22px;
    @include media(sp) {
      margin: 0 0 0 8px;
      font-size: 8px;
      padding: 2px 8px;
      height: 20px;
    }
    position: relative;
    .testnet-hovercontens {
      position: absolute;
      top: 32px;
      left: 0;
      p {
        width: 260px;
        background: $gray;
        padding: 8px 16px;
        border-radius: 8px;
        position: relative;
        a {
          font-weight: 500;
          background: $gradation-light;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 150% 150%;
          pointer-events: none;
          position: relative;
          &::after {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
            width: 100%;
            height: 1px;
            background: #fff;
          }
        }
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20px;
          top: -15px;
          border: 8px solid transparent;
          border-bottom: 8px solid $gray;
        }
      }
    }
  }
  &__wrap {
    @extend .section__wrap;
    @include rem_padding(1, 0, 1, 0);
    position: relative;
    max-width: 100%;
    z-index: 100;
    @include media(sp) {
      padding-top: rem_sp(1);
      padding-bottom: rem_sp(1);
    }
  }
  &__inner {
    @include flex(space-between, center);
    flex-wrap: nowrap;
  }
  &__logo {
    width: rem(18);
    @include media(sp) {
      width: rem_sp(15);
    }
  }

  &__nav {
    @include flex(flex-end, center);
    gap: rem(1);
    @include media(tb) {
      display: none;
    }
    div {
      font-size: 0;
    }

    * {
      // margin-right: rem(0.5);
      // @include media(tb) {
      //   margin-right: 0;
      //   margin-bottom: rem(1);
      // }
    }

    button {
      margin-left: 6rem;
      @include media(sp) {
        margin-left: 0;
      }
      @include media(tb) {
        margin-right: 0;
        margin-bottom: rem_sp(1);
      }
    }
    a {
      @include font(rem(0.9), $fw, $ls, 3, $en_go);
      @include media(sp) {
        font-size: rem_sp(1);
      }
    }
    .theme-button {
      width: rem(1.2);
      @include media(sp) {
        width: rem_sp(2);
      }
    }
    .lpButton.main.s {
      margin: 0;
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
    padding: 100px 10% 40px;
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
        margin-bottom: rem_tb(1);
      }
    }
    a {
      @include font(rem(1.1), $fw, $ls, $lh, $en_go);
      @include media(sp) {
        font-size: rem_sp(pow(1));
      }
    }
    .theme-button {
      width: rem(2);
      @include media(sp) {
        width: rem_sp(2);
      }
    }
    .lpButton.main {
      margin: 0;
    }
  }
}
</style>
