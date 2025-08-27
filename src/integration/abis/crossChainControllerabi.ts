const CrossChainController_Address = "0x85a77920ef2404772bA01c1155d80893cBB1cce6";

const crossChainController_abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_endpoint",
          type: "address",
          internalType: "address"
        },
        {
          name: "bb",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "receive",
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "ASSET_SWAPPER_ADDRESS",
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
      name: "CANCEL_ORDERS",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint16",
          internalType: "uint16"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "DEPOSIT_REQUEST",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint16",
          internalType: "uint16"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "FILL_CONTRACT_ORDER",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint16",
          internalType: "uint16"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "FILL_ORDER",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint16",
          internalType: "uint16"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "FILL_ORDER_ARGS",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint16",
          internalType: "uint16"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "INSURANCE_PERCENTAGE",
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
      name: "INSURANCE_PROFIT_SHARE",
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
      name: "IPERMISSION",
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
      name: "KAIANATIVE_USDT_ADDRESS",
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
      name: "LIMITORDER_CONTRACT",
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
      name: "LIMIT_ORDER_PERCENTAGE",
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
      name: "NEST_VAULT_PERCENTAGE",
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
      name: "PERCENTAGE_BASE",
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
      name: "PROFIT_CHECK_REQUEST",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint16",
          internalType: "uint16"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "PULLEY_STABLECOIN_ADDRESS",
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
      name: "PULLEY_TOKEN_ENGINE_ADDRESS",
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
      name: "STATE_RESPONSE",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint16",
          internalType: "uint16"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "STRATEGY_CONTRACT",
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
      name: "TRADER_PROFIT_SHARE",
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
      name: "TRADING_POOL_ADDRESS",
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
      name: "WITHDRAW_REQUEST",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint16",
          internalType: "uint16"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "allowInitializePath",
      inputs: [
        {
          name: "origin",
          type: "tuple",
          internalType: "struct Origin",
          components: [
            {
              name: "srcEid",
              type: "uint32",
              internalType: "uint32"
            },
            {
              name: "sender",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "nonce",
              type: "uint64",
              internalType: "uint64"
            }
          ]
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
      name: "checkRemoteProfit",
      inputs: [
        {
          name: "dstEid",
          type: "uint32",
          internalType: "uint32"
        },
        {
          name: "contractType",
          type: "uint8",
          internalType: "uint8"
        },
        {
          name: "options",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "combineOptions",
      inputs: [
        {
          name: "_eid",
          type: "uint32",
          internalType: "uint32"
        },
        {
          name: "_msgType",
          type: "uint16",
          internalType: "uint16"
        },
        {
          name: "_extraOptions",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "deployToNestVault",
      inputs: [
        {
          name: "dstEid",
          type: "uint32",
          internalType: "uint32"
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
          name: "msgtype",
          type: "uint16",
          internalType: "uint16"
        },
        {
          name: "options",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "deployUSDTTonestVault",
      inputs: [
        {
          name: "dstEid",
          type: "uint32",
          internalType: "uint32"
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "msgtype",
          type: "uint16",
          internalType: "uint16"
        },
        {
          name: "options",
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
      name: "endpoint",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract ILayerZeroEndpointV2"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "enforcedOptions",
      inputs: [
        {
          name: "eid",
          type: "uint32",
          internalType: "uint32"
        },
        {
          name: "msgType",
          type: "uint16",
          internalType: "uint16"
        }
      ],
      outputs: [
        {
          name: "enforcedOption",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "executeLimitOrder",
      inputs: [
        {
          name: "dstEid",
          type: "uint32",
          internalType: "uint32"
        },
        {
          name: "orderData",
          type: "bytes",
          internalType: "bytes"
        },
        {
          name: "msgType",
          type: "uint16",
          internalType: "uint16"
        },
        {
          name: "options",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "getFundAllocation",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "insurance",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "nestVault",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "limitOrder",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "getProfitData",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "nestProfit",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "limitProfit",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "totalInvestedAmount",
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
          name: "assets",
          type: "address[]",
          internalType: "address[]"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "getUSDTAllocation",
      inputs: [],
      outputs: [
        {
          name: "insurance",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "nestVault",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "limitOrder",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "handleBridgedAsset",
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
          name: "recipient",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "insuranceAllocations",
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
      name: "isComposeMsgSender",
      inputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct Origin",
          components: [
            {
              name: "srcEid",
              type: "uint32",
              internalType: "uint32"
            },
            {
              name: "sender",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "nonce",
              type: "uint64",
              internalType: "uint64"
            }
          ]
        },
        {
          name: "",
          type: "bytes",
          internalType: "bytes"
        },
        {
          name: "_sender",
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
      name: "limitOrderAllocations",
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
      name: "limitOrderProfits",
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
      name: "lzReceive",
      inputs: [
        {
          name: "_origin",
          type: "tuple",
          internalType: "struct Origin",
          components: [
            {
              name: "srcEid",
              type: "uint32",
              internalType: "uint32"
            },
            {
              name: "sender",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "nonce",
              type: "uint64",
              internalType: "uint64"
            }
          ]
        },
        {
          name: "_guid",
          type: "bytes32",
          internalType: "bytes32"
        },
        {
          name: "_message",
          type: "bytes",
          internalType: "bytes"
        },
        {
          name: "_executor",
          type: "address",
          internalType: "address"
        },
        {
          name: "_extraData",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "minimumGasBalance",
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
      name: "nestVaultAllocations",
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
      name: "nestVaultProfits",
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
      name: "nextNonce",
      inputs: [
        {
          name: "",
          type: "uint32",
          internalType: "uint32"
        },
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "nonce",
          type: "uint64",
          internalType: "uint64"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "oAppVersion",
      inputs: [],
      outputs: [
        {
          name: "senderVersion",
          type: "uint64",
          internalType: "uint64"
        },
        {
          name: "receiverVersion",
          type: "uint64",
          internalType: "uint64"
        }
      ],
      stateMutability: "pure"
    },
    {
      type: "function",
      name: "owner",
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
      name: "peers",
      inputs: [
        {
          name: "eid",
          type: "uint32",
          internalType: "uint32"
        }
      ],
      outputs: [
        {
          name: "peer",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "pendingRequests",
      inputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "requestId",
          type: "bytes32",
          internalType: "bytes32"
        },
        {
          name: "dstEid",
          type: "uint32",
          internalType: "uint32"
        },
        {
          name: "msgType",
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
          name: "timestamp",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "processed",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "processedRequests",
      inputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32"
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
      name: "profitThreshold",
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
      name: "receiveFundsFromTradingPool",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "requestNonce",
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
      name: "setAssetSwapperAddresses",
      inputs: [
        {
          name: "_assetSwapper",
          type: "address",
          internalType: "address"
        },
        {
          name: "_kaiaNativeUSDT",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "setContractAddress",
      inputs: [
        {
          name: "_strategyaddress",
          type: "address",
          internalType: "address"
        },
        {
          name: "limitOrder",
          type: "address",
          internalType: "address"
        },
        {
          name: "permission",
          type: "address",
          internalType: "address"
        },
        {
          name: "pulleyStablecoin",
          type: "address",
          internalType: "address"
        },
        {
          name: "tradingPool",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "setDelegate",
      inputs: [
        {
          name: "_delegate",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "setEnforcedOptions",
      inputs: [
        {
          name: "_enforcedOptions",
          type: "tuple[]",
          internalType: "struct EnforcedOptionParam[]",
          components: [
            {
              name: "eid",
              type: "uint32",
              internalType: "uint32"
            },
            {
              name: "msgType",
              type: "uint16",
              internalType: "uint16"
            },
            {
              name: "options",
              type: "bytes",
              internalType: "bytes"
            }
          ]
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "setPeer",
      inputs: [
        {
          name: "_eid",
          type: "uint32",
          internalType: "uint32"
        },
        {
          name: "_peer",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "setPermissionManager",
      inputs: [
        {
          name: "permission",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "setProfitThreshold",
      inputs: [
        {
          name: "newThreshold",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "setSupportedAsset",
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
      name: "thresholdCryptographyUseCase",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "totalInvested",
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
      name: "transferOwnership",
      inputs: [
        {
          name: "newOwner",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "usdtInsuranceAllocation",
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
      name: "usdtLimitOrderAllocation",
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
      name: "usdtNestVaultAllocation",
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
      type: "event",
      name: "AssetBridged",
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
          name: "srcChainId",
          type: "uint16",
          indexed: true,
          internalType: "uint16"
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
      name: "AssetsSwappedToUSDT",
      inputs: [
        {
          name: "asset",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "originalAmount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "usdtAmount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "CrossChainRequestSent",
      inputs: [
        {
          name: "requestId",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32"
        },
        {
          name: "dstEid",
          type: "uint32",
          indexed: false,
          internalType: "uint32"
        },
        {
          name: "msgType",
          type: "uint16",
          indexed: false,
          internalType: "uint16"
        },
        {
          name: "asset",
          type: "address",
          indexed: false,
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
      name: "EnforcedOptionSet",
      inputs: [
        {
          name: "_enforcedOptions",
          type: "tuple[]",
          indexed: false,
          internalType: "struct EnforcedOptionParam[]",
          components: [
            {
              name: "eid",
              type: "uint32",
              internalType: "uint32"
            },
            {
              name: "msgType",
              type: "uint16",
              internalType: "uint16"
            },
            {
              name: "options",
              type: "bytes",
              internalType: "bytes"
            }
          ]
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "FundsAllocated",
      inputs: [
        {
          name: "asset",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "insurance",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "nestVault",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "limitOrder",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "FundsReceived",
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
          name: "from",
          type: "address",
          indexed: true,
          internalType: "address"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "InsuranceUpdated",
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
          name: "isIncrease",
          type: "bool",
          indexed: false,
          internalType: "bool"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "previousOwner",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "PeerSet",
      inputs: [
        {
          name: "eid",
          type: "uint32",
          indexed: false,
          internalType: "uint32"
        },
        {
          name: "peer",
          type: "bytes32",
          indexed: false,
          internalType: "bytes32"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "ProfitRecorded",
      inputs: [
        {
          name: "asset",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "profitLoss",
          type: "int256",
          indexed: false,
          internalType: "int256"
        },
        {
          name: "insuranceShare",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "traderShare",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "StateResponseReceived",
      inputs: [
        {
          name: "requestId",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32"
        },
        {
          name: "success",
          type: "bool",
          indexed: false,
          internalType: "bool"
        },
        {
          name: "resultAmount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "errorMessage",
          type: "string",
          indexed: false,
          internalType: "string"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "ThresholdReached",
      inputs: [
        {
          name: "asset",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "currentProfit",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "threshold",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "USDTAllocated",
      inputs: [
        {
          name: "insurance",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "nestVault",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "limitOrder",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "error",
      name: "CrossChainController__InsufficientFunds",
      inputs: []
    },
    {
      type: "error",
      name: "CrossChainController__InsufficientGasBalance",
      inputs: []
    },
    {
      type: "error",
      name: "CrossChainController__InvalidAllocation",
      inputs: []
    },
    {
      type: "error",
      name: "CrossChainController__RequestAlreadyProcessed",
      inputs: []
    },
    {
      type: "error",
      name: "CrossChainController__TransferFailed",
      inputs: []
    },
    {
      type: "error",
      name: "CrossChainController__UnknownMessageType",
      inputs: []
    },
    {
      type: "error",
      name: "CrossChainController__UnsupportedAsset",
      inputs: []
    },
    {
      type: "error",
      name: "CrossChainController__ZeroAmount",
      inputs: []
    },
    {
      type: "error",
      name: "InvalidDelegate",
      inputs: []
    },
    {
      type: "error",
      name: "InvalidEndpointCall",
      inputs: []
    },
    {
      type: "error",
      name: "InvalidOptions",
      inputs: [
        {
          name: "options",
          type: "bytes",
          internalType: "bytes"
        }
      ]
    },
    {
      type: "error",
      name: "LzTokenUnavailable",
      inputs: []
    },
    {
      type: "error",
      name: "NoPeer",
      inputs: [
        {
          name: "eid",
          type: "uint32",
          internalType: "uint32"
        }
      ]
    },
    {
      type: "error",
      name: "NotEnoughNative",
      inputs: [
        {
          name: "msgValue",
          type: "uint256",
          internalType: "uint256"
        }
      ]
    },
    {
      type: "error",
      name: "OnlyEndpoint",
      inputs: [
        {
          name: "addr",
          type: "address",
          internalType: "address"
        }
      ]
    },
    {
      type: "error",
      name: "OnlyPeer",
      inputs: [
        {
          name: "eid",
          type: "uint32",
          internalType: "uint32"
        },
        {
          name: "sender",
          type: "bytes32",
          internalType: "bytes32"
        }
      ]
    },
    {
      type: "error",
      name: "OwnableInvalidOwner",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address"
        }
      ]
    },
    {
      type: "error",
      name: "OwnableUnauthorizedAccount",
      inputs: [
        {
          name: "account",
          type: "address",
          internalType: "address"
        }
      ]
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

export default crossChainController_abi;