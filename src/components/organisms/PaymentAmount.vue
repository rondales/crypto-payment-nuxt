<template>
  <div class="payment_handleprice">
    <div class="payment_desc mb-3 mt-3">
      <p>Enter the payment amount</p>
      <span>&#128591;</span>
    </div>
    <div class="payment_handleprice-pricewrap">
      <p class="payment_handleprice-desc mb-1">How much would you pay?</p>
      <div class="payment_handleprice-price add-flex border j-between">
        <input
          v-model="legalCurrencyAmount"
          class="price"
          type="text"
          placeholder="0"
        />
        <div class="add-flex currency a-center">
          <figure>
            <img :src="selectedCurrencyIcon" />
          </figure>
          <!-- <select name="currency" v-model="selectedCurrency">
            <option disabled value="">{{ selectedCurrencyName }}</option>
            <option v-for="(currency, key) in currencies" :value="currency.name" :key="key">
              {{ currency.name }}
            </option>
          </select> -->
          <select name="currency" v-model="selectedCurrency">
            <!-- <option disabled value="">{{ selectedCurrencyName }}</option> -->
            <option
              v-for="(currency, key) in currencies"
              :value="currency.name"
              :key="key"
            >
              {{ currency.name }}
            </option>
          </select>
        </div>
      </div>
      <PaymentAmountBilled
        :symbol="receiveTokenSymbol"
        :icon="receiveTokenIcon"
        :price="exchangedAmount"
        :priceClass="{ inactive: requireUpdateExchange }"
      />
      <div v-if="!requireUpdateExchange" class="payment-with">
        Payment with Web3 Wallet
      </div>
      <div>
        <div class="payment-box" v-if="requireUpdateExchange">
          <div class="add-flex a-center j-between">
            <div class="add-flex a-center">
              <img src="@/assets/images/warning.svg" alt="" />
              <div class="payment-box_desc">
                <p>Price Updated</p>
              </div>
            </div>
            <div class="payment-box_btn" @click="updateExchangeData()">
              Accept
            </div>
          </div>
        </div>
        <button
          :class="{ inactive: requireUpdateExchange }"
          class="payment-btn btn __g __l"
          @click="next"
        >
          <img
            v-if="requireUpdateExchange"
            src="@/assets/images/slash-s_inactive.svg"
            alt=""
          />
          <img v-else src="@/assets/images/slash-s.svg" alt="" />
          Go Payment
          <div class="loading-wrap" :class="{ active: loading }">
            <img class="spin" src="@/assets/images/loading.svg" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentAmountBilled from "@/components/organisms/Payment/AmountBilled";
import MathExtend from "@/utils/math_extend";
import { errorCodeList } from "@/enum/error_code";
import { CURRENCIES } from "@/constants";

export default {
  name: "PaymentAmount",
  data() {
    return {
      loading: false,
      requireUpdateExchange: false,
      legalCurrencyAmount: null,
      selectedCurrency: null,
      exchangedAmount: 0,
      exchangeRate: null,
      exchangeMarginRate: null,
      exchangeTimer: null,
      receiveTokenIcons: {
        USDT: require("@/assets/images/symbol/usdt.svg"),
        USDC: require("@/assets/images/symbol/usdc.svg"),
        DAI: require("@/assets/images/symbol/dai.svg"),
        JPYC: require("@/assets/images/symbol/jpyc.svg"),
      },
    };
  },
  components: {
    PaymentAmountBilled,
  },
  watch: {
    legalCurrencyAmount: function () {
      this.calculationExchange();
    },
    selectedCurrency: function (currency) {
      this.updateExchangeData(currency);
    },
  },
  computed: {
    receiveTokenSymbol() {
      return this.$store.state.payment.symbol;
    },
    receiveTokenIcon() {
      return this.receiveTokenIcons[this.$store.state.payment.symbol];
    },
    currencies() {
      let list = {};
      Object.entries(this.$store.state.payment.allowCurrencies).forEach(
        ([key, value]) => {
          if (value) {
            list[key] = CURRENCIES[key];
          }
        }
      );
      return list;
    },
    selectedCurrencyName() {
      return CURRENCIES[this.selectedCurrency].name;
    },
    selectedCurrencyIcon() {
      return CURRENCIES[this.selectedCurrency].icon;
    },
  },
  methods: {
    calculationExchange() {
      this.exchangedAmount = MathExtend.ceilDecimal(
        this.legalCurrencyAmount / this.exchangeRate,
        2
      );
    },
    updateDefaultCurrency() {
      this.selectedCurrency = Object.values(this.currencies)[0].name;
    },
    updateExchangeData(currency = null) {
      if (currency === null) currency = this.selectedCurrency;
      this.apiGetExchangeRate(currency)
        .then((response) => {
          this.exchangeRate = response.data.include_margin_rate;
          this.exchangeMarginRate = response.data.margin_rate;
          if (this.legalCurrencyAmount) this.calculationExchange();
          this.requireUpdateExchange = false;
          this.exchangeTimer = setTimeout(() => {
            this.requireUpdateExchange = true;
            clearTimeout(this.exchangeTimer);
          }, 120000);
        })
        .catch((error) => {
          let message;
          if ("errors" in error.response.data) {
            message = errorCodeList[error.response.data.errors.shift()].msg;
          } else {
            message = "Please try again after a while.";
          }
          this.showErrorModal(message);
        });
    },
    apiGetExchangeRate(currency) {
      const url = process.env.VUE_APP_API_BASE_URL + "/api/v1/exchange";
      const params = new URLSearchParams([
        ["payment_token", this.$route.params.token],
        ["legal_currency", currency],
      ]);
      return this.axios.get(url, { params });
    },
    apiUpdateTransaction() {
      const url =
        process.env.VUE_APP_API_BASE_URL + "/api/v1/payment/transaction";
      const params = {
        payment_token: this.$route.params.token,
        base_currency: CURRENCIES[this.selectedCurrency].name,
        base_amount: this.legalCurrencyAmount,
        exchanged_amount: this.exchangedAmount,
        rate: this.exchangeRate,
        margin_rate: this.exchangeMarginRate,
      };
      return this.axios.patch(url, params);
    },
    next() {
      this.loading = true;
      this.apiUpdateTransaction()
        .then(() => {
          this.$store.dispatch("payment/updateAmount", this.exchangedAmount);
          this.$router.replace({
            path: "receipt/" + this.$route.params.token,
          });
        })
        .catch((error) => {
          let message;

          if (error.response.status === 400) {
            message = errorCodeList[error.response.data.errors.shift()].msg;
          } else {
            message = "Please try again after a while.";
          }
          this.loading = false;
          this.showErrorModal(message);
        });
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
  },
  created() {
    this.updateDefaultCurrency();
    this.updateExchangeData(this.selectedCurrency);
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

  .payment_handleprice-desc {
    font-size: 15px;
    font-weight: 400;
  }

  .payment_handleprice-price {
    padding: 0;
    width: 100%;
    min-width: auto;
    input {
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
    .currency {
      width: 35%;
      line-height: 53px;
      position: relative;
      &::before {
        position: absolute;
        content: "";
        width: 1px;
        height: 33px;
        background: #6b6b6c;
        left: -12px;
      }
      &::after {
        content: "▲";
        position: absolute;
        right: 12px;
        color: #6b6b6c;
        font-size: 14px;
        transform: rotate(-180deg);
      }
      figure {
        line-height: 53px;
        position: absolute;
        img {
          vertical-align: sub;
        }
      }
      select {
        padding-left: 36px;
        font-weight: 400;
        width: 100%;
        border: none;
        outline: none;
      }
    }
    span {
      vertical-align: middle;
      font-size: 11px;
    }
  }

  .payment-with {
    text-align: center;
    font-size: 18px;
    font-weight: 200;
    padding-top: 8px;
    padding-bottom: 24px;
  }

  .payment-btn {
    img {
      padding-top: 0;
    }
  }
}
</style>
