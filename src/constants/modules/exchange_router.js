export const TOKEN_RECEIVE_FLOATING_POINT_EXPONENT = 6
export const EXCHANGE_ROUTERS = {
  1: {
    uniswapV2: {
      address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      flag: '0x01'
    },
    uniswapV3: {
      address: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      flag: '0x02'
    },
    sushiswap: {
      address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
      flag: '0x01'
    }
  },
  5: {
    uniswapV2: {
      address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      flag: '0x01'
    },
    uniswapV3: {
      address: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      flag: '0x02'
    },
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01'
    }
  },
  56: {
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01'
    },
    pancakeswap: {
      address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      flag: '0x01'
    },
    biswap: {
      address: '0x3a6d8ca21d1cf76f653a67577fa0d27453350dd8',
      flag: '0x01'
    }
  },
  97: {
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01'
    },
    pancakeswap: {
      address: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
      flag: '0x01'
    }
  },
  137: {
    uniswapV3: {
      address: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      flag: '0x02',
      cloneUniswapContractDetails: {
        v3Override: {
          factoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
          quoterAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
          routerAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
        }
      },
      customNetwork: {
        nameNetwork: 'custom',
        multicallContractAddress: '0x275617327c958bD06b5D6b871E7f491D76113dd8',
        nativeCurrency: {
          name: 'native-currency',
          symbol: 'nc',
        },
        nativeWrappedTokenInfo: {
          chainId: 137,
          contractAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
          decimals: 18,
          name: 'Wrapped Token',
          symbol: 'WETH'
        },
      },
    },
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01'
    },
    quickswap: {
      address: '0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff',
      flag: '0x01'
    }
  },
  80001: {
    uniswapV3: {
      address: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      flag: '0x02',
      cloneUniswapContractDetails: {
        v3Override: {
          factoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
          quoterAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
          routerAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
        }
      },
      customNetwork: {
        nameNetwork: 'custom',
        // https://www.npmjs.com/package/ethereum-multicall
        multicallContractAddress: '0xe9939e7Ea7D7fb619Ac57f648Da7B1D425832631',
        nativeCurrency: {
          name: 'native-currency',
          symbol: 'nc',
        },
        nativeWrappedTokenInfo: {
          chainId: 80001,
          contractAddress: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
          decimals: 18,
          name: 'Wrapped Token',
          symbol: 'WETH'
        },
      },
    },
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01'
    },
    quickswap: {
      address: '0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff',
      flag: '0x01'
    }
  },
  43114: {
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01'
    },
    pangolin: {
      address: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
      flag: '0x01'
    },
    traderjoe: {
      address: '0x60ae616a2155ee3d9a68541ba4544862310933d4',
      flag: '0x01'
    }
  },
  43113: {
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01'
    },
    pangolin: {
      address: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
      flag: '0x01'
    },
    traderjoe: {
      address: '0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901',
      flag: '0x01'
    }
  }
}
