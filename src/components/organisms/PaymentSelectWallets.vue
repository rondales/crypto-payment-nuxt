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
      <div class="payment-with">
        Connect Web3 wallet to make a payment
      </div>
      <button class="btn __m __pg icon-right full" @click="connectWithMetamask">
        <div class="loading-wrap" :class="{'active': loadingMeta}">
          <img class="spin mt" src="@/assets/images/loading.svg">
        </div>        
        <span class="btn-icon">
          <img src="@/assets/images/metamask-fox.svg">
        </span>
          MetaMask
      </button>
      <button class="btn __m __pg icon-right full" @click="connectWithWalletConnect">
        <div class="loading-wrap" :class="{'active': loadingWallet}">
          <img class="spin mt" src="@/assets/images/loading.svg">
        </div>        
        <span class="btn-icon">
          <img src="@/assets/images/wallet-connect_w.svg">
        </span>
          WalletConnect
      </button>      
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

export default {
  name: 'PaymentPriceHandler',
    data() {
      return{
        success: false,
        Receiver: "E-check.online",
        mail: "",
        paid: false,
        changedPrice: false,
        selected: {name: "JPY", images: require('@/assets/images/JPY.svg')},
        price: 1000.00,
        invoiceId: "hogehogefugafuga",
        loadingMeta: false,
        loadingWallet: false,
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
  components: {
  },
  mounted(){

  },
  methods: {
    updatePrice(){
      location.reload();
    },
    handlePayment(){
      this.paid = true;
    },
    connectWithMetamask() {
      this.$store.dispatch('onLogin', {});
      this.$router.push(
        {
          path: 'token',
          query: {
            id: this.invoiceId,
            price: this.price
          }
        }
      );
      this.loadingMeta = true;
      /////////// connect metamask
      // if (typeof window.ethereum !== 'undefined') {
      //   const web3 = new Web3(window.ethereum);
      //   web3.eth.requestAccounts().then((accounts) => {
      //     sessionStorage.setItem('provider', 'metamask');
      //     this.$store.dispatch('onLogin', {
      //       provider: web3,
      //       walletAddress: accounts[0]
      //     });
      //   }).catch(() => {
      //     this.$store.dispatch('openModal', {target: 'error-metamask-modal', size: 'small'});
      //   });
      // } else {
      //   this.$store.dispatch('openModal', {target: 'error-metamask-modal', size: 'small'});
      // }
    },    
    async connectWithWalletConnect() {
      this.loadingWallet = true;
      const provider = new WalletConnectProvider({
        infuraId: process.env.VUE_APP_INFURA_ID,
        rpc: {
          56: 'https://bsc-dataseed.binance.org',
          97: 'https://data-seed-prebsc-1-s1.binance.org:8545'
        }
      });

      let accounts;
      try {
        accounts = await provider.enable()
      } catch {
        this.$store.dispatch('openModal', {target: 'error-wallet-modal', size: 'small'});
        return;
      }
      const web3 = new Web3(provider);
      sessionStorage.setItem("provider", "wallet_connect");
      this.$store.dispatch("onLogin", {
        provider: web3,
        walletAddress: accounts[0]
      });
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
    font-size: 15px;
    font-weight: 100;
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
}

</style>