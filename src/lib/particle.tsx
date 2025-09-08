/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { authWalletConnectors } from '@particle-network/connectkit/auth';
import { baseSepolia, coreDao, coreTestnet1, kairos, solana, sonic, sonicBlazeTestnet } from '@particle-network/connectkit/chains';
import { evmWalletConnectors } from '@particle-network/connectkit/evm';
import { injected as solaInjected, solanaWalletConnectors } from '@particle-network/connectkit/solana';
import { wallet, EntryPosition } from '@particle-network/connectkit/wallet';
import React from 'react';

//Retrived from https://dashboard.particle.network
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;
// const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

if (!projectId || !clientKey || !appId) {
  throw new Error('Please configure the Particle project in .env first!');
}

const config = createConfig({
  projectId,
  clientKey,
  appId,
  appearance: {
    mode: 'dark',
    theme: {
      // modal
      // '--pcm-overlay-background': 'rgba(71, 88, 107, 0.24)',
      '--pcm-overlay-backdrop-filter': 'blur(6px)',
      '--pcm-modal-box-shadow': '0px 2px 4px rgba(0, 0, 0, 0.1)',

      // background
      '--pcm-body-background': '#0a0f1a',
      '--pcm-body-background-secondary': '#EFF0F2',
      '--pcm-body-background-tertiary': '#F9F9FA',

      // foreground
      '--pcm-body-color': '#ffffff',
      // '--pcm-body-color-secondary': '#8B8EA1',
      // '--pcm-body-color-tertiary': '#DCDFE6',

      '--pcm-body-action-color': '#999999',
      '--pcm-accent-color': '#A257FA',
      '--pcm-focus-color': '#A257FA',

      // button
      '--pcm-button-font-weight': '500',
      '--pcm-button-hover-shadow': '0px 2px 4px rgba(0, 0, 0, 0.05)',
      '--pcm-button-border-color': 'gray',

      // primary button
      '--pcm-primary-button-color': '#b6ff3b',
      '--pcm-primary-button-bankground': 'transparent',
      '--pcm-primary-button-hover-background': '#353738',

      // font
      '--pcm-font-family': `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji',
'Segoe UI Symbol'`,

      // radius
      // '--pcm-rounded-sm': '6px',
      // '--pcm-rounded-md': '12px',
      // '--pcm-rounded-lg': '18px',
      // '--pcm-rounded-xl': '24px',
      // '--pcm-rounded-full': '9999px',
      // '--pcm-rounded-xl': '0px',

      '--pcm-success-color': '#58C08F',
      '--pcm-warning-color': '#F59E0A',
      '--pcm-error-color': '#EA4335',

      // '--pcm-wallet-label-color': '#33C759',
    },
  },

  walletConnectors: [
    evmWalletConnectors({
      metadata: { name: 'My App', icon: '', description: '', url: '' }, // Optional, this is Metadata used by WalletConnect and Coinbase
      walletConnectProjectId: 'Replace with your WalletConnect Project ID', // optional, retrieved from https://cloud.walletconnect.com
    }),
    authWalletConnectors({
      // Optional, configure this if you're using social logins
      authTypes: ['email', 'google', 'apple', 'twitter', 'github'], // Optional, restricts the types of social logins supported
      fiatCoin: 'USD', // Optional, also supports CNY, JPY, HKD, INR, and KRW
      promptSettingConfig: {
        // Optional, changes the frequency in which the user is asked to set a master or payment password
        // 0 = Never ask
        // 1 = Ask once
        // 2 = Ask always, upon every entry
        // 3 = Force the user to set this password
        promptMasterPasswordSettingWhenLogin: 1,
        promptPaymentPasswordSettingWhenSign: 1,
      },
    }),
    solanaWalletConnectors(), // Optional, you need to configure it when using Solana
  ],
  plugins: [
    wallet({
      // Optional configurations for the attached embedded wallet modal
      entryPosition: EntryPosition.BR, // Alters the position in which the modal button appears upon login
      visible: true, // Dictates whether or not the wallet modal is included/visible or not
      customStyle: {
        displayTokenAddresses: ["0x4d224452801ACEd8B2F0aebE155379bb5D594381"], // Display a custom token within the wallet modal
        priorityTokenAddresses: ["0x4d224452801ACEd8B2F0aebE155379bb5D594381"],
      },
    }),
  ],
  chains: [baseSepolia,coreDao, kairos, coreTestnet1, solana, sonic, sonicBlazeTestnet],
});

// Export ConnectKitProvider to be used within your index or layout file (or use createConfig directly within those files).
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};