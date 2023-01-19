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
  AVALANCHE_TESTNET_SCAN_BLOCK_NUMBER_LIMIT,
  DOGE_MAINNET_SCAN_BLOCK_NUMBER_LIMIT,
  DOGE_TESTNET_SCAN_BLOCK_NUMBER_LIMIT,
  ASTR_MAINNET_SCAN_BLOCK_NUMBER_LIMIT,
  ASTR_TESTNET_SCAN_BLOCK_NUMBER_LIMIT
} from '@/constants'
import AvailableNetworks from '@/network'
import {
  EthereumTokens as EthereumDefaultTokens,
  BscTokens as BscDefaultTokens,
  MaticTokens as MaticDefaultTokens,
  AvalancheTokens as AvalancheDefaultTokens,
  DogeTokens as DogeDefaultTokens,
  AstrTokens as AstrDefaultTokens
} from '@/contracts/tokens'
import {
  EthereumTokens as EthereumReceiveTokens,
  BscTokens as BscReceiveTokens,
  MaticTokens as MaticReceiveTokens,
  AvalancheTokens as AvalancheReceiveTokens,
  DogeTokens as DogeReceiveTokens,
  AstrTokens as AstrReceiveTokens
} from '@/contracts/receive_tokens'
import MerchantFactoryContract from '@/contracts/merchant_factory'
import { UniswapVersion } from 'simple-uniswap-sdk'
import { EXCHANGE_ROUTERS } from '@/constants'
import bestRoute from '@/utils/best-route'
import axios from 'axios'

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
          convertFromWei: convertFromWei,
          getScanBlockNumberMaxLimit: getScanBlockNumberMaxLimit,
          viewMerchantReceiveAddress: viewMerchantReceiveAddress,
          viewMerchantReceiveAddresses: viewMerchantReceiveAddresses,
          viewCashBackPercent: viewCashBackPercent,
          viewCashBacks: viewCashBacks,
          isSlashCustomPlugin: isSlashCustomPlugin,
          updateMerchantReceiveAddress: updateMerchantReceiveAddress,
          updateCashbackPercent: updateCashbackPercent,
          checkMerchantContractPaused: checkMerchantContractPaused
        }
      }
    })
  }
}

const connectByMetaMask = async function () {
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

const connectByWalletConnect = async function () {
  let rpcList = { rpc: {} }
  Object.keys(AvailableNetworks).forEach((key) => {
    rpcList.rpc[AvailableNetworks[key].chainId] = AvailableNetworks[key].rpcUrl
  })
  const walletConnectProvider = new WalletConnectProvider(rpcList)

  await walletConnectProvider.enable().catch((error) => {
    throw new Error(error.message)
  })

  const provider = new Web3(walletConnectProvider)
  const chainId = await provider.eth.net.getId()

  return {
    provider: WALLET_CONNECT,
    instance: provider,
    chainId: chainId
  }
}

const disconnectByWalletConnect = async function (web3) {
  await web3.currentProvider.disconnect()
}

const isConnectedByWalletConnect = function () {
  let rpcList = { rpc: {} }
  Object.keys(AvailableNetworks).forEach((key) => {
    rpcList.rpc[AvailableNetworks[key].chainId] = AvailableNetworks[key].rpcUrl
  })
  const provider = new WalletConnectProvider(rpcList)
  return provider.wc.session.connected
}

const getWeb3Instance = function () {
  return new Web3(Web3.givenProvider)
}

const getAccounts = async function (web3) {
  return await web3.currentProvider.request({
    method: 'eth_accounts'
  })
}

const getCurrentChainId = async function (web3) {
  return await web3.eth.net.getId()
}

const getAccountData = async function (web3, chainId) {
  const addresses = await web3.eth.getAccounts()
  const balance = await getBalance(web3, addresses[0])
  return {
    address: addresses[0],
    symbol: NETWORKS[chainId] ? NETWORKS[chainId].symbol : null,
    balance: balance
  }
}

const getDefaultTokens = async function (
  web3,
  chainId,
  walletAddress,
  merchantNetworks = null
) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  const supportedNetworkMainnet = {
    1: 'ethereum',
    56: 'bsc',
    137: 'matic',
    43114: 'avalanche'
  }
  const supportedNetworkTestnet = {
    5: 'goerli',
    97: 'bsc_testnet'
  }

  const isSupportedNetworkMainnet = Object.keys(
    supportedNetworkMainnet
  ).includes(chainId.toString())
  const isSupportedNetworkTestnet = Object.keys(
    supportedNetworkTestnet
  ).includes(chainId.toString())

  if (isSupportedNetworkMainnet || isSupportedNetworkTestnet) {
    try {
      let isSupportNetWork = isSupportedNetworkMainnet
        ? supportedNetworkMainnet
        : supportedNetworkTestnet
      let tokens = []
      for (const supportedChainId in isSupportNetWork) {
        if (
          merchantNetworks &&
          merchantNetworks.find(
            (merchantChainId) => merchantChainId == supportedChainId
          ) == undefined
        )
          continue

        let response = null
        try {
          response = await axios.get(
            `${process.env.VUE_APP_API_BASE_URL}/api/v1/payment/tokens-held?network=${isSupportNetWork[supportedChainId]}&address=${walletAddress}`
          )
        } catch (error) {
          console.log(error)
          continue
        }

        if (response == null) continue

        const { data } = response
        const tokensFromServer = Object.values(data)
        const balanceTokens = {}

        if (tokensFromServer.length == 0) continue

        for (let i = 0; i < tokensFromServer.length; i++) {
          const balance = tokensFromServer[i]
          balanceTokens[balance.address.toLowerCase()] = balance
          balanceTokens[balance.address.toLowerCase()].isSupported = false
        }

        const supportedChainDefaultTokens = getNetworkDefaultTokens(
          parseInt(supportedChainId)
        )

        const web3Instance = new Web3()
        const rpcUrl = NETWORKS[supportedChainId].rpcUrl
        web3Instance.setProvider(rpcUrl)

        tokens = tokens.concat(
          (
            await Promise.all(
              Object.values(supportedChainDefaultTokens).map(
                async (defaultToken) => {
                  const addressDefaultToken =
                    defaultToken.address === null ? '-' : defaultToken.address
                  const token = balanceTokens[addressDefaultToken.toLowerCase()]
                  if (!token) return null
                  balanceTokens[
                    addressDefaultToken.toLowerCase()
                  ].isSupported = true

                  const tokenContract =
                    defaultToken.address === null
                      ? null
                      : new web3Instance.eth.Contract(
                          defaultToken.abi,
                          defaultToken.address
                        )
                  const balance = await getBalance(
                    web3Instance,
                    walletAddress,
                    tokenContract
                  )

                  return {
                    chain: NETWORKS[supportedChainId].name,
                    chainId: supportedChainId,
                    networkIcon: NETWORKS[supportedChainId].iconPath,
                    name: defaultToken.name,
                    symbol: defaultToken.symbol,
                    decimal: token.decimals.toString(),
                    address: defaultToken.address,
                    balance,
                    icon: defaultToken.icon,
                    path: defaultToken.iconPath,
                    type: defaultToken.iconType,
                    isShitCoin: token.isShitCoin,
                    logo: token.logo
                  }
                }
              )
            )
          ).filter((item) => item !== null)
        )

        const unsupportedTokens = Object.values(balanceTokens).filter(
          (token) => !token.isSupported && !token.isShitCoin
        )
        tokens = tokens.concat(
          (
            await Promise.all(
              unsupportedTokens.map(async (token) => {
                try {
                  const tokenContract =
                    token.address === '-'
                      ? null
                      : new web3Instance.eth.Contract(Erc20Abi, token.address)
                  const balance = await getBalance(
                    web3Instance,
                    walletAddress,
                    tokenContract
                  )

                  return {
                    chain: NETWORKS[supportedChainId].name,
                    chainId: supportedChainId,
                    networkIcon: NETWORKS[supportedChainId].iconPath,
                    name: token.name,
                    symbol: token.symbol,
                    decimal: token.decimals.toString(),
                    address: token.address,
                    balance,
                    icon: require('@/assets/images/symbol/unknown.svg'),
                    path: 'crypto_currency/unknown',
                    type: 'png',
                    isShitCoin: token.isShitCoin,
                    logo: token.logo
                  }
                } catch (error) {
                  console.log(error)
                  return null
                }
              })
            )
          ).filter((item) => item != null)
        )
      }

      return tokens
    } catch (error) {
      console.error(error)
    }
  }

  const userTokens = Promise.all(
    Object.values(defaultTokens).map(async (defaultToken) => {
      const tokenContract =
        defaultToken.address === null
          ? null
          : new web3.eth.Contract(defaultToken.abi, defaultToken.address)
      try {
        const decimal =
          tokenContract === null
            ? 18
            : parseInt(await tokenContract.methods.decimals().call(), 10)
        const balance = await getBalance(web3, walletAddress, tokenContract)
        return {
          chain: NETWORKS[chainId].name,
          chainId,
          networkIcon: NETWORKS[chainId].iconPath,
          name: defaultToken.name,
          symbol: defaultToken.symbol,
          decimal: decimal,
          address: defaultToken.address,
          balance: balance,
          icon: defaultToken.icon,
          path: defaultToken.iconPath,
          type: defaultToken.iconType
        }
      } catch (err) {
        console.log(err)
        return null
      }
    })
  )

  return userTokens
}

const searchToken = async function (web3, contractAddress, walletAddress) {
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
    icon: require('@/assets/images/symbol/unknown.svg'),
    path: 'crypto_currency/unknown',
    type: 'png'
  }
}

const isBlacklistedFromPayToken = async function (
  web3,
  contract,
  tokenContractAddress
) {
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  return await merchantContract.methods
    .isBlacklistedFromPayToken(tokenContractAddress)
    .call()
}

const importToken = async function (web3, contractAddress, walletAddress) {
  const tokenContract = new web3.eth.Contract(Erc20Abi, contractAddress)
  const name = await tokenContract.name
  const symbol = await tokenContract.symbol
  const balance = await getBalance(web3, walletAddress, tokenContract)
  return {
    name: name,
    symbol: symbol,
    balance: balance,
    icon: require('@/assets/images/symbol/unknown.svg'),
    path: 'crypto_currency/unknown',
    type: 'png'
  }
}

const getTokenContract = function (web3, chainId, tokenAddress) {
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

const getBalance = async function (web3, walletAddress, tokenContract = null) {
  let decimal = 18
  let balance = `${0}`

  if (tokenContract === null) {
    balance = await web3.eth.getBalance(walletAddress)
  } else {
    decimal = await tokenContract.methods.decimals().call()
    balance = await tokenContract.methods
      .balanceOf(walletAddress)
      .call({ from: walletAddress })
  }

  return convertFromWei(web3, balance, decimal)
}

const switchChain = async function (web3, chainId) {
  return await web3.currentProvider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: web3.utils.toHex(chainId) }]
  })
}

const addChain = function (web3, chainId) {
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

const addToken = async function (web3, tokenAddress, tokenAbi) {
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
  } catch (e) {
    console.log(e)
    throw new Error(e.message)
  }
}

const getTokenExchangeData = async function (
  web3,
  chainId,
  walletAddress,
  contract,
  token,
  paymentRequestSymbol,
  paymentRequestAmount,
  gasFeeRate,
  paymentFeeRate
) {
  const reservedParam = '0x'
  const nativeTokenAddress = '0x0000000000000000000000000000000000000000'
  const wrappedToken = getWrappedToken(chainId)
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  const defaultTokens = getMerchantReceiveTokens(chainId)
  const inputTokenAddress =
    token.address == null ? wrappedToken.address : token.address
  const outputToken = defaultTokens[paymentRequestSymbol]
  const outputTokenAddress =
    outputToken.address == nativeTokenAddress
      ? wrappedToken.address
      : outputToken.address
  const userTokenBalanceWei = convertToWei(web3, token.balance, token.decimal)
  const requestAmountWei = convertToWei(
    web3,
    paymentRequestAmount,
    outputToken.decimals
  )
  const path = [inputTokenAddress, outputTokenAddress]

  const bestExchange = await getBestRate(
    chainId,
    walletAddress,
    path,
    paymentRequestAmount
  )

  const requestTokenToUserToken =
    bestExchange.price == 0
      ? requestAmountWei
      : convertToWei(web3, bestExchange.price.toString(), token.decimal)

  const userTokenToRequestToken =
    inputTokenAddress == outputTokenAddress
      ? userTokenBalanceWei
      : convertToWei(
          web3,
          (parseFloat(token.balance) /
            (parseFloat(bestExchange.price) / parseFloat(paymentRequestAmount))).toString(),
          outputToken.decimals
        )

  const requireAmountWithSlippage =
    inputTokenAddress == outputTokenAddress
      ? requestAmountWei
      : String(
          Math.round(
            parseInt(requestTokenToUserToken, 10) * (1 + paymentFeeRate / 100)
          )
        )
  const feeArray = await merchantContract.methods
    .getFeeAmount(
      requestAmountWei,
      [], // feePath
      reservedParam
    )
    .call({ from: walletAddress })
  const totalFee = Object.values(feeArray).reduce(
    (a, b) => parseInt(a) + parseInt(b),
    0
  )
  const totalFeeWithSlippage = String(
    Math.round(totalFee * (1 + gasFeeRate / 100))
  )
  return {
    requireAmount: convertFromWei(
      web3,
      requireAmountWithSlippage,
      token.decimal
    ),
    requestAmountWei: requestAmountWei,
    equivalentAmount: convertFromWei(
      web3,
      userTokenToRequestToken,
      outputToken.decimals
    ),
    fee: web3.utils.fromWei(totalFeeWithSlippage, 'ether'),
    requestTokenDecimal: outputToken.decimals,
    bestExchange
  }
}

const checkTokenApproved = async function (
  web3,
  chainId,
  walletAddress,
  contract,
  token
) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let tokenAbi = null
  Object.values(defaultTokens).forEach((defaultToken) => {
    if (token.symbol === defaultToken.symbol) tokenAbi = defaultToken.abi
  })
  if (!tokenAbi) tokenAbi = Erc20Abi

  try {
    const tokenContract = new web3.eth.Contract(tokenAbi, token.address)
    const merchantContract = new web3.eth.Contract(
      contract.abi,
      contract.address
    )
    const slashCoreContractAddress = await merchantContract.methods
      .viewSlashCore()
      .call()
    const allowance = await tokenContract.methods
      .allowance(walletAddress, slashCoreContractAddress)
      .call({ from: walletAddress })
    return Number(allowance) !== 0
  } catch (error) {
    console.error(error)
    return false
  }
}

const getTokenApprovedAmount = async function (
  web3,
  chainId,
  walletAddress,
  contract,
  token
) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let tokenAbi = null
  Object.values(defaultTokens).forEach((defaultToken) => {
    if (token.symbol === defaultToken.symbol) tokenAbi = defaultToken.abi
  })
  if (!tokenAbi) tokenAbi = Erc20Abi

  const tokenContract = new web3.eth.Contract(tokenAbi, token.address)
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  const slashCoreContractAddress = await merchantContract.methods
    .viewSlashCore()
    .call()
  const tokenDecimalUnit = await tokenContract.methods.decimals().call()
  const allowanceAmountInWei = await tokenContract.methods
    .allowance(walletAddress, slashCoreContractAddress)
    .call({ from: walletAddress })
  const allowanceAmount = convertFromWei(
    web3,
    allowanceAmountInWei,
    tokenDecimalUnit
  )
  return allowanceAmount
}

const tokenApprove = async function (
  web3,
  chainId,
  walletAddress,
  contract,
  token
) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let tokenAbi = null
  Object.values(defaultTokens).forEach((defaultToken) => {
    if (token.symbol === defaultToken.symbol) tokenAbi = defaultToken.abi
  })
  if (!tokenAbi) tokenAbi = Erc20Abi
  const BN = web3.utils.BN
  const uint256 = new BN(2).pow(new BN(256)).sub(new BN(1))
  const tokenContract = new web3.eth.Contract(tokenAbi, token.address)
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  const slashCoreContractAddress = await merchantContract.methods
    .viewSlashCore()
    .call()
  return await tokenContract.methods
    .approve(slashCoreContractAddress, uint256)
    .send({
      from: walletAddress,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null
    })
}

const getTokenDecimalUnit = function (web3, chainId, token) {
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let tokenAbi = null
  Object.values(defaultTokens).forEach((defaultToken) => {
    if (token.symbol === defaultToken.symbol) tokenAbi = defaultToken.abi
  })
  if (!tokenAbi) tokenAbi = Erc20Abi

  const tokenContract = new web3.eth.Contract(tokenAbi, token.address)
  return tokenContract.methods.decimals().call()
}

const sendPaymentTransaction = async function (
  web3,
  walletAddress,
  contract,
  token,
  paymentAmount,
  platformFee,
  requestAmountWei,
  bestExchange,
  nftVaultPaymentId = null
) {
  const merchantContract = new web3.eth.Contract(contract.abi, contract.address)
  const userTokenAmountWei = convertToWei(web3, paymentAmount, token.decimal)
  const platformFeeWei = web3.utils.toWei(platformFee, 'ether')
  const nativeTokenAddress = '0x0000000000000000000000000000000000000000'
  const paymentIdParam = nftVaultPaymentId ? nftVaultPaymentId : ''
  const optionalParam = ''
  let reservedParam = '0x'
  let path = []
  const feePath = []
  const paymentTokenAddress =
    token.address === null ? nativeTokenAddress : token.address
  const msgValue =
    token.address === null
      ? '0x' + (parseInt(userTokenAmountWei) + parseInt(platformFeeWei)).toString(16)
      : platformFeeWei

  if (bestExchange.name == 'uniswapV3') {
    reservedParam = web3.eth.abi.encodeParameters(
      ['address', 'uint256', 'bytes'],
      [bestExchange.exchange, bestExchange.flag, bestExchange.pathParam]
    )
  } else if (bestExchange.name == '') {
    path = bestExchange.pathParam
  } else {
    reservedParam = web3.eth.abi.encodeParameters(
      ['address', 'uint256', 'bytes'],
      [bestExchange.exchange, bestExchange.flag, reservedParam]
    )
    path = bestExchange.pathParam
  }
  return new Promise(function (resolve, reject) {
    merchantContract.methods
      .submitTransaction(
        paymentTokenAddress,
        userTokenAmountWei,
        requestAmountWei,
        path,
        feePath,
        paymentIdParam,
        optionalParam,
        reservedParam
      )
      .send(
        {
          from: walletAddress,
          to: contract.address,
          value: msgValue,
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
        },
        (error, txHash) => {
          if (error) {
            reject(error)
          } else {
            resolve(txHash)
          }
        }
      )
  })
}

const monitoringTransaction = function (web3, transactionHash) {
  return web3.eth.getTransactionReceipt(transactionHash)
}

const publishMerchantContract = function (
  web3,
  chainId,
  merchantWalletAddress,
  receiveTokenAddress
) {
  if (!MerchantFactoryContract.addresses[chainId]) {
    throw new Error('Currently, this network has stopped issuing contracts.')
  }
  const reservedParam = '0x'
  const scanBlockNumberMaxLimit = getScanBlockNumberMaxLimit(chainId)
  const factoryContract = new web3.eth.Contract(
    MerchantFactoryContract.abi,
    MerchantFactoryContract.addresses[chainId],
    { transactionBlockTimeout: scanBlockNumberMaxLimit }
  )
  return factoryContract.methods
    .deployMerchant(merchantWalletAddress, receiveTokenAddress, reservedParam)
    .send({
      from: merchantWalletAddress,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null
    })
}

const viewMerchantReceiveAddress = async function (
  web3,
  contractAbi,
  contractAddress
) {
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
  receiveAddress.lastModified =
    lastModifiedTime.getDate() +
    '/' +
    (lastModifiedTime.getMonth() + 1) +
    '/' +
    lastModifiedTime.getFullYear()

  return receiveAddress
}

const viewMerchantReceiveAddresses = async function (
  web3,
  contractAbi,
  contracts
) {
  let receiveAddresses = {}
  for (let [chainId, contract] of Object.entries(contracts)) {
    const contractAddress = contract.address
    if (contractAddress) {
      const rpcUrl = NETWORKS[chainId].rpcUrl
      web3.setProvider(rpcUrl)
      let receiveAddress = {}
      const merchantContract = new web3.eth.Contract(
        contractAbi,
        contractAddress
      )
      const result = await merchantContract.methods.viewReceiveAddress().call()
      receiveAddress.isContract = result.isContract
      if (result.isContract) {
        receiveAddress.address = result.contractAddress
      } else {
        receiveAddress.address = result.walletAddress
      }
      const lastModifiedTime = new Date(result.lastModified * 1000)
      receiveAddress.lastModified =
        lastModifiedTime.getDate() +
        '/' +
        (lastModifiedTime.getMonth() + 1) +
        '/' +
        lastModifiedTime.getFullYear()

      receiveAddresses[chainId] = receiveAddress
    }
  }

  return receiveAddresses
}

const viewCashBackPercent = async function (
  web3,
  contractAbi,
  contractAddress
) {
  let cashback = {}
  const merchantContract = new web3.eth.Contract(contractAbi, contractAddress)
  const result = await merchantContract.methods
    .viewCashBackPercentWithTime()
    .call()

  cashback.rate = parseInt(result.cashBackPercent, 10) / 100
  if (result.lastModified == 0) {
    cashback.lastModified = 0
  } else {
    const lastModifiedTime = new Date(result.lastModified * 1000)
    cashback.lastModified =
      lastModifiedTime.getDate() +
      '/' +
      (lastModifiedTime.getMonth() + 1) +
      '/' +
      lastModifiedTime.getFullYear()
  }

  return cashback
}

const viewCashBacks = async function (web3, contractAbi, contracts) {
  let cashbacks = {}

  for (let [chainId, contract] of Object.entries(contracts)) {
    const contractAddress = contract.address

    if (contractAddress) {
      const rpcUrl = NETWORKS[chainId].rpcUrl
      web3.setProvider(rpcUrl)

      let cashback = {}
      const merchantContract = new web3.eth.Contract(
        contractAbi,
        contractAddress
      )
      const result = await merchantContract.methods
        .viewCashBackPercentWithTime()
        .call()

      cashback.rate = parseInt(result.cashBackPercent, 10) / 100
      if (result.lastModified == 0) {
        cashback.lastModified = 0
      } else {
        const lastModifiedTime = new Date(result.lastModified * 1000)
        cashback.lastModified =
          lastModifiedTime.getDate() +
          '/' +
          (lastModifiedTime.getMonth() + 1) +
          '/' +
          lastModifiedTime.getFullYear()
      }
      cashbacks[chainId] = cashback
    }
  }
  return cashbacks
}

// Check if given address is SlashCustomPlugin compatible
const isSlashCustomPlugin = async function (
  web3,
  slashCustomPluginAbi,
  address
) {
  let isSlashCustomPlugin
  const slashCustomPlugin = new web3.eth.Contract(slashCustomPluginAbi, address)
  try {
    isSlashCustomPlugin = await slashCustomPlugin.methods
      .supportSlashExtensionInterface()
      .call()
  } catch (e) {
    isSlashCustomPlugin = false
  }
  return isSlashCustomPlugin
}

const updateMerchantReceiveAddress = function (
  web3,
  contractAbi,
  contractAddress,
  receiveAddress,
  isSlashCustomPlugin,
  merchantWalletAddress
) {
  const merchantContract = new web3.eth.Contract(contractAbi, contractAddress)
  return merchantContract.methods
    .updateReceiveAddress(receiveAddress, isSlashCustomPlugin)
    .send({
      from: merchantWalletAddress,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null
    })
}

const updateCashbackPercent = function (
  web3,
  contractAbi,
  contractAddress,
  cashbackValue,
  merchantWalletAddress
) {
  const merchantContract = new web3.eth.Contract(contractAbi, contractAddress)
  const cashbackPercent = parseInt(
    (parseFloat(cashbackValue) * 100).toFixed(2),
    10
  )
  return merchantContract.methods.updateCashBackPercent(cashbackPercent).send({
    from: merchantWalletAddress,
    maxPriorityFeePerGas: null,
    maxFeePerGas: null
  })
}

const checkMerchantContractPaused = async function (
  web3,
  contractAbi,
  contract
) {
  const { chainId, address: contractAddress } = contract

  if (contractAddress) {
    const rpcUrl = NETWORKS[chainId].rpcUrl
    web3.setProvider(rpcUrl)

    const merchantContract = new web3.eth.Contract(contractAbi, contractAddress)
    return { chainId, paused: await merchantContract.methods.paused().call() }
  }

  return { chainId, paused: true }
}

const deleteMerchantContract = function () {
  // @todo Implement functions for deletion inside smart contracts as soon as they are known
  throw new Error('deleteMerchantContract function is not yet implemented')
}

const signWithPrivateKey = function (web3, address) {
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

const getNetworkGasPrice = function (web3) {
  return web3.eth.getGasPrice()
}

// Ref: https://github.com/ethjs/ethjs-unit/blob/master/src/index.js
const convertToWei = function convertToWei(web3, amount, decimal) {
  const comps = amount.split('.')
  let whole = comps[0],
    fraction = comps[1]
  if (!whole) {
    whole = '0'
  }
  if (!fraction) {
    fraction = '0'
  }

  if (fraction.length > decimal)
    fraction = fraction.slice(0, decimal)

  while (fraction.length < decimal) {
    fraction += '0'
  }

  return web3.utils
    .toBN(whole)
    .mul(web3.utils.toBN(`1${'0'.repeat(decimal)}`))
    .add(web3.utils.toBN(fraction))
    .toString(10)
}

const convertFromWei = function convertFromWei(web3, wei, decimal) {
  wei = Number(wei)
  let fraction = web3.utils
    .toBN('0x' + wei.toString(16))
    .mod(web3.utils.toBN(`1${'0'.repeat(decimal)}`))
    .toString(10)
  while (fraction.length < decimal) {
    fraction = `0${fraction}`
  }
  const whole = web3.utils
    .toBN('0x' + wei.toString(16))
    .div(web3.utils.toBN(`1${'0'.repeat(decimal)}`))
    .toString(10)

  return `${whole}${fraction == '0' ? '' : `.${fraction}`}`
}

const getBestRate = async function (
  chainId,
  walletAddress,
  path,
  paymentAmount
) {
  try {
    const rpcUrl = NETWORKS[chainId].rpcUrl
    const exchanges = EXCHANGE_ROUTERS[chainId]
    let bestExchange = { name: '', exchange: '', flag: '', price: 0 }

    if (path[0] == path[path.length - 1]) {
      bestExchange.pathParam = [path[0], path[path.length - 1]]
      return bestExchange
    }

    const uniswapVersions = []
    for (const exchangeName in exchanges) {
      if (Object.hasOwnProperty.call(exchanges, exchangeName)) {
        if (exchangeName === 'uniswapV2')
          uniswapVersions.push(UniswapVersion.v2)
        else if (exchangeName === 'uniswapV3')
          uniswapVersions.push(UniswapVersion.v3)
        else {
          const nextBestExchange = await bestRoute.dexV2.getBestRoute(
            exchangeName,
            chainId,
            rpcUrl,
            walletAddress,
            path,
            paymentAmount
          )

          if (
            bestExchange.price == 0 ||
            (nextBestExchange.price > 0 &&
              nextBestExchange.price < bestExchange.price)
          ) {
            bestExchange = nextBestExchange
          }
        }
      }
    }

    if (uniswapVersions.length > 0) {
      const nextBestExchange = await bestRoute.uniswap.getBestRoute(
        chainId,
        rpcUrl,
        walletAddress,
        path,
        paymentAmount,
        uniswapVersions
      )

      if (
        bestExchange.price == 0 ||
        (nextBestExchange.price > 0 &&
          nextBestExchange.price < bestExchange.price)
      ) {
        bestExchange = nextBestExchange
      }
    }

    if (bestExchange.price == 0)
      throw new Error('execution reverted: No valid exchange')

    return bestExchange
  } catch (error) {
    console.error(error)
    throw error
  }
}

function getNetworkDefaultTokens(chainId) {
  switch (chainId) {
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
    case NETWORKS[2000].chainId:
    case NETWORKS[568].chainId:
      return DogeDefaultTokens
    case NETWORKS[592].chainId:
    case NETWORKS[81].chainId:
      return AstrDefaultTokens
  }
}

function getMerchantReceiveTokens(chainId) {
  switch (chainId) {
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
    case NETWORKS[2000].chainId:
    case NETWORKS[568].chainId:
      return DogeReceiveTokens
    case NETWORKS[592].chainId:
    case NETWORKS[81].chainId:
      return AstrReceiveTokens
  }
}

function getWrappedToken(chainId) {
  const wrappedTokenSymbols = [
    'WETH',
    'WBNB',
    'WMATIC',
    'WAVAX',
    'WWDOGE',
    'WASTR'
  ]
  const defaultTokens = getNetworkDefaultTokens(chainId)
  let wrappedToken = null
  wrappedTokenSymbols.forEach((symbol) => {
    if (symbol in defaultTokens) wrappedToken = defaultTokens[symbol]
  })
  return wrappedToken
}

const getScanBlockNumberMaxLimit = function getScanBlockNumberMaxLimit(
  chainId
) {
  switch (parseInt(chainId, 10)) {
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
    case NETWORKS[2000].chainId:
      return DOGE_MAINNET_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[568].chainId:
      return DOGE_TESTNET_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[592].chainId:
      return ASTR_MAINNET_SCAN_BLOCK_NUMBER_LIMIT
    case NETWORKS[81].chainId:
      return ASTR_TESTNET_SCAN_BLOCK_NUMBER_LIMIT
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
