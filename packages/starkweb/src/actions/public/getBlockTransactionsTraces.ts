import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'

export type GetBlockTransactionsTracesParameters = {
  block_hash?: Hash
  block_number?: number
  block_tag?: BlockTag
}

export type GetBlockTransactionsTracesReturnTypes = any
export type GetBlockTransactionsTracesErrorType = any

export async function getBlockTransactionsTraces<
  TChain extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  { block_hash, block_number, block_tag }: GetBlockTransactionsTracesParameters,
): Promise<GetBlockTransactionsTracesReturnTypes> {
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : block_tag
        ? block_tag
        : 'latest'
  return await client.request({
    method: 'starknet_traceBlockTransaction',
    params: {
      block_id,
    },
  })
}
