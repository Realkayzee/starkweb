import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdStarkProfilesErrorType,
  type GetStarknetIdStarkProfilesParameters,
  type GetStarknetIdStarkProfilesReturnType,
  getStarknetIdStarkProfiles,
} from '../actions/getStarknetIdStarkProfiles.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdStarkProfilesOptions = Evaluate<
  ExactPartial<GetStarknetIdStarkProfilesParameters> & ScopeKeyParameter
>

export function getStarknetIdStarkProfilesQueryOptions(
  config: Config,
  options: GetStarknetIdStarkProfilesOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdStarkProfilesOptions
      return getStarknetIdStarkProfiles(config, parameters as GetStarknetIdStarkProfilesParameters)
    },
    queryKey: getStarknetIdStarkProfilesQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdStarkProfilesQueryFnData,
    GetStarknetIdStarkProfilesErrorType,
    GetStarknetIdStarkProfilesData,
    GetStarknetIdStarkProfilesQueryKey
  >
}

export type GetStarknetIdStarkProfilesQueryFnData = GetStarknetIdStarkProfilesReturnType

export type GetStarknetIdStarkProfilesData = GetStarknetIdStarkProfilesQueryFnData

export function getStarknetIdStarkProfilesQueryKey(options: GetStarknetIdStarkProfilesOptions = {}) {
  return ['starknetIdStarkProfiles', filterQueryOptions(options)] as const
}

export type GetStarknetIdStarkProfilesQueryKey = ReturnType<typeof getStarknetIdStarkProfilesQueryKey>