import { fallback as strkjs_fallback } from '../../clients/transports/fallback.js'

import type { Transport } from '../createConfig.js'

export function fallback(
  transports: readonly Transport[],
  config?: Parameters<typeof strkjs_fallback>[1],
) {
  return strkjs_fallback(transports, config)
}
