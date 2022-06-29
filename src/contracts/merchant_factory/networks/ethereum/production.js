import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[1].chainId,
    address: null
  },
  testnet: {
    chainId: NETWORKS[5].chainId,
    address: '0x7b0afD36918c080AdF13B5f33c0F1Cecbc77dDA0'
  }
}