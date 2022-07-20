<template>
  <div>
    <PaymentModal title="Account Note">
      <p class="d-todo">{{ $options.name }}</p>
      <p class="sub-title">
        Apps terminal Note
        <span v-if="isUpdateSuccess">
          <img src="/assets/images/check-mark.svg" class="check-wrap" />
          Note Saved!
        </span>
      </p>
      <PaymentText html="" />
      <div class="text-wrap">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          maxlength="255"
          v-model="note"
        ></textarea>
      </div>
      <button @click="updateNote" class="save-note">
        Save Note
        <img src="@/assets/images/edit.svg" alt="" />
      </button>
      <PaymentButton text="Cancel" size="m" @click.native="hideModal()" />
      <!-- <PaymentText :html="message" />
      <div v-if="isShowCustomizeButton">
        <PaymentButton :text="buttonText" size="m" :url="buttonUrl" />
      </div> -->
      <div class="d-btnwrap bottomCloseBtn">
        <PaymentButton
          color="cancel"
          text="CLOSE"
          icon="dismiss"
          size="s"
          @click.native="hideModal()"
        />
      </div>
    </PaymentModal>
    <!-- <div :class="classes">
      <div class="header">
        <h3 class="header__title">Account Note</h3>
      </div>
      <div class="body">
        <p class="sub-title">
          Apps terminal Note
          <span v-if="isUpdateSuccess">
            <img src="/assets/images/check-mark.svg" class="check-wrap" />
            Note Saved!
          </span>
        </p>
        <div class="text-wrap">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            maxlength="255"
            v-model="note"
          ></textarea>
        </div>
        <button @click="updateNote" class="save-note">
          Save Note
          <img src="@/assets/images/edit.svg" alt="" />
        </button>
      </div>
      <button class="close" @click="hideModal">
        <img src="@/assets/images/cross.svg" />
        閉じる
      </button>
    </div> -->
  </div>
</template>

<script>
import RequestUtility from "@/utils/request";
import { LOGIN_TOKEN, HTTP_CODES } from "@/constants";
import { errorCodeList } from "@/enum/error_code";
import PaymentModal from "@/components/organisms/Payment/Modal";
import PaymentText from "@/components/organisms/Payment/Text";
import PaymentButton from "@/components/organisms/Payment/Button";
export default {
  name: "walletModal",
  components: {
    PaymentText,
    PaymentButton,
    PaymentModal,
  },
  data() {
    return {
      updateSuccess: false,
      note: this.$store.state.account.note,
    };
  },
  computed: {
    classes() {
      return ["modal-box", `--${this.$store.state.modal.size}`];
    },
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    isUpdateSuccess() {
      return this.updateSuccess;
    },
  },
  methods: {
    apiConnectionErrorHandler(statusCode, responseData) {
      if (statusCode === HTTP_CODES.UN_AUTHORIZED) {
        localStorage.removeItem(LOGIN_TOKEN);
        this.$router.push({ path: "/admin" });
      } else {
        if ("errors" in responseData && responseData.errors.length) {
          this.$store.dispatch("modal/show", {
            target: "error-modal",
            size: "small",
            params: {
              message: errorCodeList[responseData.errors.shift()].msg,
            },
          });
        }
      }
    },
    apiUpdateNote(data) {
      const url = `${this.baseUrl}/api/v1/management/setting/note`;
      const options = {
        headers: { Authorization: RequestUtility.getBearer() },
      };
      return this.axios.patch(url, data, options);
    },
    updateNote() {
      const data = { note: this.note.trim() };
      this.apiUpdateNote(data)
        .then(() => {
          this.updateSuccess = true;
          this.$store.dispatch("account/updateNote", data.note);
        })
        .catch((error) => {
          this.apiConnectionErrorHandler(
            error.response.status,
            error.response.data
          );
        });
    },
    hideModal() {
      this.$store.dispatch("modal/hide");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
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
      font-size: 1.7rem;
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
  .check-wrap {
    padding: 0;
    position: relative;
    width: 20px;
    height: 20px;
    top: 15%;
    left: 10px;
    margin-right: 10px;
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
  .save-note {
    margin: auto;
    display: block;
    font-size: 16px;
    img {
      vertical-align: middle;
      margin-left: 8px;
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
