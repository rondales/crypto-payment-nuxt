<template>
  <payment-index
    :colorTheme="colorTheme"
    :showFooterMenu="showFooterMenu"
    :receiver="receiver"
    :invoiceId="invoiceId"
    :base64VuexData="base64VuexData"
    @openModal="openModal"
    @switchColorTheme="switchColorTheme"
  />
</template>

<script>
import PaymentIndex from '@/components/templates/PaymentIndex'
import VuexRestore from '@/components/mixins/VuexRestore'

export default {
  name: 'payment',
  mixins: [VuexRestore],
  components: {
    PaymentIndex
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    colorTheme() {
      return this.$store.state.theme
    },
    paymentData() {
      return this.$store.state.payment
    },
    paymentId() {
      return this.paymentData.id
    },
    receiver() {
      return this.paymentData.domain
    },
    invoiceId() {
      return this.paymentData.orderCode
    },
    paymentToken() {
      return this.$route.params.token
    },
    base64VuexData() {
      return this.generateRestoreParameter()
    },
    restoreParam() {
      return this.$route.query.vx
    },
    showFooterMenu() {
      return this.$route.name === 'wallets'
    }
  },
  methods: {
    apiGetTransactionState() {
      const url = `${this.baseUrl}/api/v1/payment/transaction/state`
      const params = new URLSearchParams([['payment_token', this.paymentToken]])
      return this.axios.get(url, { params })
    },
    openModal(target, size) {
      this.$store.dispatch('openModal', { target: target, size: size })
    },
    switchColorTheme(color) {
      this.$store.dispatch('changeTheme', color)
    }
  },
  created() {
    if (this.restoreParam) {
      this.restoreVuex(this.restoreParam)
      this.$router.push({ path: `/payment/wallet/${this.paymentToken}` })
    } else {
      if (this.paymentId !== this.paymentToken) {
        this.$router.push({ path: `/payment/${this.paymentToken}` })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

</style>