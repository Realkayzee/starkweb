import type { Hash } from '../../types/misc.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'

export type GetTransactionStatusParameters = { transaction_hash: Hash }
export type GetTransactionStatusReturnType = any
export type GetTransactionStatusErrorType = any

export async function getTransactionStatus<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { transaction_hash }: GetTransactionStatusParameters,
): Promise<GetTransactionStatusReturnType> {
  const transaction = await client.request({
    method: 'starknet_getTransactionStatus',
    params: {
      transaction_hash,
    },
  })
  return transaction
}
