import type { QueryFunctionContext, QueryOptions } from '@tanstack/query-core'
import type {
  ReadContractErrorType as strkjs_ReadContractErrorType,
  ReadContractParameters,
  ReadContractReturnType,
} from '../actions/readContract.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionExactPartial } from '../types/utils.js'
import { readContract } from '../actions/readContract.js'

export type ReadContractOptions = UnionExactPartial<
  ReadContractParameters & ScopeKeyParameter
>
export type ReadContractQueryKey = ['readContract', ReadContractOptions]
export type ReadContractData = ReadContractReturnType

export function readContractQueryOptions(
  config: Config,
  options: ReadContractOptions,
) {
  return {
    queryKey: ['readContract', options] as const,
    queryFn({ queryKey: [, options] }: QueryFunctionContext<ReadContractQueryKey>) {
      return readContract(config, options as ReadContractParameters)
    },
  } as const satisfies QueryOptions<
    ReadContractReturnType,
    ReadContractErrorType,
    ReadContractData,
    ReadContractQueryKey
  >
}

export type ReadContractQueryFnData = ReadContractData
export type ReadContractQueryData = ReadContractData
export type ReadContractErrorType = strkjs_ReadContractErrorType
