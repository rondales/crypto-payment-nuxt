import Production from './production'
import Development from './develoment'

const isUseMainnet = JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
const environment = isUseMainnet ? Production : Development

export default {
  chainId: environment.chainId,
  address: environment.address
}