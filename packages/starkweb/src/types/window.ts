import type { SNIP1193Provider } from './snip1193.js'

declare global {
  interface Window {
    starknet?: SNIP1193Provider | undefined
  }
}
// declare global {
//   interface Window {
//     starknet_argentX?: SNIP1193Provider | undefined
//   }
// }
