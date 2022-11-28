<template>
  <div>
    <lp-header :isUseMainnet="isUseMainnet" :isEnableEnterApp="isEnableEnterApp" :isMobile="isMobile" />
    <article class="media_kit lp display">
      <section>
        <div class="title">
          <h1>
            Media Kit
          </h1>
          <p>
            Latest update: November, 2022
          </p>
        </div>
        <div class="sub-title border-bottom">
          <h2>
            Slash Payment Brand
          </h2>
          <p class="dsc-title">
            What is Slash Payment?
          </p>
          <p class="dsc">
            Slash Payment is Merchants can automatically accept online TOKEN payments
            <br>
            from customers using the Web3 wallet.
          </p>
        </div>
        <div class="logo border-bottom">
          <div class="contents-title">
            <h3>
              Logomark
            </h3>
            <div class="logo-img add-flex">
              <div class="logo-bg">
                <img src="@/assets/images/lp/slash-logo.svg" alt="">
              </div>
              <div class="logo-bg">
                <img src="@/assets/images/lp/slash-logo2.svg" alt="">
              </div>
            </div>
          </div>
          <div class="logo-clearspace">
            <h4>
              Clearspace
            </h4>
            <div class="logo-img add-flex">
              <figure>
                <img src="@/assets/images/lp/clearspace-l.svg" alt="">
              </figure>
              <figure>
                <img src="@/assets/images/lp/clearspace-m.svg" alt="">
              </figure>
            </div>
          </div>
        </div>
        <div class="usecase">
          <div class="contents-title">
            <h3>
              Use case
            </h3>
            <div class="usecase-block">
              <h4>
                Settlement indication
              </h4>
              <div class="usecase-content">
                <ul>
                  <li v-for="(icon, list) in logoList" :key="list">
                    <img :src="icon.svg" alt="">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="misuse border-bottom">
          <div class="contents-title">
            <h3>
              Misuse
              <span>
                <img src="@/assets/images/lp/close.png" alt="">
              </span>
            </h3>
          </div>
          <div class="misuse-items add-flex">
            <div class="misuse-item">
              <figure>
                <img src="@/assets/images/lp/misuse-01.png" alt="">
              </figure>
              <p>
                Don’t adjust the
                <br class="pc">
                width
              </p>
            </div>
            <div class="misuse-item">
              <figure>
                <img src="@/assets/images/lp/misuse-02.png" alt="">
              </figure>
              <p>
                Don’t add other visual
                <br class="pc">
                effects
              </p>
            </div>
          </div>
          <div class="misuse-items add-flex">
            <div class="misuse-item">
              <figure>
                <img src="@/assets/images/lp/misuse-03.png" alt="">
              </figure>
              <p>
                Don’t change color
              </p>
            </div>
            <div class="misuse-item">
              <figure>
                <img src="@/assets/images/lp/misuse-04.png" alt="">
              </figure>
              <p>
                Don't change the
                <br class="pc">
                ratio
              </p>
            </div>
          </div>
        </div>
        <div class="another border-bottom">
          <div class="contents-title">
            <h3>
              Another Logos
            </h3>
          </div>
          <p class="another-dsc">
            Please use this one depending on your application.
          </p>
          <div class="another-logo">
            <div class="another-items add-flex j-left">
              <div class="another-item">
                <p>
                  Mark only
                </p>
                <figure>
                  <img src="@/assets/images/lp/slash-mark.svg" alt="">
                </figure>
              </div>
              <div class="another-item">
                <p>
                  Text only
                </p>
                <figure>
                  <img src="@/assets/images/lp/slash-text.svg" alt="">
                </figure>
              </div>
            </div>
            <div class="another-items">
              <div class="another-item">
                <p>
                  Full name
                </p>
                <figure>
                  <img src="@/assets/images/lp/slash-full.svg" alt="">
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div class="usecase border-bottom misuse">
          <div class="contents-title">
            <h3>
              Payment Button
            </h3>
            <div class="usecase-block mb-0">
              <h4>
                STANDARD BUTTON
              </h4>
              <div class="usecase-bg">
                <figure>
                  <div class="usecase-img">
                    <img src="@/assets/images/lp/payment_button01.svg" alt="">
                  </div>
                  <div class="usecase-img">
                    <img src="@/assets/images/lp/payment_button01-d.svg" alt="">
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div class="download">
          <div class="contents-title">
            <h3>
              Download Assets
            </h3>
          </div>
          <div class="download-items">
            <div v-for="(svg, key) in svgList" :key="key" class="download-item add-flex">
              <div class="download-item-left">
                <p>{{svg.title}}</p>
                <a class="tb-inline" :href="svg.svgImage" download>SVG</a>
                <a class="tb-inline ml-1" :href="svg.pngImage" download>PNG</a>
              </div>
              <div class="download-item-right">
                <figure>
                  <img :src="svg.svgImage">
                </figure>
                <a class="download sp-inline" :href="svg.svgImage" download>SVG</a>
                <a class="download sp-inline ml-1" :href="svg.pngImage" download>PNG</a>
              </div>
            </div>
          </div>
        </div>
        <div class="download">
          <div class="contents-title">
            <h3>
              Payment Button
            </h3>
          </div>
          <div class="download-items">
            <div v-for="(buttonWrap, index) in paymentButtons" :key="index" class="download-item add-flex payment-button">
              <div class="download-item-left">
                <p>{{buttonWrap.title}}</p>
                <a class="tb-inline" :href="buttonWrap.svgLink" download>SVG</a>
                <a class="tb-inline ml-1" :href="buttonWrap.pngLink" download>PNG</a>
              </div>
              <div class="download-item-right">
                <div class="download-item-wrap">
                    <div class="download-item-img">
                      <img :src="buttonWrap.image01">  
                    </div>
                    <div class="download-item-img">
                      <img :src="buttonWrap.image02">  
                    </div>
                    <div class="download-item-img">
                      <img :src="buttonWrap.image03">  
                    </div>
                    <div class="download-item-img">
                      <img :src="buttonWrap.image04">  
                    </div>
                </div>
                <a class="download sp-inline" :href="buttonWrap.svgLink" download>SVG</a>
                <a class="download sp-inline ml-1" :href="buttonWrap.pngLink" download>PNG</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
    <LpFooter />
  </div>
</template>


<script>
import LpHeader from "@/components/organisms/lp/lpHeader";
import LpFooter from "@/components/organisms/lp/lpFooter";
import isMobile from 'ismobilejs';

export default {
  name: "payment",
  data() {
    return {
      svgList: [
        {title:"Slash Logomark", svgImage: require("@/assets/images/lp/slash-logo.svg"),  pngImage: require("@/assets/images/lp/slash-logo.png")},
        {title:"Slash Logomark2", svgImage: require("@/assets/images/lp/slash-logo2.svg"), pngImage: require("@/assets/images/lp/slash-logo2.png")},
        {title:"Mark only", svgImage: require("@/assets/images/lp/slash-mark.svg"),  pngImage: require("@/assets/images/lp/slash-mark.png")},
        {title:"Text only", svgImage: require("@/assets/images/lp/slash-text.svg"),  pngImage: require("@/assets/images/lp/slash-text.png")},
        {title:"Full name", svgImage: require("@/assets/images/lp/slash-full.svg"), pngImage: require("@/assets/images/lp/slash-full.png") }
      ],
      paymentButtons: [
        {
          title:"Light.ver1",
          image01: require("@/assets/images/lp/payment-button/light-ver1-svg/payment-button_light_ver1-01.svg"),
          image02: require("@/assets/images/lp/payment-button/light-ver1-svg/payment-button_light_ver1-02.svg"),
          image03: require("@/assets/images/lp/payment-button/light-ver1-svg/payment-button_light_ver1-03.svg"),
          image04: require("@/assets/images/lp/payment-button/light-ver1-svg/payment-button_light_ver1-04.svg"),
          svgLink: "/assets/images/lp/button/light-ver1-svg.zip",
          pngLink: "/assets/images/lp/button/light-ver1-png.zip"
        },
        {
          title:"Light.ver2",
          image01: require("@/assets/images/lp/payment-button/light-ver2-svg/payment-button_light_ver2-01.svg"),
          image02: require("@/assets/images/lp/payment-button/light-ver2-svg/payment-button_light_ver2-02.svg"),
          image03: require("@/assets/images/lp/payment-button/light-ver2-svg/payment-button_light_ver2-03.svg"),
          image04: require("@/assets/images/lp/payment-button/light-ver2-svg/payment-button_light_ver2-04.svg"),
          svgLink: "/assets/images/lp/button/light-ver2-svg.zip",
          pngLink: "/assets/images/lp/button/light-ver2-png.zip"
        },
        {
          title:"Dark.ver1",
          image01: require("@/assets/images/lp/payment-button/dark-ver1-svg/payment-button_dark_ver1-01.svg"),
          image02: require("@/assets/images/lp/payment-button/dark-ver1-svg/payment-button_dark_ver1-02.svg"),
          image03: require("@/assets/images/lp/payment-button/dark-ver1-svg/payment-button_dark_ver1-03.svg"),
          image04: require("@/assets/images/lp/payment-button/dark-ver1-svg/payment-button_dark_ver1-04.svg"),
          svgLink: "/assets/images/lp/button/dark-ver1-svg.zip",
          pngLink: "/assets/images/lp/button/dark-ver1-png.zip"
        },
        {
          title:"Dark.ver2",
          image01: require("@/assets/images/lp/payment-button/dark-ver2-svg/payment-button_dark_ver2-01.svg"),
          image02: require("@/assets/images/lp/payment-button/dark-ver2-svg/payment-button_dark_ver2-02.svg"),
          image03: require("@/assets/images/lp/payment-button/dark-ver2-svg/payment-button_dark_ver2-03.svg"),
          image04: require("@/assets/images/lp/payment-button/dark-ver2-svg/payment-button_dark_ver2-04.svg"),
          svgLink: "/assets/images/lp/button/dark-ver2-svg.zip",
          pngLink: "/assets/images/lp/button/dark-ver2-png.zip"
        },
      ],
      logoList: [
        {svg: require("@/assets/images/lp/indication/icon-01.svg")},
        {svg: require("@/assets/images/lp/indication/icon-02.svg")},
        {svg: require("@/assets/images/lp/indication/icon-03.svg")},
        {svg: require("@/assets/images/lp/indication/icon-04.svg")},
        {svg: require("@/assets/images/lp/indication/icon-05.svg")},
        {svg: require("@/assets/images/lp/indication/icon-06.svg")},
        {svg: require("@/assets/images/lp/indication/icon-07.svg")},
        {svg: require("@/assets/images/lp/indication/icon-08.svg")},
        {svg: require("@/assets/images/lp/indication/icon-09.svg")},
        {svg: require("@/assets/images/lp/indication/icon-10.svg")},
        {svg: require("@/assets/images/lp/indication/icon-11.svg")},
        {svg: require("@/assets/images/lp/indication/icon-12.svg")},
        {svg: require("@/assets/images/lp/indication/icon-13.svg")},
        {svg: require("@/assets/images/lp/indication/icon-14.svg")},
        {svg: require("@/assets/images/lp/indication/icon-15.svg")},
      ]
    };
  },
  components: {
    LpHeader,
    LpFooter,
  },
  computed: {
    isUseMainnet() {
      return JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
    },
    isEnableEnterApp() {
      return JSON.parse(process.env.VUE_APP_ENABLE_ENTER_APP.toLowerCase())
    },
    isMobile() {
      return isMobile(window.navigator).any
    }
  },
  methods: {
    download() {
      let a = document.createElement('a');
      a.href = "/assets/images/lp/slash-logo.svg";
      a.download = 'slash-logo.svg';
      a.click();
    }
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.media_kit{
  padding: 56px 0;
  @include media(tb) {
    padding: 56px 16px 0;
  }
  section{
    text-align: left;
    padding: 104px 0 0;
    @include media(tb) {
      padding: 56px 0 0;
    }
    .border-bottom{
      border-bottom: 1px solid #766D91;
    }
    .title{
      h1{
        font-size: 73px;
        font-weight: 500;
        @include media(tb) {
          font-size: 50px;
        }
      }
      p{
        font-size: 16px;
        margin-bottom: 40px;
        font-weight: 400;
        @include media(tb) {
          margin-bottom: 0;
        }
      }
    }
    .contents-title{
      h3{
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 24px;
        @include media(tb) {
          font-size: 21px;
          margin-bottom: 16px;
        }
      }
      span{
        img{
          width: 32px;
          height: 32px;
        }
      }
    }
    .sub-title{
      padding: 40px 0 72px;
      margin-bottom: 72px;
      @include media(tb) {
        padding: 24px 0 48px;
        margin-bottom: 56px;
      }
      h2{
        font-size: 60px;
        margin-bottom: 8px;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 100% 10%;
        display: inline-block;
        @include media(tb) {
          font-size: 28px;
        }
      }
      .dsc-title{
        font-size: 28px;
        margin-bottom: 16px;
        font-weight: 600;
        @include media(tb) {
          font-size: 21px;
          margin-bottom: 8px;
        }        
      }
      .dsc{
        font-size: 16px;
        font-weight: 400;
        @include media(tb) {
          font-size: 14px;
        }
      }
    }
    .logo{
      margin-bottom: 72px;
      padding-bottom: 16px;
      @include media(tb) {
        margin-bottom: 48px;
      }
      .logo-img{
        margin-bottom: 80px;
        @include media(tb) {
          margin-bottom: 40px;
        }
        .logo-bg{
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          border-radius: 10px;
          &:nth-child(1){
            width: 100%;
            max-width: 550px;
            background: center center / contain no-repeat white;
            @include media(tb) {
              max-width: 273px;
              height: 138px;
              margin-bottom: 16px;
            }
            img{
              width: 70%;
            }
          }
          &:nth-child(2){
            width: 100%;
            max-width: 330px;
            height: 250px;
            background: center center / contain no-repeat white;
            margin-left: 24px;
            @include media(tb) {
              max-width: 181px;
              height: 138px;
              margin-left: 24px;
            }
            @media only screen and (max-width: 500px) {
              margin-left: 0;
            }
            img{
              width: 45%;
              @include media(tb) {
                width: 90px;
                height: 98px;
              }
            }
          }
        }
        figure{
          img{
            width: 100%;
          }
          @include media(tb) {
            margin-bottom: 24px;
          }
          &:nth-child(1){
            width: 100%;
            max-width: 550px;
            height: 224px;
            @include media(tb) {
              max-width: 273px;
              height: 138px;
              margin-bottom: 16px;
            }
          }
          &:nth-child(2){
            width: 100%;
            max-width: 330px;
            height: 224px;
            margin-left: 24px;
            @include media(tb) {
              max-width: 181px;
              height: 138px;
              margin-left: 24px;
            }
            @media only screen and (max-width: 500px) {
              margin-left: 0;
            }
          }
        }
      }
      .logo-clearspace{
        h4{
          font-size: 30px;
          margin-bottom: 32px;
          font-weight: 600;
          @include media(tb) {
            font-size: 25px;
            margin-bottom: 24px;
          }
        }
      }
    }
    .usecase{
      margin-bottom: 80px;
      @include media(tb) {
        margin-bottom: 56px;
      }
      .usecase-block{
        margin-bottom: 54px;
        @include media(tb) {
          margin-bottom: 40px;
        }
        h4{
          font-size: 26px;
          font-weight: 400;
          margin-bottom: 24px;
          @include media(tb) {
            font-size: 14px;
            font-weight: 300;
            margin-bottom: 8px;
          }
        }
        .usecase-bg{
          background: #fff;
          max-width: 698px;
          padding: 48px;
          border-radius: 8px;
          @include media(tb) {
            padding: 32px 40px;
          }
          figure{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            @media only screen and (max-width: 460px) {
              justify-content: center;
            }
            .usecase-img{
              position: relative;
              width: 280px;
              img{
                max-width: 275px;
                width: 100%;
              }
            }
            @media only screen and (max-width: 660px) {
              .usecase-img{
                &:nth-child(1){
                  margin-bottom: 16px;
                }
              }
            }
          }
        }
      }
      .usecase-content{
        background: #fff;
        max-width: 698px;
        padding: 40px;
        border-radius: 8px;
        @include media(tb) {
          padding: 16px;
        }
        ul{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li{
            border: 1px solid #D1D1D1;
            border-radius: 8px;
            width: 18%;
            text-align: center;
            line-height: 65px;
            height: 70px;
            margin-bottom: 32px;
            @include media(sp) {
              width: 32%;
              margin-bottom: 16px;
              &:nth-child(n + 13){
                margin-bottom: 0;
              }
            }
            @include media(pc) {
              &:nth-child(n + 10){
                margin-bottom: 0;
              }
            }
            &:nth-child(1){
              img{
                width: 40%;
                @include media(tb) {
                  width: 34px;
                }
              }
            }
            &:nth-child(2){
              img{
                width: 55%;
                @include media(tb) {
                  width: 56px;
                }
              }
            }
            &:nth-child(5){
              img{
                width: 40%;
                @include media(tb) {
                  width: 41px;
                }
              }
            }
            &:nth-child(10){
              img{
                width: 70%;
                @include media(tb) {
                  width: 70px;
                }
              }
            }
            &:nth-child(15){
              img{
                width: 80%;
                @include media(tb) {
                  width: 82px;
                }
              }
            }
          }
        }
      }
    }
    .misuse{
      padding-bottom: 100px;
      margin-bottom: 100px;
      @include media(tb) {
        padding-bottom: 32px;
        margin-bottom: 48px;
      }
      .misuse-items{
        @include media(tb) {
          justify-content: space-between;
        }
        .misuse-item{
          margin-bottom: 16px;
          @include media(tb) {
            margin-bottom: 24px;
            width: 82%;
          }
          &:nth-child(2){
            margin-left: 24px;
            @media only screen and (max-width: 1024px) {
              margin-left: 0;
            }
          }
          figure{
            margin-bottom: 4px;
            width: 335px;
            img{
              border-radius: 8px;
            }
            @include media(tb) {
              margin-bottom: 8px;
            }
          }
          p{
            font-size: 14px;
            font-weight: 400;
          }
        }
      }
    }
    .another{
      margin-bottom: 80px;
      padding-bottom: 32px;
      @include media(tb) {
        margin-bottom: 40px;
        padding-bottom: 0;
      }
      .another-dsc{
        margin-bottom: 40px;
        font-size: 16px;
        @include media(tb) {
          font-size: 14px;
        }
      }
      .another-logo{
        .another-items{
          p{
            font-size: 24px;
            margin-bottom: 16px;
            @include media(tb) {
              font-size: 18px;
            }
          }
          &:nth-child(1){
            max-width: 500px;
            .another-item{
              width: 50%;
              @include media(tb) {
                width: 100%;
              }
              figure{
                display: flex;
                align-items: center;
                height: 117px;
                @include media(tb) {
                  height: auto;
                }
              }
            }
          }
          &:nth-child(2){
            width: 80%;
            @include media(tb) {
              width: 100%;
            }
            .another-item{
              figure{
                display: flex;
                align-items: center;
                max-width: 742px;
                @include media(tb) {
                  width: 100%;
                }
                img{
                  width: 100%;
                }
              }
            }
          }
        }
        figure{
          margin-bottom: 56px;
          @include media(tb) {
            &:nth-child(1){
              width: 32%;
            }
            &:nth-child(2){
              width: 58%;
            }
          }
        }
      }
    }
    .download{
      .download-items{
        .download-item{
          margin-bottom: 96px;
          &.payment-button{
            &:nth-last-child(1){
              margin-bottom: 0;
            }
          }
          @include media(tb) {
            margin-bottom: 56px;
          }
          .download-item-left{
            width: 40%;
            @include media(tb) {
              width: 100%;
              
            }
            p{
              margin-bottom: 16px;
              font-size: 20px;
              font-weight: 500;
            }
            a{
              padding: 8px 24px;
              background: $gradation-light !important;
              box-sizing: border-box !important;
              border-radius: 30px;
              font-weight: 500;
              margin-bottom: 16px;
              font-size: 20px;
              cursor: pointer;
            }
          }
          &:nth-child(1){
            img{
              width: 65%;
              @include media(tb) {
                width: 75%;
              }
            }
          }
          &:nth-child(2){
            img{
              width:  30%;
              @include media(tb) {
                width: 35%;
              }
            }
          }
          &:nth-child(4){
            img{
              width: 45%;
              @include media(tb) {
                width: 60%;
              }
            }
          }
          &:nth-child(5){
            img{
              width: 80%;
              @include media(tb) {
                width: 75%;
              }
            }
          }
          .download-item-right{
            width: 46%;
            a{
              color: #fff;
            }
            @include media(tb) {
              width: 100%;
            }
            figure{
              background: #fff;
              text-align: center;
              max-width: 498px;
              height: 250px;
              line-height: 250px;
              border-radius: 8px;
              margin-bottom: 16px;
              @include media(sp) {
                height: 200px;
                line-height: 200px;
              }
            }
            @include media(tb) {
              a{
                padding: 8px 32px;
                background: $gradation-light !important;
                box-sizing: border-box !important;
                border-radius: 30px;
                font-weight: 300;
                font-size: 20px;
              }
            }
            .download-item-wrap{
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              background: #fff;
              max-width: 498px;
              padding: 64px 22px;
              border-radius: 8px;
              margin-bottom: 16px;
              @include media(sp) {
                padding: 48px 22px;
              }
              .download-item-img{
                width: 50%;
                padding: 4px;
                img{
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
    .terms{
      font-size: 30px;
      font-weight: 600;
      border-bottom: 1px solid #fff;
      @include media(tb) {
        font-size: 21px;
        margin-bottom: 32px;
      }
    }
  }
}
</style>

