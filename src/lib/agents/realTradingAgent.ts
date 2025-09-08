/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  PredictionInput,
  PredictionOutput,
  AgentResultSummary,
  TradeExecutionResult,
} from "@/utils/types";
import { runPredictionTool } from "@/lib/tools/prediction";
import { runRealTradeExecution } from "@/lib/tools/realTradeExecution";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export interface RealTradingAgentInput extends PredictionInput {
  walletAddress?: string;
  isConnected?: boolean;
}

export interface RealTradingAgentResult extends AgentResultSummary {
  isRealTrading: boolean;
  totalValue: number;
  executedValue: number;
  failedValue: number;
  tradingFees: number;
  netPnL: number;
  tradeDetails: {
    orderId: string;
    side: 'BUY' | 'SELL';
    amount: string;
    price: string;
    value: number;
    status: 'executed' | 'failed' | 'pending';
    txHash?: string;
    error?: string;
    timestamp: number;
  }[];
}

export async function runRealTradingAgent(
  input: RealTradingAgentInput,
  walletContext: {
    isConnected: boolean;
    walletAddress?: string;
    signAndSubmitTransaction?: (transaction: any) => Promise<any>;
  }
): Promise<RealTradingAgentResult> {
  // Check if wallet is connected for real trading
  if (!walletContext.isConnected || !walletContext.walletAddress) {
    return {
      plannedNumOrders: 0,
      executed: [],
      failures: [],
      rationale: "Wallet not connected. Please connect your wallet to execute real trades.",
      isRealTrading: false,
      totalValue: 0,
      executedValue: 0,
      failedValue: 0,
      tradingFees: 0,
      netPnL: 0,
      tradeDetails: [],
    };
  }

  // 1) Get AI prediction and trading plan
  const plan: PredictionOutput = await runPredictionTool(input);

  const executed: TradeExecutionResult[] = [];
  const failures: TradeExecutionResult[] = [];
  const tradeDetails: RealTradingAgentResult['tradeDetails'] = [];
  
  let totalValue = 0;
  let executedValue = 0;
  let failedValue = 0;
  let tradingFees = 0;

  // 2) Execute each order with real wallet transactions
  for (const order of plan.orders) {
    try {
      const orderValue = parseFloat(order.amount) * parseFloat(order.limitPrice);
      totalValue += orderValue;

      const res = await runRealTradeExecution({ 
        order,
        walletAddress: walletContext.walletAddress,
        signAndSubmitTransaction: walletContext.signAndSubmitTransaction
      });

      const tradeDetail = {
        orderId: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        side: order.side,
        amount: order.amount,
        price: order.limitPrice,
        value: orderValue,
        status: res.status === 'submitted' ? 'executed' as const : 'failed' as const,
        txHash: res.txHash,
        error: res.error,
        timestamp: Date.now(),
      };

      tradeDetails.push(tradeDetail);

      if (res.status === "failed") {
        failures.push(res);
        failedValue += orderValue;
      } else {
        executed.push(res);
        executedValue += orderValue;
        // Estimate trading fees (0.1% of order value)
        tradingFees += orderValue * 0.001;
      }
    } catch (err: any) {
      const errorResult = { 
        order, 
        status: "failed" as const, 
        error: err?.message ?? String(err) 
      };
      failures.push(errorResult);
      
      const orderValue = parseFloat(order.amount) * parseFloat(order.limitPrice);
      failedValue += orderValue;
      
      tradeDetails.push({
        orderId: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        side: order.side,
        amount: order.amount,
        price: order.limitPrice,
        value: orderValue,
        status: 'failed',
        error: err?.message ?? String(err),
        timestamp: Date.now(),
      });
    }
  }

  // Calculate net PnL (simplified - in real implementation, this would track actual PnL)
  const netPnL = executedValue - tradingFees;

  return {
    plannedNumOrders: plan.numOrders,
    executed,
    failures,
    rationale: plan.rationale,
    isRealTrading: true,
    totalValue,
    executedValue,
    failedValue,
    tradingFees,
    netPnL,
    tradeDetails,
  };
}
