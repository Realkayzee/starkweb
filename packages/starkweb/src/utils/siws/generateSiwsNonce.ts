import { uid } from '../uid.js'

/**
 * @description Generates random EIP-4361 nonce.
 *
 * @example
 * const nonce = generateNonce()
 *
 * @see https://eips.ethereum.org/EIPS/eip-4361
 *
 * @returns A randomly generated EIP-4361 nonce.
 */
export function generateSiwsNonce(): string {
  return uid(96)
}
