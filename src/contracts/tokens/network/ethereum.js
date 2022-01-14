import { PRODUCTION, NETWORKS } from '../../../constants'
import Usdt from '../abis/ethereum/usdt'
import Usdc from '../abis/ethereum/usdc'
import Dai from '../abis/ethereum/dai'
import Uni from '../abis/ethereum/uni'
import Sushi from '../abis/ethereum/sushi'
import Weth from '../abis/ethereum/weth'

const url =
  process.env.NODE_ENV === PRODUCTION
  ? NETWORKS[1].scanUrl + '/address'
  : NETWORKS[3].scanUrl + '/address'

export default {
  ETH: {
    name: 'ETH',
    address: null,
    abi: null,
    url: null
  },
  USDT: {
    name: 'USDT',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: Usdt.abi,
    url: `${url}/0xdac17f958d2ee523a2206206994597c13d831ec7`
  },
  USDC: {
    name: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    abi: Usdc.abi,
    url: `${url}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
  },
  DAI: {
    name: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    abi: Dai.abi,
    url: `${url}/0x6B175474E89094C44Da98b954EedeAC495271d0F`
  },
  UNI: {
    name: 'UNI',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    abi: Uni.abi,
    url: `${url}/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984`
  },
  SUSHI: {
    name: 'SUSHI',
    address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
    abi: Sushi.abi,
    url: `${url}/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2`
  },
  WETH: {
    name: 'WETH',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    abi: Weth.abi,
    url: `${url}/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`
  }
}