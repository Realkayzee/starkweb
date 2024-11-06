import { defineChain } from '../../utils/chain/defineChain.js'

export const sepolia = /*#__PURE__*/ defineChain({
  id: 2,
  chain_id: '0x534e5f5345504f4c4941',
  name: 'Starknet Sepolia',
  testnet: true,
  nativeCurrency: {
    name: 'Stark',
    symbol: 'STRK',
    decimals: 18,
    address:
      '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  },
  rpcUrls: {
    voyager: {
      http: ['https://sepolia.voyager.online'],
      webSocket: ['wss://sepolia.voyager.online'],
    },
    alchemy: {
      http: ['https://starknet-sepolia.g.alchemy.com/v2'],
      webSocket: ['wss://starknet-sepolia.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://starknet-sepolia.infura.io/v3'],
      webSocket: ['wss://starknet-sepolia.infura.io/ws/v3'],
    },
    default: {
      http: ['https://free-rpc.nethermind.io/sepolia-juno/'],
    },
    public: {
      http: ['https://free-rpc.nethermind.io/sepolia-juno/'],
    },
  },
  blockExplorers: {
    starkcompass: {
      name: 'Stark Compass',
      url: 'https://sepolia.starkcompass.com',
    },
    voyager: {
      name: 'Voyager',
      url: 'https://sepolia.voyager.online',
    },
    starkscan: {
      name: 'Stark Scan',
      url: 'https://sepolia.starkscan.co',
    },
    default: {
      name: 'Stark Compass',
      url: 'https://sepolia.starkcompass.com',
    },
  },
})
