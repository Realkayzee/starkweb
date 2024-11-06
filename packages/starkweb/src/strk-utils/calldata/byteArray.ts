import type { BigNumberish, ByteArray } from '../../strk-types/lib.js'
import { encodeShortString, splitLongString } from '../shortString.js'

export function byteArrayFromString(targetString: string): ByteArray {
  const shortStrings: string[] = splitLongString(targetString)
  const remainder: string = shortStrings[shortStrings.length - 1]!
  const shortStringsEncoded: BigNumberish[] =
    shortStrings.map(encodeShortString)

  const [pendingWord, pendingWordLength] =
    remainder === undefined || remainder.length === 31
      ? ['0x00', 0]
      : [shortStringsEncoded.pop()!, remainder.length]

  return {
    data: shortStringsEncoded.length === 0 ? [] : shortStringsEncoded,
    pending_word: pendingWord,
    pending_word_len: pendingWordLength,
  }
}
