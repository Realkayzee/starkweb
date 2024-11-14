// @ts-nocheck
'use client'

import type {
  Config,
  ResolvedRegister,
} from 'starkweb/core'
import {
  type EstimateMessageFeeData,
  type EstimateMessageFeeQueryFnData,
  type EstimateMessageFeeQueryKey,
  estimateMessageFeeQueryOptions,
} from 'starkweb/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEstimateMessageFeeParameters<
  config extends Config = ResolvedRegister['config'],
  selectData = EstimateMessageFeeData
> = ConfigParameter<config> &
  QueryParameter<
    EstimateMessageFeeQueryFnData,
    selectData,
    EstimateMessageFeeQueryKey
  >

export type UseEstimateMessageFeeReturnType<selectData = EstimateMessageFeeData> =
  UseQueryReturnType<selectData>

export function useEstimateMessageFee<
  selectData = EstimateMessageFeeData
>(
  parameters: UseEstimateMessageFeeParameters = {}
): UseEstimateMessageFeeReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = estimateMessageFeeQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })

  return useQuery({ ...query, ...options })
}