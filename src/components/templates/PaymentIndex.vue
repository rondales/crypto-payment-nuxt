<template>
  <div class="slash-bg">
    <Header :width="windowWidth" @switchColorTheme="switchColorTheme" />
    <div v-show="initializing" class="payment initializing">
      <div class="progress-wrap add-flex j-center a-center">
        <radial-progress-bar
          :diameter="150"
          :animate-speed="400"
          :start-color="'#D97C87'"
          :stop-color="'#8A2CE1'"
          :completed-steps="progressCompletedSteps"
          :total-steps="progressTotalSteps"
        >
          <p class="step">{{ progressCompletedPercent }}<span class="percent">%</span></p>
          <p class="status">Loading</p>
        </radial-progress-bar>
      </div>
    </div>
    <div v-show="!initializing" class="payment">
      <div class="menu-nav" v-if="showMenu">
        <div class="menu-nav_top">
          <img src="@/assets/images/menu.svg" />
        </div>
        <div class="menu-nav_body">
          <!-- <a href="/">
            Cookie settings
          </a> -->
          <a
            href="https://slash-fi.gitbook.io/docs/whitepaper/slash-project-white-paper"
            target="_blank"
          >
            About Slash.fi
          </a>
          <a
            href="https://slash-fi.gitbook.io/docs/support/help-center"
            target="_blank"
          >
            FAQ
          </a>
          <a
            href="https://slash-fi.gitbook.io/docs/support/terms-of-use"
            target="_blank"
          >
            Terms of Service
          </a>
          <a
            href="https://slash-fi.gitbook.io/docs/support/data-protection-and-privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </a>
          <a
            href="https://slash-fi.gitbook.io/docs/support/anti-money-laundering-policy"
            target="_blank"
          >
            AML Policy
          </a>
        </div>
      </div>
      <payment-top
        :showMenu="showMenu"
        @copyLink="copyLink"
        @toggleMenu="toggleMenu"
      />
      <div class="add-flex j-between">
        <div>
          <p class="payment_Receiver mb-1 non-translate">
            Payee：{{ receiver }}
            <img v-if="isVerifiedDomain" :src="domainVerifiedIcon" />
          </p>
          <p class="payment_invoice-id non-translate">Invoice ID：{{ invoiceId }}</p>
        </div>
        <router-view
          :progressTotalSteps="progressTotalSteps"
          :progressCompletedSteps="progressCompletedSteps"
          @updateInitializingStatus="updateInitializingStatus"
          @updateProgressTotalSteps="updateProgressTotalSteps"
          @incrementProgressCompletedSteps="incrementProgressCompletedSteps"
        />
      </div>
      <div v-if="loading" class="loading add-flex j-center a-center">
        <img class="spin" src="@/assets/images/loading.svg" />
      </div>
    </div>
  </div>
</template>


<script>
import RadialProgressBar from 'vue-radial-progress'
import Header from "@/components/organisms/header";
import PaymentTop from "@/components/organisms/PaymentTop";
import { DARK_THEME, LIGHT_THEME } from "@/constants";

export default {
  name: "PaymentIndex",
  components: {
    RadialProgressBar,
    Header,
    PaymentTop,
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
    };
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
        ? Math.floor(this.progressCompletedSteps / this.progressTotalSteps * 100)
        : 0
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
      this.initializing = initializing
    },
    updateProgressTotalSteps(totalSteps) {
      this.progressTotalSteps = totalSteps
    },
    incrementProgressCompletedSteps() {
      ++this.progressCompletedSteps
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
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
  &.initializing {
    @include media(sp) {
      // top: calc(50% + 12rem);
      position: relative;
      top: 0;
      left: 0;
      transform: translate(0%, 23vh);
      margin: 3rem auto;
    }
  }
  .progress-wrap {
    height: 25vh;
    .step {
      font-weight: 400;
      font-size: 2.5rem;
      .percent {
        font-weight: 300;
        font-size: 1.5rem;
      }
    }
    .status {
      font-weight: 300;
      font-size: 1.5rem;
      animation: flash 1.5s linear infinite;
    }
    @keyframes flash {
      0%,100% {
        opacity: 0.5;
      }
      50% {
        opacity: 0;
      }
    }
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
    margin: auto;
    padding-top: 60px;
    padding-bottom: 60px;
    .title {
      font-weight: 200;
      font-size: 18px;
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
