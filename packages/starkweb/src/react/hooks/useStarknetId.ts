'use client'

import type { Config } from '../../core/createConfig.js'
import type { Evaluate } from '../../types/utils.js'
import type { GetStarknetIdErrorType } from '../../actions/starknetId/getStarknetId.js'
import type { ResolvedRegister } from '../../core/types/register.js'
import {
  type GetStarknetIdData,
  type GetStarknetIdOptions,
  type GetStarknetIdQueryFnData,
  type GetStarknetIdQueryKey,
  getStarknetIdQueryOptions,
} from '../../core/query/getStarknetId.js'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseStarknetIdParameters<
  config extends Config = Config,
  selectData = GetStarknetIdData,
> = Evaluate<
  GetStarknetIdOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetStarknetIdQueryFnData,
      GetStarknetIdErrorType,
      selectData,
      GetStarknetIdQueryKey
    >
>

export type UseStarknetIdReturnType<selectData = GetStarknetIdData> =
  UseQueryReturnType<selectData, GetStarknetIdErrorType>

/** https://starknet-react.com/hooks/useStarknetId */
export function useStarknetId<
  config extends Config = ResolvedRegister['config'],
  selectData = GetStarknetIdData,
>(
  parameters: UseStarknetIdParameters<config, selectData> = {},
): UseStarknetIdReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getStarknetIdQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(query.enabled ?? true)

  return useQuery({ ...query, ...options, enabled })
}
