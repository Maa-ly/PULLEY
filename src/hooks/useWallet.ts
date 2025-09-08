"use client"

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react'
import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

export type WalletType = 'evm' | 'aptos'

export interface WalletState {
  // EVM Wallet (via Wagmi)
  evmAddress: string | undefined
  evmIsConnected: boolean
  evmIsConnecting: boolean
  
  // Aptos Wallet
  aptosAddress: string | null
  aptosIsConnected: boolean
  aptosIsConnecting: boolean
  
  // Combined state
  activeWallet: WalletType | null
  activeAddress: string | null
  isConnected: boolean
}

export function useWallet() {
  // EVM wallet state
  const { address: evmAddress, isConnected: evmIsConnected } = useAccount()
  const { connect: connectEVM, isPending: evmIsConnecting } = useConnect()
  const { disconnect: disconnectEVM } = useDisconnect()
  
  // Aptos wallet state
  const {
    account: aptosAccount,
    connected: aptosIsConnected,
    connect: connectAptos,
    disconnect: disconnectAptos
  } = useAptosWallet()
  
  const aptosAddress = aptosAccount?.address?.toString() || null
  const aptosIsConnecting = false // This will be handled by the wallet adapter
  
  // Local state for active wallet type
  const [activeWallet, setActiveWallet] = useState<WalletType | null>(null)
  
  // Toast notifications
  const { toast } = useToast()
  
  // Determine active wallet and address
  const activeAddress = activeWallet === 'evm' ? evmAddress : 
                       activeWallet === 'aptos' ? aptosAddress : 
                       null
  
  const isConnected = activeWallet === 'evm' ? evmIsConnected :
                     activeWallet === 'aptos' ? aptosIsConnected :
                     false
  
  // Connect to EVM wallet
  const connectToEVM = async () => {
    try {
      await connectEVM()
      setActiveWallet('evm')
      
      // Show success toast
      toast({
        title: "EVM Wallet Connected",
        description: `Successfully connected to EVM wallet`,
        variant: "default",
      })
      
      return { success: true, address: evmAddress }
    } catch (error: any) {
      // Show error toast
      toast({
        title: "EVM Connection Failed",
        description: error.message || "Failed to connect EVM wallet",
        variant: "destructive",
      })
      
      return { success: false, error: error.message }
    }
  }
  
  // Connect to Aptos wallet
  const connectToAptos = async () => {
    try {
      await connectAptos()
      setActiveWallet('aptos')
      
      // Show success toast
      toast({
        title: "Aptos Wallet Connected",
        description: `Successfully connected to Aptos wallet`,
        variant: "default",
      })
      
      return { success: true, address: aptosAddress }
    } catch (error: any) {
      // Show error toast
      toast({
        title: "Aptos Connection Failed",
        description: error.message || "Failed to connect Aptos wallet",
        variant: "destructive",
      })
      
      return { success: false, error: error.message }
    }
  }
  
  // Disconnect from active wallet
  const disconnect = () => {
    if (activeWallet === 'evm') {
      disconnectEVM()
      toast({
        title: "EVM Wallet Disconnected",
        description: "Successfully disconnected from EVM wallet",
        variant: "default",
      })
    } else if (activeWallet === 'aptos') {
      disconnectAptos()
      toast({
        title: "Aptos Wallet Disconnected",
        description: "Successfully disconnected from Aptos wallet",
        variant: "default",
      })
    }
    setActiveWallet(null)
  }
  
  // Switch wallet type
  const switchWallet = (type: WalletType) => {
    if (type === 'evm' && evmIsConnected) {
      setActiveWallet('evm')
      toast({
        title: "Switched to EVM Wallet",
        description: "Now using EVM wallet for transactions",
        variant: "default",
      })
    } else if (type === 'aptos' && aptosIsConnected) {
      setActiveWallet('aptos')
      toast({
        title: "Switched to Aptos Wallet",
        description: "Now using Aptos wallet for transactions",
        variant: "default",
      })
    } else {
      toast({
        title: "Wallet Not Connected",
        description: `Please connect your ${type} wallet first`,
        variant: "destructive",
      })
    }
  }
  
  return {
    // Individual wallet states
    evmAddress,
    evmIsConnected,
    evmIsConnecting,
    aptosAddress,
    aptosIsConnected,
    aptosIsConnecting,
    
    // Combined state
    activeWallet,
    activeAddress,
    isConnected,
    
    // Connection methods
    connectToEVM,
    connectToAptos,
    disconnect,
    switchWallet,
    
    // Individual wallet methods
    connectEVM,
    disconnectEVM,
    connectAptos,
    disconnectAptos
  }
}
