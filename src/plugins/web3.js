import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { METAMASK, WALLET_CONNECT, NETWORKS } from '@/constants'
import AvailableNetworks from '@/network'
import { EthereumTokens, BscTokens } from '@/contracts/tokens'

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$web3', {
      get() {
        return {
          name: 'Web3',
          connectByMetamask: connectByMetaMask,
          connectByWalletConnect: connectByWalletConnect,
          getAccountData: getAccountData,
          getDefaultTokens: getDefaultTokens
        }
      }
    })
  }
}

const connectByMetaMask = async function() {
  if (!window.ethereum) throw new MetamaskNotInstalledError()

  const provider = new Web3(Web3.givenProvider)

  await provider.eth.requestAccounts().catch((error) => {
    throw new Error(error.message)
  })

  const chainId = await provider.eth.net.getId()

  return {
    provider: METAMASK,
    instance: provider,
    chainId: chainId
  }
}

const connectByWalletConnect = async function() {
  let rpcList = { rpc: {} }
  Object.keys(AvailableNetworks).forEach((key) => {
    rpcList.rpc[AvailableNetworks[key].chainId] = AvailableNetworks[key].rpcUrl
  })
  const walletConnectProvider = new WalletConnectProvider(rpcList)

  await walletConnectProvider.enable().catch((error) => {
    throw new Error(error.message)
  })

  const provider = new Web3(walletConnectProvider);
  const chainId = await provider.eth.net.getId()

  return {
    provider: WALLET_CONNECT,
    instance: provider,
    chainId: chainId
  }
}

const getAccountData = async function(web3, chainId) {
  const addresses = await web3.eth.getAccounts()
  const balance = await web3.eth.getBalance(addresses[0])
  const balanceInEther = web3.utils.fromWei(balance, 'ether')
  return {
    address: addresses[0],
    symbol: NETWORKS[chainId].symbol,
    balance: balanceInEther
  }
}

const getDefaultTokens = async function(web3, chainId, walletAddress) {
  const defaultTokens = getTokenAbis(chainId)
  const userTokens = Promise.all(
    Object.values(defaultTokens).map(async (defaultToken) => {
      let balance = `${0}`

      if (defaultToken.address === null) {
        balance = await web3.eth.getBalance(walletAddress)
      } else {
        const tokenContract = new web3.eth.Contract(
          defaultToken.abi,
          defaultToken.address
        )
        balance = await tokenContract.methods
          .balanceOf(walletAddress)
          .call({ from: walletAddress })
      }

      const balanceInEther = web3.utils.fromWei(balance, 'ether')

      return {
        name: defaultToken.name,
        symbol: defaultToken.symbol,
        balance: balanceInEther,
        icon: defaultToken.icon
      }
    })
  )

  return userTokens
}

function getTokenAbis(chainId) {
  switch(chainId) {
    case NETWORKS[1].chainId:
    case NETWORKS[3].chainId:
      return EthereumTokens
    case NETWORKS[56].chainId:
    case NETWORKS[97].chainId:
      return BscTokens
  }
}

class MetamaskNotInstalledError extends Error {
  constructor() {
    super('MetaMask is not installed in the client environment')
    this.name = 'MetamaskNotInstalledError'
  }
}