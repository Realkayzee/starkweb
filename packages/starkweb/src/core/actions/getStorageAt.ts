import {
  type GetStorageAtErrorType as strkjs_GetStorageAtErrorType,
  type GetStorageAtParameters as strkjs_GetStorageAtParameters,
  type GetStorageAtReturnType as strkjs_GetStorageAtReturnType,
  getStorageAt as strkjs_getStorageAt,
} from '../../actions/public/getStorageAt.js'

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetStorageAtParameters = Evaluate<
  strkjs_GetStorageAtParameters & ChainIdParameter
>;

export type GetStorageAtReturnType = strkjs_GetStorageAtReturnType;

export type GetStorageAtErrorType = strkjs_GetStorageAtErrorType;

export async function getStorageAt<config extends Config>(
  config: config,
  parameters: GetStorageAtParameters
): Promise<GetStorageAtReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, strkjs_getStorageAt, "getStorageAt");
  return action(rest);
}
