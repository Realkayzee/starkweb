import {
  type AddDeclareTransactionErrorType as strkjs_AddDeclareTransactionErrorType,
  type AddDeclareTransactionParameters as strkjs_AddDeclareTransactionParameters,
  type AddDeclareTransactionReturnTypes as strkjs_AddDeclareTransactionReturnTypes,
  addDeclareTransaction as strkjs_addDeclareTransaction,
} from "../../actions/public/addDeclareTransaction.js";
import type { Hex } from "../../types/misc.js";

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type AddDeclareTransactionParameters = Evaluate<
  strkjs_AddDeclareTransactionParameters & ChainIdParameter
>;

export type AddDeclareTransactionReturnType = Evaluate<
  strkjs_AddDeclareTransactionReturnTypes & {
    chainId: Hex;
  }
>;

export type AddDeclareTransactionErrorType =
  strkjs_AddDeclareTransactionErrorType;

export async function addDeclareTransaction(
  config: Config,
  parameters: AddDeclareTransactionParameters
): Promise<AddDeclareTransactionReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_addDeclareTransaction,
    "addDeclareTransaction"
  );
  return action(rest) as Promise<AddDeclareTransactionReturnType>;
}
