import {
  type GetBlockHashAndNumberErrorType as strkjs_GetBlockHashAndNumberErrorType,
  type GetBlockHashAndNumberReturnTypes as strkjs_GetBlockHashAndNumberReturnTypes,
  getBlockHashAndNumber as strkjs_getBlockHashAndNumber,
} from '../../actions/public/getBlockHashAndNumber.js'
import type { Hex } from '../../types/misc.js'
import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetBlockHashAndNumberParameters = Evaluate<
  strkjs_GetBlockHashAndNumberReturnTypes & ChainIdParameter
>;

export type GetBlockHashAndNumberReturnType = Evaluate<
  strkjs_GetBlockHashAndNumberReturnTypes & {
    chainId: Hex;
  }
>;

export type GetBlockHashAndNumberErrorType =
  strkjs_GetBlockHashAndNumberErrorType;

export async function getBlockHashAndNumber(
  config: Config,
  parameters: GetBlockHashAndNumberParameters
): Promise<GetBlockHashAndNumberReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getBlockHashAndNumber,
    "getBlockHashAndNumber"
  );
  return action(rest) as Promise<GetBlockHashAndNumberReturnType>;
}
