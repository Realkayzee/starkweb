import type { Chain } from "../../types/chain.js";
import { useConfig } from "../../react/hooks/useConfig.js";

export function useChains() {
  const wolf = useConfig();
  const chains = wolf?.chains ?? [];
  return chains.map((c) => c) as Chain[];
}
