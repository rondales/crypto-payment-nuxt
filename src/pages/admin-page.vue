<template>
  <div class="ADMIN">
    <admin-index />
  </div>
</template>

<script>
import { LOGIN_TOKEN } from '@/constants'
import AdminIndex from '@/components/templates/AdminIndex'
export default {
  name: 'adminPage',
  components: {
    AdminIndex
  },
  methods: {
  },
  created() {
    if (!this.$store.state.web3.provider) {
      localStorage.removeItem(LOGIN_TOKEN)
      this.$router.push({
        path: '/admin'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
</style>