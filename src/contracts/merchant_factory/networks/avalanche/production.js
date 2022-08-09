import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[43114].chainId,
    address: '0xCB110fa0D7114Fc8E2FA7c9Da86690341877Eea8'
  },
  testnet: {
    chainId: NETWORKS[43113].chainId,
    address: '0xABd63fABe23558A359b95334764D297d82aee4f9'
  }
}