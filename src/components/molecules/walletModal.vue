<template>
  <div :class="classes">
    <div class="header">
      <h3 class="header__title">
        Select a Wallet
      </h3>
    </div>
    <div class="body">
      <button class="btn __m full" @click="connectWithMetamask">
        <span class="btn-icon">
          <img src="@/assets/images/metamask-fox.svg">
        </span>
          MetaMask
      </button>
      <button class="btn __m full" @click="connectWithWalletConnect">
        <span class="btn-icon">
          <img src="@/assets/images/wallet-connect.svg">
        </span>
          WalletConnect
      </button>
    </div>
    <button class="close" @click="closeModal">
      <img src="@/assets/images/cross.svg">
      閉じる
    </button>
  </div>
</template>

<script>
  import Web3 from 'web3';
  import WalletConnectProvider from '@walletconnect/web3-provider';

  export default {
    name: 'walletModal',
    components: {
    },
    data() {
      return {
        num: "",
      };
    },
    computed: {
      classes() {
        const classes = [ 'modal-box', `--${this.$store.state.modal.size}` ]
        return classes
      }
    },
    methods: {
      closeModal() {
        this.$store.dispatch('closeModal')
      },
      connectWithMetamask() {
        if (typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);
          web3.eth.requestAccounts().then((accounts) => {
            sessionStorage.setItem('provider', 'metamask');
            this.$store.dispatch('onLogin', {
              provider: web3,
              walletAddress: accounts[0]
            });
          }).catch(() => {
            this.$store.dispatch('openModal', {target: 'error-metamask-modal', size: 'small'});
          });
        } else {
          this.$store.dispatch('openModal', {target: 'error-metamask-modal', size: 'small'});
        }
      },
      async connectWithWalletConnect() {
        const provider = new WalletConnectProvider({
          infuraId: process.env.VUE_APP_INFURA_ID,
          rpc: {
            56: 'https://bsc-dataseed.binance.org',
            97: 'https://data-seed-prebsc-1-s1.binance.org:8545'
          }
        });

        let accounts;
        try {
          accounts = await provider.enable()
        } catch {
          this.$store.dispatch('openModal', {target: 'error-wallet-modal', size: 'small'});
          return;
        }
        const web3 = new Web3(provider);
        sessionStorage.setItem("provider", "wallet_connect");
        this.$store.dispatch("onLogin", {
          provider: web3,
          walletAddress: accounts[0]
        });
      },
      isSelectedNetwork() {
        return !!this.$store.state.network.abbriviation;
      }
    },
    mounted() {
      //
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .modal-box {
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:var(--color_bg);
    @include media(pc) {
      &.--small {
        width: 470px;
      }
      &.--medium {
        width: 760px;
      }
    }
    @include media(sp) {
      width: calc(100vw - 32px);
    }

  }
  .header {
    @include media(pc) {
      padding: 24px;
      &__title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      &__desc {
        font-size: 2rem;
      }
    }
    @include media(sp) {
      padding: 18px;
      &__title {
        font-size: 1.7rem;
      }
    }
    &__title {
      font-weight: 500;
    }
    &__desc {
      font-weight: 100;
    }
  }
  .close {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 0;

    @include media(pc) {
      top: 30px;
      right: 24px;
    }
    @include media(sp) {
      top: 24px;
      right: 24px;
    }
  }
  .body {
    @include media(pc) {
      padding: 24px 24px 40px;
    }
    @include media(sp) {
      padding: 16px 12px 48px;
    }
  }
  .footer {
    text-align: center;

    @include media(pc) {
      padding: 0 40px 40px;
    }
    @include media(sp) {
      padding: 0 32px 32px;
    }
  }
</style>