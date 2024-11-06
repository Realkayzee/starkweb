import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type {
  ADDRESS,
  BLOCK_HASH,
  BLOCK_TAG,
  FELT,
  SIMULATION_FLAG_FOR_ESTIMATE_FEE,
} from '../../types/components.js'

export type EstimateFeeParameters = (
  | {
      type: 'INVOKE'
      version: '0x1'
      sender_address: ADDRESS
      calldata: FELT[]
      max_fee: FELT
      signature: FELT[]
      nonce: FELT
    }
  | {
      type: 'INVOKE'
      version: '0x3'
      sender_address: ADDRESS
      calldata: FELT[]
      signature: FELT[]
      nonce: FELT
      tip: FELT
      paymaster_data: any
      account_deployment_data: any
      nonce_data_availability_mode: 'L2'
      fee_data_availability_mode: 'L2'
      l1_max_amount: FELT
      l1_max_price_per_unit: FELT
      l2_max_amount: FELT
      l2_max_price_per_unit: FELT
    }
  | {
      type: 'DECLARE'
      version: '0x2'
      sender_address: ADDRESS
      compiled_class_hash: FELT
      max_fee: FELT
      signature: FELT[]
      nonce: FELT
    }
  | {
      type: 'DECLARE'
      version: '0x3'
      sender_address: ADDRESS
      compiled_class_hash: FELT
      signature: FELT[]
      nonce: FELT
      tip: FELT
      paymaster_data: any
      account_deployment_data: any
      nonce_data_availability_mode: 'L2'
      fee_data_availability_mode: 'L2'
      l1_max_amount: FELT
      l1_max_price_per_unit: FELT
      l2_max_amount: FELT
      l2_max_price_per_unit: FELT
    }
  | {
      type: 'DEPLOY_ACCOUNT'
      version: '0x1'
      max_fee: FELT
      signature: FELT[]
      nonce: FELT
      contract_address_salt: FELT
      constructor_calldata: FELT[]
      class_hash: FELT
    }
  | {
      type: 'DEPLOY_ACCOUNT'
      version: '0x3'
      signature: FELT[]
      nonce: FELT
      contract_address_salt: FELT
      constructor_calldata: FELT[]
      class_hash: FELT
      tip: FELT
      paymaster_data: any
      nonce_data_availability_mode: 'L2'
      fee_data_availability_mode: 'L2'
      l1_max_amount: FELT
      l1_max_price_per_unit: FELT
      l2_max_amount: FELT
      l2_max_price_per_unit: FELT
    }
) & {
  simulation_flags: SIMULATION_FLAG_FOR_ESTIMATE_FEE
  block_hash?: BLOCK_HASH
  block_number?: number
  block_tag?: BLOCK_TAG
}
export type EstimateFeeReturnTypes = any
export type EstimateFeeErrorType = any

export async function estimateFee<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { block_hash, block_number, block_tag, type, version }: EstimateFeeParameters,
): Promise<EstimateFeeReturnTypes> {
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')
  if (type === 'INVOKE' && version === '0x1') {
    return await client.request({
      method: 'starknet_estimateFee',
      params: {
        request: {
          type: 'INVOKE',
          version: '0x1',
          sender_address:
            '0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49',
          calldata: [],
          max_fee: '0x0',
          signature: [
            '0x1d4231646034435917d3513cafd6e22ce3ca9a783357137e32b7f52827a9f98',
            '0x61c0b5bae9710c514817c772146dd7509517d2c47fd9bf622370215485ee5af',
          ],
          nonce: '0x0',
        },
        simulation_flags: 'SKIP_VALIDATE',
        block_id,
      },
    })
  }
  if (type === 'INVOKE' && version === '0x3') {
    return await client.request({
      method: 'starknet_estimateFee',
      params: {
        request: {
          type: 'INVOKE',
          version: '0x3',
          sender_address:
            '0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49',
          calldata: [],
          signature: [
            '0x1d4231646034435917d3513cafd6e22ce3ca9a783357137e32b7f52827a9f98',
            '0x61c0b5bae9710c514817c772146dd7509517d2c47fd9bf622370215485ee5af',
          ],
          nonce: '0x0',
          tip: '0x0',
          paymaster_data: [],
          account_deployment_data: [],
          nonce_data_availability_mode: 'L2',
          fee_data_availability_mode: 'L2',
          resource_bounds: {
            l1_gas: {
              max_amount: '0x0',
              max_price_per_unit: '0x0',
            },
            l2_gas: {
              max_amount: '0x0',
              max_price_per_unit: '0x0',
            },
          },
        },
        simulation_flags: 'SKIP_VALIDATE',
        block_id,
      },
    })
  }
  if (type === 'DECLARE' && version === '0x2') {
    return await client.request({
      method: 'starknet_estimateFee',
      params: {
        request: {
          type: 'DECLARE',
          version: '0x2',
          sender_address:
            '0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49',
          compiled_class_hash:
            '0x3131fa018d520a037686ce3efddeab8f28895662f019ca3ca18a626650f7d1e',
          contract_class: {
            sierra_program: [],
            contract_class_version: '',
            entry_points_by_type: {
              CONSTRUCTOR: [],
              EXTERNAL: [],
              L1_HANDLER: [],
            },
            abi: '',
          },
          max_fee: '0x0',
          signature: [
            '0x1d4231646034435917d3513cafd6e22ce3ca9a783357137e32b7f52827a9f98',
            '0x61c0b5bae9710c514817c772146dd7509517d2c47fd9bf622370215485ee5af',
          ],
          nonce: '0x0',
        },
        simulation_flags: 'SKIP_VALIDATE',
        block_id,
      },
    })
  }
  if (type === 'DECLARE' && version === '0x3') {
    return await client.request({
      method: 'starknet_estimateFee',
      params: {
        request: {
          type: 'DECLARE',
          version: '0x3',
          sender_address:
            '0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49',
          compiled_class_hash:
            '0x3131fa018d520a037686ce3efddeab8f28895662f019ca3ca18a626650f7d1e',
          contract_class: {
            sierra_program: [],
            contract_class_version: '',
            entry_points_by_type: {
              CONSTRUCTOR: [],
              EXTERNAL: [],
              L1_HANDLER: [],
            },
            abi: '',
          },
          signature: [
            '0x1d4231646034435917d3513cafd6e22ce3ca9a783357137e32b7f52827a9f98',
            '0x61c0b5bae9710c514817c772146dd7509517d2c47fd9bf622370215485ee5af',
          ],
          nonce: '0x0',
          tip: '0x0',
          paymaster_data: [],
          account_deployment_data: [],
          nonce_data_availability_mode: 'L2',
          fee_data_availability_mode: 'L2',
          resource_bounds: {
            l1_gas: {
              max_amount: '0x0',
              max_price_per_unit: '0x0',
            },
            l2_gas: {
              max_amount: '0x0',
              max_price_per_unit: '0x0',
            },
          },
        },
        simulation_flags: 'SKIP_VALIDATE',
        block_id,
      },
    })
  }
  if (type === 'DEPLOY_ACCOUNT' && version === '0x1') {
    return await client.request({
      method: 'starknet_estimateFee',
      params: {
        request: {
          type: 'DEPLOY_ACCOUNT',
          version: '0x1',
          max_fee: '0x0',
          signature: [
            '0xd96bc7affb5648b601ddb49e9fd23f6ebfe59375e2ce5dd06b7db638d21b71',
            '0x6582c1512c8515254a52deb5fef1320d4f5dd0cb8352b260a4e7a90c61510ba',
            '0x5dec330eebf36c8672b60db4a718d44762d3ae6d1333e553197acb47ee5a062',
            '0x0',
            '0x0',
            '0x0',
            '0x0',
            '0x0',
            '0x0',
            '0x0',
          ],
          nonce: '0x0',
          contract_address_salt: '0x0',
          constructor_calldata: [
            '0x5aa23d5bb71ddaa783da7ea79d405315bafa7cf0387a74f4593578c3e9e6570',
            '0x2dd76e7ad84dbed81c314ffe5e7a7cacfb8f4836f01af4e913f275f89a3de1a',
            '0x1',
            '0x61fcdc5594c726dc437ddc763265853d4dce51a57e25ff1d97b3e31401c7f4c',
          ],
          class_hash:
            '0x3131fa018d520a037686ce3efddeab8f28895662f019ca3ca18a626650f7d1e',
        },
        simulation_flags: 'SKIP_VALIDATE',
        block_id,
      },
    })
  }
  if (type === 'DEPLOY_ACCOUNT' && version === '0x3') {
    return await client.request({
      method: 'starknet_estimateFee',
      params: {
        request: {
          type: 'DEPLOY_ACCOUNT',
          version: '0x3',
          signature: [
            '0xd96bc7affb5648b601ddb49e9fd23f6ebfe59375e2ce5dd06b7db638d21b71',
            '0x6582c1512c8515254a52deb5fef1320d4f5dd0cb8352b260a4e7a90c61510ba',
            '0x5dec330eebf36c8672b60db4a718d44762d3ae6d1333e553197acb47ee5a062',
            '0x0',
            '0x0',
            '0x0',
            '0x0',
            '0x0',
            '0x0',
            '0x0',
          ],
          nonce: '0x0',
          contract_address_salt: '0x0',
          constructor_calldata: [
            '0x5aa23d5bb71ddaa783da7ea79d405315bafa7cf0387a74f4593578c3e9e6570',
            '0x2dd76e7ad84dbed81c314ffe5e7a7cacfb8f4836f01af4e913f275f89a3de1a',
            '0x1',
            '0x61fcdc5594c726dc437ddc763265853d4dce51a57e25ff1d97b3e31401c7f4c',
          ],
          class_hash:
            '0x3131fa018d520a037686ce3efddeab8f28895662f019ca3ca18a626650f7d1e',
          tip: '0x0',
          paymaster_data: [],
          nonce_data_availability_mode: 'L2',
          fee_data_availability_mode: 'L2',
          resource_bounds: {
            l1_gas: {
              max_amount: '0x0',
              max_price_per_unit: '0x0',
            },
            l2_gas: {
              max_amount: '0x0',
              max_price_per_unit: '0x0',
            },
          },
        },
        simulation_flags: 'SKIP_VALIDATE',
        block_id,
      },
    })
  }
}
