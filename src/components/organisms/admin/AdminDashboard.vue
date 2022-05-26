<template>
  <div v-if="isLoaded">
    <AdminDashboardContents
      v-if="contractPublished"
      :contractsStatus="contractsStatus"
    />
    <AdminDashboardPreSetting v-else />
    <AdminSidebar />
  </div>
</template>

<script>
import AdminDashboardPreSetting from "@/components/organisms/admin/AdminDashboardPreSetting";
import AdminDashboardContents from "@/components/organisms/admin/AdminDashboardContents";
import RequestUtility from "@/utils/request";
import AvailableNetworks from "@/network";
import AdminSidebar from "@/components/organisms/admin/AdminSidebar";

export default {
  name: "PaymentTop",
  components: {
    AdminDashboardPreSetting,
    AdminDashboardContents,
    AdminSidebar,
  },
  data() {
    return {
      loaded: false,
      contractPublished: false,
      contractsStatus: {},
    };
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    currentChainId() {
      return this.$store.state.web3.chainId;
    },
    isLoaded() {
      return this.loaded;
    },
  },
  methods: {
    apiGetContractPublishedStatus() {
      const url = `${this.baseUrl}/api/v1/management/contract/status`;
      const request = {
        headers: { Authorization: RequestUtility.getBearer() },
      };
      return this.axios.get(url, request);
    },
  },
  created() {
    this.apiGetContractPublishedStatus().then((response) => {
      response.data.forEach((network) => {
        this.contractsStatus[network.chain_id] = network.published;
        if (network.published && !this.contractPublished) {
          this.contractPublished = !this.contractPublished;
        }
      });
      this.loaded = true;
      const systemAvailableNetworks = Object.values(AvailableNetworks).map(
        (network) => {
          return network.chainId;
        }
      );
      if (!systemAvailableNetworks.includes(this.currentChainId)) {
        this.$store.dispatch("modal/show", {
          target: "switch-network-for-admin-modal",
          size: "medium",
        });
      }
    });
  },
};
</script>