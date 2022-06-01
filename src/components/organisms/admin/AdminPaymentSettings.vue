<template>
  <div>
    <div class="manage-setting">
      <div class="setting-wrap">
        <div class="setting-toggle add-flex">
          <router-link
            to="/admin/payment/settings/contract"
            tag="div"
            class="setting-toggle-right"
            :class="{ active: isContractSettingTab }"
          >
            Contract Setting
          </router-link>
          <router-link
            to="/admin/payment/settings/basic"
            tag="div"
            class="setting-toggle-center"
            :class="{ active: isPaymentSettingTab }"
          >
            Payment Setting
          </router-link>
          <router-link
            to="/admin/payment/settings/domain"
            tag="div"
            class="setting-toggle-left"
            :class="{ active: isDomainSettingTab }"
          >
            Domain Setting
          </router-link>
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

              <div
                v-for="(contract, chainId) in contracts"
                :key="chainId"
                class="manage-contents_item"
                :class="{ created: contractLoaded && isPublishedContract(chainId) }"
              >
                <div class="manage-contents_network add-flex a-center j-between">
                  <div class="manage-contents_logo add-flex a-center">
                    <figure>
                      <img :src="contract.icon" :alt="contract.name">
                    </figure>
                    <p>
                      {{ contract.name }}
                    </p>
                  </div>
                  <div v-if="contractLoaded">
                    <div
                      v-if="!contract.support"
                      class="manage-contents_btn other inactive"
                    >
                      Not support
                    </div>
                    <div
                      v-else-if="isPublishedContract(chainId) && isCurrentNetwork(chainId) && isContractUpdateRequest"
                      @click="updateContract(chainId)"
                      class="manage-contents_btn"
                    >
                      Update
                    </div>
                    <div
                      v-else-if="isPublishedContract(chainId) && !isContractUpdateRequest"
                      class="manage-contents_btn inactive"
                    >
                      Created
                    </div>
                    <div
                      v-else-if="isCurrentNetwork(chainId) && !contractSettings.contracts[chainId].processing"
                      @click="publishMerchantContract(chainId)"
                      class="manage-contents_btn"
                    >
                      Create
                    </div>
                    <div 
                      v-else-if="isCurrentNetwork(chainId) && contractSettings.contracts[chainId].processing"
                      class="manage-contents_btn inactive"
                    >
                    Creating...
                      <div class="contract-deploying-wrap active">
                        <img class="spin" src="@/assets/images/loading.svg">
                      </div>
                    </div>
                    <div
                      v-else
                      @click="switchNetwork(chainId)"
                      class="manage-contents_btn other"
                    >
                      switch network
                    </div>
                  </div>
                </div>
                <div class="manage-contents_address-wrap" v-if="isPublishedContract(chainId)">
                  <div class="manage-contents_address">
                    {{ contractUrl(chainId) }}
                  </div>
                  <div class="manage-contents_copy" @click="copyPaymentContractUrl(chainId)">Copy Address</div>
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
            <h4><span>*</span>Exchange margin rate</h4>
            <p>
              The margin rate to be added to the actual exchange rate.
            </p>
            <input class="text-box" type="text" v-model="paymentSettings.exchangeMarginRate">
          </div>
          <div class="manage-contents_clm mb-6">
            <h4><span>*</span>Supported Currencies</h4>
            <p>
              The fiat currencies that can be selected when the user enters the settlement amount.
            </p>
            <div class="bases-wrap">
              <div class="bases mb-1">
                <input type="checkbox" @click="selectAllCurrency" :checked="isAllowAllCurrency">
                <label for="item1">
                  All Currencies
                </label>
              </div>
              <div class="bases mb-1">
                <input type="checkbox" @click="selectCurrency($event, 'USD')" :checked="isAllowUsd">
                <label for="item2">
                  USD
                </label>
              </div>
              <div class="bases mb-1">
                <input type="checkbox" @click="selectCurrency($event, 'JPY')" :checked="isAllowJpy">
                <label for="item3">
                  JPY
                </label>
              </div>
              <div class="bases mb-1">
                <input type="checkbox" @click="selectCurrency($event, 'EUR')" :checked="isAllowEur">
                <label for="item4">
                  EUR
                </label>
              </div>
              <div class="bases mb-1">
                <input type="checkbox" @click="selectCurrency($event, 'AED')" :checked="isAllowAed">
                <label for="item5">
                  AED
                </label>
              </div>
            </div>
          </div>
          <div class="manage-contents_creat-url" @click="updatePaymentSettings">
            Save
          </div>
        </div>
        <div class="manage-domain" v-if="isDomainSettingTab">
          <div class="manage-contents_clm">
            <h4>Receiver Domain Setting</h4>
            <p>
              Please enter the your domain.
              If you have completed TXT record authentication for the domain, this domain will be exposed to the user on the payment pages.
              <br>
              Also, if the domain is not set, your account address will be displayed to the user on the payment pages.
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
              By authenticating the domain with a TXT record, the domain and authentication mark will be displayed on the payment pages.
              <br>
              If you have not completed authentication, your account address will be displayed to the user on the payment pages.
            </p>
            <div>
              <input class="text-box" type="text" v-model="domainSettings.txt" disabled>
            </div>
            <div class="manage-contents_creat-url" @click="verifyDomain">
              Check
            </div>
            <div class="verify" v-if="domainSettings.verified">
              verified
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { METAMASK, LOGIN_TOKEN, HTTP_CODES, NORMAL_TYPE_PAYMENT } from '@/constants'
import AvailableNetworks from '@/network'
import {
  BscTokens,
  EthereumTokens,
  MaticTokens,
  AvalancheTokens
} from '@/contracts/receive_tokens'
import { errorCodeList } from '@/enum/error_code'
import RequestUtility from '@/utils/request'
import MerchantContract from '@/contracts/merchant'

export default {
  name: 'AdminPaymentSetting',
  data() {
    return {
      currentTab: null,
      contractSettings: {
        loaded: false,
        contracts: {}
      },
      paymentSettings: {
        successNotifyUrl: '',
        successReturnUrl: '',
        exchangeMarginRate: '0.0',
        allowCurrencies: {
          USD: false,
          JPY: false,
          EUR: false,
          AED: false
        }
      },
      domainSettings: {
        domain: '',
        txt: '',
        verified: false
      },
      monitoringInterval: null
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    contracts() {
      return this.contractSettings.contracts
    },
    isContractSettingTab() {
      const targetPath = '/admin/payment/settings/contract'
      return this.$route.path === targetPath
    },
    isPaymentSettingTab() {
      const targetPath = '/admin/payment/settings/basic'
      return this.$route.path === targetPath
    },
    isDomainSettingTab() {
      const targetPath = '/admin/payment/settings/domain'
      return this.$route.path === targetPath
    },
    isContractUpdateRequest() {
      return process.env.VUE_APP_CONTRACT_UPDATE === 'true'
    },
    isCurrentNetwork() {
      return (chainId) => {
        return this.$store.state.web3.chainId === parseInt(chainId, 10)
      }
    },
    isPublishedContract() {
      return (chainId) => {
        return Boolean(this.contractSettings.contracts[chainId].address)
      }
    },
    isMetamask() {
      return this.$store.state.web3.provider === METAMASK
    },
    isAllowAllCurrency() {
      const denyCurrencies = Object.values(this.paymentSettings.allowCurrencies).filter((setting) => !setting)
      return denyCurrencies.length === 0
    },
    isAllowUsd() {
      return this.isAllowAllCurrency || this.paymentSettings.allowCurrencies.USD
    },
    isAllowJpy() {
      return this.isAllowAllCurrency || this.paymentSettings.allowCurrencies.JPY
    },
    isAllowEur() {
      return this.isAllowAllCurrency || this.paymentSettings.allowCurrencies.EUR
    },
    isAllowAed() {
      return this.isAllowAllCurrency || this.paymentSettings.allowCurrencies.AED
    },
    contractLoaded() {
      return this.contractSettings.loaded
    },
    contractUrl() {
      return (chainId) => {
        const contract = this.contractSettings.contracts[chainId]
        return `${contract.scanUrl}/address/${contract.address}`
      }
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
    apiUpdateContract(chainId, transactionAddress, contractAddress, contractAbi) {
      const url = `${this.baseUrl}/api/v1/management/contract/deploy/update`
      const options = { headers: { Authorization: RequestUtility.getBearer() } }
      const data = {
        address: contractAddress,
        transaction_address: transactionAddress,
        args: JSON.stringify(contractAbi),
        network_type: parseInt(chainId, 10),
        payment_type: NORMAL_TYPE_PAYMENT
      }
      return this.axios.post(url, data, options)
    },
    apiDeleteContract(chainId, contractAddress) {
      const url = `${this.baseUrl}/api/v1/management/contract`
      const options = { headers: { Authorization: RequestUtility.getBearer() } }
      const data = {
        address: contractAddress,
        network_type: parseInt(chainId, 10),
        payment_type: NORMAL_TYPE_PAYMENT
      }
      return this.axios.delete(url, data, options)
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
        exchange_margin_rate: this.paymentSettings.exchangeMarginRate,
        allow_currencies: this.paymentSettings.allowCurrencies
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
    apiRegistTransaction(chainId, transactionAddress) {
      const url = `${this.baseUrl}/api/v1/management/contract/deploy/transaction`
      const options = { headers: { Authorization: RequestUtility.getBearer() } }
      const data = {
        network_type: parseInt(chainId, 10),
        payment_type: NORMAL_TYPE_PAYMENT,
        transaction_address: transactionAddress
      }
      return this.axios.post(url, data, options)
    },
    apiGetPendingTransactions() {
      const url = `${this.baseUrl}/api/v1/management/contract/deploy/status`
      const request = { headers: { Authorization: RequestUtility.getBearer() } }
      return this.axios.get(url, request)
    },
    getPendingTransactions() {
      this.apiGetPendingTransactions().then((response) => {
          if (response.data === undefined || response.data.length == 0) {
            clearTimeout(this.monitoringInterval)
          } else {
            response.data.forEach((transaction) => {
              if(transaction.network_type in this.contractSettings.contracts) {
                this.contractSettings.contracts[transaction.network_type].processing = true
              }
            })
          }
          this.getContracts()
        }).catch((error) => {
          this.apiConnectionErrorHandler(error.response.status, error.response.data)
        })
      this.monitoringInterval = setTimeout(this.getPendingTransactions, 3000)
    },
    getContracts() {
      this.apiGetContracts().then((response) => {
        response.data.forEach((contract) => {
          if (contract.payment_type === 1 && contract.network_type in this.contractSettings.contracts) {
            this.contractSettings.contracts[contract.network_type].address = contract.address
          }
        })
        this.contractSettings.loaded = true
      }).catch((error) => {
        this.apiConnectionErrorHandler(error.response.status, error.response.data)
      })
    },
    getPaymentSettings() {
      this.apiGetPaymentSettings().then((response) => {
        this.paymentSettings.successNotifyUrl = response.data.complete_kickback_url
        this.paymentSettings.successReturnUrl = response.data.succeeded_return_url
        this.paymentSettings.exchangeMarginRate = response.data.exchange_margin_rate
        this.paymentSettings.allowCurrencies = response.data.allow_currencies
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
    publishMerchantContract(chainId) {
      this.contractSettings.contracts[chainId].processing = true
      const merchantWalletAddress = this.$store.state.account.address
      const receiveTokenAddress = this.contractSettings.contracts[chainId].support

      this.$web3.publishMerchantContract(
        this.$store.state.web3.instance,
        chainId,
        merchantWalletAddress,
        receiveTokenAddress
      ).on('transactionHash', (hash) => {
        this.apiRegistTransaction(chainId,hash).catch((error) => {
          console.log(error)
        })
      }).
      then((receipt) => {
        const merchantContractAddess = receipt.events['NewMerchantDeployed'].returnValues.merchantAddress_
        const transactionAddress = receipt.transactionHash
        const merchantContractAbi = MerchantContract.abi
        this.apiUpdateContract(
          chainId,
          transactionAddress,
          merchantContractAddess,
          merchantContractAbi,
        ).then(() => {
          this.contractSettings.contracts[chainId].address = merchantContractAddess
          this.contractSettings.contracts[chainId].processing = false
        }).catch((error) => {
          if (error.response.status !== HTTP_CODES.BAD_REQUEST) {
            this.apiConnectionErrorHandler(error.response.status, error.response.data)
          }
          if (error.response.data.errors.shift() === 3530) {
            this.contractSettings.contracts[chainId].address = merchantContractAddess
          } else {
            this.apiConnectionErrorHandler(error.response.status, error.response.data)
          }
          this.contractSettings.contracts[chainId].processing = false
        })
      }).catch(() => {
        this.$store.dispatch('modal/show', {
          target: 'error-modal',
          size: 'small',
          params: {
            message: 'Failed to create a contract.'
          }
        })
        this.contractSettings.contracts[chainId].processing = false
      })
    },
    updateContract(chainId) {
      this.contractSettings.contracts[chainId].processing = true
      const contract = this.contractSettings.contracts[chainId]
      this.apiDeleteContract(chainId, contract.address).then(() => {
        this.publishMerchantContract(chainId)
        this.contractSettings.contracts[chainId].processing = false
      })
    },
    switchNetwork(chainId) {
      if (this.isMetamask) {
        this.$web3.switchChain(
          this.$store.state.web3.instance,
          chainId
        ).then(() => {
          this.$store.dispatch('web3/updateChainId', parseInt(chainId, 10))
        })
      } else {
        this.$store.dispatch('modal/show', {
          target: 'error-modal',
          size: 'small',
          params: {
            message: 'You are using WalletConnect to connect to SlashApps, so you cannot switch networks from this screen. Please use the Wallet app to switch networks.'
          }
        })
      }
    },
    copyPaymentContractUrl(chainId) {
      this.$clipboard(this.contractUrl(chainId))
    },
    apiConnectionErrorHandler(statusCode, responseData) {
      if (statusCode === HTTP_CODES.UN_AUTHORIZED) {
        localStorage.removeItem(LOGIN_TOKEN)
        this.$router.push({ path: '/admin' })
      } else {
        if ('errors' in responseData && responseData.errors.length) {
          this.$store.dispatch('modal/show', {
            target: 'error-modal',
            size: 'small',
            params: {
              message: errorCodeList[responseData.errors.shift()].msg
            }
          })
        }
      }
    },
    selectAllCurrency($event) {
      const settingValue = $event.target.checked
      Object.keys(this.paymentSettings.allowCurrencies).forEach((currency) => {
        this.paymentSettings.allowCurrencies[currency] = settingValue
      })
    },
    selectCurrency(event, currency) {
      this.paymentSettings.allowCurrencies[currency] = event.target.checked
    }
  },
  created() {
    const receiveTokenSymbol = this.$store.state.account.receiveSymbol
    const supportStatuses = {
      [AvailableNetworks.ethereum.chainId]: (EthereumTokens[receiveTokenSymbol].address),
      [AvailableNetworks.bsc.chainId]: (BscTokens[receiveTokenSymbol].address),
      [AvailableNetworks.matic.chainId]: (MaticTokens[receiveTokenSymbol].address),
      [AvailableNetworks.avalanche.chainId]: (AvalancheTokens[receiveTokenSymbol].address)
    }
    Object.values(AvailableNetworks).forEach((network) => {
      this.$set(this.contractSettings.contracts, network.chainId, {
        name: network.name,
        address: null,
        scanUrl: network.scanUrl,
        icon: network.icon,
        processing: false,
        support: supportStatuses[network.chainId]
      })
    })
    this.getContracts()
    this.getPendingTransactions()
    this.getPaymentSettings()
    this.getDomainSettings()
  },
  beforeDestroy() {
    clearTimeout(this.monitoringInterval)
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
          font-weight: 300;
        }
        p{
          font-weight: 300;
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
      }
      &_network{
        p{
          margin-left: 16px;
          font-weight: 300;
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
        font-weight: 300;
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
        &.inactive{
          // background: var(--color_inactive) !important;
          opacity: 0.6;
          pointer-events: none !important;
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
        font-weight: 300;
        word-break: break-all;
      }
      &_copy{
        color: #8E86AD;
        font-size: 17px;
        position: relative;
        display: inline-block;
        font-weight: 300;
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
          font-weight: 300;
          margin-bottom: 16px;
          span{
            color: #B52828;
          }
        }
        p{
          font-size: 14px;
          font-weight: 300;
          margin-bottom: 24px;
          width: 70%;
        }
        .text-box{
          border-radius: 8px;
          border: 1px solid #78668D;
          width: 70%;
          padding: 12px;
          font-size: 14px;
          font-weight: 300;
          margin-bottom: 24px;
        }
        .verify{
          margin-top: 24px;
          padding-left: 32px;
          font-weight: 300;
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
    .bases-wrap{
      display: flex;
      flex-wrap: wrap;
      width: 50%;
    }
    .bases{
      position: relative;
      margin-right: 16px;
      @include media(sp) {
        width: 100%;
      }
      input[type="checkbox"] {
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
              border-color:#292536;
              background:#292536;
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
  }
}
</style>