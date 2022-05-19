<template>
  <footer>
    <div class="footer-wrap">
      <div class="lp-footer_left">
        <div class="lp-first_icon">
          <img src="@/assets/images/lp/logo.png" alt="" />
          <h4>Slash Payment</h4>
        </div>
        <div class="lp-footer_link"><p><a href="">Terms of Service</a> | <a href="">Privacy Terms</a></p></div>
        <div class="lp-footer_info">
          <p>
            <span>SLASH FINTECH LIMITED（BVI）</span>
            <br>
            3rd Floor, J & C Building, Road
            <br>
            Town, Tortola, British Virgin Islands, VG1110
          </p>
        </div>
        <div class="lp-footer_info">
          <p>
            <span>SLASH FINTECH LIMITED（CANADA）</span>
            <br>
            1700-777 DUNSMUIR ST. 
            <br>
            VANCOUVER, BRITISH COLUMBIA V7Y1K4
            <br>
            Money Services Business (MSB) Registration number is M22785834
          </p>
        </div>
      </div>
      <div class="lp-footer_right">
        <div class="lp-footer_rightbox">
          <div class="box start">
            <h4>Developers</h4>
            <p><a href="" target="_blank">Integrations</a></p>
            <p><a href="" target="_blank">Plugins</a></p>
            <p><a href="" target="_blank">Docs</a></p>
            <p><a href="" target="_blank">Slash Developers</a></p>
          </div>
          <div class="box">
            <h4>Fee & Ecosystem</h4>
            <p><a href="#fee-ecosystem">Fee & Ecosystem</a></p>
            <p><a href="#donation">Donation Program</a></p>
            <p><a href="#token">Slash Token</a></p>
          </div>
          <div class="box end">
            <h4>Other</h4>
            <p><a href="#roadmap">Road Map</a></p>
            <p><a href="#developers">Referral</a></p>
            <p><a href="#contact">Contact</a></p>
          </div>
        </div>
        <div class="footer_icon-wrap">
          <div class="footer_icon">
            <figure>
              <a href="">
                <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/twitter.svg" alt="" />
                <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/twitter-l.svg" alt="" />
              </a>
            </figure>
            <figure>
              <a class="disable" href=""><img src="@/assets/images/lp/telegram.svg" alt="" /></a>
            </figure>
            <figure>
              <a class="disable" href=""><img src="@/assets/images/lp/discord.svg" alt="" /></a>
            </figure>
            <figure>
              <a href="">
                <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/arroba.svg" alt="" />
                <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/arroba-l.svg" alt="" />
              </a>
            </figure>
            <figure>
              <a href="">
                <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/gitbook-icon.svg" alt="" />
                <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/gitbook-icon-l.svg" alt="" />
              </a>
            </figure>
          </div>
        </div>
      </div>
    </div>
    <p class="copy">
      @ 2022 Copyrights by SLASH FINTECH LIMITED . All Rights Reserved.
    </p>
  </footer>
</template>

<script>

  export default {
    name: 'lpFooter',
    methods: {

    },
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

footer{
  .footer-wrap{
    padding:90px 0 62px;
    display:flex;
    justify-content:space-between;
    text-align:left;
    max-width: 1030px;
    width:90%;
    margin:0 auto;
    font-weight: 400;
    @include media(sp) {
      display:block;
      padding:35px 0;
    }
    .lp-first_icon{
      display:flex;
      align-items:center;
      margin-bottom:15px;
      width: 100%;
      @include media(sp) {
        margin-bottom: 40px;
      }
      img{
        width:40px;
        margin-right:15px;
      }
      h4{
        font-size:30px;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .lp-footer_left{
      @include media(sp) {
        width:100%;
        margin-bottom: 40px;
      }
      p{
        font-size:15px;
      }
      .lp-footer_link{
        margin-top:10px;
        @include media(sp) {
          margin-bottom:35px;
        }
      }
      .lp-footer_info{
        margin-top:60px;
        @include media(sp) {
          margin-top:24px;
        }
        p{
          font-size: 12px;
          font-weight: 200;
          @include media(sp) {
            font-size: 10px;
          }
        }
        span{
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
      .lp-footer_info{
        font-size:15px;
        margin-top:25px;
      }
    }

    .lp-footer_right{
      width: 60%;
      @include media(sp) {
        width:100%;
      }
      .lp-footer_rightbox{
        display:flex;
        justify-content: space-between;
        @include media(sp) {
          display:block;
        }
        .box{
          @include media(sp) {
            margin-left:0;
            border-bottom:1px solid #554B6A;
            padding: 24px 0;
            &.start{
              border-top:1px solid #554B6A;
            }
            &.end{
              margin-bottom: 62px;
            }
          }
          h4{
            font-weight:600;
            margin-bottom:15px;
          }
          p{
            font-weight:300;
            margin-bottom:11px;
            font-size: 19px;
          }
        }
      }
      .footer_icon-wrap{
        width: 50%;
        margin-top: 120px;
        margin-right: 0;
        margin-left: auto;
        @include media(sp) {
          width: 80%;
          margin: 20px auto;
        }
      }
      .footer_icon{
        display: flex;
        justify-content: space-between;
        width: 100%;
        .disable{
          opacity: .5;
        }
        figure{
          width: 20%;
          text-align: right;
          @include media(sp) {
            text-align: center;
          }
          img{
            width: 30px;
          }
        }
      }
    }
  }
  .copy{
    font-weight: 200;
    font-size: 16px;
    padding-bottom: 32px;
    @include media(sp) {
      font-size: 10px;
      padding-bottom: 48px;
    }
  }
}
</style>