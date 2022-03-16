<template>
  <div>
    <div class="toggle-btn mb-3 add-flex j-around">
      <router-link :to="{query: {id: 1}}" class="toggle-right">
        History
      </router-link>
      <router-link :to="{query: {id: 2}}" class="toggle-left">
        settings
      </router-link>
    </div>
    <div>
      <TransactionHistory v-if="this.$route.query.id == 1"/>
      <PaymentSettings v-if="this.$route.query.id == 2"/>
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
      isHistory: false,
      id: "",
    }
  },
  mounted() {
    if(!this.$route.query.id){
      this.isHistory = true;
    }
  },
  methods: {
  },
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
  &.router-link-exact-active{
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