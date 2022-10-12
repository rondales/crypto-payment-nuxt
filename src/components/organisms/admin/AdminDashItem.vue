<template>
  <div class="item">
    <div>
      <h4>{{itemData.value}}</h4>
      <p>{{itemData.text}}</p>
    </div>
  </div>
</template>


<script>

export default {
  name: 'PaymentTop',
  data() {
    return{
      success: true,
    }
  },
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
  },  
  methods: {

  },
  components: {
  },
}
</script>

<style lang="scss" scoped>
/*
TODO:
To apply the new UI on the Admin side,
change the style.scss to import style.scss directly under the scss directory.
*/
@import '@/assets/scss/old/style.scss';

.item{
  background: #292536;
  padding: 24px;
  text-align: right;
  font-weight: 400;
  border-radius: 10px;
  &.lighten{
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
  @for $i from 1 through 9 {
    &:nth-child(#{$i}){
      grid-area: item-#{$i};
    }
  }
}
</style>