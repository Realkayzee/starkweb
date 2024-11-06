import type { Hex } from '../../types/misc.js'
import {
  type GetBlockTransactionsTracesErrorType as strkjs_GetBlockTransactionsTracesErrorType,
  type GetBlockTransactionsTracesParameters as strkjs_GetBlockTransactionsTracesParameters,
  type GetBlockTransactionsTracesReturnTypes as strkjs_GetBlockTransactionsTracesReturnType,
  getBlockTransactionsTraces as strkjs_getBlockTransactionsTraces,
} from '../../actions/public/getBlockTransactionsTraces.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js';
import type { Evaluate } from '../types/utils.js';
import { getAction } from '../utils/getAction.js';

export type GetBlockTransactionsTracesParameters = Evaluate<
  strkjs_GetBlockTransactionsTracesParameters & ChainIdParameter
>;

export type GetBlockTransactionsTracesReturnType = Evaluate<
  strkjs_GetBlockTransactionsTracesReturnType & {
    chainId: Hex;
  }
>;

export type GetBlockTransactionsTracesErrorType = strkjs_GetBlockTransactionsTracesErrorType;

export async function getBlockTransactionsTraces(
  config: Config,
  parameters: GetBlockTransactionsTracesParameters
): Promise<GetBlockTransactionsTracesReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getBlockTransactionsTraces,
    'getBlockTransactionsTraces'
  );
  return action(rest) as Promise<GetBlockTransactionsTracesReturnType>;
}