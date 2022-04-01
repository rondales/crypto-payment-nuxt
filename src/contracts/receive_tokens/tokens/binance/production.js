import { NETWORKS } from '@/constants'
import Usdt from '../../abis/binance/usdt'
import Usdc from '../../abis/binance/usdc'
import Dai from '../../abis/binance/dai'

const url = NETWORKS[56].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x55d398326f99059ff775485246999027b3197955',
    abi: Usdt.abi,
    url: `${url}/0x55d398326f99059ff775485246999027b3197955`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    abi: Usdc.abi,
    url: `${url}/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d`,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  DAI: {
    name: 'Maker DAO',
    symbol: 'DAI',
    address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    abi: Dai.abi,
    url: `${url}/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3`,
    icon: require('@/assets/images/symbol/dai.svg')
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/jpyc.svg')
  },
}