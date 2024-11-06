import type { Address } from 'abitype'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'

export type GetClassHashAtParameters = {
  contract_address: Address
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
export type GetClassHashAtReturnTypes = any
export type GetClassHashAtErrorType = any

export async function getClassHashAt<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  {
    contract_address,
    block_hash,
    block_number,
    block_tag = 'latest',
  }: GetClassHashAtParameters,
): Promise<GetClassHashAtReturnTypes> {
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')
  return await client.request({
    method: 'starknet_getClassHashAt',
    params: {
      contract_address,
      block_id,
    },
  })
}
