import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Erc20Abi from 'erc-20-abi'
import {
  METAMASK,
  WALLET_CONNECT,
  NETWORKS,
  DEFAULT_SCAN_BLOCK_NUMBER_LIMIT,
  ETEHREUM_MAINNET_SCAN_BLOCK_NUMBER_LIMIT,
  ETEHREUM_GOERLI_SCAN_BLOCK_NUMBER_LIMIT,
  BSC_MAINNET_SCAN_BLOCK_NUMBER_LIMIT,
  BSC_TESTNET_SCAN_BLOCK_NUMBER_LIMIT,
  MATIC_MAINNET_SCAN_BLOCK_NUMBER_LIMIT,
  MATIC_TESTNET_SCAN_BLOCK_NUMBER_LIMIT,
  AVALANCHE_MAINNET_SCAN_BLOCK_NUMBER_LIMIT,
  AVALANCHE_TESTNET_SCAN_BLOCK_NUMBER_LIMIT
} from '@/constants'
import AvailableNetworks from '@/network'
import {
  EthereumTokens as EthereumDefaultTokens,
  BscTokens as BscDefaultTokens,
  MaticTokens as MaticDefaultTokens,
  AvalancheTokens as AvalancheDefaultTokens
} from '@/contracts/tokens'
import {
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalancheReceiveTokens
} from '@/contracts/receive_tokens'

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
          isBlacklistedFromPayToken: isBlacklistedFromPayToken,
          importToken: importToken,
          switchChain: switchChain,
          addChain: addChain,
          addToken: addToken,
          getTokenExchangeData: getTokenExchangeData,
          checkTokenApproved: checkTokenApproved,
          getTokenApprovedAmount: getTokenApprovedAmount,
          tokenApprove: tokenApprove,
          getTokenDecimalUnit: getTokenDecimalUnit,
          sendPaymentTransaction: sendPaymentTransaction,
          monitoringTransaction: monitoringTransaction,
          publishMerchantContract: publishMerchantContract,
          deleteMerchantContract: deleteMerchantContract,
          signWithPrivateKey: signWithPrivateKey,
          getNetworkGasPrice: getNetworkGasPrice,
          getTokenUnit: getTokenUnit,
          convertFromWei: convertFromWei,
          getScanBlockNumberMaxLimit: getScanBlockNumberMaxLimit,
          viewMerchantReceiveAddress: viewMerchantReceiveAddress,
          viewMerchantReceiveAddresses: viewMerchantReceiveAddresses,
          viewCashBackPercent: viewCashBackPercent,
          viewCashBacks: viewCashBacks,
          isContractAddress: isContractAddress,
          updateMerchantReceiveAddress: updateMerchantReceiveAddress,
          updateCashbackPercent: updateCashbackPercent
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
    symbol: NETWORKS[chainId] ? NETWORKS[chainId].symbol : null,
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
}

const isBlacklistedFromPayToken = async function(web3, contract, tokenContractAddress) {
    const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
    return await merchantContract.methods.isBlacklistedFromPayToken(tokenContractAddress).call()
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
  return await web3.currentProvider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: web3.utils.toHex(chainId) }]
  })
}

const addChain = function(web3, chainId) {
  const params = [
    {
      chainId: web3.utils.toHex(chainId),
      chainName: NETWORKS[chainId].name,
      nativeCurrency: {
        symbol: NETWORKS[chainId].symbol,
        decimals: 18
      },
      rpcUrls: [NETWORKS[chainId].rpcUrl],
      blockExplorerUrls: [NETWORKS[chainId].scanUrl]
    }
  ]
  return web3.currentProvider.request({
    method: 'wallet_addEthereumChain',
    params: params
  })
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
  const defaultTokens = getMerchantReceiveTokens(chainId)
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

  const path = token.address === null || token.address === wrappedToken.address
    ? [wrappedToken.address, requestToken.address]
    : [token.address, wrappedToken.address, requestToken.address]
  const payingTokenAddress = token.address === null
    ? nativeTokenAddress
    : token.address
  const feePath = [wrappedToken.address, requestToken.address]

  const userTokenToRequestToken = await merchantContract.methods.getAmountOut(
      payingTokenAddress,
      userTokenBalanceWei,  
      path,
      reservedParam
    ).call({ from: walletAddress })
  const requestTokenToUserToken = await merchantContract.methods.getAmountIn(
      payingTokenAddress,
      requestAmountWei,
      path,
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
      path,
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
    fee: web3.utils.fromWei(totalFeeWithSlippage, 'ether'),
    requestTokenDecimal: requestTokenDecimal
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

const getTokenApprovedAmount = async function(web3, chainId, walletAddress, contract, token) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let tokenAbi = null
  Object.values(defaultTokens).forEach((defaultToken) => {
    if (token.symbol === defaultToken.symbol) tokenAbi = defaultToken.abi
  })
  if (!tokenAbi) tokenAbi = Erc20Abi

  const tokenContract = new web3.eth.Contract(tokenAbi, token.address)
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  const slashCoreContractAddress = await merchantContract.methods.viewSlashCore().call()
  const tokenDecimalUnit = await tokenContract.methods.decimals().call()
  const tokenWeiUnit = getTokenUnit(tokenDecimalUnit)
  const allowanceAmountInWei = await tokenContract.methods.allowance(
    walletAddress,
    slashCoreContractAddress
  ).call({ from: walletAddress })
  const allowanceAmount = web3.utils.fromWei(allowanceAmountInWei, tokenWeiUnit)
  return allowanceAmount
}

const tokenApprove = async function(web3, chainId, walletAddress, contract, token) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let tokenAbi = null
  Object.values(defaultTokens).forEach((defaultToken) => {
    if (token.symbol === defaultToken.symbol) tokenAbi = defaultToken.abi
  })
  if (!tokenAbi) tokenAbi = Erc20Abi
  const BN = web3.utils.BN
  const uint256 = (new BN(2)).pow(new BN(256)).sub(new BN(1))
  const tokenContract = new web3.eth.Contract(tokenAbi, token.address)
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  const slashCoreContractAddress = await merchantContract.methods.viewSlashCore().call()
  return await tokenContract.methods
    .approve(slashCoreContractAddress, uint256)
    .send({ from: walletAddress })
}

const getTokenDecimalUnit = function(web3, chainId, token) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let tokenAbi = null
  Object.values(defaultTokens).forEach((defaultToken) => {
    if (token.symbol === defaultToken.symbol) tokenAbi = defaultToken.abi
  })
  if (!tokenAbi) tokenAbi = Erc20Abi

  const tokenContract = new web3.eth.Contract(tokenAbi, token.address)
  return tokenContract.methods.decimals().call()
}

const sendPaymentTransaction = async function(
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
  const paymentIdParam = ''
  const optionalParam = ''
  const reservedParam = '0x'
  const path = token.address === null || token.address === wrappedToken.address
    ? [wrappedToken.address, requestToken.address]
    : [token.address, wrappedToken.address, requestToken.address]
  const feePath = [wrappedToken.address, requestToken.address]
  const paymentTokenAddress = token.address === null
    ? nativeTokenAddress
    : token.address
  const msgValue = token.address === null
    ? (parseInt(userTokenAmountWei) + parseInt(platformFeeWei))
    : platformFeeWei

  const estimatedGas = await merchantContract.methods.submitTransaction(
    paymentTokenAddress,
    userTokenAmountWei,
    requestAmountWei,
    path,
    feePath,
    paymentIdParam,
    optionalParam,
    reservedParam
  ).estimateGas({
    from: walletAddress,
    to: contract.address,
    value: msgValue
  })
  const gasPrice = await getNetworkGasPrice(web3)
  return new Promise(function(resolve, reject) {
    merchantContract.methods.submitTransaction(
      paymentTokenAddress,
      userTokenAmountWei,
      requestAmountWei,
      path,
      feePath,
      paymentIdParam,
      optionalParam,
      reservedParam
    ).send({
      from: walletAddress,
      to: contract.address,
      value: msgValue,
      gas: estimatedGas,
      gasPrice: gasPrice
    },(error, txHash) => {
      if(error) {
        reject(error)
      } else {
        resolve(txHash)
      }
    })
  })
}

const monitoringTransaction = function(web3, transactionHash) {
  return web3.eth.getTransactionReceipt(transactionHash)
}

const publishMerchantContract = function(
  factoryContract,
  merchantWalletAddress,
  receiveTokenAddress,
  reservedParam,
  estimatedGas,
  gasPrice
) {
  return factoryContract.methods.deployMerchant(
      merchantWalletAddress,
      receiveTokenAddress,
      reservedParam
    ).send({ 
      from: merchantWalletAddress,
      gas: estimatedGas,
      gasPrice: gasPrice
    })
}

const viewMerchantReceiveAddress = async function(web3, contractAbi, contractAddress) {
  let receiveAddress = {}
  const merchantContract = new web3.eth.Contract(contractAbi, contractAddress)
  const result = await merchantContract.methods.viewReceiveAddress().call()
  receiveAddress.isContract = result.isContract
  if(result.isContract) {
    receiveAddress.address = result.contractAddress
  } else {
    receiveAddress.address = result.walletAddress
  }
  const lastModifiedTime = new Date(result.lastModified * 1000)
  receiveAddress.lastModified = lastModifiedTime.getDate() 
  + '/' + (lastModifiedTime.getMonth() + 1) 
  + '/' + lastModifiedTime.getFullYear()

  return receiveAddress
}

const viewMerchantReceiveAddresses = async function (web3, contractAbi, contracts) {
  let receiveAddresses = {}
  for (let [chainId, contract] of Object.entries(contracts)) {
    const contractAddress = contract.address;
    if (contractAddress) {
      const rpcUrl = NETWORKS[chainId].rpcUrl
      web3.setProvider(rpcUrl)
      let receiveAddress = {}
      const merchantContract = new web3.eth.Contract(contractAbi, contractAddress)
      const result = await merchantContract.methods.viewReceiveAddress().call()
      receiveAddress.isContract = result.isContract
      if (result.isContract) {
        receiveAddress.address = result.contractAddress
      } else {
        receiveAddress.address = result.walletAddress
      }
      const lastModifiedTime = new Date(result.lastModified * 1000)
      receiveAddress.lastModified = lastModifiedTime.getDate()
        + '/' + (lastModifiedTime.getMonth() + 1)
        + '/' + lastModifiedTime.getFullYear()

      receiveAddresses[chainId] = receiveAddress
    }
  }

  return receiveAddresses
}

const viewCashBackPercent = async function(web3, contractAbi, contractAddress) {
  let cashback = {}
  const merchantContract = new web3.eth.Contract(contractAbi, contractAddress)
  const result = await merchantContract.methods.viewCashBackPercentWithTime().call()
  
  cashback.rate = parseInt(result.cashBackPercent, 10) / 100
  if(result.lastModified == 0) {
    cashback.lastModified = 0
  } else {
    const lastModifiedTime = new Date(result.lastModified * 1000)
    cashback.lastModified = lastModifiedTime.getDate() 
      + '/' + (lastModifiedTime.getMonth() + 1) 
      + '/' + lastModifiedTime.getFullYear()
  }
  
  return cashback
}

const viewCashBacks = async function (web3, contractAbi, contracts) {
  let cashbacks = {}

  for (let [chainId, contract] of Object.entries(contracts)) {
    const contractAddress = contract.address;

    if (contractAddress) {
      const rpcUrl = NETWORKS[chainId].rpcUrl
      web3.setProvider(rpcUrl)

      let cashback = {}
      const merchantContract = new web3.eth.Contract(contractAbi, contractAddress)
      const result = await merchantContract.methods.viewCashBackPercentWithTime().call()

      cashback.rate = parseInt(result.cashBackPercent, 10) / 100
      if (result.lastModified == 0) {
        cashback.lastModified = 0
      } else {
        const lastModifiedTime = new Date(result.lastModified * 1000)
        cashback.lastModified = lastModifiedTime.getDate()
          + '/' + (lastModifiedTime.getMonth() + 1)
          + '/' + lastModifiedTime.getFullYear()
      }
      cashbacks[chainId] = cashback
    }
  }
  return cashbacks
}

const isContractAddress = async function(web3, address) {
  const code = await web3.eth.getCode(address)
  return code == '0x' ? false : true
}

const updateMerchantReceiveAddress = function(
  merchantContract,
  receiveAddress,
  isContractAddress,
  merchantWalletAddress,
  estimatedGas,
  gasPrice
) {
  return merchantContract.methods.updateReceiveAddress(receiveAddress,isContractAddress).send({
    from: merchantWalletAddress,
    gas: estimatedGas,
    gasPrice: gasPrice
  })
}

const updateCashbackPercent = function(
  merchantContract,
  cashbackPercent,
  merchantWalletAddress,
  estimatedGas,
  gasPrice
) {
  return merchantContract.methods.updateCashBackPercent(cashbackPercent).send({
    from: merchantWalletAddress,
    gas: estimatedGas,
    gasPrice: gasPrice
  })
}

const deleteMerchantContract = function() {
  // @todo Implement functions for deletion inside smart contracts as soon as they are known
  throw new Error('deleteMerchantContract function is not yet implemented')
}

const signWithPrivateKey = function(web3, address) {
  return web3.eth.personal.sign('Signature for login authentication', address)
}

// For later use
// const getEventLog = function(web3, eventName, eventParams, events) {
//   let result
//   const eventTopic = web3.utils.sha3(eventName)
//   for(let i = 0; i < events.length; i++) {
//     if(events[i].raw.topics[0] === eventTopic) {
//       result = Object.values(web3.eth.abi.decodeParameters(eventParams,events[i].raw.data))
//       break
//     }
//   }
//   return result
// }

const getNetworkGasPrice = function(web3) {
  return web3.eth.getGasPrice()
}

const getTokenUnit = function getTokenUnit(decimal) {
  const wei = (10 ** decimal).toString()
  const unitMap = Web3.utils.unitMap
  const units = Object.keys(unitMap).filter((key) => {
    return unitMap[key] === wei
  })
  return units.length > 0 ? units[0] : 'ether'
}

const convertFromWei = function convertFromWei(web3, wei, unit) {
  return web3.utils.fromWei(wei, unit)
}

function getNetworkDefaultTokens(chainId) {
  switch(chainId) {
    case NETWORKS[1].chainId:
    case NETWORKS[5].chainId:
      return EthereumDefaultTokens
    case NETWORKS[56].chainId:
    case NETWORKS[97].chainId:
      return BscDefaultTokens
    case NETWORKS[137].chainId:
    case NETWORKS[80001].chainId:
      return MaticDefaultTokens
    case NETWORKS[43113].chainId:
    case NETWORKS[43114].chainId:
      return AvalancheDefaultTokens
  }
}

function getMerchantReceiveTokens(chainId) {
  switch(chainId) {
    case NETWORKS[1].chainId:
    case NETWORKS[5].chainId:
      return EthereumReceiveTokens
    case NETWORKS[56].chainId:
    case NETWORKS[97].chainId:
      return BscReceiveTokens
    case NETWORKS[137].chainId:
    case NETWORKS[80001].chainId:
      return MaticReceiveTokens
    case NETWORKS[43113].chainId:
    case NETWORKS[43114].chainId:
      return AvalancheReceiveTokens
  }
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

const getScanBlockNumberMaxLimit = function getScanBlockNumberMaxLimit(chainId) {
  switch(parseInt(chainId, 10)) {
    case NETWORKS[1].chainId:
      return ETEHREUM_MAINNET_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[5].chainId:
      return ETEHREUM_GOERLI_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[56].chainId:
      return BSC_MAINNET_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[97].chainId:
      return BSC_TESTNET_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[137].chainId:
      return MATIC_MAINNET_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[80001].chainId:
      return MATIC_TESTNET_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[43114].chainId:
      return AVALANCHE_MAINNET_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[43113].chainId:
      return AVALANCHE_TESTNET_SCAN_BLOCK_NUMBER_LIMIT
    default:
      return DEFAULT_SCAN_BLOCK_NUMBER_LIMIT
  }
}

class MetamaskNotInstalledError extends Error {
  constructor() {
    super('MetaMask is not installed in the client environment')
    this.name = 'MetamaskNotInstalledError'
  }
}