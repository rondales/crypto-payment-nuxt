<template>
  <div class="detail">
    <PaymentAmountBilled
      class="detail__bill"
      :symbol="merchantReceiveTokenSymbol"
      :icon="merchantReceiveTokenIcon"
      :price="merchantReceiveAmount"
      size="big"
    />
    <PaymentTitle class="detail__title" type="h2_g" html="Payment detail">
      <PaymentButton
        v-if="!isWalletConfirming"
        icon="reload"
        color="icon"
        size="icon"
        @click.native="updateTokenExchangeData(faltruese)"
        :class="{ loading: isReloading }"
      />
    </PaymentTitle>

    <PaymentAction
      class="detail__update"
      v-if="!isWalletConfirming && isExpiredExchange"
      icon="attention"
      text="Price Updated"
    >
      <PaymentButton
        text="Accept"
        size="s"
        @click.native="updateTokenExchangeData(false)"
      />
    </PaymentAction>
    <PaymentAmountBilled
      class="detail__selectedToken"
      :symbol="userSelectedTokenSymbol"
      :icon="userSelectedTokenIcon"
      :price="userSelectedTokenPaymentAmount"
    />
    <div class="detail__table">
      <PaymentTable
        v-if="!isWalletConfirming"
        :table="[
          {
            title: 'Exchange Rate',
            price: '',
            text:
              '1 ' +
              merchantReceiveTokenSymbol +
              ' &#65309; ' +
              userSelectedTokenExchangeRate +
              ' ' +
              userSelectedTokenSymbol,
            icon: 'exchange',
          },
          {
            title: 'Route',
            text: tradeRoute,
          }
        ]"
      />
      <PaymentText
        v-if="!isWalletConfirming"
        type="cap"
        :html="
          'Output is estimated. You will receive at least ' +
          merchantReceiveAmount +
          ' ' +
          merchantReceiveTokenSymbol +
          ' or the transaction will revert.'
        "
      />
      <div v-else>
        <PaymentTransaction
          type="loading"
          title="Waiting for Confirmation"
          :text="
            'Pay ' +
            userSelectedTokenPaymentAmount +
            ' ' +
            userSelectedTokenSymbol +
            ' ' +
            ' for ' +
            merchantReceiveAmount +
            ' ' +
            merchantReceiveTokenSymbol
          "
        />
      </div>
    </div>
    <div class="detail__btnwrap">
      <PaymentButton
        v-if="isExchangeDataUpdating"
        color="inactive"
        text="Price Updating..."
        :loading="true"
      />
      <PaymentButton
        v-else-if="isWalletConfirming"
        color="inactive"
        text="Please confirm Wallet"
      />
      <PaymentButton
        v-else
        :color="isExpiredExchange ? 'inactive' : 'primary'"
        text="Confirm Wallet"
        @click.native="executePayment()"
      />
    </div>
  </div>
</template>

<script>
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import PaymentTitle from "@/components/organisms/Payment/Title";
import PaymentButton from "@/components/organisms/Payment/Button";
import PaymentTransaction from "@/components/organisms/Payment/Transaction";
import PaymentAction from "@/components/organisms/Payment/Action";
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentTable from "@/components/organisms/Payment/Table";
import {
  METAMASK,
  WALLET_CONNECT,
  NETWORKS,
  STATUS_PROCESSING,
} from "@/constants";
import {
  EthereumTokens as EthereumDefaultTokens,
  BscTokens as BscDefaultTokens,
  MaticTokens as MaticDefaultTokens,
  AvalancheTokens as AvalancheDefaultTokens,
} from "@/contracts/tokens";
import {
  EthereumTokens as EthereumStableTokens,
  BscTokens as BscStableTokens,
  MaticTokens as MaticStableTokens,
  AvalancheTokens as AvalancheStableTokens,
} from "@/contracts/stable_tokens";
import {
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalacheReceiveTokens,
} from "@/contracts/receive_tokens";

export default {
  name: "PaymentDetail",
  components: {
    PaymentAmountBilled,
    PaymentButton,
    PaymentTransaction,
    PaymentAction,
    PaymentText,
    PaymentTitle,
    PaymentTable,
  },
  data() {
    return {
      expired: false,
      reloading: false,
      updating: false,
      exchangeDataExpireTimer: null,
      contract: {
        address: null,
        abi: null,
      },
    };
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL;
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
    NATIVE_TOKEN_SYMBOLS() {
      return {
        ETH: "ETH",
        BNB: "BNB",
        MATIC: "MATIC",
        AVAX: "AVAX",
        WETH: "WETH",
        WBNB: "WBNB",
        WMATIC: "WMATIC",
        WAVAX: "WAVAX",
      };
    },
    EXCHANGE_RATE_EXPIRE_TIME() {
      return 30000;
    },
    paymentToken() {
      return this.$route.params.token;
    },
    web3Instance() {
      return this.$store.state.web3.instance;
    },
    providerType() {
      return this.$store.state.web3.provider;
    },
    chainId() {
      return this.$store.state.web3.chainId;
    },
    userAccountAddress() {
      return this.$store.state.account.address;
    },
    merchantReceiveTokens() {
      if (this.isCurrentNetworkEthereum) {
        return EthereumReceiveTokens;
      } else if (this.isCurrentNetworkBinance) {
        return BscReceiveTokens;
      } else if (this.isCurrentNetworkMatic) {
        return MaticReceiveTokens;
      } else if (this.isCurrentNetworkAvalanche) {
        return AvalacheReceiveTokens;
      } else {
        return {};
      }
    },
    defaultPaymentTokens() {
      if (this.isCurrentNetworkEthereum) {
        return EthereumDefaultTokens;
      } else if (this.isCurrentNetworkBinance) {
        return BscDefaultTokens;
      } else if (this.isCurrentNetworkMatic) {
        return MaticDefaultTokens;
      } else if (this.isCurrentNetworkAvalanche) {
        return AvalancheDefaultTokens;
      } else {
        return {};
      }
    },
    stableTokens() {
      if (this.isCurrentNetworkEthereum) {
        return EthereumStableTokens;
      } else if (this.isCurrentNetworkBinance) {
        return BscStableTokens;
      } else if (this.isCurrentNetworkMatic) {
        return MaticStableTokens;
      } else if (this.isCurrentNetworkAvalanche) {
        return AvalancheStableTokens;
      } else {
        return {};
      }
    },
    nativeTokenSymbol() {
      return this.chainId !== null ? NETWORKS[this.chainId].symbol : "";
    },
    merchantReceiveAmount() {
      return this.$store.state.payment.amount;
    },
    merchantReceiveWeiAmount() {
      return this.$store.state.payment.amountWei;
    },
    merchantReceiveTokenSymbol() {
      return this.$store.state.payment.symbol;
    },
    merchantReceiveTokenIcon() {
      const tokens = this.merchantReceiveTokens;
      return this.merchantReceiveTokenSymbol in tokens
        ? tokens[this.merchantReceiveTokenSymbol].iconPath
        : "crypto_currency/unknown";
    },
    userSelectedToken() {
      return this.$store.state.payment.token;
    },
    userSelectedTokenAddress() {
      return this.userSelectedToken.address;
    },
    userSelectedTokenPaymentAmount() {
      return this.userSelectedToken.amount;
    },
    userSelectedTokenSymbol() {
      return this.userSelectedToken.symbol;
    },
    userSelectedTokenIcon() {
      const tokens = this.defaultPaymentTokens;
      return this.userSelectedTokenSymbol in tokens
        ? tokens[this.userSelectedTokenSymbol].iconPath
        : "crypto_currency/unknown";
    },
    userSelectedTokenExchangeRate() {
      return this.$store.state.payment.token.rate;
    },
    tradeRoute() {
      if (!this.isDifferentToken) {
        return this.merchantReceiveTokenSymbol;
      } else if (this.isCurrentNetworkEthereum) {
        return this.isSelectedNativeToken
          ? `${this.NATIVE_TOKEN_SYMBOLS.WETH} &#8680; ${this.merchantReceiveTokenSymbol}`
          : `${this.userSelectedTokenSymbol} &#8680; ${this.NATIVE_TOKEN_SYMBOLS.WETH} &#8680; ${this.merchantReceiveTokenSymbol}`;
      } else if (this.isCurrentNetworkBinance) {
        return this.isSelectedNativeToken
          ? `${this.NATIVE_TOKEN_SYMBOLS.WBNB} &#8680; ${this.merchantReceiveTokenSymbol}`
          : `${this.userSelectedTokenSymbol} &#8680; ${this.NATIVE_TOKEN_SYMBOLS.WBNB} &#8680; ${this.merchantReceiveTokenSymbol}`;
      } else if (this.isCurrentNetworkMatic) {
        return this.isSelectedNativeToken
          ? `${this.NATIVE_TOKEN_SYMBOLS.WMATIC} &#8680; ${this.merchantReceiveTokenSymbol}`
          : `${this.userSelectedTokenSymbol} &#8680; ${this.NATIVE_TOKEN_SYMBOLS.WMATIC} &#8680; ${this.merchantReceiveTokenSymbol}`;
      } else if (this.isCurrentNetworkAvalanche) {
        return this.isSelectedNativeToken
          ? `${this.NATIVE_TOKEN_SYMBOLS.WAVAX} &#8680; ${this.merchantReceiveTokenSymbol}`
          : `${this.userSelectedTokenSymbol} &#8680; ${this.NATIVE_TOKEN_SYMBOLS.WAVAX} &#8680; ${this.merchantReceiveTokenSymbol}`;
      } else {
        return "";
      }
    },
    platformFee() {
      return this.$store.state.payment.fee;
    },
    isEmptyWeb3Instance() {
      return this.web3Instance === null;
    },
    isUseMetaMaskProvider() {
      return this.providerType === METAMASK;
    },
    isUseWalletConnectProvider() {
      return this.providerType === WALLET_CONNECT;
    },
    isNeedRestoreWeb3Connection() {
      return (
        this.isEmptyWeb3Instance &&
        (this.isUseMetaMaskProvider || this.isUseWalletConnectProvider)
      );
    },
    isCurrentNetworkEthereum() {
      return (
        this.chainId === NETWORKS[1].chainId ||
        this.chainId === NETWORKS[5].chainId
      );
    },
    isCurrentNetworkBinance() {
      return (
        this.chainId === NETWORKS[56].chainId ||
        this.chainId === NETWORKS[97].chainId
      );
    },
    isCurrentNetworkMatic() {
      return (
        this.chainId === NETWORKS[137].chainId ||
        this.chainId === NETWORKS[80001].chainId
      );
    },
    isCurrentNetworkAvalanche() {
      return (
        this.chainId === NETWORKS[43114].chainId ||
        this.chainId === NETWORKS[43113].chainId
      );
    },
    isDifferentToken() {
      const receiveTokens = this.merchantReceiveTokens;
      const receiveTokenAddress =
        this.merchantReceiveTokenSymbol in receiveTokens
          ? receiveTokens[this.merchantReceiveTokenSymbol].address.toLowerCase()
          : "";
      const paymentTokenAddress = this.userSelectedTokenAddress
        ? this.userSelectedTokenAddress.toLowerCase()
        : this.userSelectedTokenAddress;
      return receiveTokenAddress !== paymentTokenAddress;
    },
    isSelectedNativeToken() {
      return Object.values(this.NATIVE_TOKEN_SYMBOLS).includes(
        this.userSelectedTokenSymbol
      );
    },
    isExpiredExchange() {
      return this.expired;
    },
    isReloading() {
      return this.reloading;
    },
    isExchangeDataUpdating() {
      return this.updating;
    },
    isWalletConfirming() {
      return this.$store.state.wallet.pending;
    },
    isDarkTheme() {
      return this.$store.state.theme === "dark";
    },
    isSelectedStableToken() {
      if (!this.userSelectedToken.address) {
        // for native token
        return false
      }
      return Object.values(this.stableTokens)
        .map(token => token.address ? token.address.toLowerCase() : token.address)
        .filter(address => address)
        .includes(this.userSelectedToken.address.toLowerCase())
    }
  },
  methods: {
    apiGetContract() {
      const url = `${this.API_BASE_URL}/api/v1/payment/contract`;
      const request = {
        params: new URLSearchParams([
          ["payment_token", this.paymentToken],
          ["network_type", this.chainId],
        ]),
      };
      return this.axios.get(url, request);
    },
    apiUpdateTransaction(transactionHash) {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction`;
      return this.axios.patch(url, {
        payment_token: this.paymentToken,
        network_type: this.chainId,
        contract_address: this.contract.address,
        transaction_address: transactionHash,
        wallet_address: this.userAccountAddress,
        pay_symbol: this.userSelectedTokenSymbol,
        pay_amount: this.userSelectedTokenPaymentAmount,
      });
    },
    setExchangeDataExpireTimer() {
      return setTimeout(() => {
        this.expired = true;
      }, this.EXCHANGE_RATE_EXPIRE_TIME);
    },
    getTokenExchangeDataFromContract() {
      return this.$web3.getTokenExchangeData(
        this.web3Instance,
        this.chainId,
        this.userAccountAddress,
        this.contract,
        this.userSelectedToken,
        this.merchantReceiveTokenSymbol,
        this.merchantReceiveAmount,
        this.GAS_FEE_RATE,
        this.PAYMENT_FEE_RATE
      );
    },
    updateTokenExchangeData(reload) {
      clearTimeout(this.exchangeDataExpireTimer);
      this.expired = false;
      this.reloading = reload;
      this.updating = true;
      this.getTokenExchangeDataFromContract()
        .then((exchangeData) => {
          this.$store.dispatch("payment/updateFee", exchangeData.fee);
          this.$store.dispatch(
            "payment/updateAmountWei",
            exchangeData.requestAmountWei
          );
          this.$store.dispatch("payment/updateToken", {
            amount: exchangeData.requireAmount,
            rate: exchangeData.rate,
          });
        })
        .finally(() => {
          this.exchangeDataExpireTimer = this.setExchangeDataExpireTimer();
          this.reloading = false;
          this.updating = false;
        });
    },
    sendPaymentTransactionToBlockChain() {
      return this.$web3.sendPaymentTransaction(
        this.web3Instance,
        this.chainId,
        this.userAccountAddress,
        this.contract,
        this.userSelectedToken,
        this.userSelectedTokenPaymentAmount,
        this.$store.state.payment.symbol,
        this.platformFee,
        this.merchantReceiveWeiAmount
      );
    },
    executePayment() {
      this.$store.dispatch("wallet/updatePendingStatus", true);
      this.sendPaymentTransactionToBlockChain()
        .then((txHash) => {
          this.$store.dispatch("payment/updateStatus", STATUS_PROCESSING);
          this.apiUpdateTransaction(txHash)
            .then(() => {
              this.$router.push({
                name: "result",
                params: { token: this.paymentToken },
              });
            })
            .catch((error) => {
              console.log(error.data);
            });
        })
        .catch((error) => {
          console.log(error)
          this.$store.dispatch("wallet/updatePendingStatus", false);
        });
    },
    handleChainChangedEvent(chainId) {
      chainId = this.web3Instance.utils.isHex(chainId)
        ? this.web3Instance.utils.hexToNumber(chainId)
        : chainId;
      this.$store.dispatch("web3/updateChainId", chainId);
      this.$router.push({ path: `/payment/token/${this.paymentToken}` });
    },
    handleAccountChangedEvent(address) {
      this.$store.dispatch("account/updateAddress", address[0]);
      this.$router.push({ path: `/payment/token/${this.paymentToken}` });
    },
  },
  created() {
    if (this.isNeedRestoreWeb3Connection) {
      this.$router.push({
        name: "wallets",
        params: { token: this.paymentToken },
      });
    }
  },
  mounted() {
    if (this.isNeedRestoreWeb3Connection) {
      return;
    }
    this.web3Instance.currentProvider.on(
      "chainChanged",
      this.handleChainChangedEvent
    );
    this.web3Instance.currentProvider.on(
      "accountsChanged",
      this.handleAccountChangedEvent
    );
    this.apiGetContract().then((response) => {
      this.contract.abi = JSON.parse(response.data.args);
      this.contract.address = response.data.address;
      this.exchangeDataExpireTimer = this.setExchangeDataExpireTimer();
    });
  },
  beforeDestroy() {
    clearTimeout(this.exchangeDataExpireTimer);
    if (!this.isEmptyWeb3Instance) {
      this.web3Instance.currentProvider.removeListener(
        "chainChanged",
        this.handleChainChangedEvent
      );
      this.web3Instance.currentProvider.removeListener(
        "accountsChanged",
        this.handleAccountChangedEvent
      );
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$parent.loading = false;
    if (!this.isEmptyWeb3Instance) {
      this.web3Instance.currentProvider.removeListener(
        "chainChanged",
        this.handleChainChangedEvent
      );
      this.web3Instance.currentProvider.removeListener(
        "accountsChanged",
        this.handleAccountChangedEvent
      );
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.detail {
  &__bill {
    margin-bottom: 2rem;
  }
  &__title {
    margin-bottom: 2rem;
  }
  &__balance {
    margin-bottom: 2rem;
  }
  &__update {
    margin-bottom: 2rem;
  }
  &__price {
    margin-bottom: 2rem;
  }
  &__btnwrap {
    margin-top: 2rem;
    div + div {
      margin-top: 0.5rem;
    }
  }
}
</style>
