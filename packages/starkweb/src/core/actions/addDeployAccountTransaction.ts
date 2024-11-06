import {
  type AddDeployAccountTransactionErrorType as strkjs_AddDeployAccountTransactionErrorType,
  type AddDeployAccountTransactionParameters as strkjs_AddDeployAccountTransactionParameters,
  type AddDeployAccountTransactionReturnTypes as strkjs_AddDeployAccountTransactionReturnType,
  addDeployAccountTransaction as strkjs_addDeployAccountTransaction,
} from "../../actions/public/addDeployAccountTransaction.js";
import type { Hex } from "../../types/misc.js";
import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type AddDeployAccountTransactionParameters = Evaluate<
  strkjs_AddDeployAccountTransactionParameters & ChainIdParameter
>;

export type AddDeployAccountTransactionReturnType = Evaluate<
  strkjs_AddDeployAccountTransactionReturnType & {
    chainId: Hex;
  }
>;

export type AddDeployAccountTransactionErrorType =
  strkjs_AddDeployAccountTransactionErrorType;

export async function addDeployAccountTransaction(
  config: Config,
  parameters: AddDeployAccountTransactionParameters
): Promise<AddDeployAccountTransactionReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_addDeployAccountTransaction,
    "addDeployAccountTransaction"
  );
  return action(rest) as Promise<AddDeployAccountTransactionReturnType>;
}
