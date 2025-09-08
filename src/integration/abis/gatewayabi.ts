export const Gateway_Address = "0xBdC7be341E121A9939E6EA0b21f56FDFa4484b16";

export const gateway_abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_pulleyToken",
          type: "address",
          internalType: "address"
        },
        {
          name: "_pulleyTokenEngine",
          type: "address",
          internalType: "address"
        },
        {
          name: "_tradingPool",
          type: "address",
          internalType: "address"
        },
        {
          name: "_crossChainController",
          type: "address",
          internalType: "address"
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
      name: "buyPulleyTokens",
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
      name: "buyTokensAndDeposit",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        },
        {
          name: "tokenAmount",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "tradingAmount",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
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
      name: "depositToTradingPool",
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
      name: "getPulleyTokenInfo",
      inputs: [
        {
          name: "user",
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
      name: "getTradingPoolBalance",
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
      name: "getTradingPoolMetrics",
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
      name: "pulleyToken",
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
      name: "tradingPool",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract ITradingPool"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "withdrawFromTradingPool",
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
      name: "withdrawPulleyLiquidity",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        },
        {
          name: "pulleyTokenAmount",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "event",
      name: "FundsTransferredToCrossChain",
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
      name: "UserDepositedToTrading",
      inputs: [
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
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "UserPurchasedTokens",
      inputs: [
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
          name: "tokensReceived",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "error",
      name: "Gateway__TransferFailed",
      inputs: []
    },
    {
      type: "error",
      name: "Gateway__ZeroAddress",
      inputs: []
    },
    {
      type: "error",
      name: "Gateway__ZeroAmount",
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

export default gateway_abi;