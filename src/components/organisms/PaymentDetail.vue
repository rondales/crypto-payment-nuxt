<template>
  <div class="payment_handleprice">
    <div class="payment_handleprice-pricewrap">
      <PaymentAmountBilled
        :symbol="merchantReceiveTokenSymbol"
        :icon="merchantReceiveTokenIcon"
        :price="merchantReceiveAmount"
      />
      <div class="payment_detailwrap">
        <div class="payment_desc add-flex j-between mb-2">
          <p class="grd">Payment detail</p>
          <figure
            v-if="!isWalletConfirming"
            class="reload"
            :class="{ loading: isReloading }"
            @click="updateTokenExchangeData(true)"
          >
            <img v-if="isDarkTheme" src="@/assets/images/reload.svg" />
            <img v-else src="@/assets/images/reload-l.svg" />
          </figure>
        </div>
        <div class="payment_detail add-flex j-between mb-1">
          <div class="payment_detail-name add-flex a-center mb-1">
            <figure>
              <img
                :src="userSelectedTokenIcon"
                :alt="userSelectedTokenSymbol"
              />
            </figure>
            <p>
              {{ userSelectedTokenSymbol }}
            </p>
          </div>
          <div class="payment_detail-value">
            <p>
              {{ userSelectedTokenPaymentAmount }}
            </p>
          </div>
        </div>
        <div
          class="payment-box"
          v-if="!isWalletConfirming && isExpiredExchange"
        >
          <div class="add-flex a-center j-between">
            <div class="add-flex a-center">
              <img src="@/assets/images/warning.svg" alt="" />
              <div class="payment-box_desc">
                <p>Price Updated</p>
              </div>
            </div>
            <div
              class="payment-box_btn"
              @click="updateTokenExchangeData(false)"
            >
              Accept
            </div>
          </div>
        </div>
        <div class="dattail-lists mt-1" v-if="!isWalletConfirming">
          <div class="dattail-list add-flex j-between mb-1">
            <p>Exchange Rate</p>
            <p>
              1 {{ merchantReceiveTokenSymbol }} &#65309;
              {{ userSelectedTokenExchangeRate }} {{ userSelectedTokenSymbol
              }}<img src="@/assets/images/exchange.svg" alt="" />
            </p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Route</p>
            <p v-html="tradeRoute"></p>
          </div>
          <!--
          @todo Implement it when you are able to get various data from the contract
          <div class="dattail-list add-flex j-between mb-1">
            <p>Minimum received</p>
            <p>388.213 BUSD</p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Price Impact</p>
            <p>-9.29%</p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Liquidity Provider Fee</p>
            <p>0.002367 BNB</p>
          </div>
          -->
          <div
            v-if="isDifferentToken"
            class="dattail-list add-flex j-between mb-1"
          >
            <p>Slippage tolerance</p>
            <p>{{ SLIPPAGE_RATE }}%</p>
          </div>
          <div class="dattail-list add-flex j-between mb-2">
            <p>Platform Fee</p>
            <p>{{ platformFee }} {{ nativeTokenSymbol }}</p>
          </div>
          <p class="dattail-list_desc">
            Output is estimated. You will receive at least
            {{ merchantReceiveAmount }} {{ merchantReceiveTokenSymbol }} or the
            transaction will revert.
          </p>
        </div>
        <div v-else class="payment-status mt-3 mb-3">
          <div>
            <img
              class="mb-2 spin"
              src="@/assets/images/loading.svg"
              alt="waiting"
            />
            <p class="payment-status_title">Waiting for Confirmation</p>
            <p class="payment-status_desc mb-2">
              Pay {{ userSelectedTokenPaymentAmount }}
              {{ userSelectedTokenSymbol }} for {{ merchantReceiveAmount }}
              {{ merchantReceiveTokenSymbol }}
            </p>
          </div>
        </div>
        <button v-if="isExchangeDataUpdating" class="btn __g __l mb-2 inactive">
          Price Updating...
          <div class="loading-wrap active">
            <img class="spin" src="@/assets/images/loading.svg" alt="loading" />
          </div>
        </button>
        <button
          v-else-if="isWalletConfirming"
          class="btn __g __l mb-2 inactive"
        >
          Please confirm Wallet
        </button>
        <button
          v-else
          class="btn __g __l mb-2"
          :class="{ inactive: isExpiredExchange }"
          @click="executePayment()"
        >
          Confirm Wallet
        </button>
        <p class="via">
          via Slash Payment
          <span>
            <img src="@/assets/images/slash-s.svg" alt="slash" />
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
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
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalacheReceiveTokens,
} from "@/contracts/receive_tokens";

export default {
  name: "PaymentDetail",
  components: {
    PaymentAmountBilled,
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
    SLIPPAGE_RATE() {
      return process.env.VUE_APP_PAYMENT_SLIPPAGE_TOLERANCE;
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
    MERCHNAT_RECEIVE_TOKEN_ICONS() {
      return {
        USDT: require("@/assets/images/symbol/usdt.svg"),
        USDC: require("@/assets/images/symbol/usdc.svg"),
        DAI: require("@/assets/images/symbol/dai.svg"),
        JPYC: require("@/assets/images/symbol/jpyc.svg")
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
        ? tokens[this.merchantReceiveTokenSymbol].icon
        : require("@/assets/images/symbol/unknown.svg");
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
        ? tokens[this.userSelectedTokenSymbol].icon
        : require("@/assets/images/symbol/unknown.svg");
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
        this.SLIPPAGE_RATE
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
        this.platformFee,
        this.merchantReceiveWeiAmount
      );
    },
    executePayment() {
      this.$store.dispatch("wallet/updatePendingStatus", true);
      this.sendPaymentTransactionToBlockChain()
        .on("transactionHash", (txHash) => {
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
        .on("error", () => {
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

.payment_handleprice {
  width: 100%;
  dl {
    dt {
      font-weight: 400;
      font-size: 15px;
    }
  }

  .payment_desc {
    p {
      background: $gradation-pale;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
  }
  .payment_handleprice-pricewrap {
    width: 100%;
  }
  .payment_handleprice-price {
    padding: 0;
    width: 100%;
    min-width: auto;
  }

  .dattail-lists {
    .dattail-list {
      p {
        font-size: 11px;
        font-weight: 100;
        img {
          margin-left: 8px;
        }
      }
    }
    .dattail-list_desc {
      font-size: 11px;
      font-weight: 100;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
  }
  .reload {
    cursor: pointer;
    img {
      vertical-align: middle;
    }
    &.loading {
      animation: 3s linear infinite spin;
      from {
        transform: rotateZ(0deg);
      }
      to {
        transform: rotateZ(360deg);
      }
    }
  }
  .payment_detail {
    &-name {
      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 25px;
        margin-left: 7px;
      }
      figure {
        width: 25px;
        height: 25px;
        img {
          vertical-align: baseline;
        }
      }
    }
    &-value {
      font-size: 20px;
      font-weight: 100;
      margin-left: 16px;
    }
  }
  .payment-status {
    text-align: center;
    margin: auto;
    &_title {
      font-size: 18px;
      font-weight: 100;
    }
    &_desc {
      font-size: 10px;
      font-weight: 100;
    }
    &_btn {
      font-size: 12px;
      font-weight: 100;
      cursor: pointer;
      background: $gradation-pale;
      padding: 4px 16px;
      border-radius: 10px;
      color: #fff;
      img {
        margin-left: 4px;
        vertical-align: middle;
      }
    }
  }
  .via {
    font-size: 12px;
    font-weight: 100;
    text-align: center;
    line-height: 20px;
    img {
      width: 20px;
      height: 20px;
      margin-left: 5px;
    }
  }
  .new-tab-icon {
    padding: 0 !important;
  }
}
</style>
