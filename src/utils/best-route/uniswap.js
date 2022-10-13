import {
  TradeDirection,
  UniswapPair,
  UniswapPairSettings
} from 'simple-uniswap-sdk'
import { EXCHANGE_ROUTERS } from '@/constants'

// Ref: https://github.com/Uniswap/v3-periphery/blob/9ca9575d09b0b8d985cc4d9a0f689f7a4470ecb7/test/shared/path.ts
const encodePath = (path, fees) => {
  if (path.length != fees.length + 1) {
    throw new Error('path/fee lengths do not match')
  }

  let encoded = '0x'
  for (let i = 0; i < fees.length; i++) {
    // 20 byte encoding of the address
    encoded += path[i].slice(2)
    // 3 byte encoding of the fee
    encoded += fees[i].toString(16).padStart(6, '0')
  }
  // encode the final token
  encoded += path[path.length - 1].slice(2)

  return encoded.toLowerCase()
}

export default {
  getBestRoute: async (
    chainId,
    rpcUrl,
    walletAddress,
    tokenInAddr,
    tokenOutAddr,
    paymentAmount,
    uniswapVersions
  ) => {
    const bestExchange = {
      name: '',
      exchange: '',
      flag: '',
      price: 0,
      pathParam: ''
    }
    const exchanges = EXCHANGE_ROUTERS[chainId]

    try {
      const cloneUniswapContractDetails = exchanges.uniswapV3 ? exchanges.uniswapV3.cloneUniswapContractDetails : undefined
      const customNetwork = exchanges.uniswapV3 ? exchanges.uniswapV3.customNetwork : undefined
      console.log(cloneUniswapContractDetails)
      console.log(customNetwork)
      const uniswapPair = new UniswapPair({
        fromTokenContractAddress: tokenInAddr,
        toTokenContractAddress: tokenOutAddr,
        ethereumAddress: walletAddress,
        chainId,
        providerUrl: rpcUrl,
        settings: new UniswapPairSettings({
          cloneUniswapContractDetails,
          customNetwork,
          uniswapVersions
        })
      })

      const uniswapPairFactory = await uniswapPair.createFactory()
      const uniswapTrade = await uniswapPairFactory.trade(
        paymentAmount,
        TradeDirection.output
      )
      console.log(uniswapTrade)

      if (uniswapTrade.allTriedRoutesQuotes.length > 0) {
        const bestRoute = uniswapTrade.allTriedRoutesQuotes[0]
        console.log(bestRoute)
        if (bestRoute.uniswapVersion == 'v3') {
          bestExchange.name = 'uniswapV3'
          bestExchange.exchange = exchanges.uniswapV3.address
          bestExchange.flag = exchanges.uniswapV3.flag
          bestExchange.pathParam = encodePath(
            bestRoute.routePathArray,
            // Ref: https://github.com/Uniswap/v3-periphery/blob/9ca9575d09b0b8d985cc4d9a0f689f7a4470ecb7/test/shared/constants.ts#L5
            bestRoute.liquidityProviderFeesV3.map((item) => item * 1000000)
          )
        } else {
          bestExchange.name = 'uniswapV2'
          bestExchange.exchange = exchanges.uniswapV2.address
          bestExchange.flag = exchanges.uniswapV2.flag
        }
        bestExchange.price = bestRoute.expectedConvertQuote
      }
    } catch (error) {
      console.error(error)
    }

    return bestExchange
  }
}
