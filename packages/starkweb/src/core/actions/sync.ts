import type { Hex } from '../../types/misc.js'
import {
  type SyncingErrorType as strkjs_SyncingErrorType,
  type SyncingParameters as strkjs_SyncingParameters,
  type SyncingReturnTypes as strkjs_SyncingReturnType,
  syncing as strkjs_syncing,
} from '../../actions/public/syncing.js'

import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Evaluate } from '../types/utils.js';
import { getAction } from '../utils/getAction.js';

export type SyncingParameters = Evaluate<
  strkjs_SyncingParameters & ChainIdParameter
>;

export type SyncingReturnTypes = Evaluate<
  strkjs_SyncingReturnType & {
    chainId: Hex;
  }
>;

export type SyncingErrorType = strkjs_SyncingErrorType;

export function syncing(
  config: Config,
  parameters: SyncingParameters
): Promise<SyncingReturnTypes> {
  const { chainId } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_syncing,
    'syncing'
  );
  return action(parameters) as Promise<SyncingReturnTypes>;
}