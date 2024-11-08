'use client'
import type React from 'react';
import { StarkwebProvider, createConfig } from 'starkweb/react';
import { createStorage } from 'starkweb/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ConnectKitProvider, getDefaultConfig } from 'sn-connectkit';
import { mainnet, sepolia } from 'starkweb/chains';
import { http } from 'starkweb';
import { argentX } from '../../../../../packages/starkweb/dist/esm/core/connectors/argentX';

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [argentX()],
  storage: createStorage({
    storage: window.localStorage
  }),
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
