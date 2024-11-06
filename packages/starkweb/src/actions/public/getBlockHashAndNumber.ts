import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type { BLOCK_HASH, BLOCK_NUMBER } from '../../types/components.js'

export type GetBlockHashAndNumberParameters = undefined
export type GetBlockHashAndNumberReturnTypes = {
  block_hash: BLOCK_HASH
  block_number: BLOCK_NUMBER
}
export type GetBlockHashAndNumberErrorType = any

export async function getBlockHashAndNumber<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
): Promise<GetBlockHashAndNumberReturnTypes> {
  const block = await client.request({
    method: 'starknet_blockHashAndNumber',
  })
  return block
}
