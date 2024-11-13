import { useConfig } from "src/react/hooks/useConfig.js";
import type { Hex } from "../../types/misc.js";

export function useChainIsSupported(chainId?: Hex): boolean | null {
  const { chains } = useConfig();
  if (!chainId) return false;
  return chains.some((x) => x.chain_id === chainId);
}
