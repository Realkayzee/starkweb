import {
  type GetClassErrorType as strkjs_GetClassErrorType,
  type GetClassParameters as strkjs_GetClassParameters,
  type GetClassReturnTypes as strkjs_GetClassReturnType,
  getClass as strkjs_getClass,
} from '../../actions/public/getClass.js'

import type { Hex } from '../../types/misc.js'
import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetClassParameters = Evaluate<
  strkjs_GetClassParameters & ChainIdParameter
>;

export type GetClassReturnType = Evaluate<
  strkjs_GetClassReturnType & {
    chainId: Hex;
  }
>;

export type GetClassErrorType = strkjs_GetClassErrorType;

export async function getClass(
  config: Config,
  parameters: GetClassParameters
): Promise<GetClassReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, strkjs_getClass, "getClass");
  return action(rest) as Promise<GetClassReturnType>;
}
