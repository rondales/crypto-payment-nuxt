<template>
  <footer>
    <div class="footer-wrap">
      <div class="lp-footer_logo">
        <img
          class="logoimage"
          src="@/assets/images/lp/lp-logo.svg"
          alt="Web3 Payment"
        />
      </div>
      <div class="lp-footer_col">
        <div class="lp-footer_left">
          <div class="lp-footer_info">
            <div class="non-translate"><span>SLASH VISION</span></div>
            <p>
              <a href="https://www.slash.vision/">https://www.slash.vision/</a>
            </p>
          </div>
          <!-- <div class="lp-footer_info">
            <div><span>SLASH FINTECH LIMITED（CANADA）</span></div>
            <p>
              <span
                >1700-777 DUNSMUIR ST.<br />VANCOUVER, BRITISH COLUMBIA
                V7Y1K4<br />Money Services Business (MSB) Registration number is
                M22785834</span
              >
            </p>
          </div> -->
        </div>
        <div class="lp-footer_right">
          <div class="lp-footer_nav">
            <div class="navbox" v-for="footmenu in nav" :key="footmenu.title">
              <h4>
                <span>{{ footmenu.title }}</span>
              </h4>
              <ul>
                <li v-for="navlink in footmenu.list" :key="navlink.title">
                  <div v-if="navlink.show">
                    <a v-if="navlink.blank" :href="navlink.url" :target="navlink.blank? '_blank':false" :class="{disable: !(navlink.url)}">
                      <span>{{ navlink.title }}</span>
                    </a>
                    <router-link
                      v-else
                      :to="{
                        name: navlink.name,
                        hash: navlink.hash
                      }"
                    >
                      <span>{{ navlink.title }}</span>
                    </router-link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul class="lp-footer_icon">
        <li v-for="thisSns in sns" :key="thisSns.icon">
          <a
            :href="thisSns.link"
            target="_blank"
            :class="[thisSns.status ? 'active' : 'disable']"
          >
            <LpIcon class="icon" :path="thisSns.icon" />
          </a>
        </li>
      </ul>
      <p class="copy">
        <span
          >@ 2022 Copyrights by <a href="https://slash.vision/">SLASH VISION.</a> All Rights
          Reserved.</span
        >
      </p>
    </div>
  </footer>
</template>

<script>
import LpIcon from "@/components/templates/LpParts/Icon";
export default {
  name: "Footer",
  components: {
    LpIcon,
  },
  props: { isUseMainnet: Boolean },
  data() {
    return {
      nav: {
        developers: {
          title: "Developers",
          list: {
            integrations: {
              title: "Integrations",
              url: "https://slash-fi.gitbook.io/docs/integration-guide/introduction",
              blank:  true,
              show: true
            },
            plugins: {
              title: "Plugins",
              url: "https://slash-fi.gitbook.io/docs/integration-guide/plugins-for-store-apps",
              blank:  true,
              show: true
            },
            api: {
              title: "API",
              url: "https://slash-fi.gitbook.io/docs/integration-guide/api-integration",
              blank:  true,
              show: true
            },
            quickStart: {
              title: "Quick Start",
              url: "https://slash-fi.gitbook.io/docs/integration-guide/quick-start",
              blank:  true,
              show: true
            },
            network: {
              title: "To Testnet",
              url: "https://testnet.slash.fi/",
              blank:  true,
              show: true
            },
          },
        },
        feeAndEcosystem: {
          title: "Fee & Ecosystem",
          list: {
            feeAndEcosystem: {
              title: "Fee & Ecosystem",
              url: "",
              name: "home",
              hash: "#fee-ecosystem",
              blank: false,
              show: true
            },
            donationProgram: {
              title: "Donation Program",
              url: "",
              name: "home",
              hash: "#donate",
              blank: false,
              show: true
            },
            slashToken: {
              title: "Slash Token",
              url: "",
              name: "home",
              hash: "#slash-token",
              blank: false,
              show: true
            },
          },
        },
        other: {
          title: "Other",
          list: {
            roadmap: {
              title: "RoadMap",
              url: "",
              name: "home",
              hash: "#roadmap",
              blank: false,
              show: true
            },
            referral: {
              title: "Referral",
              url: "",
              name: "home",
              hash: "#developers",
              blank: false,
              show: false
            },
            contact: {
              title: "Contact",
              url: "",
              name: "home",
              hash: "#contact",
              blank: false,
              show: true
            },
            terms: {
              title: "Terms of Use",
              url: "https://slash-fi.gitbook.io/docs/support/terms-of-use",
              blank: true,
              show: true
            },
            privacy: {
              title: "Data Protection and Privacy Policy",
              url: "https://slash-fi.gitbook.io/docs/support/data-protection-and-privacy-policy",
              blank: true,
              show: true
            },
            aml: {
              title: "Anti-Money Laundering Policy",
              url: "https://slash-fi.gitbook.io/docs/support/anti-money-laundering-policy",
              blank: true,
              show: true
            },
            mediaKit: {
              title: "Media Kit",
              url: "",
              name: "media_kit",
              blank: false,
              show: true
            },
          },
        },
      },
      sns: {
        twitter: {
          icon: "icon/twitter",
          link: "https://twitter.com/SlashWeb3",
          status: true,
        },
        telegram: {
          icon: "icon/telegram",
          link: "https://slash-fi.gitbook.io/docs/support/help-center#developer-support",
          status: true,
        },
        discord: {
          icon: "icon/discord",
          link: "https://discord.com/invite/gk25cyBs78",
          status: true,
        },
        mail: {
          icon: "icon/arroba",
          link: "mailto:hello@slash.vision",
          status: true,
        },
        gitbook: {
          icon: "icon/gitbook",
          link: "https://slash-fi.gitbook.io/docs/whitepaper/slash-project-white-paper",
          status: true,
        },
        medium: {
          icon: "icon/medium",
          link: "https://medium.com/slash-project-publishing",
          status: true,
        },
      },
      localUrl: "",
    };
  },
  created() {
    this.localUrl = location.origin;
    if (!this.isUseMainnet) {
      this.nav.developers.list.network.title = "To Mainnet"
      this.nav.developers.list.network.url = "https://slash.fi/"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
footer {
  .footer-wrap {
    @extend .section__wrap;
    @include rem_padding(5, 0, 3, 0);
    @include media(sp) {
      padding-top: rem_sp(4);
      padding-bottom: rem_sp(3);
    }

    .lp-footer {
      &_logo {
        @include flex(flex-start, center);
        margin-bottom: rem(3);
        @include media(sp) {
          @include flex(center, center);
          margin-bottom: rem_sp(3);
        }

        img {
          width: rem(3);
          margin-right: rem(1);
          @include media(sp) {
            width: rem_sp(3);
            margin-right: rem_sp(1);
          }
          &.logoimage {
            width: rem(23);
            margin-right: 0;
            @include media(sp) {
              width: rem_sp(20);
            }
          }
        }
        h4 {
          @include font(rem(3), 600, $ls, $lh, $en_go);
          background: $gradation-light;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          @include media(sp) {
            font-size: rem_sp(2);
          }
        }
      }
      &_col {
        @include flex(space-between, flex-start);
        @include media(sp) {
          display: block;
        }
      }
      &_left {
        @include media(sp) {
          margin-bottom: rem(3);
        }
      }

      &_nav {
        @include flex(flex-end, flex-start);
        @include media(sp) {
          display: block;
        }
        .navbox {
          @include media(sp) {
            border-top: 1px solid var(--color_darken);
            padding-top: rem_sp(2);
          }
          & + * {
            margin-left: rem(4);
            @include media(sp) {
              margin-left: 0;
              margin-top: rem_sp(2.5);
            }
          }
        }
        ul {
          @include media(sp) {
            @include flex(flex-start, flex-start);
            @include list(1, rem_sp(1));
          }
        }
        h4 {
          @include font(rem(pow(1)), 600, 0.06em, $lh, $en_go);
          margin-bottom: rem(1);
          @include media(sp) {
            // border-bottom: 1px solid var(--color_darken);
            // padding-bottom: rem_sp(0.5);
            // text-align: center;
            font-size: rem_sp(pow(1));
            margin-bottom: rem_sp(1);
          }
        }
        a {
          display: block;
          @include font(rem(pow(0)), 400, $ls, 2, $en_go);
          @include media(sp) {
            // text-align: center;
            font-size: rem_sp(pow(0));
          }
          &.disable{
            opacity: .6;
            pointer-events: none;
          }
        }
      }
      &_info {
        margin-bottom: rem(3);
        @include media(sp) {
          text-align: center;
          margin-bottom: rem_sp(3);
        }
        div {
          @include font(rem(pow(0)), 500, 0.06em, $lh, $en_go);
          margin-bottom: rem(0.5);
          @include media(sp) {
            font-size: rem_sp(pow(0));
            margin-bottom: rem_sp(0.5);
          }
        }
        p {
          @include font(rem(pow(-1)), $fw, 0.06em, $lh, $en_go);
          @include media(sp) {
            font-size: rem_sp(pow(-1));
          }
        }
      }
      &_icon {
        @include flex(center, center);
        margin-top: rem(3);
        @include media(sp) {
          margin-top: rem(4);
        }
        a {
          display: block;
          width: rem(3);
          @include media(sp) {
            width: rem_sp(3);
          }
        }
        .icon {
          &::v-deep {
            svg {
              fill: var(--color_font);
            }
          }
        }
        .disable {
          pointer-events: none;
          .icon {
            &::v-deep {
              svg {
                fill: var(--color_inactive);
              }
            }
          }
        }
        li + li {
          margin-left: rem(1);
          @include media(sp) {
            margin-left: rem_sp(1);
          }
        }
      }
    }
  }
  .copy {
    @include rem_padding(2, 0, 2, 0);
    text-align: center;
    @include font(rem(pow(-1)), 400, 0.06em, $lh, $en_go);
    a{
    background: linear-gradient(90.25deg, #8a2ce1 5.43%, #d97c87 98.19%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 100% 10%;
    }
    @include media(sp) {
      font-size: rem_sp(pow(-1));
      padding-top: rem_sp(2);
      padding-bottom: rem_sp(2);
    }
  }
}
</style>
