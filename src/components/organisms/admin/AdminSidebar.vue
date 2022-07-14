<template>
  <div>
    <div class="side-bar" :class="{'active': $store.state.hamberger === true}">
      <div class="side-bar--top"></div>
      <div class="side-bar--content">
        <div class="side-bar--inner">
          <ul>
            <li @click="close()">
              <router-link to="/admin/dashboard">
                Dashboard
              </router-link>
            </li>
            <li @click="close()">
              <router-link to="/admin/payment/history" :class="{ inactive: isUnselectedReceiveToken }">
                History
              </router-link>
            </li>
            <li @click="close()">
              <router-link to="/admin/payment/settings/contract" :class="{ inactive: isUnselectedReceiveToken, 'router-link-active': isSettingsPage }">
                Settings
              </router-link>
            </li>
            <!--
            @todo remove comment out when implementing invoice function
            <li @click="close()">
              <router-link to="/admin/invoice">
                invoice
              </router-link>
            </li>
            -->
            <li @click="close()">
              <router-link to="/admin/keys" :class="{ inactive: isUnselectedReceiveToken }">
                Keys
              </router-link>
            </li>
            <li v-if="isUseTestnet" @click="close()">
              <a
                target="_blank"
                href="/test"
              >
                Test with key
              </a>
            </li>
            <li v-if="isShowPluginStore" @click="close()">
              <a
                target="_blank"
                :href="PLUGIN_STORE_URL"
              >
                Plug in Store
              </a>
            </li>
            <li @click="close()">
              <a
                target="_blank"
                href="https://slash-fi.gitbook.io/docs/integration-guide/introduction"
              >
                Documents
              </a>
            </li>
            <li @click="close()">
              <a
                target="_blank"
                href="https://slash-fi.gitbook.io/docs/support/help-center#developer-support"
              >
                Support
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'payment',
  computed: {
    PLUGIN_STORE_URL() {
      return process.env.VUE_APP_PLUGIN_STORE_URL
    },
    isUnselectedReceiveToken() {
      return !(this.$store.state.account.receiveSymbol)
    },
    isSettingsPage() {
      const targetPaths = [
        '/admin/payment/settings/basic',
        '/admin/payment/settings/contract',
        '/admin/payment/settings/domain'
      ]
      return targetPaths.includes(this.$route.path)
    },
    isUseTestnet() {
      return !JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
    },
    isShowPluginStore() {
      try {
        new URL(this.PLUGIN_STORE_URL)
        return true
      } catch(ex) {
        return false
      }
    }
  },
  methods: {
    close(){
      this.$store.state.hamberger = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.side-bar{
  position: fixed;
  top: 80px;
  bottom: 0;
  left: 0;
  width: 170px;
  border-right: 1px solid #58466E;
  @include media(sp) {
    display: none;
    &.active{
      display: block;
      top: 0;
      width: 100%;
      background: var(--color_bg);
      z-index: 999;
      padding-top: 64px;
    }
  }
  &--top{
    margin-top: 46px;
  }
  &--content{
    overflow-y: auto;
    &::-webkit-scrollbar{
      display: none;
    }
  }
  &--inner{
    width: 170px;
    ul{
      li{
        padding: 8px 24px;
        margin-bottom: 20px;
        font-size: 15px;
        a{
          color: #fff;
          text-decoration: none;
          &.inactive{
            pointer-events: none;
            color: #838383;
          }
        }
      }
    }
  }
}
.router-link-active{
  color: #8B2AE1;
  background: linear-gradient(120deg, #5294F5 30%, #705CEA 50%, #8B2AE1 66%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 150% 150%;
}
</style>