<template>
  <div>
    <lp-index />
  </div>
</template>

<script>
// import LpIndex from "@/components/templates/LpIndex";
import LpIndex from '@/components/templates/LpIndexD'
export default {
  name: 'payment',
  components: {
    LpIndex
  },
  metaInfo() {
    const meta = [{ vmid: 'seo-robot-setting', name: 'robots', content: 'all' }]
    return { meta }
  },
  mounted() {
    console.log('aaaaa')
    document.body.classList.add('theme--' + this.$store.state.theme)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
body {
  position: relative;
  // padding-top: 2rem;
  .weglot-container.wg-default {
    position: fixed;
    z-index: 9000;
    bottom: auto;
    // width: 100%;
    top: 17px;
    right: calc(5vw + 126px + 2rem);
    // height: 1.6rem;
    font-size: 0;
    // padding: 0.5rem 0;
    @include media(tb) {
      right: calc(5vw + 18px);
      right: 0;
      padding: 0rem 0;
      width: 100%;
      top: 74px;
    }
    @include media(sp) {
      top: 54px;
    }
    .wg-drop.country-selector {
      width: 100%;
      position: relative;
      bottom: auto;
      right: auto;
      font-size: 0;
      opacity: 1;
      // background-color: var(--Base3);
      background: transparent;
      transition: background-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
        visibility 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      @include media(pc) {
        &:hover {
          background-color: var(--Base3);
        }
      }

      @include media(tb) {
        background-color: var(--Base3);
        // border: 1px solid var(--Border);
      }
      &.weg-openleft {
        background-color: var(--Base3);
      }

      a {
        // background-color: var(--Base3);
        background: transparent;
        padding: 0;
        height: auto;
        display: block;
        width: 5rem;
        font-size: rem(0.9);
        line-height: 3;
        letter-spacing: 0.02em;
        color: var(--Text);
        padding: 0 0.5rem;
        padding-right: 1.5rem;
        @include media(tb) {
          text-align: center;
          line-height: 26px;
          font-size: 0.9rem;
          width: 100%;
        }
      }
      .wgcurrent {
        border: none;
        position: relative;
        &::after {
          display: none;
        }
        &::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          border-bottom: 1px solid var(--Text);
          border-left: 1px solid var(--Text);
          position: absolute;
          top: 50%;
          right: 6px;
          transform-origin: center center;
          transform: translateY(-75%) rotate(-45deg) scale(1, 1);
          @include media(tb) {
            transform: translateY(-90%) rotate(-45deg) scale(1, 1);
          }
        }
        // a {
        //   line-height: 2rem;
        // }
      }

      ul {
        background: transparent;
        border: none;
        background-color: var(--Base3);
        li {
          border-top: 1px solid var(--Border);
        }
      }
      .wg-flags {
        a {
          @include media(tb) {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          img.wg-flag {
            display: none;
            @include media(tb) {
              display: block;
              gap: 1rem;
              width: 24px;
              height: 12px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
