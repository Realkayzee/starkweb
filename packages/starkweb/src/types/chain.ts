import type { Address } from 'abitype'

import type { Client } from '../clients/createClient.js'
import type { Transport } from '../clients/transports/createTransport.js'
import type { FeeValuesType } from '../types/fee.js'
import type { Hex } from '../types/misc.js'
import type {
  TransactionSerializable,
  TransactionSerializableGeneric,
  TransactionSerializedGeneric,
} from '../types/transaction.js'
import type { IsNarrowable, IsUndefined, Prettify } from '../types/utils.js'
import type { FormattedBlock } from '../utils/formatters/block.js'
import type { SerializeTransactionFn } from '../utils/transaction/serializeTransaction.js'
export type Chain<
  formatters extends ChainFormatters | undefined = ChainFormatters | undefined,
  custom extends Record<string, unknown> | undefined =
    | Record<string, unknown>
    | undefined,
> = {
  /** Collection of block explorers */
  blockExplorers?:
    | {
        [key: string]: ChainBlockExplorer
        default: ChainBlockExplorer
      }
    | undefined
  /** Collection of contracts */
  contracts?:
    | Prettify<
        {
          [key: string]:
            | ChainContract
            | { [sourceId: number]: ChainContract | undefined }
            | undefined
        } & {
          ensRegistry?: ChainContract | undefined
          ensUniversalResolver?: ChainContract | undefined
          multicall3?: ChainContract | undefined
        }
      >
    | undefined
  /** ID in number form */
  id: number
  /** Chain ID in Hex form */
  chain_id: Hex
  /** Human-readable name */
  name: string
  /** Currency used by chain */
  nativeCurrency: ChainNativeCurrency
  /** Collection of RPC endpoints */
  rpcUrls: {
    [key: string]: ChainRpcUrls
    default: ChainRpcUrls
  }
  /** Source Chain ID (ie. the L1 chain) */
  sourceId?: number | undefined
  /** Flag for test networks */
  testnet?: boolean | undefined

  /** Custom chain data. */
  custom?: custom | undefined
  /** Modifies how fees are derived. */
  fees?: ChainFees<formatters | undefined> | undefined
  /** Modifies how data is formatted and typed (e.g. blocks and transactions) */
  formatters?: formatters | undefined
  /** Modifies how data is serialized (e.g. transactions). */
  serializers?: ChainSerializers<formatters> | undefined
}

/////////////////////////////////////////////////////////////////////
// Config

export type ChainFees<
  formatters extends ChainFormatters | undefined = ChainFormatters | undefined,
> = {
  /**
   * The fee multiplier to use to account for fee fluctuations.
   * Used in the [`estimateFeesPerGas` Action](/docs/actions/public/estimateFeesPerGas).
   *
   * @default 1.2
   */
  baseFeeMultiplier?:
    | number
    | ((args: ChainFeesFnParameters<formatters>) => Promise<number> | number)
  /**
   * The default `maxPriorityFeePerGas` to use when a priority
   * fee is not defined upon sending a transaction.
   *
   * Overrides the return value in the [`estimateMaxPriorityFeePerGas` Action](/docs/actions/public/estimateMaxPriorityFeePerGas).
   */
  defaultPriorityFee?:
    | bigint
    | ((args: ChainFeesFnParameters<formatters>) => Promise<bigint> | bigint)
    | undefined
}

export type ChainFormatters = {
  /** Modifies how the Block structure is formatted & typed. */
  block?: ChainFormatter<'block'> | undefined
  /** Modifies how the Transaction structure is formatted & typed. */
  transaction?: ChainFormatter<'transaction'> | undefined
  /** Modifies how the TransactionReceipt structure is formatted & typed. */
  transactionReceipt?: ChainFormatter<'transactionReceipt'> | undefined
  /** Modifies how the TransactionRequest structure is formatted & typed. */
  transactionRequest?: ChainFormatter<'transactionRequest'> | undefined
}

export type ChainFormatter<type extends string = string> = {
  format: (args: any) => any
  type: type
}

export type ChainSerializers<
  formatters extends ChainFormatters | undefined = undefined,
  ///
  transaction extends
    TransactionSerializableGeneric = formatters extends ChainFormatters
    ? formatters['transactionRequest'] extends ChainFormatter
      ? TransactionSerializableGeneric &
          Parameters<formatters['transactionRequest']['format']>[0]
      : TransactionSerializable
    : TransactionSerializable,
> = {
  /** Modifies how Transactions are serialized. */
  transaction?:
    | SerializeTransactionFn<transaction, TransactionSerializedGeneric>
    | undefined
}

/////////////////////////////////////////////////////////////////////
// Parameters

export type ChainFeesFnParameters<
  formatters extends ChainFormatters | undefined = ChainFormatters | undefined,
> = {
  /** The latest block. */
  block: Prettify<
    FormattedBlock<Omit<Chain, 'formatters'> & { formatters: formatters }>
  >
  client: Client<Transport, Chain>
  /**
   * A transaction request. This value will be undefined if the caller
   * is outside of a transaction request context (e.g. a direct call to
   * the `estimateFeesPerGas` Action).
   */
}

export type ChainEstimateFeesPerGasFnParameters<
  formatters extends ChainFormatters | undefined = ChainFormatters | undefined,
> = {
  /** A function to multiply the base fee based on the `baseFeeMultiplier` value. */
  multiply: (x: bigint) => bigint
  /** The type of fees to return. */
  type: FeeValuesType
} & ChainFeesFnParameters<formatters>

/////////////////////////////////////////////////////////////////////
// Utils

export type ExtractChainFormatterExclude<
  chain extends Chain | undefined,
  type extends keyof ChainFormatters,
> = chain extends { formatters?: infer formatters extends ChainFormatters }
  ? formatters[type] extends { exclude: infer exclude }
    ? Extract<exclude, readonly string[]>[number]
    : ''
  : ''

export type ExtractChainFormatterParameters<
  chain extends Chain | undefined,
  type extends keyof ChainFormatters,
  fallback,
> = chain extends { formatters?: infer formatters extends ChainFormatters }
  ? formatters[type] extends ChainFormatter
    ? Parameters<formatters[type]['format']>[0]
    : fallback
  : fallback

export type ExtractChainFormatterReturnType<
  chain extends Chain | undefined,
  type extends keyof ChainFormatters,
  fallback,
> = IsNarrowable<chain, Chain> extends true
  ? chain extends {
      formatters?:
        | { [_ in type]?: infer formatter extends ChainFormatter }
        | undefined
    }
    ? chain['formatters'] extends undefined
      ? fallback
      : IsNarrowable<formatter, ChainFormatter<type>> extends true
        ? ReturnType<formatter['format']>
        : fallback
    : fallback
  : fallback

export type DeriveChain<
  chain extends Chain | undefined,
  chainOverride extends Chain | undefined,
> = chainOverride extends Chain ? chainOverride : chain

export type GetChainParameter<
  chain extends Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
> = IsUndefined<chain> extends true
  ? { chain: chainOverride | null }
  : { chain?: chainOverride | null | undefined }

/////////////////////////////////////////////////////////////////////
// Constants

type ChainBlockExplorer = {
  name: string
  url: string
  apiUrl?: string | undefined
}

export type ChainContract = {
  address: Address
  blockCreated?: number | undefined
}

type ChainNativeCurrency = {
  address: Address // with Account Abstraction, all chains are
  name: string
  /** 2-6 characters long */
  symbol: string
  decimals: number
}

type ChainRpcUrls = {
  http: readonly string[]
  webSocket?: readonly string[] | undefined
}
