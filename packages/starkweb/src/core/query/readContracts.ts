import type { QueryFunctionContext, QueryOptions } from '@tanstack/query-core'
import type {
  ReadContractsErrorType as strkjs_ReadContractsErrorType,
  ReadContractsParameters,
  ReadContractsReturnType,
} from '../actions/readContracts.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionExactPartial } from '../types/utils.js'
import { readContracts } from '../actions/readContracts.js'
import { filterQueryOptions } from './utils.js'

export type ReadContractsOptions = UnionExactPartial<
    ReadContractsParameters & ScopeKeyParameter
>
export type ReadContractsData = ReadContractsReturnType

export function readContractsQueryKey(options: ReadContractsOptions = {}) {
  return ['readContracts', filterQueryOptions(options)] as const;
}

export type ReadContractsQueryKey = ReturnType<typeof readContractsQueryKey>;

export function readContractsQueryOptions(
  config: Config,
  options: ReadContractsOptions,
) {
  return {
    queryKey: ['readContracts', options] as const,
    queryFn({ queryKey: [, options] }: QueryFunctionContext<ReadContractsQueryKey>) {
      return readContracts(config, options as ReadContractsParameters)
    },
  } as const satisfies QueryOptions<
    ReadContractsReturnType,
    ReadContractsErrorType,
    ReadContractsData,
    ReadContractsQueryKey
  >
}

export type ReadContractsQueryFnData = ReadContractsData
export type ReadContractsErrorType = strkjs_ReadContractsErrorType
