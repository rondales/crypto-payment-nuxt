import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'
import Weth from '../../abis/matic/weth'

const url = NETWORKS[80001].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x3813e82e6f7098b9583FC0F33a962D02018B6803',
    abi: Usdt.abi,
    url: `${url}/0x3813e82e6f7098b9583FC0F33a962D02018B6803`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: "crypto_currency/received_token/usdt"
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/usdc.svg'),
    iconPath: "crypto_currency/received_token/usdc"
  },
  DAI: {
    name: 'Maker DAO',
    symbol: 'DAI',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/dai.svg'),
    iconPath: "crypto_currency/received_token/dai"
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/jpyc.svg'),
    iconPath: "crypto_currency/received_token/jpyc"
  },
  WETH: {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    address: '0x43e833406286FfA76DBd456368594B1e5614aa06',
    abi: Weth.abi,
    url: `${url}/0x43e833406286FfA76DBd456368594B1e5614aa06`,
    icon: require('@/assets/images/symbol/eth.svg'),
    iconPath: "crypto_currency/received_token/weth"
  },
}