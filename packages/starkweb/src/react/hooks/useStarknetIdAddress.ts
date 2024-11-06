'use client'

import type { Config } from '../../core/createConfig.js'
import type { Evaluate } from '../../types/utils.js'
import type { GetStarknetIdAddressErrorType } from '../../actions/starknetId/getStarknetIdAddress.js'
import type { ResolvedRegister } from '../../core/types/register.js'
import {
  type GetStarknetIdAddressData,
  type GetStarknetIdAddressOptions,
  type GetStarknetIdAddressQueryFnData,
  type GetStarknetIdAddressQueryKey,
  getStarknetIdAddressQueryOptions,
} from '../../core/query/getStarknetIdAddress.js'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseStarknetIdAddressParameters<
  config extends Config = Config,
  selectData = GetStarknetIdAddressData,
> = Evaluate<
  GetStarknetIdAddressOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetStarknetIdAddressQueryFnData,
      GetStarknetIdAddressErrorType,
      selectData,
      GetStarknetIdAddressQueryKey
    >
>

export type UseStarknetIdAddressReturnType<selectData = GetStarknetIdAddressData> =
  UseQueryReturnType<selectData, GetStarknetIdAddressErrorType>

/** https://starknet-react.com/hooks/useStarknetIdAddress */
export function useStarknetIdAddress<
  config extends Config = ResolvedRegister['config'],
  selectData = GetStarknetIdAddressData,
>(
  parameters: UseStarknetIdAddressParameters<config, selectData> = {},
): UseStarknetIdAddressReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getStarknetIdAddressQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(query.enabled ?? true)

  return useQuery({ ...query, ...options, enabled })
}
