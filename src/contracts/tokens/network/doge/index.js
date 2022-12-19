import MainnetTokens from './production'
import TestnetTokens from './development'

const isUseMainnet = JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase())
const tokens = isUseMainnet ? MainnetTokens : TestnetTokens

export default tokens
