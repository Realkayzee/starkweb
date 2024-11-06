import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { API_VERSION, STARKNET_CHAIN } from '../../types/components.js'

export type AddStarknetChainParameters = {
  chain: STARKNET_CHAIN
  api_version?: API_VERSION
}

export type AddStarknetChainReturnType = {
  result: boolean
}

export type AddStarknetChainErrorType = {
  code: number
  message: string
}

export async function addStarknetChain<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { chain, api_version }: AddStarknetChainParameters,
): Promise<AddStarknetChainReturnType | AddStarknetChainErrorType> {
  return await client.request({
    method: 'wallet_addStarknetChain',
    params: {
      chain,
      api_version,
    },
  })
}
