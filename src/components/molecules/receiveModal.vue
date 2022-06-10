<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Receive Token
      </h3>
    </div>
    <div class="body">
      <figure>
        <img :src="tokenIcon">
      </figure>
      <h4>
        {{ tokenName }}
      </h4>
      <p>
        <a :href="tokenMarketUrl" target="_blank" rel="noopener noreferrer">{{ tokenMarketUrl }}</a>
      </p>
      <button @click="confirm" class="btn __m">
        Submit
      </button>
      <span>
        Submited cannot be changed later.
      </span>
    </div>
    <button class="close" @click="hideModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
  </div>
</template>

<script>
import RequestUtility from '@/utils/request'

export default {
  name: 'receiveModal',
  data() {
    return {
      tokenNames: {
        USDT: 'Tether USD',
        USDC: 'USD Coin',
        DAI: 'Maker DAO',
        JPYC: 'JPY Coin'
      },
      tokenIcons: {
        USDT: require('@/assets/images/icon/usdt-l.svg'),
        USDC: require('@/assets/images/icon/usdc-l.svg'),
        DAI: require('@/assets/images/icon/dai-l.svg'),
        JPYC: require('@/assets/images/icon/jpyc-l.svg')
      },
      tokenMarketUrls: {
        USDT: 'https://coinmarketcap.com/currencies/tether/',
        USDC: 'https://coinmarketcap.com/currencies/usd-coin/',
        DAI: 'https://coinmarketcap.com/currencies/multi-collateral-dai/',
        JPYC: 'https://coinmarketcap.com/currencies/jpycoin/'
      }
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    classes() {
      return [ 'modal-box', `--${this.$store.state.modal.size}` ]
    },
    tokenIcon() {
      return this.tokenIcons[this.tokenSymbol]
    },
    tokenName() {
      return this.tokenNames[this.tokenSymbol]
    },
    tokenMarketUrl() {
      return this.tokenMarketUrls[this.tokenSymbol]
    },
    tokenSymbol() {
      return this.$store.state.modal.params.symbol
    }
  },
  methods: {
    apiSetMerchantReceiveSymbol(symbol) {
      const url = `${this.baseUrl}/api/v1/management/setting/token`
      const options = { headers: { Authorization: RequestUtility.getBearer() } }
      const data = { symbol: symbol }
      return this.axios.patch(url, data, options)
    },
    hideModal() {
      this.$store.dispatch('modal/hide')
    },
    confirm() {
      this.apiSetMerchantReceiveSymbol(this.tokenSymbol).then(() => {
        this.$store.dispatch('account/updateReceiveSymbol', this.tokenSymbol)
        this.hideModal()
      })
    },
    slectedToken(){
      this.$store.dispatch('account/selectReceiveToken')
      this.$store.dispatch('modal/hide')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .modal-box {
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:var(--color_bg);
    @include media(pc) {
      &.--small {
        width: 470px;
      }
      &.--medium {
        width: 760px;
      }
    }
    @include media(sp) {
      width: calc(100vw - 32px);
    }

  }
  .header {
    @include media(pc) {
      padding: 24px;
      &__title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      &__desc {
        font-size: 2rem;
      }
    }
    @include media(sp) {
      padding: 18px;
      &__title {
        font-size: 1.7rem;
      }
    }
    &__title {
      font-weight: 500;
      background: $gradation-light;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
    &__desc {
      font-weight: 100;
    }
  }
  .close {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 0;

    @include media(pc) {
      top: 30px;
      right: 24px;
    }
    @include media(sp) {
      top: 24px;
      right: 24px;
    }
  }
  .body {
    text-align: center;
    figure{
      width: 70px;
      height: 70px;
      margin: 0 auto 16px;
      display: inline-block;
    }
    h4{
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 32px;
    }
    p{
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 40px;
    }
    span{
      font-size: 13px;
      font-weight: 400;
    }
    @include media(pc) {
      padding: 24px 24px 40px;
    }
    @include media(sp) {
      padding: 16px 12px 48px;
    }
    .btn {
      width: 100%;
      text-align: center;
      font-size: 18px;
      margin-bottom: 24px;
      &.__m {
        background: $gradation-double;
      }
    }
  }
  .footer {
    text-align: center;

    @include media(pc) {
      padding: 0 40px 40px;
    }
    @include media(sp) {
      padding: 0 32px 32px;
    }
  }
</style>