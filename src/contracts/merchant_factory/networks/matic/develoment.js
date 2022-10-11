import { NETWORKS } from '@/constants'

export default {
  premain: {
    chainId: NETWORKS[137].chainId,
    address: '0xd697eD2223a4363E3c252a5A1f9F69f7EeE0CC9B'
  },
  development: {
    chainId: NETWORKS[80001].chainId,
    address: '0xA97357A1718017765b1A8627d8e589167F2d7e10'
  }
}