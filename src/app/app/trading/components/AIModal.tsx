"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type ExecutedOrder = { order: any; status: string; txHash?: string }
type FailedOrder = { order: any; error?: string }

type Props = {
  open: boolean
  onClose: () => void
  aiBudget: string
  setAiBudget: (v: string) => void
  aiTimeframe: 'scalp' | 'swing' | 'position'
  setAiTimeframe: (v: 'scalp' | 'swing' | 'position') => void
  aiRisk: 'low' | 'medium' | 'high'
  setAiRisk: (v: 'low' | 'medium' | 'high') => void
  aiIntent: string
  setAiIntent: (v: string) => void
  currentPrice: number
  selectedTokenName?: string
  selectedTokenSymbol?: string
  pair: { baseSymbol: string; quoteSymbol: string }
  aiLoading: boolean
  setAiLoading: (v: boolean) => void
  aiResult: any
  setAiResult: (v: any) => void
}

export default function AIModal(props: Props) {
  const {
    open,
    onClose,
    aiBudget,
    setAiBudget,
    aiTimeframe,
    setAiTimeframe,
    aiRisk,
    setAiRisk,
    aiIntent,
    setAiIntent,
    currentPrice,
    selectedTokenName,
    selectedTokenSymbol,
    pair,
    aiLoading,
    setAiLoading,
    aiResult,
    setAiResult,
  } = props

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 md:p-6 overflow-y-auto">
      <Card className="bg-crypto-card border-crypto-border w-full max-w-4xl p-4 md:p-6 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-crypto-card/95 backdrop-blur supports-[backdrop-filter]:bg-crypto-card/80 z-10 py-2">
          <h3 className="text-lg font-semibold">Trade with AI</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-muted-foreground">Selected Market</div>
            <div className="font-medium">{selectedTokenName} ({selectedTokenSymbol})</div>
            <div className="text-sm">Price: ${currentPrice.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Pair for Execution</div>
            <div className="font-medium">{pair.baseSymbol}/{pair.quoteSymbol}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Budget ({pair.quoteSymbol})</label>
            <input type="number" value={aiBudget} onChange={(e) => setAiBudget(e.target.value)} className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" min="1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Timeframe</label>
            <select value={aiTimeframe} onChange={(e) => setAiTimeframe(e.target.value as any)} className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="scalp">Scalp</option>
              <option value="swing">Swing</option>
              <option value="position">Position</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Risk</label>
            <select value={aiRisk} onChange={(e) => setAiRisk(e.target.value as any)} className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Intent</label>
          <input type="text" value={aiIntent} onChange={(e) => setAiIntent(e.target.value)} className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">The AI will propose and execute multiple limit orders if beneficial.</div>
          <Button
            onClick={async () => {
              setAiLoading(true)
              setAiResult(null)
              try {
                const marketSnapshot = {}
                const res = await fetch('/api/agent', {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({
                    userIntent: aiIntent,
                    budget: aiBudget,
                    baseSymbol: pair.baseSymbol,
                    quoteSymbol: pair.quoteSymbol,
                    timeframe: aiTimeframe,
                    riskTolerance: aiRisk,
                    marketSnapshot,
                  }),
                })
                const data = await res.json()
                setAiResult(data)
              } catch (e) {
                setAiResult({ error: (e as Error).message || 'Agent error' })
              } finally {
                setAiLoading(false)
              }
            }}
            disabled={aiLoading}
          >
            {aiLoading ? 'Running...' : 'Execute with AI'}
          </Button>
        </div>

        {aiResult && (
          <div className="mt-6 border-t pt-4 space-y-3">
            {aiResult.error && <div className="text-red-500 text-sm">{aiResult.error}</div>}
            {!aiResult.error && (
              <>
                <div className="text-sm text-muted-foreground">Rationale</div>
                <div className="p-3 bg-background rounded border border-crypto-border whitespace-pre-wrap text-sm">
                  {aiResult.rationale || 'No rationale returned'}
                </div>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}


