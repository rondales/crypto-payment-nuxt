import { NETWORKS } from '@/constants'

export default {
  premain: {
    chainId: NETWORKS[1].chainId,
    // @TODO
    address: ''
  },
  development: {
    chainId: NETWORKS[5].chainId,
    address: '0xdC423e9DA76515321AB5e101A51c76A4671010Fe'
  }
}