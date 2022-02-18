import { NETWORKS } from '@/constants'

export default {
  ethereum: {
    name: NETWORKS[1].name,
    chainId: NETWORKS[1].chainId,
    rpcUrl: NETWORKS[1].rpcUrl,
    icon: require('@/assets/images/network/ethereum.svg')
  },
  bsc: {
    name: NETWORKS[56].name,
    chainId: NETWORKS[56].chainId,
    rpcUrl: NETWORKS[56].rpcUrl,
    icon: require('@/assets/images/network/binance.svg')
  },
  matic: {
    name: NETWORKS[137].name,
    chainId: NETWORKS[137].chainId,
    rpcUrl: NETWORKS[137].rpcUrl,
    icon: require('@/assets/images/network/matic.svg')
  },
  avalanche: {
    name: NETWORKS[43114].name,
    chainId: NETWORKS[43114].chainId,
    rpcUrl: NETWORKS[43114].rpcUrl,
    icon: require('@/assets/images/network/avalanche.svg')
  }
}