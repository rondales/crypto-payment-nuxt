<template>
  <a href="#donation" class="donation">
    <div class="donation__wrap">
      <div class="donation__head">
        <div class="donation__title non-translate"><span>Try Slash Payments</span></div>
        <ul class="donation__logo">
          <li v-for="list in donations" :key="list.logo">
            <div class="donation__logo__list">
              <div class="donation__logo__textwrap">
                <LpIcon class="donation__logo__logo" :path="list.logo" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </a>
</template>
<script>
import LpIcon from '@/components/organisms/lp/parts/Icon'
export default {
  data() {
    return {
      donations: [
        {
          title: 'Experience it first hand.',
          image: {
            src: 'lp/donate-image01.jpg',
            alt: 'Experience it first hand.',
            lightSrc: ''
          },
          logo: 'icon/savethechildren',
          text: 'https://donate.savethechildren.org',
          link: {
            title: 'Donate Now',
            func: 'paymentForDonate_SAFE_THE_CHILDREN',
            icon: 'connect',
            status: true
          }
        },
        // @INFO https://github.com/slash-fi/web3payment-front/issues/873
        // {
        //   title: 'Experience it first hand.',
        //   image: {
        //     src: 'lp/donate-image02.jpg',
        //     alt: 'Experience it first hand.',
        //     lightSrc: ''
        //   },
        //   logo: 'icon/unicef',
        //   text: 'https://www.unicef.org/',
        //   link: {
        //     title: 'Donate Now',
        //     func: 'paymentForDonate_UNICEF',
        //     icon: 'connect',
        //     status: true
        //   }
        // }
      ]
    }
  },
  components: {
    LpIcon
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.donation {
  position: fixed;
  cursor: pointer;
  // left: 50%;
  left: rem(2);
  bottom: rem(1);
  max-width: rem(20);
  background: $gradation-light;
  transform-origin: center center;
  // transform: translateX(-50%);
  z-index: 100;
  padding: rem(1) rem(2) rem(0.8);
  border-radius: rem(0.5);

  border-top: 1px solid rgba(#fff, 0.6);
  border-left: 1px solid rgba(#fff, 0.6);
  border-bottom: 1px solid rgba(#000, 0.1);
  border-right: 1px solid rgba(#000, 0.1);
  background: url('/assets/images/lp/donated.jpg') no-repeat center center;
  background-size: cover;
  // box-shadow: -rem(0.5) rem(0.5) rem(1) rgba(139, 42, 225, 0.7),
  //   rem(0.5) -rem(0.5) rem(1) rgba(62, 185, 252, 0.7);
  box-shadow: 10px 10px 20px rgba(#000, 0.1);
  @include media(tb) {
    left: rem_tb(2);
    transform: translateX(0%);
  }
  @include media(sp) {
    padding: rem_sp(0.8) rem_sp(1.5);
    border-radius: 0 rem_sp(1) 0 0;
    left: 0;
    bottom: 0;
    transform: translate3d(0%, 0%, 0) rotate(0deg) scale(1, 1);
    width: 240px;
  }
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(#000, 0.4);
    border-radius: 0 rem(1) 0 0;
    border-radius: rem(0.5);
    @include media(sp) {
      border-radius: 0 rem_sp(1) 0 0;
    }
  }
  &__wrap {
    position: relative;
    z-index: 10;
  }
  &__head {
    // @include flex(space-between, center);
    // flex-wrap: nowrap;
    // gap: rem(2);
    // @include media(sp) {
    //   display: block;
    // }
  }
  &__title {
    @include font(rem(1.4), 700, 0em, 1.2, $ff);
    color: #fff;
    margin-bottom: rem(0.5);
    text-align: center;
    white-space: nowrap;
    @include media(sp) {
      text-align: center;
      @include font(rem(1.1), 700, 0em, 1.2, $ff);
      margin-bottom: rem(0.2);
    }
  }
  &__logo {
    // @INFO https://github.com/slash-fi/web3payment-front/issues/873
    // @include flex(flex-start, stretch);
    @include flex(center, stretch);
    flex-wrap: nowrap;
    gap: rem(1);
    width: auto;
    @include media(sp) {
      // margin-top: rem_sp(0.3);
      gap: rem_sp(1);
      //   display: none;
    }
    li {
      // flex: 1;
      // border: 1px solid #fff;
      // padding: rem(0.5) rem(1);
      // border-radius: 4px;
      font-size: 0;
      line-height: 1;
      * {
        font-size: 0;
        line-height: 1;
      }
    }
    &::v-deep {
      svg {
        fill: #fff;
        height: rem(1.8);
        @include media(sp) {
          height: rem_sp(1.5);
        }
      }
    }
  }
}
</style>