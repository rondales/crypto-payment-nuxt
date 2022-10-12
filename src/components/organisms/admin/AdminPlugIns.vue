<template>
  <div>
    <div class="copied" v-if="copied">copied</div>
    <div class="keys-wrap" v-if="token">
      <div class="title">Slash EC Plug-in API Key</div>
      <div class="address">
        {{ token | omittedText }}
      </div>
      <div class="actions">
        <div class="copy" @click="copy(token)">Copy</div>
        <button class="btn refresh" @click="tokenRefresh()">
          <img src="@/assets/images/url-refresh.svg" />
          Key refresh
        </button>
        <button class="btn delete" @click="deleteToken()">
          <img src="@/assets/images/trash-box.svg" />
          Delete
        </button>
      </div>
      <div class="desc">
        This is the Slash.fi EC Plug-in API Key. Specify this value in the API
        Key text field when setting up the EC Plug-in on your site.
        <br />
        Please refer to the Plug-in's documentation for more details.
      </div>
    </div>
    <div class="keys-wrap" v-else>
      <p class="store-desc">Slash EC Plug-in API Key</p>
      <div class="comfirm-wrap">
        <div @click="create()" class="confirm-btn">Create</div>
        <p>
          In order to make Slash.fi EC plug-in works with your account, you must
          issue an API key. This API key can be used to access your account, so
          please keep it in a safe place. For the instruction on how to install
          the Slash.fi EC plug-in, please refer to the Plug-in's documentation.
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import RequestUtility from '@/utils/request'

export default {
  name: 'AdminPlugIns',
  data() {
    return {
      copied: false
    }
  },
  computed: {
    token() {
      return this.plugInsToken.token
    },
    plugInsToken() {
      return this.$store.state.plugInsToken
    }
  },
  methods: {
    apiGetPlugInsToken() {
      const url =
        process.env.VUE_APP_API_BASE_URL + '/api/v1/management/api-key'
      const options = {
        headers: { Authorization: RequestUtility.getBearer() }
      }
      return this.axios.get(url, options)
    },
    apiCreatePlugInsToken() {
      const url =
        process.env.VUE_APP_API_BASE_URL + '/api/v1/management/api-key'
      const options = {
        headers: { Authorization: RequestUtility.getBearer() }
      }
      return this.axios.post(url, null, options)
    },
    copy(value) {
      this.$store.dispatch('account/copied')
      this.$clipboard(value)
    },
    create() {
      this.apiCreatePlugInsToken()
        .then((response) => {
          this.$store.dispatch(
            'plugInsToken/updateToken',
            response.data.api_key
          )
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.logout()
          } else {
            alert('Please try again.')
          }
        })
    },
    tokenRefresh() {
      this.$store.dispatch('modal/show', {
        target: 'plug-ins-token-refresh-modal',
        size: 'small',
        params: {
          token: this.token
        }
      })
    },
    deleteToken() {
      this.$store.dispatch('modal/show', {
        target: 'plug-ins-token-delete-modal',
        size: 'small',
        params: {
          token: this.token
        }
      })
    },
    logout() {
      localStorage.removeItem('login_token')
      this.$router.push({
        path: '/admin'
      })
    }
  },
  created() {
    this.apiGetPlugInsToken()
      .then((response) => {
        this.$store.dispatch('plugInsToken/updateToken', response.data.api_key)
      })
      .catch((error) => {
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
        return text.length > 32 ? text.slice(0, 32) + '…' : text
      } else {
        return text
      }
    }
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
.keys-wrap {
  margin-bottom: 48px;
}

.title {
  font-size: 22px;
  font-weight: 100;
  margin-bottom: 16px;
}
.address {
  border: 1px solid #78668d;
  padding: 8px 24px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 100;
  margin-bottom: 16px;
  @include media(sp) {
    font-size: 14px;
  }
}

.store-desc {
  font-size: 20px;
  margin-bottom: 32px;
  span {
    font-size: 15px;
  }
}

.comfirm-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 35px;
  padding: 24px;
  background: #292536;
  border-radius: 8px;
  margin-bottom: 48px;
  @include media(tb) {
    .confirm-btn {
      order: 2;
      width: 100%;
    }
    p {
      margin-bottom: 32px;
    }
  }
  p {
    font-size: 12px;
    font-weight: 300;
    width: 75%;
    line-height: 1.7;
  }
}

.confirm-btn {
  font-weight: 400;
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  background: $gradation-light;
  border-radius: 8px;
  cursor: pointer;
  width: 200px;
  text-align: center;
  @include media(sp) {
    width: 100%;
    text-align: center;
  }
  &:hover {
    opacity: 0.8;
  }
}
.copy {
  color: #8e86ad;
  font-size: 17px;
  position: relative;
  display: inline-block;
  font-weight: 200;
  cursor: pointer;
  margin-bottom: 16px;
  &::after {
    content: '';
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

.desc {
  font-size: 17px;
  font-weight: 100;
}

.actions {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 20px;
  .copy {
    margin-right: 50px;
  }
  .refresh {
    background: #4e455a;
    margin-right: 20px;
    img {
      margin-top: -4px;
    }
  }
  .delete {
    background: #4e455a;
    img {
      margin-top: -4px;
    }
  }
}
</style>