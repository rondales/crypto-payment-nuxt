<template>
  <div>
    <div class="copied" v-if="copied">
      copied
    </div>
    <div class="keys-wrap">
      <div class="title">
        Authentication Token
      </div>
      <div class="address">
        {{orderToken | omittedText}}
      </div>
      <div class="copy" @click="copy(orderToken)">Copy</div>
      <div class="desc">
        This is the authentication token used when making a payment request to Slash Payment.
        <br>
        Specify this value in the "order_token" field of the request parameter when sending a request to the "Payment Request API".
      </div>
    </div>
    <div class="keys-wrap">
      <div class="title">
        Hash Token
      </div>
      <div class="address">
        {{hashToken | omittedText}}
      </div>
      <div class="copy" @click="copy(hashToken)">Copy</div>
      <div class="desc">
        This is the value used to generate the hash string set in "verify_token", a request parameter of the "Payment Request API".
        <br>
        The hash value to be set for "verify_token" is the value obtained by hashing the string "order_code::amount::ThisValue(HashToken)" with SHA256. If you don't specify amount, it become "order_code::::ThisValue(HashToken)" with SHA256
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'PaymentTop',
  data() {
    return{
      orderToken: '',
      hashToken: '',
      copied: false
    }
  },
  methods: {
    apiGetCertificationData() {
      const url = process.env.VUE_APP_API_BASE_URL + '/api/v1/management/setting/certification'
      const data = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('login_token')
        }
      }
      return this.axios.get(url, data)
    },
    copy(value) {
      this.$store.dispatch('account/copied')
      this.$clipboard(value);
    },
    logout() {
      localStorage.removeItem('login_token');
        this.$router.push({
        path: '/admin'
      })
    }
  },
  created() {
    this.apiGetCertificationData().then((response) => {
      this.orderToken = response.data.order_token
      this.hashToken = response.data.hash_token
    }).catch((error) => {
      if (error.response.status === 401) {
        this.logout()
      } else {
        alert('Please try again.')
      }
    })
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
  font-weight: 400;
  margin-bottom: 16px;
}
.address{
  border: 1px solid #78668D;
  padding: 8px 24px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 300;
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
  font-weight: 300;
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
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.desc{
  font-size: 17px;
  font-weight: 300;
}
</style>