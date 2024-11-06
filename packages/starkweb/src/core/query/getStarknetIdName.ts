import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdNameErrorType,
  type GetStarknetIdNameParameters,
  type GetStarknetIdNameReturnType,
  getStarknetIdName,
} from '../actions/getStarknetIdName.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdNameOptions = Evaluate<
  ExactPartial<GetStarknetIdNameParameters> & ScopeKeyParameter
>

export function getStarknetIdNameQueryOptions(
  config: Config,
  options: GetStarknetIdNameOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdNameOptions
      return getStarknetIdName(config, parameters as GetStarknetIdNameParameters)
    },
    queryKey: getStarknetIdNameQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdNameQueryFnData,
    GetStarknetIdNameErrorType,
    GetStarknetIdNameData,
    GetStarknetIdNameQueryKey
  >
}

export type GetStarknetIdNameQueryFnData = GetStarknetIdNameReturnType

export type GetStarknetIdNameData = GetStarknetIdNameQueryFnData

export function getStarknetIdNameQueryKey(options: GetStarknetIdNameOptions = {}) {
  return ['starknetIdName', filterQueryOptions(options)] as const
}

export type GetStarknetIdNameQueryKey = ReturnType<typeof getStarknetIdNameQueryKey>
