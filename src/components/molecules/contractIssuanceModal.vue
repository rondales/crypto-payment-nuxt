<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Payment contract issuance 
      </h3>
    </div>
    <div class="body" v-if="isDetailState">
      <figure>
        <img src="@/assets/images/contract-integration.svg">
        <img class="network-icon" :src="networkIcon">
      </figure>
      <p>
        Deploy your own Slash payment contract to the {{ networkName }} network.
      </p>
      <p class="desc mt-2">This contract issuance process requires the preparation of 
        {{ symbol }} in the Web3 wallet that will be collected in the network as gas fee.</p>
      <button class="btn __g __l mb-0" v-if="!isPublishedContract" @click="publishMerchantContract(chainId)">
        Create Contract
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
        <img src="@/assets/images/congratulation.svg" alt="congratulation">
      </figure>
      <p>
        contract issuance Submitted
      </p>
      <p class="desc mt-2">Your exclusive Slash Payment Contract has been issued on the {{ networkName }} Network.</p>
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
        Failed to issue contract
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
import { NETWORKS, HTTP_CODES, LOGIN_TOKEN, NORMAL_TYPE_PAYMENT } from '@/constants'
import { errorCodeList } from '@/enum/error_code'
import RequestUtility from '@/utils/request'

export default {
  name: 'contractIssuanceModal',
  data() {
    return {
      pageStateList: {
        detail: 1,
        processing: 2,
        successed: 3,
        failured: 4
      },
      pageState: 1,
      reloadSpinning: false,
    }
  },
  computed: {
    classes() {
      const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
      return classes
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
    isPublishedContract() {
      return Boolean(this.contractSetting.address)
    },
    isProcessing() {
      return this.contractSetting.processing
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
    symbol() {
      return this.$store.state.account.symbol
    },
    isDetailState() {
      return this.pageState === this.pageStateList.detail
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
      const transactionHash = this.contractSetting.transactionAddess
      const scanSiteUrl = NETWORKS[this.chainId].scanUrl
      if (transactionHash) {
        return `${scanSiteUrl}/tx/${transactionHash}`
      } else {
        return ''
      }
    },
    isWalletPending() {
      return this.$store.state.wallet.pending
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch('modal/hide')
    },
    apiRegistTransaction(chainId, transactionAddress) {
      const url = `${this.API_BASE_URL}/api/v1/management/contract/deploy/transaction`
      const options = { headers: { Authorization: RequestUtility.getBearer() } }
      const data = {
        network_type: parseInt(chainId, 10),
        payment_type: NORMAL_TYPE_PAYMENT,
        transaction_address: transactionAddress
      }
      return this.axios.post(url, data, options)
    },
    apiConnectionErrorHandler(statusCode, responseData) {
      if (statusCode === HTTP_CODES.UN_AUTHORIZED) {
        localStorage.removeItem(LOGIN_TOKEN)
        this.$router.push({ path: '/admin' })
      } else {
        if ('errors' in responseData && responseData.errors.length) {
          this.$store.dispatch('modal/show', {
            target: 'error-modal',
            size: 'small',
            params: {
              message: errorCodeList[responseData.errors.shift()].msg
            }
          })
        }
      }
    },
    updateContractProcessing(chainId, processing) {
      const payload = {
        chainId: chainId,
        processing: processing
      }
      this.$store.dispatch('contract/updateContractProcessing', payload)
    },
    updateContractAvailable(chainId, available) {
      const payload = {
        chainId: chainId,
        available: available
      }
      this.$store.dispatch('contract/updateContractAvailable', payload)
    },
    updateContractTxAddess(chainId, address) {
      const payload = {
        chainId: chainId,
        address: address
      }
      this.$store.dispatch('contract/updateContractTxAddess', payload)
    },
    updateContractAddress(chainId, address) {
      const payload = {
        chainId: chainId,
        address: address
      }
      this.$store.dispatch('contract/updateContractAddress', payload)
    },
    refresh() {
      if(this.isReloadSpinning) return
      this.reloadSpinning = true
      const transactionHash = this.contractSetting.transactionAddess
      if(transactionHash != null) {
        this.$web3.monitoringTransaction(
          this.$store.state.web3.instance,
          this.contractSetting.transactionAddess
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
    publishMerchantContract(chainId) {
      if (this.isProcessing) return
      this.updateContractProcessing(this.chainId, true)
      const merchantWalletAddress = this.$store.state.account.address
      const receiveTokenAddress = this.contractSetting.support
      this.$web3.publishMerchantContract(
        this.$store.state.web3.instance,
        chainId,
        merchantWalletAddress,
        receiveTokenAddress
      ).on('transactionHash', (hash) => {
        this.pageState = this.pageStateList.processing
        this.$store.dispatch('wallet/updatePendingStatus', true)
        this.updateContractTxAddess(chainId, hash)
        this.apiRegistTransaction(chainId,hash).catch((error) => {
          console.log(error)
        })
      }).
      then((receipt) => {
        const merchantContractAddess = receipt.events['NewMerchantDeployed'].returnValues.merchantAddress_
        this.pageState = this.pageStateList.successed
        this.updateContractAvailable(chainId, true)
        this.updateContractAddress(chainId, merchantContractAddess)
        this.updateContractProcessing(chainId, false)
        this.$store.dispatch('wallet/updatePendingStatus', false)
      }).catch(() => {
        this.pageState = this.pageStateList.failured
        this.updateContractProcessing(chainId, false)
        this.$store.dispatch('wallet/updatePendingStatus', false)
      })
    }
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
    background:var(--color_bg);
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
</style>