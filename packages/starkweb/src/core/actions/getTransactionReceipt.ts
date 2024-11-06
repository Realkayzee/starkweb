import type { Hex } from '../../types/misc.js'
import {
  type GetTransactionReceiptErrorType as strkjs_GetTransactionReceiptErrorType,
  type GetTransactionReceiptParameters as strkjs_GetTransactionReceiptParameters,
  type GetTransactionReceiptReturnType as strkjs_GetTransactionReceiptReturnType,
  getTransactionReceipt as strkjs_getTransactionReceipt,
} from '../../actions/public/getTransactionReceipt.js'

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetTransactionReceiptParameters = Evaluate<
  strkjs_GetTransactionReceiptParameters & ChainIdParameter
>;

export type GetTransactionReceiptReturnType = Evaluate<
  strkjs_GetTransactionReceiptReturnType & {
    chainId: Hex;
  }
>;

export type GetTransactionReceiptErrorType =
  strkjs_GetTransactionReceiptErrorType;

export async function getTransactionReceipt<
  config extends Config,
>(
  config: config,
  parameters: GetTransactionReceiptParameters
): Promise<GetTransactionReceiptReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getTransactionReceipt,
    "getTransactionReceipt"
  );
  return action(rest) as unknown as Promise<GetTransactionReceiptReturnType>;
}
