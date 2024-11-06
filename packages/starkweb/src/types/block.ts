import type { Address } from 'abitype'

import type { GasPrice } from './fee.js'
import type { Hash, Hex } from './misc.js'
import type { Transaction } from './transaction.js'
import type { Withdrawal } from './withdrawal.js'

export type Block<
  quantity = bigint,
  TIncludeTransactions extends boolean = boolean,
  TBlockTag extends BlockTag = BlockTag,
  TTransaction = Transaction<
    bigint,
    number,
    TBlockTag extends 'pending' ? true : false
  >,
> = {
  /** Base fee per gas */
  baseFeePerGas: quantity | null
  /** Total used blob gas by all transactions in this block */
  blobGasUsed: quantity
  /** Difficulty for this block */
  difficulty: quantity
  /** Excess blob gas */
  excessBlobGas: quantity
  /** "Extra data" field of this block */
  extraData: Hex
  /** Maximum gas allowed in this block */
  gasLimit: quantity
  /** Total used gas by all transactions in this block */
  gasUsed: quantity
  /** Block hash or `null` if pending */
  hash: TBlockTag extends 'pending' ? null : Hash
  /** Logs bloom filter or `null` if pending */
  logsBloom: TBlockTag extends 'pending' ? null : Hex
  /** Address that received this block’s mining rewards */
  miner: Address
  /** Unique identifier for the block. */
  mixHash: Hash
  /** Proof-of-work hash or `null` if pending */
  nonce: TBlockTag extends 'pending' ? null : Hex
  /** Block number or `null` if pending */
  number: TBlockTag extends 'pending' ? null : quantity
  /** Parent block hash */
  parentHash: Hash
  /** Root of the this block’s receipts trie */
  receiptsRoot: Hex
  sealFields: Hex[]
  /** SHA3 of the uncles data in this block */
  sha3Uncles: Hash
  /** Size of this block in bytes */
  size: quantity
  /** Root of this block’s final state trie */
  stateRoot: Hash
  /** Unix timestamp of when this block was collated */
  timestamp: quantity
  /** Total difficulty of the chain until this block */
  totalDifficulty: quantity | null
  /** List of transaction objects or hashes */
  transactions: TIncludeTransactions extends true ? TTransaction[] : Hash[]
  /** Root of this block’s transaction trie */
  transactionsRoot: Hash
  /** List of uncle hashes */
  uncles: Hash[]
  /** List of withdrawal objects */
  withdrawals?: Withdrawal[] | undefined
  /** Root of the this block’s withdrawals trie */
  withdrawalsRoot?: Hex | undefined
}
export type StrkBlock<
  quantity = bigint,
  TBlockStatus extends BlockStatus = BlockStatus,
> = {
  /** The hash of the block */
  block_hash: Hash
  /** The number of the block */
  block_number: quantity
  /** The status of the block */
  l1_da_mode: TBlockStatus extends 'ACCEPTED_ON_L1'
    ? 'BLOB' | 'TRANSACTION'
    : null
  l1_data_gas_price: TBlockStatus extends 'ACCEPTED_ON_L1'
    ? GasPrice<quantity>
    : null
  l1_gas_price: TBlockStatus extends 'ACCEPTED_ON_L1'
    ? GasPrice<quantity>
    : null
  status: TBlockStatus
  new_root: Hash
  parent_hash: Hash
  timestamp: quantity
  sequencer_address: Address
  transactions: Hash[]
}

export type BlockIdentifier<quantity = number> = {
  /** Whether or not to throw an error if the block is not in the canonical chain as described below. Only allowed in conjunction with the blockHash tag. Defaults to false. */
  requireCanonical?: boolean | undefined
} & (
  | {
      /** The block in the canonical chain with this number */
      block_number: BlockNumber<quantity>
    }
  | {
      /** The block uniquely identified by this hash. The `blockNumber` and `blockHash` properties are mutually exclusive; exactly one of them must be set. */
      block_hash: Hash
    }
)

export type BlockNumber<quantity = number> = quantity

export type BlockTag = 'latest' | 'pending'

export type BlockId =
  | BlockTag
  | {
      block_hash?: Hash
      block_number?: number
    }

export type BlockStatus =
  | 'PENDING'
  | 'ACCEPTED_ON_L2'
  | 'ACCEPTED_ON_L1'
  | 'REJECTED'

export type Uncle<
  quantity = bigint,
  TIncludeTransactions extends boolean = boolean,
  TBlockTag extends BlockTag = BlockTag,
  TTransaction = Transaction<
    bigint,
    number,
    TBlockTag extends 'pending' ? true : false
  >,
> = Block<quantity, TIncludeTransactions, TBlockTag, TTransaction>
