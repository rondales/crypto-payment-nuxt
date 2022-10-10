import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'
import Wmatix from '../../abis/matic/wmatic'

const url = NETWORKS[80001].scanUrl + '/token'

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
    address: '0x3813e82e6f7098b9583FC0F33a962D02018B6803',
    abi: Usdt.abi,
    url: `${url}/0x3813e82e6f7098b9583FC0F33a962D02018B6803`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  WMATIC: {
    name: 'Wrapped MATIC',
    symbol: "WMATIC",
    address: "0x5B67676a984807a212b1c59eBFc9B3568a474F0a",
    abi: Wmatix.abi,
    url: `${url}/0x5B67676a984807a212b1c59eBFc9B3568a474F0a`,
    icon: require('@/assets/images/symbol/wmatic.svg')
  }
}