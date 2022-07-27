import { NETWORKS } from '@/constants'

export default {
  mainnet: {
    chainId: NETWORKS[137].chainId,
    address: '0xCB110fa0D7114Fc8E2FA7c9Da86690341877Eea8'
  },
  testnet: {
    chainId: NETWORKS[80001].chainId,
    address: '0xd6a2daea996A1Cb732942d48Db604fFb072E15d3'
  }
}