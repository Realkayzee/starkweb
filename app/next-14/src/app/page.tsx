'use client'

import Image from "next/image";



import { createPublicClient, http } from 'starkweb'
import { mainnet } from 'starkweb/chains'

import { useAccount, useChainId, useConnect, useDisconnect } from 'starkweb/react'
import { Web3Provider } from "./components/Web3Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function Home() {
  const queryClient = new QueryClient();
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });
  const account = useAccount()
  // const blockNumber = await publicClient.getBlockNumber();
  return (
      <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Web3Provider>
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {/* <p>Block number: {blockNumber}</p> */}
          <p>Address: {JSON.stringify(account)}</p>
        </main>
        <Connect />
      </Web3Provider>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
        </footer>
      </div>
    </QueryClientProvider>
  );
}


const Connect = () => {
  const chainId = useChainId()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Connect</h2>
      <p className="mb-2"><strong>Current Chain ID:</strong> {chainId}</p>
      <div className="grid grid-cols-2 gap-4">
        {connectors.map((connector: any) => (
          <div key={connector.uid} className="flex flex-col space-y-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => connect()}
            >
              {connector.name}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => disconnect()}
            >
              Disconnect {connector.name}
            </button>
          </div>
        ))}
      </div>
      {status && <p className="mt-4 text-gray-600">{status}</p>}
      {error && <p className="mt-4 text-red-500">{error.message}</p>}
    </div>
  )
}