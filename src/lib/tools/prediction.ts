import { z } from "zod";
import { createGroqModel } from "@/lib/llm/groq";
import { fetchCryptoPanicNews, summarizeNews } from "@/lib/news/cryptopanic";
import type { PredictionInput, PredictionOutput } from "@/utils/types";

export const PredictionInputSchema = z.object({
  userIntent: z.string().describe("User's trading intent or strategy summary"),
  budget: z.string().describe("Budget in quote token units, decimal string"),
  baseSymbol: z.string().describe("Base asset symbol, e.g., ETH"),
  quoteSymbol: z.string().describe("Quote asset symbol, e.g., USDC"),
  timeframe: z.enum(["scalp", "swing", "position"]).describe("Intended holding timeframe"),
  riskTolerance: z.enum(["low", "medium", "high"]).describe("Risk preference"),
  marketSnapshot: z.record(z.any()).optional().describe("Recent market data snapshot"),
});

export const OrderSpecSchema = z.object({
  baseSymbol: z.string(),
  quoteSymbol: z.string(),
  side: z.enum(["BUY", "SELL"]),
  amount: z.string(),
  limitPrice: z.string(),
  expiry: z.number(),
  leverage: z.number().optional(),
  reduceOnly: z.boolean().optional(),
  slippageBps: z.number().optional(),
});

export const PredictionOutputSchema = z.object({
  numOrders: z.number().min(1).max(20),
  orders: z.array(OrderSpecSchema).min(1),
  rationale: z.string().describe("Concise high-level reasoning for the plan"),
  steps: z
    .array(
      z.object({
        title: z.string(),
        detail: z.string().optional(),
      })
    )
    .optional()
    .describe("Short bullet steps used to derive the plan"),
});

export async function runPredictionTool(input: PredictionInput): Promise<PredictionOutput> {
  const model = createGroqModel();
  const structured = model.withStructuredOutput(PredictionOutputSchema, { name: "prediction" });

  // Pull recent news for fundamentals
  const newsItems = await fetchCryptoPanicNews({
    currencies: [input.baseSymbol, input.quoteSymbol].filter(Boolean),
    kind: 'news',
    region: 'en',
  });
  const newsSummary = summarizeNews(newsItems, 8);

  const prompt = `You are a risk-aware trading planner.
Combine technical context (OHLC, price, change) and fundamental context (news headlines) to propose limit orders.
Return JSON matching the schema, including:
- rationale: a compact paragraph (2-4 sentences) explaining the plan.
- steps: 3-6 short bullets describing the reasoning (signals, levels, risk controls).
Rules:
- Respect user's budget in ${input.quoteSymbol}.
- Use sensible amounts, limitPrice, future expiry (unix seconds), and slippageBps 25-150.
- Prefer few high-quality orders.
Output strictly valid JSON.`;

  const result = await structured.invoke([
    { role: "system", content: prompt },
    { role: "user", content: JSON.stringify({ ...input, news: newsSummary }) },
  ] as any);
  return result as PredictionOutput;
}


