import { PRODUCTION } from '@/constants'
import MainnetTokens from './production'
import TestnetTokens from './development'

const tokens =
  process.env.NODE_ENV === PRODUCTION ? MainnetTokens : TestnetTokens

export default tokens

