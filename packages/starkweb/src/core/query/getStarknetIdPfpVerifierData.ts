import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdPfpVerifierDataErrorType,
  type GetStarknetIdPfpVerifierDataParameters,
  type GetStarknetIdPfpVerifierDataReturnType,
  getStarknetIdPfpVerifierData,
} from '../actions/getStarknetIdPfpVerifierData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdPfpVerifierDataOptions = Evaluate<
  ExactPartial<GetStarknetIdPfpVerifierDataParameters> & ScopeKeyParameter
>

export function getStarknetIdPfpVerifierDataQueryOptions(
  config: Config,
  options: GetStarknetIdPfpVerifierDataOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdPfpVerifierDataOptions
      return getStarknetIdPfpVerifierData(config, parameters as GetStarknetIdPfpVerifierDataParameters)
    },
    queryKey: getStarknetIdPfpVerifierDataQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdPfpVerifierDataQueryFnData,
    GetStarknetIdPfpVerifierDataErrorType,
    GetStarknetIdPfpVerifierDataData,
    GetStarknetIdPfpVerifierDataQueryKey
  >
}

export type GetStarknetIdPfpVerifierDataQueryFnData = GetStarknetIdPfpVerifierDataReturnType

export type GetStarknetIdPfpVerifierDataData = GetStarknetIdPfpVerifierDataQueryFnData

export function getStarknetIdPfpVerifierDataQueryKey(options: GetStarknetIdPfpVerifierDataOptions = {}) {
  return ['starknetIdPfpVerifierData', filterQueryOptions(options)] as const
}

export type GetStarknetIdPfpVerifierDataQueryKey = ReturnType<typeof getStarknetIdPfpVerifierDataQueryKey>
