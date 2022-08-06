import { NETWORKS } from '@/constants'
import Usdt from '../../abis/binance/usdt'

const url = NETWORKS[97].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
    abi: Usdt.abi,
    url: `${url}/0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  DAI: {
    name: 'Maker DAO',
    symbol: 'DAI',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/dai.svg')
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/jpyc.svg')
  },
  WETH: {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/eth.svg')
  },
}