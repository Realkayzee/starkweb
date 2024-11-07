'use client'
import { createPublicClient, http } from "starkweb";
import { mainnet } from "starkweb/chains";
import { useAccount, useDisconnect } from "starkweb/react";
export default function Home() {
  const account = useAccount();
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });
  // const blockNumber = await publicClient.getBlockNumber();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Hello Starkweb</h1>
        {/* <p>Block number: {blockNumber}</p> */}
        <p>Account: {account?.address}</p>
        <Account />
      </main>
    </div>
  );
}

const Account = () => {
  const account = useAccount()
  const { disconnect, disconnectAsync, connectors } = useDisconnect()

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Account</h2>
      <div className="mb-4">
        <p><strong>Address:</strong> {account.address}</p>
        <p><strong>Chain ID:</strong> {account.chainId}</p>
        <p><strong>Status:</strong> {account.status}</p>
      </div>
      {account.status !== 'disconnected' && (
        <>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => disconnectAsync()}
        >
          Disconnect Async
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
        </>
      )}
      <div>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => disconnect({ connector })}
          >
            Disconnect {connector.name}
          </button>
        ))}
      </div>
    </div>
  )
}