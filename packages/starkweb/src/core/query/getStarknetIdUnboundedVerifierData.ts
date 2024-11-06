import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdUnboundedVerifierDataErrorType,
  type GetStarknetIdUnboundedVerifierDataParameters,
  type GetStarknetIdUnboundedVerifierDataReturnType,
  getStarknetIdUnboundedVerifierData,
} from '../actions/getStarknetIdUnboundedVerifierData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdUnboundedVerifierDataOptions = Evaluate<
  ExactPartial<GetStarknetIdUnboundedVerifierDataParameters> & ScopeKeyParameter
>

export function getStarknetIdUnboundedVerifierDataQueryOptions(
  config: Config,
  options: GetStarknetIdUnboundedVerifierDataOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdUnboundedVerifierDataOptions
      return getStarknetIdUnboundedVerifierData(config, parameters as GetStarknetIdUnboundedVerifierDataParameters)
    },
    queryKey: getStarknetIdUnboundedVerifierDataQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdUnboundedVerifierDataQueryFnData,
    GetStarknetIdUnboundedVerifierDataErrorType,
    GetStarknetIdUnboundedVerifierDataData,
    GetStarknetIdUnboundedVerifierDataQueryKey
  >
}

export type GetStarknetIdUnboundedVerifierDataQueryFnData = GetStarknetIdUnboundedVerifierDataReturnType

export type GetStarknetIdUnboundedVerifierDataData = GetStarknetIdUnboundedVerifierDataQueryFnData

export function getStarknetIdUnboundedVerifierDataQueryKey(options: GetStarknetIdUnboundedVerifierDataOptions = {}) {
  return ['starknetIdUnboundedVerifierData', filterQueryOptions(options)] as const
}

export type GetStarknetIdUnboundedVerifierDataQueryKey = ReturnType<typeof getStarknetIdUnboundedVerifierDataQueryKey>