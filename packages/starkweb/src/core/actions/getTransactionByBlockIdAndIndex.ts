import type { Hex } from '../../types/misc.js'
import {
  type GetTransactionByBlockIdAndIndexErrorType as strkjs_GetTransactionByBlockIdAndIndexErrorType,
  type GetTransactionByBlockIdAndIndexParameters as strkjs_GetTransactionByBlockIdAndIndexParameters,
  type GetTransactionByBlockIdAndIndexReturnTypes as strkjs_GetTransactionByBlockIdAndIndexReturnType,
  getTransactionByBlockIdAndIndex as strkjs_getTransactionByBlockIdAndIndex,
} from '../../actions/public/getTransactionByBlockIdAndIndex.js'

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetTransactionByBlockIdAndIndexParameters = Evaluate<
  strkjs_GetTransactionByBlockIdAndIndexParameters &
    ChainIdParameter
>;

export type GetTransactionByBlockIdAndIndexReturnType = Evaluate<
  strkjs_GetTransactionByBlockIdAndIndexReturnType & {
    chainId: Hex;
  }
>;

export type GetTransactionByBlockIdAndIndexErrorType =
  strkjs_GetTransactionByBlockIdAndIndexErrorType;

export function getTransactionByBlockIdAndIndex(
  config: Config,
  parameters: GetTransactionByBlockIdAndIndexParameters
): Promise<GetTransactionByBlockIdAndIndexReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getTransactionByBlockIdAndIndex,
    "getTransactionByBlockIdAndIndex"
  );
  return action(rest) as unknown as Promise<
    GetTransactionByBlockIdAndIndexReturnType
  >;
}
