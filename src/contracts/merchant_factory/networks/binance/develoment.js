import { NETWORKS } from '@/constants'

export default {
  premain: {
    chainId: NETWORKS[56].chainId,
    address: '0xd697eD2223a4363E3c252a5A1f9F69f7EeE0CC9B'
  },
  development: {
    chainId: NETWORKS[97].chainId,
    address: '0xe31C1213CA3D1e006714aA424660114BD441C625'
  }
}