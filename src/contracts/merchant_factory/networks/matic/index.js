import Production from './production'
import Development from './develoment'

let contract
const environment = process.env.NODE_ENV.toLowerCase()
const isUseMainnet = JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
if(isUseMainnet) {
  contract = Production.mainnet
} else if(environment === 'production' && !isUseMainnet) {
  contract = Production.testnet
} else {
  contract = Development
}


export default {
  chainId: contract.chainId,
  address: contract.address
}