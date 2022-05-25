<template>
  <button
    v-if="link.func"
    :class="linkClass"
    @click.prevent.stop="handle_function_call(link.func)"
  >
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
  </button>
  <a v-else :class="linkClass" v-bind="aHref">
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
import JsSHA from "jssha";
import { SAFE_THE_CHILDREN, UNICEF } from "@/constants";
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
        blank: false,
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
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    SAFE_THE_CHILDREN() {
      return SAFE_THE_CHILDREN;
    },
    UNICEF() {
      return UNICEF;
    },
    SAFE_THE_CHILDREN_MERCAHNT_IDENTIFICATION_TOKEN() {
      return process.env
        .VUE_APP_SAFE_THE_CHILDREN_MERCHANT_IDENTIFICATION_TOKEN;
    },
    SAFE_THE_CHILDREN_MERCAHNT_HASH_TOKEN() {
      return process.env.VUE_APP_SAFE_THE_CHILDREN_MERCHANT_HASH_TOKEN;
    },
    UNICEF_MERCAHNT_IDENTIFICATION_TOKEN() {
      return process.env.VUE_APP_UNICEF_MERCHANT_IDENTIFICATION_TOKEN;
    },
    UNICEF_MERCAHNT_HASH_TOKEN() {
      return process.env.VUE_APP_UNICEF_MERCHANT_HASH_TOKEN;
    },
    linkClass() {
      let classname = "lpButton " + this.type + " " + this.size;
      return classname;
    },

    aHref() {
      let prop = {};
      // prop["class"] = this.linkClass;

      if (!this.link.status) {
        prop["tabindex"] = "-1";
      } else {
        if (typeof this.link.func == "undefined") {
          prop["href"] = this.isExternalLink(this.link.url)
            ? this.link.url
            : "";
          if(this.link.blank){
            prop["target"] = this.isExternalLink(this.link.url) ? "_blank" : "";
          }
        }
      }
      return prop;
    },
  },
  methods: {
    // 外部リンクかどうかチェック
    isExternalLink(url) {
      let reg = new RegExp("^(https?:)?//" + document.domain);
      return url.match(reg) || url.charAt(0) === "/"; //boolean
    },
    handle_function_call(function_name) {
      if (function_name == "enterApp") {
        this.enterApp();
      } else if (function_name == "paymentForDonate_SAFE_THE_CHILDREN") {
        this.paymentForDonate(SAFE_THE_CHILDREN);
      } else if (function_name == "paymentForDonate_UNICEF") {
        this.paymentForDonate(UNICEF);
      }
    },
    enterApp() {
      this.$router.push({ path: "/admin" });
    },
    paymentForDonate(donationFor) {
      if (donationFor !== SAFE_THE_CHILDREN && donationFor !== UNICEF) {
        return;
      }
      const tokens = this.getDonationPaymentTokens(donationFor);
      this.apiGetDonateOrderCode(tokens.identification, donationFor)
        .then((apiResponse) => {
          const orderCode = apiResponse.data.order_code;
          const raw = `${orderCode}::::${tokens.hash}`;
          const hash = this.getDonationPaymentHash(raw);
          return {
            identification_token: tokens.identification,
            order_code: orderCode,
            verify_token: hash,
          };
        })
        .then(this.apiGetPaymentUrl)
        .then((apiResponse) => {
          location.href = apiResponse.data.url;
        })
        .catch(() => {
          this.$store.dispatch("modal/show", {
            target: "error-modal",
            size: "small",
            params: {
              message:
                "Please try again because an error occurred during processing.",
            },
          });
        });
    },
    getDonationPaymentTokens(donationFor) {
      const tokens = { identification: null, hash: null };
      switch (donationFor) {
        case SAFE_THE_CHILDREN:
          tokens.identification =
            this.SAFE_THE_CHILDREN_MERCAHNT_IDENTIFICATION_TOKEN;
          tokens.hash = this.SAFE_THE_CHILDREN_MERCAHNT_HASH_TOKEN;
          break;
        case UNICEF:
          tokens.identification = this.UNICEF_MERCAHNT_IDENTIFICATION_TOKEN;
          tokens.hash = this.UNICEF_MERCAHNT_HASH_TOKEN;
      }
      return tokens;
    },
    getDonationPaymentHash(str) {
      const sha = new JsSHA("SHA-256", "TEXT");
      sha.update(str);
      return sha.getHash("HEX");
    },
    apiGetDonateOrderCode(identificationToken, donationFor) {
      const url = `${this.API_BASE_URL}/api/v1/payment/donation/code`;
      const params = new URLSearchParams([
        ["identification_token", identificationToken],
        ["donation_for", donationFor],
      ]);
      return this.axios.get(url, { params });
    },
    apiGetPaymentUrl(submitData) {
      const url = `${this.API_BASE_URL}/api/v1/payment/receive`;
      return this.axios.post(url, submitData);
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

    .icon {
      width: rem(4);
      @include media(sp) {
        width: rem(3);
      }
    }
    * + * {
      margin-left: rem(1);
    }
    @include media(sp) {
      height: rem_sp(5);
      font-size: rem_sp(1.5);
      padding: 0 rem_sp(1);
      .icon {
        width: rem_sp(4);
        @include media(sp) {
          width: rem_sp(3);
        }
      }
      * + * {
        margin-left: rem(1);
      }
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
    @include media(sp) {
      height: rem_sp(3.5);
      font-size: rem_sp(pow(1));
      .icon {
        width: rem_sp(3);
      }
      * + * {
        margin-left: rem_sp(0.5);
      }
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
    @include media(sp) {
      height: rem_sp(3);
      font-size: rem_sp(1);
      .icon {
        width: rem_sp(2);
      }
      * + * {
        margin-left: rem_sp(0.5);
      }
    }
  }
  &.main {
    @extend .lpButton;
    position: relative;
    * {
      position: relative;
      z-index: 10;
    }
    @include media(sp) {
      width: 100%;
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
    @include media(sp) {
      width: 100%;
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
    @include media(sp) {
      width: 100%;
    }
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
    @include media(sp) {
      width: 100%;
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
