/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Bitcoin, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TradingModeToggle } from '@/components/TradingModeToggle'
import { useWallet } from '@/hooks/useWallet'
import MerkleTradeView from './components/MerkleTradeView'
import TradingHeader from './components/TradingHeader'
import TradingModeCard from './components/TradingModeCard'
import CFDTradingControls from './components/CFDTradingControls'
import TokenSelectionPanel from './components/TokenSelectionPanel'
import ChartSection from './components/ChartSection'
import OneInchTradingInterface from './components/OneInchTradingInterface'
import RealAIModal from './components/RealAIModal'
import PositionsPanel from './components/PositionsPanel'
import { 
  fetchWalletBalances, 
  getPopularTokens, 
  createLimitOrder,
  getLimitOrders,
  cancelLimitOrder,
  fetch1inchQuote,
  validateApiKey,
  initializeWallet,
  getWalletStatus,
  fetchLineChart,
  fetchCandleChart,
  type TokenInfo,
  type QuoteResponse,
  type ChartPeriod,
  type CandlePeriod
} from '@/lib/1inch'

// Polygon API key
const POLYGON_API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;

// Trading tokens
const TRADING_TOKENS = [
  { symbol: 'BTCUSD', name: 'Bitcoin', icon: Bitcoin, tradingViewSymbol: 'BTCUSDT' },
  { symbol: 'ETHUSD', name: 'Ethereum', icon: TrendingUp, tradingViewSymbol: 'ETHUSDT' },
  { symbol: 'USDCUSD', name: 'USD Coin', icon: DollarSign, tradingViewSymbol: 'USDCUSDT' },
  { symbol: 'ETHUSDT', name: 'Ethereum USDT', icon: DollarSign, tradingViewSymbol: 'ETHUSDT' }
];


// Types for API responses
interface OHLCData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

interface ExecutedOrder {
  order: {
    side: string;
    baseSymbol: string;
    quoteSymbol: string;
    amount: string;
    limitPrice: string;
    slippageBps?: number;
    expiry: string;
  };
  status: string;
  txHash?: string;
}

interface FailedOrder {
  order: {
    side: string;
    baseSymbol: string;
    quoteSymbol: string;
    amount: string;
    limitPrice: string;
  };
  error?: string;
}

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

interface Position {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  lotSize: number;
  entryPrice: number;
  currentPrice: number;
  takeProfit: number;
  stopLoss: number;
  pips: number;
  profit: number;
  status: 'open' | 'closed';
  openTime: Date;
  closeTime?: Date;
  closePrice?: number;
}

// Helper function to get pip value for crypto pairs
function getPipValue(symbol: string): number {
  // For crypto pairs, pip value depends on the price range
  const price = getFallbackPrice(symbol);
  if (price >= 1000) return 0.1; // BTC, ETH - 0.1 pip
  if (price >= 100) return 0.01; // Mid-range tokens
  if (price >= 1) return 0.001; // Stablecoins
  return 0.0001; // Default
}

// Helper function to calculate pips for crypto
function calculatePips(currentPrice: number, targetPrice: number, symbol: string): number {
  const pipValue = getPipValue(symbol);
  return Math.abs(targetPrice - currentPrice) / pipValue;
}

// Helper function to calculate profit/loss for crypto
function calculateProfitLoss(
  entryPrice: number, 
  currentPrice: number, 
  lotSize: number, 
  type: 'buy' | 'sell',
  symbol: string
): number {
  const pipValue = getPipValue(symbol);
  const pips = type === 'buy' 
    ? (currentPrice - entryPrice) / pipValue
    : (entryPrice - currentPrice) / pipValue;
  
  // For crypto, calculate profit based on lot size and price movement
  const priceDifference = type === 'buy' 
    ? currentPrice - entryPrice 
    : entryPrice - currentPrice;
  
  // Calculate profit based on lot size (1 lot = $100,000 equivalent)
  const lotValue = Math.abs(lotSize) * 100000;
  const profit = (priceDifference / entryPrice) * lotValue;
  
  return profit;
}

// Fetcher function for getting OHLC data for a specific ticker
async function fetchTickerOHLC(ticker: string): Promise<OHLCData> {
  try {
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/X:${ticker}/prev?adjusted=true&apiKey=${POLYGON_API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 429) {
        console.warn(`Rate limit hit for ${ticker}, using fallback data`);
        throw new Error('Rate limit exceeded');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const result = data.results?.[0];
    
    if (!result) {
      throw new Error('No data available');
    }
    
    return {
      ticker: ticker,
      name: getTokenName(ticker),
      price: result.c,
      change: Number((((result.c - result.o) / result.o) * 100).toFixed(2)),
      volume: result.v,
      high: result.h,
      low: result.l,
      open: result.o,
      close: result.c,
    };
  } catch (error) {
    console.warn(`Failed to fetch ${ticker}:`, error);
    // Return fallback data for this ticker
    return {
      ticker: ticker,
      name: getTokenName(ticker),
      price: getFallbackPrice(ticker),
      change: getFallbackChange(ticker),
      volume: 0,
      high: 0,
      low: 0,
      open: 0,
      close: 0,
    };
  }
}

// Helper function to get token name
function getTokenName(ticker: string): string {
  switch (ticker) {
    case 'BTCUSD': return 'Bitcoin';
    case 'ETHUSD': return 'Ethereum';
    case 'USDCUSD': return 'USD Coin';
    case 'USDTUSD': return 'Tether';
    default: return ticker.replace('USD', '');
  }
}

// Helper function to get fallback price
function getFallbackPrice(ticker: string): number {
  switch (ticker) {
    case 'BTCUSD': return 45000;
    case 'ETHUSD': return 3000;
    case 'USDCUSD': return 1.00;
    case 'USDTUSD': return 1.00;
    default: return 100;
  }
}

// Helper function to get fallback change
function getFallbackChange(ticker: string): number {
  switch (ticker) {
    case 'BTCUSD': return 2.5;
    case 'ETHUSD': return 1.8;
    case 'USDCUSD': return 0.0;
    case 'USDTUSD': return 0.0;
    default: return 0;
  }
}

// Fetcher function for all trading tokens
async function fetchTradingTokens(): Promise<TradingTokenData[]> {
  try {
    const results = await Promise.all(
      TRADING_TOKENS.map(async (token) => {
        const ohlcData = await fetchTickerOHLC(token.symbol);
        return {
          symbol: token.symbol,
          name: token.name,
          icon: token.icon,
          tradingViewSymbol: token.tradingViewSymbol,
          price: ohlcData.price,
          change: ohlcData.change,
          volume: ohlcData.volume,
          high: ohlcData.high,
          low: ohlcData.low,
          open: ohlcData.open,
          close: ohlcData.close,
        };
      })
    );
    return results;
  } catch (error) {
    console.error('Failed to fetch trading tokens:', error);
    return TRADING_TOKENS.map(token => ({
      symbol: token.symbol,
      name: token.name,
      icon: token.icon,
      tradingViewSymbol: token.tradingViewSymbol,
      price: getFallbackPrice(token.symbol),
      change: getFallbackChange(token.symbol),
      volume: 0,
      high: 0,
      low: 0,
      open: 0,
      close: 0,
    }));
  }
}

const Page = () => {
  // Trading mode state
  const [tradingMode, setTradingMode] = useState<'1inch' | 'merkle'>('1inch');
  
  // Wallet state using the new unified wallet system
  const {
    activeWallet,
    activeAddress,
    isConnected,
    aptosAddress,
    aptosIsConnected,
    evmAddress,
    evmIsConnected
  } = useWallet();
  
  const [selectedToken, setSelectedToken] = useState('BTCUSD');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [lotSize, setLotSize] = useState(0.01);
  const [takeProfit, setTakeProfit] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [selectedRatio, setSelectedRatio] = useState<number | null>(null);
  
  // UI state
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Wallet connection handlers
  const handleWalletConnected = useCallback((type: 'evm' | 'aptos', address: string) => {
    if (type === 'aptos') {
      setSuccess('Aptos wallet connected successfully!');
    } else {
      setSuccess('EVM wallet connected successfully!');
    }
    setError(null);
  }, []);

  // Handle trading mode change
  const handleTradingModeChange = useCallback((mode: '1inch' | 'merkle') => {
    setTradingMode(mode);
  }, []);
  
  const [positions, setPositions] = useState<Position[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedFromToken, setSelectedFromToken] = useState<string>('');
  const [selectedToToken, setSelectedToToken] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [limitPrice, setLimitPrice] = useState<string>('');
  
  // Chart state for 1inch trading
  const [selectedChartPeriod, setSelectedChartPeriod] = useState<ChartPeriod>('24H');
  const [selectedCandlePeriod, setSelectedCandlePeriod] = useState<CandlePeriod>(3600); // 1 hour
  const [lineChartData, setLineChartData] = useState<unknown>(null);
  const [candleChartData, setCandleChartData] = useState<unknown>(null);
  const [isLoadingChart, setIsLoadingChart] = useState(false);

  // AI Trading modal state
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiBudget, setAiBudget] = useState('1000'); // in quote units
  const [aiTimeframe, setAiTimeframe] = useState<'scalp' | 'swing' | 'position'>('swing');
  const [aiRisk, setAiRisk] = useState<'low' | 'medium' | 'high'>('medium');
  const [aiIntent, setAiIntent] = useState('Plan limit orders for the selected market');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  // Check if API key is configured (client-side only)
  const [hasApiKey, setHasApiKey] = useState(false);
  
  useEffect(() => {
    setHasApiKey(validateApiKey());
  }, []);

  // Get wallet status
  const walletStatus = getWalletStatus();

  const { data: tradingTokens = [] } = useQuery({
    queryKey: ['trading-tokens'],
    queryFn: fetchTradingTokens,
    staleTime: 5 * 1000, // 5 seconds for real-time updates
    retry: 2,
    retryDelay: 5000,
  });

  // 1inch Data Queries
  const { data: tokens = [], isLoading: tokensLoading } = useQuery({
    queryKey: ['1inch-tokens'],
    queryFn: getPopularTokens,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: balances = [] } = useQuery({
    queryKey: ['1inch-balances'],
    queryFn: () => fetchWalletBalances(),
    enabled: walletStatus.isConnected && hasApiKey,
    staleTime: 30 * 1000, // 30 seconds
  });

  const { data: limitOrders = [] } = useQuery({
    queryKey: ['1inch-orders'],
    queryFn: () => getLimitOrders(),
    enabled: walletStatus.isConnected && hasApiKey,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Initialize wallet for 1inch trading only when needed
  useEffect(() => {
    // Only initialize 1inch wallet when in 1inch trading mode
    if (tradingMode === '1inch' && walletStatus.isConnected) {
      initializeWallet(walletStatus.address || '');
    }
  }, [tradingMode, walletStatus.isConnected, walletStatus.address]);

  const selectedTokenData = tradingTokens.find(token => token.symbol === selectedToken);
  const currentPrice = selectedTokenData?.price || 0;

  // Map UI token to base/quote pair supported by our agent/service
  const mapSelectedToPair = useCallback(() => {
    // Prefer USDC as quote for execution
    if (selectedToken.startsWith('ETH')) return { baseSymbol: 'ETH', quoteSymbol: 'USDC' };
    if (selectedToken.startsWith('BTC')) return { baseSymbol: 'WBTC', quoteSymbol: 'USDC' };
    if (selectedToken.startsWith('USDC')) return { baseSymbol: 'ETH', quoteSymbol: 'USDC' }; // default to ETH/USDC
    return { baseSymbol: 'ETH', quoteSymbol: 'USDC' };
  }, [selectedToken]);

  // Set default tokens when tokens are loaded
  useEffect(() => {
    if (tokens.length > 0 && !selectedFromToken) {
      const usdc = tokens.find(t => t.symbol === 'USDC');
      const weth = tokens.find(t => t.symbol === 'WETH');
      if (usdc) setSelectedFromToken(usdc.address);
      if (weth) setSelectedToToken(weth.address);
    }
  }, [tokens, selectedFromToken]);

  // Update TP/SL when token changes
  useEffect(() => {
    if (currentPrice > 0) {
      // Update TP if it's empty or if we're applying a ratio
      if (!takeProfit) {
        setTakeProfit(currentPrice.toFixed(5));
      }
      // Update SL if it's empty
      if (!stopLoss) {
        setStopLoss(currentPrice.toFixed(5));
      }
    }
  }, [selectedToken, currentPrice, stopLoss, takeProfit]);

  // Calculate pips for TP and SL
  const tpPips = takeProfit ? calculatePips(currentPrice, parseFloat(takeProfit), selectedToken) : 0;
  const slPips = stopLoss ? calculatePips(currentPrice, parseFloat(stopLoss), selectedToken) : 0;

  // Calculate potential profit/loss
  const potentialProfit = tpPips > 0 ? calculateProfitLoss(currentPrice, parseFloat(takeProfit), lotSize, tradeType, selectedToken) : 0;
  const potentialLoss = slPips > 0 ? calculateProfitLoss(currentPrice, parseFloat(stopLoss), lotSize, tradeType, selectedToken) : 0;

  // Apply risk ratio when selected
  const applyRiskRatio = (ratio: number) => {
    if (stopLoss && currentPrice > 0) {
      const slPrice = parseFloat(stopLoss);
      const riskDistance = Math.abs(currentPrice - slPrice);
      const rewardDistance = riskDistance * ratio;
      
      let newTpPrice: number;
      if (tradeType === 'buy') {
        newTpPrice = currentPrice + rewardDistance;
      } else {
        newTpPrice = currentPrice - rewardDistance;
      }
      
      setTakeProfit(newTpPrice.toFixed(5));
      setSelectedRatio(ratio);
    }
  };

  // Handle TP input focus
  const handleTpFocus = () => {
    if (!takeProfit && currentPrice > 0) {
      setTakeProfit(currentPrice.toFixed(5));
    }
  };

  // Handle SL input focus
  const handleSlFocus = () => {
    if (!stopLoss && currentPrice > 0) {
      setStopLoss(currentPrice.toFixed(5));
    }
  };

  // Handle token selection
  const handleTokenSelection = (tokenSymbol: string) => {
    setSelectedToken(tokenSymbol);
    // Reset TP/SL when changing tokens
    setTakeProfit('');
    setStopLoss('');
    setSelectedRatio(null);
  };

  // 1inch Quote fetching
  const fetchQuote = useCallback(async () => {
    if (!selectedFromToken || !selectedToToken || !amount) return;

    setIsLoadingQuote(true);
    try {
      const quoteData = await fetch1inchQuote(selectedFromToken, selectedToToken, amount);
      setQuote(quoteData);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    } finally {
      setIsLoadingQuote(false);
    }
  }, [selectedFromToken, selectedToToken, amount]);

  // Auto-fetch quote when parameters change
  useEffect(() => {
    if (selectedFromToken && selectedToToken && amount) {
      const timeoutId = setTimeout(fetchQuote, 500); // Debounce
      return () => clearTimeout(timeoutId);
    }
  }, [selectedFromToken, selectedToToken, amount, fetchQuote]);

  // Fetch chart data for 1inch trading
  const fetchChartData = useCallback(async () => {
    if (!selectedFromToken || !selectedToToken) return;

    setIsLoadingChart(true);
    try {
      const [lineData, candleData] = await Promise.all([
        fetchLineChart(selectedFromToken, selectedToToken, selectedChartPeriod),
        fetchCandleChart(selectedFromToken, selectedToToken, selectedCandlePeriod)
      ]);
      
      setLineChartData(lineData);
      setCandleChartData(candleData);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    } finally {
      setIsLoadingChart(false);
    }
  }, [selectedFromToken, selectedToToken, selectedChartPeriod, selectedCandlePeriod]);

  // Auto-fetch chart data when tokens or period changes
  useEffect(() => {
    if (selectedFromToken && selectedToToken && tradingMode === '1inch') {
      fetchChartData();
    }
  }, [selectedFromToken, selectedToToken, selectedChartPeriod, selectedCandlePeriod, tradingMode, fetchChartData]);

  // Create 1inch limit order
  const handleCreateLimitOrder = useCallback(async () => {
    if (!quote || !walletStatus.isConnected || !walletStatus.address) return;

    try {
      const orderParams = {
        makerAsset: selectedFromToken,
        takerAsset: selectedToToken,
        makingAmount: amount,
        takingAmount: quote.toTokenAmount,
        maker: walletStatus.address
      };

      const result = await createLimitOrder(orderParams, walletStatus);
      console.log('Limit order created:', result);
      alert('Limit order created successfully!');
    } catch (error) {
      console.error('Failed to create limit order:', error);
      alert('Failed to create limit order');
    }
  }, [quote, selectedFromToken, selectedToToken, amount, walletStatus]);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedTokenData) {
        // Simulate small price movements
        const volatility = 0.001; // 0.1% volatility
        const randomChange = (Math.random() - 0.5) * volatility;
        const newPrice = selectedTokenData.price * (1 + randomChange);
        
        // This would normally update the query cache
        console.log('Price update:', newPrice);
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [selectedTokenData, selectedToken, tradingTokens]);

  const openPosition = () => {
    if (!selectedTokenData || !takeProfit || !stopLoss) return;

    const newPosition: Position = {
      id: Date.now().toString(),
      symbol: selectedToken,
      type: tradeType,
      lotSize,
      entryPrice: currentPrice,
      currentPrice,
      takeProfit: parseFloat(takeProfit),
      stopLoss: parseFloat(stopLoss),
      pips: 0,
      profit: 0,
      status: 'open',
      openTime: new Date(),
    };

    setPositions(prev => [...prev, newPosition]);
    
    // Reset form
    setTakeProfit('');
    setStopLoss('');
    setSelectedRatio(null);
  };

  const closePosition = (positionId: string) => {
    setPositions(prev => prev.map(pos => 
      pos.id === positionId 
        ? { 
            ...pos, 
            status: 'closed' as const, 
            closeTime: new Date(), 
            closePrice: currentPrice,
            pips: calculatePips(pos.entryPrice, currentPrice, pos.symbol),
            profit: calculateProfitLoss(pos.entryPrice, currentPrice, pos.lotSize, pos.type, pos.symbol)
          }
        : pos
    ));
  };

  const openPositions = positions.filter(p => p.status === 'open');
  const closedPositions = positions.filter(p => p.status === 'closed');


  return (
    <div className="w-full h-full">
      <div className="p-6 space-y-6">
        {/* Trading Mode Toggle */}
        <TradingModeToggle 
          mode={tradingMode} 
          onModeChange={handleTradingModeChange} 
        />

        {/* Header and Mode */}
        <TradingHeader hasApiKey={hasApiKey} walletStatus={walletStatus} onOpenAI={() => setShowAiModal(true)} tradingMode={tradingMode} />
        <TradingModeCard tradingMode={tradingMode} onSelect={setTradingMode} />

        {/* Render appropriate view based on trading mode */}
        {tradingMode === 'merkle' ? (
          <MerkleTradeView 
            aptosIsConnected={aptosIsConnected}
            aptosAddress={aptosAddress}
            onWalletConnected={handleWalletConnected}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Token Selection */}
              <TokenSelectionPanel
                tradingTokens={tradingTokens}
                selectedToken={selectedToken}
                onTokenSelection={handleTokenSelection}
              />

              {/* Trading Chart */}
              <ChartSection
                selectedTokenData={selectedTokenData}
                currentPrice={currentPrice}
              />
            </div>

            {/* CFD Trading Controls */}
            <CFDTradingControls
              tradeType={tradeType}
              setTradeType={setTradeType}
              lotSize={lotSize}
              setLotSize={setLotSize}
              takeProfit={takeProfit}
              setTakeProfit={setTakeProfit}
              stopLoss={stopLoss}
              setStopLoss={setStopLoss}
              selectedRatio={selectedRatio}
              setSelectedRatio={setSelectedRatio}
              selectedTokenSymbol={selectedTokenData?.symbol}
              currentPrice={currentPrice}
              tpPips={tpPips}
              slPips={slPips}
              potentialProfit={potentialProfit}
              potentialLoss={potentialLoss}
              onTpFocus={handleTpFocus}
              onSlFocus={handleSlFocus}
              onApplyRiskRatio={applyRiskRatio}
              onOpenPosition={openPosition}
            />
          </div>
        )}

        {/* 1inch DEX Trading Interface */}
        {tradingMode === '1inch' && (
          <OneInchTradingInterface
            tokens={tokens}
            tokensLoading={tokensLoading}
            selectedFromToken={selectedFromToken}
            setSelectedFromToken={setSelectedFromToken}
            selectedToToken={selectedToToken}
            setSelectedToToken={setSelectedToToken}
            amount={amount}
            setAmount={setAmount}
            quote={quote as any}
            isLoadingQuote={isLoadingQuote}
            onFetchQuote={fetchQuote}
            limitPrice={limitPrice}
            setLimitPrice={setLimitPrice}
            onCreateLimitOrder={handleCreateLimitOrder}
            walletStatus={walletStatus}
            balances={balances}
            limitOrders={limitOrders}
            onCancelLimitOrder={cancelLimitOrder}
            selectedChartPeriod={selectedChartPeriod as any}
            setSelectedChartPeriod={setSelectedChartPeriod}
            selectedCandlePeriod={selectedCandlePeriod}
            setSelectedCandlePeriod={setSelectedCandlePeriod}
            lineChartData={lineChartData}
            candleChartData={candleChartData}
            isLoadingChart={isLoadingChart}
          />
        )}

        {/* Open Positions (Merkle Only) */}
        {tradingMode === 'merkle' && aptosIsConnected && (
          <PositionsPanel
            openPositions={openPositions.map(pos => ({
              ...pos,
              pips: calculatePips(pos.entryPrice, currentPrice, pos.symbol),
              profit: calculateProfitLoss(pos.entryPrice, currentPrice, pos.lotSize, pos.type, pos.symbol)
            }))}
            closedPositions={closedPositions}
            currentPrice={currentPrice}
            showHistory={showHistory}
            onToggleHistory={() => setShowHistory(!showHistory)}
            onClosePosition={closePosition}
          />
        )}
      </div>

      {/* AI Trading Modal */}
      <RealAIModal
        open={showAiModal}
        onClose={() => { setShowAiModal(false); setAiResult(null); }}
        aiBudget={aiBudget}
        setAiBudget={setAiBudget}
        aiTimeframe={aiTimeframe}
        setAiTimeframe={setAiTimeframe}
        aiRisk={aiRisk}
        setAiRisk={setAiRisk}
        aiIntent={aiIntent}
        setAiIntent={setAiIntent}
        currentPrice={currentPrice}
        selectedTokenName={selectedTokenData?.name}
        selectedTokenSymbol={selectedTokenData?.symbol}
        pair={mapSelectedToPair()}
        aiLoading={aiLoading}
        setAiLoading={setAiLoading}
        aiResult={aiResult}
        setAiResult={setAiResult}
      />
    </div>
  );
};

export default Page;