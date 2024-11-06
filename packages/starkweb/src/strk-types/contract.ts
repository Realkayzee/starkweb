/** LEGACY CONTRACT */

import type { Abi } from './abi.js'
import type { ValuesType } from './helpers.js'

/**
 * format produced after compressing 'program' property
 */
export type LegacyContractClass = {
  program: CompressedProgram
  entry_points_by_type: EntryPointsByType
  abi: Abi
}

/**
 * format produced after compiling .cairo to .json
 */
export type LegacyCompiledContract = Omit<LegacyContractClass, 'program'> & {
  program: Program
}

/** SUBTYPES */
export type Builtins = string[]
export type CompressedProgram = string

export type EntryPointsByType = {
  CONSTRUCTOR: ContractEntryPointFields[]
  EXTERNAL: ContractEntryPointFields[]
  L1_HANDLER: ContractEntryPointFields[]
}

export type ContractEntryPointFields = {
  selector: string
  offset: string | number
  builtins?: Builtins
}

export interface Program extends Record<string, any> {
  builtins: string[]
  data: string[]
  // TODO: Add missing properties
}

/** SYSTEM TYPES */
export type CairoAssembly = {
  prime: string
  compiler_version: string
  bytecode: ByteCode
  hints: any[]
  pythonic_hints?: PythonicHints
  bytecode_segment_lengths?: number[] // if Sierra >= v1.5.0
  entry_points_by_type: EntryPointsByType
}

/** COMPILED CONTRACT */
/**
 * format produced after starknet-compile .cairo to .json
 *
 * sierra_program is hex array
 */
export type CompiledSierra = {
  sierra_program: ByteCode
  sierra_program_debug_info?: SierraProgramDebugInfo
  contract_class_version: string
  entry_points_by_type: SierraEntryPointsByType
  abi: Abi
}

/**
 * format produced after compressing 'sierra_program', stringifies 'abi' property and omit sierra_program_debug_info
 *
 * CompressedCompiledSierra
 */
export type SierraContractClass = Omit<
  CompiledSierra,
  'abi' | 'sierra_program_debug_info'
> & {
  sierra_program: string
  abi: string
}
export type CompiledSierraCasm = CairoAssembly

/** SUBTYPES */
export type ByteCode = string[]
export type PythonicHints = [number, string[]][]

export type SierraProgramDebugInfo = {
  type_names: [number, string][]
  libfunc_names: [number, string][]
  user_func_names: [number, string][]
}

export type SierraEntryPointsByType = {
  CONSTRUCTOR: SierraContractEntryPointFields[]
  EXTERNAL: SierraContractEntryPointFields[]
  L1_HANDLER: SierraContractEntryPointFields[]
}

export type SierraContractEntryPointFields = {
  selector: string
  function_idx: number
}

// Final types
/**
 * format produced after compressing compiled contract
 *
 * CompressedCompiledContract
 */
export type ContractClass = LegacyContractClass | SierraContractClass

/**
 * format produced after compile .cairo to .json
 */
export type CompiledContract = LegacyCompiledContract | CompiledSierra

/**
 * Compressed or decompressed Cairo0 or Cairo1 Contract
 */
export type CairoContract = ContractClass | CompiledContract

// Basic elements
export const EntryPointType = {
  EXTERNAL: 'EXTERNAL',
  L1_HANDLER: 'L1_HANDLER',
  CONSTRUCTOR: 'CONSTRUCTOR',
} as const

export type EntryPointType = ValuesType<typeof EntryPointType>

import type { CairoEnum } from './cairoEnum.js'
import type {
  BigNumberish,
  BlockIdentifier,
  Calldata,
  ParsedStruct,
  RawArgsArray,
  Signature,
} from './lib.js'

export type AsyncContractFunction<T = any> = (
  ...args: ArgsOrCalldataWithOptions
) => Promise<T>
export type ContractFunction = (...args: ArgsOrCalldataWithOptions) => any

export type Result =
  | {
      [key: string]: any
    }
  | Result[]
  | bigint
  | string
  | boolean
  | CairoEnum

export type ArgsOrCalldata = RawArgsArray | [Calldata] | Calldata
export type ArgsOrCalldataWithOptions = ArgsOrCalldata & ContractOptions
export type ContractOptions = {
  blockIdentifier?: BlockIdentifier
  parseRequest?: boolean
  parseResponse?: boolean
  formatResponse?: { [key: string]: any }
  maxFee?: BigNumberish
  nonce?: BigNumberish
  signature?: Signature
  addressSalt?: string
}

export type CallOptions = Pick<
  ContractOptions,
  'blockIdentifier' | 'parseRequest' | 'parseResponse' | 'formatResponse'
>

export type InvokeOptions = Pick<
  ContractOptions,
  'maxFee' | 'nonce' | 'signature' | 'parseRequest'
>

export type ParsedEvent = { [name: string]: ParsedStruct }

export type ParsedEvents = ParsedEvent[]
