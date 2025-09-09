/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Wallet, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Zap
} from "lucide-react";
import { useSecureMerkleWallet } from "@/hooks/useSecureMerkleWallet";
import { useToast } from "@/components/ui/use-toast";

interface MerkleDashboardProps {
  walletAddress?: string;
  isConnected: boolean;
}

export function MerkleDashboard({ walletAddress, isConnected }: MerkleDashboardProps) {
  // Use secure Merkle wallet hook
  const {
    walletManager,
    isLoading,
    error: walletError,
    isConnected: walletConnected,
    walletAddress: connectedAddress,
    faucetUSDC,
    placeMarketOrder,
    getUSDCBalance,
    getPositions,
    getOrders,
  } = useSecureMerkleWallet();

  // Local state
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Toast notifications
  const { toast } = useToast();

  // Market data
  const [pairs, setPairs] = useState<any[]>([]);
  const [selectedPair, setSelectedPair] = useState<string>("BTC_USD");
  const [currentPrice, setCurrentPrice] = useState<number>(65000);

  // User data
  const [usdcBalance, setUsdcBalance] = useState<string>("0");
  const [positions, setPositions] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Trading form
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [side, setSide] = useState<"long" | "short">("long");
  const [size, setSize] = useState<string>("");
  const [collateral, setCollateral] = useState<string>("");
  const [leverage, setLeverage] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [takeProfit, setTakeProfit] = useState<string>("");

  // Load user data
  const loadUserData = useCallback(async () => {
    if (!walletManager) return;
    
    try {
      const [balanceResult, positionsResult, ordersResult] = await Promise.all([
        getUSDCBalance(),
        getPositions(),
        getOrders()
      ]);

      if (balanceResult.success) {
        setUsdcBalance(balanceResult.balance);
      }
      if (positionsResult.success) {
        setPositions(positionsResult.positions);
      }
      if (ordersResult.success) {
        setOrders(ordersResult.orders);
      }
    } catch (err: any) {
      setError(`Failed to load user data: ${err.message}`);
    }
  }, [walletManager, getUSDCBalance, getPositions, getOrders, setError, setPositions, setOrders, setUsdcBalance]);

  // Load user data when wallet connects
  useEffect(() => {
    if (walletConnected && walletManager) {
      loadUserData();
    }
  }, [walletConnected, walletManager, loadUserData]);


  // Faucet USDC for testnet
  const handleFaucet = async () => {
    if (!walletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Aptos wallet first",
        variant: "destructive",
      });
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const result = await faucetUSDC("1"); // 1 USDC - smaller amount for testnet
      
      if (result.success) {
        setSuccess("Successfully claimed 1 USDC from faucet!");
        await loadUserData();
      } else {
        setError(result.error || "Failed to claim USDC");
      }
    } catch (err: any) {
      setError(`Faucet error: ${err.message}`);
    }
  };

  // Place order
  const handlePlaceOrder = async () => {
    if (!walletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Aptos wallet first",
        variant: "destructive",
      });
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const result = await placeMarketOrder({
        pair: selectedPair,
        size,
        collateral,
        isLong: side === "long",
        stopLoss: stopLoss || undefined,
        takeProfit: takeProfit || undefined,
      });

      if (result.success) {
        setSuccess(`Order placed successfully! Transaction: ${result.txHash}`);
        await loadUserData();
        
        // Reset form
        setSize("");
        setCollateral("");
        setLimitPrice("");
        setStopLoss("");
        setTakeProfit("");
      } else {
        setError(result.error || "Failed to place order");
      }
    } catch (err: any) {
      setError(`Order error: ${err.message}`);
    }
  };

  // Close position
  const handleClosePosition = async (position: any) => {
    if (!walletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Aptos wallet first",
        variant: "destructive",
      });
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      // This would need to be implemented in the secure wallet
      // For now, just show a message
      setSuccess("Position close functionality coming soon!");
    } catch (err: any) {
      setError(`Close position error: ${err.message}`);
    }
  };

  // Calculate position PnL
  const calculatePnL = (position: any) => {
    const priceDiff = currentPrice - Number(position.avgPrice) / 1000000;
    const pnl = position.isLong ? priceDiff : -priceDiff;
    const pnlValue = (pnl * Number(position.size)) / 1000000;
    return pnlValue;
  };

  if (!isConnected) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">Connect Wallet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Please connect your wallet to start trading on Merkle
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Merkle Trade Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Perpetual futures trading on Aptos Testnet
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Testnet
          </Badge>
          <Button onClick={handleFaucet} disabled={isLoading} variant="outline" className="hover:text-white text-white">
            <Zap className="h-4 w-4 mr-2" />
            Faucet USDC
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Note: You need APT for gas fees. Get APT from{" "}
          <a 
            href="https://faucet.testnet.aptoslabs.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Aptos Testnet Faucet
          </a>
        </div>
      </div>

      {/* Alerts */}
      {(error || walletError) && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error || walletError}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trading Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Current Price</Label>
                  <p className="text-lg font-semibold">${currentPrice.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Trading Pair</Label>
                  <p className="text-lg font-semibold">{selectedPair}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Network</Label>
                  <p className="text-lg font-semibold">Aptos Testnet</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Max Leverage</Label>
                  <p className="text-lg font-semibold">150x</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Form */}
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
              <CardDescription>
                Trade perpetual futures with up to 150x leverage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pair Selection */}
              <div>
                <Label>Trading Pair</Label>
                <Select value={selectedPair} onValueChange={setSelectedPair}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTC_USD">BTC/USD</SelectItem>
                    <SelectItem value="ETH_USD">ETH/USD</SelectItem>
                    <SelectItem value="SOL_USD">SOL/USD</SelectItem>
                    <SelectItem value="APT_USD">APT/USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Order Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Order Type</Label>
                  <Select value={orderType} onValueChange={(value: "market" | "limit") => setOrderType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Side</Label>
                  <Select value={side} onValueChange={(value: "long" | "short") => setSide(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="long">Long</SelectItem>
                      <SelectItem value="short">Short</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Size and Collateral */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Size (USDC)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Collateral (USDC)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={collateral}
                    onChange={(e) => setCollateral(e.target.value)}
                  />
                </div>
              </div>

              {/* Leverage */}
              <div>
                <Label>Leverage: {leverage}x</Label>
                <Input
                  type="range"
                  min="1"
                  max="150"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Limit Price (for limit orders) */}
              {orderType === "limit" && (
                <div>
                  <Label>Limit Price (USDC)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                  />
                </div>
              )}

              {/* Stop Loss and Take Profit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Stop Loss (USDC)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Take Profit (USDC)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={handlePlaceOrder} 
                disabled={isLoading || !size || !collateral}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place ${side.toUpperCase()} Order`
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm text-gray-600">USDC Balance</Label>
                  <p className="text-lg font-semibold">
                    ${parseFloat(usdcBalance).toFixed(2)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Wallet</Label>
                  <p className="text-sm font-mono break-all">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Positions */}
          <Card>
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              {positions.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No open positions
                </p>
              ) : (
                <div className="space-y-3">
                  {positions.map((position, index) => {
                    const pnl = calculatePnL(position);
                    return (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={position.isLong ? "default" : "destructive"}>
                            {position.isLong ? "LONG" : "SHORT"}
                          </Badge>
                          <span className={`text-sm font-semibold ${pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>Size: ${(Number(position.size) / 1000000).toFixed(2)}</div>
                          <div>Entry: ${(Number(position.avgPrice) / 1000000).toFixed(2)}</div>
                          <div>Collateral: ${(Number(position.collateral) / 1000000).toFixed(2)}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => handleClosePosition(position)}
                          disabled={isLoading}
                        >
                          Close Position
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Open Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No open orders
                </p>
              ) : (
                <div className="space-y-2">
                  {orders.map((order, index) => (
                    <div key={index} className="p-2 border rounded text-sm">
                      <div className="flex items-center justify-between">
                        <Badge variant={order.isLong ? "default" : "destructive"}>
                          {order.isLong ? "LONG" : "SHORT"}
                        </Badge>
                        <span>{order.isMarket ? "Market" : "Limit"}</span>
                      </div>
                      <div>Size: ${(Number(order.sizeDelta) / 1000000).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
