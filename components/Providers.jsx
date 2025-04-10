"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { rpcConfig } from '../wagmi';

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <WagmiProvider config={rpcConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 