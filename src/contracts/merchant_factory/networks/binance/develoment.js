import { NETWORKS } from '@/constants'

export default {
  premain: {
    chainId: NETWORKS[56].chainId,
    // @TODO
    address: ''
  },
  development: {
    chainId: NETWORKS[97].chainId,
    address: '0xe31C1213CA3D1e006714aA424660114BD441C625'
  }
}