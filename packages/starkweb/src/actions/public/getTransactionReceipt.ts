import type { Hash } from '../../types/misc.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'

export type GetTransactionReceiptParameters = { transaction_hash: Hash }
export type GetTransactionReceiptReturnType = any
export type GetTransactionReceiptErrorType = any

export async function getTransactionReceipt<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { transaction_hash }: GetTransactionReceiptParameters,
): Promise<GetTransactionReceiptReturnType> {
  const transaction = await client.request({
    method: 'starknet_getTransactionReceipt',
    params: {
      transaction_hash,
    },
  })
  return transaction
}
