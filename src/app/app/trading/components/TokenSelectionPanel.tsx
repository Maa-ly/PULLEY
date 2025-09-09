/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Bitcoin, TrendingUp, DollarSign } from "lucide-react"

interface TradingTokenData {
  symbol: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tradingViewSymbol: string;
  price: number;
  change: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

type Props = {
  tradingTokens: TradingTokenData[]
  selectedToken: string
  onTokenSelection: (tokenSymbol: string) => void
}

export default function TokenSelectionPanel({ tradingTokens, selectedToken, onTokenSelection }: Props) {
  return (
    <Card className="bg-crypto-card border-crypto-border p-6">
      <h3 className="text-lg font-semibold mb-4">Select Token</h3>
      <div className="space-y-2">
        {tradingTokens.map((token) => {
          const Icon = token.icon;
          return (
            <button
              key={token.symbol}
              onClick={() => onTokenSelection(token.symbol)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                selectedToken === token.symbol
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-crypto-border hover:bg-crypto-card'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-muted-foreground">{token.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${token.price.toLocaleString()}</div>
                <div className={`text-sm ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {token.change >= 0 ? '+' : ''}{token.change}%
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  )
}
