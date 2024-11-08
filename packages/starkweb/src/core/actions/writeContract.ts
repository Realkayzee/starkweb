import {
  type WriteContractErrorType as strkjs_WriteContractErrorType,
  type WriteContractParameters as strkjs_WriteContractParameters,
  type WriteContractReturnTypes as strkjs_WriteContractReturnTypes,
  writeContract as strkjs_writeContract,
} from '../../actions/index.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'

export type WriteContractParameters = strkjs_WriteContractParameters &
  ChainIdParameter

export type WriteContractReturnType = strkjs_WriteContractReturnTypes

export type WriteContractErrorType = strkjs_WriteContractErrorType

/** https://wagmi.sh/core/api/actions/writeContract */
export function writeContract(
  config: Config,
  parameters: WriteContractParameters,
): Promise<WriteContractReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, strkjs_writeContract, 'writeContract')
  return action(rest) as Promise<WriteContractReturnType>
}
