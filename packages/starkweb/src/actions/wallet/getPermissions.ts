import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { API_VERSION } from '../../types/components.js'

export type GetPermissionsParameters = {
  api_version?: API_VERSION
}

export type GetPermissionsReturnType = {
  permissions: string[]
}

export type GetPermissionsErrorType = {
  code: number
  message: string
}

export async function getPermissions<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { api_version }: GetPermissionsParameters,
): Promise<GetPermissionsReturnType | GetPermissionsErrorType> {
  return await client.request({
    method: 'wallet_getPermissions',
    params: api_version ? { api_version } : undefined,
  })
}
