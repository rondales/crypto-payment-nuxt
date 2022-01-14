import { NETWORKS } from '@/constants'

export default {
  ropsten: { chainId: NETWORKS[3].chainId, rpcUrl: NETWORKS[3].rpcUrl },
  bsc: { chainId: NETWORKS[97].chainId, rpcUrl: NETWORKS[97].rpcUrl },
  matic: { chainId: NETWORKS[80001].chainId, rpcUrl: NETWORKS[80001].rpcUrl },
  avalanche: { chainId: NETWORKS[43113].chainId, rpcUrl: NETWORKS[43113].rpcUrl }
}