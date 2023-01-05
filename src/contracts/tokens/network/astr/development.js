import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'
import Wastr from '../../abis/matic/wastr'

const url = NETWORKS[81].scanUrl + '/token'

export default {
  ASTR: {
    name: 'Astar',
    symbol: 'ASTR',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/astr.svg'),
    iconPath: 'crypto_currency/astr',
    iconType: 'png'
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x94373a4919B3240D86eA41593D5eBa789FEF3848',
    abi: Usdt.abi,
    url: `${url}/0x94373a4919B3240D86eA41593D5eBa789FEF3848`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: 'crypto_currency/usdt',
    iconType: 'png'
  },
  WASTR: {
    name: 'Wrapped ASTAR',
    symbol: 'WASTR',
    address: '0x9Af480478974a2fda7d5aE667541639164D2858B',
    abi: Wastr.abi,
    url: `${url}/0x9Af480478974a2fda7d5aE667541639164D2858B`,
    icon: require('@/assets/images/symbol/wastr.svg'),
    iconPath: 'crypto_currency/wastr',
    iconType: 'png'
  }
}
