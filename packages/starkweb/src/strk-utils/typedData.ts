import {
  TypedDataRevision as Revision,
  type StarknetEnumType,
  type StarknetMerkleType,
  type StarknetType,
  type TypedData,
} from '@starknet-io/types-js'
import {
  PRIME,
  RANGE_FELT,
  RANGE_I128,
  RANGE_U128,
} from '../strk-types/constants.js'
import type { BigNumberish } from '../strk-types/lib.js'
import assert from './assert.js'
import { byteArrayFromString } from './calldata/byteArray.js'
import {
  computePedersenHashOnElements,
  computePedersenhash,
  computePoseidonHash,
  computePoseidonHashOnElements,
} from './hash/classHash.js'
import { getSelectorFromName } from './hash/selector.js'
import { isHex, toHex } from './num.js'
import { encodeShortString } from './shortString.js'
import { isBoolean, isString } from './typed.js'

interface Context {
  parent?: string
  key?: string
}

interface Configuration {
  domain: string
  hashMethod: (data: BigNumberish[]) => string
  hashMerkleMethod: (a: BigNumberish, b: BigNumberish) => string
  escapeTypeString: (s: string) => string
  presetTypes: TypedData['types']
}

const presetTypes: TypedData['types'] = {
  u256: JSON.parse(
    '[{ "name": "low", "type": "u128" }, { "name": "high", "type": "u128" }]',
  ),
  TokenAmount: JSON.parse(
    '[{ "name": "token_address", "type": "ContractAddress" }, { "name": "amount", "type": "u256" }]',
  ),
  NftId: JSON.parse(
    '[{ "name": "collection_address", "type": "ContractAddress" }, { "name": "token_id", "type": "u256" }]',
  ),
}

const revisionConfiguration: Record<Revision, Configuration> = {
  [Revision.ACTIVE]: {
    domain: 'StarknetDomain',
    hashMethod: computePoseidonHashOnElements,
    hashMerkleMethod: computePoseidonHash,
    escapeTypeString: (s) => `"${s}"`,
    presetTypes,
  },
  [Revision.LEGACY]: {
    domain: 'StarkNetDomain',
    hashMethod: computePedersenHashOnElements,
    hashMerkleMethod: computePedersenhash,
    escapeTypeString: (s) => s,
    presetTypes: {},
  },
}

function assertRange(
  data: unknown,
  type: string,
  { min, max }: { min: bigint; max: bigint },
) {
  const value = BigInt(data as string)
  assert(
    value >= min && value <= max,
    `${value} (${type}) is out of bounds [${min}, ${max}]`,
  )
}

function identifyRevision({ types, domain }: TypedData) {
  if (
    revisionConfiguration[Revision.ACTIVE].domain in types &&
    domain.revision === Revision.ACTIVE
  )
    return Revision.ACTIVE

  if (
    revisionConfiguration[Revision.LEGACY].domain in types &&
    (domain.revision ?? Revision.LEGACY) === Revision.LEGACY
  )
    return Revision.LEGACY

  return undefined
}

function getHex(value: BigNumberish): string {
  try {
    return toHex(value)
  } catch (e) {
    if (isString(value)) {
      return toHex(encodeShortString(value))
    }
    throw new Error(`Invalid BigNumberish: ${value} \nError: ${e}`)
  }
}

export function validateTypedData(data: unknown): data is TypedData {
  const typedData = data as TypedData

  return Boolean(typedData.message && typedData.primaryType && typedData.types)
}

export function prepareSelector(selector: string): string {
  return isHex(selector) ? selector : getSelectorFromName(selector)
}

export function isMerkleTreeType(
  type: StarknetType,
): type is StarknetMerkleType {
  return type.type === 'merkletree'
}

export function getDependencies(
  types: TypedData['types'],
  type: string,
  dependencies: string[] = [],
  contains = '',
  revision: Revision = Revision.LEGACY,
): string[] {
  // Include pointers (struct arrays)
  if (type[type.length - 1] === '*') {
    // biome-ignore lint/style/noParameterAssign: <explanation>
    type = type.slice(0, -1)
  } else if (revision === Revision.ACTIVE) {
    // enum base
    if (type === 'enum') {
      // biome-ignore lint/style/noParameterAssign: <explanation>
      type = contains
    }
    // enum element types
    else if (type.match(/^\(.*\)$/)) {
      // biome-ignore lint/style/noParameterAssign: <explanation>
      type = type.slice(1, -1)
    }
  }

  if (dependencies.includes(type) || !types[type]) {
    return dependencies
  }

  return [
    type,
    ...(types[type] as StarknetEnumType[]).reduce<string[]>(
      (previous, t) => [
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        ...previous,
        ...getDependencies(
          types,
          t.type,
          previous,
          t.contains,
          revision,
        ).filter((dependency) => !previous.includes(dependency)),
      ],
      [],
    ),
  ]
}

export function encodeType(
  types: TypedData['types'],
  type: string,
  revision: Revision = Revision.LEGACY,
): string {
  const allTypes =
    revision === Revision.ACTIVE
      ? { ...types, ...revisionConfiguration[revision].presetTypes }
      : types
  const [primary, ...dependencies] = getDependencies(
    allTypes,
    type,
    undefined,
    undefined,
    revision,
  )
  const newTypes = !primary ? [] : [primary, ...dependencies.sort()]

  const esc = revisionConfiguration[revision].escapeTypeString

  return newTypes
    .map((dependency) => {
      const dependencyElements = allTypes[dependency]!.map((t) => {
        const targetType =
          t.type === 'enum' && revision === Revision.ACTIVE
            ? (t as StarknetEnumType).contains
            : t.type
        // parentheses handling for enum variant types
        const typeString = targetType.match(/^\(.*\)$/)
          ? `(${targetType
              .slice(1, -1)
              .split(',')
              .map((e) => (e ? esc(e) : e))
              .join(',')})`
          : esc(targetType)
        return `${esc(t.name)}:${typeString}`
      })
      return `${esc(dependency)}(${dependencyElements})`
    })
    .join('')
}

export function getTypeHash(
  types: TypedData['types'],
  type: string,
  revision: Revision = Revision.LEGACY,
): string {
  return getSelectorFromName(encodeType(types, type, revision))
}

export function encodeValue(
  types: TypedData['types'],
  type: string,
  data: unknown,
  ctx: Context = {},
  revision: Revision = Revision.LEGACY,
): [string, string] {
  if (types[type]) {
    return [
      type,
      getStructHash(types, type, data as TypedData['message'], revision),
    ]
  }

  if (revisionConfiguration[revision].presetTypes[type]) {
    return [
      type,
      getStructHash(
        revisionConfiguration[revision].presetTypes,
        type,
        data as TypedData['message'],
        revision,
      ),
    ]
  }

  if (type.endsWith('*')) {
    const hashes: string[] = (data as TypedData['message'][]).map(
      (entry) =>
        encodeValue(types, type.slice(0, -1), entry, undefined, revision)[1],
    )
    return [type, revisionConfiguration[revision].hashMethod(hashes)]
  }

  switch (type) {
    case 'enum': {
      if (revision === Revision.ACTIVE) {
        const [variantKey, variantData] = Object.entries(
          data as TypedData['message'],
        )[0]!

        const parentType = types[ctx.parent as string]!.find(
          (t) => t.name === ctx.key,
        )
        const enumType = types[(parentType as StarknetEnumType).contains]!
        const variantType = enumType.find(
          (t) => t.name === variantKey,
        ) as StarknetType
        const variantIndex = enumType.indexOf(variantType)

        const encodedSubtypes = variantType.type
          .slice(1, -1)
          .split(',')
          .map((subtype, index) => {
            if (!subtype) return subtype
            const subtypeData = (variantData as unknown[])[index]
            return encodeValue(
              types,
              subtype,
              subtypeData,
              undefined,
              revision,
            )[1]
          })
        return [
          type,
          revisionConfiguration[revision].hashMethod([
            variantIndex,
            ...encodedSubtypes,
          ]),
        ]
      } // else fall through to default
      return [type, getHex(data as string)]
    }
    // case 'merkletree': To be worked on
    case 'selector': {
      return ['felt', prepareSelector(data as string)]
    }
    case 'string': {
      if (revision === Revision.ACTIVE) {
        const byteArray = byteArrayFromString(data as string)
        const elements = [
          byteArray.data.length,
          ...byteArray.data,
          byteArray.pending_word,
          byteArray.pending_word_len,
        ]
        return [type, revisionConfiguration[revision].hashMethod(elements)]
      } // else fall through to default
      return [type, getHex(data as string)]
    }
    case 'i128': {
      if (revision === Revision.ACTIVE) {
        const value = BigInt(data as string)
        assertRange(value, type, RANGE_I128)
        return [type, getHex(value < 0n ? PRIME + value : value)]
      } // else fall through to default
      return [type, getHex(data as string)]
    }
    case 'timestamp':
    case 'u128': {
      if (revision === Revision.ACTIVE) {
        assertRange(data, type, RANGE_U128)
      } // else fall through to default
      return [type, getHex(data as string)]
    }
    case 'felt':
    case 'shortstring': {
      // TODO: should 'shortstring' diverge into directly using encodeShortString()?
      if (revision === Revision.ACTIVE) {
        assertRange(getHex(data as string), type, RANGE_FELT)
      } // else fall through to default
      return [type, getHex(data as string)]
    }
    case 'ClassHash':
    case 'ContractAddress': {
      if (revision === Revision.ACTIVE) {
        assertRange(data, type, RANGE_FELT)
      } // else fall through to default
      return [type, getHex(data as string)]
    }
    case 'bool': {
      if (revision === Revision.ACTIVE) {
        assert(isBoolean(data), `Type mismatch for ${type} ${data}`)
      } // else fall through to default
      return [type, getHex(data as string)]
    }
    default: {
      if (revision === Revision.ACTIVE) {
        throw new Error(`Unsupported type: ${type}`)
      }
      return [type, getHex(data as string)]
    }
  }
}

export function encodeData<T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message'],
  revision: Revision = Revision.LEGACY,
): [string[], string[]] {
  const targetType =
    types[type] ?? revisionConfiguration[revision].presetTypes[type]
  const [returnTypes, values] = targetType!.reduce<[string[], string[]]>(
    ([ts, vs], field) => {
      if (
        data[field.name as keyof T['message']] === undefined ||
        (data[field.name as keyof T['message']] === null &&
          field.type !== 'enum')
      ) {
        throw new Error(`Cannot encode data: missing data for '${field.name}'`)
      }

      const value = data[field.name as keyof T['message']]
      const ctx = { parent: type, key: field.name }
      const [t, encodedValue] = encodeValue(
        types,
        field.type,
        value,
        ctx,
        revision,
      )

      return [
        [...ts, t],
        [...vs, encodedValue],
      ]
    },
    [['felt'], [getTypeHash(types, type, revision)]],
  )

  return [returnTypes, values]
}

export function getStructHash<T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message'],
  revision: Revision = Revision.LEGACY,
): string {
  return revisionConfiguration[revision].hashMethod(
    encodeData(types, type, data, revision)[1],
  )
}

export function getMessageHash(
  typedData: TypedData,
  account: BigNumberish,
): string {
  if (!validateTypedData(typedData)) {
    throw new Error('Typed data does not match JSON schema')
  }

  const revision = identifyRevision(typedData) as Revision
  const { domain, hashMethod } = revisionConfiguration[revision]

  const message = [
    encodeShortString('StarkNet Message'),
    getStructHash(typedData.types, domain, typedData.domain, revision),
    account,
    getStructHash(
      typedData.types,
      typedData.primaryType,
      typedData.message,
      revision,
    ),
  ]

  return hashMethod(message)
}
