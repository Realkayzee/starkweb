import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdExtendedVerifierDataErrorType,
  type GetStarknetIdExtendedVerifierDataParameters,
  type GetStarknetIdExtendedVerifierDataReturnType,
  getStarknetIdExtendedVerifierData,
} from '../actions/getStarknetIdExtendedVerifierData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdExtendedVerifierDataOptions = Evaluate<
  ExactPartial<GetStarknetIdExtendedVerifierDataParameters> & ScopeKeyParameter
>

export function getStarknetIdExtendedVerifierDataQueryOptions(
  config: Config,
  options: GetStarknetIdExtendedVerifierDataOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdExtendedVerifierDataOptions
      return getStarknetIdExtendedVerifierData(config, parameters as GetStarknetIdExtendedVerifierDataParameters)
    },
    queryKey: getStarknetIdExtendedVerifierDataQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdExtendedVerifierDataQueryFnData,
    GetStarknetIdExtendedVerifierDataErrorType,
    GetStarknetIdExtendedVerifierDataData,
    GetStarknetIdExtendedVerifierDataQueryKey
  >
}

export type GetStarknetIdExtendedVerifierDataQueryFnData = GetStarknetIdExtendedVerifierDataReturnType

export type GetStarknetIdExtendedVerifierDataData = GetStarknetIdExtendedVerifierDataQueryFnData

export function getStarknetIdExtendedVerifierDataQueryKey(options: GetStarknetIdExtendedVerifierDataOptions = {}) {
  return ['starknetIdExtendedVerifierData', filterQueryOptions(options)] as const
}

export type GetStarknetIdExtendedVerifierDataQueryKey = ReturnType<typeof getStarknetIdExtendedVerifierDataQueryKey>
