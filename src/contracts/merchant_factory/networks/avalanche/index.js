import { PRODUCTION } from '@/constants'
import Production from './production'
import Development from './develoment'

const environment =
process.env.NODE_ENV === PRODUCTION ? Production : Development

export default {
  chainId: environment.chainId,
  address: environment.address
}