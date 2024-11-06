import type { MutationOptions } from '@tanstack/query-core'

import {
  type SwitchAccountErrorType,
  type SwitchAccountParameters,
  type SwitchAccountReturnType,
  switchAccount,
} from '../actions/switchAccount.js'
import type { Evaluate } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'
import type { Config } from '../createConfig.js'

export function switchAccountMutationOptions(
  config: Config,
) {
  return {
    mutationFn(variables) {
      return switchAccount(config, variables)
    },
    mutationKey: ['switchAccount'],
  } as const satisfies MutationOptions<
    SwitchAccountData,
    SwitchAccountErrorType,
    SwitchAccountVariables
  >
}

export type SwitchAccountData = Evaluate<
  SwitchAccountReturnType
>

export type SwitchAccountVariables = Evaluate<SwitchAccountParameters>

export type SwitchAccountMutate<
  context = unknown,
> = Mutate<
  SwitchAccountData,
  SwitchAccountErrorType,
  SwitchAccountVariables,
  context
>

export type SwitchAccountMutateAsync<
  context = unknown,
> = MutateAsync<
  SwitchAccountData,
  SwitchAccountErrorType,
  SwitchAccountVariables,
  context
>
