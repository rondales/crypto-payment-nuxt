<template>
  <div :class="classes">
    <PaymentAmountBilled
      :symbol="merchantReceiveTokenSymbol"
      :icon="merchantReceiveTokenIcon"
      :price="merchantReceiveAmount"
      class="token__bill"
      size="big"
    />
    <!-- <p class="token__text">
      <span
        >Select the network and currency you wish to pay for. If the currency
        you want is not on the list, you can import it by contract address
        &#x1f44d;</span
      >
    </p> -->
    <PaymentAction
      class="token__network"
      :text="currentNetworkName"
      :icon="currentNetworkIcon"
      type="network"
    >
      <PaymentButton size="s" text="Change" @click.native="switchNetwork()" />
    </PaymentAction>
    <PaymentTab
      :status="isCurrentTokenImportTab"
      @changeToList="switchTab(LIST_TAB)"
      @changeToToken="switchTab(TOKEN_IMPORT_TAB)"
      :style="tabBodyStyle"
    >
      <div v-if="isCurrentListTab" class="tab__wrap">
        <!-- <p class="tokentab__title"><span>Select token</span></p> -->
        <div v-if="tokenList.length == 0" class="nowloading">
          <PaymentIcon path="logo-icon-mono" />
          <p><span>Now Loading...</span></p>
        </div>
        <div
          class="tokentab__items"
          v-for="(token, key) in tokenList"
          :key="key"
          @click="handleSelectToken(token)"
        >
          <PaymentAmountBilled
            :icon="token.path"
            :icon-type="token.type"
            :symbol="token.symbol"
            :symboltext="token.name"
            :price="token.balance | balanceFormat"
            size="bg"
          />
        </div>
      </div>
      <div v-else-if="isCurrentTokenImportTab" class="tab__wrap">
        <div class="tokentab">
          <p class="tokentab__title">
            <span>Enter token contract address</span>
          </p>
          <p class="tokentab__text">
            <span>
              If you want to pay with a Token that is not listed, you can import
              it by entering the contract address. Tokenomics tokens with
              characteristics that make the transaction subject to TAX are not
              supported. &#x1f44d;</span
            >
          </p>
          <!-- <p class="tokentab__cap">
            <span
              >*Does not support tokenomics tokens, which have the property that
              transactions are subject to TAX 🙅‍♂️</span
            >
          </p> -->

          <PaymentForm
            class="tokentab__form"
            :error="
              isInvalidSearchTokenAddress ? 'Enter valid token address' : ''
            "
          >
            <input
              type="text"
              placeholder="0x0000"
              v-model="searchTokenAddress"
              @keyup.enter="searchToken()"
            />
          </PaymentForm>
          <div
            class="tokentab__tokenlist"
            v-for="(token, key) in searchedTokenList"
            :key="key"
          >
            <PaymentAction
              class="tokentab__tokenlist__items non-translate"
              :icon="token.path"
              :icon-type="token.type"
              :text="token.symbol"
              :link="token.url"
            >
              <PaymentButton
                size="s"
                text="Import"
                @click.native="importSearchedToken(key)"
              />
            </PaymentAction>
          </div>
          <div class="foot">
            <p>
              <span
                class="non-translate"
                v-html="searchedTokenCount + ' Custom Token'"
              ></span>
            </p>
            <PaymentButton
              @click.native="clearSearchedTokens()"
              size="s"
              v-if="isExistSearchedTokens"
              color="cancel"
              text="Crear All"
            />
          </div>
        </div>
      </div>
    </PaymentTab>
  </div>
</template>

<script>
import PaymentAmountBilled from '@/components/organisms/Payment/AmountBilled'
import PaymentAction from '@/components/organisms/Payment/Action'
import PaymentTab from '@/components/organisms/Payment/Tab'
import PaymentForm from '@/components/organisms/Payment/Form'
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentIcon from '@/components/organisms/Payment/Icon'

import { Decimal } from 'decimal.js'
import { METAMASK, WALLET_CONNECT, NETWORKS } from '@/constants'
import {
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalacheReceiveTokens
} from '@/contracts/receive_tokens'

export default {
  name: 'PaymentToken',
  data() {
    return {
      tab: 1,
      tokenList: [],
      searchTokenAddress: null,
      searchTokenAddressInvalid: false,
      searchedTokenList: [],
      searchedTokenCount: 0,
      contract: {
        address: null,
        abi: null
      },
      tabBodyStyle: {
        '--wh': '100vh'
      }
    }
  },
  components: {
    PaymentAmountBilled,
    PaymentAction,
    PaymentTab,
    PaymentForm,
    PaymentButton,
    PaymentIcon
  },
  filters: {
    balanceFormat(balance) {
      return Decimal(balance).toFixed(4, Decimal.ROUND_FLOOR)
    }
  },
  computed: {
    classes() {
      let array = { token: true }
      // array[this.size] = true;
      return array
    },
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    LIST_TAB() {
      return 1
    },
    TOKEN_IMPORT_TAB() {
      return 2
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
    explorerSiteTokenUrl() {
      return `${NETWORKS[this.chainId].scanUrl}/token/`
    },
    availableNetworks() {
      return this.$store.state.payment.availableNetworks
    },
    availableNetworkCount() {
      return this.availableNetworks.length
    },
    currentNetworkName() {
      return this.chainId && this.isAvailableCurrentNetwork
        ? NETWORKS[this.chainId].name
        : 'Not supported network'
    },
    currentNetworkIcon() {
      if (this.chainId && this.isAvailableCurrentNetwork) {
        return NETWORKS[this.chainId].iconPath
      } else {
        return 'network-unknown'
      }
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
    isAvailableCurrentNetwork() {
      return this.availableNetworks.includes(this.chainId)
    },
    isCurrentListTab() {
      return this.tab === this.LIST_TAB
    },
    isCurrentTokenImportTab() {
      return this.tab === this.TOKEN_IMPORT_TAB
    },
    isShowNetworkModal() {
      return this.$store.state.modal.target === 'network-modal'
    },
    isInvalidSearchTokenAddress() {
      return this.searchTokenAddressInvalid
    },
    isExistSearchedTokens() {
      return this.searchedTokenList.length > 0
    },
    isSearchedToken() {
      const addresses = this.searchedTokenList
        .filter((data) => data.address)
        .map((data) => data.address.toLowerCase())
      return addresses.includes(this.searchTokenAddress.toLowerCase())
    },
    isImportedToken() {
      const addresses = this.tokenList
        .filter((data) => data.address)
        .map((data) => data.address.toLowerCase())
      return addresses.includes(this.searchTokenAddress.toLowerCase())
    },
    isDarkTheme() {
      return this.$store.state.theme === 'dark'
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
    updateContractDataFromApi() {
      return this.apiGetContract().then((response) => {
        const data = response.data
        this.contract.address = data.address
        this.contract.abi = JSON.parse(data.args)
      })
    },
    getAccountDataFromBlockChain() {
      const func = this.$web3.getAccountData(this.web3Instance, this.chainId)
      return func.catch(func)
    },
    getDefaultTokens() {
      const func = this.$web3.getDefaultTokens(
        this.web3Instance,
        this.chainId,
        this.userAccountAddress
      )
      return func.catch(func).then((tokens) => {
        this.tokenList = tokens
      })
    },
    checkBlackListedTokenToBlockChain() {
      return this.$web3.isBlacklistedFromPayToken(
        this.web3Instance,
        this.contract,
        this.searchTokenAddress
      )
    },
    searchTokenToBlockChain() {
      return this.$web3.searchToken(
        this.web3Instance,
        this.searchTokenAddress,
        this.userAccountAddress
      )
    },
    showErrorModal(message) {
      this.$store.dispatch('modal/show', {
        target: 'error-modal',
        size: 'small',
        params: {
          message: message
        }
      })
    },
    switchNetwork() {
      this.$store.dispatch('modal/show', {
        target: 'network-modal',
        size: this.availableNetworkCount > 1 ? 'medium' : 'small',
        params: { itemCount: this.availableNetworkCount }
      })
    },
    requireSwitchNetwork() {
      this.$store.dispatch('modal/show', {
        target: 'network-modal',
        size: this.availableNetworkCount > 1 ? 'medium' : 'small',
        params: {
          unsupported: true,
          hideCloseButton: true,
          itemCount: this.availableNetworkCount
        }
      })
    },
    switchTab(tab) {
      this.tab = tab
    },
    searchToken() {
      if (this.isSearchedToken) {
        this.showErrorModal('This token is already searched.')
        return
      }
      if (this.isImportedToken) {
        this.showErrorModal('This token is already imported.')
        return
      }
      this.$parent.loading = true
      this.checkBlackListedTokenToBlockChain()
        .then((isListed) => {
          if (isListed) {
            this.showErrorModal('This token is not supported.')
            this.$parent.loading = false
            return Promise.reject()
          }
          return Promise.resolve()
        })
        .then(this.searchTokenToBlockChain)
        .then((data) => {
          data.url = this.explorerSiteTokenUrl + data.address
          this.searchedTokenList.push(data)
          ++this.searchedTokenCount
          this.$parent.loading = false
        })
        .catch((error) => {
          if (
            'code' in error &&
            'message' in error &&
            error.code === -32000 &&
            error.message === 'execution reverted'
          ) {
            this.showErrorModal(
              'The token you are looking for is not available as it may not comply with the ERC20 standard.'
            )
          }
          this.searchTokenAddressInvalid = true
          this.$parent.loading = false
        })
    },
    importSearchedToken(targetIndex) {
      this.tokenList.unshift(this.searchedTokenList[targetIndex])
      this.searchedTokenList = this.searchedTokenList.filter(
        (value, index) => index !== targetIndex
      )
      this.searchedTokenCount = this.searchedTokenList.length
    },
    clearSearchedTokens() {
      this.searchTokenAddress = null
      this.searchedTokenList = []
      this.searchedTokenCount = 0
      this.searchTokenAddressInvalid = false
    },
    handleSelectToken(selectedToken) {
      this.$store.dispatch('payment/updateToken', {
        name: selectedToken.name,
        symbol: selectedToken.symbol,
        decimal: selectedToken.decimal,
        address: selectedToken.address,
        balance: selectedToken.balance,
        amount: null
      })
      this.$router.push({
        name: 'exchange',
        params: { token: this.paymentToken }
      })
    },
    handleAccountChangedEvent() {
      this.$parent.loading = true
      this.getAccountDataFromBlockChain()
        .then((account) => {
          return this.$store.dispatch('account/update', account)
        })
        .then(this.getDefaultTokens)
        .then(() => {
          this.$parent.loading = false
        })
    },
    handleChainChangedEvent(chainId) {
      chainId = this.web3Instance.utils.isHex(chainId)
        ? this.web3Instance.utils.hexToNumber(chainId)
        : chainId

      this.$store.dispatch('web3/updateChainId', chainId)

      if (this.isAvailableCurrentNetwork) {
        this.tokenList = []
        this.$parent.loading = true
        if (this.isShowNetworkModal) {
          this.$store.dispatch('modal/hide')
        }
        const funcList = [
          this.updateContractDataFromApi(),
          this.getDefaultTokens()
        ]
        Promise.all(funcList).then(() => {
          this.$parent.loading = false
        })
      } else {
        this.tokenList = []
        this.searchedTokenList = []
        this.searchedTokenCount = 0
        this.requireSwitchNetwork()
      }
    },
    handleWindowResize() {
      this.getWindowSize()
    },
    getWindowSize() {
      let height = window.innerHeight - 42 - 111 - 90 - 101 - 24
      this.tabBodyStyle['--wh'] = `${height}px`
    }
  },
  created() {
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
      'accountsChanged',
      this.handleAccountChangedEvent
    )
    this.web3Instance.currentProvider.on(
      'chainChanged',
      this.handleChainChangedEvent
    )

    if (this.isAvailableCurrentNetwork) {
      const funcList = [
        this.updateContractDataFromApi(),
        this.getDefaultTokens()
      ]
      Promise.all(funcList).then(() => {
        this.$parent.loading = false
      })
    } else {
      this.requireSwitchNetwork()
    }
    this.getWindowSize()
    window.addEventListener('resize', this.handleWindowResize)
  },
  beforeDestroy() {
    this.$parent.loading = false
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
.nowloading {
  height: 100%;
  @include flex(center, center);
  flex-direction: column;
  gap: 0.5rem;
  .svg {
    width: 3rem;
    height: 3rem;
    &::v-deep {
      svg {
        fill: var(--Base3);
      }
    }
  }
  p {
    @include font(1rem, 600, 0.04em, $lh, $en_go);
    color: var(--Base3);
    text-align: center;
  }
}
.token {
  &__bill {
    margin-bottom: 1rem;
  }
  // &__text {
  //   margin-bottom: 1.5rem;
  //   @include font(0.8rem, 400, 0.04em, 1.8, $en_go);
  //   color: var(--Text);
  // }
  &__network {
    margin-bottom: 1rem;
  }
}
.tab {
  @include media(sp) {
    max-height: var(--wh);
  }
  &::v-deep {
    .body {
      max-height: calc(86vh - 400px);
      overflow-y: scroll;
      min-height: 150px;
      &::-webkit-scrollbar {
        width: 4px;
        transform: translate(10px, 0);
      }

      &::-webkit-scrollbar-track {
        background-color: var(--Base3);
        // border-radius: 100px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 2rem;

        background: linear-gradient(
          to right bottom,
          #3eb9fc 5.43%,
          #8b2ae1 98.19%
        );
        &:hover {
          background: linear-gradient(to right, #3eb9fc 5.43%, #8b2ae1 98.19%);
        }
        // background: var(--Key1);
      }
      @include media(sp) {
        height: fit-content;
        max-height: calc(var(--wh) - 30px);
        // height: fit-content;
        // &::-webkit-scrollbar {
        //   width: 0px;
        // }
      }
    }
  }
}
.tokentab {
  &__title {
    margin-bottom: 0.5rem;
    // text-align: center;
    @include font(1rem, 600, 0.04em, $lh, $en_go);
    @include media(sp) {
      font-size: 1.2rem;
    }
  }
  &__text {
    margin-bottom: 0.5rem;
    @include font(12px, 400, 0.04em, 1.6, $en_go);
    color: var(--Text);
  }
  &__items {
    & + * {
      margin-top: 0.5rem;
    }
  }
  &__cap {
    margin-bottom: 0.5rem;
    @include font(10px, 400, 0.04em, 1.8, $en_go);
  }
  &__form {
    margin-bottom: 0.5rem;
  }
  &__tokenlist {
    margin-bottom: 1rem;
    &__items {
      margin-bottom: 0.5rem;
    }
  }
  .foot {
    @include font(0.8rem, 400, 0.04em, 1.8, $en_go);
  }
}
</style>
