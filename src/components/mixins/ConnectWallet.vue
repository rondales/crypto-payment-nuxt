
<script>
/* eslint no-unused-vars: 0 */
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

export default {
  name: 'ConnectWallet',
  methods: {
    connectByMetamask(success = null, failure = null, error = null) {
      /*
      @todo Web3ConnectTeam

      Functions for connecting Metamask.

      Please implement the process of connecting to the wallet using Metamask.
      The three arguments "success", "failure", and "error" set
      in the function arguments are all callback functions.
      "success": If the set value is a function, it will be executed when the wallet connection succeeds.
      "failure": If the set value is a function, it will be executed when the wallet connection fails.
      "error": If the set value is a function, it will be executed by catch when exceptions is thrown.

      If it is possible to specify the network when connecting to the wallet,
      I would like the default to be connected to the Ethereum network(Network ID: 1).

      This function is used on the payment side and when logging in to the admin panel.
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
      @todo Web3ConnectTeam

      Functions for connecting WalletConnect

      Please implement the process of connecting to the wallet using WalletConnect.
      The three arguments "success", "failure", and "error" set
      in the function arguments are all callback functions.
      "success": If the set value is a function, it will be executed when the wallet connection succeeds.
      "failure": If the set value is a function, it will be executed when the wallet connection fails.
      "error": If the set value is a function, it will be executed by catch when exceptions is thrown.

      If it is possible to specify the network when connecting to the wallet,
      I would like the default to be connected to the Ethereum network(Network ID: 1).

      This function is used on the payment side and when logging in to the admin panel.
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
      @todo Web3ConnectTeam

      Function for get the ticker symbol balance of the selected network from the currently connected wallet.
      */

     // example
     return '0.04247';
    },
    switchNetwork() {
      /*
      @todo Web3ConnectTeam

      Function to provide the ability to switch the connected network.
      This feature is used in the network modal and the contract
      publishing screen of the administration panel.
      Switches the connection destination to the network selected in the network modal.
      */
    },
    getDefaultTokenListAndBalance() {
      /*
      @todo Web3ConnectTeam

      This function is used to retrieve the token list defined as default
      for the selected network and the associated balance from the connected wallet,
      and display the combination of token list and balance in the token selection screen.
      This process is related to "Lists" in the tabs.

        Ethereum network default token list
          1. USDT
          2. USDC
          3. DAI
          4. UNI
          5. SUSHI
          6. ETH
          7. WETH

        Binance smart chanin network default token list
          1. USDT
          2. BUSD
          3. USDC
          4. CAKE
          5. BNB
          6. WBNB
      */
    },
    searchToken() {
      /*
      @todo Web3ConnectTeam

      This function provides the ability to search for tokens on the network based on the input token contract address.
      This process is related to the tab "Tokens".

      If the token exists, the following items will be displayed in the token selection screen.
      1. Token name
      2. "Import" button
      3. Custom token quantity
      4. "Clear all" button

      If the token does not exist, the screen will display "Enter valid token address".

      Click the Import button to go to the Balance Confirmation screen.
      */
    },
    selectToken() {
      /*
      @todo Web3ConnectTeam

      This function provides a way to go to the balance confirmation screen
      when a token in the default token list is selected.
      The selected token information will be added to the URL as a parameter
      when the user moves to the balance confirmation page.
      */
    },
    importToken() {
      /*
      @todo Web3ConnectTeam

      This function provides a transition to the balance confirmation page
      when the Import button of the retrieved token is clicked.
      */
    },
    checkBalance() {
      /*
      @todo Web3ConnectTeam

      This function provides a check to see if the user has enough USDT settlement value
      for the payment token selected by the user.
      The exchange data between other tokens and USDT is obtained from Uniswap.
      Since the exchange rate is always fluctuating, the system will request the user
      to update the exchange rate data every few seconds.
      The "Go Exchange to Payment" button to go to the next page will be disabled until
      the user approves the request to update the exchange data.
      If the "Go Exchange to Payment" button is active and pressed, the user will be
      redirected to the payment details page.
      This process is related to the balance confirmation screen.
      */
    },
    showPaymentDetail() {
      /*
      @todo Web3ConnectTeam

      This function provides the process to get the detailed information
      when executing the payment and display it on the screen.
      The following are the items that need to be displayed on the screen.
      Please check the design in XD for details.

      1. Exchange Eate
      2. Route
      3. Minimum received
      4. Price Impact
      5. Liquidity Provider Fee
      6. xSUSHI Fee
      7. Slippage tolerance
      8. Platform Fee

      This process is related to the payment details screen and is supposed
      to be executed only at screen transition.
      */
    },
    confirmAndSendTransaction() {
      /*
      @todo Web3ConnectTeam

      This function provides transaction submission approval on Metamask,
      and transaction submission and result reception processing to the blockchain.
      In between each process, there is a communication process with
      the API created by the "Web App Team".

      Immediately after sending a transaction and immediately after receiving
      the result of sending a transaction, the process of communicating to
      the transaction update API is interrupted.
      When communicating to the transaction update API immediately after
      receiving the result of sending a transaction, the transaction address
      must be sent, so make sure that the value can be obtained.
      */
    },
    publishContract() {
      /*
      @todo Web3ConnectTeam

      This function provides the ability to issue a contract on the currently connected blockchain.

      The issued contract information will be saved in the DB via the API.
      Please make sure that the following information can be sent to the API.

      1. Contract address
      2. Arguments list

      This process is related to the contract issuance screen in the admin panel.
      */
    }
  }
}
</script>
