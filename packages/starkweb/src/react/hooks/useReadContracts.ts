'use client'


import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { readContractsQueryOptions, type ReadContractsData } from '../../core/query/readContracts.js'
import type { Config } from '../../core/createConfig.js'
import type { Evaluate } from '../../types/utils.js'
import type { ReadContractsErrorType, ReadContractsOptions, ReadContractsQueryKey } from '../../core/query/readContracts.js'

export type UseReadContractsParameters<
  config extends Config = Config,
  selectData = ReadContractsData
> = Evaluate<
  ReadContractsOptions &
      ConfigParameter<config> &
    QueryParameter<
        ReadContractsData,
        ReadContractsErrorType,
        selectData,
        ReadContractsQueryKey
    > 
>;

export type UseReadContractsReturnType =
  UseQueryReturnType<ReadContractsData, ReadContractsErrorType>;


/** Hook for reading data from a contract */
export function useReadContracts(
  parameters: UseReadContractsParameters
): UseReadContractsReturnType {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

//   const enabled = Boolean(
//     address && abi && functionName && (query.enabled ?? true)
//   )

  const options = readContractsQueryOptions(config, {
    ...parameters,
    chainId,
  });

  return useQuery({ ...query, ...options }) as UseReadContractsReturnType
}