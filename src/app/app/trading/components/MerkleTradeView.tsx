"use client"

import React from "react"
import { AptosWalletSelector } from "@/components/AptosWalletSelector"
import { MerkleDashboard } from "@/components/merkle/MerkleDashboard"

type Props = {
  aptosIsConnected: boolean
  aptosAddress?: string | null
  onWalletConnected: (type: 'evm' | 'aptos', address: string) => void
}

export default function MerkleTradeView({ aptosIsConnected, aptosAddress, onWalletConnected }: Props) {
  return (
    <div className="space-y-4">
      {!aptosIsConnected ? (
        <div className="flex justify-center">
          <AptosWalletSelector />
        </div>
      ) : (
        <MerkleDashboard walletAddress={aptosAddress || ''} isConnected={aptosIsConnected} />
      )}
    </div>
  )
}


