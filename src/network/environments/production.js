import { NETWORKS } from '@/constants'

export default {
  ethereum: {
    name: NETWORKS[1].name,
    alias: NETWORKS[1].alias,
    chainId: NETWORKS[1].chainId,
    rpcUrl: NETWORKS[1].rpcUrl,
    scanUrl: NETWORKS[1].scanUrl,
    icon: require('@/assets/images/network/ethereum.svg'),
    iconPath: 'network-ethereum'
  },
  bsc: {
    name: NETWORKS[56].name,
    alias: NETWORKS[56].alias,
    chainId: NETWORKS[56].chainId,
    rpcUrl: NETWORKS[56].rpcUrl,
    scanUrl: NETWORKS[56].scanUrl,
    icon: require('@/assets/images/network/binance.svg'),
    iconPath: 'network-binance'
  },
  matic: {
    name: NETWORKS[137].name,
    alias: NETWORKS[137].alias,
    chainId: NETWORKS[137].chainId,
    rpcUrl: NETWORKS[137].rpcUrl,
    scanUrl: NETWORKS[137].scanUrl,
    icon: require('@/assets/images/network/matic.svg'),
    iconPath: 'network-matic'
  },
  avalanche: {
    name: NETWORKS[43114].name,
    alias: NETWORKS[43114].alias,
    chainId: NETWORKS[43114].chainId,
    rpcUrl: NETWORKS[43114].rpcUrl,
    scanUrl: NETWORKS[43114].scanUrl,
    icon: require('@/assets/images/network/avalanche.svg'),
    iconPath: 'network-avalanche'
  }
}