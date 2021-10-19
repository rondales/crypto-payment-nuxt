<template>
  <div>
    <div class="keys-wrap">
      <div class="title">
        Authentication key
      </div>
      <div class="address">
        {{address | omittedText}}
      </div>
      <div class="copy" @click="copy(address)">Copy Address</div>
      <div class="desc">
        The Authentication key is a unique value that is assigned to each merchant.
        <br>
        The Authentication key is used to generate the signature parameters for certain web APIs that require a request parameter for signature.        
      </div>
    </div>
    <div class="keys-wrap">
      <div class="title">
        Bearer Token
      </div>
      <div class="address">
        {{address | omittedText}}
      </div>
      <div class="copy" @click="copy(address)">Copy Address</div>
      <div class="desc">
        The Authentication key is a unique value that is assigned to each merchant.
        <br>
        The Authentication key is used to generate the signature parameters for certain web APIs that require a request parameter for signature.        
      </div>
    </div>    
  </div>
</template>


<script>
export default {
  name: 'PaymentTop',
    data() {
      return{
        success: true,
        address: "https://ethscan.com/address/0x262acb69eda34ed724034aea047c90bb86236189"
      }
    },
  methods: {
    copy(value) {
      this.$clipboard(value);
    },
  },
  components: {
  },
  filters: {
    omittedText(text) {
      if (window.innerWidth <= 768) {
        return text.length > 32 ? text.slice(0, 32) + "…" : text;
      } else {
        return text;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.keys-wrap{
  margin-bottom: 48px;
}

.title{
  font-size: 22px;
  font-weight: 100;
  margin-bottom: 16px;
}
.address{
  border: 1px solid #78668D;
  padding: 8px 24px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 100;
  margin-bottom: 16px;
  @include media(sp) {
    font-size: 14px;
  }
}
.copy{
  color: #8E86AD;
  font-size: 17px;
  position: relative;
  display: inline-block;
  font-weight: 200;
  cursor: pointer;
  margin-bottom: 16px;
  &::after{
    content: "";
    background: url(/assets/images/copy-address.svg) no-repeat center center;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    right: -40px;
    transform: translate(-50%, -60%);
  }        
}
.desc{
  font-size: 17px;
  font-weight: 100;
}
</style>