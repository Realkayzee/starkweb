import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { SPEC_VERSION } from '../../types/components.js'

export type SupportedSpecsParameters = undefined

export type SupportedSpecsReturnType = SPEC_VERSION[]

export type SupportedSpecsErrorType = {
  code: number
  message: string
}

export async function supportedSpecs<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
): Promise<SupportedSpecsReturnType | SupportedSpecsErrorType> {
  return await client.request({
    method: 'wallet_supportedSpecs',
  })
}
