import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'
import Usdc from '../../abis/matic/usdc'
import Wmatic from '../../abis/matic/wmatic'
import Erc20Abi from 'erc-20-abi'

const url = NETWORKS[137].scanUrl + '/token'

export default {
  MATIC: {
    name: 'Polygon',
    symbol: 'MATIC',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/matic.svg'),
    iconPath: "crypto_currency/matic",
    iconType: "png"
  },
  WMATIC: {
    name: 'Wrapped MATIC',
    symbol: "WMATIC",
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    abi: Wmatic.abi,
    url: `${url}/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270`,
    icon: require('@/assets/images/symbol/wmatic.svg'),
    iconPath: "crypto_currency/wmatic",
    iconType: "png"
  },
  DAI: {
    name: 'Dai Stablecoin',
    symbol: "DAI",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    abi: Erc20Abi,
    url: `${url}/0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    iconPath: "crypto_currency/dai",
    iconType: "png"
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    abi: Usdc.abi,
    url: `${url}/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`,
    icon: require('@/assets/images/symbol/usdc.svg'),
    iconPath: "crypto_currency/usdc",
    iconType: "png"
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    abi: Usdt.abi,
    url: `${url}/0xc2132D05D31c914a87C6611C10748AEb04B58e8F`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: "crypto_currency/usdt",
    iconType: "png"
  },
  'QUICK(OLD)': {
    name: 'QuickSwap(OLD)',
    symbol: 'QUICK(OLD)',
    address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    abi: Erc20Abi,
    url: `${url}/0x831753DD7087CaC61aB5644b308642cc1c33Dc13`,
    icon: 'https://assets.coingecko.com/coins/images/25393/small/quickswap.jpg?1651680141',
    iconPath: "crypto_currency/quick-swap",
    iconType: "png"
  },
  'QUICK(NEW)': {
    name: 'QuickSwap(NEW)',
    symbol: 'QUICK(NEW)',
    address: '0xB5C064F955D8e7F38fE0460C556a72987494eE17',
    abi: Erc20Abi,
    url: `${url}/0xB5C064F955D8e7F38fE0460C556a72987494eE17`,
    icon: 'https://i.ibb.co/HGWTLM7/Quick-Icon-V2.png',
    iconPath: "crypto_currency/quick-swap",
    iconType: "png"
  },
  ETH: {
    name: 'Ether',
    symbol: 'ETH',
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    abi: Erc20Abi,
    url: `${url}/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    iconPath: "crypto_currency/eth",
    iconType: "png"
  },
  WBTC: {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    abi: Erc20Abi,
    url: `${url}/0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
    iconPath: "crypto_currency/wbtc",
    iconType: "png"
  },
  SAND: {
    name: 'SAND',
    symbol: 'SAND',
    address: '0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683',
    abi: Erc20Abi,
    url: `${url}/0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683`,
    icon: 'https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg?1597397942',
    iconPath: "crypto_currency/the-sandbox",
    iconType: "png"
  },
  MAI: {
    name: 'MAI',
    symbol: 'MAI',
    address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
    abi: Erc20Abi,
    url: `${url}/0xa3Fa99A148fA48D14Ed51d610c367C61876997F1`,
    icon: 'https://raw.githubusercontent.com/0xlaozi/qidao/main/images/mimatic-red.png',
    iconPath: "crypto_currency/mai",
    iconType: "png"
  },
  '4INT': {
    name: '4INT',
    symbol: '4INT',
    address: '0x5CEeBB0947d58Fabde2fc026Ffe4B33ccFE1bA8B',
    abi: Erc20Abi,
    url: `${url}/0x5CEeBB0947d58Fabde2fc026Ffe4B33ccFE1bA8B`,
    icon: 'https://polygonscan.com/token/images/forintfinance_32.png',
    iconPath: "crypto_currency/four-int",
    iconType: "png"
  },
  AAVE: {
    name: 'Aave',
    symbol: 'AAVE',
    address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
    abi: Erc20Abi,
    url: `${url}/0xD6DF932A45C0f255f85145f286eA0b292B21C90B`,
    icon: 'https://etherscan.io/token/images/aave_32.png',
    iconPath: "crypto_currency/aave",
    iconType: "png"
  },
  ACRE: {
    name: 'Arable Protocol',
    symbol: 'ACRE',
    address: '0x011734f6Ed20E8D011d85Cf7894814B897420acf',
    abi: Erc20Abi,
    url: `${url}/0x011734f6Ed20E8D011d85Cf7894814B897420acf`,
    icon: 'https://assets.coingecko.com/coins/images/23659/small/acre_token-02.png?1644989289',
    iconPath: "crypto_currency/arable-protocol",
    iconType: "png"
  },
  ADDY: {
    name: 'Adamant',
    symbol: 'ADDY',
    address: '0xc3FdbadC7c795EF1D6Ba111e06fF8F16A20Ea539',
    abi: Erc20Abi,
    url: `${url}/0xc3FdbadC7c795EF1D6Ba111e06fF8F16A20Ea539`,
    icon: 'https://adamant.finance/img/adamant.png',
    iconPath: "crypto_currency/adamant",
    iconType: "png"
  },
  ADS: {
    name: 'Adshares',
    address: '0x598e49f01bEfeB1753737934a5b11fea9119C796',
    symbol: 'ADS',
    abi: Erc20Abi,
    url: `${url}/0x598e49f01bEfeB1753737934a5b11fea9119C796`,
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1883.png',
    iconPath: "crypto_currency/adshares",
    iconType: "png"
  },
  agEUR: {
    name: 'agEUR',
    symbol: 'agEUR',
    address: '0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4',
    abi: Erc20Abi,
    url: `${url}/0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4`,
    icon: 'https://assets.coingecko.com/coins/images/19479/small/agEUR.png?1635283566',
    iconPath: "crypto_currency/angle-protocol",
    iconType: "png"
  },
  ALGB: {
    name: 'Algebra',
    symbol: 'ALGB',
    address: '0x0169eC1f8f639B32Eec6D923e24C2A2ff45B9DD6',
    abi: Erc20Abi,
    url: `${url}/0x0169eC1f8f639B32Eec6D923e24C2A2ff45B9DD6`,
    icon: 'https://assets.coingecko.com/coins/images/19580/small/13211.png?1635469023',
    iconPath: "crypto_currency/algebra",
    iconType: "png"
  },
  ALPHA: {
    name: 'Aavegotchi ALPHA',
    symbol: 'ALPHA',
    address: '0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2',
    abi: Erc20Abi,
    url: `${url}/0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2`,
    icon: 'https://assets.coingecko.com/coins/images/24738/small/alpha.png?1648769768',
    iconPath: "crypto_currency/aavegotchi-alpha",
    iconType: "png"
  },
  ANRX: {
    name: 'AnRKey X',
    symbol: 'ANRX',
    address: '0x554f074d9cCda8F483d1812d4874cBebD682644E',
    abi: Erc20Abi,
    url: `${url}/0x554f074d9cCda8F483d1812d4874cBebD682644E`,
    icon: 'https://assets.coingecko.com/coins/images/13415/small/anrkey.jpg?1608311301',
    iconPath: "crypto_currency/anrx",
    iconType: "png"
  },
  ANY: {
    name: 'Anyswap',
    symbol: 'ANY',
    address: '0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8',
    abi: Erc20Abi,
    url: `${url}/0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8`,
    icon: 'https://raw.githubusercontent.com/anyswap/Brand-assets/master/logo/c-128-white.svg',
    iconPath: "crypto_currency/any-swap",
    iconType: "png"
  },
  ASTRAFER: {
    name: 'Astrafer',
    symbol: 'ASTRAFER',
    address: '0xDfCe1e99A31C4597a3f8A8945cBfa9037655e335',
    abi: Erc20Abi,
    url: `${url}/0xDfCe1e99A31C4597a3f8A8945cBfa9037655e335`,
    icon: 'https://assets.coingecko.com/coins/images/26246/small/ATSRA_Token.png?1657276411',
    iconPath: "crypto_currency/astrafer",
    iconType: "png"
  },
  ATK: {
    name: 'Attack',
    symbol: 'ATK',
    address: '0xF868939Ee81F04f463010BC52EAb91c0839eF08c',
    abi: Erc20Abi,
    url: `${url}/0xF868939Ee81F04f463010BC52EAb91c0839eF08c`,
    icon: 'https://assets.coingecko.com/coins/images/21333/small/attack.PNG?1638948221',
    iconPath: "crypto_currency/atack-wagon",
    iconType: "png"
  },
  ATLX: {
    name: 'Atlantis',
    symbol: 'ATLX',
    address: '0x0b68782eFF3177f1F9240B64A7e2F8E0497e2454',
    abi: Erc20Abi,
    url: `${url}/0x0b68782eFF3177f1F9240B64A7e2F8E0497e2454`,
    icon: 'https://assets.coingecko.com/coins/images/19362/small/atl.png?1635209629',
    iconPath: "crypto_currency/atrantis-loans-polygon",
    iconType: "png"
  }
}