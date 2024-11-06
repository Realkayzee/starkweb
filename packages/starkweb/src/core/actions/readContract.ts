import {
  type ReadContractErrorType as strkjs_ReadContractErrorType,
  type ReadContractParameters as strkjs_ReadContractParameters,
  type ReadContractReturnTypes as strkjs_ReadContractReturnTypes,
  readContract as strkjs_readContract,
} from '../../actions/public/readContract.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'

export type ReadContractParameters= strkjs_ReadContractParameters &
  ChainIdParameter

export type ReadContractReturnType = strkjs_ReadContractReturnTypes

export type ReadContractErrorType = strkjs_ReadContractErrorType

/** https://wagmi.sh/core/api/actions/readContract */
export function readContract(
  config: Config,
  parameters: ReadContractParameters,
): Promise<ReadContractReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, strkjs_readContract, 'readContract')
  return action(rest as any) as Promise<ReadContractReturnType>
}
