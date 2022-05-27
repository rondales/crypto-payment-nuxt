<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">Apps terminal Note</h3>
    </div>
    <div class="body">
      <div class="text-wrap">
        <textarea
          v-model="note"
          name="note"
          id="note"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <button @click="saveNote" class="save">
        Save Note
        <img src="@/assets/images/edit.svg" />
      </button>
    </div>
    <button class="close" @click="hideModal">
      <img src="@/assets/images/cross.svg" />
      閉じる
    </button>
  </div>
</template>

<script>
import RequestUtility from "@/utils/request";
import { errorCodeList } from "@/enum/error_code";

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
    deeplinks() {
      return this.$store.state.deeplink.links;
    },
    deeplink() {
      return this.$store.state.modal.params.record;
    },
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL;
    },
  },
  methods: {
    apiUpdateDeepLinkNote() {
      const url = `${this.baseUrl}/api/v1/management/authorization-code/${this.deeplink.id}/updateNote`;
      const options = {
        headers: { Authorization: RequestUtility.getBearer() },
      };
      const data = {
        note: this.note,
      };

      return this.axios.patch(url, data, options);
    },
    hideModal() {
      this.$store.dispatch("modal/hide");
    },
    // save the Terminal info note
    saveNote() {
      this.apiUpdateDeepLinkNote()
        .then((res) => {
          if (res.data.updated) {
            this.$store.dispatch("deeplink/updateLinks", {
              ...this.deeplinks,
              data: this.deeplinks.data.map((deeplink) => {
                if (deeplink.id === this.deeplink.id) {
                  return {
                    ...deeplink,
                    note: this.note,
                  };
                }
                return deeplink;
              }),
            });
            this.note = "";
            this.hideModal();
          }
        })
        .catch((error) => {
          let message;
          if (error.response.status === 400) {
            message = errorCodeList[error.response.data.errors.shift()].msg;
          } else {
            message = "Please try again after a while.";
          }
          this.showErrorModal(message);
        });
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
  },
  mounted() {
    this.note = this.deeplink.note;
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
      margin-bottom: 2rem;
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
    padding: 0 24px 24px;
  }
  @include media(sp) {
    padding: 0 12px 24px;
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
      margin-bottom: 16px;
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
  .save {
    text-align: center;
    width: 100%;
    font-size: 18px;
    img {
      margin-left: 8px;
      width: 20px;
    }
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