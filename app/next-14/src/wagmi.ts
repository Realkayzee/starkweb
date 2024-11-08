import { http } from 'starkweb'
import { createConfig } from 'starkweb/core'
import { mainnet, sepolia } from 'starkweb/chains'
import { cookieStorage } from 'starkweb/core'
import { createStorage, injected, argentX } from 'starkweb/core'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [
      injected(),
      argentX(),
    ],
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
