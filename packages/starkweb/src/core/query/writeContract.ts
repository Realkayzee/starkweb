import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import {
  type WriteContractErrorType,
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContract,
} from '../actions/writeContract.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'

export function writeContractMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return writeContract(config, variables)
    },
    mutationKey: ['writeContract'],
  } as const satisfies MutationOptions<
    WriteContractData,
    WriteContractErrorType,
    WriteContractVariables
  >
}

export type WriteContractData = Compute<WriteContractReturnType>

export type WriteContractVariables = WriteContractParameters

export type WriteContractMutate<context = unknown> = (
  variables: WriteContractVariables,
  options?:
    | MutateOptions<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables,
        context
      >
    | undefined,
) => void

export type WriteContractMutateAsync<context = unknown> = (
  variables: WriteContractVariables,
  options?:
    | MutateOptions<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables,
        context
      >
    | undefined,
) => Promise<WriteContractData>
