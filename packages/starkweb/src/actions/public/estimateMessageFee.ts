import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Address, Hash, Hex } from '../../types/misc.js'

export type EstimateMessageFeeParameters = {
  from_address: Address
  to_address: Address
  entry_point_selector: Hex
  payload: Hex[]
  block_hash?: Hash
  block_number?: number
  block_tag?: BlockTag
}
export type EstimateMessageFeeReturnTypes = any
export type EstimateMessageFeeErrorType = any

export async function estimateMessageFee<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  {
    from_address,
    to_address,
    entry_point_selector,
    payload,
    block_hash,
    block_number,
    block_tag,
  }: EstimateMessageFeeParameters,
): Promise<EstimateMessageFeeReturnTypes> {
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')
  return await client.request({
    method: 'starknet_estimateMessageFee',
    params: {
      message: {
        from_address,
        to_address,
        entry_point_selector,
        payload,
      },
      block_id,
    },
  })
}
