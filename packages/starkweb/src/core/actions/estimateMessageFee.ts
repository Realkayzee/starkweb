import type { Hex } from '../../types/misc.js'
import {
  type EstimateMessageFeeErrorType as strkjs_EstimateMessageFeeErrorType,
  type EstimateMessageFeeParameters as strkjs_EstimateMessageFeeParameters,
  type EstimateMessageFeeReturnTypes as strkjs_EstimateMessageFeeReturnType,
  estimateMessageFee as strkjs_estimateMessageFee,
} from '../../actions/public/estimateMessageFee.js'

import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Evaluate } from '../types/utils.js';
import { getAction } from '../utils/getAction.js';

export type EstimateMessageFeeParameters = Evaluate<
  strkjs_EstimateMessageFeeParameters & ChainIdParameter
>;

export type EstimateMessageFeeReturnType = Evaluate<
  strkjs_EstimateMessageFeeReturnType & {
    chainId: Hex;
  }
>;

export type EstimateMessageFeeErrorType = strkjs_EstimateMessageFeeErrorType;

export function estimateMessageFee(
  config: Config,
  parameters: EstimateMessageFeeParameters
): Promise<EstimateMessageFeeReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_estimateMessageFee,
    "estimateMessageFee"
  );
  return action(rest);
}