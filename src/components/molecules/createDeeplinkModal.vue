<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">Deeplink Create</h3>
    </div>
    <div class="body">
      <p class="sub-title">Apps terminal Note</p>
      <div class="text-wrap">
        <textarea
          v-model="note"
          name="note"
          id="note"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="dsc-wrap">
        <span class="dsc"> ※ This Note can be changed later. </span>
      </div>
      <button @click="confirm" class="btn __l">Create</button>
    </div>
    <button class="close" @click="hideModal">
      <img src="@/assets/images/cross.svg" />
      閉じる
    </button>
  </div>
</template>

<script>
import RequestUtility from "@/utils/request";

export default {
  name: "walletModal",
  data() {
    return {
      note: "",
    };
  },
  computed: {
    classes() {
      return ["modal-box", `--${this.$store.state.modal.size}`];
    },
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL;
    },
  },
  methods: {
    hideModal() {
      this.$store.dispatch("modal/hide");
    },
    apiCreateDeepLink() {
      const url = `${this.baseUrl}/api/v1/management/authorization-code`;
      const options = {
        headers: { Authorization: RequestUtility.getBearer() },
      };
      const data = {
        note: this.note,
      };
      return this.axios.post(url, data, options);
    },
    // send to Note in storeAppTable
    confirm() {
      this.apiCreateDeepLink()
        .then((res) => {
          this.$store.dispatch("deeplink/updateLink", res.data);
          this.note = "";
          this.$store.dispatch("modal/show", {
            target: "open-qr-modal",
            size: "small",
          });
        })
        .catch((e) => console.error(e));
    },
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
  background: #292536;
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
  }
}
.header {
  @include media(pc) {
    padding: 24px 24px 0 24px;
    &__title {
      font-size: 2.5rem;
      margin-bottom: 4rem;
    }
    &__desc {
      font-size: 2rem;
    }
  }
  @include media(sp) {
    padding: 18px;
    &__title {
      font-size: 2.3rem;
    }
  }
  &__title {
    font-weight: 500;
  }
  &__desc {
    font-weight: 100;
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
    padding: 0 24px 40px;
  }
  @include media(sp) {
    padding: 0 12px 48px;
  }
  .sub-title {
    font-size: 18px;
    margin-bottom: 16px;
  }
  .text-wrap {
    text-align: center;
    textarea {
      font-size: 16px;
      resize: none;
      width: 100%;
      height: 160px;
      background: #171522;
      padding: 16px;
      border-radius: 10px;
      outline: none;
      margin-bottom: 4px;
    }
  }
  .dsc-wrap {
    text-align: center;
    margin-bottom: 32px;
  }
  .dsc {
    font-size: 12px;
    font-weight: 200;
  }
  .btn {
    width: 70%;
    margin: auto;
  }
}
.footer {
  text-align: center;

  @include media(pc) {
    padding: 0 40px 40px;
  }
  @include media(sp) {
    padding: 0 32px 32px;
  }
}
</style>