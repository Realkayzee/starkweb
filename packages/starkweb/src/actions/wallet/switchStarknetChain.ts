import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { API_VERSION, CHAIN_ID } from '../../types/components.js'

export type SwitchStarknetChainParameters = {
  chain_id: CHAIN_ID
  api_version?: API_VERSION
}

export type SwitchStarknetChainReturnType = {
  result: boolean
}

export type SwitchStarknetChainErrorType = {
  code: number
  message: string
}

export async function switchStarknetChain<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { chain_id, api_version }: SwitchStarknetChainParameters,
): Promise<SwitchStarknetChainReturnType | SwitchStarknetChainErrorType> {
  return await client.request({
    method: 'wallet_switchStarknetChain',
    params: {
      chainId: chain_id,
      api_version,
    },
  })
}
