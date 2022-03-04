import { NETWORKS } from '@/constants'
import Wavax from '../../abis/avalanche/wavax'

const url = NETWORKS[43113].scanUrl + '/address'

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
  }
}