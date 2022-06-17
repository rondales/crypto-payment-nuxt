<template>
  <div class="payment_handleprice">
    <div class="payment_handleprice-pricewrap">
      <div class="add-flex j-between billed a-center">
        <div class="add-flex j-between a-center">
          <figure>
            <img :src="receiveTokenIcon" alt="">
          </figure>
          <dl>
            <dt>
              Amount billed
            </dt>
            <dd>
              {{ receiveTokenSymbol }}
            </dd>
          </dl>
        </div>
        <div class="usdt-price">
          <p>
            {{ amount }}
          </p>
        </div>
      </div>
      <div class="payment-with">
        Connect Web3 wallet to make a payment
      </div>
      <button class="btn __m __pg icon-right full" @click="connect(METAMASK, false)">
        <div class="loading-wrap" :class="{'active': loadingMeta}">
          <img class="spin mt" src="@/assets/images/loading.svg">
        </div>
        <span class="btn-icon">
          <img src="@/assets/images/metamask-fox.svg">
        </span>
          MetaMask
      </button>
      <button class="btn __m __pg icon-right full" @click="showWalletConnectCautionModal()">
        <div class="loading-wrap" :class="{'active': loadingWallet}">
          <img class="spin mt" src="@/assets/images/loading.svg">
        </div>
        <span class="btn-icon">
          <img src="@/assets/images/wallet-connect_w.svg">
        </span>
          WalletConnect
      </button>
    </div>
  </div>
</template>

<script>
import {
  METAMASK,
  STATUS_PROCESSING,
  STATUS_RESULT_FAILURE,
  STATUS_RESULT_SUCCESS
} from '@/constants'
import ConnectWalletMixin from '@/components/mixins/ConnectWallet'
import PaymentWalletConnectorMixin from '@/components/mixins/PaymentWalletConnector'

export default {
  name: 'PaymentSelectWallets',
  mixins: [
    ConnectWalletMixin,
    PaymentWalletConnectorMixin
  ],
  data() {
    return{
      loadingMeta: false,
      loadingWallet: false,
      receiveTokenIcons: {
        USDT: require('@/assets/images/symbol/usdt.svg'),
        USDC: require('@/assets/images/symbol/usdc.svg'),
        DAI: require('@/assets/images/symbol/dai.svg'),
        JPYC: require('@/assets/images/symbol/jpyc.svg')
      }
    }
  },
  computed: {
    METAMASK() {
      return METAMASK
    },
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    receiveTokenSymbol() {
      return this.$store.state.payment.symbol
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[
        this.$store.state.payment.symbol
      ]
    },
    amount() {
      return this.$store.state.payment.amount
    },
    status() {
      return this.$store.state.payment.status
    },
    paymentToken() {
      return this.$route.params.token
    }
  },
  methods: {
    apiGetAvailableNetworks() {
      const url = `${this.baseUrl}/api/v1/payment/contract/network`
      const request = { params: new URLSearchParams([['payment_token', this.$route.params.token]])}
      return this.axios.get(url, request)
    },
    showWalletConnectCautionModal() {
      this.$store.dispatch('modal/show', {
        target: 'caution-wallet-connect-modal',
        size: 'small'
      })
    },
    pageTransition() {
      let nextPath
      switch(this.status) {
        case STATUS_PROCESSING:
        case STATUS_RESULT_FAILURE:
        case STATUS_RESULT_SUCCESS:
          nextPath = `/payment/detail/${this.paymentToken}`
          break
        default:
          nextPath = `/payment/token/${this.paymentToken}`
      }
      this.$router.push({ path: nextPath })
    }
  },
  created() {
    this.$store.dispatch('payment/updateHeaderInvoice', true)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.payment_handleprice{
  width: 100%;
  dl{
    dt{
      font-weight: 400;
      font-size: 15px;
    }
  }

  .payment_desc{
    p{
      background: $gradation-pale;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
  }
  .payment_handleprice-pricewrap{
    width: 100%;
  }
  .payment_handleprice-price{
    padding: 0;
    width: 100%;
    min-width: auto;
    input{
      line-height: 53px;
      height: 53px;
      font-weight: 500;
      font-size: 18px;
      width: 65%;
      padding-left: 16px;
      @include media(sp) {
        width: 55%;
      }
    }
    .currency{
      width: 35%;
      line-height: 53px;
      position: relative;
      &::before{
        position: absolute;
        content: "";
        width: 1px;
        height: 33px;
        background: #6B6B6C;
        left: -12px;
      }
      &::after{
        content: "▲";
        position: absolute;
        right: 12px;
        color: #6B6B6C;
        font-size: 14px;
        transform: rotate(-180deg);
      }
      figure{
        line-height: 53px;
        position: absolute;
        img{
          padding-top: 14px;
        }
      }
      select{
        padding-left: 36px;
        font-weight: 400;
        width: 100%;
        border: none;
        outline: none;
      }
    }
    span{
      vertical-align: middle;
      font-size: 11px;
    }
  }
  .billed{
    padding-bottom: 16px;
    margin:24px 0 16px;
    border-bottom: 1px solid #78668D;
    figure{
      img{
        height: 46px;
        width: 46px;
        border-radius: 50%;
      }
    }
    dl{
      margin-left: 16px;
      dt{
        font-size: 10px;
        font-weight: 100;
      }
      dd{
        font-size: 18px;
        font-weight: 300;
      }
    }
  }
  .payment-with{
    text-align: center;
    font-size: 15px;
    font-weight: 100;
    padding-top: 8px;
    padding-bottom: 24px;
  }
  .payment_receiptwrap{
    width: 100%;
  }
  .payment_receipt{
    p{
      font-size: 15px;
    }
    &_form{
      height: 56px;
      .mail{
        height: 51px;
        padding: 0 16px;
        font-size: 15px;
        width: 100%;
      }
    }
  }
}
</style>