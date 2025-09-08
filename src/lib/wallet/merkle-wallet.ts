import { MerkleClient } from "@/lib/merkle/src/client";
import { MerkleClientConfig } from "@/lib/merkle/src/client/config";
// @ts-ignore
import { Aptos, Account, Ed25519PrivateKey, PrivateKey, PrivateKeyVariants } from "@aptos-labs/ts-sdk";

export interface MerkleWalletConfig {
  privateKey?: string;
}

export class MerkleWalletManager {
  private merkleClient?: MerkleClient;
  private aptosClient?: Aptos;
  private account?: Account;
  private isConnected = false;
  private address?: string;

  constructor(config: MerkleWalletConfig = {}) {
    this.initializeClients(config);
  }

  private async initializeClients(config: MerkleWalletConfig) {
    try {
      // Initialize Merkle client
      const merkleConfig = await MerkleClientConfig.testnet();
      this.merkleClient = new MerkleClient(merkleConfig);
      this.aptosClient = new Aptos(merkleConfig.aptosConfig);

      // If private key is provided, initialize account
      if (config.privateKey) {
        this.account = Account.fromPrivateKey({
          privateKey: new Ed25519PrivateKey(
            PrivateKey.formatPrivateKey(config.privateKey, PrivateKeyVariants.Ed25519),
          ),
        });
        this.address = this.account.accountAddress.toString();
        this.isConnected = true;
      }
    } catch (error) {
      console.error("Failed to initialize Merkle clients:", error);
    }
  }

  // Connect wallet (for now, we'll use a demo account or require private key)
  async connect(): Promise<{ address: string; success: boolean; error?: string }> {
    try {
      if (!this.merkleClient || !this.aptosClient) {
        return { address: "", success: false, error: "Merkle client not initialized" };
      }

      // For demo purposes, create a new account if none exists
      if (!this.account) {
        this.account = Account.generate();
        this.address = this.account.accountAddress.toString();
      }

      this.isConnected = true;
      return { address: this.address!, success: true };
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return { 
        address: "", 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }

  // Disconnect wallet
  async disconnect(): Promise<void> {
    this.account = undefined;
    this.isConnected = false;
    this.address = undefined;
  }

  // Get wallet address
  getAddress(): string | undefined {
    return this.address;
  }

  // Check if wallet is connected
  isWalletConnected(): boolean {
    return this.isConnected;
  }

  // Get USDC balance using Merkle client
  async getUSDCBalance(): Promise<{ balance: string; success: boolean; error?: string }> {
    try {
      if (!this.address || !this.merkleClient) {
        return { balance: "0", success: false, error: "Wallet not connected" };
      }

      const balance = await this.merkleClient.getUsdcBalance({
        accountAddress: this.address,
      });
      
      // Convert from micro USDC to USDC (divide by 1e6)
      const usdcBalance = (Number(balance) / 1e6).toString();
      return { balance: usdcBalance, success: true };
    } catch (error) {
      console.error("Failed to get USDC balance:", error);
      return { 
        balance: "0", 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }

  // Faucet testnet USDC using Merkle client
  async faucetUSDC(amount: string = "100"): Promise<{ success: boolean; error?: string; txHash?: string }> {
    try {
      if (!this.account || !this.merkleClient || !this.aptosClient) {
        return { success: false, error: "Wallet not connected" };
      }

      // Convert USDC amount to micro USDC (multiply by 1e6)
      const microUSDC = BigInt(parseFloat(amount) * 1e6);

      const faucetPayload = this.merkleClient.payloads.testnetFaucetUSDC({
        amount: microUSDC,
      });

      const transaction = await this.aptosClient.transaction.build.simple({
        sender: this.account.accountAddress,
        data: faucetPayload,
      });

      const { hash } = await this.aptosClient.signAndSubmitTransaction({
        signer: this.account,
        transaction,
      });

      await this.aptosClient.waitForTransaction({ transactionHash: hash });

      return { success: true, txHash: hash };
    } catch (error) {
      console.error("Failed to faucet USDC:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }

  // Get Merkle client for trading operations
  getMerkleClient(): MerkleClient | undefined {
    return this.merkleClient;
  }

  // Get Aptos client for transaction operations
  getAptosClient(): Aptos | undefined {
    return this.aptosClient;
  }

  // Get account for signing transactions
  getAccount(): Account | undefined {
    return this.account;
  }

  // Place a market order
  async placeMarketOrder(params: {
    pair: string;
    sizeDelta: bigint;
    collateralDelta: bigint;
    isLong: boolean;
    isIncrease: boolean;
    stopLossTriggerPrice?: bigint;
    takeProfitTriggerPrice?: bigint;
  }): Promise<{ success: boolean; error?: string; txHash?: string }> {
    try {
      if (!this.account || !this.merkleClient || !this.aptosClient) {
        return { success: false, error: "Wallet not connected" };
      }

      const orderPayload = this.merkleClient.payloads.placeMarketOrder({
        pair: params.pair,
        userAddress: this.account.accountAddress,
        sizeDelta: params.sizeDelta,
        collateralDelta: params.collateralDelta,
        isLong: params.isLong,
        isIncrease: params.isIncrease,
        stopLossTriggerPrice: params.stopLossTriggerPrice,
        takeProfitTriggerPrice: params.takeProfitTriggerPrice,
      });

      const transaction = await this.aptosClient.transaction.build.simple({
        sender: this.account.accountAddress,
        data: orderPayload,
      });

      const { hash } = await this.aptosClient.signAndSubmitTransaction({
        signer: this.account,
        transaction,
      });

      await this.aptosClient.waitForTransaction({ transactionHash: hash });

      return { success: true, txHash: hash };
    } catch (error) {
      console.error("Failed to place market order:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }

  // Get positions
  async getPositions(): Promise<{ positions: any[]; success: boolean; error?: string }> {
    try {
      if (!this.address || !this.merkleClient) {
        return { positions: [], success: false, error: "Wallet not connected" };
      }

      const positions = await this.merkleClient.api.getPositions({
        address: this.address as any,
      });

      return { positions, success: true };
    } catch (error) {
      console.error("Failed to get positions:", error);
      return { 
        positions: [], 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }

  // Get orders
  async getOrders(): Promise<{ orders: any[]; success: boolean; error?: string }> {
    try {
      if (!this.address || !this.merkleClient) {
        return { orders: [], success: false, error: "Wallet not connected" };
      }

      const orders = await this.merkleClient.api.getOrders({
        address: this.address as any,
      });

      return { orders, success: true };
    } catch (error) {
      console.error("Failed to get orders:", error);
      return { 
        orders: [], 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }
}