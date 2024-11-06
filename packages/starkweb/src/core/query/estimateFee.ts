import type { QueryOptions } from '@tanstack/query-core'

import {
  type EstimateFeeErrorType,
  type EstimateFeeParameters,
  type EstimateFeeReturnType,
  estimateFee,
} from '../actions/estimateFee.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateFeeOptions = ExactPartial<EstimateFeeParameters> & ScopeKeyParameter

export function estimateFeeQueryOptions<
  config extends Config,
>(config: config, options: EstimateFeeOptions = {} as any) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      return estimateFee(config, { ...(parameters as any) })
    },
    queryKey: estimateFeeQueryKey(options),
  } as const satisfies QueryOptions<
    EstimateFeeQueryFnData,
    EstimateFeeErrorType,
    EstimateFeeData,
    EstimateFeeQueryKey
  >
}

export type EstimateFeeQueryFnData = EstimateFeeReturnType

export type EstimateFeeData = EstimateFeeQueryFnData

export function estimateFeeQueryKey(options: EstimateFeeOptions = {} as any) {
  return ['estimateFee', filterQueryOptions(options)] as const
}

export type EstimateFeeQueryKey = ReturnType<typeof estimateFeeQueryKey>