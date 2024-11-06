// @ts-nocheck
'use client'

import type { Config } from '../../core/createConfig.js'
import type { GetStorageAtErrorType } from '../../actions/public/getStorageAt.js'
import type { ResolvedRegister } from '../../core/types/register.js'
import {
  type GetStorageAtData,
  type GetStorageAtOptions,
  type GetStorageAtQueryFnData,
  type GetStorageAtQueryKey,
  getStorageAtQueryOptions,
} from '../../core/query/getStorageAt.js'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseStorageAtParameters<
  config extends Config = ResolvedRegister['config'],
  selectData = GetStorageAtData,
> = GetStorageAtOptions &
  ConfigParameter<config> &
  QueryParameter<
    GetStorageAtQueryFnData,
    GetStorageAtErrorType,
    selectData,
    GetStorageAtQueryKey
  >

export type UseStorageAtReturnType<selectData = GetStorageAtData> =
  UseQueryReturnType<selectData, GetStorageAtErrorType>

export function useStorageAt<
  config extends Config = ResolvedRegister['config'],
  selectData = GetStorageAtData,
>(
  parameters: UseStorageAtParameters<config, selectData> = {}
): UseStorageAtReturnType<selectData> {
  const { address, slot, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getStorageAtQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(address && slot && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}