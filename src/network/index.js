import developmentNetworks from './environments/development'
import productionNetworks from './environments/production'
import { PRODUCTION } from '@/constants'

const networks =
  process.env.NODE_ENV === PRODUCTION ? productionNetworks : developmentNetworks

export default networks