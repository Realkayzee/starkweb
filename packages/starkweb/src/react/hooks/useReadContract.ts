'use client'


import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { readContractQueryOptions, type ReadContractData } from '../../core/query/readContract.js'
import type { ReadContractErrorType } from '../../core/query/readContract.js'
import type { Config } from '../../core/createConfig.js'
import type { Evaluate } from '../../types/utils.js'
import type { ReadContractOptions } from '../../core/query/readContract.js'
import type { ReadContractQueryKey } from '../../core/query/readContract.js'

export type UseReadContractParameters<
  config extends Config = Config,
  selectData = ReadContractData
> = Evaluate<
  ReadContractOptions &
    ConfigParameter<config> &
    QueryParameter<
      ReadContractData,
      ReadContractErrorType,
      selectData,
      ReadContractQueryKey
    > 
>;

export type UseReadContractReturnType =
  UseQueryReturnType<ReadContractData, ReadContractErrorType>;


/** Hook for reading data from a contract */
export function useReadContract(
  parameters: UseReadContractParameters
): UseReadContractReturnType {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

//   const enabled = Boolean(
//     address && abi && functionName && (query.enabled ?? true)
//   )

  const options = readContractQueryOptions(config, {
    ...parameters,
    chainId,
  });

  return useQuery({ ...query, ...options }) as UseReadContractReturnType
}
