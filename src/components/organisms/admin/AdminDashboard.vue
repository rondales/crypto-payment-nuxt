<template>
  <div v-if="isLoaded">
    <AdminDashboardContents v-if="contractPublished" :contractsStatus="contractsStatus"/>
    <AdminDashboardPreSetting v-else/>
  </div>
</template>

<script>
import AdminDashboardPreSetting from '@/components/organisms/admin/AdminDashboardPreSetting'
import AdminDashboardContents from '@/components/organisms/admin/AdminDashboardContents'
import RequestUtility from '@/utils/request'

export default {
  name: 'PaymentTop',
  components: {
    AdminDashboardPreSetting,
    AdminDashboardContents
  },
  data() {
    return {
      loaded: false,
      contractPublished: false,
      contractsStatus: {}
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    isLoaded() {
      return this.loaded
    }
  },
  methods: {
    apiGetContractPublishedStatus() {
      const url = `${this.baseUrl}/api/v1/management/contract/status`
      const request = { headers: { Authorization: RequestUtility.getBearer() } }
      return this.axios.get(url, request)
    }
  },
  created() {
    this.apiGetContractPublishedStatus().then((response) => {
      response.data.forEach((network) => {
        this.contractsStatus[network.chain_id] = network.published
        if (network.published && !this.contractPublished) {
          this.contractPublished = !this.contractPublished
        }
      })
      this.loaded = true
    })
  }
}
</script>