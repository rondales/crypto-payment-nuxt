<template>
  <div>
    <div class="manage-setting">
      <div class="setting-wrap">
        <div class="setting-toggle add-flex">
          <div
            class="setting-toggle-right"
            :class="{ active: isContractSettingTab }"
            @click="switchTab(tabs.contractSetting)"
          >
            Contract Setting
          </div>
          <div
            class="setting-toggle-center"
            :class="{ active: isPaymentSettingTab }"
            @click="switchTab(tabs.paymentSetting)"
          >
            Payment Setting
          </div>
          <div
            class="setting-toggle-left"
            :class="{ active: isDomainSettingTab }"
            @click="switchTab(tabs.domainSetting)"
          >
            Domain Setting
          </div>
        </div>
        <div class="manage-contents" v-if="isContractSettingTab">
          <div class="manage-contents_head">
            <h3>
              Create contract
            </h3>
            <p>
              Create a contract for payment with the Web3 address you are using. It must be the same address in ERC20 and BEP20.
            </p>
          </div>
          <div class="manage-contents_body">
            <div class="manage-contents_items">
              <div class="manage-contents_item" :class="{created: true && $store.state.network.abbriviation === 'eth'}">
                <div class="manage-contents_network add-flex a-center j-between">
                  <div class="manage-contents_logo add-flex a-center">
                    <figure>
                      <img src="@/assets/images/eth.svg" alt="">
                    </figure>
                    <p>
                      Ethereum Main net
                    </p>
                  </div>
                  <div @click="publishPaymentContract" v-if="$store.state.network.abbriviation === 'eth'" class="manage-contents_btn">
                    Create
                  </div>
                  <div @click="switchNetwork" v-else class="manage-contents_btn other">
                    switch network
                  </div>
                </div>
                <div class="manage-contents_address-wrap" v-if="true && $store.state.network.abbriviation === 'eth'">
                  <div class="manage-contents_address">
                    <!-- {{address.eth}} -->
                    https://etherscan.io/address/0x0testpaymentcontractaddress
                  </div>
                  <div class="manage-contents_copy" @click="copyPaymentContractUrl">Copy Address</div>
                </div>
              </div>
              <div class="manage-contents_item" :class="{created: true && $store.state.network.abbriviation === 'bsc'}">
                <div class="manage-contents_network add-flex a-center j-between">
                  <div class="manage-contents_logo add-flex a-center">
                    <figure>
                      <img src="@/assets/images/bsc.svg" alt="">
                    </figure>
                    <p>
                      Binance Smart Chain Mainnet
                    </p>
                  </div>
                  <div @click="publishPaymentContract" v-if="$store.state.network.abbriviation === 'bsc'" class="manage-contents_btn">
                    Create
                  </div>
                  <div @click="switchNetwork" v-else class="manage-contents_btn other">
                    switch network
                  </div>
                </div>
                <div class="manage-contents_address-wrap" v-if="true && $store.state.network.abbriviation === 'bsc'">
                  <div class="manage-contents_address">
                    <!-- {{address.bsc}} -->
                    https://bscscan.io/address/0x0testpaymentcontractaddress
                  </div>
                  <div class="manage-contents_copy" @click="copyPaymentContractUrl">Copy Address</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="manage-payment" v-if="isPaymentSettingTab">
          <div class="manage-contents_clm">
            <h4>Success notify URL</h4>
            <p>
              URL to receive kickbacks sent by SlashPayment after payment is successed.
            </p>
            <input class="text-box" type="text" v-model="paymentSettings.successNotifyUrl">
          </div>
          <div class="manage-contents_clm">
            <h4>Payment success return URL</h4>
            <p>
              A URL for the user to go from SlashPayment to the merchant's website after a successful payment.
            </p>
            <input class="text-box" type="text" v-model="paymentSettings.successReturnUrl">
          </div>
          <div class="manage-contents_clm">
            <h4>Payment faliure return URL</h4>
            <p>
              A URL for the user to go from SlashPayment to the merchant's website after a failure payment.
            </p>
            <input class="text-box" type="text" v-model="paymentSettings.failureReturnUrl">
          </div>
          <div class="manage-contents_clm">
            <h4><span>*</span>Exchange margin rate</h4>
            <p>
              The margin rate to be added to the actual exchange rate.
            </p>
            <input class="text-box" type="text" v-model="paymentSettings.exchangeMarginRate">
          </div>
          <div class="manage-contents_creat-url" @click="updatePaymentSettings">
            Save
          </div>
        </div>
        <div class="manage-domain" v-if="isDomainSettingTab">
          <div class="manage-contents_clm">
            <h4>Receiver Domain Setting</h4>
            <p>
              Enter the request URL (POST) for the Deposit Notification API.
            </p>
            <div>
              <input class="text-box" type="text" v-model="domainSettings.domain">
            </div>
            <div class="manage-contents_creat-url" @click="updateDomainSettings">
              Save
            </div>
          </div>
          <div class="manage-contents_clm">
            <h4>Prove ownership of a domain with TXT records</h4>
            <p>
              By proving the ownership of the domain with a TXT record, a certification mark will be included in the domain display on the payment screen.
            </p>
            <div>
              <input class="text-box" type="text" v-model="domainSettings.txt" disabled>
            </div>
            <div class="manage-contents_creat-url" @click="verifyDomain">
              Check
            </div>
            <div class="verify" v-if="domainSettings.verified">
              verify
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
@todo Web3ConnectTeam

In this page, you need to implement the following process or function.

1. Network switching
2. Contract issuance

*The issued contract information is saved in the DB via the API.
 Please make sure that you can get the contract address and argument information.
*/
import { LOGIN_TOKEN, HTTP_CODES } from '@/constants'
import { errorCodeList } from '@/enum/error_code'
import RequestUtility from '@/utils/request'

export default {
  name: 'AdminPaymentSetting',
  data() {
    return {
      currentTab: null,
      tabs: {
        contractSetting: 1,
        paymentSetting: 2,
        domainSetting: 3
      },
      contractSettings: {},
      paymentSettings: {
        successNotifyUrl: '',
        successReturnUrl: '',
        failureReturnUrl: '',
        exchangeMarginRate: '0.0'
      },
      domainSettings: {
        domain: '',
        txt: '',
        verified: false
      }
    }
  },
  computed: {
    isContractSettingTab() {
      return this.currentTab === this.tabs.contractSetting
    },
    isPaymentSettingTab() {
      return this.currentTab === this.tabs.paymentSetting
    },
    isDomainSettingTab() {
      return this.currentTab === this.tabs.domainSetting
    },
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    }
  },
  methods: {
    switchTab(targetTab) {
      this.currentTab = targetTab
    },
    apiGetContracts() {
      const url = `${this.baseUrl}/api/v1/management/contract`
      const request = { headers: { Authorization: RequestUtility.getBearer() } }
      return this.axios.get(url, request)
    },
    apiRegistContract() {
      const url = `${this.baseUrl}/api/v1/management/contract`
      const options = { headers: { Authorization: RequestUtility.getBearer() } }
      const data = {
        address: null,
        args: null,
        network_type: null,
        payment_type: null
      }
      return this.axios.post(url, data, options)
    },
    apiGetPaymentSettings() {
      const url = `${this.baseUrl}/api/v1/management/setting/payment`
      const request = { headers: { Authorization: RequestUtility.getBearer() } }
      return this.axios.get(url, request)
    },
    apiUpdatePaymentSettings() {
      const url = `${this.baseUrl}/api/v1/management/setting/payment`
      const options = { headers: { Authorization: RequestUtility.getBearer() } }
      const data = {
        complete_kickback_url: this.paymentSettings.successNotifyUrl,
        succeeded_return_url: this.paymentSettings.successReturnUrl,
        failured_return_url: this.paymentSettings.failureReturnUrl,
        exchange_margin_rate: this.paymentSettings.exchangeMarginRate
      }
      return this.axios.patch(url, data, options)
    },
    apiGetDomainSettings() {
      const url = `${this.baseUrl}/api/v1/management/setting/domain`
      const request = { headers: { Authorization: RequestUtility.getBearer() } }
      return this.axios.get(url, request)
    },
    apiUpdateDomainSettings() {
      const url = `${this.baseUrl}/api/v1/management/setting/domain`
      const options = { headers: { Authorization: RequestUtility.getBearer() } }
      const data = { domain: this.domainSettings.domain }
      return this.axios.patch(url, data, options)
    },
    apiVerifyDomain() {
      const url = `${this.baseUrl}/api/v1/management/setting/domain/verify`
      const request = { headers: { Authorization: RequestUtility.getBearer() } }
      return this.axios.get(url, request)
    },
    getPaymentSettings() {
      this.apiGetPaymentSettings().then((response) => {
        this.paymentSettings.successNotifyUrl = response.data.complete_kickback_url
        this.paymentSettings.successReturnUrl = response.data.succeeded_return_url
        this.paymentSettings.failureReturnUrl = response.data.failured_return_url
        this.paymentSettings.exchangeMarginRate = response.data.exchange_margin_rate
      }).catch((error) => {
        this.apiConnectionErrorHandler(error.response.status, error.response.data)
      })
    },
    updatePaymentSettings() {
      this.apiUpdatePaymentSettings().catch((error) => {
        this.apiConnectionErrorHandler(error.response.status, error.response.data)
      })
    },
    getDomainSettings() {
      this.apiGetDomainSettings().then((response) => {
        this.domainSettings.domain = response.data.domain
        this.domainSettings.txt = response.data.txt
        this.domainSettings.verified = response.data.verified
      }).catch((error) => {
        this.apiConnectionErrorHandler(error.response.status, error.response.data)
      })
    },
    updateDomainSettings() {
      this.apiUpdateDomainSettings().then((response) => {
        this.domainSettings.verified = !response.data.re_verify
      }).catch((error) => {
        this.apiConnectionErrorHandler(error.response.status, error.response.data)
      })
    },
    verifyDomain() {
      this.apiVerifyDomain().then(() => {
        this.domainSettings.verified = true
      }).catch((error) => {
        error.response.status === HTTP_CODES.BAD_REQUEST
          ? this.domainSettings.verified = false
          : this.apiConnectionErrorHandler(error.response.status, error.response.data)
      })
    },
    publishPaymentContract() {
      // @todo Implemented the process of publishing Payment Contracts
    },
    switchNetwork() {
      // @todo Implement a network switching process for wallets
    },
    copyPaymentContractUrl() {
      // @todo Implement the process of copying the URL of the contract to the clipboard
    },
    apiConnectionErrorHandler(statusCode, responseData) {
      if (statusCode === HTTP_CODES.UN_AUTHORIZED) {
        localStorage.removeItem(LOGIN_TOKEN)
        this.$router.push({ path: '/admin' })
      } else {
        if ('errors' in responseData && responseData.errors.length) {
          this.$store.dispatch(
            'openModal',
            {
              target: 'error-modal',
              size: 'small',
              message: errorCodeList[responseData.errors.shift()].msg
            }
          )
        }
      }
    }
  },
  created() {
    this.currentTab = this.tabs.contractSetting
    this.getPaymentSettings()
    this.getDomainSettings()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.manage-setting{
  .setting-wrap{
    .setting-toggle{
      background: #292536;
      width: 600px;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 40px;
      @include media(sp) {
        width:100%;
      }
      &-right, &-center,&-left{
        text-align: center;
        width: 33%;
        font-size: 15px;
        padding: 8px 0;
        cursor: pointer;
        color: #8D8D8D;
        &.active{
          cursor: unset;
          background: #4E455A;
          border-radius: 8px;
          color: #fff;
        }
      }
    }
    .manage-contents{
      &_head{
        padding: 32px 0;
        h3{
          font-weight: 100;
        }
        p{
          font-weight: 100;
          font-size: 15px;
        }
      }
      &_item{
        background: #292536;
        margin-bottom: 32px;
        padding: 16px 24px;
        border-radius: 8px;
        width: 60%;
        @include media(sp) {
          width:100%;
        }
      }
      .created{
        .manage-contents_network{
          padding-bottom: 16px;
          border-bottom: 1px solid #78668D;
          margin-bottom: 16px;
        }
        .manage-contents_btn{
          opacity: .6;
          cursor: unset;
        }
      }
      &_network{
        p{
          margin-left: 16px;
          font-weight: 100;
          font-size: 15px;
          @include media(sp) {
            margin-left: 14px;
          }
        }
        figure{
          img{
            border-radius: 8px;
            width: 40px;
            height: 40px;
          }
        }
      }
      &_logo{
        @include media(sp) {
          margin: 0 auto 24px;
        }
      }
      &_btn{
        font-weight: 100;
        font-size: 15px;
        background: $gradation-light;
        padding: 6px 0;
        width: 180px;
        text-align: center;
        border-radius: 30px;
        cursor: pointer;
        @include media(sp) {
          margin: auto;
        }
        &.other{
          background: #78668D;
        }
      }
      &_address-wrap{
        padding: 0 32px;
        position: relative;
        &::after{
          content: "";
          background: url(/assets/images/check-mark.svg) no-repeat center center;
          width: 20px;
          height: 20px;
          position: absolute;
          top: 15%;
          left: 10px;
          transform: translate(-50%, -50%);
        }
      }
      &_address{
        font-size: 15px;
        margin-bottom: 16px;
        font-weight: 100;
        word-break: break-all;
      }
      &_copy{
        color: #8E86AD;
        font-size: 17px;
        position: relative;
        display: inline-block;
        font-weight: 200;
        cursor: pointer;
        &::after{
          content: "";
          background: url(/assets/images/copy-address.svg) no-repeat center center;
          width: 20px;
          height: 20px;
          position: absolute;
          top: 50%;
          right: -40px;
          transform: translate(-50%, -60%);
        }
      }
      &_clm{
        margin-bottom: 32px;
        h4{
          font-size: 18px;
          font-weight: 100;
          margin-bottom: 16px;
          span{
            color: #B52828;
          }
        }
        p{
          font-size: 14px;
          font-weight: 100;
          margin-bottom: 24px;
          width: 70%;
        }
        .text-box{
          border-radius: 8px;
          border: 1px solid #78668D;
          width: 70%;
          padding: 12px;
          font-size: 14px;
          font-weight: 100;
          margin-bottom: 24px;
        }
        .verify{
          margin-top: 24px;
          padding-left: 32px;
          font-weight: 100;
          font-size: 18px;
          color: #00FF4E;
          position: relative;
          &::after{
            content: "";
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
      &_creat-url{
        display: inline;
        text-align: center;
        font-weight: 200;
        font-size: 14px;
        line-height: 40px;
        background: linear-gradient(90.25deg, #3EB9FC 5.43%, #6A68ED 59.32%, #8B2AE1 98.19%);
        padding: 12px 40px;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }
}
</style>