/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "@langchain/openai";
import { OllamaEmbeddings } from "@langchain/ollama";
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

  // If no embeddings available, just return concise summaries (existing behavior)
  // Try Ollama embeddings first (local, free). If not available, try OpenAI. Else fallback to summary.
  const docs: Document[] = newsItems.map((n: any) =>
    new Document({
      pageContent: [n.title, n.description, n.url].filter(Boolean).join("\n"),
      metadata: { published_at: n.published_at, source: n.source, url: n.url },
    })
  );

  // Helper to build query
  const queryParts = [
    input.userIntent,
    input.baseSymbol,
    input.quoteSymbol,
    input.timeframe,
    input.riskTolerance,
  ];
  const query = queryParts.filter(Boolean).join(" ");

  // Attempt Ollama
  try {
    const ollamaEmb = new OllamaEmbeddings({ model: "nomic-embed-text" });
    const store = await MemoryVectorStore.fromDocuments(docs, ollamaEmb);
    const retriever = store.asRetriever(k);
    const results = await retriever.invoke(query);
    return results.map((d) => d.pageContent);
  } catch (_e) {
    // ignore and try OpenAI next
  }

  // Attempt OpenAI if key present
  if (process.env.OPENAI_API_KEY) {
    try {
      const store = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());
      const retriever = store.asRetriever(k);
      const results = await retriever.invoke(query);
      return results.map((d) => d.pageContent);
    } catch (_e) {
      // ignore and fallback to summary
    }
  }

  // Fallback
  const summary = summarizeNews(newsItems, k);
  return Array.isArray(summary) ? summary : [summary];
}


