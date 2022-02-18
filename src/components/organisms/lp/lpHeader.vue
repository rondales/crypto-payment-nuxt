<template>
  <header class="lp-header" :class="{'active': $store.state.hamberger === true}">
    <div class="lp-header__inner">
      <div class="logo-wrap add-flex a-center">
        <div class="lp-header__head">
          <div class="logo">
            <img src="@/assets/images/lp/lp-logo.svg" alt="Web3 Payment">
          </div>
          <div class="hamburger sp" @click="open()" :class="{'active': $store.state.hamberger === true}">
            <button type="button" class="menu-btn" >
              <img v-if="$store.state.theme == 'dark'" src="@/assets/images/hamburger.svg" alt="">
              <img v-if="$store.state.theme == 'light'" src="@/assets/images/hamburger-light.svg" alt="">
            </button>
          </div>
        </div>
        <div class="link-wrap add-flex j-between" :class="{'active': $store.state.hamberger === true}">
          <span class="toggle-theme sp">
            <button
              :class="[
                'theme-button',
                '--light',
                { 'is-active': $store.state.theme == 'light' },
              ]"
              @click="changeTheme('light')"
              v-if="$store.state.theme == 'dark'"
            >
              <img src="@/assets/images/lp/dark.svg" alt="">
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
              <img src="@/assets/images/lp/light.svg" alt="">
            </button>
          </span>
          <span>
            <a href="#about">
              About us
            </a>
          </span>
          <span>
            <a href="#installation">
              Installation
            </a>
          </span>
          <span>
            <a href="#ecosystem">
              Ecosystem
            </a>
          </span>
          <span>
            <a href="#roadmap">
              Rood Map
            </a>
          </span>
          <span class="app-link btn __pg sp">
            <a href="/admin">
              Enter App
            </a>
          </span>
        </div>
      </div>
      <div class="lp-header__actions add-flex a-center">
        <span class="toggle-theme pc">
          <button
            :class="[
              'theme-button',
              '--light',
              { 'is-active': $store.state.theme == 'light' },
            ]"
            @click="changeTheme('light')"
            v-if="$store.state.theme == 'dark'"
          >
            <img src="@/assets/images/lp/dark.svg" alt="">
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
            <img src="@/assets/images/lp/light.svg" alt="">
          </button>
        </span>
        <span class="app-link btn __pg pc">
          <a href="/admin">
            Enter App
          </a>
        </span>
      </div>
    </div>
  </header>
</template>

<script>

  export default {
    name: 'Header',
    methods: {
      changeTheme(theme) {
        this.$store.dispatch("changeTheme", theme);
      },
      open(){
        this.$store.dispatch("hamberger", {hamberger: true});
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';
  .lp-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    background: var(--color_lp_bg);
    z-index: 10;
    @include media(sp) {
      display: block;
      height: 0vh !important;
      text-align: left;
      &.active{
        height: 100vh !important;
        .link-wrap{
          display: block !important;
        }
      }
    }
    &__inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      width: 1110px;
      @include media(sp) {
        display: block;
        width: 100%;
      }
    }
    &__actions{
      @include media(sp) {
        width: 100%;
      }
    }
    &__head{
      @include media(sp) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: var(--color_lp_bg);
      }
    }
    .logo-wrap{
      width: 75%;
      @include media(sp) {
        width: 100%;
        display: block !important;
      }
      .link-wrap{
        width: 60%;
        margin-left: 40px;
        padding: 80px 0;
        @include media(sp) {
          width: 100%;
          display: none !important;
          margin: 0 24px;
        }
        &.active{
          display: block !important;
        }
        span{
          @include media(sp) {
            width: 100%;
            display: block !important;
            margin-bottom: 32px;
          }
          a{
            font-size: 18px;
            font-weight: 400;
          }
        }
      }
    }
    @include media(pc) {
      height: 100px;
      padding: 0 36px;
      .logo {
        height: 36px;
        width: 100%;
      }
    }
    .logo {
      white-space: nowrap;
      @include media(sp) {
        width: 50%;
      }
    }
    .theme-button{
      margin-right: 2rem;
      width: 54px;
      height: 54px;
      vertical-align: middle;
      span{
        margin-right: 8px;
      }
    }
    .app-link{
      border-radius: 0.6rem;
      padding: 0;
      height: 4.2rem;
      line-height: 4.2rem;
      @include media(sp) {
        width: 50% !important;
      }
      a{
        display: block;
        padding: 0 4rem;
        color: #fff;
      }
    }
  }

.toggle-theme {
  text-align: center;
  @include media(pc) {
    margin-left: 24px;
  }
  @include media(sp) {
    width: 10% !important;
  }
}
.theme-button {
  font-size: 0;
  @include media(pc) {
    .emoji {
      font-size: 28px;
    }
  }
  @include media(sp) {
    .emoji {
      font-size: 2rem;
    }
    &.is-active {
      display: none;
    }
  }
  &--light {
    grid-row: 1;
    grid-column: 1;
  }
  &--dark {
    grid-row: 1;
    grid-column: 3;
  }
}
.hamburger{
  display: block;
  position: relative;
  width: 24px;
  height: 24px;
  overflow: hidden;
  z-index: 2;
  &.active{
    .menu-btn{
      top: 0;
    }
  }
  .menu-btn{
    position: absolute;
    top: -23px;
  }
}
</style>