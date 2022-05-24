<template>
  <footer>
    <div class="footer-wrap">
      <div class="lp-footer_logo">
        <!-- <img src="@/assets/images/lp/logo.png" alt="" />
        <h4>Slash Payment</h4> -->
        <img
          class="logoimage"
          src="@/assets/images/lp/lp-logo.svg"
          alt="Web3 Payment"
        />
      </div>
      <div class="lp-footer_col">
        <div class="lp-footer_left">
          <div class="lp-footer_info">
            <div><span>SLASH FINTECH LIMITED（BVI）</span></div>
            <p>
              <span
                >3rd Floor, J & C Building, Road<br />Town, Tortola, British
                Virgin Islands, VG1110</span
              >
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
                  <a :href="localUrl+navlink.url">
                    <span>{{ navlink.title }}</span>
                  </a>
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
          >@ 2022 Copyrights by SLASH FINTECH LIMITED . All Rights
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
  data() {
    return {
      nav: [
        {
          title: "Developers",
          list: [
            {
              title: "Integrations",
              url: "",
            },
            {
              title: "Plugins",
              url: "",
            },
            {
              title: "Docs",
              url: "",
            },
            {
              title: "Slash Developers",
              url: "",
            },
          ],
        },
        {
          title: "Fee & Ecosystem",
          list: [
            {
              title: "Fee & Ecosystem",
              url: "#fee-ecosystem",
            },
            {
              title: "Donation Program",
              url: "#donation",
            },
            {
              title: "Slash Token",
              url: "#token",
            },
          ],
        },
        {
          title: "Other",
          list: [
            {
              title: "RoadMap",
              url: "#roadmap",
            },
            {
              title: "Referral",
              url: "#developers",
            },
            {
              title: "Contact",
              url: "#contact",
            },
            {
              title: "Terms of Service",
              url: "",
            },
            {
              title: "Privacy Terms",
              url: "",
            },
            {
              title: "Media Kit",
              url: "/media_kit",
            },
          ],
        },
      ],
      sns: [
        {
          icon: "icon/twitter",
          link: "",
          status: true,
        },
        {
          icon: "icon/telegram",
          link: "",
          status: false,
        },
        {
          icon: "icon/discord",
          link: "",
          status: false,
        },
        {
          icon: "icon/arroba",
          link: "",
          status: true,
        },
        {
          icon: "icon/gitbook",
          link: "",
          status: true,
        },
      ],
      localUrl: "",
    };
  },
  created(){
    this.localUrl = location.origin
  },
  methods: {
    changeTheme(theme) {
      this.$store.dispatch("changeTheme", theme);
    },
    open() {
      this.$store.dispatch("hamberger", { hamberger: true });
    },
    enterApp() {
      this.$store.dispatch("changeTheme", "dark");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
footer {
  .footer-wrap {
    @extend .section__wrap;
    @include rem_padding(5, 0, 3, 0);

    .lp-footer {
      &_logo {
        @include flex(flex-start, center);
        margin-bottom: rem(3);
        @include media(sp) {
          @include flex(center, center);
        }

        img {
          width: rem(3);
          margin-right: rem(1);
          &.logoimage {
            width: rem(23);
            margin-right: 0;
          }
        }
        h4 {
          @include font(rem(3), 600, $ls, $lh, $en_go);
          background: $gradation-light;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          @include media(sp) {
            font-size: rem(2);
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
      &_right {
        // width: 60%;
        // @include media(sp) {
        //   width: 100%;
        // }
      }
      &_nav {
        @include flex(flex-end, flex-start);
        @include media(sp) {
          display: block;
        }
        .navbox {
          & + * {
            margin-left: rem(4);
            @include media(sp) {
              margin-left: 0;
              margin-top: rem(4);
            }
          }
        }
        ul {
          display: block;
        }
        h4 {
          @include font(rem(pow(1)), 600, 0.06em, $lh, $en_go);
          margin-bottom: rem(1);
          @include media(sp) {
            text-align: center;
          }
        }
        a {
          display: block;
          @include font(rem(pow(0)), 400, $ls, $lh, $en_go);
          @include rem_padding(0.3, 0, 0.3, 0);
          @include media(sp) {
            text-align: center;
          }
        }
      }
      &_info {
        margin-bottom: rem(3);
        @include media(sp) {
          text-align: center;
        }
        div {
          @include font(rem(pow(0)), 500, 0.06em, $lh, $en_go);
          margin-bottom: rem(0.5);
        }
        p {
          @include font(rem(pow(-1)), $fw, 0.06em, $lh, $en_go);
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
        }
        .icon {
          &::v-deep {
            svg {
              fill: var(--color_font);
            }
          }
        }
        .disable {
          // opacity: 0.5;
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
        }
      }
    }
  }
  .copy {
    @include rem_padding(2, 0, 2, 0);
    text-align: center;
    @include font(rem(pow(-1)), 400, 0.06em, $lh, $en_go);
  }
}
</style>
