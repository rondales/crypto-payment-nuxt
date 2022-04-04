import { NETWORKS } from '@/constants'
import Usdt from '../../abis/ethereum/usdt'
import Usdc from '../../abis/ethereum/usdc'
import Dai from '../../abis/ethereum/dai'
import Jpyc from '../../abis/ethereum/dai'


const url = NETWORKS[3].scanUrl + '/address'

export default {
  USDT: {
    name: 'Teher USD',
    symbol: 'USDT',
    address: '0x110a13FC3efE6A245B50102D2d79B3E76125Ae83',
    abi: Usdt.abi,
    url: `${url}/0x110a13FC3efE6A245B50102D2d79B3E76125Ae83`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    abi: Usdc.abi,
    url: `${url}/0x07865c6E87B9F70255377e024ace6630C1Eaa37F`,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  DAI: {
    name: 'MakerDAO',
    symbol: 'DAI',
    address: '0x31F42841c2db5173425b5223809CF3A38FEde360',
    abi: Dai.abi,
    url: `${url}/0x31F42841c2db5173425b5223809CF3A38FEde360`,
    icon: require('@/assets/images/symbol/dai.svg')
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: null,
    abi: Jpyc.abi,
    url: null,
    icon: require('@/assets/images/symbol/jpyc.svg')
  },
}