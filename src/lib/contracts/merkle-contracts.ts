import { 
  createPublicClient, 
  createWalletClient, 
  http, 
  type Address, 
  type Hash, 
  type Hex,
  type PublicClient,
  type WalletClient,
  parseAbi,
  encodeFunctionData,
  decodeFunctionResult
} from "viem";


import type { 
  MerkleOrder, 
  MerklePosition, 
  MerklePairInfo, 
  MerklePairState,
  ContractCallResult,
  TransactionOptions,
  ContractError,
  InsufficientBalanceError,
  TransactionFailedError
} from "./types";

// Merkle Trade Contract Addresses (Testnet)
export const MERKLE_CONTRACTS = {
  MANAGED_TRADING: "0x5ae6789dd2fec1a9ec9cccfb3acaf12e93d432f0a3a42c92fe1a9d490b7bbc06" as Address,
  PAIR_TYPES: "0x5ae6789dd2fec1a9ec9cccfb3acaf12e93d432f0a3a42c92fe1a9d490b7bbc06" as Address,
  USDC: "0x5ae6789dd2fec1a9ec9cccfb3acaf12e93d432f0a3a42c92fe1a9d490b7bbc06" as Address,
} as const;

// Merkle Trade ABI (simplified for key functions)
const MERKLE_ABI = parseAbi([
  "function place_order_v3(address user, uint64 sizeDelta, uint64 collateralDelta, uint64 price, bool isLong, bool isIncrease, bool isMarket, uint64 stopLossTriggerPrice, uint64 takeProfitTriggerPrice, bool canExecuteAbovePrice, address referrer) external",
  "function cancel_order_v3(address user, uint64 orderId) external",
  "function update_position_tp_sl_v3(address user, bool isLong, uint64 takeProfitTriggerPrice, uint64 stopLossTriggerPrice) external",
  "function get_position(address user, bytes32 pairType) external view returns (tuple(uint64 size, uint64 collateral, uint64 avgPrice, bool isLong, uint64 accFundingFeePerSize, uint64 accRolloverFeePerCollateral))",
  "function get_order(address user, uint64 orderId) external view returns (tuple(bytes32 pairType, uint64 sizeDelta, uint64 collateralDelta, uint64 price, bool isLong, bool isIncrease, bool isMarket, uint64 stopLossTriggerPrice, uint64 takeProfitTriggerPrice, bool canExecuteAbovePrice, address referrer, uint64 timestamp))",
  "function get_pair_info(bytes32 pairType) external view returns (tuple(string baseAsset, string quoteAsset, uint64 makerFee, uint64 takerFee, uint64 skewFactor, uint64 maxFundingVelocity, uint64 rolloverFeePerTimestamp))",
  "function get_pair_state(bytes32 pairType) external view returns (tuple(uint64 longOpenInterest, uint64 shortOpenInterest, uint64 fundingRate, uint64 accFundingFeePerSize, uint64 accRolloverFeePerCollateral, uint64 lastAccrueTimestamp))",
  "function get_usdc_balance(address user) external view returns (uint64)",
  "function faucet_native_usdc(uint64 amount) external"
]);

export class MerkleContractManager {
  private publicClient: PublicClient;
  private walletClient?: WalletClient;

  constructor(
    rpcUrl: string = "https://fullnode.testnet.aptoslabs.com",
    walletClient?: WalletClient
  ) {
    this.publicClient = createPublicClient({
      chain: aptos,
      transport: http(rpcUrl),
    });
    this.walletClient = walletClient;
  }

  setWalletClient(walletClient: WalletClient) {
    this.walletClient = walletClient;
  }

  // Place a market order
  async placeMarketOrder(
    order: MerkleOrder,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: MERKLE_ABI,
        functionName: "place_order_v3",
        args: [
          order.pair,
          order.userAddress,
          order.sizeDelta,
          order.collateralDelta,
          order.price ?? (order.isLong ? BigInt(2**64 - 1) : BigInt(1)),
          order.isLong,
          order.isIncrease,
          true, // isMarket
          order.stopLossTriggerPrice ?? (order.isLong ? BigInt(1) : BigInt(2**64 - 1)),
          order.takeProfitTriggerPrice ?? (order.isLong ? BigInt(2**64 - 1) : BigInt(1)),
          order.canExecuteAbovePrice ?? !order.isLong,
          order.referrer ?? "0x0000000000000000000000000000000000000000"
        ]
      });

      const hash = await this.walletClient.sendTransaction({
        to: MERKLE_CONTRACTS.MANAGED_TRADING,
        data,
        value: 0n,
        ...options
      });

      return { data: hash, hash, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: error.message
      };
    }
  }

  // Place a limit order
  async placeLimitOrder(
    order: MerkleOrder,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    if (!order.price) {
      throw new ContractError("Price is required for limit orders");
    }

    try {
      const data = encodeFunctionData({
        abi: MERKLE_ABI,
        functionName: "place_order_v3",
        args: [
          order.pair,
          order.userAddress,
          order.sizeDelta,
          order.collateralDelta,
          order.price,
          order.isLong,
          order.isIncrease,
          false, // isMarket
          order.stopLossTriggerPrice ?? (order.isLong ? BigInt(1) : BigInt(2**64 - 1)),
          order.takeProfitTriggerPrice ?? (order.isLong ? BigInt(2**64 - 1) : BigInt(1)),
          order.canExecuteAbovePrice ?? !order.isLong,
          order.referrer ?? "0x0000000000000000000000000000000000000000"
        ]
      });

      const hash = await this.walletClient.sendTransaction({
        to: MERKLE_CONTRACTS.MANAGED_TRADING,
        data,
        value: 0n,
        ...options
      });

      return { data: hash, hash, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: error.message
      };
    }
  }

  // Cancel an order
  async cancelOrder(
    userAddress: Address,
    orderId: bigint,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: MERKLE_ABI,
        functionName: "cancel_order_v3",
        args: [userAddress, orderId]
      });

      const hash = await this.walletClient.sendTransaction({
        to: MERKLE_CONTRACTS.MANAGED_TRADING,
        data,
        value: 0n,
        ...options
      });

      return { data: hash, hash, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: error.message
      };
    }
  }

  // Update take profit and stop loss
  async updateTPSL(
    userAddress: Address,
    pair: string,
    isLong: boolean,
    takeProfitTriggerPrice: bigint,
    stopLossTriggerPrice: bigint,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: MERKLE_ABI,
        functionName: "update_position_tp_sl_v3",
        args: [userAddress, isLong, takeProfitTriggerPrice, stopLossTriggerPrice]
      });

      const hash = await this.walletClient.sendTransaction({
        to: MERKLE_CONTRACTS.MANAGED_TRADING,
        data,
        value: 0n,
        ...options
      });

      return { data: hash, hash, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: error.message
      };
    }
  }

  // Get user's USDC balance
  async getUSDCBalance(userAddress: Address): Promise<ContractCallResult<bigint>> {
    try {
      const data = await this.publicClient.readContract({
        address: MERKLE_CONTRACTS.MANAGED_TRADING,
        abi: MERKLE_ABI,
        functionName: "get_usdc_balance",
        args: [userAddress]
      });

      return { data: data as bigint, success: true };
    } catch (error: any) {
      return {
        data: 0n,
        success: false,
        error: error.message
      };
    }
  }

  // Get position information
  async getPosition(
    userAddress: Address,
    pairType: string
  ): Promise<ContractCallResult<MerklePosition>> {
    try {
      const data = await this.publicClient.readContract({
        address: MERKLE_CONTRACTS.MANAGED_TRADING,
        abi: MERKLE_ABI,
        functionName: "get_position",
        args: [userAddress, pairType]
      });

      const position = data as any;
      return {
        data: {
          pairType,
          size: position.size,
          collateral: position.collateral,
          avgPrice: position.avgPrice,
          isLong: position.isLong,
          accFundingFeePerSize: position.accFundingFeePerSize,
          accRolloverFeePerCollateral: position.accRolloverFeePerCollateral
        },
        success: true
      };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: error.message
      };
    }
  }

  // Get pair information
  async getPairInfo(pairType: string): Promise<ContractCallResult<MerklePairInfo>> {
    try {
      const data = await this.publicClient.readContract({
        address: MERKLE_CONTRACTS.MANAGED_TRADING,
        abi: MERKLE_ABI,
        functionName: "get_pair_info",
        args: [pairType]
      });

      const pairInfo = data as any;
      return {
        data: {
          pairId: pairType,
          baseAsset: pairInfo.baseAsset,
          quoteAsset: pairInfo.quoteAsset,
          makerFee: pairInfo.makerFee,
          takerFee: pairInfo.takerFee,
          skewFactor: pairInfo.skewFactor,
          maxFundingVelocity: pairInfo.maxFundingVelocity,
          rolloverFeePerTimestamp: pairInfo.rolloverFeePerTimestamp
        },
        success: true
      };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: error.message
      };
    }
  }

  // Get pair state
  async getPairState(pairType: string): Promise<ContractCallResult<MerklePairState>> {
    try {
      const data = await this.publicClient.readContract({
        address: MERKLE_CONTRACTS.MANAGED_TRADING,
        abi: MERKLE_ABI,
        functionName: "get_pair_state",
        args: [pairType]
      });

      const pairState = data as any;
      return {
        data: {
          pairId: pairType,
          longOpenInterest: pairState.longOpenInterest,
          shortOpenInterest: pairState.shortOpenInterest,
          fundingRate: pairState.fundingRate,
          accFundingFeePerSize: pairState.accFundingFeePerSize,
          accRolloverFeePerCollateral: pairState.accRolloverFeePerCollateral,
          lastAccrueTimestamp: Number(pairState.lastAccrueTimestamp)
        },
        success: true
      };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: error.message
      };
    }
  }

  // Faucet USDC for testnet
  async faucetUSDC(
    amount: bigint,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: MERKLE_ABI,
        functionName: "faucet_native_usdc",
        args: [amount]
      });

      const hash = await this.walletClient.sendTransaction({
        to: MERKLE_CONTRACTS.MANAGED_TRADING,
        data,
        value: 0n,
        ...options
      });

      return { data: hash, hash, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: error.message
      };
    }
  }

  // Wait for transaction confirmation
  async waitForTransaction(hash: Hash): Promise<ContractCallResult<any>> {
    try {
      const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
      
      if (receipt.status === 'reverted') {
        throw new TransactionFailedError(hash, 'Transaction reverted');
      }

      return { data: receipt, success: true };
    } catch (error: any) {
      return {
        data: null,
        success: false,
        error: error.message
      };
    }
  }
}
