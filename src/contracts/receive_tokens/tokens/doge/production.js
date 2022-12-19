import { NETWORKS } from '@/constants'
import Erc20Abi from 'erc-20-abi'

const url = NETWORKS[2000].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
    abi: Erc20Abi,
    decimals: 6,
    url: `${url}/0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: 'crypto_currency/received_token/usdt'
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x765277eebeca2e31912c9946eae1021199b39c61',
    abi: Erc20Abi,
    decimals: 6,
    url: `${url}/0x765277eebeca2e31912c9946eae1021199b39c61`,
    icon: require('@/assets/images/symbol/usdc.svg'),
    iconPath: 'crypto_currency/received_token/usdc'
  },
  DAI: {
    name: 'Maker DAO',
    symbol: 'DAI',
    address: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
    abi: Erc20Abi,
    decimals: 18,
    url: `${url}/0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C`,
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
    icon: require('@/assets/images/symbol/avax.svg'),
    iconPath: 'crypto_currency/received_token/jpyc'
  },
  WETH: {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    address: null,
    abi: null,
    decimals: null,
    url: null,
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
    iconPath: "crypto_currency/received_token/eth"
  },
  BNB: {
    name: 'BNB native token',
    symbol: 'BNB',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/bnb.svg'),
    iconPath: "crypto_currency/received_token/bnb"
  },
  MATIC: {
    name: 'MATIC native token',
    symbol: 'MAIC',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/matic.svg'),
    iconPath: "crypto_currency/received_token/matic"
  },
  AVAX: {
    name: 'AVAX native token',
    symbol: 'AVAX',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/avax.svg'),
    iconPath: "crypto_currency/received_token/avax"
  },
  DOGE: {
    name: 'wrapped DOGE token',
    symbol: 'DOGE',
    address: '0x0000000000000000000000000000000000000000',
    abi: null,
    decimals: 18,
    url: null,
    icon: require('@/assets/images/symbol/doge.svg'),
    iconPath: "crypto_currency/received_token/doge"
  }
}
