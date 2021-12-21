<template>
  <div class="payment_handleprice">
    <div v-if="!paid" class="payment_desc mb-3">
      <p>
        Enter the payment amount
      </p>
      <span>&#128591;</span>
    </div>
    <div class="payment_handleprice-pricewrap">
      <p v-if="!paid" class="mb-3">How much would you pay?</p>
      <div v-if="!paid" class="payment_handleprice-price add-flex border j-between">
        <input v-model="price" class="price" type="text" placeholder="0">
        <div class="add-flex currency a-center">
          <figure>
            <img :src="selected.images">
          </figure>
          <select name="currency" v-model="selected">
            <option disabled value="">{{selected.name}}</option>
            <option v-for="(currency, key) in currencys" :value="currency" :key="key">
              {{ currency.name }}
            </option>
          </select>
        </div>
      </div>
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
        <div class="usdt-price" :class="{'inactive': changedPrice && !paid}">
          <p>
            {{ price }}
          </p>
        </div>
      </div>
      <div v-if="!changedPrice && !paid" class="payment-with">
        Payment with Web3 Wallet
      </div>
      <div v-if="!paid">
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
        <button :class="{'inactive': changedPrice}" class="btn __g __l" @click="handlePayment">
          <img v-if="!changedPrice" src="@/assets/images/slash-s.svg" alt="">
          <img v-if="changedPrice" src="@/assets/images/slash-s_inactive.svg" alt="">
          Go Payment
        </button>
      </div>
    </div>
    <div class="payment_receiptwrap" v-if="paid">
      <div class="payment_desc mb-2 mt-1">
        <p>
          Do you want a receipt?
        </p>
        <span>&#x1F9FE;</span>
      </div>
      <div class="payment_receipt">
        <p class="mb-1">
          Email address to receive receipt
        </p>
        <div class="payment_receipt_form border mb-2">
          <input v-model="mail" class="mail" type="text" placeholder="your@mail.com">
        </div>
      </div>
      <button class="btn __g __l inactive mb-2" @click="sendMail" :class="{'active': mail}">
        Yes required
      </button>
      <button class="btn __g __l" @click="next">
        Not required
        <div class="loading-wrap" :class="{'active': loading}">
          <img class="spin" src="@/assets/images/loading.svg">
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentPriceHandler',
  data() {
    return{
      receiveData: null,
      success: false,
      mail: "",
      paid: false,
      changedPrice: false,
      selected: {name: "JPY", images: require('@/assets/images/JPY.svg')},
      price: 0,
      loading: false,
      currencys: [
        {
          name: "JPY",
          images: require('@/assets/images/JPY.svg'),
        },
        {
          name: "USD",
          images: require('@/assets/images/USD.svg'),
        },
        {
          name: "EUR",
          images: require('@/assets/images/EUR.svg'),
        }
      ]
    }
  },
  methods: {
    updatePrice(){
      location.reload();
    },
    handlePayment(){
      this.paid = true;
    },
    sendMail(){
      this.$router.push({
        path: 'payment/wallets',
      })
    },
    next(){
      this.loading = true;
      this.$router.push({
        path: 'payment/wallets',
      })
    },
    async getReceiveData(){
      const config = {
        method: 'get',
        baseURL: process.env.VUE_APP_API_BASE_URL,
        url: '/api/v1/payment',
        params: {
          payment_token: this.$route.params.token
        }
      }
      // @todo Error handling will be discussed separately
      await this.axios(config).then(response => (this.receiveData = response.data))
    },
    setReceiveData() {
      this.$store.dispatch('setReceiveData', this.receiveData)
    },
    switchScreen() {
      if (this.receiveData.amount !== null && this.receiveData.symbol !== null) {
        this.paid = true
      }
    },
    publishTransaction(){
      // Functions for connecting to the "Transaction Publish API(Handled by Web App Team)
    },
    updateTransactionForAmountData(){
      // Functions for connecting to the "Transaction Update API(Handled by Web App Team)
    },
    updateTransactionForReceiptData(){
      // Functions for connecting to the "Transaction Update API(Handled by Web App Team)
    }
  },
  async created(){
    await this.getReceiveData();
    this.setReceiveData();
    this.switchScreen();

    const self = this;
    setTimeout(() => {
      self.changedPrice = true;
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
    input{
      line-height: 53px;
      height: 53px;
      font-weight: 500;
      font-size: 18px;
      width: 65%;
      padding-left: 16px;
      @include media(sp) {
        width: 55%;
      }
    }
    .currency{
      width: 35%;
      line-height: 53px;
      position: relative;
      &::before{
        position: absolute;
        content: "";
        width: 1px;
        height: 33px;
        background: #6B6B6C;
        left: -12px;
      }
      &::after{
        content: "▲";
        position: absolute;
        right: 12px;
        color: #6B6B6C;
        font-size: 14px;
        transform: rotate(-180deg);
      }
      figure{
        line-height: 53px;
        position: absolute;
        img{
          padding-top: 14px;
        }
      }
      select{
        padding-left: 36px;
        font-weight: 400;
        width: 100%;
        border: none;
        outline: none;
      }
    }
    span{
      vertical-align: middle;
      font-size: 11px;
    }
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
  .payment-with{
    text-align: center;
    font-size: 18px;
    font-weight: 200;
    padding-top: 8px;
    padding-bottom: 24px;
  }

  .payment_receiptwrap{
    width: 100%;
  }
  .payment_receipt{
    p{
      font-size: 15px;
    }
    &_form{
      height: 56px;
      .mail{
        height: 51px;
        padding: 0 16px;
        font-size: 15px;
        width: 100%;
      }
    }
  }
  .btn{
    position: relative;
  }
}

</style>