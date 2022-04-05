<template>
  <div class="store">
    <div class="title-gradation">
      Slash Store Apps 
    </div>
    <p class="store-desc">
      Your sales deposit address
      <span>
        （*Currently logged in Web3 address）
      </span>
    </p>
    <div class="store-copy">
      {{$store.state.account.address}}
      <img src="@/assets/images/copy.svg">
    </div>
    <p class="store-desc">
      Slash Store Apps Login Deeplink Issuance
    </p>
    <div class="comfirm-wrap">
      <div class="confirm-btn">
        Confirm
      </div>
      <p>
        In order to activate the Slash Store Apps, you must issue a deep link to activate your account. If you are using the same account on multiple devices, please issue multiple deeplinks.
      </p>
    </div>

    <div class="manage-content">
      <div class="search-wrap add-flex j-between">
        <div class="manage-function add-flex a-center">
          <div class="manage-show add-flex a-center">
            <div class="manage-show-title">
              show
            </div>
            <div class="show-select">
              <select @change="searchHistory">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div class="manage-show-unit">
              entries
            </div>
          </div>
        </div>
        <div class="select-status add-flex">
          <div class="select-status_title">
            Status
          </div>
          <select v-model="searchParams.status.value">
            <option value="0">All</option>
            <option value="1">Active</option>
            <option value="2">invalid</option>
            <option value="3">invitation</option>
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
        <div class="search-btn" @click="searchHistory()">
          Search
        </div>
      </div>
      <div class="manage-table">
        <table>
          <thead>
            <tr>
              <th>QR／URL</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Note</th>
              <th>Other Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img class="qricon" src="@/assets/images/store-qricon.png">
                <span>
                  https://slash.fi/store_apps/de51c6e1d6ef6wc26ec1e51vc5e15ve3f463ef43
                </span>
                <img src="@/assets/images/copy.svg">
              </td>
              <td>
                <div class="status-active">
                  Active
                </div>
              </td>
              <td>
                30/9/2021 00:00
              </td>
              <td>
                In order to activate the Slash Store Apps, you must issue a deep link to activate your…. 
              </td>
              <td>
                aaaaaaaaaaaaaaaaaaaa
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import '@/../node_modules/vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import DatetimePicker from 'vue-ctk-date-time-picker'
import { NETWORKS, HTTP_CODES, LOGIN_TOKEN } from '@/constants'
import { errorCodeList } from '@/enum/error_code'
import RequestUtility from '@/utils/request'
import moment from 'moment'
import NumberFormat from 'number-format.js'

export default {
  name: 'AdminTransactionHistory',
  components: {
    DatetimePicker,
  },
  data() {
    return {
      searchParams: {
        variable: { key: 'transaction_address', value: null },
        status: { key: 'status', value: '0'},
        datetimeFrom: { key: 'updated_at_from', value: null },
        datetimeTo: { key: 'updated_at_to', value: null },
        sortKey: { key: 'sort_key', value: null },
        sortType: { key: 'sort_value', value: null }
      },
      paginateParams: {
        perPage: {value: '10' },
      },
      summaries: {
        lastPageNumber: 0,
        fromItemNumber: null,
        toItemNumber: null,
        total: null,
        records: [
          {}
        ]
      }
    }
  },
  filters: {
    decimalFormat(amount) {
      return NumberFormat('0.00', amount)
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    network() {
      return (chainId) => {
        return chainId ? NETWORKS[chainId].symbol : ''
      }
    },
    scanSiteUrl() {
      return (chainId, transactionHash) => {
        if (chainId && transactionHash) {
          return `${NETWORKS[chainId].scanUrl}/tx/${transactionHash}`
        } else {
          return ''
        }
      }
    },
  },
  methods: {
    apiGetHistory() {
      const url = `${this.baseUrl}/api/v1/management/transaction/normal`
      const inputedParams = Object.entries(this.searchParams).map(([key, param]) => {
          if (
            (param.key !== 'status' && param.value) ||
            (param.key === 'status' && param.value !== '0')
          ) {
            const value = key === 'datetimeFrom' || key === 'datetimeTo'
              ? String(moment(param.value).unix())
              : param.value
            this.csvParams[param.key] = value
            return [ param.key, value ]
          }
        }).filter(param => param)
      const controlParams = Object.values(this.paginateParams).map((param) => {
        return [ param.key, param.value ]
      })
      const timezoneParam = [[ 'offset', moment().utcOffset() ]]
      const convertedParams = new URLSearchParams(inputedParams.concat(controlParams, timezoneParam))
      const request = {
        headers: { Authorization: RequestUtility.getBearer() },
        params: convertedParams
      }
      return this.axios.get(url, request)
    },
    searchHistory() {
      this.apiGetHistory().then((response) => {
        this.summaries.records = response.data.data
        this.summaries.total = response.data.total
        this.summaries.fromItemNumber = response.data.from
        this.summaries.toItemNumber = response.data.to
        this.summaries.lastPageNumber = response.data.last_page
      }).catch((error) => {
        if (error.response.status !== HTTP_CODES.UN_AUTHORIZED) {
          const message = 'errors' in error.response.data
            ? errorCodeList[error.response.data.errors.shift()].msg
            : 'Please try again.'
          this.$store.dispatch('modal/show', {
            target: 'error-modal',
            size: 'small',
            params: {
              message: message
            }
          })
        } else {
          localStorage.removeItem(LOGIN_TOKEN)
          this.$router.push({ path: '/admin' })
        }
      })
    },
  },
  created() {
    this.searchHistory()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.title-gradation{
  background: $gradation-light;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 150% 150%;
  font-weight: 600;
  display: inline-block;
  font-size: 24px;
  margin-bottom: 16px;
}
.store-desc{
  font-size: 20px;
  margin-bottom: 32px;
  span{
    font-size: 15px;
  }
}
.store-copy{
  background: #292536;
  display: inline-block;
  padding: 12px 16px;
  font-size: 13px;
  width: 60%;
  border-radius: 8px;
  margin-bottom: 32px;
  img{
    float: right;
  }
}
.comfirm-wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: #292536;
  border-radius: 8px;
  margin-bottom: 48px;
  p{
    font-size: 12px;
    font-weight: 300;
    width: 75%;
    line-height: 1.7;
  }
}
.confirm-btn{
  font-weight: 400;
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  background: $gradation-light;
  border-radius: 8px;
  cursor: pointer;
  width: 200px;
  text-align: center;
  @include media(sp) {
    width: 100%;
    text-align: center;
  }
  &:hover{
    opacity: .8;
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
      font-weight: 300;
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
      left: 95%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
    &_title{
      width: 30%;
      font-size: 13px;
      line-height: 32px;
      font-weight: 300;
      padding: 0 8px;
      @include media(sp) {
        width: 50%;
      }
    }
    select{
      width: 70%;
      font-size: 13px;
      line-height: 32px;
      font-weight: 300;
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

.select-date::v-deep {
  .date-time-picker {
    $base-bg-color: #161421;
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

.manage-function{
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
}

.manage-table{
  position: absolute;
  z-index: 10;
  width: calc(100% - 228px);
  @include media(sp) {
    width: 100%;
    overflow: hidden;
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
          font-size: 10px;
          padding: 16px 0;
          div{
            text-align: left;
            border-radius: 8px;
            width: 160px;
            font-weight: 300;
            span{
              font-size: 12px;
            }
          }
          .cancelled,.cancelled-refund{
            border: 1px solid #F75D68;
            color: #F75D68;
            padding: 16px 16px;
          }
          .cancelled-refund{
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
          font-weight: 400;
          &:nth-child(1){
            display: flex;
            align-items: center;
            width: 25vw;
            .qricon{
              widows: 30px;
              height: 30px;
            }
            span{
              width: 220px;
              padding: 0 16px;
              font-weight: 300;
            }
            @include media(sp) {
              width:200px;
            }
          }
          &:nth-child(2){
            width: 11.111vw;
            .status-active{
              color: #4CAF50;
            }
            @include media(sp) {
              width:200px;
            }
          }
          &:nth-child(3){
            width: 11.111vw;
            @include media(sp) {
              width:200px;
            }
          }
          &:nth-child(4){
            width: 27.77vw;
            @include media(sp) {
              width:200px;
            }
          }
          &:nth-child(5){
            width: 11.111vw;
            @include media(sp) {
              width:200px;
            }
          }
          &:nth-child(6){
            width: 16.666vw;
            @include media(sp) {
              width:200px;
            }
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