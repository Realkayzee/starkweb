import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { API_VERSION, ASSET } from '../../types/components.js'

export type WatchAssetParameters = {
  asset: ASSET
  api_version?: API_VERSION
}

export type WatchAssetReturnType = {
  result: boolean
}

export type WatchAssetErrorType = {
  code: number
  message: string
}

export async function watchAsset<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { asset, api_version }: WatchAssetParameters,
): Promise<WatchAssetReturnType | WatchAssetErrorType> {
  return await client.request({
    method: 'wallet_watchAsset',
    params: {
      asset,
      api_version,
    },
  })
}
