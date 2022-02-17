<template>
  <div>
    <div class="toggle-btn mb-3 add-flex j-around">
      <div class="toggle-right" :class="{active: isHistoryTab}" @click="switchTab(tabs.history)">
        History
      </div>
      <div class="toggle-left" :class="{active: isSettingsTab}" @click="switchTab(tabs.settings)">
        settings
      </div>
    </div>
    <div>
      <TransactionHistory v-if="isHistoryTab" />
      <PaymentSettings v-if="isSettingsTab" />
    </div>
  </div>
</template>


<script>
import Web3ProviderEvents from '@/components/mixins/Web3ProviderEvents'
import TransactionHistory from '@/components/organisms/admin/AdminTransactionHistory'
import PaymentSettings from '@/components/organisms/admin/AdminPaymentSettings'

export default {
  name: 'AdminWeb3Payment',
  mixins: [Web3ProviderEvents],
  components: {
    TransactionHistory,
    PaymentSettings
  },
  data() {
    return {
      currentTab: null,
      tabs: {
        history: 1,
        settings: 2
      }
    }
  },
  computed: {
    isHistoryTab() {
      return this.currentTab === this.tabs.history
    },
    isSettingsTab() {
      return this.currentTab === this.tabs.settings
    }
  },
  methods: {
    switchTab(targetTab) {
      this.currentTab = targetTab
    }
  },
  created() {
    this.currentTab = this.tabs.history
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.toggle-btn{
  width: 30%;
  @include media(sp) {
    width: 100%;
  }
}
.toggle-right, .toggle-left{
  cursor: pointer;
  width: 50%;
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
</style>