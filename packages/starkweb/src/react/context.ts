'use client'
import type React from 'react'
import type { State } from '../core/createConfig.js'
import { createContext, createElement } from 'react'
import { Hydrate } from './hydrate.js'
import type { ResolvedRegister } from '../core/types/register.js'

export const StarkwebContext = createContext<
  ResolvedRegister['config'] | undefined
>(undefined)

export type StarkwebProviderProps = {
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function StarkwebProvider({
  children,
  config,
  ...rest
}: React.PropsWithChildren<StarkwebProviderProps>): React.ReactElement {
  const props = { value: config }
  return createElement(
    Hydrate,
    { ...rest, config },
    createElement(StarkwebContext.Provider, props, children),
  )
}
