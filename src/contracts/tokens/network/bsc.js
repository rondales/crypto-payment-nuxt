import { PRODUCTION, NETWORKS } from '../../../constants'
import Usdt from '../abis/binance/usdt'
import Busd from '../abis/binance/busd'
import Usdc from '../abis/binance/usdc'
import Cake from '../abis/binance/cake'
import Wbnb from '../abis/binance/wbnb'

const url =
  process.env.NODE_ENV === PRODUCTION
  ? NETWORKS[56].scanUrl + '/address'
  : NETWORKS[97].scanUrl + '/address'

export default {
  BNB: {
    name: 'BNB',
    address: null,
    abi: null,
    url: null
  },
  USDT: {
    name: 'USDT',
    address: '0x55d398326f99059ff775485246999027b3197955',
    abi: Usdt.abi,
    url: `${url}/0x55d398326f99059ff775485246999027b3197955`
  },
  BUSD: {
    name: 'BUSD',
    address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    abi: Busd.abi,
    url: `${url}/0xe9e7cea3dedca5984780bafc599bd69add087d56`
  },
  USDC: {
    name: 'USDC',
    address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    abi: Usdc.abi,
    url: `${url}/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d`
  },
  CAKE: {
    name: 'CAKE',
    address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    abi: Cake.abi,
    url: `${url}/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82`
  },
  WBNB: {
    name: "WBNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    abi: Wbnb.abi,
    url: `${url}/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`,
  },
}