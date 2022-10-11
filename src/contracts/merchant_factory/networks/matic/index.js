import Production from './production'
import Development from './develoment'

let contract
const environment = process.env.NODE_ENV.toLowerCase()
const isUseMainnet = JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
const isPremainEnv = JSON.parse(process.env.VUE_APP_IS_PREMAIN_ENV.toLowerCase())

if(isUseMainnet && !isPremainEnv) {
  contract = Production.mainnet
} else if(isUseMainnet && isPremainEnv) {
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