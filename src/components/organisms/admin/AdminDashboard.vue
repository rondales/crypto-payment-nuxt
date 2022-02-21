<template>
  <div class="DASHBOARD">
    <div class="title">
      <h3>
        payment's summary
      </h3>
    </div>
    <div class="items">
      <dash-item v-for="(item, index) in itemList" :item-data="item" :key="index" />
    </div>
  </div>
</template>


<script>
import moment from 'moment'
import NumberFormat from 'number-format.js'
import DashItem from "@/components/organisms/admin/AdminDashItem"
import Web3ProviderEvents from '@/components/mixins/Web3ProviderEvents'
import RequestUtility from '@/utils/request'

export default {
  name: 'PaymentTop',
  mixins: [Web3ProviderEvents],
  components: {
    DashItem
  },
  data() {
    return{
      success: true,
      items: {
        monthlyAmount: {value: '0 USDT', text: 'monthly total amount'},
        monthlyCount: {value: '0', text: 'monthly total count'},
        weeklyAmount: {value: '0 USDT', text: 'weekly total amount'},
        weeklyCount: {value: '0', text: 'weekly total count'},
        todayAmount: {value: '0 USDT', text: 'today total amount'},
        todayCount: {value: '0', text: 'today total amount'}
      }
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    itemList() {
      return Object.values(this.items)
    }
  },
  methods: {
    apiGetPaymentSummary() {
      const now = moment()
      const url = `${this.baseUrl}/api/v1/management/summary/payment`
      const request = {
        headers: { Authorization: RequestUtility.getBearer() },
        params: new URLSearchParams([
          ['month_start', moment(moment(now).startOf('month').format('YYYY-MM-DD 00:00:00')).unix()],
          ['month_end', moment(moment(now).endOf('month').format('YYYY-MM-DD 23:59:59')).unix()],
          ['week_start', moment(moment(now).startOf('week').format('YYYY-MM-DD 00:00:00')).unix()],
          ['week_end', moment(moment(now).endOf('week').format('YYYY-MM-DD 23:59:59')).unix()],
          ['day_start', moment(moment(now).format('YYYY-MM-DD 00:00:00')).unix()],
          ['day_end', moment(moment(now).format('YYYY-MM-DD 23:59:59')).unix()],
        ])
      }
      return this.axios.get(url, request)
    }
  },
  created() {
    this.apiGetPaymentSummary().then((response) => {
      const summary = response.data
      this.items.monthlyAmount.value = NumberFormat('0.00 USDT', summary.monthly.total_amount)
      this.items.monthlyCount.value = summary.monthly.total_count
      this.items.weeklyAmount.value = NumberFormat('0.00 USDT', summary.weekly.total_amount)
      this.items.weeklyCount.value = summary.weekly.total_count
      this.items.todayAmount.value = NumberFormat('0.00 USDT', summary.daily.total_amount)
      this.items.todayCount.value = summary.daily.total_count
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.DASHBOARD{
  margin-bottom: 120px;
  .title{
    h3{
      font-size: 20px;
      font-weight: 400;
    }
  }
  .items{
    display: grid;
    grid-template:
    "...... ...... ...... ...... ...... ...... ......" 40px
    "item-1 ...... item-2 ...... item-3 ...... item-4" auto
    "...... ...... ...... ...... ...... ...... ......" 32px
    "item-5 ...... item-6 ...... ...... ...... ......" auto
    "...... ...... ...... ...... ...... ...... ......" 32px
    / 23% 2% 23% 2% 23% 2% 23%;
    @include media(sp) {
      grid-template:
      "...... ...... ......" 30px
      "head   head   head"
      "...... ...... ......" 16px
      "item-1 item-1 item-1" auto
      "...... ...... ......" 16px
      "item-2 item-2 item-2" auto
      "...... ...... ......" 16px
      "item-3 item-3 item-3" auto
      "...... ...... ......" 16px
      "item-4 item-4 item-4" auto
      "...... ...... ......" 16px
      "item-5 item-5 item-5" auto
      "...... ...... ......" 16px
      "item-6 item-6 item-6" auto
      "...... ...... ......" 30px
      / 49% 2% 49%;
    }
    .item{
      background: #292536;
      padding: 24px;
      text-align: right;
      font-weight: 400;
      border-radius: 10px;
      &:nth-child(1){
        background: #4E455A;
      }
      h4{
        font-weight: 600;
        font-size: 22px;
        margin-bottom: 8px;
      }
      p{
        font-weight: 400;
        font-size: 16px;
      }
      @for $i from 1 through 6 {
        &:nth-child(#{$i}){
          grid-area: item-#{$i};
        }
      }
    }
  }
}
</style>