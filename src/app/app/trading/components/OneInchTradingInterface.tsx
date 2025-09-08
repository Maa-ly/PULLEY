"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TradingViewChart from "@/components/TradingViewChart"
import { 
  type TokenInfo,
  type QuoteResponse,
  type ChartPeriod,
  type CandlePeriod
} from '@/lib/1inch'

interface Balance {
  address: string;
  symbol: string;
  name: string;
  balance: string;
}

interface LimitOrder {
  orderHash: string;
  makerAsset: string;
  takerAsset: string;
  makingAmount: string;
  status: string;
}

type Props = {
  tokens: TokenInfo[]
  tokensLoading: boolean
  selectedFromToken: string
  setSelectedFromToken: (token: string) => void
  selectedToToken: string
  setSelectedToToken: (token: string) => void
  amount: string
  setAmount: (amount: string) => void
  quote: QuoteResponse | null
  isLoadingQuote: boolean
  onFetchQuote: () => void
  limitPrice: string
  setLimitPrice: (price: string) => void
  onCreateLimitOrder: () => void
  walletStatus: { isConnected: boolean; address: string | null }
  balances: Balance[]
  limitOrders: LimitOrder[]
  onCancelLimitOrder: (orderHash: string) => void
  selectedChartPeriod: ChartPeriod
  setSelectedChartPeriod: (period: ChartPeriod) => void
  selectedCandlePeriod: CandlePeriod
  setSelectedCandlePeriod: (period: CandlePeriod) => void
  lineChartData: unknown
  candleChartData: unknown
  isLoadingChart: boolean
}

export default function OneInchTradingInterface({
  tokens,
  tokensLoading,
  selectedFromToken,
  setSelectedFromToken,
  selectedToToken,
  setSelectedToToken,
  amount,
  setAmount,
  quote,
  isLoadingQuote,
  onFetchQuote,
  limitPrice,
  setLimitPrice,
  onCreateLimitOrder,
  walletStatus,
  balances,
  limitOrders,
  onCancelLimitOrder,
  selectedChartPeriod,
  setSelectedChartPeriod,
  selectedCandlePeriod,
  setSelectedCandlePeriod,
  lineChartData,
  candleChartData,
  isLoadingChart,
}: Props) {
  const getTokenByAddress = (address: string): TokenInfo | undefined => {
    return tokens.find(t => t.address.toLowerCase() === address.toLowerCase());
  };

  const formatTokenAmount = (amount: string, decimals: number = 18): string => {
    const num = parseFloat(amount) / Math.pow(10, decimals);
    return num.toFixed(6);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Selection */}
        <Card className="bg-crypto-card border-crypto-border p-6">
          <h3 className="text-lg font-semibold mb-4">Select Tokens</h3>
          <div className="space-y-4">
            {/* From Token */}
            <div>
              <label className="block text-sm font-medium mb-2">From Token</label>
              <select
                value={selectedFromToken}
                onChange={(e) => setSelectedFromToken(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select token</option>
                {tokensLoading ? (
                  <option value="loading" disabled>Loading tokens...</option>
                ) : (
                  tokens.map((token) => (
                    <option key={token.address} value={token.address}>
                      {token.symbol} - {token.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* To Token */}
            <div>
              <label className="block text-sm font-medium mb-2">To Token</label>
              <select
                value={selectedToToken}
                onChange={(e) => setSelectedToToken(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select token</option>
                {tokensLoading ? (
                  <option value="loading" disabled>Loading tokens...</option>
                ) : (
                  tokens.map((token) => (
                    <option key={token.address} value={token.address}>
                      {token.symbol} - {token.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Get Quote Button */}
            <Button 
              onClick={onFetchQuote}
              disabled={!selectedFromToken || !selectedToToken || !amount || isLoadingQuote}
              className="w-full"
            >
              {isLoadingQuote ? 'Loading...' : 'Get Quote'}
            </Button>
          </div>
        </Card>

        {/* Chart and Quote Display */}
        <Card className="bg-crypto-card border-crypto-border p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {selectedFromToken && selectedToToken ? `${getTokenByAddress(selectedFromToken)?.symbol}/${getTokenByAddress(selectedToToken)?.symbol} Chart` : 'Chart'}
            </h3>
            <div className="flex items-center gap-2">
              {/* Chart Period Selector */}
              <div className="flex space-x-1">
                {(['24H', '1W', '1M', '1Y'] as ChartPeriod[]).map((period) => (
                  <Button
                    key={period}
                    variant={selectedChartPeriod === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedChartPeriod(period)}
                    className="text-xs"
                  >
                    {period}
                  </Button>
                ))}
              </div>
              {/* Candle Period Selector */}
              <select
                value={selectedCandlePeriod}
                onChange={(e) => setSelectedCandlePeriod(Number(e.target.value) as CandlePeriod)}
                className="px-2 py-1 text-xs bg-background border border-crypto-border rounded"
              >
                <option value={300}>5m</option>
                <option value={900}>15m</option>
                <option value={3600}>1h</option>
                <option value={14400}>4h</option>
                <option value={86400}>1d</option>
                <option value={604800}>1w</option>
              </select>
            </div>
          </div>

          {/* TradingView Chart */}
          {lineChartData ? (
            <div className="h-64 bg-background rounded-lg border border-crypto-border overflow-hidden mb-4">
              <TradingViewChart 
                symbol={`${getTokenByAddress(selectedFromToken)?.symbol}${getTokenByAddress(selectedToToken)?.symbol}`}
                height={256}
                width="100%"
              />
            </div>
          ) : isLoadingChart ? (
            <div className="h-64 bg-background rounded-lg border border-crypto-border flex items-center justify-center">
              <div className="text-muted-foreground">Loading chart...</div>
            </div>
          ) : (
            <div className="h-64 bg-background rounded-lg border border-crypto-border flex items-center justify-center">
              <div className="text-muted-foreground">Select tokens to view chart</div>
            </div>
          )}

          {/* Quote Information */}
          {quote && (
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Quote Information</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Rate</div>
                  <div className="font-medium">
                    1 {getTokenByAddress(selectedFromToken)?.symbol} = {formatTokenAmount(quote.toTokenAmount)} {getTokenByAddress(selectedToToken)?.symbol}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">You&apos;ll receive</div>
                  <div className="font-medium">
                    {formatTokenAmount(quote.toTokenAmount)} {getTokenByAddress(selectedToToken)?.symbol}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Gas Cost</div>
                  <div className="font-medium">
                    {formatTokenAmount(quote.gasCost)} ETH
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Estimated Gas</div>
                  <div className="font-medium">
                    {quote.estimatedGas.toString()} units
                  </div>
                </div>
              </div>

              {/* Limit Order Section */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Create Limit Order</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Limit Price</label>
                    <input
                      type="number"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      placeholder="Enter limit price"
                      className="w-full px-3 py-2 bg-background border border-crypto-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={onCreateLimitOrder}
                      disabled={!walletStatus.isConnected}
                      className="w-full"
                    >
                      Create Limit Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Wallet Balances */}
      {balances.length > 0 && (
        <Card className="bg-crypto-card border-crypto-border p-6">
          <h3 className="text-lg font-semibold mb-4">Wallet Balances</h3>
          <div className="space-y-2">
            {balances.slice(0, 5).map((balance) => {
              const token = getTokenByAddress(balance.address);
              return (
                <div key={balance.address} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{token?.symbol || balance.symbol}</span>
                    <span className="text-sm text-muted-foreground">{token?.name || balance.name}</span>
                  </div>
                  <span className="font-medium">
                    {formatTokenAmount(balance.balance, 18)}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Limit Orders */}
      {limitOrders.length > 0 && (
        <Card className="bg-crypto-card border-crypto-border p-6">
          <h3 className="text-lg font-semibold mb-4">Your Limit Orders</h3>
          <div className="space-y-2">
            {limitOrders.map((order) => (
              <div key={order.orderHash} className="flex items-center justify-between p-4 bg-background rounded-lg border border-crypto-border">
                <div>
                  <div className="font-medium">{order.makerAsset} → {order.takerAsset}</div>
                  <div className="text-sm text-muted-foreground">
                    Amount: {formatTokenAmount(order.makingAmount)} | Status: {order.status}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCancelLimitOrder(order.orderHash)}
                >
                  Cancel
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
