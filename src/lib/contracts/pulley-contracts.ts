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
  encodeFunctionData
} from "viem";
import { kaia } from "viem/chains";

import type { 
  AssetSwapRequest,
  CrossChainRequest,
  TradingPoolInfo,
  PulleyTokenInfo,
  ContractCallResult,
  TransactionOptions,
  ContractError
} from "./types";
import { AssetswapnBridge_Address, CrossChainController_Address, Gateway_Address, PulleyTokenEngine_Address, PulleyToken_Address, TradingPool_Address, assetswapnBridge_abi, crossChainController_abi, gateway_abi, pulleyToken_abi, pulleytokenengine_abi, tradingPool_abi } from "@/integration/abis";

export class PulleyContractManager {
  private publicClient: PublicClient;
  private walletClient?: WalletClient;

  constructor(
    rpcUrl: string = "https://rpc.kaia.tech",
    walletClient?: WalletClient
  ) {
    this.publicClient = createPublicClient({
      chain: kaia,
      transport: http(rpcUrl),
    });
    this.walletClient = walletClient;
  }

  setWalletClient(walletClient: WalletClient) {
    this.walletClient = walletClient;
  }

  // Asset Swap Bridge Functions
  async swapAssets(
    request: AssetSwapRequest,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: assetswapnBridge_abi.abi,
        functionName: "swapAssets",
        args: [
          request.fromAsset,
          request.toAsset,
          request.amount,
          request.minAmountOut,
          request.deadline
        ]
      });

      const hash = await this.walletClient.sendTransaction({
        to: AssetswapnBridge_Address,
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

  async getSwapQuote(
    fromAsset: Address,
    toAsset: Address,
    amount: bigint
  ): Promise<ContractCallResult<bigint>> {
    try {
      const data = await this.publicClient.readContract({
        address: AssetswapnBridge_Address,
        abi: assetswapnBridge_abi.abi,
        functionName: "getSwapQuote",
        args: [fromAsset, toAsset, amount]
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

  // Pulley Token Functions
  async getPulleyTokenInfo(): Promise<ContractCallResult<PulleyTokenInfo>> {
    try {
      const [name, symbol, totalSupply, decimals] = await Promise.all([
        this.publicClient.readContract({
          address: PulleyToken_Address,
          abi: pulleyToken_abi.abi,
          functionName: "name"
        }),
        this.publicClient.readContract({
          address: PulleyToken_Address,
          abi: pulleyToken_abi.abi,
          functionName: "symbol"
        }),
        this.publicClient.readContract({
          address: PulleyToken_Address,
          abi: pulleyToken_abi.abi,
          functionName: "totalSupply"
        }),
        this.publicClient.readContract({
          address: PulleyToken_Address,
          abi: pulleyToken_abi.abi,
          functionName: "decimals"
        })
      ]);

      return {
        data: {
          name: name as string,
          symbol: symbol as string,
          totalSupply: totalSupply as bigint,
          decimals: decimals as number
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

  async getPulleyBalance(userAddress: Address): Promise<ContractCallResult<bigint>> {
    try {
      const data = await this.publicClient.readContract({
        address: PulleyToken_Address,
        abi: pulleyToken_abi.abi,
        functionName: "balanceOf",
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

  // Gateway Functions
  async buyPulleyTokens(
    asset: Address,
    amount: bigint,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: gateway_abi.abi,
        functionName: "buyPulleyTokens",
        args: [asset, amount]
      });

      const hash = await this.walletClient.sendTransaction({
        to: Gateway_Address,
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

  async sellPulleyTokens(
    amount: bigint,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: gateway_abi.abi,
        functionName: "sellPulleyTokens",
        args: [amount]
      });

      const hash = await this.walletClient.sendTransaction({
        to: Gateway_Address,
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

  // Trading Pool Functions
  async getTradingPoolInfo(): Promise<ContractCallResult<TradingPoolInfo>> {
    try {
      const [supportedAssets, totalLiquidity, threshold, transferThreshold] = await Promise.all([
        this.publicClient.readContract({
          address: TradingPool_Address,
          abi: tradingPool_abi.abi,
          functionName: "getSupportedAssets"
        }),
        this.publicClient.readContract({
          address: TradingPool_Address,
          abi: tradingPool_abi.abi,
          functionName: "getTotalLiquidity"
        }),
        this.publicClient.readContract({
          address: TradingPool_Address,
          abi: tradingPool_abi.abi,
          functionName: "THRESHOLD"
        }),
        this.publicClient.readContract({
          address: TradingPool_Address,
          abi: tradingPool_abi.abi,
          functionName: "TRANSFER_THRESHOLD"
        })
      ]);

      return {
        data: {
          supportedAssets: supportedAssets as Address[],
          totalLiquidity: totalLiquidity as bigint,
          threshold: threshold as bigint,
          transferThreshold: transferThreshold as bigint
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

  async addLiquidity(
    asset: Address,
    amount: bigint,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: tradingPool_abi.abi,
        functionName: "addLiquidity",
        args: [asset, amount]
      });

      const hash = await this.walletClient.sendTransaction({
        to: TradingPool_Address,
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

  async removeLiquidity(
    asset: Address,
    amount: bigint,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: tradingPool_abi.abi,
        functionName: "removeLiquidity",
        args: [asset, amount]
      });

      const hash = await this.walletClient.sendTransaction({
        to: TradingPool_Address,
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

  // Cross Chain Controller Functions
  async sendCrossChainMessage(
    request: CrossChainRequest,
    options?: TransactionOptions
  ): Promise<ContractCallResult<Hash>> {
    if (!this.walletClient) {
      throw new ContractError("Wallet client not connected");
    }

    try {
      const data = encodeFunctionData({
        abi: crossChainController_abi.abi,
        functionName: "sendMessage",
        args: [
          request.targetChain,
          request.targetContract,
          request.payload,
          request.gasLimit
        ]
      });

      const hash = await this.walletClient.sendTransaction({
        to: CrossChainController_Address,
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

  // Pulley Token Engine Functions
  async getAssetReserves(asset: Address): Promise<ContractCallResult<bigint>> {
    try {
      const data = await this.publicClient.readContract({
        address: PulleyTokenEngine_Address,
        abi: pulleytokenengine_abi.abi,
        functionName: "assetReserves",
        args: [asset]
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

  async isAssetAllowed(asset: Address): Promise<ContractCallResult<boolean>> {
    try {
      const data = await this.publicClient.readContract({
        address: PulleyTokenEngine_Address,
        abi: pulleytokenengine_abi.abi,
        functionName: "allowedAssets",
        args: [asset]
      });

      return { data: data as boolean, success: true };
    } catch (error: any) {
      return {
        data: false,
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
        throw new Error('Transaction reverted');
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
