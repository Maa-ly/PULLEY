const AssetswapnBridge_Address = "0x1A80069a0cA012E2512E24c489c9cCcF7812D218";

const assetswapnBridge_abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_kaiaNativeUSDT",
          type: "address",
          internalType: "address"
        },
        {
          name: "_kaiaSwap",
          type: "address",
          internalType: "address payable"
        },
        {
          name: "_permissionManager",
          type: "address",
          internalType: "address"
        },
        {
          name: "_kaiaBridge",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "KAIABRIDGE_ADDRESS",
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
      name: "KAIANATIVE_USDT",
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
      name: "KAIASWAP_ADDRESS",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address payable"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "PERMISSION_MANAGER",
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
      name: "SLIPPAGE_BASE",
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
      name: "SLIPPAGE_TOLERANCE",
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
      name: "batchSwapToUSDT",
      inputs: [
        {
          name: "tokens",
          type: "address[]",
          internalType: "address[]"
        },
        {
          name: "amounts",
          type: "uint256[]",
          internalType: "uint256[]"
        }
      ],
      outputs: [
        {
          name: "totalUSDT",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "bridgeAssetFromChain",
      inputs: [
        {
          name: "srcChainId",
          type: "uint16",
          internalType: "uint16"
        },
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
          name: "minAmountLD",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "extra",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "bridgeUSDTToChain",
      inputs: [
        {
          name: "dstChainId",
          type: "uint16",
          internalType: "uint16"
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "minAmountLD",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "extra",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "emergencyWithdraw",
      inputs: [
        {
          name: "token",
          type: "address",
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "to",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "getQuoteForUSDT",
      inputs: [
        {
          name: "tokenIn",
          type: "address",
          internalType: "address"
        },
        {
          name: "amountIn",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "amountOut",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "swapToUSDT",
      inputs: [
        {
          name: "tokenIn",
          type: "address",
          internalType: "address"
        },
        {
          name: "amountIn",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "amountOut",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "event",
      name: "AssetBridged",
      inputs: [
        {
          name: "srcChainId",
          type: "uint16",
          indexed: true,
          internalType: "uint16"
        },
        {
          name: "user",
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
          name: "timestamp",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "AssetSwapped",
      inputs: [
        {
          name: "tokenIn",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "tokenOut",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "amountIn",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "amountOut",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "timestamp",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "BridgeFailed",
      inputs: [
        {
          name: "srcChainId",
          type: "uint16",
          indexed: true,
          internalType: "uint16"
        },
        {
          name: "user",
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
          name: "reason",
          type: "string",
          indexed: false,
          internalType: "string"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "SwapFailed",
      inputs: [
        {
          name: "tokenIn",
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
          name: "reason",
          type: "string",
          indexed: false,
          internalType: "string"
        }
      ],
      anonymous: false
    },
    {
      type: "error",
      name: "AssetSwapper__BridgeFailed",
      inputs: []
    },
    {
      type: "error",
      name: "AssetSwapper__InsufficientOutput",
      inputs: []
    },
    {
      type: "error",
      name: "AssetSwapper__InvalidChainId",
      inputs: []
    },
    {
      type: "error",
      name: "AssetSwapper__InvalidToken",
      inputs: []
    },
    {
      type: "error",
      name: "AssetSwapper__SwapFailed",
      inputs: []
    },
    {
      type: "error",
      name: "AssetSwapper__ZeroAmount",
      inputs: []
    },
    {
      type: "error",
      name: "ReentrancyGuardReentrantCall",
      inputs: []
    },
    {
      type: "error",
      name: "SafeERC20FailedOperation",
      inputs: [
        {
          name: "token",
          type: "address",
          internalType: "address"
        }
      ]
    }
  ]
};

export default assetswapnBridge_abi;