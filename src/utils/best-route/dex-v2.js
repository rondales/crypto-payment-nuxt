import {
  TradeDirection,
  UniswapPair,
  UniswapPairSettings,
  UniswapVersion
} from 'simple-uniswap-sdk'
import {
  EXCHANGE_ROUTERS,
  SIMPLE_UNISWAP_SDK_CUSTOM_NETWORKS
} from '@/constants'

export default {
  getBestRoute: async (
    dexName,
    chainId,
    rpcUrl,
    walletAddress,
    path,
    paymentAmount
  ) => {
    const bestExchange = {
      name: '',
      exchange: '',
      flag: '',
      price: 0,
      pathParam: ''
    }
    const exchanges = EXCHANGE_ROUTERS[chainId]
    const customNetworkConfig = SIMPLE_UNISWAP_SDK_CUSTOM_NETWORKS[chainId]

    try {
      const cloneUniswapContractDetails = exchanges[dexName]
        ? exchanges[dexName].cloneUniswapContractDetails
        : undefined
      const customNetwork = customNetworkConfig
        ? customNetworkConfig.customNetwork
        : undefined

      const uniswapPair = new UniswapPair({
        fromTokenContractAddress: path[0],
        toTokenContractAddress: path[path.length - 1],
        ethereumAddress: walletAddress,
        chainId,
        providerUrl: rpcUrl,
        settings: new UniswapPairSettings({
          cloneUniswapContractDetails,
          customNetwork,
          uniswapVersions: [UniswapVersion.v2]
        })
      })

      const uniswapPairFactory = await uniswapPair.createFactory()
      const uniswapTrade = await uniswapPairFactory.trade(
        paymentAmount,
        TradeDirection.output
      )

      if (uniswapTrade.allTriedRoutesQuotes.length > 0) {
        const bestRoute = uniswapTrade.allTriedRoutesQuotes[0]

        bestExchange.name = dexName
        bestExchange.exchange = exchanges[dexName].address
        bestExchange.flag = exchanges[dexName].flag
        bestExchange.pathParam = bestRoute.routePathArray
        bestExchange.price = bestRoute.expectedConvertQuote
      }
    } catch (error) {
      console.error(error)
    }

    return bestExchange
  }
}
