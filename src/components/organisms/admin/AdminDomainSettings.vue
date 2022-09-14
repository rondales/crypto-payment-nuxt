<template>
  <div class="manage-domain">
    <div class="manage-contents_clm">
      <h4>Receiver Domain Setting</h4>
      <p>
        Please enter the your domain. If you have completed TXT record
        authentication for the domain, this domain will be exposed to the user
        on the payment pages.
        <br />
        Also, if the domain is not set, your account address will be displayed
        to the user on the payment pages.
      </p>
      <div>
        <input class="text-box" type="text" v-model="domain" />
      </div>
      <div class="manage-contents_create-url" @click="updateSettings">Save</div>
    </div>
    <div class="manage-contents_clm">
      <h4>Prove ownership of a domain with TXT records</h4>
      <p>
        By authenticating the domain with a TXT record, the domain and
        authentication mark will be displayed on the payment pages.
        <br />
        If you have not completed authentication, your account address will be
        displayed to the user on the payment pages.
      </p>
      <div>
        <input class="text-box" type="text" v-model="txt" disabled />
      </div>
      <div class="manage-contents_create-url" @click="verifyDomain">Check</div>
      <div class="verify" v-if="verified">verified</div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL, HTTP_CODES } from '@/constants'
import apiMixin from '@/components/mixins/ApiHandler'

export default {
  name: 'AdminDomainSettings',
  mixins: [apiMixin],
  data() {
    return {
      domain: '',
      txt: '',
      verified: false
    }
  },
  methods: {
    apiGetSettings() {
      const url = `${API_BASE_URL}/api/v1/management/setting/domain`
      return this.axios.get(url, this.$_apiHandler_getOptions())
    },
    apiUpdateSettings() {
      const url = `${API_BASE_URL}/api/v1/management/setting/domain`
      const data = { domain: this.domain }
      return this.axios.patch(url, data, this.$_apiHandler_getOptions())
    },
    apiVerifyDomain() {
      const url = `${API_BASE_URL}/api/v1/management/setting/domain/verify`
      return this.axios.get(url, this.$_apiHandler_getOptions())
    },
    getSettings() {
      this.apiGetSettings()
        .then((response) => {
          this.domain = response.data.domain
          this.txt = response.data.txt
          this.verified = response.data.verified
        })
        .catch((error) => {
          this.$_apiHandler_apiConnectionErrorHandler(
            error.response.status,
            error.response.data
          )
        })
    },
    updateSettings() {
      this.apiUpdateSettings()
        .then((response) => {
          this.verified = !response.data.re_verify
        })
        .catch((error) => {
          this.$_apiHandler_apiConnectionErrorHandler(
            error.response.status,
            error.response.data
          )
        })
    },
    verifyDomain() {
      this.apiVerifyDomain()
        .then(() => {
          this.verified = true
        })
        .catch((error) => {
          error.response.status === HTTP_CODES.BAD_REQUEST
            ? (this.verified = false)
            : this.$_apiHandler_apiConnectionErrorHandler(
                error.response.status,
                error.response.data
              )
        })
    }
  },
  created() {
    this.getSettings()
  }
}
</script>

<style lang="scss" scoped>
/*
TODO:
To apply the new UI on the Admin side,
change the style.scss to import style.scss directly under the scss directory.
*/
@import '@/assets/scss/old/style.scss';

.manage-contents {
  &_clm {
    margin-bottom: 32px;
    h4 {
      font-size: 18px;
      font-weight: 300;
      margin-bottom: 16px;
      span {
        color: #b52828;
      }
    }
    p {
      font-size: 14px;
      font-weight: 300;
      margin-bottom: 24px;
      width: 70%;
    }
    .text-box {
      border-radius: 8px;
      border: 1px solid #78668d;
      width: 70%;
      padding: 12px;
      font-size: 14px;
      font-weight: 300;
      margin-bottom: 24px;
    }
    .verify {
      margin-top: 24px;
      padding-left: 32px;
      font-weight: 300;
      font-size: 18px;
      color: #00ff4e;
      position: relative;
      &::after {
        content: '';
        background: url(/assets/images/check-mark.svg) no-repeat center center;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(-50%, -50%);
      }
    }
  }
  &_create-url {
    display: inline;
    text-align: center;
    font-weight: 200;
    font-size: 14px;
    line-height: 40px;
    background: linear-gradient(
      90.25deg,
      #3eb9fc 5.43%,
      #6a68ed 59.32%,
      #8b2ae1 98.19%
    );
    padding: 12px 40px;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
