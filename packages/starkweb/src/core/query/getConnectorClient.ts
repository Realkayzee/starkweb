import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetConnectorClientErrorType,
  type GetConnectorClientParameters,
  type GetConnectorClientReturnType,
  getConnectorClient,
} from '../actions/getConnectorClient.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'
import type { Config } from '../createConfig.js'

export type GetConnectorClientOptions = Evaluate<
  ExactPartial<GetConnectorClientParameters> &
    ScopeKeyParameter
>
export type GetConnectorClientQueryFnData = GetConnectorClientReturnType

export function getConnectorClientQueryOptions(
  config: Config,
  options: GetConnectorClientOptions = {},
) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { connector } = options
      const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1]
      return getConnectorClient({
        ...config,
        ...parameters,
        connectors: connector ? [connector] : [],
      }) as Promise<GetConnectorClientReturnType>
    },
    queryKey: getConnectorClientQueryKey(options),
  } as const satisfies QueryOptions<
    GetConnectorClientQueryFnData,
    GetConnectorClientErrorType,
    GetConnectorClientData,
    GetConnectorClientQueryKey
  >
}

export type GetConnectorClientData = GetConnectorClientReturnType

export function getConnectorClientQueryKey(options: GetConnectorClientOptions = {}) {
  const { connector, ...parameters } = options
  return [
    'connectorClient',
    { ...filterQueryOptions(parameters), connectorUid: connector?.uid },
  ] as const
}

export type GetConnectorClientQueryKey = ReturnType<typeof getConnectorClientQueryKey>
