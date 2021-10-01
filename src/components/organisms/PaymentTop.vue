<template>
  <div class="payment_top add-flex">
    <div class="payment_echeck border">
      <span>Payee：</span>
      <p>
        E-check.online
      </p>
      <div class="payment_domain_state">
        <span v-if="!success">
          <img src="@/assets/images/warnning.svg" alt="">
        </span>
        <span v-if="success">
          <img src="@/assets/images/badge.svg" alt="">
        </span>
      </div>
    </div>
    <div class="payment_invoice">
      <!-- Invoice ID.<span>******************</span> -->
    </div>
    <div class="payment_linkbox add-flex j-around a-center">
      <span>
        <!-- <img src="@/assets/images/link.svg" alt=""> -->
      </span>
      <span class="refresh" @click="hoge">
        <img src="@/assets/images/refresh.svg" alt="">
      </span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'PaymentTop',
    data() {
      return{
        success: true
      }
    },
  methods: {
    hoge(){
      location.reload();
    }
  },
  components: {
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.payment_top{
  margin-bottom: 16px;
  @include media(sp) {
    margin-top: 8px;
    margin-bottom: 4px;
  }
  .payment_domain_state{
    display: inline-block;
    vertical-align: middle;
    padding-left: 80px;
  @include media(sp) {
    float: right;
  }
  }
  p{
    display: inline-block;
    margin-left: 8px;
  }
}
.payment_echeck{
  font-size: 15px;
  font-weight: 500;
  padding: 16px 16px 16px 24px;
  width: 45%;
  @include media(sp) {
    width: 100%;
  }
  input{
    &::placeholder {
      color: #fff;
    }
  }
}
.payment_invoice{
  font-size: 15px;
  padding: 16px 24px;
  width: 40%;
  @include media(sp) {
    width: 85%;
    padding: 16px 24px 16px 10px;
    margin-top: 8px;
  }
  span{
    margin-left: 8px;
  }
}
.payment_linkbox{
  width: 15%;
  span{
    width: 24px;
    text-align: center;
    height: 24px;
    line-height: 24px;
  }
}
.refresh{
  cursor: pointer;
}
</style>