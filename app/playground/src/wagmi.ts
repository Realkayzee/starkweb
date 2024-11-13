// import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
// import { mainnet, sepolia } from 'wagmi/chains'
// import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

import { createConfig, createStorage, cookieStorage } from 'starkweb/core'
import { mainnet, sepolia } from 'starkweb/chains'
import { argentX } from 'starkweb/core'
import { http } from 'starkweb'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [argentX()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}

declare module 'starkweb' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
