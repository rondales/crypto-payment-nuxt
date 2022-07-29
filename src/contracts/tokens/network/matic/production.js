import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'
import Usdc from '../../abis/matic/usdc'
import Wmatic from '../../abis/matic/wmatic'

const url = NETWORKS[137].scanUrl + '/token'

export default {
  MATIC: {
    name: 'Polygon',
    symbol: 'MATIC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/matic.svg')
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    abi: Usdt.abi,
    url: `${url}/0xc2132D05D31c914a87C6611C10748AEb04B58e8F`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    abi: Usdc.abi,
    url: `${url}/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  WMATIC: {
    name: 'Wrapped MATIC',
    symbol: "WMATIC",
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    abi: Wmatic.abi,
    url: `${url}/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270`,
    icon: require('@/assets/images/symbol/wmatic.svg')
  }
}