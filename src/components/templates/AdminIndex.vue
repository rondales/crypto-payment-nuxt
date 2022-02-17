<template>
  <div class="ADMIN">
    <div>
      <Header />
      <SideBar />
      <div class="contents">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/organisms/header"
import SideBar from "@/components/organisms/admin/AdminSidebar"
import { LOGIN_TOKEN } from '@/constants'
import AvailableNetworks from '@/network'

export default {
  name: 'Contents',
  components: {
    Header,
    SideBar
  },
  computed: {
    web3() {
      return this.$store.state.web3.instance
    },
    web3Provider() {
      return this.$store.state.web3.instance.currentProvider
    },
    availableNetworks() {
      return Object.values(AvailableNetworks).map((network) => {
        return network.chainId
      })
    }
  },
  methods: {
    handleAccountChanged() {
      if (localStorage.getItem(LOGIN_TOKEN)) localStorage.removeItem(LOGIN_TOKEN)
      this.$router.push({ path: '/admin' })
    },
    handleChainChanged(chainId) {
      if (this.availableNetworks.includes(chainId)) {
        this.$store.dispatch('web3/updateChainId', chainId)
      } else {
        this.$store.dispatch('web3/updateChainId', null)
        this.$store.dispatch('openModal', {
          target: 'error-modal',
          size: 'small',
          message: 'The current network does not support it.'
        })
      }
    },
    handleDisconnected() {
      if (localStorage.getItem(LOGIN_TOKEN)) localStorage.removeItem(LOGIN_TOKEN)
      this.$router.push({ path: '/admin' })
    }
  },
  mounted() {
    if (this.web3Provider) {
      this.web3Provider.on('accountsChanged', () => {
        this.handleAccountChanged()
      })
      this.web3Provider.on('chainChanged', (chainId) => {
        chainId = (this.web3.utils.isHex(chainId))
          ? this.web3.utils.hexToNumber(chainId)
          : chainId
        this.handleChainChanged(chainId)
      })
      this.web3Provider.on('disconnect', () => {
        this.handleDisconnected()
      })
    }
  },
  beforeDestroy() {
    if (this.web3Provider) {
      this.web3Provider.removeListener(
        'accountsChanged',
        this.handleAccountChanged
      )
      this.web3Provider.removeListener(
        'chainChanged',
        this.handleChainChanged
      )
      this.web3Provider.removeListener(
        'disconnect',
        this.handleDisconnected
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.contents{
  padding: 48px;
  margin-left: 170px;
  margin-top: 80px;
  @include media(sp) {
    padding: 0 24px;
    margin-left: 0;
    margin-bottom: 160px;
  }
}

</style>