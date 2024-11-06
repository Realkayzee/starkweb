import type { Hex } from '../../types/misc.js'
import type { Connector } from '../createConfig.js'

export type ChainIdParameter = {
  chainId?: Hex
}

export type ConnectorParameter = {
  connector?: Connector | undefined
}

export type ScopeKeyParameter = { scopeKey?: string | undefined }

export type SyncConnectedChainParameter = {
  syncConnectedChain?: boolean | undefined
}
