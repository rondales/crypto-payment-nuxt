import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[43114].chainId,
    address: null
  },
  testnet: {
    chainId: NETWORKS[43113].chainId,
    address: '0x252Cb44dA7c118770D5ea450E2F8Db135188Af64'
  }
}