
<script>
/* eslint no-unused-vars: 0 */
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

export default {
  name: 'ConnectWallet',
  methods: {
    connectByMetamask(success = null, failure = null, error = null) {
      /*
      Functions for connecting Metamask(Handled by Web3ConnectTeam)

      Please implement the process of connecting to the wallet using Metamask.
      The three arguments "success", "failure", and "error" set
      in the function arguments are all callback functions.
      "success": If the set value is a function, it will be executed when the wallet connection succeeds.
      "failure": If the set value is a function, it will be executed when the wallet connection fails.
      "error": If the set value is a function, it will be executed by catch when exceptions is thrown.

      If it is possible to specify the network when connecting to the wallet,
      I would like the default to be connected to the Ethereum network(Network ID: 1).
      */

      // When the wallet connection is successful, do the following
      const connectionInfo = {
        provider: 'here_is_provider_object', // Connection object(Web3js? WalletConnectProvider?)
        networkId: 56, // Current connection network ID
        walletAddress: 'here_is_current_connection_wallet_address' // Current connection wallet address
      };
      this.$store.dispatch('onConnect', connectionInfo);
      if (typeof success === 'function') {
        success();
      }
    },
    connectByWalletConnect(success = null, failure = null, error = null) {
      /*
      Functions for connecting WalletConnect(Handled by Web3ConnectTeam)

      Please implement the process of connecting to the wallet using WalletConnect.
      The three arguments "success", "failure", and "error" set
      in the function arguments are all callback functions.
      "success": If the set value is a function, it will be executed when the wallet connection succeeds.
      "failure": If the set value is a function, it will be executed when the wallet connection fails.
      "error": If the set value is a function, it will be executed by catch when exceptions is thrown.

      If it is possible to specify the network when connecting to the wallet,
      I would like the default to be connected to the Ethereum network(Network ID: 1).
      */

      // When the wallet connection is successful, do the following
      const connectionInfo = {
        provider: 'here_is_provider_object', // Connection object(Web3js? WalletConnectProvider?)
        networkId: 56, // Current connection network ID
        walletAddress: 'here_is_current_connection_wallet_address' // Current connection wallet address
      };
      this.$store.dispatch('onConnect', connectionInfo);
      if (typeof success === 'function') {
        success();
      }
    },
    setNetworkTickerBalance() {
      /*
      Function for get the ticker symbol balance of the selected network from the currently connected wallet(Handled by Web3ConnectTeam)
      */

     // example
     return '0.04247';
    }
  }
}
</script>
