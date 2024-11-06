import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Address, Hash, Hex } from '../../types/misc.js'

export type GetNonceParameters = {
  contract_address: Address
  block_hash?: Hash
  block_number?: number
  block_tag?: BlockTag
}
export type GetNonceReturnTypes = Hex
export type GetNonceErrorType = any

export async function getNonce<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { block_hash, block_number, block_tag, contract_address }: GetNonceParameters,
): Promise<GetNonceReturnTypes> {
  return await client.request({
    method: 'starknet_getNonce',
    params: {
      block_id: block_hash
        ? { block_hash }
        : block_number
          ? { block_number }
          : block_tag
            ? block_tag
            : 'latest',
      contract_address,
    },
  })
}
