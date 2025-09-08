"use client"
import React from 'react'
import { mainnet, kairos, coreDao, coreTestnet2, baseSepolia, sonic, sonicBlazeTestnet } from '@wagmi/core/chains'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { AptosWalletProvider } from './aptos-provider'

export const config = createConfig({
  chains: [mainnet, baseSepolia, kairos, coreDao, coreTestnet2, sonic, sonicBlazeTestnet],
  transports: {
    [baseSepolia.id]: http(),
    [kairos.id]: http(),
    [mainnet.id]: http(),
    [coreDao.id]: http(),
    [coreTestnet2.id]: http(),
    [sonic.id]: http(),
    [sonicBlazeTestnet.id]: http(),
  },
  ssr: true,
})

const WagProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <AptosWalletProvider network="testnet">
        {children}
      </AptosWalletProvider>
    </WagmiProvider>
  )
}

export default WagProvider