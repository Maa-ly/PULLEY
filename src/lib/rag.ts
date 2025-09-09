import type { PredictionInput } from "@/utils/types";
import { fetchCryptoPanicNews, summarizeNews } from "@/lib/news/cryptopanic";

/**
 * Build a lightweight, per-request retrieval context from news.
 * Falls back to simple summaries if no embeddings key is configured.
 */
export async function getNewsRetrievalContext(input: PredictionInput, k: number = 6): Promise<string[]> {
  // Pull recent news (already used in existing flow)
  const newsItems = await fetchCryptoPanicNews({
    currencies: [input.baseSymbol, input.quoteSymbol].filter(Boolean),
    kind: "news",
    region: "en",
  });

  // Simple news-based context without LangChain dependencies
  // This provides basic news context for trading decisions

  // Fallback: convert summarized news objects into strings for compact retrieval context
  const items = summarizeNews(newsItems, k);
  const lines = items.map((it) => {
    const parts = [it.title];
    if (it.source) parts.push(`source: ${it.source}`);
    if (it.published_at) parts.push(`time: ${it.published_at}`);
    if (it.instruments?.length) parts.push(`tickers: ${it.instruments.join(",")}`);
    if (it.url) parts.push(`url: ${it.url}`);
    return parts.filter(Boolean).join(" | ");
  });
  return lines;
}


