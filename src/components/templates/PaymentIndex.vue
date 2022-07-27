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
        <a v-for="nav in navList" :key="nav.url" :href="nav.url" target="_blank"
          ><PaymentText type="h5" :html="nav.title"
        /></a>
      </div>
      <!-- TODO SPの時、この中にwalletとかを表示したい -->
    </div>
    <div class="pay__box">
      <div class="pay__box__wrap">
        <div v-show="initializing" class="pay__initializing">
          <div class="progress-wrap">
            <radial-progress-bar
              :diameter="150"
              :animate-speed="400"
              :start-color="'#D97C87'"
              :stop-color="'#8A2CE1'"
              :completed-steps="progressCompletedSteps"
              :total-steps="progressTotalSteps"
            >
              <p class="step">
                <PaymentText type="h1" :html="progressCompletedPercent" />
                <PaymentText type="h5" html="%" />
              </p>
              <PaymentText type="cap" html="Loading..." />
            </radial-progress-bar>
          </div>
        </div>
        <div v-show="!initializing" class="payment">
          <div class="pay__head">
            <PaymentIdTable class="pay__head__ids" :table="idTable" />
            <PaymentTop
              :showMenu="showMenu"
              @copyLink="copyLink"
              @toggleMenu="toggleMenu"
            />
          </div>
          <div class="pay__body">
            <router-view
              :progressTotalSteps="progressTotalSteps"
              :progressCompletedSteps="progressCompletedSteps"
              @updateInitializingStatus="updateInitializingStatus"
              @updateProgressTotalSteps="updateProgressTotalSteps"
              @incrementProgressCompletedSteps="incrementProgressCompletedSteps"
            />
          </div>
          <div v-if="loading" class="pay__loading">
            <img class="spin" src="@/assets/images/loading.svg" />
          </div>
        </div>
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
import RadialProgressBar from "vue-radial-progress";
import Header from "@/components/organisms/header";
import PaymentTop from "@/components/organisms/PaymentTop";
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentIcon from "@/components/organisms/Payment/Icon";
import PaymentIdTable from "@/components/organisms/Payment/IdTable";
import PaymentTitle from "@/components/organisms/Payment/Title";
import { DARK_THEME, LIGHT_THEME } from "@/constants";
export default {
  name: "PaymentIndex",
  components: {
    RadialProgressBar,
    Header,
    PaymentTop,
    PaymentText,
    PaymentIdTable,
    PaymentTitle,
    PaymentIcon,
  },
  props: [
    "colorTheme",
    "receiver",
    "isVerifiedDomain",
    "invoiceId",
    "base64VuexData",
  ],
  data() {
    return {
      windowWidth: window.innerWidth,
      showMenu: false,
      loading: false,
      initializing: true,
      progressTotalSteps: 20,
      progressCompletedSteps: 0,
      idTable: [
        {
          title: "Payee",
          text: this.receiver,
          verified: this.isVerifiedDomain,
        },
        { title: "Invoice ID", text: this.invoiceId },
      ],
      navList: [
        {
          title: "About Slash.fi",
          url: "https://slash-fi.gitbook.io/docs/whitepaper/slash-project-white-paper",
        },
        {
          title: "FAQ",
          url: "https://slash-fi.gitbook.io/docs/support/help-center",
        },
        {
          title: "https://slash-fi.gitbook.io/docs/support/terms-of-use",
          url: "Terms of Service",
        },
        {
          title:
            "https://slash-fi.gitbook.io/docs/support/data-protection-and-privacy-policy",
          url: "Privacy Policy",
        },
        {
          title:
            "https://slash-fi.gitbook.io/docs/support/anti-money-laundering-policy",
          url: "AML Policy",
        },
      ],
    };
  },
  watch: {
    receiver(value) {
      this.idTable[0].text = value
    },
    isVerifiedDomain(value) {
      this.idTable[0].verified = value
    },
    invoiceId(value) {
      this.idTable[1].text = value
    }
  },
  computed: {
    darkTheme() {
      return DARK_THEME;
    },
    lightTheme() {
      return LIGHT_THEME;
    },
    progressCompletedPercent() {
      return this.progressCompletedSteps && this.progressTotalSteps
        ? Math.floor(
            (this.progressCompletedSteps / this.progressTotalSteps) * 100
          )
        : 0;
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
    updateInitializingStatus(initializing) {
      this.initializing = initializing;
    },
    updateProgressTotalSteps(totalSteps) {
      this.progressTotalSteps = totalSteps;
    },
    incrementProgressCompletedSteps() {
      ++this.progressCompletedSteps;
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
    @include media(sp) {
      // top: calc(50% + 12rem);
      position: relative;
      top: 0;
      left: 0;
      transform: translate(0%, 23vh);
      margin: 3rem auto;
    }
    .progress-wrap {
      // height: 25vh;
      .radial-progress-container {
        margin-left: auto;
        margin-right: auto;
      }
      .step {
        @include flex(center, baseline);
        &::v-deep {
          span {
            line-height: 1;
          }
        }
      }
      .status {
        // font-weight: 300;
        // font-size: 1.5rem;
        animation: flash 1.5s linear infinite;
      }
      @keyframes flash {
        0%,
        100% {
          opacity: 0.5;
        }
        50% {
          opacity: 0;
        }
      }
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
// .slash-bg {
//   width: 100%;
//   min-height: 120vh;
//   overflow: hidden;
//   @include media(sp) {
//     padding-top: 55px;
//     min-height: 100vh;
//   }
//   position: relative;
//   &::before {
//     content: "";
//     background: url(/assets/images/slash-bg.png) no-repeat center center;
//     width: 100%;
//     height: 100vh;
//     position: fixed;
//     top: 100px;
//     z-index: 0;
//     @include media(sp) {
//       top: 70px;
//     }
//   }
// }
// .theme--light {
//   .slash-bg {
//     &::before {
//       content: "";
//       background: url(/assets/images/slash-bg-l.png) no-repeat center center;
//     }
//   }
// }
// .home {
//   text-align: center;
// }
// .payment {
//   position: absolute;
//   top: 60vh;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   box-shadow: var(--color_shadow);
//   width: 100%;
//   max-width: 36.1rem;
//   padding: 32px 24px 24px;
//   border-radius: 8px;
//   background: var(--color_bg);
//   @include media(sp) {
//     // top: calc(50% + 12rem);
//     position: relative;
//     top: 0;
//     left: 0;
//     transform: translate(0%, 0%);
//     margin: 3rem auto;
//   }
//   &::before {
//     content: "Slash.fi Web3 Payment ®︎";
//     font-size: 11px;
//     color: var(--color_font);
//     font-weight: 300;
//     position: absolute;
//     bottom: -60px;
//     left: 50%;
//     transform: translate(-50%, 0);
//     opacity: 0.7;
//   }
//   &.initializing {
//     @include media(sp) {
//       // top: calc(50% + 12rem);
//       position: relative;
//       top: 0;
//       left: 0;
//       transform: translate(0%, 23vh);
//       margin: 3rem auto;
//     }
//   }
//   .progress-wrap {
//     height: 25vh;
//     .step {
//       font-weight: 400;
//       font-size: 2.5rem;
//       .percent {
//         font-weight: 300;
//         font-size: 1.5rem;
//       }
//     }
//     .status {
//       font-weight: 300;
//       font-size: 1.5rem;
//       animation: flash 1.5s linear infinite;
//     }
//     @keyframes flash {
//       0%,100% {
//         opacity: 0.5;
//       }
//       50% {
//         opacity: 0;
//       }
//     }
//   }
//   .menu-nav {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: var(--color_bg);
//     padding: 32px;
//     z-index: 1;
//     border-radius: 10px;
//   }
//   .menu-nav_top {
//     margin-bottom: 32px;
//   }
//   .menu-nav_body {
//     a {
//       display: block;
//       font-size: 18px;
//       font-weight: 300;
//       margin-bottom: 24px;
//     }
//   }
//   &_initializing {
//     text-align: center;
//     margin: auto;
//     padding-top: 60px;
//     padding-bottom: 60px;
//     .title {
//       font-weight: 200;
//       font-size: 18px;
//     }
//   }
//   .payment_Receiver,
//   .payment_invoice-id {
//     font-weight: 400;
//     font-size: 15px;
//   }
//   .loading {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.6);
//     border-radius: 8px;
//     z-index: 9999;
//   }
// }
// .fixed {
//   position: fixed;
//   bottom: 0;
//   left: 50%;
//   transform: translate(-50%, 0);
//   width: 100%;
//   padding: 16px;
//   background: var(--color_darken);
//   .btn {
//     font-size: 12px;
//     height: 4.2rem;
//     line-height: 4.2rem;
//     padding: 0 1.4rem;
//     .icon-wrap {
//       margin-right: 4px;
//     }
//     img {
//       vertical-align: middle;
//       width: 18px;
//       height: 18px;
//     }
//   }
// }
</style>
