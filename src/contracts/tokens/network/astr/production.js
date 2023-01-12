import { NETWORKS } from '@/constants'
import Usdt from '../../abis/matic/usdt'
import Usdc from '../../abis/matic/usdc'
import Erc20Abi from 'erc-20-abi'

const url = NETWORKS[592].scanUrl + '/token'

export default {
  ASTR: {
    name: 'Astar',
    symbol: 'ASTR',
    address: null,
    abi: null,
    url: null,
    icon: require('@/assets/images/symbol/astr.svg'),
    iconPath: 'crypto_currency/astr',
    iconType: 'png'
  },
  WASTR: {
    name: 'Wrapped ASTAR',
    symbol: 'WASTR',
    address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    abi: Erc20Abi,
    url: `${url}/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720`,
    icon: require('@/assets/images/symbol/wastr.svg'),
    iconPath: 'crypto_currency/wastr',
    iconType: 'png'
  },
  DAI: {
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    address: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
    abi: Erc20Abi,
    url: `${url}/0x6De33698e9e9b787e09d3Bd7771ef63557E148bb`,
    icon:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    iconPath: 'crypto_currency/dai',
    iconType: 'png'
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    abi: Usdc.abi,
    url: `${url}/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98`,
    icon: require('@/assets/images/symbol/usdc.svg'),
    iconPath: 'crypto_currency/usdc',
    iconType: 'png'
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
    abi: Usdt.abi,
    url: `${url}/0x3795C36e7D12A8c252A20C5a7B455f7c57b60283`,
    icon: require('@/assets/images/symbol/usdt.svg'),
    iconPath: 'crypto_currency/usdt',
    iconType: 'png'
  },
  ARSW: {
    name: 'ArthSwap',
    symbol: 'ARSW',
    address: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
    abi: Erc20Abi,
    url: `${url}/0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678`,
    icon: require('@/assets/images/icon/crypto_currency/arsw.png'),
    iconPath: 'crypto_currency/arsw',
    iconType: 'png'
  },
  DOT: {
    name: 'Polkadot',
    symbol: 'DOT',
    address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
    abi: Erc20Abi,
    url: `${url}/0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF`,
    icon: require('@/assets/images/icon/crypto_currency/dot.png'),
    iconPath: 'crypto_currency/dot',
    iconType: 'png'
  },
  GLMR: {
    name: 'Moonbeam',
    symbol: 'GLMR',
    address: '0xfffFFfFF00000000000000010000000000000003',
    abi: Erc20Abi,
    url: `${url}/0xfffFFfFF00000000000000010000000000000003`,
    icon: require('@/assets/images/icon/crypto_currency/glmr.png'),
    iconPath: 'crypto_currency/glmr',
    iconType: 'png'
  },
  ACA: {
    name: 'Acala',
    symbol: 'ACA',
    address: '0xfFFfFFfF00000000000000010000000000000000',
    abi: Erc20Abi,
    url: `${url}/0xfFFfFFfF00000000000000010000000000000000`,
    icon: require('@/assets/images/icon/crypto_currency/aca.png'),
    iconPath: 'crypto_currency/aca',
    iconType: 'png'
  },
  ATID: {
    name: 'AstridDAO',
    symbol: 'ATID',
    address: '0x5271D85CE4241b310C0B34b7C2f1f036686A6d7C',
    abi: Erc20Abi,
    url: `${url}/0x5271D85CE4241b310C0B34b7C2f1f036686A6d7C`,
    icon: require('@/assets/images/icon/crypto_currency/atid.png'),
    iconPath: 'crypto_currency/atid',
    iconType: 'png'
  },
  aUSD: {
    name: 'Acala Dollar',
    symbol: 'aUSD',
    address: '0xfFFFFfFF00000000000000010000000000000001',
    abi: Erc20Abi,
    url: `${url}/0xfFFFFfFF00000000000000010000000000000001`,
    icon: require('@/assets/images/icon/crypto_currency/ausd.png'),
    iconPath: 'crypto_currency/ausd',
    iconType: 'png'
  },
  BAI: {
    name: 'Bai Stablecoin',
    symbol: 'BAI',
    address: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
    abi: Erc20Abi,
    url: `${url}/0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35`,
    icon: require('@/assets/images/icon/crypto_currency/bai.png'),
    iconPath: 'crypto_currency/bai',
    iconType: 'png'
  },
  BUSD: {
    name: 'Binance USD',
    symbol: 'BUSD',
    address: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
    abi: Erc20Abi,
    url: `${url}/0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E`,
    icon: require('@/assets/images/icon/crypto_currency/busd.png'),
    iconPath: 'crypto_currency/busd',
    iconType: 'png'
  },
  BNB: {
    name: 'Binance Coin',
    symbol: 'BNB',
    address: '0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52',
    abi: Erc20Abi,
    url: `${url}/0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52`,
    icon: require('@/assets/images/icon/crypto_currency/bnb.png'),
    iconPath: 'crypto_currency/bnb',
    iconType: 'png'
  },
  INTR: {
    name: 'Interlay',
    symbol: 'INTR',
    address: '0xffFfffFF00000000000000010000000000000005',
    abi: Erc20Abi,
    url: `${url}/0xffFfffFF00000000000000010000000000000005`,
    icon: require('@/assets/images/icon/crypto_currency/intr.png'),
    iconPath: 'crypto_currency/intr',
    iconType: 'png'
  },
  JPYC: {
    name: 'JPY Coin',
    symbol: 'JPYC',
    address: '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB',
    abi: Erc20Abi,
    url: `${url}/0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB`,
    icon: require('@/assets/images/icon/crypto_currency/jpyc.png'),
    iconPath: 'crypto_currency/jpyc',
    iconType: 'png'
  },
  KGL: {
    name: 'Kagla DAO',
    symbol: 'KGL',
    address: '0x257f1a047948f73158DaDd03eB84b34498bCDc60',
    abi: Erc20Abi,
    url: `${url}/0x257f1a047948f73158DaDd03eB84b34498bCDc60`,
    icon: require('@/assets/images/icon/crypto_currency/kgl.png'),
    iconPath: 'crypto_currency/kgl',
    iconType: 'png'
  },
  LAY: {
    name: 'LAY Token',
    symbol: 'LAY',
    address: '0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd',
    abi: Erc20Abi,
    url: `${url}/0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd`,
    icon: require('@/assets/images/icon/crypto_currency/lay.png'),
    iconPath: 'crypto_currency/lay',
    iconType: 'png'
  },
  MATIC: {
    name: 'Polygon',
    symbol: 'MATIC',
    address: '0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF',
    abi: Erc20Abi,
    url: `${url}/0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF`,
    icon: require('@/assets/images/icon/crypto_currency/matic.png'),
    iconPath: 'crypto_currency/matic',
    iconType: 'png'
  },
  MUUU: {
    name: 'Muuu Finance',
    symbol: 'MUUU',
    address: '0xc5BcAC31cf55806646017395AD119aF2441Aee37',
    abi: Erc20Abi,
    url: `${url}/0xc5BcAC31cf55806646017395AD119aF2441Aee37`,
    icon: require('@/assets/images/icon/crypto_currency/muuu.png'),
    iconPath: 'crypto_currency/muuu',
    iconType: 'png'
  },
  nASTR: {
    name: 'nASTR',
    symbol: 'nASTR',
    address: '0xE511ED88575C57767BAfb72BfD10775413E3F2b0',
    abi: Erc20Abi,
    url: `${url}/0xE511ED88575C57767BAfb72BfD10775413E3F2b0`,
    icon: require('@/assets/images/icon/crypto_currency/nastr.png'),
    iconPath: 'crypto_currency/nastr',
    iconType: 'png'
  },
  NIKA: {
    name: 'Alnair Finance',
    symbol: 'NIKA',
    address: '0x6Df98E5fBfF3041105cB986B9D44c572a43Fcd22',
    abi: Erc20Abi,
    url: `${url}/0x6Df98E5fBfF3041105cB986B9D44c572a43Fcd22`,
    icon: require('@/assets/images/icon/crypto_currency/nika.png'),
    iconPath: 'crypto_currency/nika',
    iconType: 'png'
  },
  ORU: {
    name: 'Orcus Finance',
    symbol: 'ORU',
    address: '0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F',
    abi: Erc20Abi,
    url: `${url}/0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F`,
    icon: require('@/assets/images/icon/crypto_currency/oru.png'),
    iconPath: 'crypto_currency/oru',
    iconType: 'png'
  },
  PKEX: {
    name: 'PolkaEx',
    symbol: 'PKEX',
    address: '0x1fE622E91e54D6AD00B01917351Ea6081426764A',
    abi: Erc20Abi,
    url: `${url}/0x1fE622E91e54D6AD00B01917351Ea6081426764A`,
    icon: require('@/assets/images/icon/crypto_currency/pkex.png'),
    iconPath: 'crypto_currency/pkex',
    iconType: 'png'
  },
  SRS: {
    name: 'Sirius Finance',
    symbol: 'SRS',
    address: '0x9448610696659de8F72e1831d392214aE1ca4838',
    abi: Erc20Abi,
    url: `${url}/0x9448610696659de8F72e1831d392214aE1ca4838`,
    icon: require('@/assets/images/icon/crypto_currency/srs.png'),
    iconPath: 'crypto_currency/srs',
    iconType: 'png'
  },
  WBTC: {
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    address: '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA',
    abi: Erc20Abi,
    url: `${url}/0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA`,
    icon: require('@/assets/images/icon/crypto_currency/wbtc.png'),
    iconPath: 'crypto_currency/wbtc',
    iconType: 'png'
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'ETH',
    address: '0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c',
    abi: Erc20Abi,
    url: `${url}/0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c`,
    icon: require('@/assets/images/icon/crypto_currency/eth.png'),
    iconPath: 'crypto_currency/eth',
    iconType: 'png'
  },
  ZLK: {
    name: 'Zenlink',
    symbol: 'ZLK',
    address: '0x998082C488e548820F970Df5173bD2061Ce90635',
    abi: Erc20Abi,
    url: `${url}/0x998082C488e548820F970Df5173bD2061Ce90635`,
    icon: require('@/assets/images/icon/crypto_currency/zlk.png'),
    iconPath: 'crypto_currency/zlk',
    iconType: 'png'
  }
}
