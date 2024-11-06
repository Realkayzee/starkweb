'use client'


import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { getBalanceQueryOptions, type GetBalanceData } from '../../core/query/getBalance.js'
import type { GetBalanceErrorType, GetBalanceOptions, GetBalanceQueryKey } from '../../core/query/getBalance.js'
import type { Evaluate } from '../../core/types/utils.js'
import type { Config } from '../../core/createConfig.js'

export type UseBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData
> = Evaluate<
  GetBalanceOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetBalanceData,
      GetBalanceErrorType,
      selectData,
      GetBalanceQueryKey
    > 
>;

export type UseBalanceReturnType =
  UseQueryReturnType<GetBalanceData, GetBalanceErrorType>;


/** Hook for reading data from a contract */
export function useBalance(
  parameters: UseBalanceParameters
): UseBalanceReturnType {
  const { address, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getBalanceQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  });

  const enabled = Boolean(address && (query.enabled ?? true));

  const queryOptions = {
    ...query,
    ...options,
    enabled,
    queryKey: options.queryKey,
  };
  // @ts-ignore
  return useQuery(queryOptions);
}