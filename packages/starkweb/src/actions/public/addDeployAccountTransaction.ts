import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'

export type AddDeployAccountTransactionParameters = any
export type AddDeployAccountTransactionReturnTypes = any
export type AddDeployAccountTransactionErrorType = any

export async function addDeployAccountTransaction<
  TChain extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  args: AddDeployAccountTransactionParameters,
): Promise<AddDeployAccountTransactionReturnTypes> {
  const transaction = await client.request({
    method: 'starknet_addDeployAccountTransaction',
    params: args,
  })
  return transaction
}
