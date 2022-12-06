import { NETWORKS } from '@/constants'
import Usdt from '../../abis/ethereum/usdt'
import Usdc from '../../abis/ethereum/usdc'
import Dai from '../../abis/ethereum/dai'
import Jpyc from '../../abis/ethereum/dai'
import Weth from '../../abis/ethereum/weth'


const url = NETWORKS[5].scanUrl + '/token'

export default {
  USDT: {
    name: "Teher USD",
    symbol: "USDT",
    address: "0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677",
    abi: Usdt.abi,
    decimals: 6,
    url: `${url}/0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677`,
    icon: require("@/assets/images/symbol/usdt.svg"),
    iconPath: "crypto_currency/received_token/usdt",
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C",
    abi: Usdc.abi,
    decimals: 18,
    url: `${url}/0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C`,
    icon: require("@/assets/images/symbol/usdc.svg"),
    iconPath: "crypto_currency/received_token/usdc",
  },
  DAI: {
    name: "MakerDAO",
    symbol: "DAI",
    address: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
    abi: Dai.abi,
    decimals: 18,
    url: `${url}/0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60`,
    icon: require("@/assets/images/symbol/dai.svg"),
    iconPath: "crypto_currency/received_token/dai",
  },
  JPYC: {
    name: "JPY Coin",
    symbol: "JPYC",
    address: null,
    abi: Jpyc.abi,
    decimals: null,
    url: null,
    icon: require("@/assets/images/symbol/jpyc.svg"),
    iconPath: "crypto_currency/received_token/jpyc",
  },
  WETH: {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    abi: Weth.abi,
    decimals: 18,
    url: `${url}/0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6`,
    icon: require('@/assets/images/symbol/eth.svg'),
    iconPath: "crypto_currency/received_token/weth"
  },
  ETH: {
    name: 'ETH native token',
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    abi: null,
    decimals: 18,
    url: null,
    icon: require('@/assets/images/symbol/eth.svg'),
    iconPath: "crypto_currency/received_token/eth"
  },
  BNB: {
    name: 'BNB native token',
    symbol: 'BNB',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/bnb.svg'),
    iconPath: "crypto_currency/received_token/bnb"
  },
  MATIC: {
    name: 'MATIC native token',
    symbol: 'MAIC',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/matic.svg'),
    iconPath: "crypto_currency/received_token/matic"
  },
  AVAX: {
    name: 'AVAX native token',
    symbol: 'AVAX',
    address: null,
    abi: null,
    decimals: null,
    url: null,
    icon: require('@/assets/images/symbol/avax.svg'),
    iconPath: "crypto_currency/received_token/avax"
  }
}