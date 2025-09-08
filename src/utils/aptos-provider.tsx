"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Aptos, Account, Ed25519PrivateKey, PrivateKey, PrivateKeyVariants } from '@aptos-labs/ts-sdk'

// Aptos Wallet Context
interface AptosWalletContextType {
  // Connection state
  isConnected: boolean
  isConnecting: boolean
  address: string | null
  account: Account | null
  
  // Connection methods
  connect: () => Promise<{ success: boolean; address?: string; error?: string }>
  disconnect: () => void
  
  // Account methods
  getBalance: (coinType?: string) => Promise<{ balance: string; success: boolean; error?: string }>
  signAndSubmitTransaction: (transaction: any) => Promise<{ hash?: string; success: boolean; error?: string }>
}

const AptosWalletContext = createContext<AptosWalletContextType | undefined>(undefined)

// Aptos Wallet Provider Props
interface AptosWalletProviderProps {
  children: ReactNode
  network?: 'testnet' | 'mainnet' | 'devnet'
}

// Aptos Wallet Provider Component
export function AptosWalletProvider({ 
  children, 
  network = 'testnet' 
}: AptosWalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [account, setAccount] = useState<Account | null>(null)
  const [aptosClient, setAptosClient] = useState<Aptos | null>(null)

  // Initialize Aptos client
  useEffect(() => {
    const initAptosClient = () => {
      const config = {
        network: network === 'testnet' 
          ? 'https://fullnode.testnet.aptoslabs.com/v1'
          : network === 'mainnet'
          ? 'https://fullnode.mainnet.aptoslabs.com/v1'
          : 'https://fullnode.devnet.aptoslabs.com/v1'
      }
      
      const client = new Aptos(config)
      setAptosClient(client)
    }

    initAptosClient()
  }, [network])

  // Connect to Aptos wallet
  const connect = async (): Promise<{ success: boolean; address?: string; error?: string }> => {
    if (!aptosClient) {
      return { success: false, error: 'Aptos client not initialized' }
    }

    setIsConnecting(true)
    
    try {
      // Check if wallet is available
      if (typeof window === 'undefined' || !window.aptos) {
        return { 
          success: false, 
          error: 'Aptos wallet not found. Please install Petra or Martian wallet.' 
        }
      }

      // Connect to wallet
      const response = await window.aptos.connect()
      
      if (response) {
        const walletAddress = response.address
        setAddress(walletAddress)
        setIsConnected(true)
        
        // Create account from wallet address
        const aptosAccount = Account.fromAddress({ address: walletAddress })
        setAccount(aptosAccount)
        
        return { success: true, address: walletAddress }
      } else {
        return { success: false, error: 'Failed to connect to wallet' }
      }
    } catch (error: any) {
      console.error('Aptos wallet connection error:', error)
      return { 
        success: false, 
        error: error.message || 'Failed to connect to Aptos wallet' 
      }
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect from Aptos wallet
  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setAccount(null)
    
    // Disconnect from wallet if available
    if (typeof window !== 'undefined' && window.aptos?.disconnect) {
      window.aptos.disconnect()
    }
  }

  // Get account balance
  const getBalance = async (coinType: string = '0x1::aptos_coin::AptosCoin'): Promise<{ balance: string; success: boolean; error?: string }> => {
    if (!aptosClient || !address) {
      return { balance: '0', success: false, error: 'Not connected to wallet' }
    }

    try {
      const resources = await aptosClient.getAccountResources({
        accountAddress: address
      })

      const coinResource = resources.find(
        (resource) => resource.type === coinType
      )

      if (coinResource) {
        const balance = (coinResource.data as any).coin.value
        return { balance, success: true }
      } else {
        return { balance: '0', success: true }
      }
    } catch (error: any) {
      console.error('Error fetching balance:', error)
      return { balance: '0', success: false, error: error.message }
    }
  }

  // Sign and submit transaction
  const signAndSubmitTransaction = async (transaction: any): Promise<{ hash?: string; success: boolean; error?: string }> => {
    if (!aptosClient || !address) {
      return { success: false, error: 'Not connected to wallet' }
    }

    try {
      // Sign transaction with wallet
      const response = await window.aptos.signAndSubmitTransaction(transaction)
      
      if (response) {
        return { hash: response.hash, success: true }
      } else {
        return { success: false, error: 'Transaction failed' }
      }
    } catch (error: any) {
      console.error('Transaction error:', error)
      return { success: false, error: error.message || 'Transaction failed' }
    }
  }

  const value: AptosWalletContextType = {
    isConnected,
    isConnecting,
    address,
    account,
    connect,
    disconnect,
    getBalance,
    signAndSubmitTransaction
  }

  return (
    <AptosWalletContext.Provider value={value}>
      {children}
    </AptosWalletContext.Provider>
  )
}

// Hook to use Aptos wallet context
export function useAptosWallet(): AptosWalletContextType {
  const context = useContext(AptosWalletContext)
  if (context === undefined) {
    throw new Error('useAptosWallet must be used within an AptosWalletProvider')
  }
  return context
}

// Extend Window interface for Aptos wallet
declare global {
  interface Window {
    aptos?: {
      connect: () => Promise<{ address: string }>
      disconnect: () => Promise<void>
      signAndSubmitTransaction: (transaction: any) => Promise<{ hash: string }>
      account: () => Promise<{ address: string }>
      network: () => Promise<{ chainId: string }>
    }
  }
}
