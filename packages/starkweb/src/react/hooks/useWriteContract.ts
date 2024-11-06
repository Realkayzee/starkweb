// @ts-nocheck
'use client'

import { writeContractMutationOptions, type WriteContractData, type WriteContractVariables } from 'sn-wolf-core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseMutationReturnType, useMutation } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import type { Config, WriteContractErrorType } from 'sn-wolf-core'
import type { Evaluate } from 'sn-wolf-core/internal'

export type UseWriteContractParameters<
  config extends Config = Config,
> = Evaluate<
  WriteContractOptions &
    ConfigParameter<config> &
    MutationParameter<
      WriteContractData,
      WriteContractErrorType,
      WriteContractVariables,
      WriteContractMutationKey
    > 
>;

export type UseWriteContractReturnType =
  UseMutationReturnType<WriteContractData, WriteContractErrorType>;

/** Hook for writing data to a contract */
export function useWriteContract(
  parameters: UseWriteContractParameters
): UseWriteContractReturnType {
  const { mutation = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = writeContractMutationOptions(config, {
    ...parameters,
    chainId,
  });

  return useMutation({ ...mutation, ...options }) as UseWriteContractReturnType
}
