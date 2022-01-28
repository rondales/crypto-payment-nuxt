<template>
  <div>
    <div class="toggle-btn mb-3 add-flex j-around">
      <div class="toggle-right" :class="{'active': tab === 'history'}" @click="leftTab">
        History
      </div>
      <div class="toggle-left" :class="{'active': tab === 'settings'}" @click="rightTab">
        settings
      </div>
    </div>
    <div>
      <div class="manage-content" v-if="tab === 'history'">
        <div class="search-wrap add-flex j-between">
          <div class="select-id">
            <select name="example" v-model="searchParams.variable.key">
              <option value="transaction_address">Transaction ID</option>
              <option value="order_code">Order ID</option>
            </select>
            <input type="text" v-model="searchParams.variable.value">
          </div>
          <div class="select-status add-flex">
            <div class="select-status_title">
              Status
            </div>
            <select name="example" v-model="searchParams.status.value">
              <option value="0">All</option>
              <option value="1">Payment start</option>
              <option value="2">Sent transaction</option>
              <option value="3">Mining transaction</option>
              <option value="4">Payment complete</option>
            </select>
          </div>
          <div class="select-date-wrap add-flex">
            <div class="select-date">
              <DatetimePicker
                v-model="searchParams.datetimeFrom.value"
                :id="'from'"
                :locale="'en'"
                :first-day-of-week="1"
                :format="'YYYY-MM-DD HH:mm:00'"
                :formatted="'DD/MM/YYYY HH:mm'"
                :label="'from'"
                :no-label="true"
                :no-header="true"
                :dark="true"
              ></DatetimePicker>
            </div>
            <div class="select-date">
              <DatetimePicker
                v-model="searchParams.datetimeTo.value"
                :id="'to'"
                :locale="'en'"
                :first-day-of-week="1"
                :format="'YYYY-MM-DD HH:mm:59'"
                :formatted="'DD/MM/YYYY HH:mm'"
                :label="'to'"
                :no-label="true"
                :no-header="true"
                :dark="true"
                :right="true"
              ></DatetimePicker>
            </div>
          </div>
          <div class="search-btn" @click="searchConditions">
            Search
          </div>
        </div>
        <div class="manage-function add-flex a-center">
          <div class="manage-show add-flex a-center">
            <div class="manage-show-title">
              show
            </div>
            <div class="show-select">
              <select name="show" v-model="paginateParams.perPage.value" @change="searchConditions">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div class="manage-show-unit">
              entries
            </div>
          </div>
          <div class="manage-csv" @click="createCsv">
            CSV
          </div>
        </div>
        <div class="manage-table">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Order ID</th>
                <th>Time</th>
                <th>Transaction ID</th>
                <th>Network</th>
                <th>Transaction Amount</th>
              </tr>
            </thead>
            <tbody v-if="summaries.records.length">
              <tr
                v-for="(record, index) in summaries.records"
                :key="index"
              >
                <td>
                  <div v-if="record.status === 1" class="received">
                    Payment start
                  </div>
                  <div v-if="record.status === 2" class="received">
                    Sent transaction
                  </div>
                  <div v-if="record.status === 3" class="received">
                    Mining transaction
                  </div>
                  <div v-if="record.status === 4" class="received">
                    Payment complete
                  </div>
                </td>
                <td>
                  {{record.order_code}}
                </td>
                <td>
                  {{record.updated_at | convertResultTime}}
                </td>
                <td>
                  {{record.transaction_address | omittedText}}
                </td>
                <td v-if="record.network_type === 1">
                  BNB
                <td v-else>
                  ETH
                </td>
                <td>
                  {{record.user_amount}} USTD
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination add-flex j-between a-center">
            <div class="page-count">
              Showing {{ summaries.fromItemNumber }} to {{ summaries.toItemNumber }} of {{ summaries.total }} entries
            </div>
            <div>
                <Paginate
                  :page-count="summaries.lastPageNumber"
                  :page-range="3"
                  :margin-pages="1"
                  :click-handler="clickPage"
                  :prev-text="'Previous'"
                  :next-text="'Next'"
                  :container-class="'pagenation-wrap'"
                  :prev-class="'prev-item'"
                  :page-class="'p-num'"
                  :next-class="'next-item'"
                />
            </div>
          </div>
        </div>
      </div>
      <div class="manage-setting" v-else-if="tab === 'settings'">
        <div class="setting-wrap">
          <div class="setting-toggle add-flex">
            <div class="setting-toggle-right" :class="{'active': settingTab === 'contract'}" @click="settingLeftTab">
              Contract Setting
            </div>
            <div class="setting-toggle-center" :class="{'active': settingTab === 'payment'}" @click="settingCenterTab">
              Payment Setting
            </div>
            <div class="setting-toggle-left" :class="{'active': settingTab === 'domain'}" @click="settingRightTab">
              Domain Setting
            </div>
          </div>
          <div class="manage-contents" v-if="settingTab === 'contract'">
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
                <div class="manage-contents_item" :class="{'created': createdAdress === true && $store.state.network.abbriviation === 'eth'}">
                  <div class="manage-contents_network add-flex a-center j-between">
                    <div class="manage-contents_logo add-flex a-center">
                      <figure>
                        <img src="@/assets/images/eth.svg" alt="">
                      </figure>
                      <p>
                        Ethereum Main net
                      </p>
                    </div>
                    <div @click="createAddress()" v-if="$store.state.network.abbriviation === 'eth'" class="manage-contents_btn">
                      Create
                    </div>
                    <div @click="networkValue('eth')" v-else class="manage-contents_btn other">
                      switch network
                    </div>
                  </div>
                  <div class="manage-contents_address-wrap" v-if="this.createdAdress && $store.state.network.abbriviation === 'eth'">
                    <div class="manage-contents_address">
                      {{address.eth}}
                    </div>
                    <div class="manage-contents_copy" @click="copy(address.eth)">Copy Address</div>
                  </div>
                </div>
                <div class="manage-contents_item" :class="{'created': createdAdress === true && $store.state.network.abbriviation === 'bsc'}">
                  <div class="manage-contents_network add-flex a-center j-between">
                    <div class="manage-contents_logo add-flex a-center">
                      <figure>
                        <img src="@/assets/images/bsc.svg" alt="">
                      </figure>
                      <p>
                        Binance Smart Chain Mainnet
                      </p>
                    </div>
                    <div @click="createAddress()" v-if="$store.state.network.abbriviation === 'bsc'" class="manage-contents_btn">
                      Create
                    </div>
                    <div @click="networkValue('bsc')" v-else class="manage-contents_btn other">
                      switch network
                    </div>
                  </div>
                  <div class="manage-contents_address-wrap" v-if="this.createdAdress && $store.state.network.abbriviation === 'bsc'">
                    <div class="manage-contents_address">
                      {{address.bsc}}
                    </div>
                    <div class="manage-contents_copy" @click="copy(address.bsc)">Copy Address</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="manage-payment" v-if="settingTab === 'payment'">
            <div class="manage-contents_clm">
              <h4>Success notify URL</h4>
              <p>
                URL to receive kickbacks sent by SlashPayment after payment is successed.
              </p>
              <input class="text-box" type="text" v-model="completeKickbackUrl">
            </div>
            <div class="manage-contents_clm">
              <h4>Payment success return URL</h4>
              <p>
                A URL for the user to go from SlashPayment to the merchant's website after a successful payment.
              </p>
              <input class="text-box" type="text" v-model="succeededReturnUrl">
            </div>
            <div class="manage-contents_clm">
              <h4>Payment faliure return URL</h4>
              <p>
                A URL for the user to go from SlashPayment to the merchant's website after a failure payment.
              </p>
              <input class="text-box" type="text" v-model="failuredReturnUrl">
            </div>
            <div class="manage-contents_clm">
              <h4><span>*</span>Exchange margin rate</h4>
              <p>
                The margin rate to be added to the actual exchange rate.
              </p>
              <input class="text-box" type="text" v-model="exchangeMarginRate">
            </div>
            <div class="manage-contents_creat-url" @click="savePaymentSettings">
              Save
            </div>
          </div>
          <div class="manage-domain" v-if="settingTab === 'domain'">
            <div class="manage-contents_clm">
              <h4>Receiver Domain Setting</h4>
              <p>
                Enter the request URL (POST) for the Deposit Notification API.
              </p>
              <div>
                <input class="text-box" type="text" v-model="domain">
              </div>
              <div class="manage-contents_creat-url" @click="saveDomain">
                Save
              </div>
            </div>
            <div class="manage-contents_clm">
              <h4>Prove ownership of a domain with TXT records</h4>
              <p>
                By proving the ownership of the domain with a TXT record, a certification mark will be included in the domain display on the payment screen.
              </p>
              <div>
                <input class="text-box" type="text" v-model="txtRecord" disabled>
              </div>
              <div class="manage-contents_creat-url" @click="checkDomain">
                Check
              </div>
              <div class="verify" v-if="verified">
                verify
              </div>
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
import DatetimePicker from 'vue-ctk-date-time-picker'
import '@/../node_modules/vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Paginate from 'vuejs-paginate';
import { saveAs } from 'file-saver';
import moment from 'moment'
import { errorCodeList } from '@/enum/error_code'
export default {
  name: 'PaymentTop',
  components: {
    DatetimePicker,
    Paginate
  },
  data() {
    return {
      tab: "history",
      settingTab: "contract",
      completeKickbackUrl: '',
      succeededReturnUrl: '',
      failuredReturnUrl: '',
      exchangeMarginRate: '0.0',
      domain: '',
      txtRecord: '',
      verified: false,
      summaries: {
        lastPageNumber: 0,
        fromItemNumber: null,
        toItemNumber: null,
        total: null,
        records: []
      },
      paginateParams: {
        perPage: { key: 'per_page', value: '10' },
        currentPage: { key: 'currentPage', value: '1' },
      },
      searchParams: {
        variable: { key: 'transaction_address', value: null },
        status: { key: 'status', value: '0'},
        datetimeFrom: { key: 'updated_at_from', value: null },
        datetimeTo: { key: 'updated_at_to', value: null },
        sortKey: { key: 'sort_key', value: null },
        sortType: { key: 'sort_value', value: null }
      },
      csvParams: {},
      address:{
        eth: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
        bsc: "https://bscscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189"
      },
      createdAdress: null
    };
  },
  created() {
    this.leftTab()
    this.search()
  },
  methods: {
    leftTab() {
      this.tab = "history"
    },
    rightTab() {
      this.tab = "settings"
      this.getDomainData()
      this.getPaymentData()
    },
    settingLeftTab() {
      this.settingTab = "contract"
    },
    settingCenterTab() {
      this.settingTab = "payment"
    },
    settingRightTab() {
      this.settingTab = "domain"
    },
    searchConditions() {
      this.paginateParams.currentPage.value = '1'
      this.search()
    },
    clickPage(pageNum) {
      this.paginateParams.currentPage.value = pageNum
      this.search()
    },
    search() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/management/transaction/normal'
      const inputedParams = Object.entries(this.searchParams).map(([key, param]) => {
        if (
          (param.key !== 'status' && param.value)
          || (param.key === 'status' && param.value !== '0')
        ) {
          const value = key === 'datetimeFrom' || key === 'datetimeTo'
            ? String(moment(param.value).unix())
            : param.value
          this.csvParams[param.key] = value
          return [ param.key, value ]
        }
        return false
      }).filter(param => param)
      const controlParams = Object.values(this.paginateParams).map((param) => {
        return [ param.key, param.value ]
      })
      const convertedParams = new URLSearchParams(inputedParams.concat(controlParams))

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('login_token')}`
      }
      this.axios.get(url, { headers: headers, params: convertedParams }).then((response) => {
        this.summaries.records = response.data.data
        this.summaries.total = response.data.total
        this.summaries.fromItemNumber = response.data.from
        this.summaries.toItemNumber = response.data.to
        this.summaries.lastPageNumber = response.data.last_page
      }).catch((error) => {
        if (error.response.status === 401) {
          this.logout()
        } else {
          let message
          if ('errors' in error.response.data) {
            message = errorCodeList[
              error.response.data.errors.shift()
            ].msg
          } else {
            message = 'Please try again.'
          }
          alert(message)
        }
      })
    },
    createCsv() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/management/transaction/normal/csv'
      const searchParams = Object.entries(this.csvParams).map(([key, value]) =>  {
        return [ key, value ]
      })
      const convertedParams = new URLSearchParams(searchParams)
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('login_token')}`
      }
      this.axios.get(url, { headers: headers, params: convertedParams }).then((response) => {
        const fileName = 'history_' + moment().format('DDMMYYYYhhmmss') + '.csv'
        let blob = new Blob([response.data], {type: 'text/csv;charset=utf8'})
        saveAs(blob, fileName)
      }).catch((error) => {
        if (error.response.status === 401) {
          this.logout()
        } else {
          let message
          if (error.response.status === 400) {
            message = errorCodeList[
              error.response.data.errors.shift()
            ].msg
          } else {
            message = 'Please try again.'
          }
          alert(message)
        }
      })
    },
    networkValue(currency) {
      this.$store.dispatch('selectNetwork', currency)
      this.createdAdress = false
    },
    createAddress() {
      this.createdAdress = true
    },
    copy(value) {
      this.$clipboard(value);
    },
    //@todo Split by function. #54
    getPaymentData() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/management/setting/payment'
      const data = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('login_token')
        }
      }
      this.axios.get(url, data).then((response) => {
        this.completeKickbackUrl = response.data.complete_kickback_url,
        this.succeededReturnUrl = response.data.succeeded_return_url,
        this.failuredReturnUrl = response.data.failured_return_url,
        this.exchangeMarginRate = response.data.exchange_margin_rate
      }).catch((error) => {
        if (error.response.status === 401) {
          this.logout()
        } else {
          let message
          message = 'Please try again.'
          alert(message)
        }
      })
    },
    //@todo Split by function. #54
    savePaymentSettings() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/management/setting/payment'
      const data = {
        complete_kickback_url: this.completeKickbackUrl,
        succeeded_return_url: this.succeededReturnUrl,
        failured_return_url: this.failuredReturnUrl,
        exchange_margin_rate: this.exchangeMarginRate
      }
      const options = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('login_token')
        }
      }
      this.axios.patch(url, data, options).catch((error) => {
        if (error.response.status === 401) {
          this.logout()
        } else {
          let message
          if ('errors' in error.response.data) {
            message = errorCodeList[
              error.response.data.errors.shift()
            ].msg
          } else {
            message = 'Please try again.'
          }
          alert(message)
        }
      })
    },
    //@todo Split by function. #54
    getDomainData() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/management/setting/domain'
      const data = {
        headers: {
         Authorization: 'Bearer ' + localStorage.getItem('login_token')
        }
      }
      this.axios.get(url, data).then((response) => {
        this.domain = response.data.domain
        this.txtRecord = response.data.txt
        this.verified = response.data.verified
      }).catch((error) => {
        if (error.response.status === 401) {
          this.logout()
        } else {
          let message
          message = 'Please try again.'
          alert(message)
        }
      })
    },
    //@todo Split by function. #54
    saveDomain() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/management/setting/domain'
      const data = { domain: this.domain }
      const options = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('login_token')
        }
      }
      this.axios.patch(url, data, options).then((response) => {
        this.verified = !response.data.re_verify
      }).catch((error) => {
        if (error.response.status === 401) {
          this.logout()
        } else {
          let message
          if (error.response.status === 400) {
            message = errorCodeList[
              error.response.data.errors.shift()
            ].msg
          } else {
            message = 'Please try again.'
          }
          alert(message)
        }
      })
    },
    //@todo Split by function. #54
    checkDomain() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/management/setting/domain/verify'
      const data = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('login_token')
        }
      }
      this.axios.get(url, data).then(() => {
        this.verified = true
      }).catch((error) => {
        if (error.response.status === 401) {
          this.logout(error.response.status)
        } else {
          let message
          if (error.response.status === 400) {
            this.verified = false
            message = 'Domain authentication failed.'
          } else {
            message = 'Please try again.'
          }
          alert(message)
        }
      })
    },
    logout() {
      localStorage.removeItem('login_token');
        this.$router.push({
        path: '/admin'
      })
    }
  },
  computed: {
    getItems() {
      let current = this.paginateParams.currentPage.value * this.parPage;
      let start = current - this.parPage;
      return this.items.slice(start, current);
    },
    getPageCount() {
      return Math.ceil(this.items.length / this.parPage);
    }
  },
  filters: {
    omittedText(text) {
      if (window.innerWidth <= 768) {
        return text.length > 32 ? text.slice(0, 32) + "…" : text;
      } else {
        return text;
      }
    },
    convertResultTime(value){
      return moment(value).format('DD/MM/YYYY hh:mm');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.select-date::v-deep {
  .date-time-picker {
    $base-bg-color: #191820;
    $base-font-color: #FFFFFF;
    .field-input {
      height: 35px;
      min-height: 30px;
      padding-left: 32px;
      padding-right: 0px;
      background: $base-bg-color;
      border: none !important;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: $base-font-color;
    }
    .field-clear-button {
      right: 3px;
    }
    .datepicker {
      margin-top: 4px;
    }
  }
}

.toggle-btn{
  width: 30%;
  @include media(sp) {
    width: 100%;
  }
}
.toggle-right, .toggle-left{
  cursor: pointer;
  width: 50%;
  padding-bottom: 6px;
  border-bottom: 1px solid #78668D;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  &.active{
    border-bottom: 1px solid #78668D;
    &::after{
      content: "";
      position: relative;
      bottom: -8px;
      margin-top: 10px;
      display: block;
      height: 3px;
      background: $gradation-light;
    }
  }
}
.search-wrap{
  margin-bottom: 32px;
  .select-id{
    width: 28%;
    border: 1px solid #78668D;
    position: relative;
    border-radius: 8px;
    @include media(sp) {
      width: 100%;
      margin-bottom: 16px;
    }
    &::after{
      position: absolute;
      right: 50%;
      transform: translate(-50%,0);
      content: "";
      height: 35px;
      width: 1px;
      background: #78668D;
    }
    &::before{
      position: absolute;
      content: "";
      background: url(/assets/images/down-arrow.svg) no-repeat center center;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 45%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
    select, input{
      width: 50%;
      font-size: 13px;
      line-height: 32px;
      font-weight: 100;
    }
    input{
      text-align: right;
      padding:0 4px;
    }
    select{
      padding: 0 8px;
    }
  }
  .select-status{
    width: 20%;
    border: 1px solid #78668D;
    position: relative;
    border-radius: 8px;
    @include media(sp) {
      width: 100%;
      margin-bottom: 16px;
    }
    &::after{
      position: absolute;
      right: 70%;
      transform: translate(-50%,0);
      content: "";
      height: 35px;
      width: 1px;
      background: #78668D;
      @include media(sp) {
        right: 50%;
      }
    }
    &::before{
      position: absolute;
      content: "";
      background: url(/assets/images/down-arrow.svg) no-repeat center center;
      width: 20px;
      height: 20px;
      top: 50%;
      right: 2%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
    &_title{
      width: 30%;
      font-size: 13px;
      line-height: 32px;
      font-weight: 100;
      padding: 0 8px;
      @include media(sp) {
        width: 50%;
      }
    }
    select{
      width: 70%;
      font-size: 13px;
      line-height: 32px;
      font-weight: 100;
      padding: 0 8px;
      @include media(sp) {
        width: 50%;
      }
    }
  }
  .select-date-wrap{
    width: 35%;
    position: relative;
    @include media(sp) {
      width: 100%;
      margin-bottom: 16px;
    }
    &::after{
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 2px;
      background: #fff;
    }
  }
  .select-date{
    width: 46%;
    border: 1px solid #78668D;
    position: relative;
    border-radius: 8px;
    &:nth-child(1){
      margin-right: 8%;
    }
    &::before{
      position: absolute;
      content: "";
      background: url(/assets/images/calender.svg) no-repeat center center;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 8px;
      transform: translate(0%, -50%);
      z-index: 1;
    }
  }
  .search-btn{
    font-weight: 200;
    font-size: 14px;
    line-height: 32px;
    background: $gradation-light;
    padding: 2px 12px;
    border-radius: 8px;
    cursor: pointer;
    @include media(sp) {
      width: 100%;
      text-align: center;
    }
    &:hover{
      opacity: .8;
    }
  }
}
.manage-function{
  margin-bottom: 32px;
  .manage-show{
    &-title,&-unit{
      font-size: 14px;
      font-weight: 200;
    }
    .show-select{
      position: relative;
      width: 50px;
      margin: 0 8px;
      &::before{
        position: absolute;
        content: "";
        background: url(/assets/images/down-arrow.svg) no-repeat center center;
        width: 20px;
        height: 20px;
        top: 50%;
        right: 5%;
        transform: translate(0, -50%);
        z-index: 0;
      }
    }
    select{
      font-size: 14px;
      font-weight: 200;
      width: 50px;
      border: 1px solid #78668D;
      position: relative;
      border-radius: 8px;
      padding: 8px;
    }
  }
  .manage-csv{
    width: 80px;
    text-align: center;
    padding: 8px;
    background: #58466E;
    font-weight: 200;
    font-size: 15px;
    border-radius: 8px;
    margin-left: 16px;
    cursor: pointer;
    &:hover{
      opacity: .8;
    }
  }
}
.manage-table{
  position: absolute;
  z-index: 10;
  width: calc(100% - 228px);
  @include media(sp) {
    width: 100%;
  }
  table{
    width: calc(100% - 40px);
    border-collapse: collapse;
    margin-bottom: 32px;
    display: block;
    overflow-x: auto;
    height: 50vh;
    &::-webkit-scrollbar{
      display: none;
    }
    @include media(sp) {
      width: 100%;
      overflow-x: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    thead,tbody{
      width: 100%;
      tr{
        border-bottom: 2px solid #58466E;
        th{
          font-size: 16px;
          text-align: left;
          padding-bottom: 8px;
        }
        td{
          font-size: 14px;
          padding: 16px 0;
          div{
            text-align: center;
            border-radius: 8px;
            width: 160px;
            span{
              font-size: 12px;
            }
          }
          .cancelled,.cancelled-refund{
            border: 1px solid #F75D68;
            color: #F75D68;
            padding: 4px;
          }
          .received{
            border: 1px solid #00FF3B;
            color: #00FF3B;
            padding: 16px 16px;
          }
          .received-refund{
            border: 1px solid #00FF3B;
            color: #00FF3B;
            padding: 4px 16px;
          }
        }
        th,td{
          overflow-wrap: break-word;
          font-weight: 100;
          &:nth-child(1){
            width: 22.22vw;
            padding-right: 16px;
          }
          &:nth-child(2){
            width: 11.111vw;
            padding-right: 16px;
          }
          &:nth-child(3){
            width: 11.111vw;
            padding-right: 16px;
          }
          &:nth-child(4){
            width: 27.77vw;
            padding-right: 16px;
          }
          &:nth-child(5){
            width: 11.111vw;
            padding-right: 16px;
          }
          &:nth-child(6){
            width: 16.666vw;
            padding-right: 16px;
          }
        }
      }
    }
  }
}
.pagination{
  margin-bottom: 32px;
  width: calc(100% - 40px);
  .page-count{
    font-size: 16px;
    font-weight: 300;
  }
  .pagenation-wrap{
    font-weight: 300;
    font-size: 16px;
  }
}
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
<style lang="scss">
.prev-item {
  font-size: 16px;
  margin: 0 8px;
  display: inline;
}

.next-item {
  font-size: 16px;
  margin: 0 8px;
  display: inline;
}

.p-num{
  padding: 8px;
  font-size: 13px;
  border-radius: 8px;
  display: inline;
  cursor: pointer;
  &.active{
    background: #4E455A;
  }
}
</style>