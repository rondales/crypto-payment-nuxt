import { NETWORKS } from '@/constants'
import Usdt from '../../abis/avalanche/usdt'
import Usdc from '../../abis/avalanche/usdc'
import Dai from '../../abis/avalanche/dai'
import Weth from '../../abis/avalanche/weth'

const url = NETWORKS[43114].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    abi: Usdt.abi,
    url: `${url}/0xc7198437980c041c805A1EDcbA50c1Ce5db95118`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    abi: Usdc.abi,
    url: `${url}/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664`,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  DAI: {
    name: 'Maker DAO',
    symbol: 'DAI',
    address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    abi: Dai.abi,
    url: `${url}/0xd586E7F844cEa2F87f50152665BCbc2C279D8d70`,
    icon: require('@/assets/images/symbol/dai.svg')
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/avax.svg')
  },
  WETH: {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    abi: Weth.abi,
    url: `${url}/0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB`,
    icon: require('@/assets/images/symbol/eth.svg')
  },
}