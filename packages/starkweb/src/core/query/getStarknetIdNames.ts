import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdNamesErrorType,
  type GetStarknetIdNamesParameters,
  type GetStarknetIdNamesReturnType,
  getStarknetIdNames,
} from '../actions/getStarknetIdNames.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdNamesOptions = Evaluate<
  ExactPartial<GetStarknetIdNamesParameters> & ScopeKeyParameter
>

export function getStarknetIdNamesQueryOptions(
  config: Config,
  options: GetStarknetIdNamesOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdNamesOptions
      return getStarknetIdNames(config, parameters as GetStarknetIdNamesParameters)
    },
    queryKey: getStarknetIdNamesQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdNamesQueryFnData,
    GetStarknetIdNamesErrorType,
    GetStarknetIdNamesData,
    GetStarknetIdNamesQueryKey
  >
}

export type GetStarknetIdNamesQueryFnData = GetStarknetIdNamesReturnType

export type GetStarknetIdNamesData = GetStarknetIdNamesQueryFnData

export function getStarknetIdNamesQueryKey(options: GetStarknetIdNamesOptions = {}) {
  return ['starknetIdNames', filterQueryOptions(options)] as const
}

export type GetStarknetIdNamesQueryKey = ReturnType<typeof getStarknetIdNamesQueryKey>
