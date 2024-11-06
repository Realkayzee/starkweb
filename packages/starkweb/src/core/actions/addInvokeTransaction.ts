import {
  type AddInvokeTransactionErrorType as strkjs_AddInvokeTransactionErrorType,
  type AddInvokeTransactionParameters as strkjs_AddInvokeTransactionParameters,
  type AddInvokeTransactionReturnTypes as strkjs_AddInvokeTransactionReturnTypes,
  addInvokeTransaction as strkjs_addInvokeTransaction,
} from "../../actions/public/addInvokeTransaction.js";
import type { Hex } from "../../types/misc.js";
import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type AddInvokeTransactionParameters = Evaluate<
  strkjs_AddInvokeTransactionParameters & ChainIdParameter
>;

export type AddInvokeTransactionReturnType = Evaluate<
  strkjs_AddInvokeTransactionReturnTypes & {
    chainId: Hex;
  }
>;

export type AddInvokeTransactionErrorType =
  strkjs_AddInvokeTransactionErrorType;

export async function addInvokeTransaction(
  config: Config,
  parameters: AddInvokeTransactionParameters
): Promise<AddInvokeTransactionReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_addInvokeTransaction,
    "addInvokeTransaction"
  );
  return action(rest) as Promise<AddInvokeTransactionReturnType>;
}
