<template>
  <div>
    <div :class="classes">
      <div class="header">
        <h3 class="header__title">Error</h3>
        <p v-html="message" class="header__desc"></p>
      </div>
      <div v-if="isShowCustomizeButton" class="body">
        <a class="btn __g __l mb-0" :href="buttonUrl">
          {{ buttonText }}
        </a>
      </div>
      <button v-if="allowClose" class="close" @click="hideModal">
        <img src="@/assets/images/cross.svg" />
        close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorForAdminModal",
  computed: {
    classes() {
      const classes = ["modal-box", `--${this.$store.state.modal.size}`];
      return classes;
    },
    message() {
      return this.$store.state.modal.params.message;
    },
    allowClose() {
      return "allowClose" in this.$store.state.modal.params
        ? this.$store.state.modal.param
        : true;
    },
    isShowCustomizeButton() {
      return "btn" in this.$store.state.modal.params;
    },
    buttonText() {
      return this.$store.state.modal.params.btn.text;
    },
    buttonUrl() {
      return this.$store.state.modal.params.btn.url;
    },
  },
  methods: {
    hideModal() {
      this.$store.dispatch("modal/hide");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/old/style.scss";
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
  }
}
.header {
  @include media(pc) {
    padding: 24px;
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
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    &__desc {
      font-size: 1.5rem;
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
    padding: 24px 50px 40px;
  }
  @include media(sp) {
    padding: 24px 12px 48px;
    .btn_content {
      margin-left: 0;
      p {
        font-size: 10px;
      }
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
