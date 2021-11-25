<template>
  <div class="payment_handleprice">
    <div class="payment_handleprice-pricewrap">
      <div class="add-flex j-between billed a-center">
        <div class="add-flex j-between a-center">
          <figure>
            <img src="@/assets/images/usdt.png" alt="">
          </figure>
          <dl>
            <dt>
              Amount billed
            </dt>
            <dd>
              USDT
            </dd>
          </dl>
        </div>
        <div class="usdt-price" :class="{'inactive': changedPrice && !processing}">
          <p>
            {{ price }}
          </p>
        </div>
      </div>
      <div class="payment_detailwrap">
        <div class="payment_desc add-flex j-between mb-2">
          <p class="grd">
            Payment detail
          </p>
          <figure class="reload" @click="reload">
            <img src="@/assets/images/reload.svg" alt="">
          </figure>
        </div>
        <div class="payment_detail add-flex j-between mb-1">
          <div class="payment_detail-name add-flex a-center mb-1">
            <figure>
              <img :src="tokenIcon">
            </figure>
            <p>
              {{abbriviation}}
            </p>
          </div>
          <div class="payment_detail-value">
            <p>
              23400.00
            </p>
          </div>
        </div>
        <div class="payment-box" v-if="changedPrice && !processing">
          <div class="add-flex a-center j-between">
            <div class="add-flex a-center">
              <img src="@/assets/images/warning.svg" alt="">
              <div class="payment-box_desc">
                <p>
                  Price Updated
                </p>
              </div>
            </div>
            <div class="payment-box_btn" @click="updatePrice">
              Accept
            </div>          
          </div>
        </div>
        <div class="dattail-lists mt-1" v-if="!processing">
          <div class="dattail-list add-flex j-between mb-1">
            <p>Exchange Eate</p>
            <p>1USDT＝ 1USDT<img src="@/assets/images/exchange.svg" alt=""></p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Route</p>
            <p>BNB ⇨ BUSD</p>
          </div>
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
          <div class="dattail-list add-flex j-between mb-1">
            <p>xSUSHI Fee</p>
            <p>0.0004735 BNB%</p>
          </div>
          <div class="dattail-list add-flex j-between mb-1">
            <p>Slippage tolerance</p>
            <p>0.50%</p>
          </div>
          <div class="dattail-list add-flex j-between mb-2">
            <p>Platform Fee</p>
            <p>0.0004735 BNB</p>
          </div>
          <p class="dattail-list_desc">
            Output is estimated. You will receive at least 1001.00 USDT or the transaction will revert.            
          </p>
        </div>
        <div class="payment-status mt-3 mb-3" v-if="processing">
          <img class="mb-2 spin" src="@/assets/images/loading.svg" v-if="processing && status === 0" alt="">
          <p class="payment-status_title" v-if="processing && status === 0">
            Waiting for Confimation
          </p>
          <p class="payment-status_desc mb-2" v-if="processing && status === 0">
            Pay 1000.00 USDT for 1000.00 USDT
          </p>

          <img class="mb-2" src="@/assets/images/check.svg" v-if="processing && status === 1" alt="">
          <p class="payment-status_title mb-1" v-if="processing && status === 1">
            Transaction Submitted
          </p>

          <img class="mb-2" src="@/assets/images/multiply.svg" v-if="processing && status === 2" alt="">
          <p class="payment-status_desc mb-2" v-if="processing && status === 2">
            The transaction cannot succeed due to error: execution 
            <br>
            reverted: PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT.
          </p>

          <a href="/" class="payment-status_btn">
            View on explorer
            <img src="@/assets/images/link-icon.svg" alt="">
          </a>
        </div>
        <button :class="{'inactive': changedPrice}" class="btn __g __l mb-2" @click="pushData" v-if="!processing">
          Confirm Wallet
        </button>
        <button class="btn __g __l mb-2 inactive" v-if="processing && status === 0">
          processing…
        </button>
        <button class="btn __g __l mb-2" @click="pushData" v-if="processing && status === 1">
          Back to Payee’s Services
        </button>
        <button class="btn __g __l mb-2" @click="pushData" v-if="processing && status === 2">
          Try again
        </button>
        <p class="via">
          via Uniswap：Slash Payment 
          <span>
            <img src="@/assets/images/slash-s.svg" alt="">
          </span>
        </p>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentDetail',
    data() {
      return{
        Receiver: "E-check.online",
        paid: false,
        changedPrice: false,
        balancePrice: 2340,
        price: 0,
        invoiceId: "",
        abbriviation: "",
        tokenIcon: "",
        tokenName: "",
        processing: false,
        status: 0,
      }
    },
  components: {
  },
  created(){
    const self = this;
    setTimeout(() => {
      self.changedPrice = true;
    }, 3000);
  },  
  mounted(){
    this.price = this.$route.query.price;
    this.invoiceId = this.$route.query.id;
    this.abbriviation = this.$route.query.abbriviation;
    this.tokenIcon = this.$route.query.icon;
    this.tokenName = this.$route.query.name;
  },  
  methods: {
    reload(){
      location.reload();
    },
    pushData(){
      this.processing = true;
      setTimeout(() => {
        this.status = 2;
      }, 3000);
    },
    updatePrice(){
      location.reload();
    },    
  },
  filters: {
    maskText(text) {
      text = "*************";
      return text;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.payment_handleprice{
  width: 100%;
  dl{
    dt{
      font-weight: 400;
      font-size: 15px;
    }
  }  

  .payment_desc{
    p{
      background: $gradation-pale;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;   
      display: inline;
    }
  }
  .payment_handleprice-pricewrap{
    width: 100%;
  }
  .payment_handleprice-price{
    padding: 0;
    width: 100%;
    min-width: auto;
  }
  .billed{
    padding-bottom: 16px;
    margin:24px 0 16px;
    border-bottom: 1px solid #78668D;
    figure{
      img{
        height: 46px;
        width: 46px;
        border-radius: 50%;
      }
    }
    dl{
      margin-left: 16px;
      dt{
        font-size: 10px;
        font-weight: 100;
      }
      dd{
        font-size: 18px;
        font-weight: 300;
      }
    }
    .usdt-price{
      font-size: 18px;
      font-weight: 300;
      color: #fff;
      &.inactive{
        color: $dark-gray;
      }
    }
  }
  .payment-box{
    background: #4E455A;
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 16px;
    width: 100%;
    &_desc{
      font-size: 16px;
      padding-left: 8px;
    }
    &_btn{
      cursor: pointer;
      font-size: 14px;
      font-weight: 200;
      background: $gradation-light;
      padding: 4px 24px;
      border-radius: 20px;
    }
  }
  .dattail-lists{
    .dattail-list{
      p{
        font-size: 11px;
        font-weight: 100;
        img{
          margin-left: 8px;
        }
      }
    }
    .dattail-list_desc{
      font-size: 11px;
      font-weight: 100;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }      
  }  
  .reload{
    cursor: pointer;
  }
  .payment_detail{
    &-name{
      p{
        font-size: 16px;
        font-weight: 100;
        margin-left: 16px;
      }
    }
    &-value{
      font-size: 20px;
      font-weight: 100;
      margin-left: 16px;
    }
  }
  .payment-status{
    text-align: center;
    margin: auto;
    &_title{
      font-size: 18px;
      font-weight: 100;
    }
    &_desc{
      font-size: 10px;
      font-weight: 100;
    }
    &_btn{
      font-size: 12px;
      font-weight: 100;
      cursor: pointer;
      background: $gradation-pale;
      padding: 4px 16px;
      border-radius: 12px;
      color: #fff;
      img{
        vertical-align: middle;
      }
    }
  }
  .via{
    font-size: 12px;
    font-weight: 100;
    text-align: center;
    img{
      width: 20px;
      height: 20px;
    }
  }
  .spin{
    animation: 3s linear infinite spin;
  }

  @keyframes spin {
    from { transform: rotateZ(0deg); }
    to { transform: rotateZ(360deg); }
  }  
}
</style>