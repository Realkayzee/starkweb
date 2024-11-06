import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import type { RequestErrorType } from '../../utils/index.js'

export type GetBlockStateUpdateParameters =
  | {
      /** Hash of the block. */
      block_hash?: Hash | undefined
      block_number?: undefined
      block_tag?: undefined
    }
  | {
      block_hash?: undefined
      /** The block number. */
      block_number?: number | undefined
      block_tag?: undefined
    }
  | {
      block_hash?: undefined
      block_number?: undefined
      /** The block tag. Defaults to 'latest'. */
      block_tag?: BlockTag | undefined
    }

export type GetBlockStateUpdateReturnType = any
export type GetBlockStateUpdateErrorType = RequestErrorType | ErrorType

export async function getBlockStateUpdate<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  {
    block_hash,
    block_number,
    block_tag = 'latest',
  }: GetBlockStateUpdateParameters,
): Promise<GetBlockStateUpdateReturnType> {
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')
  const blockStateUpdate = await client.request(
    {
      method: 'starknet_getStateUpdate',
      params: { block_id },
    },
    { dedupe: Boolean(block_id) },
  )

  return blockStateUpdate
}
