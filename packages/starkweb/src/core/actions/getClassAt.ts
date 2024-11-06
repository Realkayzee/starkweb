import {
  type GetClassAtErrorType as strkjs_GetClassAtErrorType,
  type GetClassAtParameters as strkjs_GetClassAtParameters,
  type GetClassAtReturnType as strkjs_GetClassAtReturnType,
  getClassAt as strkjs_getClassAt,
} from '../../actions/public/getClassAt.js'

import type { Hex } from '../../types/misc.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetClassAtParameters = Evaluate<
  strkjs_GetClassAtParameters & ChainIdParameter
>;

export type GetClassAtReturnType = Evaluate<
  strkjs_GetClassAtReturnType & {
    chainId: Hex;
  }
>;

export type GetClassAtErrorType = strkjs_GetClassAtErrorType;

export async function getClassAt(
  config: Config,
  parameters: GetClassAtParameters
): Promise<GetClassAtReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, strkjs_getClassAt, "getClassAt");
  return action(rest) as Promise<GetClassAtReturnType>;
}
