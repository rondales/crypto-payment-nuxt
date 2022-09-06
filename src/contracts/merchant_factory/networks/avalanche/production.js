import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[43114].chainId,
    address: '0x29051986AC5C7A8D22B1C2C6C9D774a46A910d24'
  },
  testnet: {
    chainId: NETWORKS[43113].chainId,
    address: '0xfC9F098331F95566Fe989504Ba1D6DDB5C6aA77b'
  }
}