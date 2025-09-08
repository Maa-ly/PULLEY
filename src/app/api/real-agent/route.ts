/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { z } from "zod";
import { runRealTradingAgent } from "@/lib/agents/realTradingAgent";

const RequestSchema = z.object({
  userIntent: z.string(),
  budget: z.string(),
  baseSymbol: z.string(),
  quoteSymbol: z.string(),
  timeframe: z.enum(["scalp", "swing", "position"]),
  riskTolerance: z.enum(["low", "medium", "high"]),
  walletAddress: z.string().optional(),
  isConnected: z.boolean().optional(),
  marketSnapshot: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = RequestSchema.safeParse(json);
    
    if (!parsed.success) {
      return new Response(JSON.stringify({ 
        error: "Invalid payload", 
        issues: parsed.error.flatten() 
      }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const { walletAddress, isConnected, ...input } = parsed.data;

    // Check if wallet is connected
    if (!isConnected || !walletAddress) {
      return new Response(JSON.stringify({
        error: "Wallet not connected",
        isRealTrading: false,
        rationale: "Please connect your Aptos wallet to execute real trades.",
      }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // Run the real trading agent
    const result = await runRealTradingAgent(input, {
      isConnected: isConnected,
      walletAddress: walletAddress,
      // Note: signAndSubmitTransaction would be passed from the client
      // since it's a client-side function from the wallet adapter
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    console.error("Real AI trading error:", err);
    return new Response(JSON.stringify({ 
      error: err?.message ?? String(err),
      isRealTrading: false,
    }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
