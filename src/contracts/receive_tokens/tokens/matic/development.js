import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'

const url = NETWORKS[80001].scanUrl + '/address'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x98F7aDb95Ad50E6f53282C9d7178d96b86DC3658',
    abi: Usdt.abi,
    url: `${url}/0x98F7aDb95Ad50E6f53282C9d7178d96b86DC3658`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/usdc.svg')
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
  }
}