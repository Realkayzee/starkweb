import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'

import type { API_VERSION } from '../../types/components.js'

export type RequestAccountsParameters = {
  api_version?: API_VERSION | undefined
  silent_mode?: boolean | undefined
}

export type RequestAccountsReturnType = string[]

export type RequestAccountsErrorType = {
  code: number
  message: string
}

export async function requestAccounts<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { api_version, silent_mode = false }: RequestAccountsParameters,
): Promise<RequestAccountsReturnType | RequestAccountsErrorType> {
  return await client.request({
    method: 'wallet_requestAccounts',
    params: {
      api_version,
      silent_mode,
    },
  })
}
