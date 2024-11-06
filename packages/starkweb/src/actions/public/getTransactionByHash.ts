import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'

export type GetTransactionByHashParameters = { transaction_hash: Hash }
export type GetTransactionByHashReturnTypes = any
export type GetTransactionByHashErrorType = any

export async function getTransactionByHash<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { transaction_hash }: GetTransactionByHashParameters,
): Promise<GetTransactionByHashReturnTypes> {
  const transaction = await client.request({
    method: 'starknet_getTransactionByHash',
    params: {
      transaction_hash,
    },
  })
  return transaction
}
