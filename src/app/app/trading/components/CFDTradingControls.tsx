"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown } from "lucide-react"

// Lot size presets
const LOT_SIZE_PRESETS = [
  { label: '-0.5', value: -0.5 },
  { label: '-0.1', value: -0.1 },
  { label: '0.01', value: 0.01 },
  { label: '+0.1', value: 0.1 },
  { label: '+0.5', value: 0.5 }
];

// Risk:Reward ratios
const RISK_RATIOS = [
  { name: '1:3', value: 3 },
  { name: '1:5', value: 5 },
  { name: '1:7', value: 7 }
];

type Props = {
  tradeType: 'buy' | 'sell'
  setTradeType: (type: 'buy' | 'sell') => void
  lotSize: number
  setLotSize: (size: number) => void
  takeProfit: string
  setTakeProfit: (tp: string) => void
  stopLoss: string
  setStopLoss: (sl: string) => void
  selectedRatio: number | null
  setSelectedRatio: (ratio: number | null) => void
  selectedTokenSymbol?: string
  currentPrice: number
  tpPips: number
  slPips: number
  potentialProfit: number
  potentialLoss: number
  onTpFocus: () => void
  onSlFocus: () => void
  onApplyRiskRatio: (ratio: number) => void
  onOpenPosition: () => void
}

export default function CFDTradingControls({
  tradeType,
  setTradeType,
  lotSize,
  setLotSize,
  takeProfit,
  setTakeProfit,
  stopLoss,
  setStopLoss,
  selectedRatio,
  setSelectedRatio,
  selectedTokenSymbol,
  currentPrice,
  tpPips,
  slPips,
  potentialProfit,
  potentialLoss,
  onTpFocus,
  onSlFocus,
  onApplyRiskRatio,
  onOpenPosition,
}: Props) {
  return (
    <Card className="bg-crypto-card border-crypto-border p-6">
      <h3 className="text-lg font-semibold mb-4">Place CFD Trade</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Trade Type</label>
          <div className="flex space-x-2">
            <Button
              variant={tradeType === 'buy' ? 'default' : 'outline'}
              onClick={() => setTradeType('buy')}
              className="flex-1"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Buy
            </Button>
            <Button
              variant={tradeType === 'sell' ? 'default' : 'outline'}
              onClick={() => setTradeType('sell')}
              className="flex-1"
            >
              <TrendingDown className="w-4 h-4 mr-2" />
              Sell
            </Button>
          </div>
        </div>

        {/* Lot Size */}
        <div>
          <label className="block text-sm font-medium mb-2">Lot Size</label>
          <div className="space-y-2">
            <input
              type="text"
              value={lotSize === 0 ? '' : lotSize.toString()}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || value === '-') {
                  setLotSize(0);
                } else {
                  const numValue = parseFloat(value);
                  if (!isNaN(numValue)) {
                    setLotSize(numValue);
                  }
                }
              }}
              placeholder="Enter lot size"
              className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex space-x-1">
              {LOT_SIZE_PRESETS.map(preset => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setLotSize(preset.value)}
                  className="flex-1 text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Take Profit */}
        <div>
          <label className="block text-sm font-medium mb-2">Take Profit</label>
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            onFocus={onTpFocus}
            placeholder="Enter TP price"
            step="0.00001"
            className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {tpPips > 0 && (
            <div className="text-sm text-green-500 mt-1">
              {tpPips.toFixed(1)} pips | Profit: ${potentialProfit.toFixed(2)}
            </div>
          )}
        </div>

        {/* Stop Loss */}
        <div>
          <label className="block text-sm font-medium mb-2">Stop Loss</label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            onFocus={onSlFocus}
            placeholder="Enter SL price"
            step="0.00001"
            className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {slPips > 0 && (
            <div className="text-sm text-red-500 mt-1">
              {slPips.toFixed(1)} pips | Loss: ${potentialLoss.toFixed(2)}
            </div>
          )}
        </div>

        {/* Risk:Reward Ratio */}
        <div>
          <label className="block text-sm font-medium mb-2">Risk:Reward Ratio</label>
          <div className="flex space-x-2">
            {RISK_RATIOS.map(ratio => (
              <Button
                key={ratio.value}
                variant={selectedRatio === ratio.value ? 'default' : 'outline'}
                onClick={() => onApplyRiskRatio(ratio.value)}
                size="sm"
              >
                {ratio.name}
              </Button>
            ))}
          </div>
          {selectedRatio && (
            <div className="text-sm text-muted-foreground mt-1">
              Applied {selectedRatio}:1 ratio
            </div>
          )}
        </div>

        {/* Place Trade Button */}
        <div className="flex items-end">
          <Button 
            className="w-full"
            variant={tradeType === 'buy' ? 'default' : 'destructive'}
            onClick={onOpenPosition}
            disabled={!takeProfit || !stopLoss}
          >
            {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedTokenSymbol}
          </Button>
        </div>
      </div>
    </Card>
  )
}
