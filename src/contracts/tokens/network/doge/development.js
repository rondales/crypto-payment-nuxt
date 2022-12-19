import { NETWORKS } from '@/constants'
import Wwdoge from '../../abis/doge/wwdoge'
import Usdt from '../../abis/doge/usdt'

const url = NETWORKS[568].scanUrl + '/token'

export default {
  DOGE: {
    name: 'wrapped Doge',
    symbol: 'DOGE',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/wdoge.svg'),
    iconPath: 'crypto_currency/wdoge',
    iconType: 'png'
  },
  WWDOGE: {
    name: 'Wrapped WDOGE',
    symbol: 'WWDOGE',
    address: '0x2465086e721f68761e3275a54802c985ffd0d727',
    abi: Wwdoge.abi,
    url: `${url}/0x2465086e721f68761e3275a54802c985ffd0d727`,
    icon: require('@/assets/images/symbol/wwdoge.svg'),
    iconPath: 'crypto_currency/wwdoge',
    iconType: 'png'
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xebca682b6C15d539284432eDc5b960771F0009e8',
    abi: Usdt.abi,
    url: `${url}/0xebca682b6C15d539284432eDc5b960771F0009e8`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: 'crypto_currency/usdt',
    iconType: 'png'
  }
}
