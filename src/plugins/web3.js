import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Erc20Abi from 'erc-20-abi'
import { Decimal as BigJs } from 'decimal.js'
import { METAMASK, WALLET_CONNECT, NETWORKS } from '@/constants'
import AvailableNetworks from '@/network'
import MerchantContract from '@/contracts/merchant'
import MerchantFactoryContract from '@/contracts/merchant_factory'
import {
  EthereumTokens,
  BscTokens,
  MaticTokens,
  AvalancheTokens
} from '@/contracts/tokens'

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$web3', {
      get() {
        return {
          name: 'Web3',
          connectByMetamask: connectByMetaMask,
          connectByWalletConnect: connectByWalletConnect,
          disconnectByWalletConnect: disconnectByWalletConnect,
          getWeb3Instance: getWeb3Instance,
          isConnectedByWalletConnect: isConnectedByWalletConnect,
          getCurrentChainId: getCurrentChainId,
          getAccounts: getAccounts,
          getAccountData: getAccountData,
          getDefaultTokens: getDefaultTokens,
          getTokenContract: getTokenContract,
          getBalance: getBalance,
          searchToken: searchToken,
          importToken: importToken,
          switchChain: switchChain,
          addToken: addToken,
          getTokenExchangeData: getTokenExchangeData,
          checkTokenApproved: checkTokenApproved,
          tokenApprove: tokenApprove,
          sendPaymentTransaction: sendPaymentTransaction,
          monitoringPaymentTransaction: monitoringPaymentTransaction,
          publishMerchantContract: publishMerchantContract,
          deleteMerchantContract: deleteMerchantContract,
          signWithPrivateKey: signWithPrivateKey
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

const disconnectByWalletConnect = async function(web3) {
  await web3.currentProvider.disconnect()
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

const getCurrentChainId = async function(web3) {
  return await web3.eth.net.getId()
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
  const defaultTokens = getNetworkDefaultTokens(chainId)
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

const getTokenContract = function(web3, chainId, tokenAddress) {
  if (tokenAddress) {
    const defaultTokens = getNetworkDefaultTokens(chainId)
    let abi = null
    Object.values(defaultTokens).forEach((token) => {
      if (tokenAddress === token.address) {
        abi = token.abi
      }
    })
    if (!abi) abi = Erc20Abi
    return new web3.eth.Contract(abi, tokenAddress)
  } else {
    return null
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
    unit = getTokenUnit(decimal)
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

const addToken = async function(web3, tokenAddress, tokenAbi) {
  try {
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)
    const symbol = await tokenContract.methods.symbol().call()
    const decimals = await tokenContract.methods.decimals().call()
    await web3.currentProvider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: symbol,
          decimals: decimals
        }
      }
    })
  } catch(e) {
    console.log(e)
    throw new Error(e.message)
  }
}

const getTokenExchangeData = async function(
  web3,
  chainId,
  walletAddress,
  contract,
  token,
  paymentRequestSymbol,
  paymentRequestAmount,
  slippageTolerance
) {
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  const defaultTokens = getNetworkDefaultTokens(chainId)
  const requestToken = defaultTokens[paymentRequestSymbol]
  const requestTokenContract = new web3.eth.Contract(requestToken.abi, requestToken.address)
  const requestTokenDecimal = await requestTokenContract.methods.decimals().call()
  const requestTokenWeiUnit = getTokenUnit(requestTokenDecimal)
  const userTokenWeiUnit = getTokenUnit(token.decimal)
  const userTokenBalanceWei = web3.utils.toWei(token.balance, userTokenWeiUnit)
  const perRequestTokenWei = web3.utils.toWei(`${1}`, requestTokenWeiUnit)
  const requestAmountWei = web3.utils.toWei(`${paymentRequestAmount}`, requestTokenWeiUnit)
  const wrappedToken = getWrappedToken(chainId)
  const nativeTokenAddress = '0x0000000000000000000000000000000000000000'
  const reservedParam = '0x'

  const feePath = token.address === null
    ? [wrappedToken.address, requestToken.address]
    : [token.address, wrappedToken.address, requestToken.address]
  const payingTokenAddress = token.address === null
    ? nativeTokenAddress
    : token.address
  const userTokenToRequestToken = await merchantContract.methods.getAmountOut(
      payingTokenAddress,
      userTokenBalanceWei,  
      feePath,
      reservedParam
    ).call({ from: walletAddress })
  const requestTokenToUserToken = await merchantContract.methods.getAmountIn(
      payingTokenAddress,
      requestAmountWei,
      feePath,
      reservedParam
    ).call({ from: walletAddress })
  const requireAmountWithSlippage = token.address == requestToken.address 
    ? requestTokenToUserToken
    : String(
        Math.round(
          parseInt(requestTokenToUserToken, 10) * (1 + (slippageTolerance / 100))
        )
      )
  const perRequestTokenToUserTokenRate = await merchantContract.methods.getAmountIn(
      payingTokenAddress,
      perRequestTokenWei,
      feePath,
      reservedParam
    ).call({ from: walletAddress })
  const feeArray = await merchantContract.methods.getFeeAmount(
      requestAmountWei,
      feePath,
      reservedParam
    ).call({ from: walletAddress })
  const totalFee = Object.values(feeArray).reduce((a, b) => parseInt(a) + parseInt(b), 0)
  const totalFeeWithSlippage = String(Math.round(totalFee * (1 + (slippageTolerance / 100))))
  return {
    requireAmount: web3.utils.fromWei(requireAmountWithSlippage, userTokenWeiUnit),
    requestAmountWei: requestAmountWei,
    equivalentAmount: web3.utils.fromWei(userTokenToRequestToken, requestTokenWeiUnit),
    rate: web3.utils.fromWei(perRequestTokenToUserTokenRate, userTokenWeiUnit),
    fee: web3.utils.fromWei(totalFeeWithSlippage, 'ether')
  }
}

const checkTokenApproved = async function(web3, chainId, walletAddress, contract, token) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let tokenAbi = null
  Object.values(defaultTokens).forEach((defaultToken) => {
    if (token.symbol === defaultToken.symbol) tokenAbi = defaultToken.abi
  })
  if (!tokenAbi) tokenAbi = Erc20Abi

  try {
    const tokenContract = new web3.eth.Contract(tokenAbi, token.address)
    const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
    const slashCoreContractAddress = await merchantContract.methods.viewSlashCore().call()
    const allowance = await tokenContract.methods.allowance(
      walletAddress,
      slashCoreContractAddress
    ).call({ from: walletAddress })
    return Number(allowance) !== 0
  } catch (error) {
    console.error(error)
    return false
  }
}

const tokenApprove = async function(web3, chainId, walletAddress, contract, token) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let tokenAbi = null
  Object.values(defaultTokens).forEach((defaultToken) => {
    if (token.symbol === defaultToken.symbol) tokenAbi = defaultToken.abi
  })
  if (!tokenAbi) tokenAbi = Erc20Abi
  const uint256 = new BigJs(2).pow(256).minus(1).toFixed(0)
  const tokenContract = new web3.eth.Contract(tokenAbi, token.address)
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  const slashCoreContractAddress = await merchantContract.methods.viewSlashCore().call()
  return await tokenContract.methods
    .approve(slashCoreContractAddress, uint256)
    .send({ from: walletAddress })
}

const sendPaymentTransaction = function(
  web3,
  chainId,
  walletAddress,
  contract,
  token,
  paymentAmount,
  platformFee,
  requestAmountWei
) {
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  const defaultTokens = getNetworkDefaultTokens(chainId)
  const requestToken = defaultTokens.USDT
  const userTokenWeiUnit = getTokenUnit(token.decimal)
  const userTokenAmountWei = web3.utils.toWei(paymentAmount, userTokenWeiUnit)
  const wrappedToken = getWrappedToken(chainId)
  const platformFeeWei = web3.utils.toWei(platformFee, 'ether')
  const nativeTokenAddress = '0x0000000000000000000000000000000000000000'
  const reservedParam = '0x'

  const path = token.address === null
    ? [wrappedToken.address, requestToken.address]
    : [token.address, wrappedToken.address, requestToken.address]
  const feePath = token.address === null
    ? [wrappedToken.address, requestToken.address]
    : [token.address, wrappedToken.address, requestToken.address]
  const paymentTokenAddress = token.address === null
    ? nativeTokenAddress
    : token.address
  const msgValue = token.address === null
    ? (parseInt(userTokenAmountWei) + parseInt(platformFeeWei))
    : platformFeeWei
  return merchantContract.methods.submitTransaction(
    paymentTokenAddress,
    userTokenAmountWei,
    requestAmountWei,
    path,
    feePath,
    reservedParam
  ).send({
    from: walletAddress,
    to: contract.address,
    value: msgValue
  })
}

const monitoringPaymentTransaction = function(web3, transactionHash) {
  return web3.eth.getTransactionReceipt(transactionHash)
}

const publishMerchantContract = async function(
  web3,
  chainId,
  merchantWalletAddress,
  receiveTokenAddress
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

     const transaction = await factoryContract.methods.deployMerchant(
      merchantWalletAddress,
      receiveTokenAddress
    ).send({ from: merchantWalletAddress })

    contractAddress = transaction.events['NewMerchantDeployed'].returnValues.merchantAddress_
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

const signWithPrivateKey = function(web3, address) {
  return web3.eth.personal.sign('Signature for login authentication', address)
}

function getNetworkDefaultTokens(chainId) {
  switch(chainId) {
    case NETWORKS[1].chainId:
    case NETWORKS[3].chainId:
      return EthereumTokens
    case NETWORKS[56].chainId:
    case NETWORKS[97].chainId:
      return BscTokens
    case NETWORKS[137].chainId:
    case NETWORKS[80001].chainId:
      return MaticTokens
    case NETWORKS[43113].chainId:
    case NETWORKS[43114].chainId:
      return AvalancheTokens
  }
}

function getTokenUnit(decimal) {
  const wei = (10 ** decimal).toString()
  const unitMap = Web3.utils.unitMap
  const units = Object.keys(unitMap).filter((key) => {
    return unitMap[key] === wei
  })
  return units.length > 0 ? units[0] : 'ether'
}

function getWrappedToken(chainId) {
  const wrappedTokenSymbols = ['WETH', 'WBNB', 'WMATIC', 'WAVAX']
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let wrappedToken = null
  wrappedTokenSymbols.forEach((symbol) => {
    if (symbol in defaultTokens) wrappedToken = defaultTokens[symbol]
  })
  return wrappedToken
}

class MetamaskNotInstalledError extends Error {
  constructor() {
    super('MetaMask is not installed in the client environment')
    this.name = 'MetamaskNotInstalledError'
  }
}