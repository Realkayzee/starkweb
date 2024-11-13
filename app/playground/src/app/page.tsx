'use client'

import { useAccount, useConnect, useDisconnect } from 'starkweb/react'

import { getConfig } from '@/wagmi'
import { QueryClient } from '@tanstack/react-query'
import { useState } from 'react'
const config = getConfig()

function App() {
  const account = useAccount()
  const [queryClient] = useState(() => new QueryClient())
  const { connectors, connect, status, error } = useConnect(queryClient)
  const { disconnect } = useDisconnect()

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector: any) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
