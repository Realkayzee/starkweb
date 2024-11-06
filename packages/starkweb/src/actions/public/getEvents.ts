import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type {
  ADDRESS,
  BLOCK_HASH,
  BLOCK_NUMBER,
  BLOCK_TAG,
  FELT,
} from '../../types/components.js'

export type GetEventsParameters = {
  from_block_tag?: BLOCK_TAG
  from_block_hash?: BLOCK_HASH
  from_block_number?: BLOCK_NUMBER

  to_block_tag?: BLOCK_TAG
  to_block_hash?: BLOCK_HASH
  to_block_number?: BLOCK_NUMBER

  address: ADDRESS
  keys: FELT[][]
  continuation_token?: FELT
  chunk_size: number
}

export type GetEventsReturnTypes = any
export type GetEventsErrorType = any

export async function getEvents<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  {
    from_block_tag,
    from_block_hash,
    from_block_number,
    to_block_tag,
    to_block_hash,
    to_block_number,
    address,
    keys,
    continuation_token = '0x',
    chunk_size,
  }: GetEventsParameters,
): Promise<GetEventsReturnTypes> {
  const from_block_id = {
    block_id: from_block_hash
      ? { block_hash: from_block_hash }
      : from_block_number
        ? { block_number: from_block_number }
        : from_block_tag
          ? from_block_tag
          : 'latest',
  }
  const to_block_id = {
    block_id: to_block_hash
      ? { block_hash: to_block_hash }
      : to_block_number
        ? { block_number: to_block_number }
        : to_block_tag
          ? to_block_tag
          : 'latest',
  }
  return await client.request({
    method: 'starknet_getEvents',
    params: {
      filter: {
        from_block: from_block_id.block_id,
        to_block: to_block_id.block_id,
        address,
        keys,
        continuation_token,
        chunk_size,
      },
    },
  })
}
