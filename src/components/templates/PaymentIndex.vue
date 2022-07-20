<template>
  <div class="pay">
    <Header
      :width="windowWidth"
      @switchColorTheme="switchColorTheme"
      :showMenu="showMenu"
      @toggleMenu="toggleMenu"
    />
    <div class="menu" :class="{ active: showMenu }">
      <PaymentTitle type="h2_g" html="Menu" />
      <div class="menu-nav_body">
        <a
          href="https://slash-fi.gitbook.io/docs/whitepaper/slash-project-white-paper"
          target="_blank"
          ><PaymentText type="h5" html=" About Slash.fi"
        /></a>
        <a
          href="https://slash-fi.gitbook.io/docs/support/help-center"
          target="_blank"
          ><PaymentText type="h5" html="FAQ" />
        </a>
        <a
          href="https://slash-fi.gitbook.io/docs/support/terms-of-use"
          target="_blank"
        >
          <PaymentText type="h5" html="Terms of Service" />
        </a>
        <a
          href="https://slash-fi.gitbook.io/docs/support/data-protection-and-privacy-policy"
          target="_blank"
        >
          <PaymentText type="h5" html="Privacy Policy" />
        </a>
        <a
          href="https://slash-fi.gitbook.io/docs/support/anti-money-laundering-policy"
          target="_blank"
        >
          <PaymentText type="h5" html="AML Policy" />
        </a>
      </div>
      <!-- TODO SPの時、この中にwalletとかを表示したい -->
    </div>
    <div class="pay__box">
      <div class="pay__box__wrap">
        <div v-if="initializing" class="pay__initializing">
          <img
            class="spin"
            src="@/assets/images/loading.svg"
            alt="processing"
          />
          <PaymentText type="subtitle" class="title" html="Loading..." />
        </div>
        <div v-else>
          <div class="pay__head d-payboxwrap">
            <PaymentIdTable class="pay__head__ids" :table="idTable" />
            <PaymentTop
              :showMenu="showMenu"
              @copyLink="copyLink"
              @toggleMenu="toggleMenu"
            />
          </div>
          <div class="pay__body">
            <router-view />
          </div>
          <div v-if="loading" class="pay__loading">
            <img class="spin" src="@/assets/images/loading.svg" />
          </div>
        </div>
        <!-- TODO styleguideどこかに移植 -->
        <!-- <PaymentStyle /> -->
        <div class="pay__foot">
          <PaymentIcon class="" path="logo-text" />
          <PaymentText tag="p" type="capb" html="Web3 Payment" />
        </div>
      </div>
    </div>
    <footer>
      <PaymentText type="cap" class="copy" html="Slash.fi Web3 Payment ®︎" />
    </footer>
  </div>
</template>


<script>
import Header from "@/components/organisms/header";
import PaymentTop from "@/components/organisms/PaymentTop";
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentIcon from "@/components/organisms/Payment/Icon";
import PaymentIdTable from "@/components/organisms/Payment/IdTable";
import PaymentTitle from "@/components/organisms/Payment/Title";
// import PaymentStyle from "@/components/organisms/Payment/Style";

import { DARK_THEME, LIGHT_THEME } from "@/constants";

export default {
  name: "PaymentIndex",
  components: {
    Header,
    PaymentTop,
    PaymentText,
    PaymentIdTable,
    PaymentTitle,
    PaymentIcon,
    // PaymentStyle,
  },
  props: [
    "colorTheme",
    "receiver",
    "isVerifiedDomain",
    "invoiceId",
    "base64VuexData",
    "initializing",
  ],
  data() {
    return {
      windowWidth: window.innerWidth,
      showMenu: false,
      loading: false,
      idTable: [
        { title: "Payee", text: this.receiver },
        { title: "Invoice ID", text: this.invoiceId },
      ],
    };
  },
  computed: {
    darkTheme() {
      return DARK_THEME;
    },
    lightTheme() {
      return LIGHT_THEME;
    },
    domainVerifiedIcon() {
      return this.isDarkTheme
        ? require("@/assets/images/domain-verified.svg")
        : require("@/assets/images/domain-verified-l.svg");
    },
    isDarkTheme() {
      return this.colorTheme === this.darkTheme;
    },
    isLightTheme() {
      return this.colorTheme === this.lightTheme;
    },
    isShowMenu() {
      return this.showMenu;
    },
  },
  methods: {
    openModal(target, size) {
      this.$emit("openModal", target, size);
    },
    switchColorTheme(color) {
      this.$emit("switchColorTheme", color);
    },
    handleWindowResize() {
      this.windowWidth = window.innerWidth;
    },
    copyLink() {
      this.$store.dispatch("account/copied");
      const uri = new URL(window.location.href);
      const token = this.$route.params.token;
      this.$clipboard(
        `${uri.protocol}//${uri.host}/payment/result/${token}?rcpt=1`
      );
    },
    toggleMenu(state) {
      this.showMenu = state;
    },
    testtest() {
      console.log("aaaaaaaaaa");
      alert("Test");
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.pay {
  min-height: 100vh;
  padding-top: 100px;
  @include media(sp) {
    padding-top: 61px;
  }
  &__box {
    width: 35rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 1rem;
    overflow: hidden;
    // border: 1px solid #eee;
    // background-color: var(--color_lp_box);
    box-shadow: 0px 8px 2rem rgba(139, 42, 225, 0.7),
      0px -8px 2rem rgba(62, 185, 252, 0.7);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    // box-shadow: rgba(139, 42, 225, 0.4) 5px 5px,
    //   rgba(139, 42, 225, 0.3) 10px 10px, rgba(139, 42, 225, 0.2) 15px 15px,
    //   rgba(139, 42, 225, 0.1) 20px 20px, rgba(139, 42, 225, 0.05) 25px 25px;
    box-shadow: rgba(139, 42, 225, 0.3) -4px 9px 25px -6px,
      rgba(62, 185, 252, 0.7) 4px -9px 25px -10px;
    @include media(sp) {
      width: 90%;
      width: 100%;
      box-shadow: none;
      // border: 0px solid #eee;
    }
    &::before {
      // content: "";
      display: block;
      width: 100%;
      height: 1rem;
      background: $gradation-pale;
    }
    &__wrap {
      padding: 0 2rem;
      @include media(sp) {
        padding: 0 5vw;
      }
    }
  }
  &__initializing {
    text-align: center;
    margin: 60px auto;
    .spin {
      width: 6rem;
      margin-left: auto;
      margin-right: auto;
    }
    .title {
      margin-left: 1rem;
      // font-weight: 200;
      // font-size: 18px;
    }
  }
  &__head {
    padding-top: 3rem;
    &__ids {
    }
  }
  &__foot {
    // padding: 4rem 0;
    margin-bottom: 2rem;
    margin-top: 5rem;
    text-align: center;
    // @include flex(center, self-end);
    @include flex(center, center);
    flex-direction: column;
    .svg {
      margin-bottom: 0.5rem;
      width: 6rem;
      // margin-right: 0.8rem;
    }
    .text {
      &::v-deep {
        * {
          line-height: 1;
        }
      }
    }
  }
  &__loading {
    width: 20%;
    margin: 4rem auto;
  }

  // &__btnwrap {
  //   display: flex;
  //   flex-direction: row-reverse;

  //   & > * {
  //     flex: 1;
  //     margin: 0 0.5rem;
  //   }
  // }

  // &__action {
  //   @include flex(space-between, center);
  //   background-color: var(--color_bg_parts);
  //   padding: 2rem;
  //   border-radius: 1rem;
  //   @include media(sp) {
  //     padding: 1rem;
  //   }
  //   .icon {
  //     width: 2.5rem;
  //     font-size: 0;
  //     &::v-deep {
  //       svg {
  //         fill: var(--color_font);
  //       }
  //     }
  //   }
  //   .text {
  //     flex: 1;
  //     padding: 0 1rem;
  //   }
  // }
  // &__price {
  //   background-color: var(--color_bg_parts);
  //   padding: 2rem;
  //   border-radius: 1rem;
  //   .head {
  //     @include flex(space-between, center);
  //   }
  //   .price {
  //     text-align: right;
  //   }
  // }
  // &__tab {
  //   @include flex(flex-start, flex-start);
  //   background-color: var(--color_bg_parts);
  //   padding: 0.5rem;
  //   border-radius: 0.5rem;
  //   margin-bottom: 1rem;
  //   a {
  //     flex: 1;
  //     text-align: center;
  //     display: block;
  //     padding: 0.5rem;
  //     border-radius: 0.5rem;
  //     &.is-active {
  //       background: $gradation-pale;
  //     }
  //   }
  // }
  // &__form {
  //   $formh: 2rem;
  //   &__wrap {
  //     border: var(--color_border);
  //     border-radius: 6px;
  //     @include flex(flex-start, center);
  //     padding: 0.8rem;
  //   }
  //   input {
  //     @include font(1.25rem, 600, $ls, $formh, $en_go);
  //     padding: 0rem 0.5rem;
  //     display: block;
  //     flex: 1;
  //   }
  //   select {
  //     width: 8rem;
  //     text-align: center;
  //     padding: 0rem 0.5rem;
  //     border-left: var(--color_border);
  //     @include font(1.25rem, 600, $ls, $formh, $en_go);
  //   }
  //   .error {
  //     margin-top: 0.5rem;
  //   }
  // }
  // &__tokens {
  //   .title {
  //     margin-bottom: 0.5rem;
  //   }
  //   .pay__form {
  //     margin-top: 1rem;
  //     margin-bottom: 1rem;
  //   }
  //   .foot {
  //     @include flex(space-between, center);
  //   }
  // }
  &__token_import {
    @include flex(space-between, center);
    .icon {
      width: 2.5rem;
      font-size: 0;
      border-radius: 100%;
      &::v-deep {
        svg {
          fill: var(--color_font);
        }
      }
    }
    .text {
      flex: 1;
      padding: 0 1rem;
      @include flex(flex-start, center);
    }
  }
}
.menu {
  position: fixed;
  right: 0;
  top: 0;
  background-color: var(--Base);
  height: 100vh;
  padding: 3rem;
  padding-top: 100px;
  transform: translateX(100%);
  transition: transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
  z-index: 100;
  a {
    display: block;
    padding: 0.5rem 0;
  }
  &.active {
    transform: translateX(0%);
  }
}
footer {
  text-align: center;
  padding: 10rem 0 2rem;
}

.slash-bg {
  width: 100%;
  min-height: 120vh;
  overflow: hidden;
  @include media(sp) {
    padding-top: 55px;
    min-height: 100vh;
  }
  position: relative;
  &::before {
    content: "";
    background: url(/assets/images/slash-bg.png) no-repeat center center;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 100px;
    z-index: 0;
    @include media(sp) {
      top: 70px;
    }
  }
}
.theme--light {
  .slash-bg {
    &::before {
      content: "";
      background: url(/assets/images/slash-bg-l.png) no-repeat center center;
    }
  }
}

.home {
  text-align: center;
}
.payment {
  position: absolute;
  top: 60vh;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: var(--color_shadow);
  width: 100%;
  max-width: 36.1rem;
  padding: 32px 24px 24px;
  border-radius: 8px;
  background: var(--color_bg);
  @include media(sp) {
    // top: calc(50% + 12rem);
    position: relative;
    top: 0;
    left: 0;
    transform: translate(0%, 0%);
    margin: 3rem auto;
  }
  &::before {
    content: "Slash.fi Web3 Payment ®︎";
    font-size: 11px;
    color: var(--color_font);
    font-weight: 300;
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 0.7;
  }
  .menu-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color_bg);
    padding: 32px;
    z-index: 1;
    border-radius: 10px;
  }
  .menu-nav_top {
    margin-bottom: 32px;
  }
  .menu-nav_body {
    a {
      display: block;
      font-size: 18px;
      font-weight: 300;
      margin-bottom: 24px;
    }
  }
  &_initializing {
    text-align: center;
    margin: 60px auto;
    .title {
      // font-weight: 200;
      // font-size: 18px;
    }
  }
  .payment_Receiver,
  .payment_invoice-id {
    font-weight: 400;
    font-size: 15px;
  }
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    z-index: 9999;
  }
}
.fixed {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  padding: 16px;
  background: var(--color_darken);
  .btn {
    font-size: 12px;
    height: 4.2rem;
    line-height: 4.2rem;
    padding: 0 1.4rem;
    .icon-wrap {
      margin-right: 4px;
    }
    img {
      vertical-align: middle;
      width: 18px;
      height: 18px;
    }
  }
}
</style>
