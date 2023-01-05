import { NETWORKS } from '@/constants'

export default {
  ethereum: {
    name: NETWORKS[5].name,
    alias: NETWORKS[5].alias,
    chainId: NETWORKS[5].chainId,
    rpcUrl: NETWORKS[5].rpcUrl,
    scanUrl: NETWORKS[5].scanUrl,
    icon: require('@/assets/images/network/ethereum.svg'),
    iconPath: 'network-ethereum'
  },
  bsc: {
    name: NETWORKS[97].name,
    alias: NETWORKS[97].alias,
    chainId: NETWORKS[97].chainId,
    rpcUrl: NETWORKS[97].rpcUrl,
    scanUrl: NETWORKS[97].scanUrl,
    icon: require('@/assets/images/network/binance.svg'),
    iconPath: 'network-binance'
  },
  matic: {
    name: NETWORKS[80001].name,
    alias: NETWORKS[80001].alias,
    chainId: NETWORKS[80001].chainId,
    rpcUrl: NETWORKS[80001].rpcUrl,
    scanUrl: NETWORKS[80001].scanUrl,
    icon: require('@/assets/images/network/matic.svg'),
    iconPath: 'network-matic'
  },
  avalanche: {
    name: NETWORKS[43113].name,
    alias: NETWORKS[43113].alias,
    chainId: NETWORKS[43113].chainId,
    rpcUrl: NETWORKS[43113].rpcUrl,
    scanUrl: NETWORKS[43113].scanUrl,
    icon: require('@/assets/images/network/avalanche.svg'),
    iconPath: 'network-avalanche'
  },
  doge: {
    name: NETWORKS[568].name,
    alias: NETWORKS[568].alias,
    chainId: NETWORKS[568].chainId,
    rpcUrl: NETWORKS[568].rpcUrl,
    scanUrl: NETWORKS[568].scanUrl,
    icon: require('@/assets/images/network/doge.svg'),
    iconPath: 'network-doge'
  },
  astr: {
    name: NETWORKS[81].name,
    alias: NETWORKS[81].alias,
    chainId: NETWORKS[81].chainId,
    rpcUrl: NETWORKS[81].rpcUrl,
    scanUrl: NETWORKS[81].scanUrl,
    icon: require('@/assets/images/network/astar.svg'),
    iconPath: 'network-doge'
  }
}
