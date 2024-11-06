import type {
  CallErrorType as strkjs_CallErrorType,
  CallParameters as strkjs_CallParameters,
  CallReturnType as strkjs_CallReturnType,
} from '../../actions/public/call.js'
import { call as strkjs_call } from '../../actions/public/call.js'
import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'

export type CallParameters = strkjs_CallParameters & ChainIdParameter

export type CallReturnType = strkjs_CallReturnType

export type CallErrorType = strkjs_CallErrorType

export async function call<config extends Config>(
  config: config,
  parameters: CallParameters,
): Promise<CallReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, strkjs_call, 'call')
  return action(rest)
}
