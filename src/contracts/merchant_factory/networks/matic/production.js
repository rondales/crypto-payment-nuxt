import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[137].chainId,
    address: '0x29051986AC5C7A8D22B1C2C6C9D774a46A910d24'
  },
  testnet: {
    chainId: NETWORKS[80001].chainId,
    address: '0xe30d69B85e4559315154b7B335bE85C772a5d712'
  }
}