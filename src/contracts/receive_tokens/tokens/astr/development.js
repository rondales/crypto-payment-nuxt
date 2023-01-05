import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'
import Weth from '../../abis/matic/weth'

const url = NETWORKS[81].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x94373a4919B3240D86eA41593D5eBa789FEF3848',
    abi: Usdt.abi,
    decimals: 6,
    url: `${url}/0x94373a4919B3240D86eA41593D5eBa789FEF3848`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: 'crypto_currency/received_token/usdt'
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xebca682b6C15d539284432eDc5b960771F0009e8',
    abi: null,
    decimals: null,
    url: `${url}/0xebca682b6C15d539284432eDc5b960771F0009e8`,
    icon: require('@/assets/images/symbol/usdc.svg'),
    iconPath: 'crypto_currency/received_token/usdc'
  },
  DAI: {
    name: 'Maker DAO',
    symbol: 'DAI',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/dai.svg'),
    iconPath: 'crypto_currency/received_token/dai'
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/jpyc.svg'),
    iconPath: 'crypto_currency/received_token/jpyc'
  },
  WETH: {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    address: '0x9Af480478974a2fda7d5aE667541639164D2858B',
    abi: Weth.abi,
    decimals: 18,
    url: `${url}/0x9Af480478974a2fda7d5aE667541639164D2858B`,
    icon: require('@/assets/images/symbol/eth.svg'),
    iconPath: 'crypto_currency/received_token/weth'
  },
  ETH: {
    name: 'ETH native token',
    symbol: 'ETH',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/eth.svg'),
    iconPath: 'crypto_currency/received_token/eth'
  },
  BNB: {
    name: 'BNB native token',
    symbol: 'BNB',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/bnb.svg'),
    iconPath: 'crypto_currency/received_token/bnb'
  },
  MATIC: {
    name: 'MATIC native token',
    symbol: 'MAIC',
    address: null,
    abi: null,
    decimals: 18,
    url: null,
    icon: require('@/assets/images/symbol/matic.svg'),
    iconPath: 'crypto_currency/received_token/matic'
  },
  AVAX: {
    name: 'AVAX native token',
    symbol: 'AVAX',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/avax.svg'),
    iconPath: 'crypto_currency/received_token/avax'
  },
  DOGE: {
    name: 'wrapped DOGE token',
    symbol: 'DOGE',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/doge.svg'),
    iconPath: 'crypto_currency/received_token/doge'
  },
  ASTR: {
    name: 'ASTAR native token',
    symbol: 'ASTR',
    address: '0x0000000000000000000000000000000000000000',
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/astr.svg'),
    iconPath: 'crypto_currency/received_token/astr'
  }
}
