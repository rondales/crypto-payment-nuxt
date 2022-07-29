import { NETWORKS } from '@/constants'
import Usdt from '../../abis/avalanche/usdt'
import Usdc from '../../abis/avalanche/usdc'
import Wavax from '../../abis/avalanche/wavax'
import Dai from '../../abis/matic/dai'
import Jpyc from '../../abis/matic/jpyc'

const url = NETWORKS[43114].scanUrl + '/token'

export default {
  AVAX: {
    name: 'Avalanche',
    symbol: 'AVAX',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/avax.svg')
  },
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
  WAVAX: {
    name: 'Wrapped AVAX',
    symbol: "WAVAX",
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    abi: Wavax.abi,
    url: `${url}/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`,
    icon: require('@/assets/images/symbol/wavax.svg')
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
    address: '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB',
    abi: Jpyc.abi,
    url: `${url}/0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB`,
    icon: require('@/assets/images/symbol/avax.svg')
  }
}