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
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: "crypto_currency/received_token/usdt"
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    abi: Usdc.abi,
    url: `${url}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`,
    icon: require('@/assets/images/symbol/usdc.svg'),
    iconPath: "crypto_currency/received_token/usdc"
  },
  DAI: {
    name: 'MakerDAO',
    symbol: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    abi: Dai.abi,
    url: `${url}/0x6B175474E89094C44Da98b954EedeAC495271d0F`,
    icon: require('@/assets/images/symbol/dai.svg'),
    iconPath: "crypto_currency/received_token/dai"
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB',
    abi: Jpyc.abi,
    url: `${url}/0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB`,
    icon: require('@/assets/images/symbol/jpyc.svg'),
    iconPath: "crypto_currency/received_token/jpyc"
  },
  WETH: {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    abi: Weth.abi,
    url: `${url}/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`,
    icon: require('@/assets/images/symbol/eth.svg'),
    iconPath: "crypto_currency/received_token/weth"
  },
}