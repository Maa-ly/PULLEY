/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  Wallet,
  Building2,
  Vault,
  FolderOpen,
  Droplets,
  ArrowLeftRight,
  Menu,
  FileText,
  BarChart,
  FileEdit,
  DollarSign,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Mail,
  LogOut,
  // User
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAccount, useDisconnect } from '@particle-network/connectkit';
import { useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosWalletSelector } from './AptosWalletSelector';
import { useToast } from './ui/use-toast';
import { ConnectButton } from "@particle-network/connectkit";


const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Portfolio");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  // Particle Network ConnectKit hooks
  const { address: evmAddress, isConnected: evmIsConnected } = useAccount();
  const { disconnect: disconnectEVM } = useDisconnect();
  
  // Aptos wallet hooks
  const { account: aptosAccount, connected: aptosIsConnected, disconnect: disconnectAptos } = useAptosWallet();
  
  // Toast notifications
  const { toast } = useToast();

  // Fix hydration error by ensuring client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show connection status toasts
  useEffect(() => {
    if (mounted && evmIsConnected && evmAddress) {
      toast({
        title: "EVM Wallet Connected",
        description: `Connected to ${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}`,
        variant: "default",
      });
    }
  }, [evmIsConnected, evmAddress, mounted, toast]);

  useEffect(() => {
    if (mounted && aptosIsConnected && aptosAccount?.address) {
      toast({
        title: "Aptos Wallet Connected",
        description: `Connected to ${aptosAccount.address.toString().slice(0, 6)}...${aptosAccount.address.toString().slice(-4)}`,
        variant: "default",
      });
    }
  }, [aptosIsConnected, aptosAccount, mounted, toast]);

  // Debug logging
  console.log("Sidebar - evmIsConnected:", evmIsConnected);
  console.log("Sidebar - evmAddress:", evmAddress);
  console.log("Sidebar - aptosIsConnected:", aptosIsConnected);
  console.log("Sidebar - aptosAccount:", aptosAccount);

  // Function to get EVM display name
  const getEVMDisplayName = () => {
    if (!mounted) {
      return "Loading...";
    }
    
    if (!evmIsConnected) {
      return "Connect EVM";
    }

    if (evmAddress) {
      return `${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}`;
    }

    return "EVM Connected";
  };

  // Function to get Aptos display name
  const getAptosDisplayName = () => {
    if (!mounted) {
      return "Loading...";
    }
    
    if (!aptosIsConnected) {
      return "Connect Aptos";
    }

    if (aptosAccount?.address) {
      return `${aptosAccount.address.toString().slice(0, 6)}...${aptosAccount.address.toString().slice(-4)}`;
    }

    return "Aptos Connected";
  };

  // Function to get user avatar
  const getUserAvatar = () => {
    // For ConnectKit, we don't have direct access to social login avatars
    // We'll use a default avatar or generate one based on the address
    return "";
  };

  // Don't render the disconnect button until mounted to prevent hydration mismatch
  const shouldShowEVMDisconnect = mounted && evmIsConnected;
  const shouldShowAptosDisconnect = mounted && aptosIsConnected;

  const navigationItems = [
    { name: "markets", icon: BarChart3, count: 1 },
    { name: "trading", icon: TrendingUp, count: 1 },
    { name: "wallet", icon: Wallet, count: 1 },
    { name: "loans", icon: Building2, count: 1 },
    { name: "vaults", icon: Vault, count: 1 },
    { name: "portfolio", icon: FolderOpen, count: 1 },
    { name: "liquidity-pools", icon: Droplets, count: 1 },
    { name: "swap", icon: ArrowLeftRight, count: 1 },
  ];

  const uiElements = [
    { name: "menu-styles", displayName: "Menu Styles", icon: Menu },
    { name: "tables", displayName: "Tables", icon: FileText },
    { name: "charts", displayName: "Charts", icon: BarChart },
    { name: "forms", displayName: "Forms", icon: FileEdit },
    { name: "pricing", displayName: "Pricing", icon: DollarSign },
    { name: "settings", displayName: "Settings", icon: Settings },
    { name: "modals", displayName: "Modals/Pop-Ups", icon: HelpCircle },
  ];

  const supportItems = [
    { name: "documentation", displayName: "Documentation", icon: FileText },
    { name: "support", displayName: "Support", icon: HelpCircle },
  ];

  return (
    <div className="w-full bg-crypto-darker border-r border-crypto-border flex flex-col overflow-hidden h-full">
      {/* Header */}
      <div className="p-3 border-b border-crypto-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <Link href="/" className="text-foreground font-semibold text-sm">Pulley</Link>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
              <Search className="w-3 h-3 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
              <Bell className="w-3 h-3 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
              <Mail className="w-3 h-3 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Pages Section */}
        <div className="p-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            PAGES
          </h3>
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  prefetch={true}
                  href={`/app/${item.name}`}
                  className={
                    cn(
                      "w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors cursor-pointer",
                      activeItem === item.name
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-crypto-card"
                    )}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="capitalize text-sm">{item.name}</span>
                  </div>
                  <span className="text-xs">{item.count}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* UI Elements Section */}
        <div className="p-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            UI ELEMENTS
          </h3>
          <div className="space-y-1">
            {uiElements.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  prefetch={true}
                  href={`/app/ui/${item.name}`}
                  className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-crypto-card transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.displayName}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Documentation & Support */}
        <div className="p-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            DOCUMENTATION & SUPPORT
          </h3>
          <div className="space-y-1">
            {supportItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  prefetch={true}
                  href={`/app/${item.name}`}
                  className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-crypto-card transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.displayName}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer with Wallet Connections */}
      {mounted && (
        <div className="p-3 border-t border-crypto-border space-y-3">
          {/* EVM Wallet */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">E</span>
              </div>
              <span className="text-xs text-muted-foreground">EVM</span>
            </div>
            <div className="flex items-center space-x-1">
              {evmIsConnected ? (
                <>
                  <span className="text-xs text-green-400">{getEVMDisplayName()}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 text-red-400 hover:text-red-300"
                    onClick={() => {
                      try {
                        disconnectEVM();
                        toast({
                          title: "EVM Wallet Disconnected",
                          description: "Successfully disconnected from EVM wallet",
                          variant: "default",
                        });
                      } catch (error: any) {
                        toast({
                          title: "Disconnect Failed",
                          description: error.message || "Failed to disconnect EVM wallet",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    <LogOut className="w-3 h-3" />
                  </Button>
                </>
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>

          {/* Aptos Wallet */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">A</span>
              </div>
              <span className="text-xs text-muted-foreground">Aptos</span>
            </div>
            <div className="flex items-center space-x-1">
              {aptosIsConnected ? (
                <>
                  <span className="text-xs text-green-400">{getAptosDisplayName()}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 text-red-400 hover:text-red-300"
                    onClick={() => {
                      try {
                        disconnectAptos();
                        toast({
                          title: "Aptos Wallet Disconnected",
                          description: "Successfully disconnected from Aptos wallet",
                          variant: "default",
                        });
                      } catch (error: any) {
                        toast({
                          title: "Disconnect Failed",
                          description: error.message || "Failed to disconnect Aptos wallet",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    <LogOut className="w-3 h-3" />
                  </Button>
                </>
              ) : (
                <AptosWalletSelector />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Sidebar };