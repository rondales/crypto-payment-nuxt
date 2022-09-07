<template>
  <div class="payment_handleprice">
    <div class="payment_handleprice-pricewrap">
      <PaymentAmountBilled
        :symbol="merchantReceiveTokenSymbol"
        :icon="merchantReceiveTokenIcon"
        :price="merchantReceiveAmount"
      />

      <div class="payment_balancewrap">
        <div class="payment_desc add-flex j-between mb-2">
          <p class="grd">Your Balance</p>
          <figure
            class="reload"
            :class="{ loading: isReloading }"
            @click="updateTokenExchangeData(true)"
          >
            <img v-if="isDarkTheme" src="@/assets/images/reload.svg" />
            <img v-else src="@/assets/images/reload-l.svg" />
          </figure>
        </div>
        <div class="payment_balance add-flex j-between mb-1">
          <div class="payment_balance-name add-flex a-center mb-2">
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
          <div class="payment_balance-value">
            <p>
              Balance : {{ userSelectedTokenBalance | balanceFormat }}
              {{ userSelectedTokenSymbol }}
            </p>
            <p>
              equivalent : {{ balanceEquivalentAmount | balanceFormat }}
              {{ equivalentSymbol }}
            </p>
          </div>
        </div>
        <div
          class="payment-box"
          v-if="
            isExpiredExchange &&
            isEnoughUserSelectedTokenBalance &&
            !isNeedApprove &&
            !isWalletConfirming
          "
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
        <div class="payment_balance-topken border">
          <div class="payment_balance-tokenname add-flex j-between">
            <p>
              {{ userSelectedTokenSymbol }}
            </p>
            <div
              class="payment_balance-equivalent"
              :class="{ warning: !isEnoughUserSelectedTokenBalance }"
            >
              {{ formatNumber(userSelectedTokenPayAmountEquivalent) }}
              {{ equivalentSymbol }} equivalent
            </div>
          </div>
          <div class="payment_balance-price">
            {{ userSelectedTokenPayAmount }}
          </div>
        </div>
        <div>
          <div v-if="isSetRequreUserPayAmount" class="content-wrap">
            <div
              v-if="isEnoughUserSelectedTokenBalance"
              class="btn-content-wrap"
            >
              <p class="estimate mb-2">
                * This amount is an estimate and is subject to change
              </p>
              <button
                v-if="isNeedApprove"
                class="btn __g __l mb-2 approve-token-btn"
                :class="{ inactive: isWalletConfirming }"
                @click="handleTokenApprove"
              >
                <img
                  class="token-approve-btn-img"
                  :src="userSelectedTokenIcon"
                />
                Allow the Slash protocol to use your
                {{ userSelectedTokenSymbol }}
                <div
                  class="loading-wrap"
                  :class="{ active: isWalletConfirming }"
                >
                  <img class="spin" src="@/assets/images/loading.svg" />
                </div>
              </button>
              <button
                v-if="isExchangeDataUpdating"
                class="btn __g __l mb-2 inactive"
              >
                Price Updating...
                <div class="loading-wrap active">
                  <img class="spin" src="@/assets/images/loading.svg" />
                </div>
              </button>
              <button
                v-else
                class="btn __g __l mb-2"
                :class="{
                  inactive:
                    isNeedApprove || isExpiredExchange || isWalletConfirming,
                }"
                @click="handleGoPayment()"
              >
                Go Payment
              </button>
              <p class="via">
                via Slash Payment
                <span>
                  <img src="@/assets/images/slash-s.svg" alt="" />
                </span>
              </p>
            </div>
            <div v-else class="balance-warning">
              <p>balance is insufficient</p>
              <p>for this transaction.</p>
            </div>
          </div>
          <div v-else class="content-wrap">
            <div v-if="isNotEnoughLiquidity" class="balance-warning">
              <p>Liquidity is not enough</p>
              <p>for this transaction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import { Decimal as BigJs } from "decimal.js";
import { METAMASK, WALLET_CONNECT, NETWORKS } from "@/constants";
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
import NumberFormat from "number-format.js";
import DisplayConfig from '@/components/mixins/DisplayConfig.vue'

export default {
  name: "PaymentExchange",
  mixins: [DisplayConfig],
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
        abi: null,
      },
      isNotEnoughLiquidity: false,
    };
  },
  components: {
    PaymentAmountBilled,
  },
  filters: {
    balanceFormat(balance) {
      return NumberFormat("0.0000", balance);
    },
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
    EXCHANGE_RATE_EXPIRE_TIME() {
      return 30000;
    },
    paymentToken() {
      return this.$route.params.token;
    },
    web3Instance() {
      return this.$store.state.web3.instance;
    },
    chainId() {
      return this.$store.state.web3.chainId;
    },
    providerType() {
      return this.$store.state.web3.provider;
    },
    userAccountAddress() {
      return this.$store.state.account.address;
    },
    equivalentSymbol() {
      return this.merchantReceiveTokenSymbol;
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
    merchantReceiveAmount() {
      return this.$store.state.payment.amount;
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
    userSelectedTokenDecimal() {
      return this.userSelectedToken.decimal;
    },
    userSelectedTokenBalance() {
      return this.userSelectedToken.balance;
    },
    userSelectedTokenPayAmount() {
      if (this.requireAmount === null) {
        return 0;
      } else if (this.isEnoughUserSelectedTokenBalance) {
        return this.requireAmount;
      } else {
        return this.userSelectedTokenBalance;
      }
    },
    userSelectedTokenPayAmountEquivalent() {
      return this.isEnoughUserSelectedTokenBalance
        ? this.merchantReceiveAmount
        : this.balanceEquivalentAmount;
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
    isUserSelectedNativeToken() {
      return this.userSelectedToken.address === null;
    },
    isSetRequreUserPayAmount() {
      return this.requireAmount !== null;
    },
    isNeedApprove() {
      return (
        !this.isUserSelectedNativeToken &&
        !this.isEnoughUserSelectedTokenAllowance
      );
    },
    isEnoughUserSelectedTokenAllowance() {
      if (
        this.userSelectedTokenAllowance === null ||
        this.requireAmount === null
      ) {
        return false;
      }
      return new BigJs(this.userSelectedTokenAllowance).greaterThanOrEqualTo(
        this.requireAmount
      );
    },
    isEnoughUserSelectedTokenBalance() {
      if (
        this.userSelectedTokenBalance === null ||
        this.requireAmount === null
      ) {
        return false;
      }
      return new BigJs(this.userSelectedTokenBalance).greaterThanOrEqualTo(
        this.requireAmount
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
    formatNumber(number) {
      return this.$_displayConfig_formatNumber(number)
    },
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
      )
      .catch((err) => {
        if(err.message.includes('execution reverted: No valid exchange')) {
          this.isNotEnoughLiquidity = true
          this.$parent.loading = false;
          this.$store.dispatch("modal/show", {
            target: "error-modal",
            size: "small",
            params: {
              message:
                "There appears to be no liquidity between \
                  the token you selected and the \
                  merchant receive token on this network. \
                  <br> \
                  <br> \
                  Please return to the token selection screen \
                  and select another token or try paying \
                  with another network.",
            },
          });
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
      );
    },
    sendTokenApproveTransactoinToBlockChain() {
      return this.$web3.tokenApprove(
        this.web3Instance,
        this.chainId,
        this.userAccountAddress,
        this.contract,
        this.userSelectedToken
      );
    },
    setExchangeDataExpireTimer() {
      return setTimeout(() => {
        this.expired = true;
      }, this.EXCHANGE_RATE_EXPIRE_TIME);
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
          this.balanceEquivalentAmount = exchangeData.equivalentAmount;
          this.requireAmount = exchangeData.requireAmount;
          this.exchangeRate = exchangeData.rate;
        })
        .finally(() => {
          this.exchangeDataExpireTimer = this.setExchangeDataExpireTimer();
          this.reloading = false;
          this.updating = false;
        });
    },
    handleTokenApprove() {
      this.$store.dispatch("wallet/updatePendingStatus", true);
      this.sendTokenApproveTransactoinToBlockChain()
        .then((receipt) => {
          if (!receipt.status) {
            Promise.reject();
          }
          const approvedAmountInWei =
            receipt.events["Approval"].returnValues.value;
          this.userSelectedTokenAllowance = this.$web3.convertFromWei(
            this.web3Instance,
            approvedAmountInWei,
            this.userSelectedTokenDecimal
          );
          this.$store.dispatch("wallet/updatePendingStatus", false);
        })
        .catch((error) => {
          this.$store.dispatch("wallet/updatePendingStatus", false);
          if ("code" in error && error.code === 4001) {
            return;
          }
          this.$store.dispatch("modal/show", {
            target: "error-modal",
            size: "small",
            params: {
              message:
                "The Slash protocol allow failed with your token, please allow it again.",
            },
          });
        });
    },
    handleGoPayment() {
      this.$store.dispatch("payment/updateToken", {
        amount: this.requireAmount,
        rate: this.exchangeRate,
      });
      this.$router.push({
        name: "detail",
        params: { token: this.paymentToken },
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
    this.$parent.loading = true;

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
      this.contract.address = response.data.address;
      this.contract.abi = JSON.parse(response.data.args);
      const funcList = [this.getTokenExchangeDataFromContract()];
      if (!this.isUserSelectedNativeToken) {
        funcList.push(this.getTokenApprovedAmountFromContract());
      }
      Promise.all(funcList)
        .then((results) => {
          if (!this.isUserSelectedNativeToken) {
            this.userSelectedTokenAllowance = results[1];
          }
          this.$store.dispatch("payment/updateFee", results[0].fee);
          this.$store.dispatch(
            "payment/updateAmountWei",
            results[0].requestAmountWei
          );
          this.$store.dispatch("payment/updateToken", {
            amount: results[0].requireAmount,
            rate: results[0].rate,
          });
          this.balanceEquivalentAmount = results[0].equivalentAmount;
          this.requireAmount = results[0].requireAmount;
          this.exchangeRate = results[0].rate;
          this.$parent.loading = false;
          this.exchangeDataExpireTimer = this.setExchangeDataExpireTimer();
        })
        .catch((err) => { console.error(err) });
    });
  },
  beforeDestroy() {
    this.$parent.loading = false;
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
  .payment_balance {
    &-name {
      p {
        font-size: 16px;
        font-weight: 400;
        margin-left: 11px;
        line-height: 25px;
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
      font-size: 13px;
      font-weight: 100;
      margin-left: 16px;
    }
    &-topken {
      width: 100%;
      padding: 12px;
      position: relative;
    }
    &-tokenname {
      p {
        font-size: 16px;
        font-weight: 200;
      }
    }
    &-equivalent {
      color: #01f63a;
      font-weight: 100;
      font-size: 11px;
      line-height: 24px;
      &.warning {
        color: #f75d68;
      }
    }
    &-price {
      text-align: right;
      width: 100%;
      font-weight: 100;
      font-size: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .estimate {
    font-size: 10px;
    font-weight: 100;
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
  .balance-warning {
    color: #f75d68;
    font-size: 15px;
    font-weight: 100;
    letter-spacing: 0.05em;
    text-align: center;
  }
  .token-approve-btn-img {
    padding-top: 0px !important;
    width: 25px;
    height: 25px;
  }
  .approve-token-btn {
    padding: 0;
    font-size: 11px;
  }
}
</style>
