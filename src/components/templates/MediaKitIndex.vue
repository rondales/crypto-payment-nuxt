<template>
  <div>
    <lp-header />
    <article class="media_kit lp display">
      <section>
        <div class="title">
          <h1>
            Media Kit
          </h1>
          <p>
            Latest update: March, 2022
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
              <figure>
                <img src="@/assets/images/lp/logo-l.png" alt="">
              </figure>
              <figure class="pc">
                <img src="@/assets/images/lp/logo-m.png" alt="">
              </figure>
            </div>
          </div>
          <div class="logo-clearspace">
            <h4>
              Clearspace
            </h4>
            <div class="logo-img add-flex">
              <figure>
                <img src="@/assets/images/lp/clearspace-l.png" alt="">
              </figure>
              <figure class="pc">
                <img src="@/assets/images/lp/clearspace-m.png" alt="">
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
                STANDARD BUTTON
              </h4>
              <figure>
                <img src="@/assets/images/lp/standard-button.png" alt="">
              </figure>
            </div>
            <div class="usecase-block">
              <h4>
                Settlement indication
              </h4>
              <figure>
                <img src="@/assets/images/lp/indication.png" alt="">
              </figure>
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
          <div class="another-logo pc">
            <figure>
              <img src="@/assets/images/lp/another-logo.png" alt="">
            </figure>
            <figure>
              <img src="@/assets/images/lp/another-full-logo.png" alt="">
            </figure>
          </div>
          <div class="another-logo sp">
            <figure>
              <img src="@/assets/images/lp/another-logo-sp.png" alt="">
            </figure>
            <figure>
              <img src="@/assets/images/lp/another-logo-sp-02.png" alt="">
            </figure>
            <figure>
              <img src="@/assets/images/lp/another-logo-sp-03.png" alt="">
            </figure>
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
                <a class="pc-inline" :href="svg.svgImage" download>svg</a>
              </div>
              <div class="download-item-right">
                <figure>
                  <img :src="svg.svgImage">
                </figure>
                <a class="download sp-inline" :href="svg.svgImage" download>svg</a>
              </div>
            </div>
          </div>
        </div>
        <a class="terms" href="">
          TERMS OF SERVICE
        </a>
      </section>
    </article>
    <LpFooter />
  </div>
</template>


<script>
import LpHeader from "@/components/organisms/lp/lpHeader";
import LpFooter from "@/components/organisms/lp/lpFooter";

export default {
  name: "payment",
  data() {
    return {
      svgList: [
        {title:"Slash Logomark", svgImage: require("@/assets/images/lp/slash-logo.svg")},
        {title:"Mark only", svgImage: require("@/assets/images/lp/slash-mark.svg")},
        {title:"Text only", svgImage: require("@/assets/images/lp/slash-text.svg")},
        {title:"Full name", svgImage: require("@/assets/images/lp/slash-full.svg")}
      ],
    };
  },
  components: {
    LpHeader,
    LpFooter,
  },
  computed: {
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
        @include media(tb) {
          font-size: 60px;
        }
      }
      p{
        font-size: 16px;
        margin-bottom: 40px;
        font-weight: 400;
        @include media(tb) {
          margin-bottom: 16px;
        }
      }
    }
    .contents-title{
      h3{
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 24px;
        @include media(tb) {
          font-size: 24px;
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
          font-size: 46px;
        }
      }
      .dsc-title{
        font-size: 28px;
        margin-bottom: 16px;
        font-weight: 600;
        @include media(tb) {
          font-size: 24px;
        }        
      }
      .dsc{
        font-size: 16px;
        font-weight: 400;
        @include media(tb) {
          font-size: 15px;
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
        figure{
          &:nth-child(2){
            margin-left: 24px;
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
            font-size: 16px;
            font-weight: 300;
            margin-bottom: 8px;
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
        .misuse-item{
          margin-bottom: 16px;
          @include media(tb) {
            margin-bottom: 24px;
          }
          &:nth-child(2){
            margin-left: 24px;
            @include media(tb) {
              margin-left: 0;
            }
          }
          figure{
            margin-bottom: 4px;
            @include media(tb) {
              margin-bottom: 8px;
            }
          }
          p{
            font-size: 16px;
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
          font-size: 15px;
        }
      }
      .another-logo{
        figure{
          margin-bottom: 56px;
            &:nth-child(1){
              width: 360px;
            }
            &:nth-child(2){
              width: 560px;
            }
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
              font-size: 22px;
              font-weight: 300;
            }
            a{
              padding: 8px 24px;
              background: $gradation-light !important;
              box-sizing: border-box !important;
              border-radius: 30px;
              font-weight: 400;
            }
          }
          &:nth-child(1){
            img{
              width: 80%;
            }
          }
          &:nth-child(4){
            img{
              width: 70%;
            }
          }
          .download-item-right{
            width: 46%;
            @include media(tb) {
              width: 100%;
            }
            figure{
              background: #fff;
              text-align: center;
              height: 250px;
              line-height: 250px;
              border-radius: 8px;
              margin-bottom: 16px;
            }
            @include media(tb) {
              a{
                padding: 8px 32px;
                background: $gradation-light !important;
                box-sizing: border-box !important;
                border-radius: 30px;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
    .terms{
      font-size: 30px;
      border-bottom: 1px solid #fff;
      @include media(tb) {
        font-size: 24px;
        margin-bottom: 32px;
      }
    }
  }
}
</style>

