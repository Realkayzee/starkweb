import type { Hex } from '../../types/misc.js'

export type AddStarknetChainParameters = {
    id: number
    chain_id: Hex
    chain_name: string
    rpc_urls?: string[]
    block_explorer_url?: string[]
    native_currency?: {
      name: string
      symbol: string
      decimals: number
    }
    icon_urls?: string[]
  }