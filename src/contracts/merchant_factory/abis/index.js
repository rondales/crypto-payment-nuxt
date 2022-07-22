import development from './development'
import mainnet from './mainnet'
import testnet from './testnet'
import { PRODUCTION } from '@/constants'

const environment = process.env.NODE_ENV.toLowerCase()
const isUseMainnet = JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())

let abi = development
if(isUseMainnet) {
  abi = mainnet
} else if(environment === PRODUCTION) {
  abi = testnet
}

export default abi