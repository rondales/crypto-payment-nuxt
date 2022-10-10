import development from './development'
import mainnet from './mainnet'
import premain from './premain'
import testnet from './testnet'
import { PRODUCTION } from '@/constants'

const environment = process.env.NODE_ENV.toLowerCase()
const isUseMainnet = JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
const isTestEnv = JSON.parse(process.env.VUE_APP_IS_TEST_ENV.toLowerCase())

let abi = development
if(isUseMainnet && !isTestEnv) {
  abi = mainnet
} else if (isUseMainnet && isTestEnv) {
  abi = premain
} else if (environment === PRODUCTION)  {
  abi = testnet
}

export default abi