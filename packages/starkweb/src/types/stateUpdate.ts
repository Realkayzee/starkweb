import type { Address, Felt, Hash, Hex } from './misc.js'

export type StateMapping = {
  slot: Hex
  value: Hex
}[]

export type StateUpdateType =
  | {
      block_hash: Hash
      new_root: Hash
      old_root: Hash
      state_diff: StateDifference
    }
  | {
      old_root: Hash
      state_diff: StateDifference
    }

export type StateDifference = {
  declared_classes: Address[]
  deployed_contracts: {
    address: Address
    class_hash: Hash
  }[]
  deprecate_declared_classes: Address[]
  nonces: {
    contract_address: Address
    nonce: Felt
  }[]
  storage_diffs: {
    address: Address
    storage_entries: {
      key: Hex
      value: Hex
    }[]
  }[]
  replaced_classes: {
    contract_address: Address
    class_hash: Hash
  }[]
}
