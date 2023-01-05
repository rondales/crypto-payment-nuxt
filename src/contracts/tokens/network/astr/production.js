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
    icon: require('https://app.arthswap.org/images/coins/0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678.png'),
    iconPath: 'crypto_currency/arsw',
    iconType: 'png'
  },
  DOT: {
    name: 'Polkadot',
    symbol: 'DOT',
    address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
    abi: Erc20Abi,
    url: `${url}/0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF`,
    icon: require('https://app.arthswap.org/images/coins/0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF.png'),
    iconPath: 'crypto_currency/dot',
    iconType: 'png'
  },
  GLMR: {
    name: 'Moonbeam',
    symbol: 'GLMR',
    address: '0xfffFFfFF00000000000000010000000000000003',
    abi: Erc20Abi,
    url: `${url}/0xfffFFfFF00000000000000010000000000000003`,
    icon: require('https://app.arthswap.org/images/coins/0xfffFFfFF00000000000000010000000000000003.png'),
    iconPath: 'crypto_currency/glmr',
    iconType: 'png'
  }
}
