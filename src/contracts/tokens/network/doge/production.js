import { NETWORKS } from '@/constants'
import Erc20Abi from 'erc-20-abi'

const url = NETWORKS[2000].scanUrl + '/token'

export default {
  DOGE: {
    name: 'Wrapped DOGE',
    symbol: 'DOGE',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/wwdoge.svg'),
    iconPath: 'crypto_currency/wwdoge',
    iconType: 'png'
  },
  WWDOGE: {
    name: 'Wrapped WDOGE',
    symbol: 'WWDOGE',
    address: '0xb7ddc6414bf4f5515b52d8bdd69973ae205ff101',
    abi: Erc20Abi,
    url: `${url}/0xb7ddc6414bf4f5515b52d8bdd69973ae205ff101`,
    icon: require('@/assets/images/symbol/wwdoge.svg'),
    iconPath: 'crypto_currency/wwdoge',
    iconType: 'png'
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x765277eebeca2e31912c9946eae1021199b39c61',
    abi: Erc20Abi,
    url: `${url}/0x765277eebeca2e31912c9946eae1021199b39c61`,
    icon: require("@/assets/images/symbol/usdc.svg"),
    iconPath: "crypto_currency/usdc",
    iconType: "png"
  },
  BUSD: {
    name: 'Binance USD',
    symbol: 'BUSD',
    address: '0x332730a4f6e03d9c55829435f10360e13cfa41ff',
    abi: Erc20Abi,
    url: `${url}/0x332730a4f6e03d9c55829435f10360e13cfa41ff`,
    icon: require("@/assets/images/symbol/busd.svg"),
    iconPath: "crypto_currency/busd",
    iconType: "png"
  },
  ETH: {
    name: 'ETH Token',
    symbol: 'ETH',
    address: '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
    abi: Erc20Abi,
    url: `${url}/0xb44a9b6905af7c801311e8f4e76932ee959c663c`,
    icon: require("@/assets/images/symbol/eth.svg"),
    iconPath: "crypto_currency/eth",
    iconType: "png"
  },
  DC: {
    name: 'Dogechain Token',
    symbol: 'DC',
    address: '0x7B4328c127B85369D9f82ca0503B000D09CF9180',
    abi: Erc20Abi,
    url: `${url}/0x7B4328c127B85369D9f82ca0503B000D09CF9180`,
    icon: require('@/assets/images/symbol/wwdoge.svg'),
    iconPath: 'crypto_currency/wwdoge',
    iconType: 'png'
  },
  KIB: {
    name: 'Kibble',
    symbol: 'KIB',
    address: '0x1e1026ba0810e6391b0f86afa8a9305c12713b66',
    abi: Erc20Abi,
    url: `${url}/0x1e1026ba0810e6391b0f86afa8a9305c12713b66`,
    icon: require('@/assets/images/symbol/kib.svg'),
    iconPath: 'crypto_currency/kib',
    iconType: 'png'
  },
  OMNOM: {
    name: 'Doge Eat Doge',
    symbol: 'OMNOM',
    address: '0xe3fca919883950c5cd468156392a6477ff5d18de',
    abi: Erc20Abi,
    url: `${url}/0xe3fca919883950c5cd468156392a6477ff5d18de`,
    icon: require('@/assets/images/symbol/omnom.svg'),
    iconPath: 'crypto_currency/omnom',
    iconType: 'png'
  },
  YODE: {
    name: 'YodeSwap',
    symbol: 'YODE',
    address: '0x6fc4563460d5f45932c473334d5c1c5b4aea0e01',
    abi: Erc20Abi,
    url: `${url}/0x6fc4563460d5f45932c473334d5c1c5b4aea0e01`,
    icon: require('@/assets/images/symbol/yode.svg'),
    iconPath: 'crypto_currency/yode',
    iconType: 'png'
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
    abi: Erc20Abi,
    url: `${url}/0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: "crypto_currency/usdt",
    iconType: "png"
  },
  WBTC: {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    address: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
    abi: Erc20Abi,
    url: `${url}/0xfa9343c3897324496a05fc75abed6bac29f8a40f`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
    iconPath: "crypto_currency/wbtc",
    iconType: "png"
  },
  DAI: {
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    address: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
    abi: Erc20Abi,
    url: `${url}/0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C`,
    icon: require('@/assets/images/symbol/dai.svg'),
    iconPath: "crypto_currency/dai",
    iconType: "png"
  },
}
