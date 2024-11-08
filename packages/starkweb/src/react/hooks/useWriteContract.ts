'use client'

import type { ConfigParameter } from '../types/properties.js'
import { type UseMutationReturnType, useMutation, type UseMutationParameters } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import type { Config } from '../../core/createConfig.js'
import type { Evaluate } from '../../types/utils.js'
import { writeContractMutationOptions, type WriteContractData, type WriteContractVariables } from '../../core/query/writeContract.js'
import type { WriteContractErrorType } from '../../actions/index.js'

export type UseWriteContractParameters<
  config extends Config = Config,
> = Evaluate<
  ConfigParameter<config> &
    Omit<UseMutationParameters<
      WriteContractData,
      WriteContractErrorType,
      WriteContractVariables
    >, 'mutation'> & {
      mutation?: Partial<UseMutationParameters<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables
      >>
    }
>;

export type UseWriteContractReturnType =
  UseMutationReturnType<WriteContractData, WriteContractErrorType>;

/** Hook for writing data to a contract */
export function useWriteContract(
  parameters: UseWriteContractParameters
): UseWriteContractReturnType {
  const { mutation = {} } = parameters

  const config = useConfig(parameters)
  // const chainId = useChainId({ config })

  const options = writeContractMutationOptions(config);

  return useMutation({ ...mutation, ...options }) as UseWriteContractReturnType
}
