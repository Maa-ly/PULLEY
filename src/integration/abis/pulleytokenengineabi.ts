export const PulleyTokenEngine_Address = "0x4E3Ba7901dBaDc1b5BBf8683100582d88eaEeBD1";

export const pulleytokenengine_abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "pulleyTokenAddress",
          type: "address",
          internalType: "address"
        },
        {
          name: "allowedAssetsList",
          type: "address[]",
          internalType: "address[]"
        },
        {
          name: "_permissionManager",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "allowedAssets",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "allowed",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "assetReserves",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "balance",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "coverTradingLoss",
      inputs: [
        {
          name: "lossAmountUSD",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "distributeProfits",
      inputs: [
        {
          name: "profitAmount",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "getAssetReserve",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "getProvider",
      inputs: [
        {
          name: "provider",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "assetsDeposited",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "pulleyTokensOwned",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "depositTime",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "getReserveBalance",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "getSystemMetrics",
      inputs: [],
      outputs: [
        {
          name: "totalBacking",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "totalLosses",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "reserveRatio",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "providerCount",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "i_pulleyToken",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract IPulleyToken"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "insuranceBackingMinter",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "isAssetAllowed",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "permissionManager",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "provideLiquidity",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "providerList",
      inputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "providers",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "assetsDeposited",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "pulleyTokensOwned",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "depositTime",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "setAssetAllowed",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        },
        {
          name: "allowed",
          type: "bool",
          internalType: "bool"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "totalBackingValue",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "totalInsurancebacking",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "totalLossesCovered",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "withdrawLiquidity",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        },
        {
          name: "pulleyTokensToRedeem",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "event",
      name: "AssetAllowed",
      inputs: [
        {
          name: "asset",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "allowed",
          type: "bool",
          indexed: false,
          internalType: "bool"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "AssetsTransferredForCoverage",
      inputs: [
        {
          name: "asset",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "LiquidityProvided",
      inputs: [
        {
          name: "provider",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "asset",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "pulleyTokensReceived",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "LiquidityWithdrawn",
      inputs: [
        {
          name: "provider",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "asset",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "pulleyTokensBurned",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "ProfitsDistributedToPulleyHolders",
      inputs: [
        {
          name: "profitAmount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "newTotalBackingValue",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "TradingLossCovered",
      inputs: [
        {
          name: "requestor",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "lossAmount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "successful",
          type: "bool",
          indexed: false,
          internalType: "bool"
        }
      ],
      anonymous: false
    },
    {
      type: "error",
      name: "PulleyTokenEngine__InsufficientPulleyTokens",
      inputs: []
    },
    {
      type: "error",
      name: "PulleyTokenEngine__InsufficientReserves",
      inputs: []
    },
    {
      type: "error",
      name: "PulleyTokenEngine__NotAllowedAsset",
      inputs: []
    },
    {
      type: "error",
      name: "PulleyTokenEngine__TransferFailed",
      inputs: []
    },
    {
      type: "error",
      name: "PulleyTokenEngine__ZeroAmount",
      inputs: []
    },
    {
      type: "error",
      name: "ReentrancyGuardReentrantCall",
      inputs: []
    }
  ]
};

export default pulleytokenengine_abi;