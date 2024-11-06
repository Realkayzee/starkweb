import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'

export type AddInvokeTransactionParameters = any
export type AddInvokeTransactionReturnTypes = any
export type AddInvokeTransactionErrorType = any

export async function addInvokeTransaction<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  args: AddInvokeTransactionParameters,
): Promise<AddInvokeTransactionReturnTypes> {
  const transaction = await client.request({
    method: 'starknet_addInvokeTransaction',
    params: args,
  })
  return transaction
}
