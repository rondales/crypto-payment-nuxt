import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Erc20Abi from 'erc-20-abi'
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
          getDefaultTokens: getDefaultTokens,
          getBalance: getBalance,
          searchToken: searchToken,
          importToken: importToken,
          switchChain: switchChain
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
  const balance = await getBalance(web3, addresses[0], 'ether')
  return {
    address: addresses[0],
    symbol: NETWORKS[chainId].symbol,
    balance: balance
  }
}

const getDefaultTokens = async function(web3, chainId, walletAddress) {
  const defaultTokens = getTokenAbis(chainId)
  const userTokens = Promise.all(
    Object.values(defaultTokens).map(async (defaultToken) => {
      const tokenContract = defaultToken.address === null
        ? null
        : new web3.eth.Contract(defaultToken.abi, defaultToken.address)
      const balance = await getBalance(
        web3,
        walletAddress,
        defaultToken.symbol === 'USDC' ? 'mwei' : 'ether',
        tokenContract
      )

      return {
        name: defaultToken.name,
        symbol: defaultToken.symbol,
        balance: balance,
        icon: defaultToken.icon
      }
    })
  )

  return userTokens
}

const searchToken = async function(web3, contractAddress, walletAddress) {
  const tokenContract = new web3.eth.Contract(Erc20Abi, contractAddress)

  try {
    const name = await tokenContract.methods.name().call()
    const symbol = await tokenContract.methods.symbol().call()
    const decimals = await tokenContract.methods.decimals().call()
    const balance = await getBalance(web3, walletAddress, 'ether', tokenContract)
    return {
      name: name,
      symbol: symbol,
      decimals: decimals,
      balance: balance,
      address: contractAddress,
      icon: require('@/assets/images/symbol/unknown.svg')
    }
  } catch(e) {
    console.log(e)
    throw new Error('Invalid token address')
  }
}

const importToken = async function(web3, contractAddress, walletAddress) {
  const tokenContract = new web3.eth.Contract(Erc20Abi, contractAddress)
  const name = await tokenContract.name
  const symbol = await tokenContract.symbol
  const balance = await getBalance(web3, walletAddress, 'ether', tokenContract)
  return {
    name: name,
    symbol: symbol,
    balance: balance,
    icon: require('@/assets/images/symbol/unknown.svg')
  }
}

const getBalance = async function(web3, walletAddress, unit, tokenContract = null) {
  let balance = `${0}`

  if (tokenContract === null) {
    balance = await web3.eth.getBalance(walletAddress)
  } else {
    balance = await tokenContract.methods
      .balanceOf(walletAddress)
      .call({ from: walletAddress })
  }

  return web3.utils.fromWei(balance, unit)
}

const switchChain = async function(web3, chainId) {
  try {
    await web3.currentProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(chainId) }]
    })
  } catch(e) {
    console.log(e)
    throw new Error(e.message)
  }
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