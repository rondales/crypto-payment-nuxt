import { NETWORKS } from '@/constants'
import Usdt from '../../abis/avalanche/usdt'
import Weth from '../../abis/avalanche/weth'

const url = NETWORKS[43113].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x02823f9B469960Bb3b1de0B3746D4b95B7E35543',
    abi: Usdt.abi,
    url: `${url}/0x02823f9B469960Bb3b1de0B3746D4b95B7E35543`,
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
    address: '0x371345f4D90e95d1DdBe69C547028f311AdecA38',
    abi: Weth.abi,
    url: `${url}/0x371345f4D90e95d1DdBe69C547028f311AdecA38`,
    icon: require('@/assets/images/symbol/eth.svg'),
    iconPath: "crypto_currency/received_token/weth"
  },
}