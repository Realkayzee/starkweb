import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdUnboundedUserDataErrorType,
  type GetStarknetIdUnboundedUserDataParameters,
  type GetStarknetIdUnboundedUserDataReturnType,
  getStarknetIdUnboundedUserData,
} from '../actions/getStarknetIdUnboundedUserData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdUnboundedUserDataOptions = Evaluate<
  ExactPartial<GetStarknetIdUnboundedUserDataParameters> & ScopeKeyParameter
>

export function getStarknetIdUnboundedUserDataQueryOptions(
  config: Config,
  options: GetStarknetIdUnboundedUserDataOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdUnboundedUserDataOptions
      return getStarknetIdUnboundedUserData(config, parameters as GetStarknetIdUnboundedUserDataParameters)
    },
    queryKey: getStarknetIdUnboundedUserDataQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdUnboundedUserDataQueryFnData,
    GetStarknetIdUnboundedUserDataErrorType,
    GetStarknetIdUnboundedUserDataData,
    GetStarknetIdUnboundedUserDataQueryKey
  >
}

export type GetStarknetIdUnboundedUserDataQueryFnData = GetStarknetIdUnboundedUserDataReturnType

export type GetStarknetIdUnboundedUserDataData = GetStarknetIdUnboundedUserDataQueryFnData

export function getStarknetIdUnboundedUserDataQueryKey(options: GetStarknetIdUnboundedUserDataOptions = {}) {
  return ['starknetIdUnboundedUserData', filterQueryOptions(options)] as const
}

export type GetStarknetIdUnboundedUserDataQueryKey = ReturnType<typeof getStarknetIdUnboundedUserDataQueryKey>
