<template>
  <div :class="classes">
    <div class="header" v-if="!isConfirmationState">
      <h3 class="header__title" >
        Change of Received address
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
        <img src="@/assets/images/receive-address.svg">
      </figure>
      <p class="margin-bottom-small">Current： {{ isDefaultSetting ? "Default Setting" : "" }}</p>
      <p class="margin-bottom-small">
        {{ receiveAddress }}
      </p>
      <p class="margin-bottom-small">
        <img src="@/assets/images/double-caret.svg">
      </p>
      <p class="margin-bottom-small">
        Changed address
      </p>
      <div class="box margin-bottom-small">
        <input v-model="newReceiveAddress" placeholder="Enter address">
      </div>
      <div class="invalid-address" v-if="!isValidAddress">Please enter valid address.</div>
      <p class="mt-2 align-left confirmation margin-bottom-small">Confirmation</p>
      <p class="mt-2 align-left margin-bottom-small">① Is the address you entered the wallet address or the contract address?</p>
      <div class="form-attribute form-container align-left margin-bottom-small">
        <input type="radio" class="radio-button-type" id="wallet-address-type" :value="false" v-model="isContractAddress" />
        <label for="wallet-address-type"> wallet address</label>
      </div>
      <div class="form-attribute form-container align-left margin-bottom-small">
        <input type="radio" class="radio-button-type" id="contract-address-type" :value="true" v-model="isContractAddress" />
        <label for="contract-address-type"> Contract address</label>
      </div>
      <p class="invalid-address margin-bottom-small" v-if="!validAddressType">Please select correct address type.</p>
      <p class="mt-2 align-left margin-bottom-small">② Are you using the correct address for the following network? 
        If correct, check the box.
      </p>
      <div class="align-left margin-bottom-small">
        <img class="network-icon" :src="networkIcon">
        <span class="network-name">{{ networkName }}</span>
        <div class="checkbox-container network-confirm mt-2 margin-bottom-small">
          <input id="accept" type="checkbox" ref="networkConfirm" @click="updateNetworkConfirmedStatus">
          <label for="accept">Yes. Correct.</label>
        </div>
      </div>
      <p class="mt-2 align-left margin-bottom-small">
        Please set the changed EVM (Ethereum Virtual Machine) compatible address at your own risk. 
        Please be sure to set this address at your own risk. 
        If you enter an incorrect address and lose your funds, we will not be held responsible.
      </p>
      <button class="btn __g __l mb-0" :class="{ inactive: !isFormDataConfirmed }" @click="changePageToConfirmationState()">
        Confirm
        <div class="loading-wrap" :class="{active: isProcessing}">
          <img class="spin" src="@/assets/images/loading.svg">
        </div>
      </button>
    </div>
    <div class="body" v-if="isConfirmationState">
      <p>
        Current：Default Setting
      </p>
      <p class="current-receive-address">
        {{ receiveAddress }}
      </p>
      <p>
        <img src="@/assets/images/double-caret.svg">
      </p>
      <p>
        Changed address
      </p>
      <p class="new-receive-address">
        {{ newReceiveAddress }}
      </p>
      <p class="desc align-left mt-2">
        Please be sure to make this change at your own discretion. 
        We are not responsible for any loss of funds due to incorrectly entered wallet 
        addresses or malfunction of contract addresses created by the customer themselves. 
        Do you understand this risk?
      </p>
      <div class="checkbox-container align-left mt-2">
        <input id="accept" type="checkbox" ref="riskAgreed" @click="updateRiskAgreedStatus">
        <label for="accept">I understand the risk and continue this address change.</label>
      </div>
      <button class="btn __g __l mb-0" :class="{ inactive: !isRiskAgreed }" @click="changeReceiveAddress(chainId)">
        Change address
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
      <p>
        contract update Submitted
      </p>
      <p class="desc mt-2">Current：Changed on {{ currentDate }}</p>
      <p class="new-receive-address">{{ newReceiveAddress }}</p>
      <p>
        <a class="payment-status_btn" target="_blank" :href="transactionUrl">
          View on explorer
          <img src="@/assets/images/link-icon.svg" alt="">
        </a>
      </p>
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
      <p>
        <a class="payment-status_btn" v-if="transactionUrl" target="_blank" :href="transactionUrl">
          View on explorer
          <img src="@/assets/images/link-icon.svg" alt="">
        </a>
      </p>
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
import { NETWORKS } from '@/constants'
import MerchantContract from '@/contracts/merchant'

export default {
  name: 'contractReceiveAddressChangeModal',
  data() {
    return {
      pageStateList: {
        detail: 1,
        confirmation: 2,
        processing: 3,
        successed: 4,
        failured: 5
      },
      pageState: 1,
      reloadSpinning: false,
      newReceiveAddress: null,
      receiveAddressProcessing: false,
      receiveAddressTxAddress: null,
      networkConfirmed: false,
      riskAgreed: false,
      validAddress: true,
      validAddressType: true,
      isContractAddress: null,
    }
  },
  computed: {
    classes() {
      const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
      return classes
    },
    isRiskAgreed() {
      return this.riskAgreed
    },
    isFormDataConfirmed() {
      return this.newReceiveAddress != null && this.isContractAddress != null && this.networkConfirmed
    },
    isReloadSpinning() {
      return this.reloadSpinning
    },
    isValidAddress() {
      return this.validAddress
    },
    allowClose() {
      return ('allowClose' in this.$store.state.modal.params)
        ? this.$store.state.modal.param
        : true
    },
    networkName() {
      return NETWORKS[
        this.$store.state.web3.chainId
      ].name
    },
    networkIcon() {
      return NETWORKS[
        this.$store.state.web3.chainId
      ].icon
    },
    chainId() {
      return this.$store.state.modal.params.chainId
    },
    contractSetting() {
      return this.$store.state.contract.contracts[this.chainId]
    },
    isProcessing() {
      return this.receiveAddressProcessing
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
      const transactionHash = this.receiveAddressTxAddress
      const scanSiteUrl = NETWORKS[this.chainId].scanUrl
      if (transactionHash) {
        return `${scanSiteUrl}/tx/${transactionHash}`
      } else {
        return ''
      }
    },
    receiveAddress() {
      return this.contractSetting.receiveAddress.address
    },
    isDefaultSetting() {
      return this.contractSetting.receiveAddress.address == this.$store.state.account.address
    },
    isWalletPending() {
      return this.$store.state.wallet.pending
    },
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    },
  },
  watch: {
    newReceiveAddress(value) {
      this.newReceiveAddress = value
      this.checkAddressFormat(value)
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch('modal/hide')
    },
    validateAddress(address) {
      return address.match(/^0x([a-z]|[A-Z]|[0-9]){40}$/) != null;
    },
    checkAddressFormat(address) {
      if(this.validateAddress(address)) {
        this.validAddress = true
      } else {
        this.validAddress = false
      }
    },
    async checkAddressType(address) {
      const isContractAddress = await this.$web3.isContractAddress(this.$store.state.web3.instance, address)
      return this.validAddressType = this.isContractAddress === isContractAddress
    },
    async changePageToConfirmationState() {
      if(!this.validateAddress(this.newReceiveAddress)) return
      await this.checkAddressType(this.newReceiveAddress)
      if(this.validAddressType){
        this.pageState = this.pageStateList.confirmation
      }
    },
    updateNetworkConfirmedStatus() {
      this.networkConfirmed = this.$refs.networkConfirm.checked
    },
    updateRiskAgreedStatus() {
        this.riskAgreed = this.$refs.riskAgreed.checked
    },
    updateReceiveAddress(chainId, receiveAddress) {
      const payload = {
        chainId: chainId,
        receiveAddress: receiveAddress.address,
        isContract: receiveAddress.isContract,
        lastModified: receiveAddress.lastModified
      }
      this.$store.dispatch('contract/updateContractReceiveAddress', payload)
    },
    async getCurrentContractReceiveAddress(chainId) {
      const contractAddress = this.contractSetting.address
      if(contractAddress == null) return
      const receiveAddress = await this.$web3.viewMerchantReceiveAddress(
        this.$store.state.web3.instance,
        MerchantContract.abi,
        contractAddress
      )
      return this.updateReceiveAddress(chainId, receiveAddress)
    },
    changeReceiveAddress(chainId) {
      if (this.isProcessing) return
      this.receiveAddressProcessing = true
      this.$web3.updateMerchantReceiveAddress(
        this.$store.state.web3.instance,
        MerchantContract.abi,
        this.contractSetting.address,
        this.newReceiveAddress,
        this.isContractAddress,
        this.$store.state.account.address
      ).on('transactionHash', (hash) => {
        this.pageState = this.pageStateList.processing
        this.$store.dispatch('wallet/updatePendingStatus', true)
        this.receiveAddressTxAddress = hash
      }).then((receipt) => {
        if(receipt.status) {
          this.getCurrentContractReceiveAddress(chainId).then(() => {
            this.pageState = this.pageStateList.successed
          })
        } else {
          this.pageState = this.pageStateList.failured
        }
        this.receiveAddressProcessing = false
        this.$store.dispatch('wallet/updatePendingStatus', false)
      }).catch(() => {
        this.pageState = this.pageStateList.failured
        this.receiveAddressProcessing = false
        this.$store.dispatch('wallet/updatePendingStatus', false)
      })
    },
    refresh() {
      if(this.isReloadSpinning) return
      this.reloadSpinning = true
      const transactionHash = this.receiveAddressTxAddress
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
  .confirmation::before {
    content: "";
    margin-right: 5px;
    display: inline-block;
    background: url(/assets/images/caution.svg) no-repeat center center;
    background-size: contain;
    vertical-align: middle;
    width: 1.6rem;
    height: 1.6rem;
  }

  .form-attribute {
    font-size: 1.2rem !important;
    margin-bottom: 10px !important;
    cursor: pointer;
  }
  .radio-button-type {
    cursor: pointer;
    position: relative;
    top: 3px;
  }

  .network-name {
    margin-left: 15px;
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
      height: 50px;
      margin: 0 auto 16px;
      display: inline-block;
    }
    h4{
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 32px;
    }
    p{
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 30px;
    }
    span{
      font-size: 13px;
      font-weight: 400;
    }
    @include media(pc) {
      padding: 8px 24px 40px;
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

  .margin-bottom-small {
    margin-bottom: 13px !important;
  }
  .desc {
    font-weight: 100 !important;
    font-size: 1.2rem !important;
    margin-bottom: 20px !important;
  }
  .box{
    font-weight: 300;
    background: #171522;
    border-radius: 8px;
    height: 46px;
    font-size: 14px;
    padding: 13px 13px;
    @include media(tb) {
      margin-bottom: 16px;
      font-size: 13px;
    }
    input {
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
  .current-receive-address {
    color: #E5676C;
  }
  .new-receive-address {
    color: #00FF3B;
  }
  .align-left {
    text-align: left !important;
  }
  .invalid-address {
    font-weight: 100 !important;
    font-size: 1.2rem !important;
    color:#E5676C!important;
    text-align: left!important;;
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
  .network-confirm {
      display: inline-block;
      left: 80px;
    }
  .checkbox-container {
    position: relative;
    font-weight: 500;
    font-size: 1.2rem;
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