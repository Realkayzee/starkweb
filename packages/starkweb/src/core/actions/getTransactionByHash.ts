import type { Hex } from '../../types/misc.js'
import {
  type GetTransactionByHashErrorType as strkjs_GetTransactionByHashErrorType,
  type GetTransactionByHashParameters as strkjs_GetTransactionByHashParameters,
  type GetTransactionByHashReturnTypes as strkjs_GetTransactionByHashReturnType,
  getTransactionByHash as strkjs_getTransactionByHash,
} from '../../actions/public/getTransactionByHash.js'

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetTransactionParameters = Evaluate<
  strkjs_GetTransactionByHashParameters & ChainIdParameter
>;

export type GetTransactionReturnType = Evaluate<
  strkjs_GetTransactionByHashReturnType & {
    chainId: Hex;
  }
>;

export type GetTransactionErrorType = strkjs_GetTransactionByHashErrorType;

export function getTransaction(
  config: Config,
  parameters: GetTransactionParameters
): Promise<GetTransactionReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getTransactionByHash,
    "getTransactionByHash"
  );
  return action(rest) as unknown as Promise<GetTransactionReturnType>;
}
