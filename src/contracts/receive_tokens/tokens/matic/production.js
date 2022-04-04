import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'
import Usdc from '../../abis/matic/usdc'
import Dai from '../../abis/matic/dai'
import Jpyc from '../../abis/matic/jpyc'

const url = NETWORKS[137].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    abi: Usdt.abi,
    url: `${url}/0xc2132D05D31c914a87C6611C10748AEb04B58e8F`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    abi: Usdc.abi,
    url: `${url}/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  DAI: {
    name: 'Maker DAO',
    symbol: 'DAI',
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    abi: Dai.abi,
    url: `${url}/0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063`,
    icon: require('@/assets/images/symbol/dai.svg')
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: '0x6AE7Dfc73E0dDE2aa99ac063DcF7e8A63265108c',
    abi: Jpyc.abi,
    url: `${url}/0x6AE7Dfc73E0dDE2aa99ac063DcF7e8A63265108c`,
    icon: require('@/assets/images/symbol/jpyc.svg')
  }
}