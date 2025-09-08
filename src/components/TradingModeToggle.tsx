"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, Zap, TrendingUp } from "lucide-react";

type TradingMode = "1inch" | "merkle";

interface TradingModeToggleProps {
  mode: TradingMode;
  onModeChange: (mode: TradingMode) => void;
}

export function TradingModeToggle({ mode, onModeChange }: TradingModeToggleProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5" />
          Trading Platform
        </CardTitle>
        <CardDescription>
          Choose your trading platform - Switch between spot trading and perpetual futures
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1inch Spot Trading */}
          <div
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
              mode === "1inch"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => onModeChange("1inch")}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">1inch Spot Trading</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    DEX aggregation for spot trading
                  </p>
                </div>
              </div>
              <Badge variant={mode === "1inch" ? "default" : "secondary"}>
                Active
              </Badge>
            </div>
            <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div>• Best price discovery across DEXs</div>
              <div>• Instant spot trades</div>
              <div>• Multiple asset pairs</div>
            </div>
          </div>

          {/* Merkle Perpetual Futures */}
          <div
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
              mode === "merkle"
                ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => onModeChange("merkle")}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Merkle Perpetuals</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Leveraged trading on Aptos
                  </p>
                </div>
              </div>
              <Badge variant={mode === "merkle" ? "default" : "secondary"}>
                Testnet
              </Badge>
            </div>
            <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div>• Up to 150x leverage</div>
              <div>• Real-time price feeds</div>
              <div>• Advanced order types</div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Current mode: <span className="font-medium">{mode === "1inch" ? "Spot Trading" : "Perpetual Futures"}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onModeChange(mode === "1inch" ? "merkle" : "1inch")}
            >
              Switch to {mode === "1inch" ? "Merkle" : "1inch"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
