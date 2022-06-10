export default {
  abi: [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "slashAddressResolver_",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "merchantAddress_",
          "type": "address"
        }
      ],
      "name": "NewMerchantDeployed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "oldResolver_",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newResolver_",
          "type": "address"
        }
      ],
      "name": "SlashAddressResolverUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "_slashAddressResolver",
      "outputs": [
        {
          "internalType": "contract ISlashAddressResolver",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "merchantWallet_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiveToken_",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "reserved_",
          "type": "bytes"
        }
      ],
      "name": "deployMerchant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "merchantWallet_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiveToken_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "slashController_",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "reserved_",
          "type": "bytes"
        }
      ],
      "name": "deployMerchantWithSpecificController",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "slashAddressResolver_",
          "type": "address"
        }
      ],
      "name": "updateAddressResolver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}