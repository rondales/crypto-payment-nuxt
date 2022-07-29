import { NETWORKS } from '@/constants'
import Wavax from '../../abis/avalanche/wavax'
import Usdt from '../../abis/avalanche/usdt'

const url = NETWORKS[43113].scanUrl + '/token'

export default {
  AVAX: {
    name: 'Avalanche',
    symbol: 'AVAX',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/avax.svg')
  },
  WAVAX: {
    name: 'Wrapped AVAX',
    symbol: "WAVAX",
    address: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
    abi: Wavax.abi,
    url: `${url}/0xd00ae08403B9bbb9124bB305C09058E32C39A48c`,
    icon: require('@/assets/images/symbol/wavax.svg')
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x02823f9B469960Bb3b1de0B3746D4b95B7E35543',
    abi: Usdt.abi,
    url: `${url}/0x02823f9B469960Bb3b1de0B3746D4b95B7E35543`,
    icon: require('@/assets/images/symbol/usdt.svg')
  }
}