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
        <div class="usdt-price" :class="{'inactive': changedPrice}">
          <p>
            {{ price }}
          </p>
        </div>
      </div>
      <div class="payment_balancewrap">
        <div class="payment_desc add-flex j-between mb-2">
          <p class="grd">
            Your Balance
          </p>
          <figure class="reload" @click="reload">
            <img src="@/assets/images/reload.svg" alt="">
          </figure>
        </div>
        <div class="payment_balance add-flex j-between mb-1">
          <div class="payment_balance-name add-flex a-center mb-2">
            <figure>
              <img :src="tokenIcon">
            </figure>
            <p>
              {{abbriviation}}
            </p>
          </div>
          <div class="payment_balance-value">
            <p>
              Balance : {{balancePrice}} {{abbriviation}}
            </p>
            <p>
              equivalent : {{equivalent}} USDT
            </p>
          </div>
        </div>
        <div class="payment_balance-topken border mb-2">
          <div class="payment_balance-tokenname add-flex j-between">
            <p>
              SAUNA
            </p>
            <div class="payment_balance-equivalent">
              1000 USD equivalent
            </div>
          </div>
          <div class="payment_balance-price">
            10000.00
          </div>
        </div>
        <div class="payment-box" v-if="changedPrice">
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
        <button :class="{'inactive': changedPrice}" class="btn __g __l mb-2" @click="sendToken">
          Go Exchange to Payment
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
  name: 'PaymentExchange',
    data() {
      return{
        Receiver: "E-check.online",
        paid: false,
        changedPrice: false,
        price: 0,
        invoiceId: "",
        abbriviation: "",
        tokenIcon: "",
        tokenName: "",
        balancePrice: 2340,
        equivalent: 2340,
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
    updatePrice(){
      console.log("update")
    },
    sendToken(){
      this.$router.push(
        {
          path: 'detail',
          query: {
            abbriviation: this.abbriviation,
            icon: this.tokenIcon,
            name: this.tokenName,
            id: this.invoiceId,
            price: this.price,
          }
        }
      );
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
  .reload{
    cursor: pointer;
  }
  .payment_balance{
    &-name{
      p{
        font-size: 16px;
        font-weight: 100;
        margin-left: 16px;
      }
    }
    &-value{
      font-size: 13px;
      font-weight: 100;
      margin-left: 16px;
    }
    &-topken{
      width: 100%;
      padding: 12px;
    }
    &-tokenname{
      p{
        font-size: 16px;
      }
    }
    &-equivalent{
      color: #01F63A;
      font-weight: 100;
      font-size: 11px;
    }
    &-price{
      text-align: right;
      width: 100%;
      font-weight: 100;
      font-size: 24px;
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
}
</style>