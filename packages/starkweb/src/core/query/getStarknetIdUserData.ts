import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdUserDataErrorType,
  type GetStarknetIdUserDataParameters,
  type GetStarknetIdUserDataReturnType,
  getStarknetIdUserData,
} from '../actions/getStarknetIdUserData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdUserDataOptions = Evaluate<
  ExactPartial<GetStarknetIdUserDataParameters> & ScopeKeyParameter
>

export function getStarknetIdUserDataQueryOptions(
  config: Config,
  options: GetStarknetIdUserDataOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdUserDataOptions
      return getStarknetIdUserData(config, parameters as GetStarknetIdUserDataParameters)
    },
    queryKey: getStarknetIdUserDataQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdUserDataQueryFnData,
    GetStarknetIdUserDataErrorType,
    GetStarknetIdUserDataData,
    GetStarknetIdUserDataQueryKey
  >
}

export type GetStarknetIdUserDataQueryFnData = GetStarknetIdUserDataReturnType

export type GetStarknetIdUserDataData = GetStarknetIdUserDataQueryFnData

export function getStarknetIdUserDataQueryKey(options: GetStarknetIdUserDataOptions = {}) {
  return ['starknetIdUserData', filterQueryOptions(options)] as const
}

export type GetStarknetIdUserDataQueryKey = ReturnType<typeof getStarknetIdUserDataQueryKey>
