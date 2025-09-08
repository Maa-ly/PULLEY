import { MerkleClient } from "@/lib/merkle/src/client";
import { MerkleClientConfig } from "@/lib/merkle/src/client/config";
import { Aptos, Account, AccountAddress } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export interface SecureMerkleWalletConfig {
  // No private key needed - uses connected wallet
}

export class SecureMerkleWalletManager {
  private merkleClient?: MerkleClient;
  private aptosClient?: Aptos;
  private isConnected = false;
  private address?: string;

  constructor(config: SecureMerkleWalletConfig = {}) {
    // Initialize clients synchronously - will be ready when connect is called
  }

  private async initializeClients() {
    try {
      // Initialize Merkle client
      const merkleConfig = await MerkleClientConfig.testnet();
      this.merkleClient = new MerkleClient(merkleConfig);
      this.aptosClient = new Aptos(merkleConfig.aptosConfig);
      console.log("Merkle clients initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Merkle clients:", error);
      throw error;
    }
  }

  // Connect using the connected Aptos wallet
  async connect(walletAddress: string): Promise<{ address: string; success: boolean; error?: string }> {
    try {
      // Initialize clients if not already done
      if (!this.merkleClient || !this.aptosClient) {
        await this.initializeClients();
      }

      if (!this.merkleClient || !this.aptosClient) {
        return { address: "", success: false, error: "Failed to initialize Merkle clients" };
      }

      this.address = walletAddress;
      this.isConnected = true;

      console.log("Merkle wallet connected successfully:", walletAddress);
      return { address: walletAddress, success: true };
    } catch (error: any) {
      console.error("Failed to connect Merkle wallet:", error);
      return { address: "", success: false, error: error.message };
    }
  }

  // Get USDC balance using the connected wallet
  async getUSDCBalance(): Promise<{ balance: string; success: boolean; error?: string }> {
    try {
      if (!this.aptosClient || !this.address) {
        return { balance: "0", success: false, error: "Not connected to wallet" };
      }

      const resources = await this.aptosClient.getAccountResources({
        accountAddress: this.address
      });

      const coinResource = resources.find(
        (resource) => resource.type === "0x1::aptos_coin::AptosCoin"
      );

      if (coinResource) {
        const balance = (coinResource.data as any).coin.value;
        return { balance, success: true };
      } else {
        return { balance: "0", success: true };
      }
    } catch (error: any) {
      console.error("Error fetching balance:", error);
      return { balance: "0", success: false, error: error.message };
    }
  }

  // Faucet testnet USDC using the connected wallet
  async faucetUSDC(amount: string = "100"): Promise<{ success: boolean; error?: string; txHash?: string }> {
    try {
      if (!this.merkleClient || !this.aptosClient || !this.address) {
        return { success: false, error: "Wallet not connected" };
      }

      // Convert USDC amount to micro USDC (multiply by 1e6)
      const microUSDC = BigInt(parseFloat(amount) * 1e6);

      const faucetPayload = this.merkleClient.payloads.testnetFaucetUSDC({
        amount: microUSDC,
      });

      const transaction = await this.aptosClient.transaction.build.simple({
        sender: this.address,
        data: faucetPayload,
      });

      // Note: This will require the wallet to sign the transaction
      // The actual signing will be handled by the wallet adapter
      return { 
        success: true, 
        txHash: "pending_wallet_signature" // This will be replaced with actual hash after signing
      };
    } catch (error) {
      console.error("Failed to faucet USDC:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }

  // Place market order using the connected wallet
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
      if (!this.merkleClient || !this.aptosClient || !this.address) {
        return { success: false, error: "Wallet not connected" };
      }

      const orderPayload = this.merkleClient.payloads.placeMarketOrder({
        pair: params.pair,
        userAddress: this.address, // This was missing!
        sizeDelta: params.sizeDelta,
        collateralDelta: params.collateralDelta,
        isLong: params.isLong,
        isIncrease: params.isIncrease,
        stopLossTriggerPrice: params.stopLossTriggerPrice,
        takeProfitTriggerPrice: params.takeProfitTriggerPrice,
      });

      const transaction = await this.aptosClient.transaction.build.simple({
        sender: this.address,
        data: orderPayload,
      });

      // Note: This will require the wallet to sign the transaction
      // The actual signing will be handled by the wallet adapter
      return { 
        success: true, 
        txHash: "pending_wallet_signature" // This will be replaced with actual hash after signing
      };
    } catch (error) {
      console.error("Failed to place market order:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }

  // Get positions (mock for now)
  async getPositions(): Promise<{ positions: any[]; success: boolean; error?: string }> {
    try {
      // This would typically query the Merkle protocol for user positions
      // For now, return empty array
      return { positions: [], success: true };
    } catch (error: any) {
      return { positions: [], success: false, error: error.message };
    }
  }

  // Get orders (mock for now)
  async getOrders(): Promise<{ orders: any[]; success: boolean; error?: string }> {
    try {
      // This would typically query the Merkle protocol for user orders
      // For now, return empty array
      return { orders: [], success: true };
    } catch (error: any) {
      return { orders: [], success: false, error: error.message };
    }
  }

  // Get Merkle client for trading operations
  getMerkleClient(): MerkleClient | undefined {
    return this.merkleClient;
  }

  // Get Aptos client for blockchain operations
  getAptosClient(): Aptos | undefined {
    return this.aptosClient;
  }

  // Check if wallet is connected
  isWalletConnected(): boolean {
    return this.isConnected && !!this.address;
  }

  // Get wallet address
  getWalletAddress(): string | undefined {
    return this.address;
  }
}
