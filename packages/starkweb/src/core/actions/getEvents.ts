import type { Hex } from '../../types/misc.js'
import {
  type GetEventsErrorType as strkjs_GetEventsErrorType,
  type GetEventsParameters as strkjs_GetEventsParameters,
  type GetEventsReturnTypes as strkjs_GetEventsReturnType,
  getEvents as strkjs_getEvents,
} from '../../actions/public/getEvents.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js';
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetEventsParameters = Evaluate<
  strkjs_GetEventsParameters & ChainIdParameter
>;

export type GetEventsReturnType = Evaluate<
  strkjs_GetEventsReturnType & {
    chainId: Hex;
  }
>;

export type GetEventsErrorType = strkjs_GetEventsErrorType;

export function getEvents(
  config: Config,
  parameters: GetEventsParameters
): Promise<GetEventsReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getEvents,
    "getEvents"
  );
  return action(rest) as unknown as Promise<GetEventsReturnType>;
}