<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Warning
      </h3>
      <p class="header__desc">
        {{ message }}
      </p>
      <br>
      <div>
        <input type="checkbox" name="paying-accept" id="paying-accept" ref="accepted" @click="updateAcceptedStatus">
        <label for="paying-accept" id="paying-accept-checkbox"> I understood and wish to continue</label>
      </div>
      <br>
      <div id="button-container">
        <button class="continue-button" :class="{ __active: isAccepted }" @click="hideModal">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'errorModal',
    components: {
    },
    data () {
      return {
        accepted: false
      }
    },
    computed: {
      classes() {
        const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
        return classes
      },
      message() {
        return this.$store.state.modal.params.message
      },
      isAccepted() {
        return this.accepted
      }
    },
    methods: {
      hideModal() {
        if(this.isAccepted) {
          this.$store.dispatch('modal/hide')
        }
      },
      updateAcceptedStatus() {
        this.accepted = this.$refs.accepted.checked
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .modal-box {
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:var(--color_bg);
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
      padding: 24px 24px 40px;
    }
    @include media(sp) {
      padding: 24px 12px 48px;
      .btn_content{
        margin-left: 0;
        p{
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
  #paying-accept-checkbox {
    font-size: 1.5rem;
    line-height: 1.5;
    cursor: pointer;
  }
  #button-container {
    text-align: center;
  }
  .continue-button {
    position: relative;
    font-size: 17px;
    font-weight: 100;
    cursor: pointer;
    padding: 4px 16px;
    border-radius: 10px;
    border: solid 1px #fff;
    &.__active {
      color: #fff;
      background: $gradation-pale;
    }
  }
</style>