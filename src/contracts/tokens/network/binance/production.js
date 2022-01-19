import { NETWORKS } from '@/constants'
import Usdt from '../../abis/binance/usdt'
import Busd from '../../abis/binance/busd'
import Usdc from '../../abis/binance/usdc'
import Cake from '../../abis/binance/cake'
import Wbnb from '../../abis/binance/wbnb'

const url = NETWORKS[56].scanUrl + '/address'

export default {
  BNB: {
    name: 'Binance',
    symbol: 'BNB',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/bnb.svg')
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x55d398326f99059ff775485246999027b3197955',
    abi: Usdt.abi,
    url: `${url}/0x55d398326f99059ff775485246999027b3197955`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  BUSD: {
    name: 'Binance USD',
    symbol: 'BUSD',
    address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    abi: Busd.abi,
    url: `${url}/0xe9e7cea3dedca5984780bafc599bd69add087d56`,
    icon: require('@/assets/images/symbol/busd.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    abi: Usdc.abi,
    url: `${url}/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d`,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  CAKE: {
    name: 'PancakeSwap',
    symbol: 'CAKE',
    address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    abi: Cake.abi,
    url: `${url}/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82`,
    icon: require('@/assets/images/symbol/cake.svg')
  },
  WBNB: {
    name: 'Wrapped BNB',
    symbol: "WBNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    abi: Wbnb.abi,
    url: `${url}/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`,
    icon: require('@/assets/images/symbol/wbnb.svg')
  }
}