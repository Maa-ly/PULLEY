"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, Zap, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'
import { useWallet } from '@/hooks/useWallet'

interface WalletSelectorProps {
  onWalletConnected?: (type: 'evm' | 'aptos', address: string) => void
  className?: string
}

export function WalletSelector({ onWalletConnected, className }: WalletSelectorProps) {
  const {
    evmAddress,
    evmIsConnected,
    evmIsConnecting,
    aptosAddress,
    aptosIsConnected,
    aptosIsConnecting,
    activeWallet,
    activeAddress,
    isConnected,
    connectToEVM,
    connectToAptos,
    disconnect,
    switchWallet
  } = useWallet()
  
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectEVM = async () => {
    setIsConnecting(true)
    try {
      const result = await connectToEVM()
      if (result.success && result.address) {
        onWalletConnected?.('evm', result.address)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const handleConnectAptos = async () => {
    setIsConnecting(true)
    try {
      const result = await connectToAptos()
      if (result.success && result.address) {
        onWalletConnected?.('aptos', result.address)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const handleSwitchWallet = (type: 'evm' | 'aptos') => {
    switchWallet(type)
  }

  return (
    <Card className={`w-full max-w-4xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Connection
        </CardTitle>
        <CardDescription>
          Connect your wallet to start trading. Choose between EVM-compatible wallets or Aptos wallets.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connection Status */}
        {isConnected && activeAddress && (
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">
                Connected to {activeWallet === 'evm' ? 'EVM' : 'Aptos'} wallet
              </span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-300 mt-1">
              {activeAddress}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              className="mt-2"
            >
              Disconnect
            </Button>
          </div>
        )}

        {/* Wallet Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* EVM Wallets */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              EVM Wallets
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect with MetaMask, WalletConnect, or other EVM-compatible wallets
            </p>
            
            <div className="space-y-2">
              {evmIsConnected ? (
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div>
                    <div className="font-medium text-blue-800 dark:text-blue-200">
                      EVM Wallet Connected
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-300">
                      {evmAddress}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {activeWallet === 'evm' && (
                      <Badge variant="default">Active</Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSwitchWallet('evm')}
                      disabled={activeWallet === 'evm'}
                    >
                      {activeWallet === 'evm' ? 'Active' : 'Switch'}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleConnectEVM}
                  disabled={evmIsConnecting || isConnecting}
                  className="w-full"
                >
                  {evmIsConnecting || isConnecting ? 'Connecting...' : 'Connect EVM Wallet'}
                </Button>
              )}
            </div>
          </div>

          {/* Aptos Wallets */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Aptos Wallets
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect with Petra, Martian, or other Aptos-compatible wallets
            </p>
            
            <div className="space-y-2">
              {aptosIsConnected ? (
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div>
                    <div className="font-medium text-purple-800 dark:text-purple-200">
                      Aptos Wallet Connected
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-300">
                      {aptosAddress}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {activeWallet === 'aptos' && (
                      <Badge variant="default">Active</Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSwitchWallet('aptos')}
                      disabled={activeWallet === 'aptos'}
                    >
                      {activeWallet === 'aptos' ? 'Active' : 'Switch'}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleConnectAptos}
                  disabled={aptosIsConnecting || isConnecting}
                  className="w-full"
                >
                  {aptosIsConnecting || isConnecting ? 'Connecting...' : 'Connect Aptos Wallet'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Wallet Requirements */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-medium mb-1">Wallet Requirements:</p>
              <ul className="space-y-1 text-xs">
                <li>• <strong>EVM Wallets:</strong> For 1inch spot trading and DEX aggregation</li>
                <li>• <strong>Aptos Wallets:</strong> For Merkle Trade perpetual futures trading</li>
                <li>• You can connect both wallet types simultaneously</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
