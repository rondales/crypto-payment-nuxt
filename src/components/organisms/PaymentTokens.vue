<template>
  <div>
    <div class="payment_pay add-flex border j-between" v-if="$store.state.network === 'none'">
      <div class="payment_pay_name add-flex j-between a-center">
        <div class="payment_usdt_logo">
          <img src="@/assets/images/none.svg" alt="">
        </div>
        <dl>
          <dt>
            Pay amount（est.）
          </dt>
          <dd>
            <button class="btn __g" v-if="!network" @click="openModal('network-modal')">
              Select a Token
            </button>
            <button class="btn __g" v-if="network" @click="openModal('network-modal')">
              Select Network
            </button>          
          </dd>
        </dl>
      </div>
      <div class="payment_network border">
        <p>
          *Select the network and token you want to use to make the payment.
        </p>
      </div>
    </div>

    <div class="payment_pay slected border" v-if="$store.state.network === 'eth'">
      <div class="payment_pd add-flex j-between">
        <div class="payment_pay_name add-flex j-between a-center mb-2">
          <div class="payment_usdt_logo" v-if="$store.state.bases.length === 0">
            <img src="@/assets/images/eth.svg" alt="">
          </div>
          <div class="payment_usdt_logo" v-else>
            <img :src="require(`@/assets/images/symbol/${$store.state.bases}.svg`)" alt="">
          </div>
          <dl>
            <dt>
              Pay amount（est.）
            </dt>
            <dd>
              <button v-if="$store.state.bases.length === 0" class="btn __g" @click="tokenModal('token-modal')">
                Select a Token
              </button>
              <button v-else class="bases-state" @click="tokenModal('token-modal')">
                {{$store.state.bases}}
                <span>
                  <img src="@/assets/images/under-arrow.svg" alt="">
                </span>
              </button>
            </dd>
          </dl>
        </div>
        <div v-if="!$store.state.bases" class="payment_network sp-lh border mb-2">
          <p class="bold-desc">
            Ethereum Main net
          </p>
        </div>
        <div v-else class="payment_usdt-price border j-between balance">
          <input type="text">
          <span>
            Balance：900021.00 SYMBOL
          </span>

          <div class="equivalent green" v-if="!equivalent">＝ 1000 USD equivalent</div>          
          <div class="equivalent red" v-if="!equivalent">＝ 651 USDT equivalent</div>          
        </div>         
        <div class="payment_rate add-flex j-between a-center" v-if="$store.state.bases">
          <p>
            Uniswap Exchamge Rate
          </p>
          <span>
            1 USDT ＝ 5000 SYMBOL 
            <img src="@/assets/images/exchange.svg" alt="">
          </span>
        </div>
      </div>
    </div>

    <div class="payment_pay add-flex border j-between" v-if="$store.state.network === 'bsc'">
      <div class="payment_pay_name add-flex j-between a-center">
        <div class="payment_usdt_logo">
          <img src="@/assets/images/bsc.svg" alt="">
        </div>
        <dl>
          <dt>
            Pay amount（est.）
          </dt>
          <dd>
            <button class="btn __g" @click="tokenModal('detail-modal')">
              Select Network
            </button>
          </dd>
        </dl>
      </div>
      <div class="payment_network sp-lh border">
        <p class="bold-desc">
          Binance Smart Chain Mainnet
        </p>
      </div>
    </div>    
  </div>
  

</template>

<script>
export default {
  name: 'PaymentUsdt',
    data() {
      return{
        success: false,
        network: true,
        equivalent: true,
      }
    },
  components: {
  },
  methods: {
    openModal(target) {
      this.$store.dispatch("openModal", {target: target, size: "medium"});
    },
    tokenModal(target) {
      this.$store.dispatch("openModal", {target: target, size: "small"});
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.payment-arrow{
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translate(0, -50%);
}
.payment_pay {
  padding: 24px;
  &.slected{
    padding: 0 !important;
  }
    dl{
      dt{
        font-weight: 400;
        font-size: 15px;
      }
    }  
    .payment_usdt_name{
      width: 28%;
    @include media(sp) {
      width: 100%;
      justify-content: flex-start;
    }      
    }
    .bases-state{
      span{
        img{
          vertical-align: middle;
        }
      }
    }
    .payment_pay_name{
      @include media(sp) {
        margin-bottom: 16px;
      }
    }
    .payment_usdt_logo{
      img{
        border-radius: 8px;
      }
      @include media(sp) {
        margin-right: 16px;
      }
    }
    .payment_usdt-price{
      padding: 10px 16px;
      min-width: 410px;
      span{
        vertical-align: middle;
        font-size: 11px;
      }
    }
    .payment_network{
      padding: 12px 16px;
      min-width: 410px;
      @include media(sp) {
        width: 100%;
        min-width: auto;
        line-height: 16px;
        &.sp-lh{
          line-height: 32px;
        }
      }      
      p{
        font-size: 10px;
        font-weight: 100;
        display: inline;
        height: 100%;    
      }    
    }
    .payment_rate{
      width: 100%;
      padding: 10px 0 10px;
      font-size: 10px;
      position: relative;
      &::after{
        position: absolute;
        top: 0;
        content: "";
        height: 1px;
        width: 100%;
        background: #78668D;
      }
    }
}
.payment_usdt{
  dl{
    dd{
      font-size: 25px;
    }
  }  
}
.payment_pay{
  margin-bottom: 16px;
  .payment_pd{
    padding: 24px 24px 0;
  }
  &_name{
    width: 34%;
    @include media(sp) {
      width: 100%;
      justify-content: flex-start;
    }       
  }
  dl{
    dt{
      margin-bottom: 8px;
    }
    dd{
    }
  }
}
</style>