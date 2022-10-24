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
    icon: require('@/assets/images/symbol/matic.svg'),
    iconPath: "crypto_currency/matic",
    iconType: "png"
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x3813e82e6f7098b9583FC0F33a962D02018B6803',
    abi: Usdt.abi,
    url: `${url}/0x3813e82e6f7098b9583FC0F33a962D02018B6803`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: "crypto_currency/usdt",
    iconType: "png"
  },
  WMATIC: {
    name: 'Wrapped MATIC',
    symbol: "WMATIC",
    address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    abi: Wmatix.abi,
    url: `${url}/0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889`,
    icon: require('@/assets/images/symbol/wmatic.svg'),
    iconPath: "crypto_currency/wmatic",
    iconType: "png"
  }
}