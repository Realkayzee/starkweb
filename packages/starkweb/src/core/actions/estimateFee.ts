import type { Hex } from '../../types/misc.js'
import {
  type EstimateFeeErrorType as strkjs_EstimateFeeErrorType,
  type EstimateFeeParameters as strkjs_EstimateFeeParameters,
  type EstimateFeeReturnTypes as strkjs_EstimateFeeReturnType,
  estimateFee as strkjs_estimateFee,
} from '../../actions/public/estimateFee.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js';
import type { Evaluate } from '../types/utils.js';
import { getAction } from '../utils/getAction.js';

export type EstimateFeeParameters = Evaluate<
  strkjs_EstimateFeeParameters & ChainIdParameter
>;

export type EstimateFeeReturnType = Evaluate<
  strkjs_EstimateFeeReturnType & {
    chainId: Hex;
  }
>;

export type EstimateFeeErrorType = strkjs_EstimateFeeErrorType;

export function estimateFee(
  config: Config,
  parameters: EstimateFeeParameters
): Promise<EstimateFeeReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_estimateFee,
    "estimateFee"
  );
  return action(rest);
}