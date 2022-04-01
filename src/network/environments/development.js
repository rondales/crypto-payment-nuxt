import { NETWORKS } from '@/constants'

export default {
  ethereum: {
    name: NETWORKS[3].name,
    alias: NETWORKS[3].alias,
    chainId: NETWORKS[3].chainId,
    rpcUrl: NETWORKS[3].rpcUrl,
    scanUrl: NETWORKS[3].scanUrl,
    icon: require('@/assets/images/network/ethereum.svg')
  },
  bsc: {
    name: NETWORKS[97].name,
    alias: NETWORKS[97].alias,
    chainId: NETWORKS[97].chainId,
    rpcUrl: NETWORKS[97].rpcUrl,
    scanUrl: NETWORKS[97].scanUrl,
    icon: require('@/assets/images/network/binance.svg')
  },
  matic: {
    name: NETWORKS[80001].name,
    alias: NETWORKS[80001].alias,
    chainId: NETWORKS[80001].chainId,
    rpcUrl: NETWORKS[80001].rpcUrl,
    scanUrl: NETWORKS[80001].scanUrl,
    icon: require('@/assets/images/network/matic.svg')
  },
  avalanche: {
    name: NETWORKS[43113].name,
    alias: NETWORKS[43113].alias,
    chainId: NETWORKS[43113].chainId,
    rpcUrl: NETWORKS[43113].rpcUrl,
    scanUrl: NETWORKS[43113].scanUrl,
    icon: require('@/assets/images/network/avalanche.svg')
  }
}