import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdErrorType,
  type GetStarknetIdParameters,
  type GetStarknetIdReturnType,
  getStarknetId,
} from '../actions/getStarknetId.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdOptions = Evaluate<
  ExactPartial<GetStarknetIdParameters> & ScopeKeyParameter
>

export function getStarknetIdQueryOptions(
  config: Config,
  options: GetStarknetIdOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdOptions
      return getStarknetId(config, parameters as GetStarknetIdParameters)
    },
    queryKey: getStarknetIdQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdQueryFnData,
    GetStarknetIdErrorType,
    GetStarknetIdData,
    GetStarknetIdQueryKey
  >
}

export type GetStarknetIdQueryFnData = GetStarknetIdReturnType

export type GetStarknetIdData = GetStarknetIdQueryFnData

export function getStarknetIdQueryKey(options: GetStarknetIdOptions = {}) {
  return ['starknetId', filterQueryOptions(options)] as const
}

export type GetStarknetIdQueryKey = ReturnType<typeof getStarknetIdQueryKey>
