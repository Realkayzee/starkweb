// @ts-nocheck

'use client'

import type { ConfigParameter } from '../types/properties.js'
import { type UseMutationParameters, type UseMutationReturnType, useMutation } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import type { Compute } from '../../types/utils.js'
import {
  type SignMessageData,
  type SignMessageMutate,
  type SignMessageMutateAsync,
  type SignMessageVariables,
  signMessageMutationOptions,
} from '../../core/query/signMessage.js'

export type UseSignMessageParameters<context = unknown> = Compute<
  ConfigParameter & {
    mutation?:
      | UseMutationParameters<
          SignMessageData,
          SignMessageVariables,
          context
        >
      | undefined
  }
>

export type UseSignMessageReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    SignMessageData,
    SignMessageVariables,
    context
  > & {
    signMessage: SignMessageMutate<context>
    signMessageAsync: SignMessageMutateAsync<context>
  }
>
export function useSignMessage(
  parameters: UseSignMessageParameters = {}
): UseSignMessageReturnType {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  const mutationOptions = signMessageMutationOptions(config)
  
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    signMessage: mutate,
    signMessageAsync: mutateAsync,
  } as unknown as UseSignMessageReturnType
}
