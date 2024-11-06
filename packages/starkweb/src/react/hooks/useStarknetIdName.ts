'use client'

import type { Config } from '../../core/createConfig.js'
import type { Evaluate } from '../../types/utils.js'
import type { GetStarknetIdNameErrorType } from '../../actions/starknetId/getStarknetIdName.js'
import type { ResolvedRegister } from '../../core/types/register.js'
import {
  type GetStarknetIdNameData,
  type GetStarknetIdNameOptions,
  type GetStarknetIdNameQueryFnData,
  type GetStarknetIdNameQueryKey,
  getStarknetIdNameQueryOptions,
} from '../../core/query/getStarknetIdName.js'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseStarknetIdNameParameters<
  config extends Config = Config,
  selectData = GetStarknetIdNameData,
> = Evaluate<
  GetStarknetIdNameOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetStarknetIdNameQueryFnData,
      GetStarknetIdNameErrorType,
      selectData,
      GetStarknetIdNameQueryKey
    >
>

export type UseStarknetIdNameReturnType<selectData = GetStarknetIdNameData> =
  UseQueryReturnType<selectData, GetStarknetIdNameErrorType>

/** https://starknet-react.com/hooks/useStarknetIdName */
export function useStarknetIdName<
  config extends Config = ResolvedRegister['config'],
  selectData = GetStarknetIdNameData,
>(
  parameters: UseStarknetIdNameParameters<config, selectData> = {},
): UseStarknetIdNameReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getStarknetIdNameQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(query.enabled ?? true)

  return useQuery({ ...query, ...options, enabled })
}
