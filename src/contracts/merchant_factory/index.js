import MerchantFactoryAbi from './abi'
import Ethereum from './networks/ethereum'
import Binance from './networks/binance'
import Matic from './networks/matic'
import Avalanche from './networks/avalanche'

const networks = [
  Ethereum,
  Binance,
  Matic,
  Avalanche
]

let addresses = {}
networks.forEach((network) => {
  addresses[network.chainId] = network.address
})

export default {
  abi: MerchantFactoryAbi.abi,
  addresses: addresses,
}