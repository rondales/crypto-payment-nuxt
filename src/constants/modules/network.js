export const NETWORKS = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    icon: 'h-eth.svg',
    type: 2
  },
  3: {
    name: 'Ropsten',
    symbol: 'ETH',
    chainId: 3,
    rpcUrl: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    icon: 'h-eth.svg',
    type: null
  },
  56: {
    name: 'BSC Mainnet',
    symbol: 'BNB',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    icon: 'h-bsc.svg',
    type: 1
  },
  97: {
    name: 'BSC Testnet',
    symbol: 'BNB',
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    icon: 'h-bsc.svg',
    type: null
  },
  137: {
    name: 'Matic Mainnet',
    symbol: 'MATIC',
    chainId: 137,
    rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
    icon: 'h-matic.svg',
    type: null
  },
  80001: {
    name: 'Matic Testnet',
    symbol: 'MATIC',
    chainId: 80001,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    icon: 'h-matic.svg',
    type: null
  },
  43114: {
    name: 'Avalanche Mainnet(C-Chain)',
    symbol: 'AVAX',
    chainId: 43114,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    icon: 'h-avalanche.svg',
    type: null
  },
  43113: {
    name: 'Avalanche Testnet(C-Chain)',
    symbol: 'AVAX',
    chainId: 43113,
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    icon: 'h-avalanche.svg',
    type: null
  }
}