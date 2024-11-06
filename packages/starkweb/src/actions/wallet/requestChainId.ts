import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { API_VERSION } from '../../types/components.js'

export type RequestChainIdParameters = {
  api_version?: API_VERSION
}

export type RequestChainIdReturnType = string

export type RequestChainIdErrorType = {
  code: number
  message: string
}

export async function requestChainId<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { api_version }: RequestChainIdParameters,
): Promise<RequestChainIdReturnType | RequestChainIdErrorType> {
  return await client.request({
    method: 'wallet_requestChainId',
    params: {
      api_version,
    },
  })
}
