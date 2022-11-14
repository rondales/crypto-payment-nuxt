import { NETWORKS } from '@/constants'
import Usdt from '../../abis/binance/usdt'
import Busd from '../../abis/binance/busd'
import Usdc from '../../abis/binance/usdc'
import Cake from '../../abis/binance/cake'
import Wbnb from '../../abis/binance/wbnb'
import Erc20Abi from 'erc-20-abi'

const url = NETWORKS[56].scanUrl + '/token'

export default {
  BNB: {
    name: "Binance",
    symbol: "BNB",
    address: null,
    abi: null,
    url: null,
    icon: require("@/assets/images/symbol/bnb.svg"),
    iconPath: "crypto_currency/bnb",
    iconType: "png"
  },
  BUSD: {
    name: "Binance USD",
    symbol: "BUSD",
    address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    abi: Busd.abi,
    url: `${url}/0xe9e7cea3dedca5984780bafc599bd69add087d56`,
    icon: require("@/assets/images/symbol/busd.svg"),
    iconPath: "crypto_currency/busd",
    iconType: "png"
  },
  GMT: {
    name: "Green Metaverse Token",
    symbol: "GMT",
    address: "0x3019BF2a2eF8040C242C9a4c5c4BD4C81678b2A1",
    abi: Erc20Abi,
    url: `${url}/0x3019BF2a2eF8040C242C9a4c5c4BD4C81678b2A1`,
    icon: 'https://assets.coingecko.com/coins/images/23597/small/gmt.png?1644658792',
    iconPath: "crypto_currency/gmt",
    iconType: "png"
  },
  CAKE: {
    name: "PancakeSwap",
    symbol: "CAKE",
    address: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
    abi: Cake.abi,
    url: `${url}/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82`,
    icon: require("@/assets/images/symbol/cake.svg"),
    iconPath: "crypto_currency/cake",
    iconType: "png"
  },
  BTCB: {
    name: 'Binance Bitcoin"',
    symbol: 'BTCB',
    address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    abi: Erc20Abi,
    url: `${url}/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c`,
    icon: 'https://assets.coingecko.com/coins/images/14108/thumb/Binance-bitcoin.png?1617332330',
    iconPath: "crypto_currency/btcb",
    iconType: "png"
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x55d398326f99059ff775485246999027b3197955',
    abi: Usdt.abi,
    url: `${url}/0x55d398326f99059ff775485246999027b3197955`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: "crypto_currency/usdt",
    iconType: "png"
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    abi: Usdc.abi,
    url: `${url}/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d`,
    icon: require('@/assets/images/symbol/usdc.svg'),
    iconPath: "crypto_currency/usdc",
    iconType: "png"
  },
  WBNB: {
    name: "Wrapped BNB",
    symbol: "WBNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    abi: Wbnb.abi,
    url: `${url}/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`,
    icon: require('@/assets/images/symbol/wbnb.svg'),
    iconPath: "crypto_currency/wbnb",
    iconType: "png"
  },
  $1BIT: {
    name: 'OneBit',
    symbol: "$1BIT",
    address: "0x97A266490eFA4Fb564aD625AcCabE5641de2f805",
    abi: Erc20Abi,
    url: `${url}/0x97A266490eFA4Fb564aD625AcCabE5641de2f805`,
    icon: 'https://assets.coingecko.com/coins/images/20266/thumb/0949bddc836d95169980ae5fc826a441.jpg?1636704622',
    iconPath: "crypto_currency/one-bit",
    iconType: "png"
  },
  $867: {
    name: '867',
    symbol: "$867",
    address: "0x9CEFd9588f076c5f805341864adC8a6F077A5b99",
    abi: Erc20Abi,
    url: `${url}/0x9CEFd9588f076c5f805341864adC8a6F077A5b99`,
    icon: 'https://assets.coingecko.com/coins/images/17676/thumb/unnamed.png?1630072464',
    iconPath: "crypto_currency/867",
    iconType: "png"
  },
  $ADoge: {
    name: 'Arabian Doge',
    symbol: "$ADoge",
    address: "0x5cB7e2dC122b33c7b191799ca7E23d5b4A15fBD0",
    abi: Erc20Abi,
    url: `${url}/0x5cB7e2dC122b33c7b191799ca7E23d5b4A15fBD0`,
    icon: 'https://assets.coingecko.com/coins/images/26076/thumb/Safeimagekit-ArabianDogepng.png?1655689730',
    iconPath: "crypto_currency/adoge",
    iconType: "png"
  },
  $ALTI: {
    name: 'Altimatum',
    symbol: "$ALTI",
    address: "0x195e3087ea4d7eec6e9c37e9640162Fe32433D5e",
    abi: Erc20Abi,
    url: `${url}/0x195e3087ea4d7eec6e9c37e9640162Fe32433D5e`,
    icon: 'https://assets.coingecko.com/coins/images/26772/thumb/footerlogo.png?1660048555',
    iconPath: "crypto_currency/alti",
    iconType: "png"
  },
  $ANRX: {
    name: 'AnRKey X',
    symbol: "$ANRX",
    address: "0xE2e7329499E8DDb1f2b04EE4B35a8d7f6881e4ea",
    abi: Erc20Abi,
    url: `${url}/0xE2e7329499E8DDb1f2b04EE4B35a8d7f6881e4ea`,
    icon: 'https://assets.coingecko.com/coins/images/13415/thumb/anrkey.jpg?1608311301',
    iconPath: "crypto_currency/anrx",
    iconType: "png"
  },
  $ARC: {
    name: 'Arcadia Token',
    symbol: "$ARC",
    address: "0x2DEdE4b234A735cB76A00dF33588f2B8F0AA0b6a",
    abi: Erc20Abi,
    url: `${url}/0x2DEdE4b234A735cB76A00dF33588f2B8F0AA0b6a`,
    icon: 'https://assets.coingecko.com/coins/images/26770/thumb/rsz_1ezgue9tq_400x400.png?1660047420',
    iconPath: "crypto_currency/arc",
    iconType: "png"
  },
  $BABYDOGEINU: {
    name: 'Baby Doge Inu',
    symbol: "$BABYDOGEINU",
    address: "0x5E5C9001Aa81332D405D993FFd1468751D659d1e",
    abi: Erc20Abi,
    url: `${url}/0x5E5C9001Aa81332D405D993FFd1468751D659d1e`,
    icon: 'https://assets.coingecko.com/coins/images/17012/thumb/KEtLxnLH_400x400.jpg?1633713669',
    iconPath: "crypto_currency/baby-doge-inu",
    iconType: "png"
  },
  $BACK: {
    name: 'DollarBack',
    symbol: "$BACK",
    address: "0xF2cAaBf67f99D3AC5D0A4529722cFB874c9b35Bf",
    abi: Erc20Abi,
    url: `${url}/0xF2cAaBf67f99D3AC5D0A4529722cFB874c9b35Bf`,
    icon: 'https://assets.coingecko.com/coins/images/26973/thumb/logoring200x200.png?1661153856',
    iconPath: "crypto_currency/back",
    iconType: "png"
  },
  $BAETH: {
    name: 'BabyAETH',
    symbol: "$BAETH",
    address: "0x62E9581Fe25ce5549b1f2481A9C0355A861515db",
    abi: Erc20Abi,
    url: `${url}/0x62E9581Fe25ce5549b1f2481A9C0355A861515db`,
    icon: 'https://assets.coingecko.com/coins/images/24935/thumb/Baby-EATH-Logo.png?1649422394',
    iconPath: "crypto_currency/baeth",
    iconType: "png"
  },
  $BBT: {
    name: 'Booby Trap',
    symbol: "$BBT",
    address: "0x609b88f5a4aBB7A55bA0c6d255C3F1b1bC7A4D76",
    abi: Erc20Abi,
    url: `${url}/0x609b88f5a4aBB7A55bA0c6d255C3F1b1bC7A4D76`,
    icon: 'https://assets.coingecko.com/coins/images/23889/thumb/round.png?1645606123',
    iconPath: "crypto_currency/booby-trap",
    iconType: "png"
  },
  $BLOW: {
    name: 'BlowUP',
    symbol: "$BLOW",
    address: "0x27C5b6CFD52f82a3428996C6FDdD0173E29B7064",
    abi: Erc20Abi,
    url: `${url}/0x27C5b6CFD52f82a3428996C6FDdD0173E29B7064`,
    icon: 'https://assets.coingecko.com/coins/images/18962/thumb/Blowup-2.png?1634025971',
    iconPath: "crypto_currency/blow-up",
    iconType: "png"
  },
  $CASIO: {
    name: 'CasinoXMetaverse',
    symbol: "$CASIO",
    address: "0x82A336bA310b5a590a59dB08A0E1FF8C33Df8Bbd",
    abi: Erc20Abi,
    url: `${url}/0x82A336bA310b5a590a59dB08A0E1FF8C33Df8Bbd`,
    icon: 'https://assets.coingecko.com/coins/images/22930/thumb/Casio-Icon.png?1643003651',
    iconPath: "crypto_currency/casio",
    iconType: "png"
  },
  $CINU: {
    name: 'CHEEMS INU',
    symbol: "$CINU",
    address: "0xdFE6891ce8E5a5c7Cf54fFdE406A6C2C54145F71",
    abi: Erc20Abi,
    url: `${url}/0xdFE6891ce8E5a5c7Cf54fFdE406A6C2C54145F71`,
    icon: 'https://assets.coingecko.com/coins/images/20924/thumb/Screenshot-2021-11-23-at-00-45-30.png?1637932412',
    iconPath: "crypto_currency/cheems-inu",
    iconType: "png"
  },
  $CLEAR: {
    name: 'Clear Water',
    symbol: "$CLEAR",
    address: "0x09Faf80c7Df27d0Fb8A717324963cB871f6814f7",
    abi: Erc20Abi,
    url: `${url}/0x09Faf80c7Df27d0Fb8A717324963cB871f6814f7`,
    icon: 'https://assets.coingecko.com/coins/images/23798/thumb/attachment.png?1646034809',
    iconPath: "crypto_currency/clear-water",
    iconType: "png"
  },
  $CODI: {
    name: 'Coin Discovery',
    symbol: "$CODI",
    address: "0x4AC32178097c1f62beadCC2D215B54D6915013ee",
    abi: Erc20Abi,
    url: `${url}/0x4AC32178097c1f62beadCC2D215B54D6915013ee`,
    icon: 'https://assets.coingecko.com/coins/images/18839/thumb/IdvWAhot_400x400.jpg?1633572605',
    iconPath: "crypto_currency/coin-discovery",
    iconType: "png"
  },
  $COPTER: {
    name: 'Helicopter Finance',
    symbol: "$COPTER",
    address: "0xBC12aD556581ff7162E595E5956F5F3845FDB38c",
    abi: Erc20Abi,
    url: `${url}/0xBC12aD556581ff7162E595E5956F5F3845FDB38c`,
    icon: 'https://assets.coingecko.com/coins/images/15217/thumb/att1YJDb_400x400.jpg?1620115502',
    iconPath: "crypto_currency/helicopter-finance",
    iconType: "png"
  },
  $CRDN: {
    name: 'Cardence',
    symbol: "$CRDN",
    address: "0xFa17b330bCC4e7F3E2456996d89A5a54AB044831",
    abi: Erc20Abi,
    url: `${url}/0xFa17b330bCC4e7F3E2456996d89A5a54AB044831`,
    icon: 'https://assets.coingecko.com/coins/images/17744/thumb/logo_-_2021-08-17T084037.897.png?1629160880',
    iconPath: "crypto_currency/cardence",
    iconType: "png"
  },
  $CUFFIES: {
    name: 'Cuffies',
    symbol: "$CUFFIES",
    address: "0x5A4b1e06a6FC1f0BA58097FB481Db295C4989B3a",
    abi: Erc20Abi,
    url: `${url}/0x5A4b1e06a6FC1f0BA58097FB481Db295C4989B3a`,
    icon: 'https://assets.coingecko.com/coins/images/23423/thumb/Untitled-200-x-200-px.png?1644200822',
    iconPath: "crypto_currency/cuffies",
    iconType: "png"
  },
  $DBET: {
    name: 'DefiBet',
    symbol: "$DBET",
    address: "0x67654acD0fA49f98c2A9a6a6135D0CCB88836A85",
    abi: Erc20Abi,
    url: `${url}/0x67654acD0fA49f98c2A9a6a6135D0CCB88836A85`,
    icon: 'https://assets.coingecko.com/coins/images/23125/thumb/R4y30VWE_400x400.jpg?1643268068',
    iconPath: "crypto_currency/defi-bet",
    iconType: "png"
  },
}