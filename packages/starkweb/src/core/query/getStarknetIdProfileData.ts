import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdProfileDataErrorType,
  type GetStarknetIdProfileDataParameters,
  type GetStarknetIdProfileDataReturnType,
  getStarknetIdProfileData,
} from '../actions/getStarknetIdProfileData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdProfileDataOptions = Evaluate<
  ExactPartial<GetStarknetIdProfileDataParameters> & ScopeKeyParameter
>

export function getStarknetIdProfileDataQueryOptions(
  config: Config,
  options: GetStarknetIdProfileDataOptions = {},
) {
  return {
    async queryFn({ queryKey }: { queryKey: GetStarknetIdProfileDataQueryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdProfileDataOptions
      return getStarknetIdProfileData(config, parameters as GetStarknetIdProfileDataParameters)
    },
    queryKey: getStarknetIdProfileDataQueryKey(options),
  } as QueryOptions<
    GetStarknetIdProfileDataReturnType,
    GetStarknetIdProfileDataErrorType,
    GetStarknetIdProfileDataData,
    GetStarknetIdProfileDataQueryKey
  >
}

export type GetStarknetIdProfileDataQueryFnData = GetStarknetIdProfileDataReturnType

export type GetStarknetIdProfileDataData = GetStarknetIdProfileDataQueryFnData

export function getStarknetIdProfileDataQueryKey(options: GetStarknetIdProfileDataOptions = {}) {
  return ['starknetIdProfileData', filterQueryOptions(options)] as const
}

export type GetStarknetIdProfileDataQueryKey = ReturnType<typeof getStarknetIdProfileDataQueryKey>