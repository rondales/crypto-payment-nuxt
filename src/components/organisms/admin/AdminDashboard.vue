<template>
  <div class="DASHBOARD">
    <div class="title">
      <h3>
        month’s charge
      </h3>
    </div>
    <div class="items">
      <dash-item v-for="(item, index) in items" :item-data="item" :key="index" />
    </div>
  </div>
</template>


<script>
import DashItem from "@/components/organisms/admin/AdminDashItem"

export default {
  name: 'PaymentTop',
  data() {
    return{
      success: true,
      items: [
        {value: "29,060,487", text: "総合計 ()"},
        {value: "180,000", text: "Ecochip"},
        {value: "15,879,948", text: "スマートピット"},
        {value: "13,000,539", text: "銀行振込"},
        {value: "0", text: "Pay-easy (ネット振込)"},
        {value: "0", text: "Pay-easy (ATM振込)"},
        {value: "0", text: "Saiwin"},
      ]        
    }
  },
  components: {
    DashItem
  },    
  methods: {

  },
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
    "item-5 ...... item-6 ...... item-7 ...... ......" auto
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
      "...... ...... ......" 16px
      "item-7 item-7 item-7" auto
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
      @for $i from 1 through 7 {
        &:nth-child(#{$i}){
          grid-area: item-#{$i};
        }
      }
    }
  }
}
</style>