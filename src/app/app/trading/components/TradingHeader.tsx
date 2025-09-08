"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"

type WalletStatus = { isConnected: boolean; formattedAddress?: string | null }

type Props = {
  hasApiKey: boolean
  walletStatus: WalletStatus
  onOpenAI: () => void
  tradingMode: 'merkle' | '1inch'
}

export default function TradingHeader({ hasApiKey, walletStatus, onOpenAI, tradingMode }: Props) {
  const getTitle = () => {
    switch (tradingMode) {
      case 'merkle':
        return 'Merkle Perpetual Trading';
      case '1inch':
        return '1inch Spot Trading';
      default:
        return 'Trading Platform';
    }
  };

  const getStatusBadge = () => {
    if (tradingMode === 'merkle') {
      return (
        <Badge variant="default">
          ✅ Aptos Wallet Connected
        </Badge>
      );
    } else {
      return (
        <Badge variant={hasApiKey ? "default" : "secondary"}>
          {hasApiKey ? "✅ 1inch API Connected" : "❌ 1inch API Missing"}
        </Badge>
      );
    }
  };

  const getWalletBadge = () => {
    if (walletStatus.isConnected && walletStatus.formattedAddress) {
      if (tradingMode === 'merkle') {
        return (
          <Badge variant="outline">
            🔗 {walletStatus.formattedAddress}
          </Badge>
        );
      } else {
        return (
          <Badge variant="outline">
            🦊 {walletStatus.formattedAddress}
          </Badge>
        );
      }
    }
    return null;
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">{getTitle()}</h1>
      <div className="flex items-center gap-2">
        {getStatusBadge()}
        {getWalletBadge()}
        <Button variant="outline" size="sm" onClick={onOpenAI} className="hover:text-white text-white">
          <Brain className="w-4 h-4 mr-2" />
          Trade with AI
        </Button>
      </div>
    </div>
  )}


