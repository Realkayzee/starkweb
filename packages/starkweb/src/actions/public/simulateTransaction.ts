import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'

export type SimulateTransactionParameters = any
export type SimulateTransactionReturnTypes = any
export type SimulateTransactionErrorType = any

export async function simulateTransaction<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  args: SimulateTransactionParameters,
): Promise<SimulateTransactionReturnTypes> {
  return client.request({
    method: 'starknet_simulateTransaction',
    params: args,
  })
}
