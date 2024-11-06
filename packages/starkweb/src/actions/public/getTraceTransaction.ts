import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'

export type GetTraceTransactionParameters = {
  transaction_hash: Hash
}
export type GetTraceTransactionReturnTypes = any
export type GetTraceTransactionErrorType = any

export async function getTraceTransaction<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { transaction_hash }: GetTraceTransactionParameters,
): Promise<GetTraceTransactionReturnTypes> {
  return await client.request({
    method: 'starknet_traceTransaction',
    params: {
      transaction_hash,
    },
  })
}
