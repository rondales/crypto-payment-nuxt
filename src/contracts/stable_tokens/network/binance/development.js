// import { NETWORKS } from '@/constants'
import Erc20Abi from 'erc-20-abi'

// const url = NETWORKS[97].scanUrl + '/token'

export default {
  USDT: {
    name: 'Teher USD',
    symbol: 'USDT',
    address: null,
    abi: Erc20Abi,
    url: null,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: null,
    abi: Erc20Abi,
    url: null,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  BUSD: {
    name: 'Binance USD',
    symbol: 'BUSD',
    address: null,
    abi: Erc20Abi,
    url: null,
    icon: require('@/assets/images/symbol/busd.svg')
  },
  DAI: {
    name: 'MakerDAO',
    symbol: 'DAI',
    address: null,
    abi: Erc20Abi,
    url: null,
    icon: require('@/assets/images/symbol/dai.svg')
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: null,
    abi: Erc20Abi,
    url: null,
    icon: require('@/assets/images/symbol/jpyc.svg')
  }
}