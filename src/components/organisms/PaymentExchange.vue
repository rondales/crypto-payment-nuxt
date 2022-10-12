<template>
  <div class="exchange">
    <PaymentAmountBilled
      class="exchange__bill"
      :symbol="merchantReceiveTokenSymbol"
      :icon="merchantReceiveTokenIcon"
      :price="merchantReceiveAmount"
      size="big"
    />

    <PaymentTitle class="exchange__title" type="h3_g" html="Your Balance">
      <PaymentButton
        icon="reload"
        color="icon"
        size="icon"
        @click.native="updateTokenExchangeData(true)"
      />
    </PaymentTitle>

    <PaymentAmountBilled
      class="exchange__balance"
      :symbol="userSelectedTokenSymbol"
      :icon="userSelectedTokenIcon"
      icon-type="png"
      :table="balanceTable"
    />
    <PaymentAction
      class="exchange__update"
      v-if="
        isExpiredExchange &&
        isEnoughUserSelectedTokenBalance &&
        !isNeedApprove &&
        !isWalletConfirming
      "
      icon="attention"
      text="Price Updated"
    >
      <PaymentButton
        text="Update"
        size="s"
        @click.native="updateTokenExchangeData(false)"
      />
    </PaymentAction>
    <PaymentPrice
      :symbol="userSelectedTokenSymbol"
      :cap="userSelectedTokenPayAmountEquivalent"
      :cap2="equivalentSymbol + ' equivalent'"
      :price="userSelectedTokenPayAmount | formatPrice"
      class="exchange__price"
      :status="!isEnoughUserSelectedTokenBalance ? 'error' : 'success'"
    />
    <p class="exchange__cap">
      <span>* This amount is an estimate and is subject to change</span>
    </p>

    <div class="exchange__btnwrap" v-if="isSetRequreUserPayAmount">
      <div v-if="isEnoughUserSelectedTokenBalance">
        <PaymentButton
          v-if="isNeedApprove"
          :color="isWalletConfirming ? 'inactive' : 'primary'"
          size="m"
          :text="
            'Allow the Slash protocol to use your ' + userSelectedTokenSymbol
          "
          :loading="isWalletConfirming"
          @click.native="handleTokenApprove"
        />

        <PaymentButton
          v-if="isExchangeDataUpdating"
          color="inactive"
          size="l"
          text="Price Updating..."
          :loading="true"
        />
        <PaymentButton
          v-else
          :color="
            isNeedApprove || isExpiredExchange || isWalletConfirming
              ? 'inactive'
              : 'primary'
          "
          @click.native="handleGoPayment()"
          size="l"
          text="Go Payment"
          icon="logo-icon"
        />
      </div>
      <div v-else>
        <p class="blancewarning">
          <span>Balance is insufficient<br />for this transaction.</span>
        </p>
      </div>
    </div>
    <div v-else>
      <div v-if="isNotEnoughLiquidity">
        <p class="blancewarning">
          <span>Liquidity is not enough<br />for this transaction.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue'
import PaymentAmountBilled from '@/components/organisms/Payment/AmountBilled'
import PaymentTitle from '@/components/organisms/Payment/Title'
import PaymentAction from '@/components/organisms/Payment/Action'
import PaymentPrice from '@/components/organisms/Payment/Price'
import PaymentButton from '@/components/organisms/Payment/Button'
import { Decimal } from 'decimal.js'
import { METAMASK, WALLET_CONNECT, NETWORKS } from '@/constants'
import {
  EthereumTokens as EthereumDefaultTokens,
  BscTokens as BscDefaultTokens,
  MaticTokens as MaticDefaultTokens,
  AvalancheTokens as AvalancheDefaultTokens
} from '@/contracts/tokens'
import {
  EthereumTokens as EthereumStableTokens,
  BscTokens as BscStableTokens,
  MaticTokens as MaticStableTokens,
  AvalancheTokens as AvalancheStableTokens
} from '@/contracts/stable_tokens'
import {
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalacheReceiveTokens
} from '@/contracts/receive_tokens'

export default {
  name: 'PaymentExchange',
  data() {
    return {
      expired: false,
      reloading: false,
      updating: false,
      exchangeDataExpireTimer: null,
      userSelectedTokenAllowance: null,
      requireAmount: null,
      balanceEquivalentAmount: 0,
      exchangeRate: 0,
      contract: {
        address: null,
        abi: null
      },
      balanceTable: [],
      isNotEnoughLiquidity: false
    }
  },
  components: {
    PaymentAmountBilled,
    PaymentTitle,
    PaymentAction,
    PaymentPrice,
    PaymentButton
  },
  filters: {
    formatPrice(price) {
      return Decimal(price).toString()
    }
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    GAS_FEE_RATE() {
      return process.env.VUE_APP_PAYMENT_GAS_FEE_RATE
    },
    PAYMENT_FEE_RATE() {
      if (this.isSelectedStableToken) {
        return process.env.VUE_APP_PAYMENT_STABLE_TOKEN_FEE_RATE
      } else {
        return process.env.VUE_APP_PAYMENT_NON_STABLE_TOKEN_FEE_RATE
      }
    },
    EXCHANGE_RATE_EXPIRE_TIME() {
      return 30000
    },
    paymentToken() {
      return this.$route.params.token
    },
    web3Instance() {
      return this.$store.state.web3.instance
    },
    chainId() {
      return this.$store.state.web3.chainId
    },
    providerType() {
      return this.$store.state.web3.provider
    },
    userAccountAddress() {
      return this.$store.state.account.address
    },
    equivalentSymbol() {
      return this.merchantReceiveTokenSymbol
    },
    merchantReceiveTokens() {
      if (this.isCurrentNetworkEthereum) {
        return EthereumReceiveTokens
      } else if (this.isCurrentNetworkBinance) {
        return BscReceiveTokens
      } else if (this.isCurrentNetworkMatic) {
        return MaticReceiveTokens
      } else if (this.isCurrentNetworkAvalanche) {
        return AvalacheReceiveTokens
      } else {
        return {}
      }
    },
    defaultPaymentTokens() {
      if (this.isCurrentNetworkEthereum) {
        return EthereumDefaultTokens
      } else if (this.isCurrentNetworkBinance) {
        return BscDefaultTokens
      } else if (this.isCurrentNetworkMatic) {
        return MaticDefaultTokens
      } else if (this.isCurrentNetworkAvalanche) {
        return AvalancheDefaultTokens
      } else {
        return {}
      }
    },
    stableTokens() {
      if (this.isCurrentNetworkEthereum) {
        return EthereumStableTokens
      } else if (this.isCurrentNetworkBinance) {
        return BscStableTokens
      } else if (this.isCurrentNetworkMatic) {
        return MaticStableTokens
      } else if (this.isCurrentNetworkAvalanche) {
        return AvalancheStableTokens
      } else {
        return {}
      }
    },
    merchantReceiveAmount() {
      return this.$store.state.payment.amount
    },
    merchantReceiveTokenSymbol() {
      return this.$store.state.payment.symbol
    },
    merchantReceiveTokenIcon() {
      const tokens = this.merchantReceiveTokens
      return this.merchantReceiveTokenSymbol in tokens
        ? tokens[this.merchantReceiveTokenSymbol].iconPath
        : 'crypto_currency/unknown'
    },
    userSelectedToken() {
      return this.$store.state.payment.token
    },
    userSelectedTokenDecimal() {
      return this.userSelectedToken.decimal
    },
    userSelectedTokenBalance() {
      return this.userSelectedToken.balance
    },
    userSelectedTokenPayAmount() {
      if (this.requireAmount === null) {
        return 0
      } else if (this.isEnoughUserSelectedTokenBalance) {
        return this.requireAmount
      } else {
        return this.userSelectedTokenBalance
      }
    },
    userSelectedTokenPayAmountEquivalent() {
      return this.isEnoughUserSelectedTokenBalance
        ? this.merchantReceiveAmount
        : this.balanceEquivalentAmount
    },
    userSelectedTokenSymbol() {
      return this.userSelectedToken.symbol
    },
    userSelectedTokenIcon() {
      const tokens = this.defaultPaymentTokens
      return this.userSelectedTokenSymbol in tokens
        ? tokens[this.userSelectedTokenSymbol].iconPath
        : 'crypto_currency/unknown'
    },
    isEmptyWeb3Instance() {
      return this.web3Instance === null
    },
    isUseMetaMaskProvider() {
      return this.providerType === METAMASK
    },
    isUseWalletConnectProvider() {
      return this.providerType === WALLET_CONNECT
    },
    isNeedRestoreWeb3Connection() {
      return (
        this.isEmptyWeb3Instance &&
        (this.isUseMetaMaskProvider || this.isUseWalletConnectProvider)
      )
    },
    isCurrentNetworkEthereum() {
      return (
        this.chainId === NETWORKS[1].chainId ||
        this.chainId === NETWORKS[5].chainId
      )
    },
    isCurrentNetworkBinance() {
      return (
        this.chainId === NETWORKS[56].chainId ||
        this.chainId === NETWORKS[97].chainId
      )
    },
    isCurrentNetworkMatic() {
      return (
        this.chainId === NETWORKS[137].chainId ||
        this.chainId === NETWORKS[80001].chainId
      )
    },
    isCurrentNetworkAvalanche() {
      return (
        this.chainId === NETWORKS[43114].chainId ||
        this.chainId === NETWORKS[43113].chainId
      )
    },
    isUserSelectedNativeToken() {
      return this.userSelectedToken.address === null
    },
    isSetRequreUserPayAmount() {
      return this.requireAmount !== null
    },
    isNeedApprove() {
      return (
        !this.isUserSelectedNativeToken &&
        !this.isEnoughUserSelectedTokenAllowance
      )
    },
    isEnoughUserSelectedTokenAllowance() {
      if (
        this.userSelectedTokenAllowance === null ||
        this.requireAmount === null
      ) {
        return false
      }
      return Decimal(this.userSelectedTokenAllowance).greaterThanOrEqualTo(
        this.requireAmount
      )
    },
    isEnoughUserSelectedTokenBalance() {
      if (
        this.userSelectedTokenBalance === null ||
        this.requireAmount === null
      ) {
        return false
      }
      return Decimal(this.userSelectedTokenBalance).greaterThanOrEqualTo(
        this.requireAmount
      )
    },
    isExpiredExchange() {
      return this.expired
    },
    isReloading() {
      return this.reloading
    },
    isExchangeDataUpdating() {
      return this.updating
    },
    isWalletConfirming() {
      return this.$store.state.wallet.pending
    },
    isDarkTheme() {
      return this.$store.state.theme === 'dark'
    },
    isSelectedStableToken() {
      if (!this.userSelectedToken.address) {
        // for native token
        return false
      }
      return Object.values(this.stableTokens)
        .map((token) =>
          token.address ? token.address.toLowerCase() : token.address
        )
        .filter((address) => address)
        .includes(this.userSelectedToken.address.toLowerCase())
    }
  },
  methods: {
    apiGetContract() {
      const url = `${this.API_BASE_URL}/api/v1/payment/contract`
      const request = {
        params: new URLSearchParams([
          ['payment_token', this.paymentToken],
          ['network_type', this.chainId]
        ])
      }
      return this.axios.get(url, request)
    },
    getTokenExchangeDataFromContract() {
      return this.$web3
        .getTokenExchangeData(
          this.web3Instance,
          this.chainId,
          this.userAccountAddress,
          this.contract,
          this.userSelectedToken,
          this.merchantReceiveTokenSymbol,
          this.merchantReceiveAmount,
          this.GAS_FEE_RATE,
          this.PAYMENT_FEE_RATE
        )
        .catch((err) => {
          if (err.message.includes('execution reverted: No valid exchange')) {
            this.isNotEnoughLiquidity = true
            this.$parent.loading = false
            this.$store.dispatch('modal/show', {
              target: 'error-modal',
              size: 'small',
              params: {
                message:
                  'There appears to be no liquidity between \
                  the token you selected and the \
                  merchant receive token on this network. \
                  <br> \
                  <br> \
                  Please return to the token selection screen \
                  and select another token or try paying \
                  with another network.'
              }
            })
          }
        })
    },
    getTokenApprovedAmountFromContract() {
      return this.$web3.getTokenApprovedAmount(
        this.web3Instance,
        this.chainId,
        this.userAccountAddress,
        this.contract,
        this.userSelectedToken
      )
    },
    sendTokenApproveTransactoinToBlockChain() {
      return this.$web3.tokenApprove(
        this.web3Instance,
        this.chainId,
        this.userAccountAddress,
        this.contract,
        this.userSelectedToken
      )
    },
    setExchangeDataExpireTimer() {
      return setTimeout(() => {
        this.expired = true
      }, this.EXCHANGE_RATE_EXPIRE_TIME)
    },
    updateTokenExchangeData(reload) {
      clearTimeout(this.exchangeDataExpireTimer)
      this.expired = false
      this.reloading = reload
      this.updating = true
      this.getTokenExchangeDataFromContract()
        .then((exchangeData) => {
          this.$store.dispatch('payment/updateFee', exchangeData.fee)
          this.$store.dispatch(
            'payment/updateAmountWei',
            exchangeData.requestAmountWei
          )
          this.$store.dispatch('payment/updateToken', {
            amount: exchangeData.requireAmount,
            rate: exchangeData.rate
          })
          this.balanceEquivalentAmount = exchangeData.equivalentAmount
          this.requireAmount = exchangeData.requireAmount
          this.exchangeRate = exchangeData.rate
        })
        .finally(() => {
          this.exchangeDataExpireTimer = this.setExchangeDataExpireTimer()
          this.reloading = false
          this.updating = false
        })
    },
    handleTokenApprove() {
      this.$store.dispatch('wallet/updatePendingStatus', true)
      this.sendTokenApproveTransactoinToBlockChain()
        .then((receipt) => {
          if (!receipt.status) {
            Promise.reject()
          }
          const approvedAmountInWei =
            receipt.events['Approval'].returnValues.value
          this.userSelectedTokenAllowance = this.$web3.convertFromWei(
            this.web3Instance,
            approvedAmountInWei,
            this.userSelectedTokenDecimal
          )
          this.$store.dispatch('wallet/updatePendingStatus', false)
        })
        .catch((error) => {
          Sentry.captureException(error)
          this.$store.dispatch('wallet/updatePendingStatus', false)
          if ('code' in error && error.code === 4001) {
            return
          }
          this.$store.dispatch('modal/show', {
            target: 'error-modal',
            size: 'small',
            params: {
              message:
                'The Slash protocol allow failed with your token, please allow it again.'
            }
          })
        })
    },
    handleGoPayment() {
      if (this.expired) return
      this.$store.dispatch("payment/updateToken", {
        amount: this.requireAmount,
        rate: this.exchangeRate
      })
      this.$router.push({
        name: 'detail',
        params: { token: this.paymentToken }
      })
    },
    handleChainChangedEvent(chainId) {
      chainId = this.web3Instance.utils.isHex(chainId)
        ? this.web3Instance.utils.hexToNumber(chainId)
        : chainId
      this.$store.dispatch('web3/updateChainId', chainId)
      this.$router.push({ path: `/payment/token/${this.paymentToken}` })
    },
    handleAccountChangedEvent(address) {
      this.$store.dispatch('account/updateAddress', address[0])
      this.$router.push({ path: `/payment/token/${this.paymentToken}` })
    }
  },
  created() {
    Decimal.set({ toExpNeg: -20 })
    if (this.isNeedRestoreWeb3Connection) {
      this.$router.push({
        name: 'wallets',
        params: { token: this.paymentToken }
      })
    }
  },
  mounted() {
    this.$parent.loading = true

    if (this.isNeedRestoreWeb3Connection) {
      return
    }

    this.web3Instance.currentProvider.on(
      'chainChanged',
      this.handleChainChangedEvent
    )
    this.web3Instance.currentProvider.on(
      'accountsChanged',
      this.handleAccountChangedEvent
    )

    this.apiGetContract()
      .then((response) => {
        this.contract.address = response.data.address
        this.contract.abi = JSON.parse(response.data.args)
        const funcList = [this.getTokenExchangeDataFromContract()]
        if (!this.isUserSelectedNativeToken) {
          funcList.push(this.getTokenApprovedAmountFromContract())
        }
        Promise.all(funcList)
          .then((results) => {
            if (!this.isUserSelectedNativeToken) {
              this.userSelectedTokenAllowance = results[1]
            }
            this.$store.dispatch('payment/updateFee', results[0].fee)
            this.$store.dispatch(
              'payment/updateAmountWei',
              results[0].requestAmountWei
            )
            this.$store.dispatch('payment/updateToken', {
              amount: results[0].requireAmount,
              rate: results[0].rate
            })
            this.balanceEquivalentAmount = results[0].equivalentAmount
            this.requireAmount = results[0].requireAmount
            this.exchangeRate = results[0].rate
            this.$parent.loading = false
            this.exchangeDataExpireTimer = this.setExchangeDataExpireTimer()

            this.balanceTable.push({
              title: 'Balance',
              price: Decimal(this.userSelectedTokenBalance).toFixed(
                4,
                Decimal.ROUND_FLOOR
              ),
              symbol: this.userSelectedTokenSymbol
            })
            this.balanceTable.push({
              title: 'Equivalent',
              price: Decimal(this.balanceEquivalentAmount).toFixed(
                4,
                Decimal.ROUND_FLOOR
              ),
              symbol: this.equivalentSymbol
            })
          })
          .catch((err) => {
            Sentry.captureException(err)
          })
      })
      .catch((err) => {
        Sentry.captureException(err)
      })
  },
  beforeDestroy() {
    this.$parent.loading = false
    clearTimeout(this.exchangeDataExpireTimer)
    if (!this.isEmptyWeb3Instance) {
      this.web3Instance.currentProvider.removeListener(
        'chainChanged',
        this.handleChainChangedEvent
      )
      this.web3Instance.currentProvider.removeListener(
        'accountsChanged',
        this.handleAccountChangedEvent
      )
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$parent.loading = false
    clearTimeout(this.exchangeDataExpireTimer)
    if (!this.isEmptyWeb3Instance) {
      this.web3Instance.currentProvider.removeListener(
        'chainChanged',
        this.handleChainChangedEvent
      )
      this.web3Instance.currentProvider.removeListener(
        'accountsChanged',
        this.handleAccountChangedEvent
      )
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.exchange {
  &__bill {
    margin-bottom: 2rem;
  }
  &__title {
    margin-bottom: 1.5rem;
  }
  &__balance {
    margin-bottom: 1rem;
  }
  &__update {
    margin-bottom: 1rem;
  }
  &__price {
    margin-bottom: 0.5rem;
  }
  &__cap {
    @include font(10px, 400, 0.04em, 1.8, $en_go);
    margin-bottom: 1rem;
  }
  &__btnwrap {
    .via {
      margin-top: 0.5rem;
    }
    div + div {
      margin-top: 0.5rem;
    }
  }
}
.blancewarning {
  text-align: center;
  @include font(0.8rem, 400, 0.04em, 1.8, $en_go);
  color: var(--Alert);
}
</style>
