<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">QR Code</h3>
    </div>
    <div class="body">
      <div class="qr">
        <div class="qr_wrap">
          <a :href="qrCode">
            <vue-qrcode
                id="qrblock"
                value="test"
                :options="{
                  width: 325,
                }"
            />
            <img
                class="logo"
                src="@/assets/images/logo-icon.svg"
                alt="Web3 Payment"
            />
          </a>
          <img
              class="logo2"
              src="@/assets/images/logo-text.svg"
              alt="Web3 Payment"
          />
        </div>
      </div>
      <button class="btn __l add-flex j-center a-center" @click="downLoad">
        <span> Download </span>
      </button>
    </div>
    <button class="close" @click="hideModal">
      <img src="@/assets/images/cross.svg"/>
      <span> 閉じる </span>
    </button>
  </div>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import moment from "moment";

export default {
  name: "paymentQrCodeModal",
  data() {
    return {
      qrCode: '',
    };
  },
  components: {
    VueQrcode,
  },
  computed: {
    classes() {
      return ["modal-box", `--${this.$store.state.modal.size}`];
    },
    qrCodeUrl() {
      return `${location.protocol}//${location.host}/qr-code/${this.qrCode}`;
    }
  },
  methods: {
    downLoad() {
      const canvas = document.getElementById('qrblock')
      const link = document.createElement('a');
      link.download = `qr_code_${moment().format('DDMMYYYYhhmm')}.png`;
      link.href = canvas.toDataURL()
      link.click();
    },
    hideModal() {
      this.$store.dispatch("modal/hide");
    }
  },
  mounted() {
    this.qrCode = this.params.qr_code
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.modal-box {
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color_bg);
  @include media(pc) {
    &.--small {
      width: 470px;
    }
    &.--medium {
      width: 760px;
    }
  }
  @include media(sp) {
    width: calc(100vw - 32px);
    max-height: 85%;
    overflow: auto;
  }
}

.header {
  @include media(pc) {
    padding: 24px 24px 0 24px;
    &__title {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
    &__title::before {
      width: 2.5rem;
      height: 2.5rem;
    }
    &__desc {
      font-size: 1.6rem;
    }
  }
  @include media(sp) {
    padding: 18px 18px 0 18px;
    &__title {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    &__title::before {
      width: 2rem;
      height: 2rem;
    }
    &__desc {
      font-size: 1.5rem;
    }
  }

  &__title {
    font-weight: 500;
  }
}

.close {
  position: absolute;
  width: 16px;
  height: 16px;
  font-size: 0;
  @include media(pc) {
    top: 30px;
    right: 24px;
  }
  @include media(sp) {
    top: 24px;
    right: 24px;
  }
}

.body {
  @include media(pc) {
    padding: 24px 24px 24px 24px;
    &__title {
      font-size: 2rem;
    }
    &__title::before {
      width: 2.7rem;
      height: 2.7rem;
    }
  }
  @include media(sp) {
    padding: 24px 18px 24px 18px;
    &__title {
      font-size: 1.8rem;
    }
    &__title::before {
      width: 2.2rem;
      height: 2.2rem;
    }
    .btn_content {
      margin-left: 0;

      p {
        font-size: 10px;
      }
    }
  }

  &__title {
    font-weight: 300;
    margin-bottom: 1rem;

    &:before {
      content: "";
      margin-right: 5px;
      display: inline-block;
      background: url(/assets/images/reuse-green.svg) no-repeat center center;
      background-size: contain;
      vertical-align: middle;
    }
  }

  .qr {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    background: $gradation-light;
    padding: 6px;
    border-radius: 1rem;
    overflow: hidden;

    &_wrap {
      background-color: #fff;
      padding-bottom: 1rem;
    }

    a {
      position: relative;
      display: block;
      @include media(pc) {
        pointer-events: none;
      }

      img {
        width: 100%;
        position: relative;
        z-index: 1;
        border-radius: 1rem;
      }
    }

    .logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      width: 20%;
      height: auto;
    }

    .logo2 {
      width: 38%;
      margin-left: auto;
      margin-right: auto;
      display: block;
      margin-top: -1rem;
      position: relative;
      z-index: 10;
    }
  }

  .desc {
    margin-bottom: 1rem;
  }

  .btn {
    width: 70%;
    margin: auto;

    img {
      padding: 0 12px 0 0 !important;
      width: 34px;
    }
  }
}
</style>