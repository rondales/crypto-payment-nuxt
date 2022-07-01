export const NETWORKS = {
  1: {
    name: 'Ethereum Mainnet',
    alias: 'Ethereum',
    symbol: 'ETH',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    scanUrl: 'https://etherscan.io',
    icon: require('@/assets/images/network/ethereum.svg'),
    type: 2
  },
  5: {
    name: 'Ethereum Goerli',
    alias: 'Ethereum',
    symbol: 'ETH',
    chainId: 5,
    rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    scanUrl: 'https://goerli.etherscan.io',
    icon: require('@/assets/images/network/ethereum.svg'),
    type: null
  },
  56: {
    name: 'BNB Chain Mainnet',
    alias: 'BNB',
    symbol: 'BNB',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    scanUrl: 'https://bscscan.com',
    icon: require('@/assets/images/network/binance.svg'),
    type: 1
  },
  97: {
    name: 'BNB Chain Testnet',
    alias: 'BNB',
    symbol: 'BNB',
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    scanUrl: 'https://testnet.bscscan.com',
    icon: require('@/assets/images/network/binance.svg'),
    type: null
  },
  137: {
    name: 'Matic Mainnet(Polygon)',
    alias: 'Matic',
    symbol: 'MATIC',
    chainId: 137,
    rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
    scanUrl: 'https://polygonscan.com',
    icon: require('@/assets/images/network/matic.svg'),
    type: null
  },
  80001: {
    name: 'Matic Testnet(Polygon)',
    alias: 'Matic',
    symbol: 'MATIC',
    chainId: 80001,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    scanUrl: 'https://mumbai.polygonscan.com',
    icon: require('@/assets/images/network/matic.svg'),
    type: null
  },
  43114: {
    name: 'Avalanche Mainnet C-Chain',
    alias: 'Avalanche',
    symbol: 'AVAX',
    chainId: 43114,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    scanUrl: 'https://snowtrace.io',
    icon: require('@/assets/images/network/avalanche.svg'),
    type: null
  },
  43113: {
    name: 'Avalanche FUJI C-Chain',
    alias: 'Avalanche',
    symbol: 'AVAX',
    chainId: 43113,
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    scanUrl: 'https://testnet.snowtrace.io',
    icon: require('@/assets/images/network/avalanche.svg'),
    type: null
  }
}