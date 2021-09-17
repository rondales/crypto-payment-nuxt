<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title mb-0">
        Select a token
      </h3>
    </div>
    <div class="body">
      <div class="token-dsc border">
        Search name or paste address
      </div>
      <div class="token-content">
        <p class="token-head">Common bases</p>
        <div class="add-flex j-flexstart mb-2">
          <div class="bases mb-1">
            <input type="radio" id="item1" value="WBNB" v-model="basesValues">
            <label for="item1">WBNB</label>
          </div>
          <div class="bases mb-1">
            <input type="radio" id="item2" value="DAI" v-model="basesValues">
            <label for="item2">DAI</label>
          </div>
          <div class="bases mb-1">
            <input type="radio" id="item3" value="BUSD" v-model="basesValues">
            <label for="item3">BUSD</label>
          </div>
          <div class="bases mb-1">
            <input type="radio" id="item4" value="USDC" v-model="basesValues">
            <label for="item4">USDC</label>  
          </div>
          <div class="bases">
            <input type="radio" id="item5" value="USDT" v-model="basesValues">
            <label for="item5">USDT</label>
          </div>
          <div class="bases">
            <input type="radio" id="item6" value="BTCB" v-model="basesValues">
            <label for="item6">BTCB</label>  
          </div>
          <div class="bases">
            <input type="radio" id="item7" value="WETH" v-model="basesValues">
            <label for="item7">WETH</label>                     
          </div>
        </div>
        <div class="token-coins">
          <div class="token-coin add-flex j-between a-center">
            <div class="token-coin-name">
              <input type="radio" id="coin01" value="bnb1" v-model="coinValues">
              <label for="coin01">BNB</label>
              <p>
                Binance Coin
              </p>
            </div>
            <div class="token-coin-price">
              <p>
                0.4959
              </p>
            </div>
          </div>
          <div class="token-coin add-flex j-between a-center">
            <div class="token-coin-name">
              <input type="radio" id="coin02" value="bnb2" v-model="coinValues">
              <label for="coin02">BNB</label>
              <p>
                Binance Coin
              </p>
            </div>
            <div class="token-coin-price">
              <p>
                0.4959
              </p>
            </div>
          </div>
          <div class="token-coin add-flex j-between a-center">
            <div class="token-coin-name">
              <input type="radio" id="coin03" value="bnb3" v-model="coinValues">
              <label for="coin03">BNB</label>
              <p>
                Binance Coin
              </p>
            </div>
            <div class="token-coin-price">
              <p>
                0.4959
              </p>
            </div>
          </div>
          <div class="token-coin add-flex j-between a-center">
            <div class="token-coin-name">
              <input type="radio" id="coin04" value="bnb4" v-model="coinValues">
              <label for="coin04">BNB</label>
              <p>
                Binance Coin
              </p>
            </div>
            <div class="token-coin-price">
              <p>
                0.4959
              </p>
            </div>
          </div>
          <div class="token-coin add-flex j-between a-center">
            <div class="token-coin-name">
              <input type="radio" id="coin05" value="bnb5" v-model="coinValues">
              <label for="coin05">BNB</label>
              <p>
                Binance Coin
              </p>
            </div>
            <div class="token-coin-price">
              <p>
                0.4959
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn __g __l" @click="openModal('manage-modal')">
        Manage Token Lists
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
    background:$light-black;
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
        font-size: 2.5rem;
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
    .token-dsc{
      font-size: 14px;
      font-weight: 100;
      padding: 16px;
      margin-bottom: 24px;
    }
    .token-head{
      font-size: 14px;
      font-weight: 100;
      margin-bottom: 16px;
    }
    .bases{
      width: 25%;
      input[type="radio"] {
        position: absolute;
        opacity: 0;
        font-size: 14px;
        + label {
          &:before {
            content: '';
            background: #f4f4f4;
            border-radius: 8px;
            border: 1px solid darken(#f4f4f4, 25%);
            display: inline-block;
            width: 1.4em;
            height: 1.4em;
            position: relative;
            top: 4px;
            margin-right: 8px; 
            cursor: pointer;
            text-align: center;
            transition: all 250ms ease;
          }
        }
        &:checked {
          + label {
            &:before {
              border-radius: 100%;
              background-color: #3197EE;
              box-shadow: inset 0 0 0 4px #f4f4f4;
            }
          }
        }
        &:focus {
          + label {
            &:before {
              border-radius: 8px;
              outline: none;
              border-color: #3197EE;
            }
          }
        }
        &:disabled {
          + label {
            &:before {
              box-shadow: inset 0 0 0 4px #f4f4f4;
              border-color: darken(#f4f4f4, 25%);
              background: darken(#f4f4f4, 25%);
            }
          }
        }
        + label {
          font-size: 14px;
          cursor: pointer;
          &:empty {
            &:before {
              margin-right: 0;
            }
          }
        }
      }
    }
    .token-coins{
      width: 88%;
      margin: 0 auto 24px;
      height: 200px;
      overflow-y: scroll;      
      @include media(sp) {
        height: 230px;
      }
    }
    .token-coin{
      margin-bottom: 16px;
      position: relative;
      input[type="radio"] {
        position: absolute;
        opacity: 0;
        font-size: 14px;
        &:checked {
          + label {
            &:before {
              border-radius: 8px;
              background-color: #3197EE;
              box-shadow: inset 0 0 0 4px #f4f4f4;
            }
          }
        }
        &:focus {
          + label {
            &:before {
              border-radius: 8px;
              outline: none;
              border-color: #3197EE;
            }
          }
        }
        &:disabled {
          + label {
            &:before {
              box-shadow: inset 0 0 0 4px #f4f4f4;
              border-color: darken(#f4f4f4, 25%);
              background: darken(#f4f4f4, 25%);
            }
          }
        }
        label {
          font-size: 14px;
          cursor: pointer;
          &:empty {
            &:before {
              margin-right: 0;
            }
          }
        }          
      }
      label {
        &:before {
          content: '';
          background: #f4f4f4;
          border-radius: 8px;
          border: 1px solid #b4b4b4;
          display: inline-block;
          width: 3rem;
          height: 3rem;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(0,-50%);
          cursor: pointer;
          text-align: center;
          transition: all 250ms ease;
        }
      }    
    }
    .token-coin-name{
      width: 50%;
      margin-left: 12%;
      font-size: 14px;
      font-weight: 200;
    }
    .token-coin-price{
      font-size: 16px;
    }
  }
  .footer {
    text-align: center;
    @include media(pc) {
      padding: 0 40px 40px;
    }
    @include media(sp) {
      padding: 0 32px 32px;
    }
  }
</style>