import type { Hex } from '../../types/misc.js'
import {
  type GetTraceTransactionErrorType as strkjs_GetTraceTransactionErrorType,
  type GetTraceTransactionParameters as strkjs_GetTraceTransactionParameters,
  type GetTraceTransactionReturnTypes as strkjs_GetTraceTransactionReturnType,
  getTraceTransaction as strkjs_getTraceTransaction,
} from '../../actions/public/getTraceTransaction.js'

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetTraceTransactionParameters = Evaluate<
  strkjs_GetTraceTransactionParameters & ChainIdParameter
>;

export type GetTraceTransactionReturnType = Evaluate<
  strkjs_GetTraceTransactionReturnType & {
    chainId: Hex;
  }
>;

export type GetTraceTransactionErrorType = strkjs_GetTraceTransactionErrorType;

export function getTraceTransaction(
  config: Config,
  parameters: GetTraceTransactionParameters
): Promise<GetTraceTransactionReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getTraceTransaction,
    "getTraceTransaction"
  );
  return action(rest) as Promise<GetTraceTransactionReturnType>;
}
