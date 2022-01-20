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
            <button class="btn __m icon-right full" @click="useMetamask">
              <span class="btn-icon">
                <img src="@/assets/images/metamask-fox.svg">
              </span>
              MetaMask
            </button>
            <button class="btn __m icon-right full" @click="useWalletConnect">
              <span class="btn-icon">
                <img src="@/assets/images/wallet-connect.svg">
              </span>
              WalletConnect
            </button>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
/*
@todo Web3ConnectTeam

In this page, you need to implement the following process or function.

1. Wallet connection process

* After connecting to the wallet, communicate with the login API to login (Web App Team)

*/
import Header from "@/components/organisms/header"

// import AdminIndex from '@/components/templates/AdminIndex'
export default {
  name: 'payment',
  components: {
    Header,
    // AdminIndex
  },
  methods: {
    walletModal(target) {
      this.$store.dispatch("openModal", {target: target, size: "small"});
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
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
      img{
        width: 30px;
      }
    }
    dd{
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      p{
        margin-bottom: 32px;
      }
      .connect-buttons {
        //
      }
      .btn-icon {
        text-align: right;
      }
    }
  }
}
</style>