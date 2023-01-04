<template>
  <payment-index
    ref="paymentIndex"
    :colorTheme="colorTheme"
    :receiver="receiver"
    :isVerifiedDomain="isVerifiedDomain"
    :invoiceId="invoiceId"
    :base64VuexData="base64VuexData"
    @openModal="openModal"
    @switchColorTheme="switchColorTheme"
  />
</template>
  
<script>
import PaymentIndex from '@/components/templates/ww/PaymentIndex'
import { STATUS_PUBLISHED, STATUS_PROCESSING, STATUS_RESULT_FAILURE, STATUS_RESULT_SUCCESS } from '@/constants'
import MerchantContract from '@/contracts/merchant'
import Web3 from 'web3'

export default {
  name: 'ww-payment',
  components: { PaymentIndex },
  data() {
    return {
      parentWindowListener: null
    }
  },
  watch: {
    $route() {
      this.checkAndSetAvailableNetworks()
      this.handleRedirect()
    },
    chainId() {
      if (this.isRequestConnectedWalletPage) {
        this.handleChainChanged()
      }
    },
    userAccountAddress() {
      if (this.isRequestConnectedWalletPage) {
        this.handleAccountChanged()
      }
    }
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    urlQueries() {
      return this.$route.query
    },
    storedWeb3Data() {
      return this.$store.state.web3
    },
    storedAccountData() {
      return this.$store.state.account
    },
    storedPaymentData() {
      return this.$store.state.payment
    },
    colorTheme() {
      return this.$store.state.theme
    },
    receiver() {
      if (!this.isVerifiedDomain && this.merchantAccountAddress) {
        const omittedMerchantAccountAddress =
          this.merchantAccountAddress.substr(0, 10) +
          '…' +
          this.merchantAccountAddress.substr(-10)
        return omittedMerchantAccountAddress
      }
      return this.storedPaymentData.domain
    },
    invoiceId() {
      return this.storedPaymentData.orderCode
    },
    base64VuexData() {
      return ''
    },
    web3Instance() {
      return this.storedWeb3Data.instance
    },
    chainId() {
      return this.storedWeb3Data.chainId
    },
    providerType() {
      return this.storedWeb3Data.provider
    },
    userAccountAddress() {
      return this.storedAccountData.address
    },
    merchantAccountAddress() {
      return this.storedPaymentData.merchantWalletAddress
    },
    urlPaymentToken() {
      return this.$route.params.token
    },
    storedPaymentToken() {
      return this.storedPaymentData.id
    },
    isVerifiedDomain() {
      return this.storedPaymentData.isVerifiedDomain
    },
    isDifferentPayment() {
      return this.urlPaymentToken !== this.storedPaymentToken
    },
    isSentTransactionToBlockChain() {
      return this.storedPaymentData.status !== STATUS_PUBLISHED
    },
    isRequestEntrancePage() {
      return this.$route.name === 'ww-entrance'
    },
    isRequestedSelectWalletPage() {
      return this.$route.name === 'ww-wallets'
    },
    isRequestConnectedWalletPage() {
      const targetPages = ['ww-tokens', 'ww-detail']
      return targetPages.includes(this.$route.name)
    },
    isRequestResultPage() {
      return this.$route.name === 'ww-result'
    }
  },
  methods: {
    apiGetMerchantContractAvailableStatus() {
      const url = `${this.API_BASE_URL}/api/v1/payment/merchant/status`
      const request = {
        params: new URLSearchParams([['payment_token', this.urlPaymentToken]])
      }
      return this.axios.get(url, request)
    },
    apiGetTransaction() {
      const url = `${this.API_BASE_URL}/api/v1/payment/transaction`
      const request = {
        params: new URLSearchParams([['payment_token', this.urlPaymentToken]])
      }
      return this.axios.get(url, request)
    },
    getAccountDataFromBlockChain() {
      const func = this.$web3.getAccountData(this.web3Instance, this.chainId)
      return func.catch(this.getAccountDataFromBlockChain)
    },
    openModal(target, size) {
      this.$store.dispatch('modal/show', { target: target, size: size })
    },
    switchColorTheme(color) {
      this.$store.dispatch('changeTheme', color)
    },
    checkAndSetAvailableNetworks() {
      this.apiGetMerchantContractAvailableStatus()
        .then((response) => {
          const statuses = response.data.statuses
          const status = {}
          const funcGetContractPaused = []
          const web3Instance = new Web3()
          for (const chainId in statuses) {
            funcGetContractPaused.push(
              this.$web3.checkMerchantContractPaused(
                web3Instance,
                MerchantContract.abi,
                { chainId, address: statuses[chainId] }
              )
            )
            status[chainId] = true
          }
          Promise.all(funcGetContractPaused).then((response) => {
            for (const result of response) {
              status[result.chainId] = result.paused
            }

            const availableNetworks = Object.keys(status)
              .filter(key => !status[key])
              .map(Number)
            this.$store.dispatch('payment/updateAvailableNetworks', availableNetworks)
            if (!availableNetworks.length) {
              this.$store.dispatch('modal/show', {
                target: 'ww-error-not-exist-available-payment-contract-modal',
                size: 'small'
              })
            }
          })
        })
    },
    handleRedirect() {
      this.apiGetTransaction().then((response) => {
        this.$refs.paymentIndex.incrementProgressCompletedSteps()
        if (([STATUS_PROCESSING, STATUS_RESULT_FAILURE, STATUS_RESULT_SUCCESS].includes(response.data.status)
          || response.data.is_cancelled == true) && !this.isRequestResultPage) {
          return this.$router.replace({
            name: 'ww-result',
            params: { token: this.urlPaymentToken },
            query: this.$route.query
          })
        }
        if (
          (!this.isDifferentPayment &&
            response.data.base_amount == null &&
            !this.isRequestEntrancePage &&
            !this.isRequestResultPage) ||
          (this.isDifferentPayment &&
            !this.isRequestEntrancePage &&
            !this.isRequestResultPage)
        ) {
          return this.$router.replace({
            name: 'ww-entrance',
            params: { token: this.urlPaymentToken },
            query: this.urlQueries
          })
        }
        if (this.isRequestedSelectWalletPage) {
          this.$refs.paymentIndex.updateProgressTotalSteps(
            this.$refs.paymentIndex.progressCompletedSteps
          )
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    handleChainChanged() {
      this.getAccountDataFromBlockChain().then((data) => {
        this.$store.dispatch('account/update', data)
      })
    },
    handleAccountChanged() {
      this.getAccountDataFromBlockChain().then((data) => {
        this.$store.dispatch('account/update', data)
      })
    },
    addParentWindowEventListener() {
      this.parentWindowListener = (ev) => this.listenMessageFromParentWindow(ev)
      window.addEventListener('message', this.parentWindowListener)
    },
    listenMessageFromParentWindow(ev) {
      if(ev && ev.data && ev.data.action) {
        switch(ev.data.action) {
          case 'setOrigin':
            this.$store.dispatch('wwPayment/updateParentOrigin', ev.data.value.origin)
            break;
        }
      }
    },
    sendCreatedMessage() {
      if(!window.opener) return;
      window.opener.postMessage({
        action: 'createdWindow',
        value: {}
      }, '*');
    }
  },
  created() {
    this.addParentWindowEventListener()
    this.sendCreatedMessage();
    this.checkAndSetAvailableNetworks()
    this.handleRedirect()
  },
  mounted() {
    document.body.classList.add('theme--' + this.$store.state.theme)
  },
  updated() {
    document.body.classList.remove('theme--dark')
    document.body.classList.remove('theme--light')
    document.body.classList.add('theme--' + this.$store.state.theme)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.parentWindowListener)
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/style.scss';

body {
  position: relative;
  // padding-top: 2rem;
  .weglot-container.wg-default {
    position: fixed;
    z-index: 9000;
    bottom: auto;
    // width: 100%;
    top: 1rem;
    right: calc(5vw + 1.2rem + 2rem);
    // height: 1.6rem;
    font-size: 0;
    padding: 0.5rem 0;
    @include media(sp) {
      right: calc(5vw + 18px);
      right: 0;
      padding: 0rem 0;
      width: 100%;
      top: 50px;
    }
    .wg-drop.country-selector {
      width: 100%;
      position: relative;
      bottom: auto;
      right: auto;
      font-size: 0;
      // background-color: var(--Base3);
      background: transparent;
      transition: background-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
        visibility 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      @include media(pc) {
        &:hover {
          background-color: var(--Base3);
        }
      }

      @include media(sp) {
        background-color: var(--Base3);
        // border: 1px solid var(--Border);
      }
      &.weg-openleft {
        background-color: var(--Base3);
      }

      a {
        // background-color: var(--Base3);
        background: transparent;
        padding: 0;
        height: auto;
        display: block;
        width: 5rem;
        font-size: 0.8rem;
        line-height: 2rem;
        letter-spacing: 0.02em;
        color: var(--Text);
        padding: 0 0.5rem;
        padding-right: 1.5rem;
        @include media(sp) {
          text-align: center;
          line-height: 26px;
          font-size: 0.9rem;
          width: 100%;
        }
      }
      .wgcurrent {
        border: none;
        position: relative;
        &::after {
          display: none;
        }
        &::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          border-bottom: 1px solid var(--Text);
          border-left: 1px solid var(--Text);
          position: absolute;
          top: 50%;
          right: 6px;
          transform-origin: center center;
          transform: translateY(-75%) rotate(-45deg) scale(1, 1);
          @include media(sp) {
            transform: translateY(-90%) rotate(-45deg) scale(1, 1);
          }
        }
        // a {
        //   line-height: 2rem;
        // }
      }

      ul {
        background: transparent;
        border: none;
        background-color: var(--Base3);
        li {
          border-top: 1px solid var(--Border);
        }
      }
      .wg-flags {
        a {
          @include media(sp) {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          img.wg-flag {
            display: none;
            @include media(sp) {
              display: block;
              gap: 1rem;
              width: 24px;
              height: 12px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
