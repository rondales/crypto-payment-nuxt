import {
  CurrencyAmount,
  JSBI,
  Pair,
  Route,
  Token,
  Trade,
  TradeType
} from '@sushiswap/core-sdk'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import {
  EXCHANGE_ROUTERS,
  TOKEN_RECEIVE_FLOATING_POINT_EXPONENT
} from '@/constants'

export default {
  getBestRoute: async (web3, chainId, path, decimals, paymentAmount) => {
    const tokenInAddr = path[0],
      tokenOutAddr = path[path.length - 1]
    const tokenInDecimal = decimals[0],
      tokenOutDecimal = decimals[decimals.length - 1]
    const exchanges = EXCHANGE_ROUTERS[chainId]
    console.log(exchanges)
    const bestExchange = {
      name: 'sushiswap',
      exchange: exchanges.sushiswap ? exchanges.sushiswap.address : '',
      flag: exchanges.sushiswap ? exchanges.sushiswap.flag : '',
      price: 0
    }
    try {
      const tokenA = new Token(chainId, tokenInAddr, parseInt(tokenInDecimal))
      const tokenB = new Token(chainId, tokenOutAddr, parseInt(tokenOutDecimal))
      console.log(tokenA, tokenB)
      const pairAddress = Pair.getAddress(tokenA, tokenB)
      console.log(pairAddress)
      const pairContract = new web3.eth.Contract(
        IUniswapV2Pair.abi,
        pairAddress
      )
      const { reserve0, reserve1 } = await pairContract.methods
        .getReserves()
        .call()
      console.log(reserve0, reserve1)
      const balances = tokenA.sortsBefore(tokenB)
        ? [reserve0, reserve1]
        : [reserve1, reserve0]
      console.log(balances)
      const pairAB = new Pair(
        CurrencyAmount.fromRawAmount(tokenA, balances[0]),
        CurrencyAmount.fromRawAmount(tokenB, balances[1])
      )
      console.log(pairAB)
      const route = new Route([pairAB], tokenA, tokenB)
      console.log(route)
      console.log(route.midPrice.toSignificant(6))
      console.log(route.midPrice.invert().toSignificant(6))

      // Fix float amount (support 6 point)
      const paymentAmountOut = JSBI.divide(
        JSBI.multiply(
          JSBI.BigInt(
            parseFloat(paymentAmount) *
              10 ** TOKEN_RECEIVE_FLOATING_POINT_EXPONENT
          ),
          JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(tokenOutDecimal))
        ),
        JSBI.BigInt(10 ** TOKEN_RECEIVE_FLOATING_POINT_EXPONENT)
      )
      console.log(paymentAmountOut)
      const trade = new Trade(
        route,
        CurrencyAmount.fromRawAmount(tokenB, paymentAmountOut),
        TradeType.EXACT_OUTPUT
      )
      console.log(trade)
      console.log(paymentAmount / trade.executionPrice.toSignificant(6))
      bestExchange.price = paymentAmount / trade.executionPrice.toSignificant(6)
    } catch (error) {
      console.error(error)
    }

    return bestExchange
  }
}
