import { NETWORKS } from '@/constants'
import Usdt from '../../abis/ethereum/usdt'
import Usdc from '../../abis/ethereum/usdc'
import Dai from '../../abis/ethereum/dai'
import Jpyc  from '../../abis/ethereum/jpyc'
import Weth from '../../abis/ethereum/weth'

const url = NETWORKS[1].scanUrl + '/token'

export default {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: Usdt.abi,
    url: `${url}/0xdac17f958d2ee523a2206206994597c13d831ec7`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    abi: Usdc.abi,
    url: `${url}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  DAI: {
    name: 'MakerDAO',
    symbol: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    abi: Dai.abi,
    url: `${url}/0x6B175474E89094C44Da98b954EedeAC495271d0F`,
    icon: require('@/assets/images/symbol/dai.svg')
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: '0x2370f9d504c7a6E775bf6E14B3F12846b594cD53',
    abi: Jpyc.abi,
    url: `${url}/0x2370f9d504c7a6E775bf6E14B3F12846b594cD53`,
    icon: require('@/assets/images/symbol/jpyc.svg')
  },
  WETH: {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    abi: Weth.abi,
    url: `${url}/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`,
    icon: require('@/assets/images/symbol/eth.svg')
  },
}