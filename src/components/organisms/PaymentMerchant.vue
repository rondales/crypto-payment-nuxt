<template>
  <div class="pay">
    <Header
      :width="windowWidth"
      :showMenu="showMenu"
      @toggleMenu="toggleMenu"
      @switchColorTheme="switchColorTheme"
    />
    <div class="menu" :class="{ active: showMenu }">
      <PaymentTitle type="h2_g" html="Menu" />
      <div class="menu-nav_body">
        <a v-for="nav in navList" :key="nav.url" :href="nav.url" target="_blank"
          ><PaymentText type="h5" :html="nav.title"
        /></a>
      </div>
    </div>
    <div class="pay__box">
      <div class="pay__box__wrap">
        <div class="pay__head">
          <PaymentTitle class="title" type="h2_g" html="Generate Payment URL"/>
        </div>
        <div class="pay__body">
          <PaymentTransaction
            class="mt-4"
            :type="loading? 'loading' : 'dismiss'"
            :title="loading ? 'Now generating' : 'Generate failed'"
            :text="loading ? 'Please for waiting' : 'Please press to Refresh button'"
          />
          <PaymentButton
            v-if="!loading"
            color="primary"
            size="m"
            text="Refresh"
            @click.native="refresh"
            icon="reload"
          />
        </div>
        <div class="pay__foot">
          <LogoText class="svg" />
          <PaymentText tag="p" type="capb" html="Web3 Payment" />
        </div>
      </div>
    </div>
    <footer>
      <PaymentText type="cap" class="copy" html="Slash Web3 Payment ®︎" />
    </footer>
  </div>
</template>

<script>
import {errorCodeList} from "@/enum/error_code";
import Header from '@/components/organisms/header'
import PaymentTitle from "@/components/organisms/Payment/Title";
import PaymentText from '@/components/organisms/Payment/Text'
import PaymentButton from "@/components/organisms/Payment/Button";
import PaymentTransaction from '@/components/organisms/Payment/Transaction'
import LogoText from '@/components/common/LogoText'

export default {
  name: "PaymentQrCode",
  components: {
    Header,
    PaymentTitle,
    PaymentText,
    PaymentButton,
    PaymentTransaction,
    LogoText
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      showMenu: false,
      loading: false,
      csrfToken: {},
      navList: [
        {
          title: 'About Slash.fi',
          url: 'https://slash-fi.gitbook.io/docs/whitepaper/slash-project-white-paper'
        },
        {
          title: 'FAQ',
          url: 'https://slash-fi.gitbook.io/docs/support/help-center'
        },
        {
          title: 'Terms of Service',
          url: 'https://slash-fi.gitbook.io/docs/support/terms-of-use'
        },
        {
          title: 'Privacy Policy',
          url: 'https://slash-fi.gitbook.io/docs/support/data-protection-and-privacy-policy'
        },
        {
          title: 'AML Policy',
          url: 'https://slash-fi.gitbook.io/docs/support/anti-money-laundering-policy'
        }
      ]
    };
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    }
  },
  methods: {
    apiGetPaymentToken() {
      const url = `${this.API_BASE_URL}/api/v1/payment/generate`
      return this.axios.post(url,
      {
        ...this.csrfToken,
        payment_token: this.$route.params.payment_token,
      }, {
            withCredentials: true,
          });
    },
    apiGetCsrfToken() {
      const url = `${this.API_BASE_URL}/api/v1/security/csrf`
      return this.axios({
        url,
        method: 'get',
        dataType: "JSON",
        withCredentials: true,
      });
    },
    refresh() {
      this.handlePayment()
    },
    async handlePayment() {
      this.loading = true
      try {
        const csrfRes = await this.apiGetCsrfToken()
        this.csrfToken = {...csrfRes.data}
        const payment = await this.apiGetPaymentToken()
        this.$router.push({name: 'entrance', params: {token: payment.data.token}})
      } catch (error) {
        this.loading = false
        console.log({error})
        let message;
        if (error.response.status === 400) {
          message = errorCodeList[error.response.data.errors.shift()].msg;
        } else {
          message = "Please try again after a while.";
        }
        this.showErrorModal(message);
      }
    },
    handleWindowResize() {
      this.windowWidth = window.innerWidth
    },
    toggleMenu(state) {
      this.showMenu = state
    },
    switchColorTheme(color) {
      this.$store.dispatch('changeTheme', color)
    },
    showErrorModal(message) {
      this.$store.dispatch("modal/show", {
        target: "error-modal",
        size: "small",
        params: {
          message: message,
        },
      });
    },

  },
  created() {
    this.handlePayment()
  },
  mounted() {
    window.addEventListener('resize', this.handleWindowResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  }
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
    box-shadow: 0px 8px 2rem rgba(139, 42, 225, 0.7),
      0px -8px 2rem rgba(62, 185, 252, 0.7);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    box-shadow: rgba(139, 42, 225, 0.3) -4px 9px 25px -6px,
      rgba(62, 185, 252, 0.7) 4px -9px 25px -10px;
    @include media(sp) {
      width: 90%;
      width: 100%;
      box-shadow: none;
    }
    &::before {
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
  &__head {
    @include flex(space-between, center);
    &::v-deep {
      .title {
        justify-content: center;
      }
    }
    padding-top: 3rem;
  }
  &__foot {
    margin-bottom: 2rem;
    margin-top: 5rem;
    text-align: center;
    @include flex(center, center);
    flex-direction: column;
    .svg {
      margin-bottom: 0.5rem;
      width: 6rem;
    }
    .text {
      &::v-deep {
        * {
          line-height: 1;
        }
      }
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
  @include media(sp) {
    display: none;
  }
}
</style>

