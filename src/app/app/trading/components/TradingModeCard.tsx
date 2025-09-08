"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Zap } from "lucide-react"

type Props = {
  tradingMode: '1inch' | 'merkle'
  onSelect: (mode: '1inch' | 'merkle') => void
}

export default function TradingModeCard({ tradingMode, onSelect }: Props) {
  return (
    <Card className="bg-crypto-card border-crypto-border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Trading Mode</h3>
        <div className="flex space-x-2">
          <Button
            variant={tradingMode === 'merkle' ? 'default' : 'outline'}
            onClick={() => onSelect('merkle')}
            size="sm"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Merkle Trading
          </Button>
          <Button
            variant={tradingMode === '1inch' ? 'default' : 'outline'}
            onClick={() => onSelect('1inch')}
            size="sm"
            className="text-white hover:text-white"
          >
            <Zap className="w-4 h-4 mr-2" />
            1inch DEX Trading
          </Button>
        </div>
      </div>
    </Card>
  )
}


