import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetWalletClientErrorType as strkjs_GetWalletClientErrorType,
  type GetWalletClientParameters,
  type GetWalletClientReturnType,
  getWalletClient,
} from '../actions/getWalletClient.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetWalletClientOptions = ExactPartial<GetWalletClientParameters> &
  ScopeKeyParameter

export function getWalletClientQueryOptions(
  config: Config,
  options: GetWalletClientOptions = {}
) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }: { queryKey: GetWalletClientQueryKey }) {
      const { connector } = options
      const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1]
      return getWalletClient(config, { ...parameters, connector })
    },
    queryKey: getWalletClientQueryKey(options),
  } as any satisfies QueryOptions<
    GetWalletClientData,
    GetWalletClientErrorType,
    GetWalletClientData,
    GetWalletClientQueryKey
  >
}

export type GetWalletClientData = GetWalletClientReturnType

export function getWalletClientQueryKey(options: GetWalletClientOptions = {}) {
  const { connector, ...parameters } = options
  return [
    'walletClient',
    { ...filterQueryOptions(parameters), connectorUid: connector?.uid },
  ] as const
}
export type GetWalletClientErrorType = strkjs_GetWalletClientErrorType
export type GetWalletClientQueryFnData = GetWalletClientData
export type GetWalletClientQueryOptions = typeof getWalletClientQueryOptions
export type GetWalletClientQueryKey = ReturnType<typeof getWalletClientQueryKey>
