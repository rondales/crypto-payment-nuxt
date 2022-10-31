<template>
  <div>
    <PaymentModal title="Open in browser" emoji="&#x1f310;">
      <img
        class="image"
        src="@/assets/images/openbrowser.png"
        alt="Open Browser"
      />
      <PaymentText
        html="Switching back to Safari or Chrome browsers from Web3 Mobile Apps
        browsers such as Metamask or Coinbase Wallet will need to be done by
        you."
      />

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
  </div>
</template>

<script>
import PaymentModal from '@/components/organisms/Payment/Modal'
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentText from '@/components/organisms/Payment/Text'
export default {
  name: 'errorModal',
  components: {
    PaymentButton,
    PaymentText,
    PaymentModal
  },
  computed: {
    classes() {
      const classes = ['modal-box', `--${this.$store.state.modal.size}`]
      return classes
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch('modal/hide')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.image {
  margin-bottom: 1rem;
}
</style>
