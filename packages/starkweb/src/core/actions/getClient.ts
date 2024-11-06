import type { Client } from '../../clients/createClient.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'

export type GetClientParameters= ChainIdParameter

export type GetClientReturnType = Client

export function getClient(
  config: Config,
  parameters: GetClientParameters = {},
): GetClientReturnType {
  let client = undefined
  try {
    client = config.getClient(parameters)
  } catch {}
  return client as GetClientReturnType
}
