import development from './development'
import mainnet from './mainnet'
import premain from './premain'
import testnet from './testnet'
import { PRODUCTION } from '@/constants'

const environment = process.env.NODE_ENV.toLowerCase()
const isUseMainnet = JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
const isPremainEnv = JSON.parse(process.env.VUE_APP_IS_PREMAIN_ENV.toLowerCase())

let abi = development
if(isUseMainnet && !isPremainEnv) {
  abi = mainnet
} else if (isUseMainnet && isPremainEnv) {
  abi = premain
} else if (environment === PRODUCTION)  {
  abi = testnet
}

export default abi