import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[137].chainId,
    address: '0x29051986AC5C7A8D22B1C2C6C9D774a46A910d24'
  },
  testnet: {
    chainId: NETWORKS[80001].chainId,
    address: '0xd6a2daea996A1Cb732942d48Db604fFb072E15d3'
  }
}