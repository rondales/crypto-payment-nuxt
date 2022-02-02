import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Erc20Abi from 'erc-20-abi'
import { METAMASK, WALLET_CONNECT, NETWORKS } from '@/constants'
import AvailableNetworks from '@/network'
import MerchantContract from '@/contracts/merchant'
import MerchantFactoryContract from '@/contracts/merchant_factory'
import { EthereumTokens, BscTokens } from '@/contracts/tokens'

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$web3', {
      get() {
        return {
          name: 'Web3',
          connectByMetamask: connectByMetaMask,
          connectByWalletConnect: connectByWalletConnect,
          getWeb3Instance: getWeb3Instance,
          isConnectedByWalletConnect: isConnectedByWalletConnect,
          getAccounts: getAccounts,
          getAccountData: getAccountData,
          getDefaultTokens: getDefaultTokens,
          getBalance: getBalance,
          searchToken: searchToken,
          importToken: importToken,
          switchChain: switchChain,
          checkTokenBalance: checkTokenBalance,
          publishMerchantContract: publishMerchantContract,
          deleteMerchantContract: deleteMerchantContract
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

const isConnectedByWalletConnect = function() {
  let rpcList = { rpc: {} }
  Object.keys(AvailableNetworks).forEach((key) => {
    rpcList.rpc[AvailableNetworks[key].chainId] = AvailableNetworks[key].rpcUrl
  })
  const provider = new WalletConnectProvider(rpcList)
  return provider.wc.session.connected
}

const getWeb3Instance = function() {
  return new Web3(Web3.givenProvider)
}

const getAccounts = async function(web3) {
  return await web3.currentProvider.request({
    method: 'eth_accounts'
  })
}

const getAccountData = async function(web3, chainId) {
  const addresses = await web3.eth.getAccounts()
  const balance = await getBalance(web3, addresses[0])
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
      const decimal = tokenContract === null
        ? 18
        : parseInt(await tokenContract.methods.decimals().call(), 10)
      const balance = await getBalance(
        web3,
        walletAddress,
        tokenContract
      )

      return {
        name: defaultToken.name,
        symbol: defaultToken.symbol,
        decimal: decimal,
        address: defaultToken.address,
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
    const decimal = parseInt(await tokenContract.methods.decimals().call(), 10)
    const balance = await getBalance(web3, walletAddress, tokenContract)
    return {
      name: name,
      symbol: symbol,
      decimal: decimal,
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
  const balance = await getBalance(web3, walletAddress, tokenContract)
  return {
    name: name,
    symbol: symbol,
    balance: balance,
    icon: require('@/assets/images/symbol/unknown.svg')
  }
}

const getBalance = async function(web3, walletAddress, tokenContract = null) {
  let unit
  let balance = `${0}`

  if (tokenContract === null) {
    unit = 'ether'
    balance = await web3.eth.getBalance(walletAddress)
  } else {
    const decimal = await tokenContract.methods.decimals().call()
    const weiValue = (10 ** decimal).toString()
    const unitMap = web3.utils.unitMap
    const units = Object.keys(unitMap).filter((key) => {
      return unitMap[key] === weiValue
    })
    unit = units.length > 0 ? units[0] : 'ether'
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

const checkTokenBalance = function() {
  //
}

const publishMerchantContract = async function(
  web3,
  chainId,
  adminWalletAddress,
  merchantWalletAddress,
  marketingWalletAddress,
  donationWalletAddress
) {
  if (!MerchantFactoryContract.addresses[chainId]) {
    throw new Error('Currently, this network has stopped issuing contracts.')
  }

  const factoryContract = new web3.eth.Contract(
    MerchantFactoryContract.abi,
    MerchantFactoryContract.addresses[chainId]
  )

  try {
    let contractAddress = null
    factoryContract.once('NewMerchant', {}, function(error, event) {
      if (event) {
        contractAddress = event.returnValues.merchant
      } else {
        throw new Error(error)
      }
    })

    await factoryContract.methods.deployMerchant(
      marketingWalletAddress,
      merchantWalletAddress,
      donationWalletAddress,
      adminWalletAddress
    ).send({ from: merchantWalletAddress })

    return {
      abi: MerchantContract.abi,
      address: contractAddress
    }
  } catch(error) {
    throw new Error(error)
  }
}

const deleteMerchantContract = function() {
  // @todo Implement functions for deletion inside smart contracts as soon as they are known
  throw new Error('deleteMerchantContract function is not yet implemented')
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