// "use server"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ParticleConnectkit } from "@/lib/particle";
import WagProvider from "@/utils/provider";
import { AptosWalletProvider } from "@/components/AptosWalletProvider";
import { AutoConnectProvider } from "@/components/AutoConnectProvider";
import { TransactionSubmitterProvider } from "@/components/TransactionSubmitterProvider";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulley",
  description: "Pulley is an AI powered trading platform built on the Bitcoiin Core Netwrok.",
};

const COLORS = {
  bg: "#0a0f1a",
  card: "rgba(16,20,26,0.85)",
  accent: "#b6ff3b",
  accent2: "#00ffb0",
  text: "#f1f5f9",
  muted: "#94a3b8",
  border: "#23272f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-hero`}
        style={{ background: COLORS.bg }}
      >
        <WagProvider>
          <ParticleConnectkit>
            <AutoConnectProvider>
              <ReactQueryClientProvider>
                <TransactionSubmitterProvider>
                  <AptosWalletProvider>
                    {children}
                  </AptosWalletProvider>
                </TransactionSubmitterProvider>
              </ReactQueryClientProvider>
            </AutoConnectProvider>
          </ParticleConnectkit>
        </WagProvider>
      </body>
    </html >
  );
}
