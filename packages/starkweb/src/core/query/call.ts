import type { QueryOptions } from '@tanstack/query-core'

import {
  type CallErrorType,
  type CallParameters,
  type CallReturnType,
  call,
} from '../actions/call.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type CallOptions = ExactPartial<CallParameters> & ScopeKeyParameter

export function callQueryOptions<config extends Config>(
  config: config,
  options: CallOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const data = await call(config, {
        ...parameters,
      } as CallParameters)
      return data ?? null
    },
    queryKey: callQueryKey(options),
  } as const satisfies QueryOptions<
    CallQueryFnData,
    CallErrorType,
    CallData,
    CallQueryKey
  >
}

export type CallQueryFnData = CallReturnType

export type CallData = CallQueryFnData

export function callQueryKey(options: CallOptions) {
  return ['call', filterQueryOptions(options)] as const
}

export type CallQueryKey = ReturnType<typeof callQueryKey>
