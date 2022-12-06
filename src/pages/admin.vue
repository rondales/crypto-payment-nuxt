<template>
  <div class="ADMIN">
    <div>
      <Header />
      <div class="connect-wallet">
        <dl>
          <dt>
            <img src="@/assets/images/logo-icon.svg" class="" alt="Slash Payment">
            Slash.fi
          </dt>
          <dd>
            <p>Apps</p>
          </dd>
          <dd class="connect-buttons">
            <button class="btn __m icon-right full" @click="authentification(METAMASK, true, false)">
              <span class="btn-icon">
                <img src="@/assets/images/metamask-fox.svg">
              </span>
              MetaMask
            </button>
            <!-- <button class="btn __m icon-right full" @click="showWalletConnectCautionModal()">
              <span class="btn-icon">
                <img src="@/assets/images/wallet-connect.svg">
              </span>
              WalletConnect
            </button> -->
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { METAMASK, WALLET_CONNECT, LOGIN_TOKEN } from '@/constants'
import Header from "@/components/organisms/admin/header"
import ConnectWalletMixin from '@/components/mixins/ConnectWallet'
import MerchantAdminAuthentificationMixin from '@/components/mixins/MerchantAdminAuthentification'

export default {
  name: 'MerchantLogin',
  components: {
    Header
  },
  mixins: [
    ConnectWalletMixin,
    MerchantAdminAuthentificationMixin
  ],
  computed: {
    METAMASK() {
      return METAMASK
    },
    WALLET_CONNECT() {
      return WALLET_CONNECT
    }
  },
  methods: {
    showWalletConnectCautionModal() {
      this.$store.dispatch('modal/show', {
        target: 'caution-wallet-connect-for-admin-modal',
        size: 'small'
      })
    }
  },
  mounted() {
    this.$store.dispatch("changeTheme", "dark");
    localStorage.removeItem(LOGIN_TOKEN)
    this.$store.dispatch('web3/initialize')
    this.$store.dispatch('account/initialize')
  }
}
</script>

<!--
Override global scope style in App.vue
TODO: Remove this when applying the new UI to the Admin side pages as well
-->
<style lang="scss">
@import '@/assets/scss/old/style.scss';
</style>

<style lang="scss" scoped>
@import '@/assets/scss/old/style.scss';
header{
  .logo{
    width: 250px;
    height: 100%;
  }
}
.connect-wallet{
  position: absolute;
  top: calc(50% + 6rem);
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow:
    -20px 20px 70px rgba(139, 42, 225, 0.7),
    20px -20px 70px rgba(62, 185, 252, 0.7);
  width: 100%;
  max-width: 38.4rem;
  padding: 16px;
  border-radius: 8px;
  background: #292536;
  padding: 50px 24px 32px;
  @include media(sp) {
    top: 20%;
    transform: translate(-50%,0);
  }
  dl{
    dt{
        text-align: center;
        margin-bottom: 32px;
        letter-spacing: 0.05em;
        font-weight: 500;
        font-size: 30px;
        line-height: 30px;
        color: #fff;
      img{
        width: 30px;
      }
    }
    dd{
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #fff;
      p{
        margin-bottom: 32px;
      }
      &.connect-buttons {
        .btn{
          background: #352D40 !important;
        }
      }
      .btn-icon {
        text-align: right;
      }
    }
  }
}
</style>