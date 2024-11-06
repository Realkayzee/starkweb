import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetStarknetIdAddressErrorType,
  type GetStarknetIdAddressParameters,
  type GetStarknetIdAddressReturnType,
  getStarknetIdAddress,
} from '../actions/getStarknetIdAddress.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStarknetIdAddressOptions = Evaluate<
  ExactPartial<GetStarknetIdAddressParameters> & ScopeKeyParameter
>

export function getStarknetIdAddressQueryOptions(
  config: Config,
  options: GetStarknetIdAddressOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1] as GetStarknetIdAddressOptions
      return getStarknetIdAddress(config, parameters as GetStarknetIdAddressParameters)
    },
    queryKey: getStarknetIdAddressQueryKey(options),
  } as const satisfies QueryOptions<
    GetStarknetIdAddressQueryFnData,
    GetStarknetIdAddressErrorType,
    GetStarknetIdAddressData,
    GetStarknetIdAddressQueryKey
  >
}

export type GetStarknetIdAddressQueryFnData = GetStarknetIdAddressReturnType

export type GetStarknetIdAddressData = GetStarknetIdAddressQueryFnData

export function getStarknetIdAddressQueryKey(options: GetStarknetIdAddressOptions = {}) {
  return ['starknetIdAddress', filterQueryOptions(options)] as const
}

export type GetStarknetIdAddressQueryKey = ReturnType<typeof getStarknetIdAddressQueryKey>
