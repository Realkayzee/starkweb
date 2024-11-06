import type { Hex } from '../../types/misc.js'
import {
  type GetNonceErrorType as strkjs_GetNonceErrorType,
  type GetNonceParameters as strkjs_GetNonceParameters,
  type GetNonceReturnTypes as strkjs_GetNonceReturnType,
  getNonce as strkjs_getNonce,
} from '../../actions/public/getNonce.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetNonceParameters = Evaluate<
  strkjs_GetNonceParameters & ChainIdParameter
>;

export type GetNonceReturnType = Evaluate<
  strkjs_GetNonceReturnType & {
    chainId: Hex;
  }
>;

export type GetNonceErrorType = strkjs_GetNonceErrorType;


export function getNonce(
  config: Config,
  parameters: GetNonceParameters
): Promise<GetNonceReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, strkjs_getNonce, "getNonce");
  return action(rest) as unknown as Promise<GetNonceReturnType>;
}