/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { SecureMerkleWalletManager } from '@/lib/wallet/secure-merkle-wallet';
import { useToast } from '@/components/ui/use-toast';

export function useSecureMerkleWallet() {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();
  
  const [walletManager, setWalletManager] = useState<SecureMerkleWalletManager | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize wallet manager when connected
  useEffect(() => {
    if (connected && account?.address) {
      const manager = new SecureMerkleWalletManager();
      manager.connect(account.address.toString()).then((result) => {
        if (result.success) {
          setWalletManager(manager);
          setError(null);
        } else {
          setError(result.error || "Failed to connect Merkle wallet");
        }
      });
    } else {
      setWalletManager(null);
    }
  }, [connected, account?.address]);

  // Faucet USDC with wallet signing
  const faucetUSDC = useCallback(async (amount: string = "1") => {
    if (!walletManager || !account?.address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Aptos wallet first",
        variant: "destructive",
      });
      return { success: false, error: "Wallet not connected" };
    }

    setIsLoading(true);
    setError(null);

    try {
      // First, check if user has enough APT for gas fees
      const aptosClient = walletManager.getAptosClient();
      if (!aptosClient) {
        throw new Error("Aptos client not available");
      }

      // Get account resources to check APT balance
      const resources = await aptosClient.getAccountResources({
        accountAddress: account.address.toString()
      });

      const aptResource = resources.find(
        (resource) => resource.type === "0x1::aptos_coin::AptosCoin"
      );

      const aptBalance = aptResource ? (aptResource.data as any).coin.value : "0";
      const aptBalanceNumber = parseInt(aptBalance);
      
      console.log("APT Balance check:", {
        balance: aptBalance,
        balanceNumber: aptBalanceNumber,
        balanceInAPT: (aptBalanceNumber / 100000000).toFixed(4),
        minimumRequired: "0.01 APT"
      });

      // Check if user has enough APT for gas fees
      if (aptBalanceNumber < 1000000) { // 0.01 APT in octas
        const errorMessage = `Insufficient APT balance for gas fees. You have ${(aptBalanceNumber / 100000000).toFixed(4)} APT but need at least 0.01 APT. Please get APT from the Aptos testnet faucet or use a wallet with APT balance.`;
        
        toast({
          title: "Insufficient APT Balance",
          description: "You need APT for gas fees. Get APT from Aptos testnet faucet.",
          variant: "destructive",
        });
        
        throw new Error(errorMessage);
      }

      // Convert USDC amount to micro USDC
      const microUSDC = BigInt(parseFloat(amount) * 1e6);

      // Create the Merkle USDC faucet transaction payload
      const merkleClient = walletManager.getMerkleClient();
      if (!merkleClient) {
        throw new Error("Merkle client not available");
      }

      const faucetPayload = merkleClient.payloads.testnetFaucetUSDC({
        amount: microUSDC,
      });

      // Build the transaction with proper gas settings
      const transaction = await aptosClient.transaction.build.simple({
        sender: account.address,
        data: faucetPayload,
        options: {
          maxGasAmount: 200000, // Higher gas limit for faucet
          gasUnitPrice: 100, // Set gas unit price
        },
      });

      // Sign and submit using the connected wallet
      const response = await signAndSubmitTransaction({
        data: {
          function: faucetPayload.function,
          typeArguments: [],
          functionArguments: faucetPayload.functionArguments,
        },
      });

      // Wait for transaction confirmation
      await aptosClient.waitForTransaction({
        transactionHash: response.hash,
      });

      toast({
        title: "USDC Claimed Successfully!",
        description: `${amount} USDC has been added to your wallet`,
        variant: "default",
      });

      return { success: true, txHash: response.hash };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to claim USDC";
      setError(errorMessage);
      
      toast({
        title: "Faucet Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [walletManager, account?.address, signAndSubmitTransaction, toast]);

  // Place market order with wallet signing
  const placeMarketOrder = useCallback(async (params: {
    pair: string;
    size: string;
    collateral: string;
    isLong: boolean;
    stopLoss?: string;
    takeProfit?: string;
  }) => {
    if (!walletManager || !account?.address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Aptos wallet first",
        variant: "destructive",
      });
      return { success: false, error: "Wallet not connected" };
    }

    setIsLoading(true);
    setError(null);

    try {
      // Convert to micro USDC
      const sizeDelta = BigInt(parseFloat(params.size) * 1e6);
      const collateralDelta = BigInt(parseFloat(params.collateral) * 1e6);
      const stopLossTriggerPrice = params.stopLoss ? BigInt(parseFloat(params.stopLoss) * 1e6) : undefined;
      const takeProfitTriggerPrice = params.takeProfit ? BigInt(parseFloat(params.takeProfit) * 1e6) : undefined;

      // Get the transaction payload from the wallet manager
      const merkleClient = walletManager.getMerkleClient();
      if (!merkleClient) {
        throw new Error("Merkle client not available");
      }

      // Ensure we have a valid account address
      if (!account?.address) {
        throw new Error("Account address is not available");
      }

      const userAddress = account.address.toString();
      console.log("Placing order with user address:", userAddress);
      console.log("Order parameters:", {
        pair: params.pair,
        sizeDelta: sizeDelta.toString(),
        collateralDelta: collateralDelta.toString(),
        isLong: params.isLong,
        isIncrease: true,
      });

      const orderPayload = merkleClient.payloads.placeMarketOrder({
        pair: params.pair,
        userAddress: userAddress,
        sizeDelta,
        collateralDelta,
        isLong: params.isLong,
        isIncrease: true,
        stopLossTriggerPrice,
        takeProfitTriggerPrice,
      });

      // Get Aptos client for transaction building
      const orderAptosClient = walletManager.getAptosClient();
      if (!orderAptosClient) {
        throw new Error("Aptos client not available");
      }

      // Build the transaction with proper gas settings
      const orderTransaction = await orderAptosClient.transaction.build.simple({
        sender: account.address,
        data: orderPayload,
        options: {
          maxGasAmount: 200000, // Higher gas limit for complex trading transactions
          gasUnitPrice: 100, // Set gas unit price
        },
      });

      // Sign and submit using the connected wallet
      const response = await signAndSubmitTransaction({
        data: {
          function: orderPayload.function,
          typeArguments: [],
          functionArguments: orderPayload.functionArguments,
        },
      });

      // Wait for transaction confirmation
      const aptosClient = walletManager.getAptosClient();
      if (aptosClient) {
        await aptosClient.waitForTransaction({
          transactionHash: response.hash,
        });
      }

      toast({
        title: "Order Placed Successfully!",
        description: `Your ${params.isLong ? 'long' : 'short'} order for ${params.size} ${params.pair} has been placed`,
        variant: "default",
      });

      return { success: true, txHash: response.hash };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to place order";
      setError(errorMessage);
      
      toast({
        title: "Order Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [walletManager, account?.address, signAndSubmitTransaction, toast]);

  // Get USDC balance
  const getUSDCBalance = useCallback(async () => {
    if (!walletManager) {
      return { balance: "0", success: false, error: "Wallet not connected" };
    }

    return await walletManager.getUSDCBalance();
  }, [walletManager]);

  // Get positions
  const getPositions = useCallback(async () => {
    if (!walletManager) {
      return { positions: [], success: false, error: "Wallet not connected" };
    }

    return await walletManager.getPositions();
  }, [walletManager]);

  // Get orders
  const getOrders = useCallback(async () => {
    if (!walletManager) {
      return { orders: [], success: false, error: "Wallet not connected" };
    }

    return await walletManager.getOrders();
  }, [walletManager]);

  return {
    walletManager,
    isLoading,
    error,
    isConnected: connected && !!account?.address,
    walletAddress: account?.address?.toString(),
    faucetUSDC,
    placeMarketOrder,
    getUSDCBalance,
    getPositions,
    getOrders,
  };
}
