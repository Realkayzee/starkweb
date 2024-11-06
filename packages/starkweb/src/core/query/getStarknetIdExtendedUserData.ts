import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdExtendedUserDataErrorType,
  type GetStarknetIdExtendedUserDataParameters,
  type GetStarknetIdExtendedUserDataReturnType,
  getStarknetIdExtendedUserData,
} from '../actions/getStarknetIdExtendedUserData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdExtendedUserDataOptions = Evaluate<
  ExactPartial<GetStarknetIdExtendedUserDataParameters> & ScopeKeyParameter
>

export function getStarknetIdExtendedUserDataQueryOptions(
  config: Config,
  options: GetStarknetIdExtendedUserDataOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdExtendedUserDataOptions
      return getStarknetIdExtendedUserData(config, parameters as GetStarknetIdExtendedUserDataParameters)
    },
    queryKey: getStarknetIdExtendedUserDataQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdExtendedUserDataQueryFnData,
    GetStarknetIdExtendedUserDataErrorType,
    GetStarknetIdExtendedUserDataData,
    GetStarknetIdExtendedUserDataQueryKey
  >
}

export type GetStarknetIdExtendedUserDataQueryFnData = GetStarknetIdExtendedUserDataReturnType

export type GetStarknetIdExtendedUserDataData = GetStarknetIdExtendedUserDataQueryFnData

export function getStarknetIdExtendedUserDataQueryKey(options: GetStarknetIdExtendedUserDataOptions = {}) {
  return ['starknetIdExtendedUserData', filterQueryOptions(options)] as const
}

export type GetStarknetIdExtendedUserDataQueryKey = ReturnType<typeof getStarknetIdExtendedUserDataQueryKey>
