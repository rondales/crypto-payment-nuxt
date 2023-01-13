import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'
import Usdc from '../../abis/matic/usdc'
import Dai from '../../abis/matic/dai'
import Jpyc from '../../abis/matic/jpyc'
import Weth from '../../abis/matic/weth'

const url = NETWORKS[592].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
    abi: Usdt.abi,
    decimals: 6,
    url: `${url}/0x3795C36e7D12A8c252A20C5a7B455f7c57b60283`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: 'crypto_currency/received_token/usdt'
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    abi: Usdc.abi,
    decimals: 6,
    url: `${url}/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98`,
    icon: require('@/assets/images/symbol/usdc.svg'),
    iconPath: 'crypto_currency/received_token/usdc'
  },
  DAI: {
    name: 'Maker DAO',
    symbol: 'DAI',
    address: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
    abi: Dai.abi,
    decimals: 18,
    url: `${url}/0x6De33698e9e9b787e09d3Bd7771ef63557E148bb`,
    icon: require('@/assets/images/symbol/dai.svg'),
    iconPath: 'crypto_currency/received_token/dai'
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB',
    abi: Jpyc.abi,
    decimals: 18,
    url: `${url}/0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB`,
    icon: require('@/assets/images/symbol/jpyc.svg'),
    iconPath: 'crypto_currency/received_token/jpyc'
  },
  WETH: {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    abi: Weth.abi,
    decimals: 18,
    url: `${url}/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720`,
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
    decimals: 18,
    url: null,
    icon: require('@/assets/images/symbol/astr.svg'),
    iconPath: 'crypto_currency/received_token/astr'
  }
}
