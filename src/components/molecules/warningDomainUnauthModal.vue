<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Warning
      </h3>
      <p class="header__desc">
        We cannot guarantee the reliability of this payee!
      </p>
    </div>
    <div class="body">
      <div class="checkbox-container">
        <input id="accept" type="checkbox" ref="accepted" @click="updateAcceptedStatus">
        <label for="accept">I understood the dangers</label>
      </div>
      <br>
      <div class="btn-container mt-2">
        <button
          class="btn __g __l"
          :class="{ inactive: !isAccepted }"
          @click="hideModal"
        >OK</button>
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
      padding: 0 24px 24px 24px;
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
    .checkbox-container {
      font-size: 1.4rem;
      input[type="checkbox"] {
          display: none;
      }
      input[type="checkbox"]+label {
        display: none;
        cursor: pointer;
        display: inline-block;
        position: relative;
        padding-left: 25px;
        padding-right: 10px;
      }
      input[type="checkbox"]+label::before{
        content: "";
        position: absolute;
        display: block;
        box-sizing: border-box;
        width: 18px;
        height: 18px;
        margin-top: -10px;
        left: 0;
        top: 50%;
        border: 2px solid;
        border-radius: 2px;
        border-color:  var(--color_font);
        background-color: var(--color_bg);
      }
      input[type="checkbox"]:checked+label::after{
        content: "";
        position: absolute;
        display: block;
        box-sizing: border-box;
        width: 15px;
        height: 6px;
        margin-top: -6px;
        top: 50%;
        left: 3px;
        transform: rotate(-45deg);
        border-bottom: 3px solid;
        border-left: 3px solid;
        border-color:  #44d866;
      }
    }
    .btn-container {
      padding: 0 80px 0;
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