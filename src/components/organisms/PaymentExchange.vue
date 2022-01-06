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
              {{ symbol }}
            </dd>
          </dl>
        </div>
        <div class="usdt-price" :class="{'inactive': changedPrice}">
          <p>
            {{ amount }}
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
              {{ selectedSymbol }}
            </p>
          </div>
          <div class="payment_balance-value">
            <p>
              Balance : {{balancePrice}} {{ selectedSymbol }}
            </p>
            <p>
              equivalent : {{equivalent}} USDT
            </p>
          </div>
        </div>
        <div class="payment_balance-topken border mb-2">
          <div class="payment_balance-tokenname add-flex j-between">
            <p>
              {{ selectedSymbol }}
            </p>
            <div class="payment_balance-equivalent">
              {{ amount }} USD equivalent
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
      changedPrice: false,
      tokenIcon: '',
      balancePrice: 2340,
      equivalent: 2340,
      loading: false
    }
  },
  computed: {
    symbol() {
      return this.$store.state.paymentData.base_symbol
    },
    amount() {
      return this.$store.state.paymentData.base_amount
    },
    selectedSymbol() {
      return this.$store.state.paymentData.selectTokenSymbol
    }
  },
  methods: {
    reload(){
      location.reload();
    },
    updatePrice(){
      location.reload();
    },
    sendTokenItems(){
      const paymentData = this.$store.state.paymentData

      this.$store.dispatch('setPaymentTokenAmount', 1000.11)

      this.loading = true;
      this.$router.push(
        {
          path: '/payment/detail/' + this.$route.params.token,
          query: {
            receiver: paymentData.merchantDomain,
            code: paymentData.orderCode,
            symbol: paymentData.base_symbol,
            amount: paymentData.base_amount,
            token: paymentData.selectTokenSymbol,
            token_amount: 1000.11,
          }
        }
      );
    },
  },
  created(){
    // @todo Implement a process to determine the token icon
    const params = {
      receiver: this.$route.query.receiver,
      orderCode: this.$route.query.order_code,
      symbol: this.$route.query.symbol,
      amount: this.$route.query.amount,
      email: this.$route.query.email,
      selectTokenSymbol: this.$route.query.token
    }
    this.$store.dispatch('setPaymentData', params)

    setTimeout(() => {
      this.changedPrice = true;
    }, 3000);
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