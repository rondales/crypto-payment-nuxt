import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[43114].chainId,
    address: null
  },
  testnet: {
    chainId: NETWORKS[43113].chainId,
    address: '0xABd63fABe23558A359b95334764D297d82aee4f9'
  }
}