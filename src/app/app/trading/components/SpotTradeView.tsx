"use client"

import React from "react"
import TradingViewChart from "@/components/TradingViewChart"
import { Card } from "@/components/ui/card"

type Props = {
  selectedTokenName?: string
  selectedTokenSymbol?: string
  selectedTradingViewSymbol?: string
}

export default function SpotTradeView({ selectedTokenName, selectedTokenSymbol, selectedTradingViewSymbol }: Props) {
  return (
    <Card className="bg-crypto-card border-crypto-border p-6">
      <h3 className="text-lg font-semibold mb-4">1inch Trading</h3>
      <div className="h-83 bg-background rounded-lg border border-crypto-border overflow-hidden">
        <TradingViewChart 
          symbol={selectedTradingViewSymbol || 'BTCUSDT'} 
          height={332}
          width="100%"
        />
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        {selectedTokenName} ({selectedTokenSymbol})
      </div>
    </Card>
  )
}


