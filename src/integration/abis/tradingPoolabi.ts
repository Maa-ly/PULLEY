export const TradingPool_Address = "0x2186d551E855A5CAFd80877fd4A2DEEF3C146A9e";

export const tradingPool_abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_pulleyTokenEngine",
          type: "address",
          internalType: "address"
        },
        {
          name: "_supportedAssets",
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
      name: "THRESHOLD",
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
      name: "TRANSFER_THRESHOLD",
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
      name: "assetBalances",
      inputs: [
        {
          name: "",
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
      name: "assetList",
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
      name: "crossChainController",
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
      name: "depositAsset",
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
      name: "distributeProfits",
      inputs: [],
      outputs: [
        {
          name: "pulleyShare",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "poolShare",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "getAssetBalance",
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
      name: "getLossCoverageMetrics",
      inputs: [],
      outputs: [
        {
          name: "totalLosses",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "coveredByPulley",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "currentProfitShare",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "getPendingProfitDistribution",
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
      name: "getPoolMetrics",
      inputs: [],
      outputs: [
        {
          name: "totalValue",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "totalLosses",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "totalProfits",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "getSupportedAssets",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address[]",
          internalType: "address[]"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "getTotalPoolValue",
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
      name: "pendingProfitDistribution",
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
      name: "pulleyTokenEngine",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract IPulleyTokenEngine"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "pulleyTokenProfitShare",
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
      name: "recordTradingLoss",
      inputs: [
        {
          name: "lossAmountUSD",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "recordTradingProfit",
      inputs: [
        {
          name: "profitAmountUSD",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "setCrossChainController",
      inputs: [
        {
          name: "_crossChainController",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "supportedAssets",
      inputs: [
        {
          name: "",
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
      name: "thresHoldCryptographyUseCase",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "totalLossesCoveredByPulley",
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
      name: "totalPoolValue",
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
      name: "totalTradingLosses",
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
      name: "totalTradingProfits",
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
      name: "transferToAssetCollector",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "updateAssetSupport",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        },
        {
          name: "supported",
          type: "bool",
          internalType: "bool"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "updatePulleyTokenEngine",
      inputs: [
        {
          name: "_pulleyTokenEngine",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "updatePulleyTokenProfitShare",
      inputs: [
        {
          name: "newShare",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "withdrawAsset",
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
        },
        {
          name: "recipient",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "event",
      name: "AssetDeposited",
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
      name: "AssetSupportUpdated",
      inputs: [
        {
          name: "asset",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "supported",
          type: "bool",
          indexed: false,
          internalType: "bool"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "AssetTransferredToCollector",
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
        },
        {
          name: "collector",
          type: "address",
          indexed: true,
          internalType: "address"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "AssetWithdrawn",
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
      name: "ProfitsDistributed",
      inputs: [
        {
          name: "totalAmount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "pulleyTokenShare",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "tradingPoolShare",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "PulleyTokenProfitShareUpdated",
      inputs: [
        {
          name: "newShare",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "TradingLossRecorded",
      inputs: [
        {
          name: "lossAmount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "coveredByPulleyToken",
          type: "bool",
          indexed: false,
          internalType: "bool"
        },
        {
          name: "coveredAmount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "TradingProfitRecorded",
      inputs: [
        {
          name: "profitAmount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "error",
      name: "ReentrancyGuardReentrantCall",
      inputs: []
    },
    {
      type: "error",
      name: "TradingPool__InsufficientAssets",
      inputs: []
    },
    {
      type: "error",
      name: "TradingPool__TransferFailed",
      inputs: []
    },
    {
      type: "error",
      name: "TradingPool__UnsupportedAsset",
      inputs: []
    },
    {
      type: "error",
      name: "TradingPool__ZeroAmount",
      inputs: []
    }
  ]
};

export default tradingPool_abi;