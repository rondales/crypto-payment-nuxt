<template>
  <div>
    <div class="toggle-btn mb-3 add-flex j-around">
      <router-link to="/admin/payment/history" class="toggle-right">
        History
      </router-link>
      <router-link to="/admin/payment/settings/contract" class="toggle-left" :class="{'router-link-exact-active': isSettingsPage}">
        Settings
      </router-link>
    </div>
    <div>
      <TransactionHistory v-if="isHistoryPage"/>
      <AdminSettings v-if="isSettingsPage"/>
    </div>
  </div>
</template>


<script>
import TransactionHistory from '@/components/organisms/admin/AdminTransactionHistory'
import AdminSettings from '@/components/organisms/admin/AdminSettings'

export default {
  name: 'AdminWeb3Payment',
  components: {
    TransactionHistory,
    AdminSettings
  },
  data() {
    return {
      isHistory: false,
      id: "",
    }
  },
  computed: {
    isHistoryPage() {
      const targetPath = '/admin/payment/history'
      return this.$route.path === targetPath
    },
    isSettingsPage() {
      const targetPaths = [
        '/admin/payment/settings/basic',
        '/admin/payment/settings/contract',
        '/admin/payment/settings/domain'
      ]
      return targetPaths.includes(this.$route.path)
    }
  },
  mounted() {
    if(!this.$route.query.id){
      this.isHistory = true;
    }
  }
}
</script>

<style lang="scss" scoped>
/*
TODO:
To apply the new UI on the Admin side,
change the style.scss to import style.scss directly under the scss directory.
*/
@import '@/assets/scss/old/style.scss';

.toggle-btn{
  width: 30%;
  @include media(sp) {
    width: 100%;
  }
}
.toggle-right, .toggle-left{
  cursor: pointer;
  width: 50%;
  padding-bottom: 6px;
  border-bottom: 1px solid #78668D;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  &.router-link-exact-active{
    border-bottom: 1px solid #78668D;
    &::after{
      content: "";
      position: relative;
      bottom: -8px;
      margin-top: 10px;
      display: block;
      height: 3px;
      background: $gradation-light;
    }
  }
}
</style>