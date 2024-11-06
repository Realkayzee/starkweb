//@ts-nocheck

import type {
  Abi,
  Account,
  Address,
  Chain,
  ContractFunctionArgs,
  ContractFunctionName,
} from "strkjs";
import {
  type SimulateTransactionErrorType as strkjs_SimulateTransactionErrorType,
  type SimulateTransactionParameters as strkjs_SimulateTransactionParameters,
  type SimulateTransactionReturnTypes as strkjs_SimulateTransactionReturnType,
  simulateTransaction as strkjs_simulateTransaction,
} from "strkjs/actions";

import type { Config } from "../createConfig.js";
import type { BaseErrorType, ErrorType } from "../errors/base.js";
import type { SelectChains } from "../types/chain.js";
import type {
  ChainIdParameter,
  ConnectorParameter,
} from "../types/properties.js";
import type {
  Evaluate,
  PartialBy,
  UnionEvaluate,
  UnionLooseOmit,
} from "../types/utils.js";
import { getAction } from "../utils/getAction.js";
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from "./getConnectorClient.js";

export type SimulateTransactionParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    "nonpayable" | "payable"
  > = ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  > = ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
  config extends Config = Config,
  chainId extends
    | config["chains"][number]["id"]
    | undefined = config["chains"][number]["id"],
  ///
  chains extends readonly Chain[] = SelectChains<
    config,
    chainId
  > extends readonly Chain[]
    ? SelectChains<config, chainId>
    : never
> = {
  [key in keyof chains]: UnionEvaluate<
    UnionLooseOmit<strkjs_SimulateTransactionParameters, "chain"> & {
      abi: abi;
      functionName: functionName;
      args: args;
    }
  > &
    ChainIdParameter &
    ConnectorParameter;
}[number];

export type SimulateTransactionReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    "nonpayable" | "payable"
  > = ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  > = ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
  config extends Config = Config,
  chainId extends
    | config["chains"][number]["id"]
    | undefined = config["chains"][number]["id"],
  ///
  chains extends readonly Chain[] = SelectChains<
    config,
    chainId
  > extends readonly Chain[]
    ? SelectChains<config, chainId>
    : never
> = {
  [key in keyof chains]: strkjs_SimulateTransactionReturnType & {
    chainId: chains[key]["id"];
    request: Evaluate<
      PartialBy<
        { __mode: "prepared"; chainId: chainId; chain: chains[key] },
        chainId extends config["chains"][number]["id"] ? never : "chainId"
      >
    >;
  };
}[number];

export type SimulateTransactionErrorType =
  | GetConnectorClientErrorType
  | BaseErrorType
  | ErrorType
  | strkjs_SimulateTransactionErrorType;

/** https://wagmi.sh/core/api/actions/simulateTransaction */
export async function simulateTransaction<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  >,
  chainId extends config["chains"][number]["id"] | undefined = undefined
>(
  config: config,
  parameters: SimulateTransactionParameters<
    abi,
    functionName,
    args,
    config,
    chainId
  >
): Promise<
  SimulateTransactionReturnType<abi, functionName, args, config, chainId>
> {
  const { abi, chainId, connector, ...rest } =
    parameters as SimulateTransactionParameters;

  let account: Address | Account;
  if (parameters.account) account = parameters.account;
  else {
    const connectorClient = await getConnectorClient(config, {
      chainId,
      connector,
    });
    account = connectorClient.account;
  }

  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_simulateTransaction,
    "simulateTransaction"
  );
  const { result, request } = await action({ ...rest, abi, account });

  return {
    chainId: client.chain.id,
    result,
    request: { __mode: "prepared", ...request, chainId },
  } as unknown as SimulateTransactionReturnType<
    abi,
    functionName,
    args,
    config,
    chainId
  >;
}
