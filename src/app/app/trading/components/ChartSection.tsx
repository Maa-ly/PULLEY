"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TradingViewChart from "@/components/TradingViewChart"

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
  selectedTokenData?: TradingTokenData
  currentPrice: number
}

export default function ChartSection({ selectedTokenData, currentPrice }: Props) {
  return (
    <Card className="bg-crypto-card border-crypto-border p-6 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {selectedTokenData?.name} ({selectedTokenData?.symbol})
        </h3>
        <div className="flex items-center space-x-4">
          {/* Chart Period Controls */}
          <div className="flex space-x-1">
            {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
              <Button
                key={period}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {period}
              </Button>
            ))}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${currentPrice.toLocaleString()}</div>
            <div className={`text-sm ${selectedTokenData?.change && selectedTokenData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {selectedTokenData?.change && selectedTokenData.change >= 0 ? '+' : ''}{selectedTokenData?.change}%
            </div>
          </div>
        </div>
      </div>
      
      {/* TradingView Chart */}
      <div className="h-83 bg-background rounded-lg border border-crypto-border overflow-hidden">
        <TradingViewChart 
          symbol={selectedTokenData?.tradingViewSymbol || 'BTCUSDT'} 
          height={332}
          width="100%"
        />
      </div>

      {/* OHLC Data */}
      {selectedTokenData && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Open</div>
            <div className="font-medium">${selectedTokenData.open.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">High</div>
            <div className="font-medium text-green-500">${selectedTokenData.high.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Low</div>
            <div className="font-medium text-red-500">${selectedTokenData.low.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Volume</div>
            <div className="font-medium">${selectedTokenData.volume.toLocaleString()}</div>
          </div>
        </div>
      )}
    </Card>
  )
}
