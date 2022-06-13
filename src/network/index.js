import developmentNetworks from './environments/development'
import productionNetworks from './environments/production'

const isUseMainnet = JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
const networks = isUseMainnet ? productionNetworks : developmentNetworks

export default networks