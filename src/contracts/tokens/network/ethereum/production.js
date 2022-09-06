import { NETWORKS } from '@/constants'
import Usdt from '../../abis/ethereum/usdt'
import Usdc from '../../abis/ethereum/usdc'
import Dai from '../../abis/ethereum/dai'
import Uni from '../../abis/ethereum/uni'
import Sushi from '../../abis/ethereum/sushi'
import Weth from '../../abis/ethereum/weth'
import Erc20Abi from 'erc-20-abi'

const url = NETWORKS[1].scanUrl + '/token'

export default {
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    address: null,
    abi: null,
    url: null,
    icon: require("@/assets/images/symbol/eth.svg"),
    iconPath: "token-eth",
  },
  DAI: {
    name: 'MakerDAO',
    symbol: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    abi: Dai.abi,
    url: `${url}/0x6B175474E89094C44Da98b954EedeAC495271d0F`,
    icon: require('@/assets/images/symbol/dai.svg')
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: Usdc.abi,
    url: `${url}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`,
    icon: require("@/assets/images/symbol/usdc.svg"),
    iconPath: "token-usdc",
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: Usdt.abi,
    url: `${url}/0xdac17f958d2ee523a2206206994597c13d831ec7`,
    icon: require('@/assets/images/symbol/usdt.svg')
  },
  WBTC: {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    abi: Erc20Abi,
    url: `${url}/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png'
  },
  WETH: {
    name: 'Wrapped Ethereum',
    symbol: 'WETH',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    abi: Weth.abi,
    url: `${url}/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`,
    icon: require('@/assets/images/symbol/weth.svg')
  },
  UNI: {
    name: "Uniswap",
    symbol: "UNI",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    abi: Uni.abi,
    url: `${url}/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984`,
    icon: require("@/assets/images/symbol/uni.svg"),
    iconPath: "token-uni",
  },
  SUSHI: {
    name: "SushiSwap",
    symbol: "SUSHI",
    address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    abi: Sushi.abi,
    url: `${url}/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2`,
    icon: require("@/assets/images/symbol/sushi.svg"),
    iconPath: "token-sushi",
  },
  "1INCH": {
    name: '1inch',
    symbol: '1INCH',
    address: '0x111111111117dC0aa78b770fA6A738034120C302',
    abi: Erc20Abi,
    url: `${url}/0x111111111117dC0aa78b770fA6A738034120C302`,
    icon: 'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028'
  },
  AAVE: {
    name: 'Aave',
    symbol: 'AAVE',
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    abi: Erc20Abi,
    url: `${url}/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9`,
    icon: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110'
  },
  ACH: {
    name: 'Alchemy Pay',
    symbol: 'ACH',
    address: '0xEd04915c23f00A313a544955524EB7DBD823143d',
    abi: Erc20Abi,
    url: `${url}/0xEd04915c23f00A313a544955524EB7DBD823143d`,
    icon: 'https://assets.coingecko.com/coins/images/12390/thumb/ACH_%281%29.png?1599691266'
  },
  AERGO: {
    name: 'Aergo',
    symbol: 'AERGO',
    address: '0x91Af0fBB28ABA7E31403Cb457106Ce79397FD4E6',
    abi: Erc20Abi,
    url: `${url}/0x91Af0fBB28ABA7E31403Cb457106Ce79397FD4E6`,
    icon: 'https://assets.coingecko.com/coins/images/4490/thumb/aergo.png?1647696770'
  },
  AGLD: {
    name: 'Adventure Gold',
    symbol: 'AGLD',
    address: '0x32353A6C91143bfd6C7d363B546e62a9A2489A20',
    abi: Erc20Abi,
    url: `${url}/0x32353A6C91143bfd6C7d363B546e62a9A2489A20`,
    icon: 'https://assets.coingecko.com/coins/images/18125/thumb/lpgblc4h_400x400.jpg?1630570955'
  },
  AIOZ: {
    name: 'AIOZ Network',
    symbol: 'AIOZ',
    address: '0x626E8036dEB333b408Be468F951bdB42433cBF18',
    abi: Erc20Abi,
    url: `${url}/0x626E8036dEB333b408Be468F951bdB42433cBF18`,
    icon: 'https://assets.coingecko.com/coins/images/14631/thumb/aioz_logo.png?1617413126'
  },
  ALCX: {
    name: 'Alchemix',
    symbol: 'ALCX',
    address: '0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF',
    abi: Erc20Abi,
    url: `${url}/0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF`,
    icon: 'https://assets.coingecko.com/coins/images/14113/thumb/Alchemix.png?1614409874'
  },
  ALICE: {
    name: 'My Neighbor Alice',
    symbol: 'ALICE',
    address: '0xAC51066d7bEC65Dc4589368da368b212745d63E8',
    abi: Erc20Abi,
    url: `${url}/0xAC51066d7bEC65Dc4589368da368b212745d63E8`,
    icon: 'https://assets.coingecko.com/coins/images/14375/thumb/alice_logo.jpg?1615782968'
  },
  AMP: {
    name: 'Amp',
    symbol: 'AMP',
    address: '0xfF20817765cB7f73d4bde2e66e067E58D11095C2',
    abi: Erc20Abi,
    url: `${url}/0xfF20817765cB7f73d4bde2e66e067E58D11095C2`,
    icon: 'https://assets.coingecko.com/coins/images/12409/thumb/amp-200x200.png?1599625397'
  },
  ANKR: {
    name: 'Ankr',
    symbol: 'ANKR',
    address: '0x8290333ceF9e6D528dD5618Fb97a76f268f3EDD4',
    abi: Erc20Abi,
    url: `${url}/0x8290333ceF9e6D528dD5618Fb97a76f268f3EDD4`,
    icon: 'https://assets.coingecko.com/coins/images/4324/thumb/U85xTl2.png?1608111978'
  },
  ANT: {
    name: 'Aragon Network Token',
    symbol: '1INCH',
    address: '0x960b236A07cf122663c4303350609A66A7B288C0',
    abi: Erc20Abi,
    url: `${url}/0x960b236A07cf122663c4303350609A66A7B288C0`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x960b236A07cf122663c4303350609A66A7B288C0/logo.png'
  },
  APE: {
    name: 'ApeCoin',
    symbol: 'APE',
    address: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
    abi: Erc20Abi,
    url: `${url}/0x4d224452801ACEd8B2F0aebE155379bb5D594381`,
    icon: 'https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1647476455'
  },
  API3: {
    name: 'API3',
    symbol: 'API3',
    address: '0x0b38210ea11411557c13457D4dA7dC6ea731B88a',
    abi: Erc20Abi,
    url: `${url}/0x0b38210ea11411557c13457D4dA7dC6ea731B88a`,
    icon: 'https://assets.coingecko.com/coins/images/13256/thumb/api3.jpg?1606751424'
  },
  ARPA: {
    name: 'ARPA Chain',
    symbol: 'ARPA',
    address: '0xBA50933C268F567BDC86E1aC131BE072C6B0b71a',
    abi: Erc20Abi,
    url: `${url}/0xBA50933C268F567BDC86E1aC131BE072C6B0b71a`,
    icon: 'https://assets.coingecko.com/coins/images/8506/thumb/9u0a23XY_400x400.jpg?1559027357'
  },
  ASH: {
    name: 'ASH',
    symbol: 'ASH',
    address: '0x64D91f12Ece7362F91A6f8E7940Cd55F05060b92',
    abi: Erc20Abi,
    url: `${url}/0x64D91f12Ece7362F91A6f8E7940Cd55F05060b92`,
    icon: 'https://assets.coingecko.com/coins/images/15714/thumb/omnPqaTY.png?1622820503'
  },
  ASM: {
    name: 'Assemble Protocol',
    symbol: 'ASM',
    address: '0x2565ae0385659badCada1031DB704442E1b69982',
    abi: Erc20Abi,
    url: `${url}/0x2565ae0385659badCada1031DB704442E1b69982`,
    icon: 'https://assets.coingecko.com/coins/images/11605/thumb/gpvrlkSq_400x400_%281%29.jpg?1591775789'
  },
  AUCTION: {
    name: 'Bounce',
    symbol: 'AUCTION',
    address: '0xA9B1Eb5908CfC3cdf91F9B8B3a74108598009096',
    abi: Erc20Abi,
    url: `${url}/0xA9B1Eb5908CfC3cdf91F9B8B3a74108598009096`,
    icon: 'https://assets.coingecko.com/coins/images/13860/thumb/1_KtgpRIJzuwfHe0Rl0avP_g.jpeg?1612412025'
  },
  AUDIO: {
    name: 'Audius',
    symbol: 'AUDIO',
    address: '0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998',
    abi: Erc20Abi,
    url: `${url}/0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998`,
    icon: 'https://assets.coingecko.com/coins/images/12913/thumb/AudiusCoinLogo_2x.png?1603425727'
  },
  AVT: {
    name: 'Artverse Token',
    symbol: 'AVT',
    address: '0x845576c64f9754CF09d87e45B720E82F3EeF522C',
    abi: Erc20Abi,
    url: `${url}/0x845576c64f9754CF09d87e45B720E82F3EeF522C`,
    icon: 'https://assets.coingecko.com/coins/images/19727/thumb/ewnektoB_400x400.png?1635767094'
  }
}