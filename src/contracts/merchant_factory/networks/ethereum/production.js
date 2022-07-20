import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[1].chainId,
    address: null
  },
  testnet: {
    chainId: NETWORKS[5].chainId,
    address: '0x6EC7Eb93Af1b0A634dE55e2e3025ad05B1bd6097'
  }
}