import { Ajv } from 'ajv'
import { schema } from './sign-in-schema.js'
import {
  type ErrorTypes,
  type ISiwsDomain,
  type ISiwsMessage,
  type ISiwsTypedData,
  SignInWithStarknetError,
} from './types.js'
import type { SiwsMessage } from './types.js'

export type CreateSiwsDataParameters = SiwsMessage

export function createSiwsData(
  parameters: CreateSiwsDataParameters,
  primaryType?: string,
  types?: any,
): CreateSiwsDataReturnType {
  const {
    chainId,
    domain,
    expirationTime,
    issuedAt,
    nonce,
    notBefore,
    uri,
    version,
    address,
    statement,
  } = parameters

  const siwsDomain: ISiwsDomain = {
    name: domain,
    chainId,
    version,
    revision: '1',
  }

  const siwsMessage: ISiwsMessage = {
    address,
    statement,
    uri,
    nonce,
    issuedAt,
    expirationTime,
    notBefore,
  }

  let primaryTypeArg: string
  let typesArg: {
    Message: Array<{ name: string; type: string }>
    StarknetDomain: Array<{ name: string; type: string }>
  }

  if (primaryType) {
    primaryTypeArg = primaryType
  } else {
    primaryTypeArg = 'Message'
  }

  if (types) {
    typesArg = types
  } else {
    typesArg = {
      Message: [
        { name: 'address', type: 'felt' },
        { name: 'statement', type: 'string' },
        { name: 'uri', type: 'string' },
        { name: 'nonce', type: 'string' },
      ],
      StarknetDomain: [
        { name: 'name', type: 'string' },
        { name: 'chainId', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'revision', type: 'string' },
      ],
    }
  }

  // Perform validation
  const ajv = new Ajv({ allErrors: true, strict: true })
  const validate = ajv.compile(schema)

  const data = {
    domain: siwsDomain,
    message: siwsMessage,
    primaryType: primaryTypeArg,
    types: typesArg,
  }

  if (!validate(data)) {
    const errors = validate.errors

    const errorMessage = errors
      ?.map((error) => `${error.instancePath} ${error.message}`)
      .join('. ')
    throw SignInWithStarknetError(errorMessage as ErrorTypes)
  }

  return data
}

export type CreateSiwsDataReturnType = ISiwsTypedData
export type CreateSiwsDataErrorType = ErrorTypes
