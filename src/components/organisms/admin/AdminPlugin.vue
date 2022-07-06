<template>
  <div>
    <div v-if="isSlectDisplay">
      <div class="plugin-title">
        <div class="title">
          Slash Plug-in Contract Factory
        </div>
        <p class="desc">
          The introduction and operation of plug-ins to the Slash protocol requires a certain level of advanced knowledge. Please use at your own risk.
        </p>
      </div>
      <div class="plugin-items">
        <div class="plugin-item" v-for="(item, index) in plugins" :key="index">
          <figure>
            <img :src="item.image">
          </figure>
          <h3>
            {{item.name}}
          </h3>
          <p>
            {{item.description}}
          </p>
          <button class="plugin-btn" :class="{active: item.active}" @click="detailDisplay">
            {{item.btnName}}
          </button>
        </div>
      </div>
    </div>

    <div v-if="!isSlectDisplay" class="plugin-details">
      <h2 @click="buckSlectDisplay" class="details-title mb-4">
        <img src="@/assets/images/left-arrow.svg">
        <p>
          Plug in Store
        </p>
      </h2>
      <div class="details-body">
        <div class="details-head">
          <div class="details-main">
            <div class="details-main-left">
              <figure>
                <img src="@/assets/images/plugin-icon/split.png">
              </figure>
              <dl>
                <dt>
                  Split
                </dt>
                <dd>
                  By Slash Vision
                </dd>
              </dl>
            </div>
            <button class="details-btn">
              Go Apps
            </button>
          </div>
          <div class="details-dsc">
            <p>
              Added split function to Slash protocolAdded split function to Slash protocolAdded split function to Slash protocolction to Slash protocolction to Slash protocolctio…
            </p>
          </div>
        </div>
        <div class="details-content">
          <div class="toggle-btn mb-3 add-flex j-around">
            <div class="toggle-right" @click="isSelect('1')" :class="{ active: isActive === '1' }">
              Details
            </div>
            <div class="toggle-center" @click="isSelect('2')" :class="{ active: isActive === '2' }">
              Developer
            </div>
            <div class="toggle-left" @click="isSelect('3')" :class="{ active: isActive === '3' }">
              Support
            </div>
          </div>
          <div class="manage-contents" v-if="isActive === '1'">
            This plugin is a split contract that can be set up as a Slash payee. By deploying this contract in each network and configuring it for each payee, you can split the payee addresses.This plugin is a split contract that can be set up as a Slash payee. By deploying this contract in each network and configuring it for each payee, you can split the payee addresses.This plugin is a split contract that can be set up as a Slash payee. By deploying this contract in each network and configuring it for each payee, you can split the payee addresses.This plugin is a split contract that can be set up as a Slash payee. By deploying this contract in each network and configuring it for each payee, you can split the payee addresses.This plugin is a split contract that can be set up as a Slash payee. By deploying this contract in each network and configuring it for each payee, you can split the payee addresses.This plugin is a split contract that can be set up as a 
          </div>
          <div class="manage-contents" v-else-if="isActive === '2'">
            hoge
          </div>
          <div class="manage-contents" v-else-if="isActive === '3'">
            fuga
          </div>
        </div>
      </div>
      <div class="bottom-wrap">
        <a class="bottom-link">
          <span>
            Go Apps
          </span>
          <figure>
            <img src="@/assets/images/arrow-r.svg" alt="">
          </figure>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Plugin',
  data() {
    return{
      plugins: [
        {
          name: "Split",
          image: "/img/plugin-icon/split.svg",
          description: "This plugin is a split contract that can be set up as a Slash payee. By deploying this contract in each network and configuring it for each payee, you can split the payee addresses.",
          active: true,
          btnName: "Details",
        },
        {
          name: "NFT Split",
          image: "/img/plugin-icon/nft-split.svg",
          description: "This plugin is a NFT Validation contract that can be set up as a Slash payee. Once this contract is installed in each network, Slash payments can only be made at the wallet address that holds a specific NFT.",
          active: false,
          btnName: "Now development　🛠",
        },
        {
          name: "NFT Validation",
          image: "/img/plugin-icon/nft-validation.svg",
          description: "This plugin is a NFT Validation contract that can be set up as a Slash payee. Once this contract is installed in each network, Slash payments can only be made at the wallet address that holds a specific NFT.",
          active: false,
          btnName: "Now development　🛠",
        },
        {
          name: "Development Methods",
          image: "/img/plugin-icon/gears.svg",
          description: "An interface for developing useful plug-ins using the Slash protocol is available. Plug-in developers can check here.",
          active: true,
          btnName: "Documents　📄",
        },
        {
          name: "Your own piggy bank",
          image: "/img/plugin-icon/piggy-bank.svg",
          description: "This plugin is a piggy bank contract that can be set up as a Slash payee. Installing this contract on each network will lock the settled TOKEN until the date and time you set.",
          active: false,
          btnName: "Documents　📄",
        },
      ],
      isSlectDisplay: false,
      isActive: '1'
    }
  },
  methods: {
    isSelect(num) {
      this.isActive = num;
    },
    buckSlectDisplay(){
      this.isSlectDisplay = true;
    },
    detailDisplay(){
      this.isSlectDisplay = false;
    }
  },
  computed: {
    isContractSettingTab() {
      return true
    },
    isPaymentSettingTab() {
      return true
    },
    isDomainSettingTab() {
      return true
    },
  },
  created() {
  },
  filters: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.keys-wrap{
  margin-bottom: 48px;
}

.title{
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 16px;
}

.desc{
  font-size: 17px;
  font-weight: 300;
  margin-bottom: 32px;
}

.plugin-items{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .plugin-item{
    width: 32%;
    text-align: center;
    background: #292536;
    padding: 32px 16px 24px 16px;
    border-radius: 8px;
    @include media(sp) {
      width: 100%;
    }
    &:nth-child(-n + 3){
      margin-bottom: 32px !important;
    }
    &:nth-child(2),&:nth-child(5){
      margin: 0 2%;
    }
    figure{
      margin-bottom: 16px;
    }
    h3{
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    p{
      font-size: 10px;
      text-align: left;
      font-weight: 400;
      margin-bottom: 16px;
      height: 64px;
    }
    .plugin-btn{
      font-weight: 400;
      font-size: 15px;
      padding: 6px 0;
      width: 100%;
      text-align: center;
      border-radius: 8px;
      height: 58px;
      background: #5D5D5D;
      pointer-events: none;
      &.active{
        background: linear-gradient(90.25deg, #3EB9FC 5.43%, #6A68ED 59.32%, #8B2AE1 98.19%);
        cursor: pointer;
        pointer-events: all;
      }
    }
  }
}
.plugin-details{
  max-width: 850px;
  .details-title{
    display: flex;
    font-size: 22px;
    font-weight: 300;
    margin-bottom: 16px;
    p{
      margin-left: 16px;
    }
  }
  .details-body{
    .details-head{
      padding: 24px;
      background: #292536;
      border-radius: 8px;
      margin-bottom: 40px;
      .details-main{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-bottom: 24px;
      }
      .details-main-left{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        @include media(sp) {
          width: 100%;
          margin-bottom: 16px;
        }
        dl{
          margin-left: 32px;
          dt{
            font-size: 26px;
            margin-bottom: 8px;
          }
          dd{
            font-weight: 300;
          }
        }
      }
      .details-dsc{
        font-size: 15px;
        font-weight: 200;
      }
    }
    .details-btn{
      font-weight: 400;
      font-size: 16px;
      padding: 6px 0;
      width: 200px;
      text-align: center;
      border-radius: 8px;
      height: 52px;
      background: $gradation-orange;
      cursor: pointer;
      pointer-events: all;
    }
    .details-content{
      max-width: 850px;
      .toggle-btn{
        width: 100%;
        @include media(sp) {
          width: 100%;
        }
      }
      .toggle-right,.toggle-center,.toggle-left{
        cursor: pointer;
        width: 33.333%;
        padding-bottom: 6px;
        border-bottom: 1px solid #78668D;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        &.active{
          border-bottom: 1px solid #78668D;
          &::after{
            content: "";
            position: relative;
            bottom: -8px;
            margin-top: 10px;
            display: block;
            height: 3px;
            background: $gradation-light;
          }
        }
      }
      .manage-contents{
        font-size: 15px;
        font-weight: 300;
        margin-bottom: 40px;
      }
    }
  }
  .bottom-wrap{
    text-align: right;
  }
  .bottom-link{
    position: relative;
    padding: 16px 40px;
    cursor: pointer;
    figure{
      display: inline-block;
    }
    &:after{
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: var(--color_font);
      bottom: 0;
      right: 0;
      transition: width .4s ease 0ms;
    }
  }
}
</style>