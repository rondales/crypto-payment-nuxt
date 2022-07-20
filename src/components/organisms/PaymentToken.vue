<template>
  <div :class="classes">
    <!-- <p class="d-todo">{{ $options.name }}</p> -->
    <!-- TODO 確認の仕方 -->
    <PaymentAmountBilled
      :symbol="merchantReceiveTokenSymbol"
      :icon="merchantReceiveTokenIcon"
      :price="merchantReceiveAmount"
      class="token__bill"
      size="big"
    />
    <PaymentText
      class="token__text"
      tag="p"
      html="Select the network and currency you wish to pay for. If the currency you
        want is not on the list, you can import it by contract address &#x1f44d;"
    />
    <PaymentAction
      class="token__network"
      :icon="currentNetworkIcon"
      :text="currentNetworkName"
    >
      <PaymentButton size="s" text="Change" @click.native="switchNetwork()" />
    </PaymentAction>
    <PaymentTab
      :status="isCurrentTokenImportTab"
      @changeToList="switchTab(LIST_TAB)"
      @changeToToken="switchTab(TOKEN_IMPORT_TAB)"
    >
      <div v-if="isCurrentListTab">
        <PaymentText
          class="tokentab__title"
          tag="p"
          type="subtitle"
          html="Select token"
        />
        <div
          class="tokentab__items"
          v-for="(token, key) in tokenList"
          :key="key"
          @click="handleSelectToken(token)"
        >
          <!-- TODO iconのpathをiconフォルダのファイル名に変更 -->
          <PaymentAmountBilled
            :icon="token.iconPath"
            :symbol="token.symbol"
            :symboltext="token.name"
            :price="token.balance | balanceFormat"
            size="bg"
          />
        </div>
      </div>
      <div v-else-if="isCurrentTokenImportTab">
        <div class="tokentab">
          <PaymentText
            class="tokentab__title"
            tag="h3"
            type="h4b"
            html="Enter token contract address"
          />
          <PaymentText
            class="tokentab__cap"
            tag="p"
            type="cap"
            html="*Does not support tokenomics tokens, which have the property that transactions are subject to TAX 🙅‍♂️"
          />
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
            <!-- TODO iconのpathをiconフォルダのファイル名に変更 -->
            <PaymentAction
              class="tokentab__tokenlist__items"
              :icon="token.iconPath"
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
            <PaymentText
              tag="h3"
              type="h5"
              :html="searchedTokenCount + ' Custom Token'"
            />
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
    <!-- <div class="payment_handleprice">
      <div class="payment_handleprice-pricewrap">
        <PaymentAmountBilled
          :symbol="merchantReceiveTokenSymbol"
          :icon="merchantReceiveTokenIcon"
          :price="merchantReceiveAmount"
        />
        <PaymentText
          class="payment-with"
          tag="p"
          html="Select the network and currency you wish to pay for. If the currency you
        want is not on the list, you can import it by contract address &#x1f44d;"
        />
        <div class="payment-box network">
          <div class="add-flex a-center j-between">
            <div class="add-flex a-center">
              <img :src="currentNetworkIcon" :alt="currentNetworkName" />
              <div class="payment-box_desc">
                <p>
                  {{ currentNetworkName }}
                </p>
              </div>
            </div>
            <div class="payment-box_btn" @click="switchNetwork()">Change</div>
          </div>
        </div>
        <div class="body">
          <div class="toggle-btn mb-3 add-flex j-around">
            <div
              class="toggle-right"
              :class="{ active: isCurrentListTab }"
              @click="switchTab(LIST_TAB)"
            >
              Lists
            </div>
            <div
              class="toggle-left"
              :class="{ active: isCurrentTokenImportTab }"
              @click="switchTab(TOKEN_IMPORT_TAB)"
            >
              Tokens
            </div>
          </div>
          <div class="token-content" v-if="isCurrentListTab">
            <PaymentText
              class="token-title"
              tag="p"
              type="subtitle"
              html="Select token"
            />
            <div class="token-items">
              <div
                class="token-item add-flex j-between a-center"
                v-for="(token, key) in tokenList"
                :key="key"
                @click="handleSelectToken(token)"
              >
                <div class="add-flex j-between a-center">
                  <figure>
                    <img :src="token.icon" alt="" />
                  </figure>
                  <dl>
                    <dt>
                      <PaymentText type="cap" :html="token.symbol" />
                    </dt>
                    <dd>
                      <PaymentText type="lead" :html="token.name" />
                    </dd>
                  </dl>
                </div>
                <div class="usdt-price">
                  <p>
                    {{ token.balance | balanceFormat }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="manage-content" v-else-if="isCurrentTokenImportTab">
            <div class="manage-title">Enter token contract address</div>
            <div class="manage-desc">
              *Does not support tokenomics tokens, which have the property that
              transactions are subject to TAX 🙅‍♂️
            </div>
            <input
              class="token-dsc border"
              type="text"
              placeholder="0x0000"
              v-model="searchTokenAddress"
              @keyup.enter="searchToken()"
            />
            <div class="manage-wrap">
              <div class="manage-warning" v-if="isInvalidSearchTokenAddress">
                Enter valid token address
              </div>
              <ul
                class="manage-item add-flex a-center mb-2"
                v-for="(token, key) in searchedTokenList"
                :key="key"
              >
                <li>
                  <img :src="token.icon" />
                </li>
                <li class="token-name">
                  {{ token.symbol }}
                </li>
                <li class="manage-item--right add-flex a-center j-between">
                  <a :href="token.url" target="_brank">
                    <figure>
                      <img src="@/assets/images/link-icon.svg" />
                    </figure>
                  </a>
                  <div class="manage-import" @click="importSearchedToken(key)">
                    Import
                  </div>
                </li>
              </ul>
              <div class="add-flex j-between a-center">
                <div class="manage-none">
                  {{ searchedTokenCount }} Custom Token
                </div>
                <div
                  class="manage-clear"
                  v-if="isExistSearchedTokens"
                  @click="clearSearchedTokens()"
                >
                  Clear all
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentAction from "@/components/organisms/Payment/Action";
import PaymentTab from "@/components/organisms/Payment/Tab";
import PaymentForm from "@/components/organisms/Payment/Form";
import PaymentButton from "@/components/organisms/Payment/Button";

import NumberFormat from "number-format.js";
import { METAMASK, WALLET_CONNECT, NETWORKS } from "@/constants";
import {
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalacheReceiveTokens,
} from "@/contracts/receive_tokens";

export default {
  name: "PaymentToken",
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
        abi: null,
      },
    };
  },
  components: {
    PaymentAmountBilled,
    PaymentText,
    PaymentAction,
    PaymentTab,
    PaymentForm,
    PaymentButton,
  },
  filters: {
    balanceFormat(balance) {
      return NumberFormat("0.0000", balance);
    },
  },
  computed: {
    classes() {
      let array = { token: true };
      // array[this.size] = true;
      return array;
    },
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    LIST_TAB() {
      return 1;
    },
    TOKEN_IMPORT_TAB() {
      return 2;
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
    explorerSiteTokenUrl() {
      return `${NETWORKS[this.chainId].scanUrl}/token/`;
    },
    availableNetworks() {
      return this.$store.state.payment.availableNetworks;
    },
    availableNetworkCount() {
      return this.availableNetworks.length;
    },
    currentNetworkName() {
      return this.chainId && this.isAvailableCurrentNetwork
        ? NETWORKS[this.chainId].name
        : "Not supported network";
    },
    currentNetworkIcon() {
      // if (this.chainId && this.isAvailableCurrentNetwork) {
      //   return NETWORKS[this.chainId].icon;
      // } else if (this.isDarkTheme) {
      //   return require("@/assets/images/network/unknown.svg");
      // } else {
      //   return require("@/assets/images/network/unknown-l.svg");
      // }
      if (this.chainId && this.isAvailableCurrentNetwork) {
        return NETWORKS[this.chainId].iconPath;
      } else {
        return "network-unknown";
      }
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
    merchantReceiveAmount() {
      return this.$store.state.payment.amount;
    },
    merchantReceiveTokenSymbol() {
      return this.$store.state.payment.symbol;
    },
    merchantReceiveTokenIcon() {
      const tokens = this.merchantReceiveTokens;
      // return this.merchantReceiveTokenSymbol in tokens
      //   ? tokens[this.merchantReceiveTokenSymbol].icon
      //   : require("@/assets/images/symbol/unknown.svg");
      return this.merchantReceiveTokenSymbol in tokens
        ? tokens[this.merchantReceiveTokenSymbol].iconPath
        : "network-unknown";
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
    isAvailableCurrentNetwork() {
      return this.availableNetworks.includes(this.chainId);
    },
    isCurrentListTab() {
      return this.tab === this.LIST_TAB;
    },
    isCurrentTokenImportTab() {
      return this.tab === this.TOKEN_IMPORT_TAB;
    },
    isShowNetworkModal() {
      return this.$store.state.modal.target === "network-modal";
    },
    isInvalidSearchTokenAddress() {
      return this.searchTokenAddressInvalid;
    },
    isExistSearchedTokens() {
      return this.searchedTokenList.length > 0;
    },
    isSearchedToken() {
      const addresses = this.searchedTokenList
        .filter((data) => data.address)
        .map((data) => data.address.toLowerCase());
      return addresses.includes(this.searchTokenAddress.toLowerCase());
    },
    isImportedToken() {
      const addresses = this.tokenList
        .filter((data) => data.address)
        .map((data) => data.address.toLowerCase());
      return addresses.includes(this.searchTokenAddress.toLowerCase());
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
    updateContractDataFromApi() {
      return this.apiGetContract().then((response) => {
        const data = response.data;
        this.contract.address = data.address;
        this.contract.abi = JSON.parse(data.args);
      });
    },
    getAccountDataFromBlockChain() {
      const func = this.$web3.getAccountData(this.web3Instance, this.chainId);
      return func.catch(func);
    },
    getDefaultTokens() {
      const func = this.$web3.getDefaultTokens(
        this.web3Instance,
        this.chainId,
        this.userAccountAddress
      );
      return func.catch(func).then((tokens) => {
        this.tokenList = tokens;
      });
    },
    checkBlackListedTokenToBlockChain() {
      return this.$web3.isBlacklistedFromPayToken(
        this.web3Instance,
        this.contract,
        this.searchTokenAddress
      );
    },
    searchTokenToBlockChain() {
      console.log("token search");
      return this.$web3.searchToken(
        this.web3Instance,
        this.searchTokenAddress,
        this.userAccountAddress
      );
    },
    showErrorModal(message) {
      this.$store.dispatch("modal/show", {
        target: "error-modal",
        size: "small",
        params: {
          message: message,
        },
      });
    },
    switchNetwork() {
      this.$store.dispatch("modal/show", {
        target: "network-modal",
        size: this.availableNetworkCount > 1 ? "medium" : "small",
        params: { itemCount: this.availableNetworkCount },
      });
    },
    requireSwitchNetwork() {
      this.$store.dispatch("modal/show", {
        target: "network-modal",
        size: this.availableNetworkCount > 1 ? "medium" : "small",
        params: {
          unsupported: true,
          hideCloseButton: true,
          itemCount: this.availableNetworkCount,
        },
      });
    },
    switchTab(tab) {
      this.tab = tab;
    },
    searchToken() {
      if (this.isSearchedToken) {
        this.showErrorModal("This token is already searched.");
        return;
      }
      if (this.isImportedToken) {
        this.showErrorModal("This token is already imported.");
        return;
      }
      this.$parent.loading = true;
      this.checkBlackListedTokenToBlockChain()
        .then((isListed) => {
          if (isListed) {
            this.showErrorModal("This token is not supported.");
            this.$parent.loading = false;
            return Promise.reject();
          }
          return Promise.resolve();
        })
        .then(this.searchTokenToBlockChain)
        .then((data) => {
          data.url = this.explorerSiteTokenUrl + data.address;
          this.searchedTokenList.push(data);
          ++this.searchedTokenCount;
          this.$parent.loading = false;
        })
        .catch((error) => {
          if (
            "code" in error &&
            "message" in error &&
            error.code === -32000 &&
            error.message === "execution reverted"
          ) {
            this.showErrorModal(
              "The token you are looking for is not available as it may not comply with the ERC20 standard."
            );
          }
          this.searchTokenAddressInvalid = true;
          this.$parent.loading = false;
        });
    },
    importSearchedToken(targetIndex) {
      this.tokenList.unshift(this.searchedTokenList[targetIndex]);
      this.searchedTokenList = this.searchedTokenList.filter(
        (value, index) => index !== targetIndex
      );
      this.searchedTokenCount = this.searchedTokenList.length;
    },
    clearSearchedTokens() {
      this.searchTokenAddress = null;
      this.searchedTokenList = [];
      this.searchedTokenCount = 0;
      this.searchTokenAddressInvalid = false;
    },
    handleSelectToken(selectedToken) {
      this.$store.dispatch("payment/updateToken", {
        name: selectedToken.name,
        symbol: selectedToken.symbol,
        decimal: selectedToken.decimal,
        address: selectedToken.address,
        balance: selectedToken.balance,
        amount: null,
      });
      this.$router.push({
        name: "exchange",
        params: { token: this.paymentToken },
      });
    },
    handleAccountChangedEvent() {
      this.$parent.loading = true;
      this.getAccountDataFromBlockChain()
        .then((account) => {
          return this.$store.dispatch("account/update", account);
        })
        .then(this.getDefaultTokens)
        .then(() => {
          this.$parent.loading = false;
        });
    },
    handleChainChangedEvent(chainId) {
      chainId = this.web3Instance.utils.isHex(chainId)
        ? this.web3Instance.utils.hexToNumber(chainId)
        : chainId;

      this.$store.dispatch("web3/updateChainId", chainId);

      if (this.isAvailableCurrentNetwork) {
        this.$parent.loading = true;
        if (this.isShowNetworkModal) {
          this.$store.dispatch("modal/hide");
        }
        const funcList = [
          this.updateContractDataFromApi(),
          this.getDefaultTokens(),
        ];
        Promise.all(funcList).then(() => {
          this.$parent.loading = false;
        });
      } else {
        this.tokenList = [];
        this.searchedTokenList = [];
        this.searchedTokenCount = 0;
        this.requireSwitchNetwork();
      }
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
      "accountsChanged",
      this.handleAccountChangedEvent
    );
    this.web3Instance.currentProvider.on(
      "chainChanged",
      this.handleChainChangedEvent
    );

    if (this.isAvailableCurrentNetwork) {
      const funcList = [
        this.updateContractDataFromApi(),
        this.getDefaultTokens(),
      ];
      Promise.all(funcList).then(() => {
        this.$parent.loading = false;
      });
    } else {
      this.requireSwitchNetwork();
    }
  },
  beforeDestroy() {
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
.token {
  &__bill {
    margin-bottom: 2rem;
  }
  &__text {
    margin-bottom: 2rem;
  }
  &__network {
    margin-bottom: 2rem;
  }
}
.tokentab {
  &__title {
    margin-bottom: 1rem;
    text-align: center;
  }
  &__items {
    & + * {
      margin-top: 0.5rem;
    }
  }
  &__cap {
    margin-bottom: 1rem;
  }
  &__form {
    margin-bottom: 1rem;
  }
  &__tokenlist {
    margin-bottom: 1rem;
    &__items {
      margin-bottom: 0.5rem;
    }
  }
}

// .payment_handleprice {
//   width: 100%;
//   dl {
//     dt {
//       font-weight: 400;
//       font-size: 15px;
//     }
//   }

//   .payment_desc {
//     p {
//       background: $gradation-pale;
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-size: 150% 150%;
//       display: inline;
//     }
//   }
//   .payment_handleprice-pricewrap {
//     width: 100%;
//   }
//   .payment_handleprice-price {
//     padding: 0;
//     width: 100%;
//     min-width: auto;
//     input {
//       line-height: 53px;
//       height: 53px;
//       font-weight: 500;
//       font-size: 18px;
//       width: 65%;
//       padding-left: 16px;
//       @include media(sp) {
//         width: 55%;
//       }
//     }
//     .currency {
//       width: 35%;
//       line-height: 53px;
//       position: relative;
//       &::before {
//         position: absolute;
//         content: "";
//         width: 1px;
//         height: 33px;
//         background: #6b6b6c;
//         left: -12px;
//       }
//       &::after {
//         content: "▲";
//         position: absolute;
//         right: 12px;
//         color: #6b6b6c;
//         font-size: 14px;
//         transform: rotate(-180deg);
//       }
//       figure {
//         line-height: 53px;
//         position: absolute;
//         img {
//           padding-top: 14px;
//         }
//       }
//       select {
//         padding-left: 36px;
//         font-weight: 400;
//         width: 100%;
//         border: none;
//         outline: none;
//       }
//     }
//     span {
//       vertical-align: middle;
//       font-size: 11px;
//     }
//   }
//   .token-title {
//     // font-size: 17px;
//     // font-weight: 100;
//     margin-bottom: 8px;
//   }
//   .token-item {
//     padding-bottom: 8px;
//     margin: 4px 0;
//     figure {
//       img {
//         height: 38px;
//         width: 38px;
//         border-radius: 50%;
//       }
//     }
//     dl {
//       margin-left: 16px;
//       dt,
//       dd {
//         line-height: 1;
//         font-size: 0;
//       }
//       // dt {
//       //   font-size: 15px;
//       //   font-weight: 100;
//       // }
//       // dd {
//       //   font-size: 14px;
//       //   font-weight: 300;
//       // }
//     }
//   }
//   .payment-with {
//     text-align: left;
//     // font-size: 12px;
//     // font-weight: 100;
//     // padding-top: 8px;
//     // padding-bottom: 24px;
//     margin-top: 0.5rem;
//     margin-bottom: 1.5rem;
//   }
//   .payment-box {
//     background: #4e455a;
//     padding: 12px;
//     border-radius: 12px;
//     margin-bottom: 16px;
//     color: #fff;
//     img {
//       width: 38px;
//       height: 38px;
//       border-radius: 10px;
//     }
//     &_desc {
//       font-size: 11px;
//       padding-left: 8px;
//       font-weight: 100;
//     }
//     &_btn {
//       cursor: pointer;
//       font-size: 12px;
//       font-weight: 200;
//       background: $gradation-pale;
//       padding: 4px 12px;
//       border-radius: 10px;
//     }
//   }
//   .payment_receiptwrap {
//     width: 100%;
//   }
//   .payment_receipt {
//     p {
//       font-size: 15px;
//     }
//     &_form {
//       height: 56px;
//       .mail {
//         height: 51px;
//         padding: 0 16px;
//         font-size: 15px;
//         width: 100%;
//       }
//     }
//   }
//   .body {
//     .toggle-btn {
//       background: var(--color_darken);
//       padding: 8px;
//       border-radius: 10px;
//     }
//     .token-dsc {
//       font-size: 14px;
//       font-weight: 100;
//       padding: 16px;
//       margin-bottom: 24px;
//       width: 100%;
//     }
//     .toggle-right,
//     .toggle-left {
//       width: 48%;
//       text-align: center;
//       height: 38px;
//       line-height: 38px;
//       margin: 0 1%;
//       border-radius: 10px;
//       cursor: pointer;
//       font-size: 16px;
//       font-weight: 100;
//       &.active {
//         background: var(--color_inner);
//       }
//     }
//     .token-items {
//       overflow: hidden;
//       overflow-y: auto;
//       height: 20vh;
//       &::-webkit-scrollbar {
//         display: none;
//       }
//       .token-item {
//         cursor: pointer;
//       }
//     }
//     .manage-content {
//       .manage-title {
//         font-size: 15px;
//         margin-bottom: 8px;
//       }
//       .manage-desc {
//         font-size: 12px;
//         font-weight: 100;
//         margin-bottom: 16px;
//       }
//       .manage-warning {
//         font-size: 15px;
//         color: #e53f3f;
//         margin-bottom: 24px;
//       }
//       .manage-none {
//         font-size: 15px;
//         font-weight: 100;
//       }
//       .manage-clear {
//         font-size: 14px;
//         font-weight: 100;
//         background: var(--color_darken);
//         border-radius: 10px;
//         padding: 4px 24px;
//         cursor: pointer;
//       }
//       .manage-item {
//         font-size: 14px;
//         width: 100%;
//         .token-name {
//           width: 60%;
//           font-weight: 100;
//           padding-left: 17px;
//         }
//       }
//       .manage-item--right {
//         margin-left: auto;
//         width: 100px;
//         .manage-import {
//           height: 27px;
//           background: $gradation-pale;
//           padding: 4px 16px;
//           border-radius: 10px;
//           font-size: 12px;
//           font-weight: 100;
//           cursor: pointer;
//           color: #fff;
//         }
//         figure {
//           img {
//             vertical-align: inherit;
//           }
//         }
//       }
//     }
//   }
// }
</style>
