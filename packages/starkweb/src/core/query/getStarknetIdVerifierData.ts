import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdVerifierDataErrorType,
  type GetStarknetIdVerifierDataParameters,
  type GetStarknetIdVerifierDataReturnType,
  getStarknetIdVerifierData,
} from '../actions/getStarknetIdVerifierData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdVerifierDataOptions = Evaluate<
  ExactPartial<GetStarknetIdVerifierDataParameters> & ScopeKeyParameter
>

export function getStarknetIdVerifierDataQueryOptions(
  config: Config,
  options: GetStarknetIdVerifierDataOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdVerifierDataOptions
      return getStarknetIdVerifierData(config, parameters as GetStarknetIdVerifierDataParameters)
    },
    queryKey: getStarknetIdVerifierDataQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdVerifierDataQueryFnData,
    GetStarknetIdVerifierDataErrorType,
    GetStarknetIdVerifierDataData,
    GetStarknetIdVerifierDataQueryKey
  >
}

export type GetStarknetIdVerifierDataQueryFnData = GetStarknetIdVerifierDataReturnType

export type GetStarknetIdVerifierDataData = GetStarknetIdVerifierDataQueryFnData

export function getStarknetIdVerifierDataQueryKey(options: GetStarknetIdVerifierDataOptions = {}) {
  return ['starknetIdVerifierData', filterQueryOptions(options)] as const
}

export type GetStarknetIdVerifierDataQueryKey = ReturnType<typeof getStarknetIdVerifierDataQueryKey>
