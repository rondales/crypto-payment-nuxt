export default {
  abi: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "tokenRecovered",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "AdminTokenRecovery",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "contract IAffiliatePool",
          name: "previousPool",
          type: "address"
        },
        {
          indexed: false,
          internalType: "contract IAffiliatePool",
          name: "newPool",
          type: "address"
        }
      ],
      name: "AffiliatePoolUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "oldWallet",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "newWallet",
          type: "address"
        }
      ],
      name: "AffiliatorWalletUpdatd",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "previousFee",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newFee",
          type: "uint256"
        }
      ],
      name: "DonationFeeUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address payable",
          name: "previousWallet",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address payable",
          name: "newWallet",
          type: "address"
        }
      ],
      name: "DonationWalletUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "previousFee",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newFee",
          type: "uint256"
        }
      ],
      name: "FeeMaxPercentUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "previousFee",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newFee",
          type: "uint256"
        }
      ],
      name: "FeeMinPercentUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "enum Merchant.FeeMethod",
          name: "oldMethod",
          type: "uint8"
        },
        {
          indexed: false,
          internalType: "enum Merchant.FeeMethod",
          name: "newMethod",
          type: "uint8"
        }
      ],
      name: "FeeProcessingMethodUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address payable",
          name: "previousWallet",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address payable",
          name: "newWallet",
          type: "address"
        }
      ],
      name: "MarketingWalletUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address payable",
          name: "previousWallet",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address payable",
          name: "newWallet",
          type: "address"
        }
      ],
      name: "MerchantWalletUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes16",
          name: "txId",
          type: "bytes16"
        },
        {
          indexed: false,
          internalType: "address",
          name: "userAddress",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "payingToken",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timeStamp",
          type: "uint256"
        }
      ],
      name: "NewTransaction",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "router",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "pair",
          type: "address"
        }
      ],
      name: "PancakeRouterUpdated",
      type: "event"
    },
    { anonymous: false, inputs: [], name: "Pause", type: "event" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "contract IStakingContract",
          name: "previousContract",
          type: "address"
        },
        {
          indexed: false,
          internalType: "contract IStakingContract",
          name: "newContract",
          type: "address"
        }
      ],
      name: "StakingContractUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "previousFee",
          type: "uint16"
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "newFee",
          type: "uint16"
        }
      ],
      name: "TransactionFeeUpdated",
      type: "event"
    },
    { anonymous: false, inputs: [], name: "Unpause", type: "event" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "previousBalance",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newBalance",
          type: "uint256"
        }
      ],
      name: "Web3BalanceForFreeTransactionUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "oldToken",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "newToken",
          type: "address"
        }
      ],
      name: "Web3TokenUpdated",
      type: "event"
    },
    {
      inputs: [],
      name: "MAX_TRANSACTION_FEE",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "MERCHANT_FACTORY",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "USDT",
      outputs: [{ internalType: "contract IBEP20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "WEB3_TOKEN",
      outputs: [{ internalType: "contract IBEP20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "affiliatePool",
      outputs: [{ internalType: "contract IAffiliatePool", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "affiliatorWallet",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "donationFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "donationWallet",
      outputs: [{ internalType: "address payable", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "feeMaxPercent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "feeMinPercent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "feeProcessingMethod",
      outputs: [{ internalType: "enum Merchant.FeeMethod", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_payingTokenAddress",
          type: "address"
        },
        { internalType: "uint256", name: "amountOut", type: "uint256" }
      ],
      name: "getAmountIn",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_payingTokenAddress",
          type: "address"
        },
        { internalType: "uint256", name: "amountIn", type: "uint256" }
      ],
      name: "getAmountOut",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_payingTokenAddress",
          type: "address"
        },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "address[]", name: "feePath", type: "address[]" }
      ],
      name: "getFeeAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "bytes16", name: "_txNumber", type: "bytes16" }],
      name: "getTxDetailById",
      outputs: [
        {
          components: [
            { internalType: "bytes16", name: "txId", type: "bytes16" },
            { internalType: "address", name: "userAddress", type: "address" },
            { internalType: "address", name: "payingToken", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "timeStamp", type: "uint256" }
          ],
          internalType: "struct Merchant.TransctionInfo",
          name: "",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_userAddress", type: "address" }
      ],
      name: "getUserAllTxDetails",
      outputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "bytes16[]", name: "", type: "bytes16[]" }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "_userAddress", type: "address" }
      ],
      name: "getUserTxCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "_marketingWallet", type: "address" },
        { internalType: "address", name: "_merchantWallet", type: "address" },
        { internalType: "address", name: "_donationWallet", type: "address" },
        { internalType: "address", name: "_admin", type: "address" }
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "isInitialized",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "marketingWallet",
      outputs: [{ internalType: "address payable", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "merchantWallet",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "minAmountToProcessFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "pancakeV2Router",
      outputs: [
        {
          internalType: "contract IUniswapV2Router02",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "paused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "_tokenAddress", type: "address" },
        { internalType: "uint256", name: "_tokenAmount", type: "uint256" }
      ],
      name: "recoverWrongTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "stakingContract",
      outputs: [
        {
          internalType: "contract IStakingContract",
          name: "",
          type: "address"
        },
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_payingTokenAddress",
          type: "address"
        },
        { internalType: "uint256", name: "_amountIn", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
        { internalType: "address[]", name: "feePath", type: "address[]" }
      ],
      name: "submitTransaction",
      outputs: [{ internalType: "bytes16", name: "txNumber", type: "bytes16" }],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "totalTxCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "transactionFee",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "_userAddress", type: "address" },
        { internalType: "uint256", name: "_offset", type: "uint256" },
        { internalType: "uint256", name: "_length", type: "uint256" }
      ],
      name: "transactionPagination",
      outputs: [
        { internalType: "bytes16[]", name: "_txIds", type: "bytes16[]" }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "_walletAddress", type: "address" },
      ],
      name: "updateAffiliatorWalletAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256", name: "_percent", type: "uint256" }],
      name: "updateDonationFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "_donationWallet",
          type: "address"
        }
      ],
      name: "updateDonationWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "uint256", name: "_maxPercent", type: "uint256" }
      ],
      name: "updateFeeMaxPercent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "uint256", name: "_minPercent", type: "uint256" }
      ],
      name: "updateFeeMinPercent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "enum Merchant.FeeMethod",
          name: "_method",
          type: "uint8"
        }
      ],
      name: "updateFeeProcessingMethod",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "_marketingWallet",
          type: "address"
        }
      ],
      name: "updateMarketingWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "_merchantWallet", type: "address" }
      ],
      name: "updateMerchantWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "_router", type: "address" }],
      name: "updatePancakeRouter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IStakingContract",
          name: "_stakingContract",
          type: "address"
        }
      ],
      name: "updateStakingContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint16", name: "_fee", type: "uint16" }],
      name: "updateTransactionFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "uint256", name: "_web3Balance", type: "uint256" }
      ],
      name: "updateWeb3BalanceForFreeTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "_tokenAddress", type: "address" }
      ],
      name: "updateWeb3TokenAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IAffiliatePool",
          name: "_affiliatePool",
          type: "address"
        }
      ],
      name: "updateaffiliatePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "userTxCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "web3BalanceForFreeTransaction",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "web3BnbPair",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
  ],
}