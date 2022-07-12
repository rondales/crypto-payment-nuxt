import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[137].chainId,
    address: null
  },
  testnet: {
    chainId: NETWORKS[80001].chainId,
    address: '0xd6a2daea996A1Cb732942d48Db604fFb072E15d3'
  }
}