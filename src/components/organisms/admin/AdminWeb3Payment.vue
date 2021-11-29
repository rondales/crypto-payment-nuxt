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
            <select name="example">
              <option value="transaction">Transaction ID</option>
              <option value="order">Order ID</option>
            </select>
            <input type="text">
          </div>
          <div class="select-status add-flex">
            <div class="select-status_title">
              Status
            </div>
            <select name="example">
              <option value="0">All</option>
              <option value="1">Cancelled</option>
              <option value="2">Cancelled to Refund</option>
              <option value="3">System Received</option>            
              <option value="4">System Receivedto Refund</option>
            </select>
          </div>
          <div class="select-date-wrap add-flex">
            <div class="select-date">
              <Datepicker         
                :monday-first="true"
                :placeholder="this.datePickerFormat"
                format="dd-MM-yyyy"
              ></Datepicker>      
            </div>
            <div class="select-date">
              <Datepicker         
                :monday-first="true"
                :placeholder="this.datePickerFormat"
                format="dd-MM-yyyy"
              ></Datepicker>      
            </div>    
          </div>
          <div class="search-btn" @click="search">
            Search
          </div>
        </div>
        <div class="manage-function add-flex a-center">
          <div class="manage-show add-flex a-center">
            <div class="manage-show-title">
              show
            </div>
            <div class="show-select">
              <select name="show">
                <option value="0">10</option>
                <option value="1">25</option>
                <option value="2">50</option>
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
            <tbody>
              <tr
                v-for="(column, index) in columns"
                :key="index"
              >
                <td>
                  <div v-if="column.status === 0" class="cancelled">
                    Cancelled
                    <br>
                    <span>
                      (Time over)
                    </span>
                  </div>
                  <div v-if="column.status === 1" class="received">
                    System Received
                  </div>
                  <div v-if="column.status === 2" class="cancelled-refund">
                    Cancelled to Refund
                    <br>
                    <span>
                      (Amount short)
                    </span>
                  </div>
                  <div v-if="column.status === 3" class="received-refund">
                    System Received 
                    <br class="sp">
                    to refund
                  </div>
                </td>
                <td>
                  {{column.orderId}}
                </td>
                <td>
                  {{column.time}}
                </td>
                <td>
                  {{column.transactionID | omittedText}}
                </td>
                <td>
                  {{column.network}}
                </td>
                <td>
                  {{column.amount}} USTD
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination add-flex j-between a-center">
            <div class="page-count">
              Showing {{pageNum}} to 10 of 274 entries
            </div>
            <div>
              <div class="pagenation-wrap">
                <span class="prev-item" @click="prev">
                  Previous
                </span>
                <span v-for="page of 6" :key="page" class="p-num" :class="{ 'active': pageNum === page }" @click="changePage(page)">
                  {{page}}
                </span>
                <span class="next-item" @click="next">
                  Next
                </span>
              </div>
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
                  <div class="manage-contents_address-wrap"  v-if="this.createdAdress && $store.state.network.abbriviation === 'eth'">
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
              <h4><span>*</span>success notify URL</h4>
              <p>
                Enter the request URL (POST) for the Deposit Notification API.
              </p>
              <input class="text-box" type="text">
            </div>
            <div class="manage-contents_clm">
              <h4><span>*</span>Return URL</h4>
              <p>
                Enter the URL to return to the merchant’s site from the speed payment page.
              </p>
              <input class="text-box" type="text">
            </div> 
            <div class="manage-contents_clm">
              <h4><span>*</span>Acceptance error notify URL</h4>
              <p>
                Enter the request URL (POST) to notify the error data in case of a reception error.
              </p>
              <input class="text-box" type="text">
            </div>
            <div class="manage-contents_clm">
              <h4><span>*</span>Acceptance error return URL</h4>
              <p>
                Enter the URL that you want to post the user to in the event of a reception error. The error content is sent with the request body.
              </p>
              <input class="text-box" type="text">
            </div>
            <div class="manage-contents_creat-url">
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
                <input class="text-box" type="text">
              </div>
              <div class="manage-contents_creat-url">
                Save
              </div>
            </div>
            <div class="manage-contents_clm">
              <h4>Prove ownership of a domain with TXT records</h4>
              <p>
                By proving the ownership of the domain with a TXT record, a certification mark will be included in the domain display on the payment screen.
              </p>
              <div>
                <input class="text-box" type="text">
              </div>
              <div class="manage-contents_creat-url">
                Save
              </div>
              <div class="verify">
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
import Datepicker from 'vuejs-datepicker';
export default {
  name: 'PaymentTop',
  components: {
    Datepicker
  },  
  data() {
    return {
      tab: "history",
      currentState: false,
      myDataVariable: false,
      datePickerFormat: 'dd-MM-yyyy',
      pageNum: 1,
      settingTab:"contract",
      columns: [
        {
          status: 0,
          orderId: 1661,
          time: "30/9/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "BNB",
          amount: 45.83,
        },
        {
          status: 1,
          orderId: 1662,
          time: "31/9/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "ETH",
          amount: 46.83,
        },
        {
          status: 2,
          orderId: 1663,
          time: "01/10/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "BNB",
          amount: 48.83,
        },
        {
          status: 3,
          orderId: 1664,
          time: "02/10/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "ETH",
          amount: 47.83,
        },
        {
          status: 0,
          orderId: 1661,
          time: "30/9/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "BNB",
          amount: 45.83,
        },
        {
          status: 1,
          orderId: 1662,
          time: "31/9/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "ETH",
          amount: 46.83,
        },
        {
          status: 2,
          orderId: 1663,
          time: "01/10/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "BNB",
          amount: 48.83,
        },
        {
          status: 3,
          orderId: 1664,
          time: "02/10/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "ETH",
          amount: 47.83,
        },
        {
          status: 0,
          orderId: 1661,
          time: "30/9/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "BNB",
          amount: 45.83,
        },
        {
          status: 1,
          orderId: 1662,
          time: "31/9/2021 00:00",
          transactionID: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
          network: "ETH",
          amount: 46.83,
        },
      ],
      address:{
        eth: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189",
        bsc: "https://bscscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189"
      },
      createdAdress: null
    };
  }, 
  methods: {
    leftTab(){
      this.tab = "history"
    },
    rightTab(){
      this.tab = "settings"
    },
    settingLeftTab(){
      this.settingTab = "contract"
    },
    settingCenterTab(){
      this.settingTab = "payment"
    },    
    settingRightTab(){
      this.settingTab = "domain"
    },
    search(){
    },
    createCsv(){
    },
    changePage(page) {
      if(this.pageNum === page){
        this.pageNum = null;
      }else{
        this.pageNum = page;
      }      
      this.current = page;
    },
    prev(){
    },
    next(){
    },
    networkValue(currency) {
      this.$store.dispatch('selectNetwork', currency)
      this.createdAdress = false
    },
    createAddress(){
      this.createdAdress = true
    },
    copy(value) {
      this.$clipboard(value);
    },    
  },
  filters: {
    omittedText(text) {
      if (window.innerWidth <= 768) {
        return text.length > 32 ? text.slice(0, 32) + "…" : text;
      } else {
        return text;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

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
      height: 32px;
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
      z-index: -1;
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
      height: 32px;
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
      z-index: -1;
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
    width: 30%;
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
      z-index: -1;
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
        z-index: -1;
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
  overflow-x: auto;
  @include media(sp) {
    width: calc(100% - 24px);
    padding-bottom: 120px;
  }
  table{
    width: calc(100% - 40px);
    border-collapse: collapse;
    margin-bottom: 32px;
    @include media(sp) {
      overflow-x: scroll;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      width: 1200px;      
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
            max-width: calc(22.22vw - 16px);
            padding-right: 16px;
          }
          &:nth-child(2){
            width: 11.111vw;
            max-width: calc(11.111vw - 16px); 
            padding-right: 16px;
          }
          &:nth-child(3){
            width: 11.111vw;
            max-width: calc(11.111vw - 16px);
            padding-right: 16px;
          }
          &:nth-child(4){
            width: 27.77vw;
            max-width: calc(27.77vw - 16px);
            padding-right: 16px;
          }
          &:nth-child(5){
            width: 11.111vw;
            max-width: calc(11.111vw - 16px);
            padding-right: 16px;
          }
          &:nth-child(6){
            width: 16.666vw;
            max-width: calc(16.666vw - 16px);
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
    .prev-item{
      font-size: 16px;
      margin: 0 8px;
    }
    .next-item{
      font-size: 16px;
      margin: 0 8px;
    }
    i{
      font-size: 11px;
    }
    .p-num{
      padding: 8px;
      font-size: 13px;
      border-radius: 8px;
      cursor: pointer;
      &.active{
        background: #4E455A;
      }
    }
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
  .vdp-datepicker{
    input{
      font-size: 14px;
      font-weight: 300;
      width: 100%;
      padding: 0 4px 0 36px;
      line-height: 32px;
    }
  }
  .prev,.next{
    background: #fff !important;
  }
  .day__month_btn,.month__year_btn{
    &:hover{
      background: #000 !important;
      opacity: .8;
    }
  } 
  .vdp-datepicker__calendar {
    background: #000 !important;
    right: 10px;
  }
</style>