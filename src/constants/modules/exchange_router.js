export const TOKEN_RECEIVE_FLOATING_POINT_EXPONENT = 6
export const SIMPLE_UNISWAP_SDK_CUSTOM_NETWORKS = {
  56: {
    customNetwork: {
      nameNetwork: 'BNB Chain Mainnet',
      // https://www.npmjs.com/package/ethereum-multicall
      multicallContractAddress: '0xC50F4c1E81c873B2204D7eFf7069Ffec6Fbe136D',
      nativeCurrency: {
        name: 'native-currency',
        symbol: 'nc'
      },
      nativeWrappedTokenInfo: {
        chainId: 56,
        contractAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        decimals: 18,
        name: 'Wrapped Token',
        symbol: 'WETH'
      },
      baseTokens: {
        usdt: {
          chainId: 56,
          contractAddress: '0x55d398326f99059ff775485246999027b3197955',
          decimals: 18,
          name: 'USDT',
          symbol: 'USDT'
        },
        usdc: {
          chainId: 56,
          contractAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
          decimals: 18,
          name: 'USDC',
          symbol: 'USDC'
        },
        dai: {
          chainId: 56,
          contractAddress: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
          decimals: 18,
          name: 'DAI',
          symbol: 'DAI'
        },
        // use key for BUSD
        wbtc: {
          chainId: 56,
          contractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          decimals: 18,
          name: 'BUSD',
          symbol: 'BUSD'
        }
      }
    }
  },
  97: {
    customNetwork: {
      nameNetwork: 'BNB Chain Testnet',
      // https://www.npmjs.com/package/ethereum-multicall
      multicallContractAddress: '0x73CCde5acdb9980f54BcCc0483B28B8b4a537b4A',
      nativeCurrency: {
        name: 'native-currency',
        symbol: 'nc'
      },
      nativeWrappedTokenInfo: {
        chainId: 97,
        contractAddress: '0x094616f0bdfb0b526bd735bf66eca0ad254ca81f',
        decimals: 18,
        name: 'Wrapped Token',
        symbol: 'WETH'
      }
    }
  },
  137: {
    customNetwork: {
      nameNetwork: 'Matic Mainnet(Polygon)',
      multicallContractAddress: '0x275617327c958bD06b5D6b871E7f491D76113dd8',
      nativeCurrency: {
        name: 'native-currency',
        symbol: 'nc'
      },
      nativeWrappedTokenInfo: {
        chainId: 137,
        contractAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        decimals: 18,
        name: 'Wrapped Token',
        symbol: 'WETH'
      },
      baseTokens: {
        usdt: {
          chainId: 137,
          contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
          decimals: 18,
          name: 'USDT',
          symbol: 'USDT'
        },
        usdc: {
          chainId: 137,
          contractAddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
          decimals: 18,
          name: 'USDC',
          symbol: 'USDC'
        },
        dai: {
          chainId: 137,
          contractAddress: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
          decimals: 18,
          name: 'DAI',
          symbol: 'DAI'
        },
        // use key for BUSD
        wbtc: {
          chainId: 137,
          contractAddress: '0x9C9e5fD8bbc25984B178FdCE6117Defa39d2db39',
          decimals: 18,
          name: 'BUSD',
          symbol: 'BUSD'
        }
      }
    }
  },
  80001: {
    customNetwork: {
      nameNetwork: 'Matic Testnet(Polygon)',
      // https://www.npmjs.com/package/ethereum-multicall
      multicallContractAddress: '0xe9939e7Ea7D7fb619Ac57f648Da7B1D425832631',
      nativeCurrency: {
        name: 'native-currency',
        symbol: 'nc'
      },
      nativeWrappedTokenInfo: {
        chainId: 80001,
        contractAddress: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
        decimals: 18,
        name: 'Wrapped Token',
        symbol: 'WETH'
      }
    }
  },
  43114: {
    customNetwork: {
      nameNetwork: 'Avalanche Mainnet C-Chain',
      // https://www.npmjs.com/package/ethereum-multicall
      multicallContractAddress: '0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4',
      nativeCurrency: {
        name: 'native-currency',
        symbol: 'nc'
      },
      nativeWrappedTokenInfo: {
        chainId: 43114,
        contractAddress: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
        decimals: 18,
        name: 'Wrapped Token',
        symbol: 'WETH'
      },
      baseTokens: {
        usdt: {
          chainId: 43114,
          contractAddress: '0xc7198437980c041c805a1edcba50c1ce5db95118',
          decimals: 18,
          name: 'USDT',
          symbol: 'USDT.e'
        },
        usdc: {
          chainId: 43114,
          contractAddress: '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
          decimals: 18,
          name: 'USDC',
          symbol: 'USDC.e'
        },
        dai: {
          chainId: 43114,
          contractAddress: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
          decimals: 18,
          name: 'DAI',
          symbol: 'DAI.e'
        },
        // use key for BUSD
        wbtc: {
          chainId: 43114,
          contractAddress: '0x19860ccb0a68fd4213ab9d8266f7bbf05a8dde98',
          decimals: 18,
          name: 'BUSD',
          symbol: 'BUSD.e'
        }
      }
    }
  },
  43113: {
    customNetwork: {
      nameNetwork: 'Avalanche FUJI C-Chain',
      // https://www.npmjs.com/package/ethereum-multicall
      multicallContractAddress: '0x3D015943d2780fE97FE3f69C97edA2CCC094f78c',
      nativeCurrency: {
        name: 'native-currency',
        symbol: 'nc'
      },
      nativeWrappedTokenInfo: {
        chainId: 43113,
        contractAddress: '0x1d308089a2d1ced3f1ce36b1fcaf815b07217be3',
        decimals: 18,
        name: 'Wrapped Token',
        symbol: 'WETH'
      }
    }
  },
  568: {
    customNetwork: {
      nameNetwork: 'Dogechain Testnet',
      multicallContractAddress: '0x0C978b9E4D94698df101092d8616E05b4D10069d',
      nativeCurrency: {
        name: 'native-currency',
        symbol: 'nc'
      },
      nativeWrappedTokenInfo: {
        chainId: 568,
        contractAddress: '0x1d308089a2d1ced3f1ce36b1fcaf815b07217be3',
        decimals: 18,
        name: 'Wrapped Token',
        symbol: 'WETH'
      },
      baseTokens: {
        usdt: {
          chainId: 568,
          contractAddress: '0xebca682b6C15d539284432eDc5b960771F0009e8',
          decimals: 6,
          name: 'USDT',
          symbol: 'USDT'
        }
      }
    }
  },
  2000: {
    customNetwork: {
      nameNetwork: 'Dogechain Mainnet',
      multicallContractAddress: '0xF38fFE881d0b1DE39ef7a661F40841C0A5Bd7D3c',
      nativeCurrency: {
        name: 'native-currency',
        symbol: 'nc'
      },
      nativeWrappedTokenInfo: {
        chainId: 2000,
        contractAddress: '0xb7ddc6414bf4f5515b52d8bdd69973ae205ff101',
        decimals: 18,
        name: 'Wrapped WDoge',
        symbol: 'WWDOGE'
      },
      baseTokens: {
        usdt: {
          chainId: 2000,
          contractAddress: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
          decimals: 6,
          name: 'USDT',
          symbol: 'USDT'
        },
        usdc: {
          chainId: 2000,
          contractAddress: '0x765277eebeca2e31912c9946eae1021199b39c61',
          decimals: 6,
          name: 'USDC',
          symbol: 'USDC'
        }
      }
    }
  }
}
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
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
          pairAddress: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
          routerAddress: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'
        }
      }
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
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          pairAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
        }
      }
    }
  },
  56: {
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          pairAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
        }
      }
    },
    pancakeswap: {
      address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
          pairAddress: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
          routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
        }
      }
    },
    biswap: {
      address: '0x3a6d8ca21d1cf76f653a67577fa0d27453350dd8',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
          pairAddress: '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
          routerAddress: '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8'
        }
      }
    }
  },
  97: {
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          pairAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
        }
      }
    },
    pancakeswap: {
      address: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xb7926c0430afb07aa7defde6da862ae0bde767bc',
          pairAddress: '0xb7926c0430afb07aa7defde6da862ae0bde767bc',
          routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'
        }
      }
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
          routerAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564'
        }
      }
    },
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          pairAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
        }
      }
    },
    quickswap: {
      address: '0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
          pairAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
          routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
        }
      }
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
          routerAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564'
        }
      }
    },
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          pairAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
        }
      }
    },
    quickswap: {
      address: '0x8954AfA98594b838bda56FE4C12a09D7739D179b',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
          pairAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
          routerAddress: '0x8954AfA98594b838bda56FE4C12a09D7739D179b'
        }
      }
    }
  },
  43114: {
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          pairAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
        }
      }
    },
    pangolin: {
      address: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
      flag: '0x20',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xefa94DE7a4656D787667C749f7E1223D71E9FD88',
          pairAddress: '0xefa94DE7a4656D787667C749f7E1223D71E9FD88',
          routerAddress: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106'
        }
      }
    },
    traderjoe: {
      address: '0x60ae616a2155ee3d9a68541ba4544862310933d4',
      flag: '0x20',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10',
          pairAddress: '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10',
          routerAddress: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4'
        }
      }
    }
  },
  43113: {
    sushiswap: {
      address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          pairAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
          routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
        }
      }
    },
    pangolin: {
      address: '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921',
      flag: '0x20',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xE4A575550C2b460d2307b82dCd7aFe84AD1484dd',
          pairAddress: '0xE4A575550C2b460d2307b82dCd7aFe84AD1484dd',
          routerAddress: '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921'
        }
      }
    },
    traderjoe: {
      address: '0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901',
      flag: '0x20',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xF5c7d9733e5f53abCC1695820c4818C59B457C2C',
          pairAddress: '0xF5c7d9733e5f53abCC1695820c4818C59B457C2C',
          routerAddress: '0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901'
        }
      }
    }
  },
  568: {
    dogeswap: {
      address: '0xf78CB981272840292a1275224aF55C917d106983',
      flag: '0x21',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0x3d82cf3c8b34e13314a66645a97749910a0627b3',
          pairAddress: '0x3d82cf3c8b34e13314a66645a97749910a0627b3',
          routerAddress: '0xf78CB981272840292a1275224aF55C917d106983'
        }
      }
    }
  },
  2000: {
    kibbleswap: {
      address: '0x6258c967337D3faF0C2ba3ADAe5656bA95419d5f',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xf4bc79d32a7defd87c8a9c100fd83206bbf19af5',
          pairAddress: '0xf4bc79d32a7defd87c8a9c100fd83206bbf19af5',
          routerAddress: '0x6258c967337D3faF0C2ba3ADAe5656bA95419d5f'
        }
      }
    },
    yodedex: {
      address: '0x72d85Ab47fBfc5E7E04a8bcfCa1601D8f8cE1a50',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xaaa04462e35f3e40d798331657ca015169e005d7',
          pairAddress: '0xaaa04462e35f3e40d798331657ca015169e005d7',
          routerAddress: '0x72d85Ab47fBfc5E7E04a8bcfCa1601D8f8cE1a50'
        }
      }
    },
    dogeswap: {
      address: '0xa4EE06Ce40cb7e8c04E127c1F7D3dFB7F7039C81',
      flag: '0x01',
      cloneUniswapContractDetails: {
        v2Override: {
          factoryAddress: '0xd27d9d61590874bf9ee2a19b27e265399929c9c3',
          pairAddress: '0xd27d9d61590874bf9ee2a19b27e265399929c9c3',
          routerAddress: '0xa4EE06Ce40cb7e8c04E127c1F7D3dFB7F7039C81'
        }
      }
    },
  }
}
