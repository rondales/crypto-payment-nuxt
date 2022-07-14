<template>
  <div class="manage-contents">
    <div class="manage-contents_head">
      <h3>Payment contract issuance and detailed settings</h3>
      <p class="mb-2">
        Create contracts on the networks you want to accept payments from The
        Web3 Wallet Address must be the same, even if the networks are
        different.
      </p>
      <p>
        <img src="@/assets/images/learn-more.svg" />About Slash’s payment
        contract setup specifications.
        <a
          href="https://slash-fi.gitbook.io/docs/integration-guide/quick-start#contract-settings"
          target="_blank"
          class="learn-more"
          >Learn more.</a
        >
      </p>
    </div>
    <div class="manage-contents_body">
      <div class="manage-contents_items">
        <div
          v-for="(contract, chainId) in contracts"
          :key="chainId"
          class="manage-contents_item"
          :class="{ created: contractLoaded && isPublishedContract(chainId) }"
        >
          <div
            class="manage-contents_network add-flex a-center j-between"
            :class="{ 'mb-2': isPublishedContract(chainId) }"
          >
            <div class="manage-contents_logo add-flex a-center">
              <figure>
                <img :src="contract.icon" :alt="contract.name" />
              </figure>
              <p>
                {{ contract.name }}
              </p>
            </div>
            <div class="manage-contents_box add-flex a-center j-between">
              <div
                v-if="isPublishedContract(chainId)"
                class="manage-contents_copy"
                @click="copy(contractUrl(chainId))"
              >
                Copy contract
              </div>
              <div
                v-if="!contract.support"
                class="manage-contents_btn other inactive"
              >
                Not support
              </div>
              <div
                v-else-if="!contractLoaded"
                class="manage-contents_btn other inactive"
              >
                Loading
                <div class="contract-deploying-wrap active">
                  <img class="spin" src="@/assets/images/loading.svg" />
                </div>
              </div>
              <div
                v-else-if="
                  isPublishedContract(chainId) && isCurrentNetwork(chainId)
                "
                class="manage-contents_btn inactive"
              >
                Created
              </div>
              <div
                v-else-if="
                  isCurrentNetwork(chainId) && !contracts[chainId].processing
                "
                @click="showContractIssuanceModal(chainId)"
                class="manage-contents_btn"
              >
                Create
              </div>
              <div
                v-else-if="
                  isCurrentNetwork(chainId) && contracts[chainId].processing
                "
                class="manage-contents_btn inactive"
              >
                Creating...
                <div class="contract-deploying-wrap active">
                  <img class="spin" src="@/assets/images/loading.svg" />
                </div>
              </div>
              <div
                v-else
                @click="switchNetwork(chainId)"
                class="manage-contents_btn other"
              >
                switch network
              </div>
            </div>
          </div>
          <div
            v-if="isPublishedContract(chainId) && !isCurrentNetwork(chainId)"
            class="manage-contents_separate-line mb-3"
          ></div>
          <div
            v-if="isPublishedContract(chainId)"
            class="manage-contents_address-wrap"
            :class="{
              available: contract.available,
              unavailable: !contract.available,
              separate_bottom: isCurrentNetwork(chainId),
              separate_upper: !isCurrentNetwork(chainId)
            }"
          >
            <div class="manage-contents_address">
              {{ contractUrl(chainId) }}
            </div>
          </div>
          <div
            v-if="isPublishedContract(chainId) && isCurrentNetwork(chainId)"
            class="manage-contents_separate-line mb-2"
          ></div>
          <div
            v-if="isPublishedContract(chainId) && isCurrentNetwork(chainId)"
            class="manage-contents_bottom"
          >
            <div class="manage-contents_bottom_item mb-2">
              <div class="manage-contents_bottom_left">
                <p>
                  Received address：
                  <span
                    >Last Updated :
                    {{ receiveAddressLastModified(chainId) }}</span
                  >
                </p>
                <div class="add-flex a-center j-between">
                  <div class="manage-contents_bottom_box">
                    {{ currentContractReceiveAddress(chainId) | addressFormat }}
                    <span>
                      <button
                        @click="copy(currentContractReceiveAddress(chainId))"
                      >
                        <img src="@/assets/images/copy-address.svg" />
                      </button>
                    </span>
                  </div>
                  <div
                    class="manage-contents_btn"
                    v-if="isPublishedContract(chainId)"
                    @click="showContractReceiveAddressChangeModal(chainId)"
                  >
                    Change
                  </div>
                  <div v-else class="manage-contents_btn other">
                    switch network
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="isPublishedContract(chainId) && isCurrentNetwork(chainId)"
              class="manage-contents_bottom_item"
            >
              <div class="manage-contents_bottom_left">
                <p>
                  Cash back rate：
                  <span>{{
                    cashbackLastModified(chainId) == 0
                      ? 'Default Setting'
                      : `Last Updated : ${cashbackLastModified(chainId)}`
                  }}</span>
                </p>
                <div class="add-flex a-center j-between">
                  <div class="add-flex a-center">
                    <div class="manage-contents_bottom_box lerge-pd">
                      {{ contractCashBackInfo(chainId) }}%
                    </div>
                    <span class="manage-contents_bottom_dsc">
                      of amount back to the payer
                    </span>
                  </div>
                  <div
                    class="manage-contents_btn"
                    v-if="isPublishedContract(chainId)"
                    @click="showContractCashbackChangeModal(chainId)"
                  >
                    Change
                  </div>
                  <div v-else class="manage-contents_btn other">
                    switch network
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL, METAMASK, NORMAL_TYPE_PAYMENT } from '@/constants'
import AvailableNetworks from '@/network'
import {
  BscTokens,
  EthereumTokens,
  MaticTokens,
  AvalancheTokens
} from '@/contracts/receive_tokens'
import apiMixin from '@/components/mixins/ApiHandler'
import MerchantContract from '@/contracts/merchant'

export default {
  name: 'AdminContractSettings',
  mixins: [apiMixin],
  data() {
    return {
      monitoringInterval: null,
      contractLoaded: false
    }
  },
  computed: {
    contracts() {
      return this.$store.state.contract.contracts
    },
    isCurrentNetwork() {
      return (chainId) => {
        return this.$store.state.web3.chainId === parseInt(chainId, 10)
      }
    },
    isPublishedContract() {
      return (chainId) => {
        return Boolean(this.$store.state.contract.contracts[chainId].address)
      }
    },
    isMetamask() {
      return this.$store.state.web3.provider === METAMASK
    },
    contractUrl() {
      return (chainId) => {
        const contract = this.contracts[chainId]
        return `${contract.scanUrl}/address/${contract.address}`
      }
    },
    contractCashBackInfo() {
      return (chainId) => {
        return this.contracts[chainId].cashback.rate
      }
    },
    cashbackLastModified() {
      return (chainId) => {
        return this.contracts[chainId].cashback.lastModified
      }
    },
    chainId() {
      return this.$store.state.web3.chainId
    },
    currentContractAddress() {
      return this.chainId && this.contracts[this.chainId]
        ? this.contracts[this.chainId].address
        : null
    },
    currentContractReceiveAddress() {
      return (chainId) => {
        const address = this.contracts[chainId].receiveAddress.address
        return address ? address : null
      }
    },
    receiveAddressLastModified() {
      return (chainId) => {
        return this.contracts[chainId].receiveAddress.lastModified
      }
    }
  },
  watch: {
    chainId() {
      this.getCurrentContractCashbackRate(this.$store.state.web3.chainId)
      this.getCurrentContractReceiveAddress(this.$store.state.web3.chainId)
    },
    currentContractAddress() {
      this.getCurrentContractCashbackRate(this.$store.state.web3.chainId)
      this.getCurrentContractReceiveAddress(this.$store.state.web3.chainId)
    }
  },
  filters: {
    addressFormat(address) {
      if (address) {
        const prefix = address.substr(0, 35)
        return prefix + '…'
      } else {
        return ''
      }
    }
  },
  methods: {
    apiGetContracts() {
      const url = `${API_BASE_URL}/api/v1/management/contract`
      return this.axios.get(url, this.$_apiHandler_getOptions())
    },
    apiDeleteContract(chainId, contractAddress) {
      const url = `${API_BASE_URL}/api/v1/management/contract`
      const data = {
        address: contractAddress,
        network_type: parseInt(chainId, 10),
        payment_type: NORMAL_TYPE_PAYMENT
      }
      return this.axios.delete(url, data, this.$_apiHandler_getOptions())
    },
    apiGetPendingTransactions() {
      const url = `${API_BASE_URL}/api/v1/management/contract/deploy/status`
      return this.axios.get(url, this.$_apiHandler_getOptions())
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
    updateContractAddress(chainId, address) {
      const payload = {
        chainId: chainId,
        address: address
      }
      this.$store.dispatch('contract/updateContractAddress', payload)
    },
    updateCashbackRate(chainId, cashback) {
      const payload = {
        chainId: chainId,
        cashbackRate: cashback.rate,
        lastModified: cashback.lastModified
      }
      this.$store.dispatch('contract/updateContractCashback', payload)
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
    getPendingTransactions() {
      this.apiGetPendingTransactions()
        .then((response) => {
          if (response.data === undefined || response.data.length == 0) {
            clearTimeout(this.monitoringInterval)
          } else {
            response.data.forEach((transaction) => {
              if (transaction.network_type in this.contracts) {
                this.updateContractProcessing(transaction.network_type, true)
              }
            })
          }
          this.getContracts()
        })
        .catch((error) => {
          this.$_apiHandler_apiConnectionErrorHandler(
            error.response.status,
            error.response.data
          )
        })
      this.monitoringInterval = setTimeout(this.getPendingTransactions, 3000)
    },
    getContracts() {
      return this.apiGetContracts()
        .then((response) => {
          response.data.forEach((contract) => {
            if (
              contract.payment_type === 1 &&
              contract.network_type in this.contracts
            ) {
              this.updateContractAddress(
                contract.network_type,
                contract.address
              )
              this.updateContractAvailable(
                contract.network_type,
                contract.available
              )
            }
          })
          this.contractLoaded = true
        })
        .catch((error) => {
          console.log(error)
          this.$_apiHandler_apiConnectionErrorHandler(
            error.response.status,
            error.response.data
          )
        })
    },
    switchNetwork(chainId) {
      this.$web3
        .switchChain(this.$store.state.web3.instance, chainId)
        .then(() => {
          this.$store.dispatch('web3/updateChainId', parseInt(chainId, 10))
        })
        .catch((error) => {
          console.log(error)
          if (error.code === 4902) {
            this.showAddChainModal(chainId)
          }
        })
    },
    showAddChainModal(chainId) {
      this.$store.dispatch('modal/show', {
        target: 'add-chain-modal',
        size: 'small',
        params: {
          chainId: chainId,
          hideCloseButton: false
        }
      })
    },
    copy(value) {
      this.$store.dispatch('account/copied')
      this.$clipboard(value)
    },
    showContractIssuanceModal(chainId) {
      this.$store.dispatch('modal/show', {
        target: 'contract-issuance-modal',
        size: 'small',
        params: {
          chainId: chainId
        }
      })
    },
    showContractCashbackChangeModal(chainId) {
      this.$store.dispatch('modal/show', {
        target: 'contract-cashback-change-modal',
        size: 'small',
        params: {
          chainId: chainId
        }
      })
    },
    showContractReceiveAddressChangeModal(chainId) {
      this.$store.dispatch('modal/show', {
        target: 'contract-receive-address-change-modal',
        size: 'small',
        params: {
          chainId: chainId
        }
      })
    },
    async getCurrentContractCashbackRate(chainId) {
      const contractAddress = this.contracts[chainId].address
      if (contractAddress == null) return
      const result = await this.$web3.viewCashBackPercent(
        this.$store.state.web3.instance,
        MerchantContract.abi,
        contractAddress
      )
      this.updateCashbackRate(chainId, result)
    },
    async getCurrentContractReceiveAddress(chainId) {
      const contractAddress = this.contracts[chainId].address
      if (contractAddress == null) return
      const receiveAddress = await this.$web3.viewMerchantReceiveAddress(
        this.$store.state.web3.instance,
        MerchantContract.abi,
        contractAddress
      )
      this.updateReceiveAddress(chainId, receiveAddress)
    }
  },
  created() {
    const receiveTokenSymbol = this.$store.state.account.receiveSymbol
    const supportStatuses = {
      [AvailableNetworks.ethereum.chainId]:
        EthereumTokens[receiveTokenSymbol].address,
      [AvailableNetworks.bsc.chainId]: BscTokens[receiveTokenSymbol].address,
      [AvailableNetworks.matic.chainId]:
        MaticTokens[receiveTokenSymbol].address,
      [AvailableNetworks.avalanche.chainId]:
        AvalancheTokens[receiveTokenSymbol].address
    }
    let contractSettings = {}
    Object.values(AvailableNetworks).forEach((network) => {
      this.$set(contractSettings, network.chainId, {
        name: network.name,
        address: null,
        scanUrl: network.scanUrl,
        cashback: {
          rate: null,
          lastModified: null
        },
        receiveAddress: {
          address: null,
          isContract: null,
          lastModified: null
        },
        icon: network.icon,
        processing: false,
        support: supportStatuses[network.chainId]
      })
    })
    this.$store.dispatch('contract/addContracts', contractSettings)
    this.getContracts().then(() => {
      this.getCurrentContractCashbackRate(this.$store.state.web3.chainId)
      this.getCurrentContractReceiveAddress(this.$store.state.web3.chainId)
    })
    this.getPendingTransactions()
  },
  beforeDestroy() {
    clearTimeout(this.monitoringInterval)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.manage-setting {
  .setting-wrap {
    .manage-contents {
      &_head {
        padding: 32px 0;
        h3 {
          font-weight: 300;
        }
        p {
          font-weight: 300;
          font-size: 15px;
        }
        img {
          margin-right: 8px;
        }
        a {
          color: #5390f2;
          cursor: pointer;
        }
      }
      &_separate-line {
        border-bottom: 1px solid #78668d;
      }
      &_item {
        background: #292536;
        margin-bottom: 32px;
        padding: 16px 24px;
        border-radius: 8px;
        width: 60%;
        @include media(sp) {
          width: 100%;
        }
      }
      .created {
        .manage-contents_network {
          padding-bottom: 16px;
          margin-bottom: 16px;
        }
      }
      &_network {
        p {
          margin-left: 16px;
          font-weight: 300;
          font-size: 15px;
          @include media(sp) {
            margin-left: 14px;
          }
        }
        figure {
          img {
            border-radius: 8px;
            width: 40px;
            height: 40px;
          }
        }
      }
      &_logo {
        @include media(sp) {
          margin: 0 auto 24px;
        }
      }
      &_btn {
        font-weight: 300;
        font-size: 15px;
        background: $gradation-light;
        padding: 6px 0;
        width: 180px;
        text-align: center;
        border-radius: 30px;
        height: 34px;
        cursor: pointer;
        @include media(tb) {
          font-size: 14px;
          margin: auto;
          width: 140px;
        }
        @include media(sp) {
          font-size: 12px;
          width: 120px;
        }
        &.inactive {
          // background: var(--color_inactive) !important;
          opacity: 0.6;
          pointer-events: none !important;
        }
        &.other {
          background: #78668d;
        }
      }
      &_address-wrap {
        padding: 0 32px;
        position: relative;
        &.separate {
          &_upper {
            padding-bottom: 1px;
          }
          &_bottom {
            margin-top: 5px;
            padding-bottom: 1px;
            margin-bottom: 5px;
          }
        }
        &.available {
          &::after {
            content: '';
            background: url(/assets/images/check-mark.svg) no-repeat center
              center;
            width: 20px;
            height: 20px;
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translate(-50%, -90%);
          }
        }
        &.unavailable {
          &::after {
            content: '';
            background: url(/assets/images/bad-mark.svg) no-repeat center center;
            width: 20px;
            height: 20px;
            position: absolute;
            top: 15%;
            left: 10px;
            transform: translate(-50%, -50%);
          }
        }
      }
      &_address {
        font-size: 15px;
        margin-bottom: 16px;
        font-weight: 300;
        word-break: break-all;
      }
      &_box {
        @include media(tb) {
          width: 100%;
        }
      }
      &_copy {
        color: #8e86ad;
        font-size: 17px;
        position: relative;
        display: inline-block;
        font-weight: 300;
        cursor: pointer;
        margin-right: 48px;
        @include media(tb) {
          font-size: 14px;
        }
        &::after {
          content: '';
          background: url(/assets/images/copy-address.svg) no-repeat center
            center;
          width: 20px;
          height: 20px;
          position: absolute;
          top: 50%;
          right: -40px;
          transform: translate(-50%, -60%);
        }
      }
      &_bottom {
        font-size: 16px;
        &_left {
          p {
            padding-left: 40px;
            position: relative;
            margin-bottom: 16px;
            font-weight: 300;
            span {
              color: #8e86ad;
              font-weight: 300;
              &.history {
                position: relative;
                @include media(tb) {
                  display: inline-block;
                }
                &:after {
                  content: '';
                  background: url(/assets/images/clock.svg) no-repeat center
                    center;
                  width: 20px;
                  height: 20px;
                  position: absolute;
                  top: 50%;
                  right: -30px;
                  transform: translate(0, -50%);
                }
              }
            }
            &:after {
              content: '-';
              position: absolute;
              left: 6px;
            }
            &.add-check {
              &:after {
                content: '';
                background: url(/assets/images/check-mark.svg) no-repeat center
                  center;
                width: 20px;
                height: 20px;
                position: absolute;
                top: 50%;
                left: 10px;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
        &_box {
          font-weight: 300;
          background: #171522;
          border-radius: 8px;
          height: 46px;
          line-height: 46px;
          padding: 0 12px;
          @include media(tb) {
            margin-bottom: 16px;
            font-size: 13px;
          }
          &.lerge-pd {
            padding: 0 40px;
            margin-right: 8px;
            @include media(tb) {
              padding: 0 32px;
            }
          }
          span {
            margin-left: 16px;
            @include media(tb) {
              margin-left: 0;
            }
          }
        }
        &_dsc {
          font-weight: 300;
          @include media(tb) {
            font-size: 11px;
          }
        }
      }
    }
  }
}
</style>
