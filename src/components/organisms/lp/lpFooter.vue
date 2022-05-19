<template>
  <footer>
    <div class="footer-wrap">
      <div class="lp-footer_left">
        <div class="lp-first_icon">
          <img src="@/assets/images/lp/logo.png" alt="" />
          <h4>Slash Payment</h4>
        </div>
        <div class="lp-footer_link">
          <p><a href="">Terms of Service</a> | <a href="">Privacy Terms</a></p>
        </div>
        <div class="lp-footer_info">
          <p>
            <span>SLASH FINTECH LIMITED（BVI）</span>
            <br />
            3rd Floor, J & C Building, Road
            <br />
            Town, Tortola, British Virgin Islands, VG1110
          </p>
        </div>
        <div class="lp-footer_info">
          <p>
            <span>SLASH FINTECH LIMITED（CANADA）</span>
            <br />
            1700-777 DUNSMUIR ST.
            <br />
            VANCOUVER, BRITISH COLUMBIA V7Y1K4
            <br />
            Money Services Business (MSB) Registration number is M22785834
          </p>
        </div>
      </div>
      <div class="lp-footer_right">
        <div class="lp-footer_rightbox">
          <div class="box" v-for="footmenu in nav" :key="footmenu.title">
            <h4>
              <span>{{ footmenu.title }}</span>
            </h4>
            <ul>
              <li v-for="navlink in footmenu.list" :key="navlink.title">
                <a :href="navlink.url">
                  <span>{{ navlink.title }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer_icon-wrap">
          <div class="footer_icon">
            <ul>
              <li v-for="thisSns in sns" :key="thisSns.icon">
                <a
                  :href="thisSns.link"
                  target="_blank"
                  :class="[thisSns.status ? 'active' : 'disable']"
                >
                  <figure>
                    <img
                      :src="
                        require('@/assets/images/lp/' + thisSns.icon + '.svg')
                      "
                      alt=""
                    />
                  </figure>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <p class="copy">
      <span
        >@ 2022 Copyrights by SLASH FINTECH LIMITED . All Rights Reserved.</span
      >
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
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
              url: "",
            },
            {
              title: "Donation Program",
              url: "",
            },
            {
              title: "Slash Token",
              url: "",
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
              url: "",
            },
            {
              title: "Contact",
              url: "",
            },
          ],
        },
      ],
      sns: [
        {
          icon: "twitter",
          link: "",
          status: true,
        },
        {
          icon: "telegram",
          link: "",
          status: false,
        },
        {
          icon: "discord",
          link: "",
          status: false,
        },
        {
          icon: "arroba",
          link: "",
          status: true,
        },
        {
          icon: "gitbook-icon",
          link: "",
          status: true,
        },
      ],
    };
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
    padding: 90px 0 62px;
    display: flex;
    justify-content: space-between;
    text-align: left;
    max-width: 1030px;
    width: 90%;
    margin: 0 auto;
    font-weight: 400;
    @include media(sp) {
      display: block;
      padding: 35px 0;
    }
    .lp-first_icon {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      width: 100%;
      @include media(sp) {
        margin-bottom: 40px;
      }
      img {
        width: 40px;
        margin-right: 15px;
      }
      h4 {
        font-size: 30px;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .lp-footer_left {
      @include media(sp) {
        width: 100%;
        margin-bottom: 40px;
      }
      p {
        font-size: 15px;
      }
      .lp-footer_link {
        margin-top: 10px;
        @include media(sp) {
          margin-bottom: 35px;
        }
      }
      .lp-footer_info {
        margin-top: 60px;
        @include media(sp) {
          margin-top: 24px;
        }
        p {
          font-size: 12px;
          font-weight: 200;
          @include media(sp) {
            font-size: 10px;
          }
        }
        span {
          font-size: 16px;
          font-weight: 400;
          margin-bottom: 8px;
          display: inline-block;
          @include media(sp) {
            font-size: 14px;
          }
        }
      }
    }
    @include media(sp) {
      .lp-footer_info {
        font-size: 15px;
        margin-top: 25px;
      }
    }

    .lp-footer_right {
      width: 60%;
      @include media(sp) {
        width: 100%;
      }
      .lp-footer_rightbox {
        display: flex;
        justify-content: space-between;
        @include media(sp) {
          display: block;
        }
        .box {
          @include media(sp) {
            margin-left: 0;
            border-bottom: 1px solid #554b6a;
            padding: 24px 0;
            &.start {
              border-top: 1px solid #554b6a;
            }
            &.end {
              margin-bottom: 62px;
            }
          }
          h4 {
            font-weight: 600;
            margin-bottom: 15px;
          }
          p {
            font-weight: 300;
            margin-bottom: 11px;
            font-size: 19px;
          }
        }
      }
      .footer_icon-wrap {
        width: 50%;
        margin-top: 120px;
        margin-right: 0;
        margin-left: auto;
        @include media(sp) {
          width: 80%;
          margin: 20px auto;
        }
      }
      .footer_icon {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .disable {
          opacity: 0.5;
        }
        figure {
          width: 20%;
          text-align: right;
          @include media(sp) {
            text-align: center;
          }
          img {
            width: 30px;
          }
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
