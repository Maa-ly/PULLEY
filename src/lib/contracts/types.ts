/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Address, type Hash, type Hex } from "viem";

// Common types for contract interactions
export interface ContractConfig {
  address: Address;
  abi: any[];
  chainId?: number;
}

export interface TransactionRequest {
  to: Address;
  data: Hex;
  value?: bigint;
  gas?: bigint;
  gasPrice?: bigint;
}

export interface ContractCallResult<T = any> {
  data: T;
  hash?: Hash;
  success: boolean;
  error?: string;
}

// Merkle Trade specific types
export interface MerkleOrder {
  pair: string;
  sizeDelta: bigint;
  collateralDelta: bigint;
  price: bigint;
  isLong: boolean;
  isIncrease: boolean;
  isMarket: boolean;
  stopLossTriggerPrice?: bigint;
  takeProfitTriggerPrice?: bigint;
  canExecuteAbovePrice?: boolean;
  referrer?: Address;
}

export interface MerklePosition {
  pairType: string;
  size: bigint;
  collateral: bigint;
  avgPrice: bigint;
  isLong: boolean;
  accFundingFeePerSize: bigint;
  accRolloverFeePerCollateral: bigint;
}

export interface MerklePairInfo {
  pairId: string;
  baseAsset: string;
  quoteAsset: string;
  makerFee: bigint;
  takerFee: bigint;
  skewFactor: bigint;
  maxFundingVelocity: bigint;
  rolloverFeePerTimestamp: bigint;
}

export interface MerklePairState {
  pairId: string;
  longOpenInterest: bigint;
  shortOpenInterest: bigint;
  fundingRate: bigint;
  accFundingFeePerSize: bigint;
  accRolloverFeePerCollateral: bigint;
  lastAccrueTimestamp: number;
}

// Pulley Protocol specific types
export interface PulleyTokenInfo {
  name: string;
  symbol: string;
  totalSupply: bigint;
  decimals: number;
}

export interface AssetSwapRequest {
  fromAsset: Address;
  toAsset: Address;
  amount: bigint;
  minAmountOut: bigint;
  deadline: bigint;
}

export interface CrossChainRequest {
  targetChain: number;
  targetContract: Address;
  payload: Hex;
  gasLimit: bigint;
}

export interface TradingPoolInfo {
  supportedAssets: Address[];
  totalLiquidity: bigint;
  threshold: bigint;
  transferThreshold: bigint;
}

// Wallet interaction types
export interface WalletConfig {
  address: Address;
  chainId: number;
  isConnected: boolean;
}

export interface TransactionOptions {
  gasLimit?: bigint;
  gasPrice?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  nonce?: number;
}

// Error types
export class ContractError extends Error {
  constructor(
    message: string,
    public code?: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ContractError';
  }
}

export class InsufficientBalanceError extends ContractError {
  constructor(required: bigint, available: bigint) {
    super(`Insufficient balance. Required: ${required}, Available: ${available}`);
    this.name = 'InsufficientBalanceError';
  }
}

export class TransactionFailedError extends ContractError {
  constructor(hash: Hash, reason?: string) {
    super(`Transaction failed: ${hash}${reason ? ` - ${reason}` : ''}`);
    this.name = 'TransactionFailedError';
  }
}
