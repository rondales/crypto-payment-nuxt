import Production from './production'
import Development from './develoment'

let contract
const environment = process.env.NODE_ENV.toLowerCase()
const isUseMainnet = JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
const isTestEnv = JSON.parse(process.env.VUE_APP_IS_TEST_ENV.toLowerCase())

if(isUseMainnet && !isTestEnv) {
  contract = Production.mainnet
} else if(isUseMainnet && isTestEnv) {
  contract = Development.premain
} else if(environment === 'production' && !isUseMainnet) {
  contract = Production.testnet
} else {
  contract = Development.development
}

export default {
  chainId: contract.chainId,
  address: contract.address
}