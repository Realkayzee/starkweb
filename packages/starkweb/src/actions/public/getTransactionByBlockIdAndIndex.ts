import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'

export type GetTransactionByBlockIdAndIndexParameters = {
  index: number
} & (
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
)
export type GetTransactionByBlockIdAndIndexReturnTypes = any
export type GetTransactionByBlockIdAndIndexErrorType = any

export async function getTransactionByBlockIdAndIndex<
  TChain extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    block_hash,
    block_number,
    block_tag = 'latest',
    index,
  }: GetTransactionByBlockIdAndIndexParameters,
): Promise<GetTransactionByBlockIdAndIndexReturnTypes> {
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')
  const transaction = await client.request({
    method: 'starknet_getTransactionByBlockIdAndIndex',
    params: { block_id, index },
  })
  return transaction
}
