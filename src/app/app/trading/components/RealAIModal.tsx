"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  X, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Activity,
  Zap,
  BarChart3,
  Wallet,
  ExternalLink
} from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  aiBudget: string;
  setAiBudget: (v: string) => void;
  aiTimeframe: 'scalp' | 'swing' | 'position';
  setAiTimeframe: (v: 'scalp' | 'swing' | 'position') => void;
  aiRisk: 'low' | 'medium' | 'high';
  setAiRisk: (v: 'low' | 'medium' | 'high') => void;
  aiIntent: string;
  setAiIntent: (v: string) => void;
  currentPrice: number;
  selectedTokenName?: string;
  selectedTokenSymbol?: string;
  pair: { baseSymbol: string; quoteSymbol: string };
  aiLoading: boolean;
  setAiLoading: (v: boolean) => void;
  aiResult: any;
  setAiResult: (v: any) => void;
};

export default function RealAIModal(props: Props) {
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
  } = props;

  const { account, connected, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  if (!open) return null;

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const executeAITrading = async () => {
    if (!connected || !account?.address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Aptos wallet to execute AI trades",
        variant: "destructive",
      });
      return;
    }

    setAiLoading(true);
    setAiResult(null);

    try {
      const response = await fetch('/api/real-agent', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          userIntent: aiIntent,
          budget: aiBudget,
          baseSymbol: pair.baseSymbol,
          quoteSymbol: pair.quoteSymbol,
          timeframe: aiTimeframe,
          riskTolerance: aiRisk,
          walletAddress: account.address.toString(),
          isConnected: connected,
        }),
      });

      const data = await response.json();
      setAiResult(data);

      if (data.isRealTrading && data.executedValue > 0) {
        toast({
          title: "AI Trading Executed!",
          description: `Successfully executed ${data.executed.length} trades worth $${data.executedValue.toFixed(2)}`,
          variant: "default",
        });
      } else if (data.failures.length > 0) {
        toast({
          title: "Some Trades Failed",
          description: `${data.failures.length} trades failed to execute`,
          variant: "destructive",
        });
      }
    } catch (e) {
      const errorMessage = (e as Error).message || 'AI trading error';
      setAiResult({ error: errorMessage, isRealTrading: false });
      toast({
        title: "AI Trading Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'high': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getTimeframeIcon = (timeframe: string) => {
    switch (timeframe) {
      case 'scalp': return <Zap className="w-4 h-4" />;
      case 'swing': return <TrendingUp className="w-4 h-4" />;
      case 'position': return <BarChart3 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 md:p-6 overflow-y-auto">
      <Card className="bg-crypto-card border-crypto-border w-full max-w-6xl p-4 md:p-6 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-crypto-card/95 backdrop-blur supports-[backdrop-filter]:bg-crypto-card/80 z-10 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">AI Trading Bot</h3>
              <p className="text-sm text-muted-foreground">Execute real trades with AI analysis</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Wallet Status */}
        <div className="mb-6 p-4 bg-crypto-card border border-crypto-border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5" />
              <div>
                <div className="font-medium">Wallet Status</div>
                <div className="text-sm text-muted-foreground">
                  {connected ? `Connected: ${account?.address?.toString().slice(0, 6)}...${account?.address?.toString().slice(-4)}` : 'Not Connected'}
                </div>
              </div>
            </div>
            <Badge variant={connected ? "default" : "destructive"}>
              {connected ? 'Ready' : 'Connect Wallet'}
            </Badge>
          </div>
        </div>

        {/* Market Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-crypto-card border border-crypto-border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Selected Market</div>
            <div className="font-medium text-lg">{selectedTokenName} ({selectedTokenSymbol})</div>
            <div className="text-sm">Price: ${currentPrice.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-crypto-card border border-crypto-border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Trading Pair</div>
            <div className="font-medium text-lg">{pair.baseSymbol}/{pair.quoteSymbol}</div>
            <div className="text-sm">AI will trade this pair</div>
          </div>
        </div>

        {/* Trading Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="budget">Trading Budget (USDC)</Label>
            <Input
              id="budget"
              value={aiBudget}
              onChange={(e) => setAiBudget(e.target.value)}
              placeholder="1000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="timeframe">Trading Timeframe</Label>
            <Select value={aiTimeframe} onValueChange={setAiTimeframe}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scalp">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Scalping (Minutes)
                  </div>
                </SelectItem>
                <SelectItem value="swing">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Swing (Hours/Days)
                  </div>
                </SelectItem>
                <SelectItem value="position">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Position (Days/Weeks)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="risk">Risk Tolerance</Label>
            <Select value={aiRisk} onValueChange={setAiRisk}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="intent">Trading Strategy</Label>
          <Input
            id="intent"
            value={aiIntent}
            onChange={(e) => setAiIntent(e.target.value)}
            placeholder="Describe your trading strategy or let AI decide..."
            className="mt-1"
          />
        </div>

        {/* Execute Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            The AI will analyze market conditions and execute real trades using your connected wallet.
          </div>
          <Button
            onClick={executeAITrading}
            disabled={aiLoading || !connected}
            className="bg-gradient-primary hover:opacity-90"
          >
            {aiLoading ? (
              <>
                <Activity className="w-4 h-4 mr-2 animate-spin" />
                AI Trading...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Execute AI Trading
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {aiResult && (
          <div className="space-y-4">
            {/* Error Display */}
            {aiResult.error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{aiResult.error}</AlertDescription>
              </Alert>
            )}

            {/* Trading Results */}
            {!aiResult.error && aiResult.isRealTrading && (
              <>
                {/* Summary Card */}
                <Card className="p-4 bg-crypto-card border border-crypto-border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Trading Results</h4>
                    <Badge variant={aiResult.executedValue > 0 ? "default" : "destructive"}>
                      {aiResult.executedValue > 0 ? 'Success' : 'Failed'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">${aiResult.executedValue?.toFixed(2) || 0}</div>
                      <div className="text-sm text-muted-foreground">Executed Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">{aiResult.executed?.length || 0}</div>
                      <div className="text-sm text-muted-foreground">Successful Trades</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">{aiResult.failures?.length || 0}</div>
                      <div className="text-sm text-muted-foreground">Failed Trades</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">${aiResult.tradingFees?.toFixed(2) || 0}</div>
                      <div className="text-sm text-muted-foreground">Trading Fees</div>
                    </div>
                  </div>
                </Card>

                {/* AI Rationale - Collapsible */}
                <Card className="p-4 bg-crypto-card border border-crypto-border">
                  <Collapsible 
                    open={expandedSections.has('rationale')} 
                    onOpenChange={() => toggleSection('rationale')}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          <span className="font-medium">AI Trading Rationale</span>
                        </div>
                        {expandedSections.has('rationale') ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                        }
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <div className="p-4 bg-background rounded border border-crypto-border whitespace-pre-wrap text-sm">
                        {aiResult.rationale || 'No rationale provided'}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Trade Details - Collapsible */}
                {aiResult.tradeDetails && aiResult.tradeDetails.length > 0 && (
                  <Card className="p-4 bg-crypto-card border border-crypto-border">
                    <Collapsible 
                      open={expandedSections.has('trades')} 
                      onOpenChange={() => toggleSection('trades')}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            <span className="font-medium">Trade Details ({aiResult.tradeDetails.length})</span>
                          </div>
                          {expandedSections.has('trades') ? 
                            <ChevronUp className="w-4 h-4" /> : 
                            <ChevronDown className="w-4 h-4" />
                          }
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4">
                        <div className="space-y-3">
                          {aiResult.tradeDetails.map((trade: any, index: number) => (
                            <div key={index} className="p-3 bg-background rounded border border-crypto-border">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant={trade.side === 'BUY' ? 'default' : 'destructive'}>
                                    {trade.side}
                                  </Badge>
                                  <span className="font-medium">{trade.amount} {pair.baseSymbol}</span>
                                  <span className="text-muted-foreground">@ ${trade.price}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {trade.status === 'executed' ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                  )}
                                  <Badge variant={trade.status === 'executed' ? 'default' : 'destructive'}>
                                    {trade.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Value: ${trade.value.toFixed(2)} | 
                                {trade.txHash && (
                                  <span className="ml-2">
                                    TX: <code className="bg-muted px-1 rounded">{trade.txHash.slice(0, 8)}...</code>
                                  </span>
                                )}
                                {trade.error && (
                                  <span className="ml-2 text-red-500">Error: {trade.error}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )}
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
