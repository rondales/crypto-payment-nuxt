<template>
  <div :class="classes">
    <div class="header" v-if="!isConfirmationState">
      <h3 class="header__title" >
        Change of Cash back rate 
      </h3>
    </div>
    <div class="header-caution" v-if="isConfirmationState">
      <h3 class="header-caution__title">
        Risk Disclaimer
      </h3>
      <p class="header-caution__desc">This action will change the Cash back rate of your ethereum payment agreement. 
        Please read the Risk Disclaimer carefully and review the options below before proceeding.</p>
    </div>
    <div class="separate-line" v-if="isConfirmationState"></div>
    <div class="body" v-if="isDetailState">
      <figure>
        <img src="@/assets/images/cash-back.svg">
      </figure>
      <p class="margin-bottom-small">
        Cash back rate：{{ isCashbackDefaultSetting ? 'Default Setting' : `${cashbackRate}%` }}
      </p>
      <p class="margin-bottom-small">
        <img src="@/assets/images/double-caret.svg">
      </p>
      <p class="margin-bottom-small">
        Changed rate
      </p>
      <div class="box"><input v-model="newCashbackRate" placeholder="0.00%"></div>
      <div class="invalid-rate" v-if="!validCashbackRate">Please enter number from 0.00 ~ 100.00</div>
      <p class="desc mt-2">of amount back to the payer</p>
      <p class="desc mt-2">It is always your responsibility to set the cash back percentage. 
        We cannot be held responsible for lost funds due to incorrectly entered values.</p>
      <button class="btn __g __l mb-0" @click="changePageToConfirmationState()">
        Confirm
        <div class="loading-wrap" :class="{active: isProcessing}">
          <img class="spin" src="@/assets/images/loading.svg">
        </div>
      </button>
    </div>
    <div class="body" v-if="isConfirmationState">
      <p>
        Changed Cash back rate
      </p>
      <div class="changed-cashback-rate">
        {{ newCashbackRate }}%
      </div>
      <p class="desc mt-2">of amount back to the payer</p>
      <p class="desc mt-2">It is always your responsibility to set the cash back percentage. 
        We cannot be held responsible for lost funds due to incorrectly entered values.
        Do you understand this risk?
      </p>
      <div class="checkbox-container mt-2">
        <input id="accept" type="checkbox" ref="accepted" @click="updateAcceptedStatus">
        <label for="accept">I understand the risk and continue this transaction.</label>
      </div>
      <button class="btn __g __l mb-0" :class="{ inactive: !isAccepted }" @click="changeCashbackRate(chainId)">
        Change Rate
        <div class="loading-wrap" :class="{active: isProcessing}">
          <img class="spin" src="@/assets/images/loading.svg">
        </div>
      </button>
    </div>
    <div class="body" v-else-if="isProcessingState">
      <figure>
        <img class="mb-2 spin" src="@/assets/images/loading.svg" alt="processing">
      </figure>
      <p>
        Waiting for Confimation
      </p>
      <p class="desc mt-2">Do not close the screen until the payment contract has been successfully deployed. 
        It may take some time due to network congestion.</p>
      <p>
        <a class="payment-status_btn" target="_blank" :href="transactionUrl">
          View on explorer
          <img src="@/assets/images/link-icon.svg" alt="">
        </a>
      </p>
      <button class="btn __g __l inactive mb-0" >
        Processing...
      </button>
    </div>
    <div class="body" v-else-if="isSuccessedState">
      <figure>
        <img src="@/assets/images/cash-back-success.svg" alt="Update Success">
      </figure>
      <p class="margin-bottom-md">
        contract update Submitted
      </p>
      <p class="desc margin-bottom-md">Current：Changed on {{ currentDate }}</p>
      <p class="desc margin-bottom-md">Cash back rate
        <span class="changed-cashback-rate">{{ cashbackRate }}%</span>
        of amount back to the payer
      </p>
      <div class="desc">
        <a class="payment-status_btn" target="_blank" :href="transactionUrl">
          View on explorer
          <img src="@/assets/images/link-icon.svg" alt="">
        </a>
      </div>
      <button class="btn __m mb-0" @click="hideModal" >
        Close
      </button>
    </div>
    <div class="body" v-else-if="isFailuredState">
      <figure>
        <img class="mb-2" src="@/assets/images/multiply.svg" alt="failure">
      </figure>
      <p>
        Failed to update contract
      </p>
      <p class="desc mt-2">The transaction cannot succeed due to error:</p>
      <div class="desc">
        <a class="payment-status_btn" v-if="transactionUrl" target="_blank" :href="transactionUrl">
          View on explorer
          <img src="@/assets/images/link-icon.svg" alt="">
        </a>
      </div>
      <button class="btn __m mb-0" @click="hideModal" >
        Close
      </button>
    </div>
    <figure v-if="isProcessingState" class="reload close" @click="refresh">
      <img v-if="$store.state.theme == 'dark'" :class="{spinning: isReloadSpinning}" src="@/assets/images/reload.svg">
      <img v-if="$store.state.theme == 'light'" :class="{spinning: isReloadSpinning}" src="@/assets/images/reload-l.svg">
    </figure>
    <button class="close" v-else-if="!isProcessingState" @click="hideModal">
      <img src="@/assets/images/cross.svg">
      close
    </button>
  </div>
</template>

<script>
import { NETWORKS} from '@/constants'
import MerchantContract from '@/contracts/merchant'

export default {
  name: 'contractCashbackChangeModal',
  data() {
    return {
      pageStateList: {
        detail: 1,
        confirmation: 2,
        processing: 3,
        successed: 4,
        failured: 5
      },
      cashbackRateTxAddress: null,
      cashbackRateProcessing: false,
      pageState: 1,
      reloadSpinning: false,
      newCashbackRate: null,
      validCashbackRate: true,
      accepted: false
    }
  },
  computed: {
    classes() {
      const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
      return classes
    },
    isAccepted() {
        return this.accepted
      },
    isReloadSpinning() {
      return this.reloadSpinning
    },
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    allowClose() {
      return ('allowClose' in this.$store.state.modal.params)
        ? this.$store.state.modal.param
        : true
    },
    chainId() {
      return this.$store.state.modal.params.chainId
    },
    contractSetting() {
      return this.$store.state.contract.contracts[this.chainId]
    },
    isProcessing() {
      return this.cashbackRateProcessing
    },
    isDetailState() {
      return this.pageState === this.pageStateList.detail
    },
    isConfirmationState() {
      return this.pageState === this.pageStateList.confirmation
    },
    isProcessingState() {
      return this.pageState === this.pageStateList.processing
    },
    isSuccessedState() {
      return this.pageState === this.pageStateList.successed
    },
    isFailuredState() {
      return this.pageState === this.pageStateList.failured
    },
    transactionUrl() {
      const transactionHash = this.cashbackRateTxAddress
      const scanSiteUrl = NETWORKS[this.chainId].scanUrl
      if (transactionHash) {
        return `${scanSiteUrl}/tx/${transactionHash}`
      } else {
        return ''
      }
    },
    cashbackRate() {
      return this.contractSetting.cashback.rate
    },
    isCashbackDefaultSetting() {
      return this.contractSetting.cashback.rate == 0
    },
    isWalletPending() {
      return this.$store.state.wallet.pending
    },
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    }
  },
  watch: {
    newCashbackRate(value) {
      this.newCashbackRate = value
      this.checkCashbackRateFormat(value)
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch('modal/hide')
    },
    validateCashbackRate(rate) {
      return rate.match(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/) != null;
    },
    checkCashbackRateFormat() {
      if(this.newCashbackRate && this.validateCashbackRate(this.newCashbackRate)) {
        this.validCashbackRate = true
      } else {
        this.validCashbackRate = false
      }
    },
    changePageToConfirmationState() {
      this.checkCashbackRateFormat()
      if(this.validCashbackRate){
        this.pageState = this.pageStateList.confirmation
      }
    },
    updateAcceptedStatus() {
        this.accepted = this.$refs.accepted.checked
    },
    updateCashbackRate(chainId, cashback) {
      const payload = {
        chainId: chainId,
        cashbackRate: cashback.rate,
        lastModified: cashback.lastModified
      }
      this.$store.dispatch('contract/updateContractCashback', payload)
    },
    async getCurrentContractCashbackRate(chainId) {
      const contractAddress = this.contractSetting.address
      if(contractAddress == null) return
      const result = await this.$web3.viewCashBackPercent(
        this.$store.state.web3.instance,
        MerchantContract.abi,
        contractAddress
      )
      return this.updateCashbackRate(chainId, result)
    },
    changeCashbackRate(chainId) {
      if (this.isProcessing) return
      this.cashbackRateProcessing = true
      this.$web3.updateCashbackPercent(
        this.$store.state.web3.instance,
        MerchantContract.abi,
        this.contractSetting.address,
        this.newCashbackRate,
        this.$store.state.account.address
      ).on('transactionHash', (hash) => {
        this.pageState = this.pageStateList.processing
        this.$store.dispatch('wallet/updatePendingStatus', true)
        this.cashbackRateTxAddress = hash
      }).then((receipt) => {
        if(receipt.status) {
          this.getCurrentContractCashbackRate(chainId).then(() => {
            this.pageState = this.pageStateList.successed
          })
        } else {
          this.pageState = this.pageStateList.failured
        }
        this.cashbackRateProcessing = false
        this.$store.dispatch('wallet/updatePendingStatus', false)
      }).catch(() => {
        this.pageState = this.pageStateList.failured
        this.cashbackRateProcessing = false
        this.$store.dispatch('wallet/updatePendingStatus', false)
      })
    },
    refresh() {
      if(this.isReloadSpinning) return
      this.reloadSpinning = true
      const transactionHash = this.cashbackRateTxAddress
      if(transactionHash != null) {
        this.$web3.monitoringTransaction(
          this.$store.state.web3.instance,
          transactionHash
        ).then((receipt) => {
          if (receipt) {
            if (receipt.status) {
              this.$store.dispatch('wallet/updatePendingStatus', false)
              this.pageState = this.pageStateList.successed
            } else {
              this.$store.dispatch('wallet/updatePendingStatus', false)
              this.pageState = this.pageStateList.failured
            }
          }
          this.reloadSpinning = false
        }).catch((error) => {
          console.log(error)
          this.reloadSpinning = false
        })
      }
    },
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
    background:#292536;
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
      padding: 24px;
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
      background: #ffff;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 150% 150%;
      display: inline;
    }
    &__desc {
      font-weight: 100;
    }
  }
  .header-caution {
    @include media(pc) {
      padding: 24px;
      &__title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      &__title::before {
        width: 2.5rem;
        height: 2.5rem;
      }
      &__desc {
        font-size: 1.2rem;
      }
    }
    @include media(sp) {
      padding: 18px;
      &__title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      &__title::before {
        width: 2rem;
        height: 2rem;
      }
      &__desc {
        font-size: 1.2rem;
      }
    }
    &__title {
      font-weight: 500;
    }
    &__title::before {
      content: "";
      margin-right: 5px;
      display: inline-block;
      background: url(/assets/images/caution.svg) no-repeat center center;
      background-size: contain;
      vertical-align: middle;
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
      top: 35px;
      right: 24px;
    }
    @include media(sp) {
      top: 24px;
      right: 24px;
    }
  }
  .reload{
    cursor: pointer;
    img{
      vertical-align: middle;
      transform: scale(1.35);
    }
    .spinning{
      cursor: default;
      animation: 0.7s linear infinite spinning;
    }

    @keyframes spinning {
      from { transform: rotateZ(0deg) scale(1.35); }
      to { transform: rotateZ(360deg) scale(1.35); }
    }
  }
  .body {
    text-align: center;
    figure{
      width: 100px;
      height: 100px;
      margin: 0 auto 16px;
      display: inline-block;
    }
    h4{
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 32px;
    }
    p{
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    span{
      font-size: 13px;
      font-weight: 400;
    }
    @include media(pc) {
      padding: 24px 24px 40px;
    }
    @include media(sp) {
      padding: 16px 12px 48px;
    }
    .btn {
      width: 100%;
      text-align: center;
      font-size: 18px;
      margin-bottom: 24px;
      &.__m {
        background: $gradation-double;
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
  .network-icon {
    position: relative;
    left: 47px;
    top: -25px;
  }
  .desc {
    font-weight: 100 !important;
    font-size: 1.2rem !important;
    margin-bottom: 30px !important;
  }
  .payment-status{
    text-align: center;
    margin: auto;
    &_btn{
      font-size: 12px;
      font-weight: 100;
      cursor: pointer;
      background: $gradation-pale;
      padding: 4px 16px;
      border-radius: 10px;
      color: #fff;
      img{
        margin-left: 4px;
        vertical-align: middle;
      }
    }
  }
  .box{
    font-weight: 300;
    background: #171522;
    border-radius: 8px;
    height: 46px;
    line-height: 20px;
    padding: 6px 6px;
    display: inline-block;
    width: 120px;
    @include media(tb) {
      margin-bottom: 16px;
      font-size: 13px;
    }
    input {
      text-align: center;
      width: 100%;
    }
  }
  .separate-line {
    border-bottom: 1px solid #78668D;
    @include media(pc) {
      margin: 0 24px;
    }
    @include media(sp) {
      margin: 0 18px;
    }
  }
  .changed-cashback-rate {
    font-size: 36px !important;
    color: #00FF3B;
    margin-right: 5px;
    margin-left: 5px;
  }

  .invalid-rate {
    font-weight: 100 !important;
    font-size: 1.2rem !important;
    color:#E5676C!important;
  }
  .margin-bottom-small {
    margin-bottom: 13px !important;
  }

  .margin-bottom-md {
    margin-bottom: 20px !important;
  }
  .checkbox-container {
    position: relative;
    font-weight: 100;
    font-size: 1.4rem;
    margin-bottom: 20px;
    input[type="checkbox"] {
        display: none;
    }
    input[type="checkbox"]+label {
      display: none;
      cursor: pointer;
      display: inline-block;
      position: relative;
      padding-left: 30px;
      padding-right: 10px;
    }
    input[type="checkbox"]+label::before{
      content: "";
      position: absolute;
      display: block;
      box-sizing: border-box;
      width: 18px;
      height: 18px;
      left: 0;
      top: 0%;
      border: 2px solid;
      border-radius: 2px;
      border-color:  var(--color_font);
      background-color: #292536;
    }
    input[type="checkbox"]:checked+label::after{
      content: "";
      position: absolute;
      display: block;
      box-sizing: border-box;
      width: 15px;
      height: 6px;
      margin-top: 5px;
      top: 0%;
      left: 3px;
      transform: rotate(-45deg);
      border-bottom: 3px solid;
      border-left: 3px solid;
      border-color:  #44d866;
    }
  }
</style>