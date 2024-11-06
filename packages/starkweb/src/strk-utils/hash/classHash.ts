import {
  keccak,
  pedersen,
  poseidonHash,
  poseidonHashMany,
} from '@scure/starknet'
import { ADDR_BOUND, API_VERSION } from '../../strk-types/constants.js'
import type {
  CompiledContract,
  CompiledSierra,
  CompiledSierraCasm,
  ContractEntryPointFields,
  LegacyCompiledContract,
  SierraContractEntryPointFields,
} from '../../strk-types/contract.js'
import type { Builtins } from '../../strk-types/contract.js'
import type { BigNumberish } from '../../strk-types/lib.js'
import { parse, stringify } from '../../utils/json.js'
import { felt } from '../calldata/cairo.js'
import { compile } from '../calldata/compile.js'
import { addHexPrefix, utf8ToArray } from '../encode.js'
import { toHex } from '../num.js'
import { encodeShortString } from '../shortString.js'
import { isString } from '../typed.js'

export function computePedersenhash(a: BigNumberish, b: BigNumberish): string {
  return pedersen(BigInt(a), BigInt(b))
}

export function computePoseidonHash(a: BigNumberish, b: BigNumberish): string {
  return toHex(poseidonHash(BigInt(a), BigInt(b)))
}

// Compute perdersen hash from data

export function computeHashOnElements(data: BigNumberish[]): string {
  return [...data, data.length]
    .reduce(
      (x: BigNumberish, y: BigNumberish) => pedersen(BigInt(x), BigInt(y)),
      0,
    )
    .toString()
}

export const computePedersenHashOnElements = computeHashOnElements

export function computePoseidonHashOnElements(data: BigNumberish[]) {
  return toHex(poseidonHashMany(data.map((x) => BigInt(x))))
}

export function calculateContractAddressFromHash(
  salt: BigNumberish,
  classHash: BigNumberish,
  constructorCalldata: any,
  deployerAddress: BigNumberish,
): string {
  const compiledCalldata = compile(constructorCalldata)
  const constructorCalldataHash = computeHashOnElements(compiledCalldata)

  const CONTRACT_ADDRESS_PREFIX = felt(
    '0x535441524b4e45545f434f4e54524143545f41444452455353',
  ) // Equivalent to 'STARKNET_CONTRACT_ADDRESS'

  const hash = computeHashOnElements([
    CONTRACT_ADDRESS_PREFIX,
    deployerAddress,
    salt,
    classHash,
    constructorCalldataHash,
  ])
  return toHex(BigInt(hash) % ADDR_BOUND)
}

function nullSkipReplacer(key: string, value: any) {
  if (key === 'attributes' || key === 'accessible_scopes') {
    return Array.isArray(value) && value.length === 0 ? undefined : value
  }

  if (key === 'debug_info') {
    return null
  }

  return value === null ? undefined : value
}

export function formatSpaces(json: string): string {
  let insideQuotes = false
  const newString = []
  // eslint-disable-next-line no-restricted-syntax
  for (const char of json) {
    if (
      char === '"' &&
      (newString.length > 0 && newString.slice(-1)[0] === '\\') === false
    ) {
      insideQuotes = !insideQuotes
    }
    if (insideQuotes) {
      newString.push(char)
    } else {
      // eslint-disable-next-line no-nested-ternary
      newString.push(char === ':' ? ': ' : char === ',' ? ', ' : char)
    }
  }
  return newString.join('')
}

export function computeHintedClassHash(
  compiledContract: LegacyCompiledContract,
): string {
  const { abi, program } = compiledContract
  const contractClass = { abi, program }
  const serializedJson = formatSpaces(
    stringify(contractClass, nullSkipReplacer),
  )
  return addHexPrefix(keccak(utf8ToArray(serializedJson)).toString(16))
}

export function computeLegacyContractClassHash(
  contract: LegacyCompiledContract | string,
): string {
  const compiledContract = isString(contract)
    ? (parse(contract) as LegacyCompiledContract)
    : contract

  const apiVersion = toHex(API_VERSION)

  const externalEntryPointsHash = computeHashOnElements(
    compiledContract.entry_points_by_type.EXTERNAL.flatMap(
      (e: { selector: string; offset: string | number }) => [
        e.selector,
        e.offset,
      ],
    ),
  )

  const l1HandlerEntryPointsHash = computeHashOnElements(
    compiledContract.entry_points_by_type.L1_HANDLER.flatMap(
      (e: { selector: string; offset: string | number }) => [
        e.selector,
        e.offset,
      ],
    ),
  )

  const constructorEntryPointHash = computeHashOnElements(
    compiledContract.entry_points_by_type.CONSTRUCTOR.flatMap(
      (e: { selector: string; offset: string | number }) => [
        e.selector,
        e.offset,
      ],
    ),
  )

  const builtinsHash = computeHashOnElements(
    compiledContract.program.builtins.map((s: string) => encodeShortString(s)),
  )

  const hintedClassHash = computeHintedClassHash(compiledContract)

  const dataHash = computeHashOnElements(compiledContract.program.data)

  return computeHashOnElements([
    apiVersion,
    externalEntryPointsHash,
    l1HandlerEntryPointsHash,
    constructorEntryPointHash,
    builtinsHash,
    hintedClassHash,
    dataHash,
  ])
}

// Cairo 1 Contract Hashes

function hashBuiltins(builtins: Builtins) {
  return poseidonHashMany(
    builtins.flatMap((it: any) => {
      return BigInt(encodeShortString(it))
    }),
  )
}

function hashEntryPoint(data: ContractEntryPointFields[]) {
  const base = data.flatMap((it: any) => {
    return [BigInt(it.selector), BigInt(it.offset), hashBuiltins(it.builtins)]
  })
  return poseidonHashMany(base)
}

export function hashByteCodeSegments(casm: CompiledSierraCasm): bigint {
  const byteCode: bigint[] = casm.bytecode.map(
    (n: string | number | bigint | boolean) => BigInt(n),
  )
  const bytecodeSegmentLengths: number[] = casm.bytecode_segment_lengths ?? []
  let segmentStart = 0
  const hashLeaves = bytecodeSegmentLengths.flatMap((len) => {
    const segment = byteCode.slice(segmentStart, (segmentStart += len))
    return [BigInt(len), poseidonHashMany(segment)]
  })
  return 1n + poseidonHashMany(hashLeaves)
}

export function computeCompiledClassHash(casm: CompiledSierraCasm): string {
  const COMPILED_CLASS_VERSION = 'COMPILED_CLASS_V1'

  // Hash compiled class version
  const compiledClassVersion = BigInt(encodeShortString(COMPILED_CLASS_VERSION))

  // Hash external entry points.
  const externalEntryPointsHash = hashEntryPoint(
    casm.entry_points_by_type.EXTERNAL,
  )

  // Hash L1 handler entry points.
  const l1Handlers = hashEntryPoint(casm.entry_points_by_type.L1_HANDLER)

  // Hash constructor entry points.
  const constructorEntryPoint = hashEntryPoint(
    casm.entry_points_by_type.CONSTRUCTOR,
  )

  // Hash bytecode.
  const bytecode = casm.bytecode_segment_lengths
    ? hashByteCodeSegments(casm)
    : poseidonHashMany(casm.bytecode.map((it: string) => BigInt(it)))

  return toHex(
    poseidonHashMany([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructorEntryPoint,
      bytecode,
    ]),
  )
}

function hashEntryPointSierra(data: SierraContractEntryPointFields[]) {
  const base = data.flatMap((it: any) => {
    return [BigInt(it.selector), BigInt(it.function_idx)]
  })
  return poseidonHashMany(base)
}

function hashAbi(sierra: CompiledSierra) {
  const indentString = formatSpaces(stringify(sierra.abi, null))
  return BigInt(addHexPrefix(keccak(utf8ToArray(indentString)).toString(16)))
}

/**
 * Compute sierra contract class hash (Cairo 1)
 * @param {CompiledSierra} sierra Cairo 1 Sierra contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledSierra = json.parse(fs.readFileSync("./cairo260.sierra.json").toString("ascii"));
 * const result = hash.computeSierraContractClassHash(compiledSierra);
 * // result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
 */
export function computeSierraContractClassHash(sierra: CompiledSierra): string {
  const CONTRACT_CLASS_VERSION = 'CONTRACT_CLASS_V0.1.0'

  // Hash class version
  const compiledClassVersion = BigInt(encodeShortString(CONTRACT_CLASS_VERSION))

  // Hash external entry points.
  const externalEntryPointsHash = hashEntryPointSierra(
    sierra.entry_points_by_type.EXTERNAL,
  )

  // Hash L1 handler entry points.
  const l1Handlers = hashEntryPointSierra(
    sierra.entry_points_by_type.L1_HANDLER,
  )

  // Hash constructor entry points.
  const constructorEntryPoint = hashEntryPointSierra(
    sierra.entry_points_by_type.CONSTRUCTOR,
  )

  // Hash abi_hash.
  const abiHash = hashAbi(sierra)

  // Hash Sierra program.
  const sierraProgram = poseidonHashMany(
    sierra.sierra_program.map((it: string) => BigInt(it)),
  )

  return toHex(
    poseidonHashMany([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructorEntryPoint,
      abiHash,
      sierraProgram,
    ]),
  )
}

/**
 * Compute ClassHash (sierra or legacy) based on provided contract
 * @param {CompiledContract | string} contract Cairo 1 contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledSierra = json.parse(fs.readFileSync("./cairo260.sierra.json").toString("ascii"));
 * const result = hash.computeContractClassHash(compiledSierra);
 * // result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
 */
export function computeContractClassHash(
  contract: CompiledContract | string,
): string {
  const compiledContract = isString(contract) ? parse(contract) : contract

  if ('sierra_program' in compiledContract) {
    return computeSierraContractClassHash(compiledContract as CompiledSierra)
  }

  return computeLegacyContractClassHash(
    compiledContract as LegacyCompiledContract,
  )
}
