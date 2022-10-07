<template>
  <div>
    <PaymentAmountBilled
      :symbol="receiveTokenSymbol"
      :icon="setIconPath"
      :price="amount"
      size="big"
    />
    <div class="connectwallet">
      <p class="title">
        Connect Web3 wallet<br />
        to make a payment
      </p>
      <div class="button">
        <PaymentButton
          @click.native="handleConnect(METAMASK, false)"
          size="l"
          text="MetaMask"
          icon="wallet-metamask"
          :loading="loadingMeta"
        />
        <PaymentButton
          @click.native="showWalletConnectCautionModal()"
          size="l"
          text="WalletConnect"
          icon="wallet-walletconnect"
          :loading="loadingWallet"
        />
      </div>
      <PaymentButton
        class="regenerate"
        @click.native="showRegeneratePaymentUrlModal()"
        size="s"
        color="cancel"
        text="Regenerate URL"
        icon="reload"
      />
    </div>
  </div>
</template>

<script>
import { METAMASK } from '@/constants'
import PaymentAmountBilled from '@/components/organisms/Payment/AmountBilled'
import PaymentButton from '@/components/organisms/Payment/Button'
import ConnectWalletMixin from '@/components/mixins/ConnectWallet'
import PaymentWalletConnectorMixin from '@/components/mixins/PaymentWalletConnector'
import isMobile from 'ismobilejs'

export default {
  name: 'PaymentSelectWallets',
  mixins: [ConnectWalletMixin, PaymentWalletConnectorMixin],
  components: {
    PaymentAmountBilled,
    PaymentButton
  },
  props: {
    progressTotalSteps: Number,
    progressCompletedSteps: Number
  },
  data() {
    return {
      loadingMeta: false,
      loadingWallet: false
    }
  },
  computed: {
    METAMASK() {
      return METAMASK
    },
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    RECEIVED_TOKEN_ICON_PATH() {
      return {
        USDT: 'crypto_currency/received_token/usdt',
        USDC: 'crypto_currency/received_token/usdc',
        DAI: 'crypto_currency/received_token/dai',
        JPYC: 'crypto_currency/received_token/jpyc',
        WETH: 'crypto_currency/received_token/weth'
      }
    },
    currentDomain() {
      return window.location.host
    },
    receiveTokenSymbol() {
      return this.$store.state.payment.symbol
    },
    setIconPath() {
      return this.RECEIVED_TOKEN_ICON_PATH[this.$store.state.payment.symbol]
    },
    amount() {
      return this.$store.state.payment.amount
    },
    status() {
      return this.$store.state.payment.status
    },
    paymentToken() {
      return this.$route.params.token
    },
    isInitialized() {
      return !this.$parent.initializing
    },
    isAgreeRisk() {
      return this.$store.state.payment.isAgreeRisk
    },
    isMobileAndMetamaskNotInstalled() {
      return isMobile(window.navigator).any && !window.ethereum
    },
    metamaskDeepLink() {
      return (
        'https://metamask.app.link/dapp/' +
        this.currentDomain +
        `/payment/wallets/${this.paymentToken}?dpl=1`
      )
    }
  },
  methods: {
    apiGetAvailableNetworks() {
      const url = `${this.API_BASE_URL}/api/v1/payment/contract/network`
      const request = {
        params: new URLSearchParams([
          ['payment_token', this.$route.params.token]
        ])
      }
      return this.axios.get(url, request)
    },
    showRiskDisclaimerModal() {
      this.$store.dispatch('modal/show', {
        target: 'caution-payment-risk-disclaimer-modal',
        size: 'small',
        params: {
          isVerifiedDomain: this.$store.state.payment.isVerifiedDomain
        }
      })
    },
    showWalletConnectCautionModal() {
      this.$store.dispatch('modal/show', {
        target: 'caution-wallet-connect-modal',
        size: 'small'
      })
    },
    showRegeneratePaymentUrlModal() {
      this.$store.dispatch('modal/show', {
        target: 'regenerate-payment-url-modal',
        size: 'small'
      })
    },
    handleConnect(provider, mode) {
      if (this.isMobileAndMetamaskNotInstalled) {
        window.location.href = this.metamaskDeepLink
      } else {
        this.connect(provider, mode)
      }
    }
  },
  created() {
    this.$store.dispatch('web3/initialize')
    this.$store.dispatch('payment/initializeForBeforeConnectWallet')
    // NOTE Temporarily commented out by issue #622
    // if (!this.isAgreeRisk && this.isInitialized) {
    //   this.showRiskDisclaimerModal();
    // }
  },
  mounted() {
    setTimeout(() => {
      this.$emit('updateInitializingStatus', false)
      // NOTE Temporarily commented out by issue #622
      // if (!this.isAgreeRisk) {
      //   this.showRiskDisclaimerModal();
      // }
    }, 1500)
  },
  beforeRouteLeave(to, from, next) {
    const connectedWalletPages = ['tokens', 'exchange', 'detail']
    if (connectedWalletPages.includes(to.name)) {
      next(false)
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.connectwallet {
  margin-top: 2.5rem;
  .title {
    margin-bottom: 1.5rem;
    @include font(1rem, 400, $ls, $lh, $en_go);
    text-align: center;
    color: var(--Text);
    br {
      display: none;
      @include media(sp) {
        display: block;
      }
    }
  }
  .button {
    @include flex(center, flex-start);
    gap: 0.8rem;
    flex-wrap: nowrap;
    flex-direction: column;
    @include media(sp) {
      // display: block;
    }
    * {
      // flex: 1;
      width: 100%;
      @include media(sp) {
        flex: auto;
      }
      //   margin-top: 1rem;
      //   &::v-deep {
      //     button {
      //       margin-left: auto;
      //       margin-right: auto;
      //     }
      //   }
    }
  }
  .regenerate {
    width: 100%;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    ::v-deep {
      .button.color_cancel {
        margin: 0 auto;
      }
    }
  }
}
</style>
