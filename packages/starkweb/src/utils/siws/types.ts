import type { Hex } from '../../types/misc.js'

/**
 * The EIP712 domain struct. Any of these fields are optional, but it must contain at least one field.
 */
export interface ISiwsDomain extends Record<string, unknown> {
  name: string
  /** Current version of the App making the signing request. */
  version: string
  chainId: string | number
  revision: string | number
}

export interface ISiwsMessage extends Record<string, unknown> {
  /** Starknet address performing the signing */
  address: string
  /** ISO 8601 datetime string of the current time. */
  issuedAt?: string | undefined
  /** Randomized token used to prevent replay attacks, at least 8 alphanumeric
   * characters. */
  nonce: string
  /** Human-readable ASCII assertion that the user will sign. */
  statement: string
  /** RFC 3986 URI referring to the resource that is the subject of the signing
   *  (as in the __subject__ of a claim). */
  uri: string
  /**ISO 8601 datetime string that, if present, indicates when the signed
   * authentication message is no longer valid. */
  expirationTime?: string | undefined
  /**ISO 8601 datetime string that, if present, indicates when the signed
   * authentication message will become valid. */
  notBefore?: string | undefined
}

/* ISiwsTypedData has to map to the structure expected by starknet.js and it is specified here
 * https://www.starknetjs.com/docs/guides/signature/ */
export interface ISiwsTypedData {
  domain: ISiwsDomain
  message: ISiwsMessage
  primaryType: string
  types: {
    Message: Array<{ name: string; type: string }>
    StarknetDomain: Array<{ name: string; type: string }>
  }
}

export enum ErrorTypes {
  /** `expirationTime` is present and in the past. */
  EXPIRED_MESSAGE = 'Expired message.',

  /** `domain` is not a valid authority or is empty. */
  INVALID_DOMAIN = 'Invalid domain.',

  /** `chainId` is not a valid chain ID. */
  NETWORK_MISMATCH = 'Network do not match provided network for verification.',

  /** `domain` don't match the domain provided for verification. */
  DOMAIN_MISMATCH = 'Domain do not match provided domain for verification.',

  /** `nonce` don't match the nonce provided for verification. */
  NONCE_MISMATCH = 'Nonce do not match provided nonce for verification.',

  /** `address` is not a valid address. */
  INVALID_ADDRESS = 'Invalid address.',

  /** `uri` does not conform to RFC 3986. */
  INVALID_URI = 'URI does not conform to RFC 3986.',

  /** `nonce` is smaller than 8 characters or is not alphanumeric */
  INVALID_NONCE = 'Nonce size smaller than 8 characters or is not alphanumeric.',

  /** `notBefore` is present and in the future. */
  NOT_YET_VALID_MESSAGE = 'Message is not valid yet.',

  /** Signature doesn't match the address of the message. */
  INVALID_SIGNATURE = 'Signature do not match address of the message.',

  /** `expirationTime`, `notBefore` or `issuedAt` not complient to ISO-8601. */
  INVALID_TIME_FORMAT = 'Invalid time format.',

  /** `version` is not 1. */
  INVALID_MESSAGE_VERSION = 'Invalid message version.',

  /** Thrown when some required field is missing. */
  UNABLE_TO_PARSE = 'Unable to parse the message.',

  MALFORMED_SESSION = 'Malformed Session',
}

export const SignInWithStarknetError = (
  type: ErrorTypes,
  expected?: string,
  received?: string,
) => {
  return {
    type,
    expected,
    received,
  }
}

export interface VerifyParams {
  signature: string[]
  network?: string

  /** RFC 4501 dns authority that is requesting the signing. */
  domain?: string

  /** Randomized token used to prevent replay attacks, at least 8 alphanumeric characters. */
  nonce?: string

  /**ISO 8601 datetime string of the current time. */
  time?: string
}

/**
 * Returned on verifications.
 */
export interface SignInWithStarknetResponse {
  /** Boolean representing if the message was verified with success. */
  success: boolean

  /** If present `success` MUST be false and will provide extra information on the failure reason. */
  error?: typeof SignInWithStarknetError

  /** Original message that was verified. */
  data: ISiwsTypedData
}

export interface VerifyOpts {
  /** ethers provider to be used for EIP-1271 validation */
  provider?: any
}

/**
 * @description EIP-4361 message fields
 *
 * @see https://eips.ethereum.org/EIPS/eip-4361
 */
export type SiwsMessage = {
  /**
   * The Starknet address performing the signing.
   */
  address: string
  /**
   * The [EIP-155](https://eips.ethereum.org/EIPS/eip-155) Chain ID to which the session is bound,
   */
  chainId: Hex
  /**
   * [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) authority that is requesting the signing.
   */
  domain: string
  /**
   * Time when the signed authentication message is no longer valid.
   */
  expirationTime?: string | undefined
  /**
   * Time when the message was generated, typically the current time.
   */
  issuedAt?: string | undefined
  /**
   * A random string typically chosen by the relying party and used to prevent replay attacks.
   */
  nonce: string
  /**
   * Time when the signed authentication message will become valid.
   */
  notBefore?: string | undefined
  /**
   * A system-specific identifier that may be used to uniquely refer to the sign-in request.
   */
  requestId?: string | undefined
  /**
   * A list of information or references to information the user wishes to have resolved as part of authentication by the relying party.
   */
  resources?: string[] | undefined
  /**
   * [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-3.1) URI scheme of the origin of the request.
   */
  scheme?: string | undefined
  /**
   * A human-readable ASCII assertion that the user will sign.
   */
  statement: string
  /**
   * [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) URI referring to the resource that is the subject of the signing (as in the subject of a claim).
   */
  uri: string
  /**
   * Message version and not the starknet domain version.
   */
  version: string
}
