<script>
export default {
  name: 'ModalControl',
  computed: {
    classes() {
      return [ 'modal-box', `--${this.$store.state.modal.size}` ]
    }
  },
  methods: {
    openModal(target, size) {
      this.$store.dispatch('openModal', {target: target, size: size});
    },
    closeModal() {
      this.$store.dispatch('closeModal');
    },
    openWalletModal(size = 'small') {
      this.openModal('wallet-modal', size)
    },
    openMetamaskErrorModal(size = 'small') {
      this.openModal('error-metamask-modal', size);
    },
    openWalletConnectErrorModal(size = 'small') {
      this.openModal('error-wallet-modal', size);
    }
  }
}
</script>
