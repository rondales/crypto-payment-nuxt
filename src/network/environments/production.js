import { NETWORKS } from '@/constants'

export default {
  ethereum: { chainId: NETWORKS[1].chainId, rpcUrl: NETWORKS[1].rpcUrl },
  bsc: { chainId: NETWORKS[56].chainId, rpcUrl: NETWORKS[56].rpcUrl },
  matic: { chainId: NETWORKS[137].chainId, rpcUrl: NETWORKS[137].rpcUrl },
  avalanche: { chainId: NETWORKS[43114].chainId, rpcUrl: NETWORKS[43114].rpcUrl }
}