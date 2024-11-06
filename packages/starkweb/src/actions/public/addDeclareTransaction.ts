import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'

export type AddDeclareTransactionParameters = any
export type AddDeclareTransactionReturnTypes = any
export type AddDeclareTransactionErrorType = any

export async function addDeclareTransaction<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  args: AddDeclareTransactionParameters,
): Promise<AddDeclareTransactionReturnTypes> {
  const transaction = await client.request({
    method: 'starknet_addDeclareTransaction',
    params: args,
  })
  return transaction
}
