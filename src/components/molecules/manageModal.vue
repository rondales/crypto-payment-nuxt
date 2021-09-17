<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Manage
      </h3>
    </div>
    <div class="body">
      <div class="toggle-btn mb-3 add-flex j-around">
        <div class="toggle-right" :class="{'active': tab === 'list'}" @click="leftTab">
          Lists
        </div>
        <div class="toggle-left" :class="{'active': tab === 'tokens'}" @click="rightTab">
          Tokens
        </div>
      </div>
      <div class="manage-content" v-if="tab === 'list'">
        <input class="token-dsc border" type="text" value="" placeholder="https:// or ipfs:// or ENS name" >
        <div class="add-flex j-around manage-lists mb-2">
          <div class="manage-image">
            <img src="@/assets/images/none-token.jpg" alt="">
          </div>
          <div class="manage-list">
            <p class="manage-token">Gemini Token List</p>
            <br>
            <p class="manage-count">
              28 tokens
              <span>
                <img src="@/assets/images/setting.svg">
              </span>
            </p>
          </div>
          <div class="manage-toggle">
            <div class="switchArea">
              <input type="checkbox" id="switch1">
              <label for="switch1"><span></span></label>
            </div>          
          </div>
        </div>
        <div class="add-flex j-around manage-lists">
          <div class="manage-image">
            <img src="@/assets/images/none-token.jpg" alt="">
          </div>
          <div class="manage-list">
            <p class="manage-token">Gemini Token List</p>
            <br>
            <p class="manage-count">
              28 tokens
              <span>
                <img src="@/assets/images/setting.svg">
              </span>
            </p>
          </div>
          <div class="manage-toggle">
            <div class="switchArea">
              <input type="checkbox" id="switch2">
              <label for="switch2"><span></span></label>
            </div>          
          </div>
        </div>        
      </div>
      <div class="manage-content" v-else-if="tab === 'tokens'">
        <input class="token-dsc border" type="text" value="" placeholder="0x0000" >
        <div class="manage-wrap">
          <ul class="manage-title add-flex j-between mb-2">
            <li>1 Custom Token</li>
            <li>Clea all</li>
          </ul>
          <ul class="manage-item add-flex a-center j-between">
            <li>SAUNA</li>
            <li class="manage-item--right add-flex a-center j-between">
              <figure>
                <img src="@/assets/images/trash.svg">
              </figure>
              <figure>
                <img src="@/assets/images/link-icon.svg">
              </figure>
            </li>
          </ul>
        </div>        
      </div>
    </div>
    <button class="close" @click="closeModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
    <button class="back" @click="backModal('token-modal')">
      <img src="@/assets/images/right-arrow.svg">
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
        tab: "list",
        currentState: false,
        myDataVariable: false,
      };
    },    
    computed: {
      classes() {
        const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
        return classes
      },
      checkedValue: {
          get() {
              return this.defaultState
          },
          set(newValue) {
              this.currentState = newValue;
          }
      }      
    },
    methods: {
      closeModal() {
        this.$store.dispatch('closeModal')
      },
      backModal(target){
        this.$store.dispatch("openModal", {target: target, size: "small"});
      },
      leftTab(){
        this.tab = "list"
        this.isActive = true
      },
      rightTab(){
        this.tab = "tokens"
        this.isActive = true
      },
    },
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
        width: 420px;
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
      padding: 16px 18px 18px;
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
  .header__title{
    text-align: center;
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
  .back{
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 0;
    @include media(pc) {
      top: 30px;
      left: 24px;
    }
    @include media(sp) {
      top: 24px;
      left: 24px;
    }    
  }
  .body {
    @include media(pc) {
      padding: 24px 24px 40px;
    }
    @include media(sp) {
      padding: 16px 12px 48px;
    }
    .toggle-btn{
      background: #352D40;
      padding: 8px;
      border-radius: 10px;
    }
    .token-dsc{
      font-size: 14px;
      font-weight: 100;
      padding: 16px;
      margin-bottom: 24px;
      width: 100%;
    }
    .toggle-right,.toggle-left{
      width: 48%;
      text-align: center;
      height: 46px;
      line-height: 46px;
      margin: 0 1%;
      border-radius: 10px;
      cursor: pointer;
      &.active{
        background: #4E455A;
      }
    }
    .manage-content{
      .manage-title{
        font-size: 14px;
      }
      .manage-item{
        font-size: 14px;
        width: 98%;
        margin-left: 2%;
      }
      .manage-item--right{
        width: 15%;
      }      
    }
    .manage-lists{
      background: #008AE9;
      padding: 16px 8px;
      border-radius: 8px;
    }
    .manage-list{
      line-height: 12px;
      margin-top: 4px;
      .manage-token{
        font-size: 17px;
      }
      .manage-count{
        font-size: 11px;
      }
    }
    .manage-toggle{
      .switchArea {
        line-height: 40px;
        letter-spacing: 0;
        text-align: center;
        font-size: 17px;
        position: relative;
        margin: auto;
        width: 80px;
        input[type="checkbox"] {
          display: none;  
        }        
        label {
          display: block;
          box-sizing: border-box;
          height: 44px;
          border: 2px solid #292536;
          border-radius: 30px;
          background: #292536;
          &::before {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            background: #fff;
            top: 11px;
            left: 8px;
            border-radius: 26px;
            transition: .2s;
          }           
        }     
        label span:after{
          content: "OFF";
          padding: 0 0 0 24px;
          color: #fff;
        } 
        input[type="checkbox"]:checked + label span:after{
          content: "ON";
          padding: 0 24px 0 0;
          color: #fff;
        }     
        input[type="checkbox"]:checked ~ label::before {
          transform: translateX(44px);  
          background: #fff;        
        }                               
      }
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