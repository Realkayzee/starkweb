import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type { SYNC_STATUS } from '../../types/components.js'

export type SyncingParameters = undefined
export type SyncingReturnTypes = boolean | SYNC_STATUS
export type SyncingErrorType = any

export async function syncing<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
): Promise<SyncingReturnTypes> {
  const syncing = await client.request({
    method: 'starknet_syncing',
  })
  return syncing
}
