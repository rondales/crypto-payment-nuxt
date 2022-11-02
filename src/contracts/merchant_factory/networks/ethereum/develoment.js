import { NETWORKS } from '@/constants'

export default {
  premain: {
    chainId: NETWORKS[1].chainId,
    address: '0x68445AA29d4537A5FdFa4C25bc9Cf5c24b166196'
  },
  development: {
    chainId: NETWORKS[5].chainId,
    address: '0xdC423e9DA76515321AB5e101A51c76A4671010Fe'
  }
}