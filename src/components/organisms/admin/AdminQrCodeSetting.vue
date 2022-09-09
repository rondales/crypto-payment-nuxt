<template>
  <div>
    <div class="copied" v-if="copied">copied</div>
    <div class="title">Payment URL</div>
    <p class="description"> User can access this link to create new payment link.</p>
    <div class="keys-wrap" v-if="qrCode">
      <div class="address">
        {{ qrCodeUrl }}
      </div>
      <div class="actions">
        <div class="copy" @click="copy()">Copy</div>
        <button class="btn qr" @click="showQrCode()">
          Show QR Code
        </button>
        <button class="btn refresh" @click="qrCodeRefresh()">
          <img src="@/assets/images/url-refresh.svg"/>
          Refresh
        </button>
        <button class="btn delete" @click="deleteQrCode()">
          <img src="@/assets/images/trash-box.svg"/>
          Delete
        </button>
      </div>
    </div>
    <div class="keys-wrap" v-else>
      <div class="comfirm-wrap">
        <div @click="createQrCode()" class="confirm-btn">Create</div>
        <p>Create Payment URL</p>
      </div>
    </div>
  </div>
</template>

<script>
import RequestUtility from '@/utils/request'
import {errorCodeList} from "@/enum/error_code";

export default {
  name: 'AdminQrCodeSetting',
  data() {
    return {
      copied: false,
    }
  },
  computed: {
    qrCode() {
      return this.$store.state.payment.qr_code
    },
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    qrCodeUrl() {
      return `${location.protocol}//${location.host}/qr-code/${this.qrCode}`;
    }
  },
  methods: {
    apiGetPaymentToken() {
      const url = `${this.API_BASE_URL}/api/v1/management/qr-code`
      const options = {
        headers: {Authorization: RequestUtility.getBearer()}
      }
      return this.axios.get(url, options)
    },
    apiCreatePaymentTokenToken() {
      const url = `${this.API_BASE_URL}/api/v1/management/qr-code`
      const options = {
        headers: {Authorization: RequestUtility.getBearer()}
      }
      return this.axios.post(url, null, options)
    },
    copy() {
      this.$store.dispatch('account/copied')
      this.$clipboard(this.qrCodeUrl)
    },
    createQrCode() {
      this.apiCreatePaymentTokenToken()
          .then((response) => {
            this.$store.dispatch(
                'payment/updateQrCode',
                response.data.qr_code
            )
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.logout()
            } else {
              let message;
              if (error.response.status === 400) {
                message = errorCodeList[error.response.data.errors.shift()].msg;
              } else {
                message = "Please try again after a while.";
              }
              this.showErrorModal(message);
            }
          })
    },
    qrCodeRefresh() {
      this.$store.dispatch('modal/show', {
        target: 'payment-qr-code-refresh-modal',
        size: 'small',
        params: {
          qr_code: this.qrCode
        }
      })
    },
    showErrorModal(message) {
      this.$store.dispatch("modal/show", {
        target: "error-modal",
        size: "small",
        params: {
          message: message,
        },
      });
    },
    showQrCode() {
      this.$store.dispatch('modal/show', {
        target: 'payment-qr-code-modal',
        size: 'small',
        params: {
          qr_code: this.qrCode
        }
      })
    },
    deleteQrCode() {
      this.$store.dispatch('modal/show', {
        target: 'payment-qr-code-delete-modal',
        size: 'small',
        params: {
          qr_code: this.qrCode
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
    this.apiGetPaymentToken()
        .then((response) => {
          this.$store.dispatch('payment/updateQrCode', response.data.qr_code)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.logout()
          } else {
            let message;
            if (error.response.status === 400) {
              message = errorCodeList[error.response.data.errors.shift()].msg;
            } else {
              message = "Please try again after a while.";
            }
            this.showErrorModal(message);
          }
        })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.description {
  font-weight: 200;
  font-size: 17px;
  margin-bottom: 10px;
}

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

.qr-desc {
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

  .qr {
    background: #4e455a;
    margin-right: 20px;

    img {
      margin-top: -4px;
    }
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