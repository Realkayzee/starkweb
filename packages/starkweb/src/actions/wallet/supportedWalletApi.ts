import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { API_VERSION } from '../../types/components.js'

export type SupportedWalletApiParameters = undefined

export type SupportedWalletApiErrorType = {
  error: string
}

export type SupportedWalletApiReturnType = API_VERSION[]

export async function supportedWalletApi<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(client: Client<Transport, TChain, TAccount>) {
  return await client.request(
    {
      method: 'wallet_supportedWalletApi',
    },
    {
      dedupe: true,
      retryCount: 0,
    },
  )
}
