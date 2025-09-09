/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Position = {
  id: string
  symbol: string
  type: 'buy' | 'sell'
  lotSize: number
  entryPrice: number
  pips: number
  profit: number
}

type Props = {
  openPositions: Position[]
  closedPositions: (Position & { closePrice?: number })[]
  currentPrice: number
  showHistory: boolean
  onToggleHistory: () => void
  onClosePosition: (id: string) => void
}

export default function PositionsPanel({
  openPositions,
  closedPositions,
  currentPrice,
  showHistory,
  onToggleHistory,
  onClosePosition,
}: Props) {
  return (
    <Card className="bg-crypto-card border-crypto-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Open Positions</h3>
        <Button variant="outline" size="sm" onClick={onToggleHistory}>
          {showHistory ? 'Hide History' : 'Show History'}
        </Button>
      </div>

      {openPositions.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">No open positions</div>
      ) : (
        <div className="space-y-2">
          {openPositions.map((position) => (
            <div key={position.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-crypto-border">
              <div className="flex items-center space-x-4">
                <div className={`px-2 py-1 rounded text-xs font-medium ${position.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {position.type.toUpperCase()}
                </div>
                <div>
                  <div className="font-medium">{position.symbol}</div>
                  <div className="text-sm text-muted-foreground">Entry: ${position.entryPrice.toFixed(5)} | Lot: {position.lotSize}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${position.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>${position.profit.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">{position.pips.toFixed(1)} pips</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => onClosePosition(position.id)}>Close</Button>
            </div>
          ))}
        </div>
      )}

      {showHistory && closedPositions.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-3">Position History</h4>
          <div className="space-y-2">
            {closedPositions.map((position) => (
              <div key={position.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-crypto-border">
                <div className="flex items-center space-x-4">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${position.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {position.type.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{position.symbol}</div>
                    <div className="text-sm text-muted-foreground">Entry: ${position.entryPrice.toFixed(5)} | Close: ${position.closePrice?.toFixed(5)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${position.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>${position.profit.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">{position.pips.toFixed(1)} pips</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}


