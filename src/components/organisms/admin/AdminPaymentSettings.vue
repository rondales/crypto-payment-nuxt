<template>
  <div class="manage-payment">
    <div class="manage-contents_clm">
      <h4>URL to receive Payment Result kickback from Slash Payment</h4>
      <p>
        URL to receive kickbacks sent by SlashPayment after payment is finished.
      </p>
      <input class="text-box" type="text" v-model="successNotifyUrl" />
    </div>
    <div class="manage-contents_clm">
      <h4>Payment success return URL</h4>
      <p>
        A URL for the user to go from SlashPayment to the merchant's website
        after a successful payment.
      </p>
      <input class="text-box" type="text" v-model="successReturnUrl" />
    </div>
    <div class="manage-contents_clm">
      <h4>Payment failure return URL</h4>
      <p>
        A URL for the user to go from SlashPayment to the merchant's website
        after a failure payment.
      </p>
      <input class="text-box" type="text" v-model="failureReturnUrl" />
    </div>
    <div class="manage-contents_clm">
      <h4>Receipt Delivery Email</h4>
      <p>
        An email to receive receipt whenever a payment succeeds.
      </p>
      <input class="text-box" placeholder="your@mail.com" type="text" v-model="receiptEmail" />
    </div>
    <div class="manage-contents_clm">
      <h4><span>*</span>Exchange margin rate</h4>
      <p>The margin rate to be added to the actual exchange rate.</p>
      <input class="text-box" type="text" v-model="exchangeMarginRate" />
    </div>
    <div class="manage-contents_clm mb-6">
      <h4><span>*</span>Supported Currencies</h4>
      <p>
        The fiat currencies that can be selected when the user enters the
        settlement amount.
      </p>
      <div class="bases-wrap">
        <div class="bases mb-1">
          <input
            type="checkbox"
            @click="selectAllCurrency"
            :checked="isAllowAllCurrency"
          />
          <label for="item1"> All Currencies </label>
        </div>
        <div class="bases mb-1"  v-for="currency in currencies" :key="currency.name">
          <input
            type="checkbox"
            @click="selectCurrency($event, currency.name)"
            :checked="isAllowCurrency(currency.name)"
          />
          <label for="item2"> {{currency.name}} </label>
        </div>
      </div>
    </div>
    <div class="manage-contents_create-url" @click="updatePaymentSettings">
      Save
    </div>
  </div>
</template>

<script>
import {API_BASE_URL, CURRENCIES} from '@/constants'
import apiMixin from '@/components/mixins/ApiHandler'

export default {
  name: 'AdminPaymentSettings',
  mixins: [apiMixin],
  data() {
    return {
      currencies: CURRENCIES,
      successNotifyUrl: '',
      successReturnUrl: '',
      failureReturnUrl: '',
      receiptEmail: '',
      exchangeMarginRate: '0.0',
      allowCurrencies: {
        USD: false,
        JPY: false,
        EUR: false,
        AED: false,
        SGD: false,
        HKD: false,
        CAD: false,
        IDR: false,
        PHP: false,
        INR: false,
        KRW: false
      }
    }
  },
  computed: {
    isAllowAllCurrency() {
      const denyCurrencies = Object.values(this.allowCurrencies).filter(
        (setting) => !setting
      )
      return denyCurrencies.length === 0
    }
  },
  methods: {
    apiGetSettings() {
      const url = `${API_BASE_URL}/api/v1/management/setting/payment`
      return this.axios.get(url, this.$_apiHandler_getOptions())
    },
    isAllowCurrency(currencyName) {
      return this.isAllowAllCurrency || this.allowCurrencies[currencyName]
    },
    apiUpdateSettings() {
      const url = `${API_BASE_URL}/api/v1/management/setting/payment`
      const data = {
        complete_kickback_url: this.successNotifyUrl,
        succeeded_return_url: this.successReturnUrl,
        failured_return_url: this.failureReturnUrl,
        receipt_email: this.receiptEmail,
        exchange_margin_rate: this.exchangeMarginRate,
        allow_currencies: this.allowCurrencies
      }
      return this.axios.patch(url, data, this.$_apiHandler_getOptions())
    },
    getSettings() {
      this.apiGetSettings()
        .then((response) => {
          this.successNotifyUrl = response.data.complete_kickback_url
          this.successReturnUrl = response.data.succeeded_return_url
          this.failureReturnUrl = response.data.failured_return_url
          this.receiptEmail = response.data.receipt_email
          this.exchangeMarginRate = response.data.exchange_margin_rate
          this.allowCurrencies = response.data.allow_currencies
        })
        .catch((error) => {
          this.$_apiHandler_apiConnectionErrorHandler(
            error.response.status,
            error.response.data
          )
        })
    },
    updatePaymentSettings() {
      this.apiUpdateSettings().catch((error) => {
        this.$_apiHandler_apiConnectionErrorHandler(
          error.response.status,
          error.response.data
        )
      })
    },
    selectAllCurrency($event) {
      const settingValue = $event.target.checked
      Object.keys(this.allowCurrencies).forEach((currency) => {
        this.allowCurrencies[currency] = settingValue
      })
    },
    selectCurrency(event, currency) {
      this.allowCurrencies[currency] = event.target.checked
    }
  },
  created() {
    this.getSettings()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.manage-contents {
  &_clm {
    margin-bottom: 32px;
    h4 {
      font-size: 18px;
      font-weight: 300;
      margin-bottom: 16px;
      span {
        color: #b52828;
      }
    }
    p {
      font-size: 14px;
      font-weight: 300;
      margin-bottom: 24px;
      width: 70%;
    }
    .text-box {
      border-radius: 8px;
      border: 1px solid #78668d;
      width: 70%;
      padding: 12px;
      font-size: 14px;
      font-weight: 300;
      margin-bottom: 24px;
    }
    .verify {
      margin-top: 24px;
      padding-left: 32px;
      font-weight: 300;
      font-size: 18px;
      color: #00ff4e;
      position: relative;
      &::after {
        content: '';
        background: url(/assets/images/check-mark.svg) no-repeat center center;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(-50%, -50%);
      }
    }
  }
  &_create-url {
    display: inline;
    text-align: center;
    font-weight: 200;
    font-size: 14px;
    line-height: 40px;
    background: linear-gradient(
      90.25deg,
      #3eb9fc 5.43%,
      #6a68ed 59.32%,
      #8b2ae1 98.19%
    );
    padding: 12px 40px;
    border-radius: 8px;
    cursor: pointer;
  }
}
.bases-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 50%;
}
.bases {
  position: relative;
  margin-right: 16px;
  @include media(sp) {
    width: 100%;
  }
  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    font-size: 14px;
    z-index: 1;
    width: 2rem;
    padding-top: 4px;
    height: 2rem;
    top: 6px;
    + label {
      &:before {
        content: '';
        background: #292536;
        border-radius: 6px;
        border: 1px solid darken(#f4f4f4, 25%);
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        position: relative;
        top: 4px;
        margin-right: 2px;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
      }
    }
    &:checked {
      + label {
        &:before {
          border-radius: 6px;
          background-color: #fff;
          box-shadow: inset 0 0 0 3px #292536;
        }
      }
    }
    &:focus {
      + label {
        &:before {
          border-radius: 6px;
          outline: none;
          border-color: #fff;
        }
      }
    }
    &:disabled {
      + label {
        &:before {
          box-shadow: inset 0 0 0 4px #f4f4f4;
          border-color: #292536;
          background: #292536;
        }
      }
    }
    + label {
      font-size: 14px;
      cursor: pointer;
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
