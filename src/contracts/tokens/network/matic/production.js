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
    icon: require('@/assets/images/symbol/matic.svg')
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    abi: Usdt.abi,
    url: `${url}/0xc2132D05D31c914a87C6611C10748AEb04B58e8F`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    abi: Usdc.abi,
    url: `${url}/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`,
    icon: require('@/assets/images/symbol/usdc.svg')
  },
  WMATIC: {
    name: 'Wrapped MATIC',
    symbol: "WMATIC",
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    abi: Wmatic.abi,
    url: `${url}/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270`,
    icon: require('@/assets/images/symbol/wmatic.svg')
  },
  '4INT': {
    name: '4INT',
    symbol: '4INT',
    address: '0x5CEeBB0947d58Fabde2fc026Ffe4B33ccFE1bA8B',
    abi: Erc20Abi,
    url: `${url}/0x5CEeBB0947d58Fabde2fc026Ffe4B33ccFE1bA8B`,
    icon: 'https://polygonscan.com/token/images/forintfinance_32.png'
  },
  AAVE: {
    name: 'Aave',
    symbol: 'AAVE',
    address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
    abi: Erc20Abi,
    url: `${url}/0xD6DF932A45C0f255f85145f286eA0b292B21C90B`,
    icon: 'https://etherscan.io/token/images/aave_32.png'
  },
  ACRE: {
    name: 'Arable Protocol',
    symbol: 'ACRE',
    address: '0x011734f6Ed20E8D011d85Cf7894814B897420acf',
    abi: Erc20Abi,
    url: `${url}/0x011734f6Ed20E8D011d85Cf7894814B897420acf`,
    icon: 'https://assets.coingecko.com/coins/images/23659/small/acre_token-02.png?1644989289'
  },
  ADDY: {
    name: 'Adamant',
    symbol: 'ADDY',
    address: '0xc3FdbadC7c795EF1D6Ba111e06fF8F16A20Ea539',
    abi: Erc20Abi,
    url: `${url}/0xc3FdbadC7c795EF1D6Ba111e06fF8F16A20Ea539`,
    icon: 'https://adamant.finance/img/adamant.png'
  },
  ADS: {
    name: 'Adshares',
    address: '0x598e49f01bEfeB1753737934a5b11fea9119C796',
    symbol: 'ADS',
    abi: Erc20Abi,
    url: `${url}/0x598e49f01bEfeB1753737934a5b11fea9119C796`,
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1883.png'
  },
  agEUR: {
    name: 'agEUR',
    symbol: 'agEUR',
    address: '0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4',
    abi: Erc20Abi,
    url: `${url}/0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4`,
    icon: 'https://assets.coingecko.com/coins/images/19479/small/agEUR.png?1635283566'
  },
  ALGB: {
    name: 'Algebra',
    symbol: 'ALGB',
    address: '0x0169eC1f8f639B32Eec6D923e24C2A2ff45B9DD6',
    abi: Erc20Abi,
    url: `${url}/0x0169eC1f8f639B32Eec6D923e24C2A2ff45B9DD6`,
    icon: 'https://assets.coingecko.com/coins/images/19580/small/13211.png?1635469023'
  },
  ALPHA: {
    name: 'Aavegotchi ALPHA',
    symbol: 'ALPHA',
    address: '0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2',
    abi: Erc20Abi,
    url: `${url}/0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2`,
    icon: 'https://assets.coingecko.com/coins/images/24738/small/alpha.png?1648769768'
  },
  ANRX: {
    name: 'AnRKey X',
    symbol: 'ANRX',
    address: '0x554f074d9cCda8F483d1812d4874cBebD682644E',
    abi: Erc20Abi,
    url: `${url}/0x554f074d9cCda8F483d1812d4874cBebD682644E`,
    icon: 'https://assets.coingecko.com/coins/images/13415/small/anrkey.jpg?1608311301'
  },
  ANY: {
    name: 'Anyswap',
    symbol: 'ANY',
    address: '0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8',
    abi: Erc20Abi,
    url: `${url}/0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8`,
    icon: 'https://raw.githubusercontent.com/anyswap/Brand-assets/master/logo/c-128-white.svg'
  },
  ASTRAFER: {
    name: 'Astrafer',
    symbol: 'ASTRAFER',
    address: '0xDfCe1e99A31C4597a3f8A8945cBfa9037655e335',
    abi: Erc20Abi,
    url: `${url}/0xDfCe1e99A31C4597a3f8A8945cBfa9037655e335`,
    icon: 'https://assets.coingecko.com/coins/images/26246/small/ATSRA_Token.png?1657276411'
  },
  ATK: {
    name: 'Attack',
    symbol: 'ATK',
    address: '0xF868939Ee81F04f463010BC52EAb91c0839eF08c',
    abi: Erc20Abi,
    url: `${url}/0xF868939Ee81F04f463010BC52EAb91c0839eF08c`,
    icon: 'https://assets.coingecko.com/coins/images/21333/small/attack.PNG?1638948221'
  },
  ATLX: {
    name: 'Atlantis',
    symbol: 'ATLX',
    address: '0x0b68782eFF3177f1F9240B64A7e2F8E0497e2454',
    abi: Erc20Abi,
    url: `${url}/0x0b68782eFF3177f1F9240B64A7e2F8E0497e2454`,
    icon: 'https://assets.coingecko.com/coins/images/19362/small/atl.png?1635209629'
  },
  ATOM: {
    name: 'Cosmos',
    symbol: 'ATOM',
    address: '0xac51C4c48Dc3116487eD4BC16542e27B5694Da1b',
    abi: Erc20Abi,
    url: `${url}/0xac51C4c48Dc3116487eD4BC16542e27B5694Da1b`,
    icon: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png?1555657960'
  },
  AVAX: {
    name: 'Avalanche Token',
    symbol: 'AVAX',
    address: '0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b',
    abi: Erc20Abi,
    url: `${url}/0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b`,
    icon: 'https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818'
  },
  AWS: {
    name: 'AurusSILVER',
    symbol: 'AWS',
    address: '0xA96D47c621a8316d4F9539E3B38180C7067e84CA',
    abi: Erc20Abi,
    url: `${url}/0xA96D47c621a8316d4F9539E3B38180C7067e84CA`,
    icon: 'https://assets.coingecko.com/coins/images/14965/small/2021-12-06-Aurus-tokens-for-coingecko-AWS-flat-color-v1-r1-AS.png?1640223368'
  },
  AWX: {
    name: 'AurusDeFi',
    symbol: 'AWX',
    address: '0x56A0eFEFC9F1FBb54FBd25629Ac2aA764F1b56F7',
    abi: Erc20Abi,
    url: `${url}/0x56A0eFEFC9F1FBb54FBd25629Ac2aA764F1b56F7`,
    icon: 'https://assets.coingecko.com/coins/images/12684/small/2021-12-06-Aurus-tokens-for-coingecko-AWX-flat-color-v1-r1-AS.png?1640223413'
  },
  BANANA: {
    name: 'Banana',
    symbol: 'BANANA',
    address: '0xbC91347e80886453F3f8bBd6d7aC07C122D87735',
    abi: Erc20Abi,
    url: `${url}/0xbC91347e80886453F3f8bBd6d7aC07C122D87735`,
    icon: 'https://assets.coingecko.com/coins/images/17521/small/banana-token-cg.png?1646285527'
  },
  BCMC: {
    name: 'Blockchain Monster Coin',
    symbol: 'BCMC',
    address: '0xc10358f062663448a3489fC258139944534592ac',
    abi: Erc20Abi,
    url: `${url}/0xc10358f062663448a3489fC258139944534592ac`,
    icon: 'https://bcmhunt.com/bcmc-coin-512x512.png'
  },
  BETS: {
    name: 'BetSwirl Token',
    symbol: 'BETS',
    address: '0x9246a5F10A79a5a939b0C2a75A3AD196aAfDB43b',
    abi: Erc20Abi,
    url: `${url}/0x9246a5F10A79a5a939b0C2a75A3AD196aAfDB43b`,
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18453.png'
  }
}