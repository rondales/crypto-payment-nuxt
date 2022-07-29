import { NETWORKS } from '@/constants'
import Usdt from '../../abis/avalanche/usdt'

const url = NETWORKS[43113].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x02823f9B469960Bb3b1de0B3746D4b95B7E35543',
    abi: Usdt.abi,
    url: `${url}/0x02823f9B469960Bb3b1de0B3746D4b95B7E35543`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/avax.svg')
  },
  DAI: {
    name: 'Maker DAO',
    symbol: 'DAI',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/avax.svg')
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/avax.svg')
  }
}