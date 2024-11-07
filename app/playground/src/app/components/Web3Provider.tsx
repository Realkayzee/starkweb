'use client'
import type React from 'react';
import { StarkwebProvider, createConfig } from 'starkweb/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ConnectKitProvider, getDefaultConfig } from 'sn-connectkit';
import { mainnet, sepolia } from 'starkweb/chains';
import { http } from 'starkweb';

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.chain_id]: http(),
    [sepolia.chain_id]: http()
  },
  ssr: true
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StarkwebProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StarkwebProvider>
  );
};
