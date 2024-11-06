'use client'

import type { ConfigParameter } from '../types/properties.js'
import { type UseMutationParameters, type UseMutationReturnType, useMutation } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import type { Config } from '../../core/createConfig.js'
import type { Evaluate } from '../../types/utils.js'
import {
  type SignTypedDataData,
  type SignTypedDataQueryFnData,
  type SignTypedDataQueryKey,
  type SignTypedDataOptions,
  signTypedDataQueryOptions,
} from '../../core/query/signTypedData.js'

export type UseSignTypedDataParameters<
  config extends Config = Config,
> = Evaluate<
  ConfigParameter<config> &
  SignTypedDataOptions & {
    mutation?:
      | UseMutationParameters<
          SignTypedDataData,
          SignTypedDataQueryFnData,
          SignTypedDataQueryKey
        >
      | undefined
  }
>

export type UseSignTypedDataReturnType = UseMutationReturnType<SignTypedDataData>

export function useSignTypedData(
  parameters: UseSignTypedDataParameters = {}
): UseSignTypedDataReturnType {
  const { mutation = {} } = parameters

  const config = useConfig(parameters)

  const options = signTypedDataQueryOptions(config, {
    ...parameters,
  })

  return useMutation({ ...mutation, ...options }) as UseSignTypedDataReturnType
}
