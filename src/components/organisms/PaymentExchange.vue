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
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/reload.svg">
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/reload-l.svg">
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
        <button :class="{'inactive': changedPrice}" class="btn __g __l mb-2" @click="sendTokenItems">
          Go Exchange to Payment
          <div class="loading-wrap" :class="{'active': loading}">
            <img class="spin" src="@/assets/images/loading.svg">
          </div>
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
/*
@todo Web3ConnectTeam

In this page, you need to implement the following process or function.

1. Check the balance of the token selected on the previous page
2. Exchange to USDT(Exchange Uni swap)
3. Check if the selected token has enough USDT payment amount
4. Transition to the payment details screen
*/
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
        loading: false
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
      location.reload();
    },
    sendTokenItems(){
      this.loading = true;
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