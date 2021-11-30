<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title mb-0">
        Payment detail
      </h3>
    </div>
    <div class="body">
      <div class="token-content">
        <div class="payment_detail add-flex j-between a-center">
          <div class="payment_detail_name add-flex j-between a-center">
            <div class="payment_detail_logo">
              <img src="@/assets/images/usdt.png" alt="">
            </div>
            <dl>
              <dt>
                Total Payment（0.1%Fees included）
              </dt>
              <dd>
                1001.00
              </dd>
            </dl>
          </div>
          <div class="payment_detail-price">
            <span>
              USDT
            </span>
          </div>
        </div>
          <span class="detail-arrow">
            <img src="@/assets/images/detail-arrow.svg" alt="">
          </span>
        <div class="payment_detail add-flex j-between a-center mb-2">
          <div class="payment_detail_name add-flex j-between a-center">
            <div class="payment_detail_logo">
              <img src="@/assets/images/usdt.png" alt="">
            </div>
            <dl>
              <dt>
                Total Payment（0.1%Fees included）
              </dt>
              <dd>
                1001.00
              </dd>
            </dl>
          </div>
          <div class="payment_detail-price">
            <span>
              USDT
            </span>
          </div>
        </div>
        <div class="dattail-lists">
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
          <div class="dattail-list add-flex j-between mb-1">
            <p>Platform Fee</p>
            <p>0.0004735 BNB</p>
          </div>
          <p class="dattail-list_desc">
            Output is estimated. You will receive at least 1001.00 USDT or the transaction will revert.            
          </p>
        </div>
      </div>
      <div class="btn __g __l" @click="openModal('waiting-modal')">
        Confirm Pay
      </div>
    </div>
    <button class="close" @click="closeModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
  </div>
</template>

<script>
  export default {
    name: 'walletModal',
    components: {
    },
    data() {
      return {
        num: "",
        basesValues: "",
        coinValues: ""
      };
    },    
    computed: {
      classes() {
        const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
        return classes
      }
    },
    methods: {
      closeModal() {
        this.$store.dispatch('closeModal')
      },
      connectWithMetamask() {
          sessionStorage.setItem("provider", "metamask");
          this.$store.dispatch("onLogin", {
            provider: "metamask",
          });        
        // .catch(errorMetamaskModal.vue)
      },
      connectWithWalletConnect() {
        sessionStorage.setItem("provider", "wallet_connect");
        this.$store.dispatch("onLogin", {
          provider: "metamask",
        });
        // .catch(errorWalletModal.vue)
      },
      openModal(target) {
        this.$store.dispatch("openModal", {target: target, size: "small"});
        this.$store.dispatch("selectBases", this.basesValues)
      },
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .modal-box {
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color_bg);
    @include media(pc) {
      &.--small {
        width: 470px;
      }
      &.--medium {
        width: 760px;
      }
    }
    @include media(sp) {
      width: calc(100vw - 32px);
    }

  }
  .header {
    @include media(pc) {
      padding: 24px 24px 0;
      &__title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      &__desc {
        font-size: 2rem;
      }
    }
    @include media(sp) {
      padding: 18px;
      &__title {
        font-size: 1.7rem;
      }
    }
    &__title {
      font-weight: 500;
    }
    &__desc {
      font-weight: 100;
    }
  }
  .close {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 0;

    @include media(pc) {
      top: 30px;
      right: 24px;
    }
    @include media(sp) {
      top: 24px;
      right: 24px;
    }
  }
  .body {
    @include media(pc) {
      padding: 24px 24px 40px;
    }
    @include media(sp) {
      padding: 16px 12px 48px;
    }
    .detail-arrow{
      img{
        vertical-align: middle;
        margin-left: 10px;
        margin-bottom: 2px ;
      }
    }
    .dattail-lists{
      .dattail-list{
        p{
          font-size: 10px;
          img{
            margin-left: 8px;
          }
        }
      }
      .dattail-list_desc{
        font-size: 10px;
        padding-bottom: 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid #78668D;
      }      
    }
    .payment_detail{
      .payment_detail_name{
        width: 70%;
      }
      .payment_detail_logo{
        width: 14%;
        img{
          border-radius: 8px;
        }
      }
      dl{
        width: 80%;
        margin-left: 16px;
        dt{
          font-size: 10px;
        }
        dd{
          font-size: 21px;
        }
      }
      .payment_detail-price{
        font-weight: 100;
      }
    }
  }
</style>