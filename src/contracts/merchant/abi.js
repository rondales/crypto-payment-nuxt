export default {
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "etherAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "AddLiquidityFailed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes16",
          name: "txId",
          type: "bytes16",
        },
        {
          indexed: false,
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "payingToken",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "receiveToken",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountOut",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timeStamp",
          type: "uint256",
        },
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
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [],
      name: "Pause",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "etherAmount",
          type: "uint256",
        },
      ],
      name: "SwapEtherToWeb3TokenFailed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [],
      name: "Unpause",
      type: "event",
    },
    {
      inputs: [],
      name: "MAX_TRANSACTION_FEE",
      outputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_totalTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "_userTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "exchange_",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "flag_",
          type: "uint256",
        },
      ],
      name: "addExchange",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum MerchantProperty.Property",
          name: "property_",
          type: "uint8",
        },
      ],
      name: "disableSpecificProp",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token_",
          type: "address",
        },
      ],
      name: "excludeFromPayTokenBlacklist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token_",
          type: "address",
        },
      ],
      name: "excludeFromRecTokenWhitelist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "payingToken_",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amountOut_",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "path_",
          type: "address[]",
        },
        {
          internalType: "bytes",
          name: "reserved_",
          type: "bytes",
        },
      ],
      name: "getAmountIn",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "payingToken_",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amountIn_",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "path_",
          type: "address[]",
        },
        {
          internalType: "bytes",
          name: "reserved_",
          type: "bytes",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut_",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "feePath_",
          type: "address[]",
        },
        {
          internalType: "bytes",
          name: "reserved_",
          type: "bytes",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "bytes16",
          name: "txNumber_",
          type: "bytes16",
        },
      ],
      name: "getTxDetailById",
      outputs: [
        {
          components: [
            {
              internalType: "bytes16",
              name: "txId",
              type: "bytes16",
            },
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "payingToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "receiveToken",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amountIn",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amountOut",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timeStamp",
              type: "uint256",
            },
          ],
          internalType: "struct Merchant.TransctionInfo",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_slashCore",
      outputs: [
        { internalType: "contract ISlashCore", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "payingToken_", type: "address" },
        { internalType: "uint256", name: "amountOut_", type: "uint256" },
        { internalType: "address[]", name: "path_", type: "address[]" },
        { internalType: "bytes", name: "reserved_", type: "bytes" },
      ],
      name: "getAmountIn",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "payingToken_", type: "address" },
        { internalType: "uint256", name: "amountIn_", type: "uint256" },
        { internalType: "address[]", name: "path_", type: "address[]" },
        { internalType: "bytes", name: "reserved_", type: "bytes" },
      ],
      name: "getAmountOut",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account_", type: "address" },
        { internalType: "uint256", name: "amountOut_", type: "uint256" },
        { internalType: "address[]", name: "feePath_", type: "address[]" },
        { internalType: "bytes", name: "reserved_", type: "bytes" },
      ],
      name: "getFeeAmount",
      outputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getSharedProperty",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getSlashCore",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_tokenAddress", type: "address" },
        { internalType: "uint256", name: "_tokenAmount", type: "uint256" },
      ],
      name: "recoverWrongTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index_",
          type: "uint256",
        },
      ],
      name: "removeExchange",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account_", type: "address" },
        { internalType: "address", name: "payingToken_", type: "address" },
        { internalType: "uint256", name: "amountIn_", type: "uint256" },
        {
          internalType: "uint256",
          name: "requiredAmountOut_",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amountIn_",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "requiredAmountOut_",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "path_",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "feePath_",
          type: "address[]",
        },
        {
          internalType: "bytes",
          name: "reserved_",
          type: "bytes",
        },
      ],
      name: "submitTransaction",
      outputs: [
        {
          internalType: "bytes16",
          name: "txNumber",
          type: "bytes16",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharedProperty_", type: "address" },
        { internalType: "address", name: "slashCore_", type: "address" },
      ],
      name: "updateCoreAndSharedProperty",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "affiliatorWallet_",
          type: "address",
        },
      ],
      name: "updateAffiliatorWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "fee_",
          type: "uint16",
        },
      ],
      name: "updateDonationFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "fee_",
          type: "uint256",
        },
      ],
      name: "updateDonationFeeCollected",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "donationWallet_",
          type: "address",
        },
      ],
      name: "updateDonationWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "maxPercent_",
          type: "uint16",
        },
      ],
      name: "updateFeeMaxPercent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "minPercent_",
          type: "uint16",
        },
      ],
      name: "updateFeeMinPercent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "method_",
          type: "uint8",
        },
      ],
      name: "updateFeeProcessingMethod",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "exchange_",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "flag_",
          type: "uint256",
        },
      ],
      name: "updateMainExchange",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "marketingWallet_",
          type: "address",
        },
      ],
      name: "updateMarketingWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "merchantWallet_",
          type: "address",
        },
      ],
      name: "updateMerchantWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "minAmount_",
          type: "uint256",
        },
      ],
      name: "updateMinAmountToProcessFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "slashController_",
          type: "address",
        },
      ],
      name: "updateSlashController",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "stakingPool_",
          type: "address",
        },
      ],
      name: "updateStakingPool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "fee_",
          type: "uint16",
        },
      ],
      name: "updateTransactionFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "web3Balance_",
          type: "uint256",
        },
      ],
      name: "updateWeb3BalanceForFreeTx",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenAddress_",
          type: "address",
        },
      ],
      name: "updateWeb3TokenAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "affiliatePool_",
          type: "address",
        },
      ],
      name: "updateaffiliatePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "viewAffiliatePool",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewAffiliatorWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewDonationFee",
      outputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewDonationFeeCollected",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewDonationWallet",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewExchanges",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewFeeMaxPercent",
      outputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewFeeMinPercent",
      outputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewFeeProcessingMethod",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewMainExchange",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewMarketingWallet",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewMerchantWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewMinAmountToProcessFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewReceiveToken",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewSlashCore",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewStakingPool",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewTransactionFee",
      outputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewWeb3BalanceForFreeTx",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewWeb3Token",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
};
