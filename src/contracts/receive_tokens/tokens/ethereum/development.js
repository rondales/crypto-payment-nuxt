import { NETWORKS } from '@/constants'
import Usdt from '../../abis/ethereum/usdt'
import Usdc from '../../abis/ethereum/usdc'
import Dai from '../../abis/ethereum/dai'
import Jpyc from '../../abis/ethereum/dai'


const url = NETWORKS[5].scanUrl + '/token'

export default {
  USDT: {
    name: 'Teher USD',
    symbol: 'USDT',
    address: '0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677',
    abi: Usdt.abi,
    url: `${url}/0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C',
    abi: Usdc.abi,
    url: `${url}/0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C`,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  DAI: {
    name: 'MakerDAO',
    symbol: 'DAI',
    address: '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60',
    abi: Dai.abi,
    url: `${url}/0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60`,
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