import type {
  DeclaredTransaction,
  InvokedTransaction,
  ResourceBounds,
  SimulateTransaction,
  TransactionWithHash,
} from '@starknet-io/types-js'
import type { NetworkName, StarknetChainId } from './constants.js'
import type { CompiledSierra, LegacyContractClass } from './contract.js'
import type {
  BlockIdentifier,
  BlockNumber,
  TransactionExecutionStatus,
  TransactionFinalityStatus,
  TransactionStatus,
  TransactionType,
} from './lib.js'
import type { Felt, Hash, ResourcePrice } from './utils.js'

import type { SPEC } from '@starknet-io/types-js'

export interface ProviderOptions extends RpcProviderOptions {}

export type RpcProviderOptions = {
  nodeUrl?: string | NetworkName
  retries?: number
  transactionRetryIntervalFallback?: number
  headers?: object
  blockIdentifier?: BlockIdentifier
  chainId?: StarknetChainId
  specVersion?: string
  default?: boolean
  waitMode?: boolean
  feeMarginPercentage?: {
    l1BoundMaxAmount: number
    l1BoundMaxPricePerUnit: number
    maxFee: number
  }
}

export type GetBlockResponse = PendingBlock | Block

export type PendingBlock = {
  status: 'PENDING'
  parent_hash: Hash
  timestamp: number
  sequencer_address: Felt
  l1_gas_price: ResourcePrice
  starknet_version: string
  transactions: Hash[]
}

export type Block = {
  status: 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED'
  block_hash: Hash
  parent_hash: Hash
  block_number: BlockNumber
  new_root: Felt
  timestamp: number
  sequencer_address: Felt
  l1_gas_price: ResourcePrice
  starknet_version: string
  transactions: Hash[]
}

export interface MessageToL1 {
  to_address: string
  payload: string[]
}

export type RevertedTransactionReceiptResponse = {
  type?: TransactionType | any // RPC only // any due to RPC Spec issue
  execution_status: typeof TransactionExecutionStatus.REVERTED | any // any due to RPC Spec issue
  finality_status: TransactionFinalityStatus | any
  status?: TransactionStatus // SEQ only
  actual_fee: string
  block_hash?: string // ?~ optional due to RPC spec issue
  block_number?: BlockNumber // ?~ optional due to RCP spec issue
  transaction_hash: string
  transaction_index?: number // SEQ only
  messages_sent: MessageToL1[] // SEQ Casted l2_to_l1_messages
  events: any[]
  revert_reason?: string // SEQ Casted revert_error // ?~ optional due to RCP spec issue
}

export type RejectedTransactionReceiptResponse = {
  status: typeof TransactionStatus.REJECTED
  transaction_failure_reason: {
    code: string
    error_message: string
  }
}

export type GetTxReceiptResponseWithoutHelper =
  | SuccessfulTransactionReceiptResponse
  | RevertedTransactionReceiptResponse
  | RejectedTransactionReceiptResponse

export type SuccessfulTransactionReceiptResponse =
  | InvokeTransactionReceiptResponse
  | DeployTransactionReceiptResponse
  | DeclareTransactionReceiptResponse

export type GetTransactionResponse = TransactionWithHash
// Spread individual types for usage convenience
export type InvokeTransactionReceiptResponse = SPEC.INVOKE_TXN_RECEIPT
export type DeclareTransactionReceiptResponse = SPEC.DECLARE_TXN_RECEIPT
export type DeployTransactionReceiptResponse = InvokeTransactionReceiptResponse
export type DeployAccountTransactionReceiptResponse =
  SPEC.DEPLOY_ACCOUNT_TXN_RECEIPT
export type L1HandlerTransactionReceiptResponse = SPEC.L1_HANDLER_TXN_RECEIPT

export interface EstimateFeeResponse {
  gas_consumed: bigint
  overall_fee: bigint
  gas_price: bigint
  unit: SPEC.PRICE_UNIT
  suggestedMaxFee: bigint
  resourceBounds: ResourceBounds
  data_gas_consumed: bigint
  data_gas_price: bigint
}

export type EstimateFeeResponseBulk = EstimateFeeResponse[]

export type InvokeFunctionResponse = InvokedTransaction

export type DeclareContractResponse = DeclaredTransaction

export type CallContractResponse = string[]

export type Storage = Felt

export type Nonce = string

export type SimulationFlag = string
export type SimulationFlags = SimulationFlag[]

export type SimulatedTransaction = SimulateTransaction & {
  suggestedMaxFee: bigint
  resourceBounds: ResourceBounds
}

export type SimulateTransactionResponse = SimulatedTransaction[]

export type StateUpdateResponse = StateUpdate | PendingStateUpdate
export type StateUpdate = SPEC.STATE_UPDATE
export type PendingStateUpdate = SPEC.PENDING_STATE_UPDATE

/**
 * Standardized type
 *
 * Cairo0 program compressed and Cairo1 sierra_program decompressed
 *
 * abi Abi
 *
 * CompiledSierra without '.sierra_program_debug_info'
 */
export type ContractClassResponse =
  | LegacyContractClass
  | Omit<CompiledSierra, 'sierra_program_debug_info'>
