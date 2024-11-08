// import type { QueryOptions } from "@tanstack/query-core";
// import type { ContractFunctionArgs, ContractFunctionName } from "../../types/contract.js";
// import {
//   type SimulateTransactionErrorType,
//   type SimulateTransactionParameters,
//   type SimulateTransactionReturnType,
//   simulateTransaction,
// } from "../actions/simulateTransaction.js";
// import type { Config } from "../createConfig.js";
// import type { ScopeKeyParameter } from "../types/properties.js";
// import type { ExactPartial } from "../types/utils.js";
// import { filterQueryOptions } from "./utils.js";
// import type { Abi } from "../../strk-types/abi.js";

// export type SimulateContractOptions<
//   abi extends Abi | readonly unknown[],
//   functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
//   args extends ContractFunctionArgs<
//     abi,
//     "nonpayable" | "payable",
//     functionName
//   >,
//   config extends Config,
//   chainId extends config["chains"][number]["id"] | undefined
// > = ExactPartial<
//   SimulateTransactionParameters<abi, functionName, args, config, chainId>
// > &
//   ScopeKeyParameter;

// export function simulateContractQueryOptions<
//   config extends Config,
//   const abi extends Abi | readonly unknown[],
//   functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
//   args extends ContractFunctionArgs<
//     abi,
//     "nonpayable" | "payable",
//     functionName
//   >,
//   chainId extends config["chains"][number]["id"] | undefined
// >(
//   config: config,
//   options: SimulateContractOptions<
//     abi,
//     functionName,
//     args,
//     config,
//     chainId
//   > = {} as any
// ) {
//   return {
//     async queryFn({ queryKey }) {
//       const { abi, connector } = options;
//       if (!abi) throw new Error("abi is required");
//       const { scopeKey: _, ...parameters } = queryKey[1];
//       const { address, functionName } = parameters;
//       if (!address) throw new Error("address is required");
//       if (!functionName) throw new Error("functionName is required");
//       return simulateTransaction(config, {
//         abi,
//         connector,
//         ...(parameters as any),
//       });
//     },
//     queryKey: simulateContractQueryKey(options),
//   } as const satisfies QueryOptions<
//     SimulateContractQueryFnData<abi, functionName, args, config, chainId>,
//     SimulateTransactionErrorType,
//     SimulateContractData<abi, functionName, args, config, chainId>,
//     SimulateContractQueryKey<abi, functionName, args, config, chainId>
//   >;
// }

// export type SimulateContractQueryFnData<
//   abi extends Abi | readonly unknown[],
//   functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
//   args extends ContractFunctionArgs<
//     abi,
//     "nonpayable" | "payable",
//     functionName
//   >,
//   config extends Config,
//   chainId extends config["chains"][number]["id"] | undefined
// > = SimulateTransactionReturnType<abi, functionName, args, config, chainId>;

// export type SimulateContractData<
//   abi extends Abi | readonly unknown[],
//   functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
//   args extends ContractFunctionArgs<
//     abi,
//     "nonpayable" | "payable",
//     functionName
//   >,
//   config extends Config,
//   chainId extends config["chains"][number]["id"] | undefined
// > = SimulateContractQueryFnData<abi, functionName, args, config, chainId>;

// export function simulateContractQueryKey<
//   config extends Config,
//   abi extends Abi | readonly unknown[],
//   functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
//   args extends ContractFunctionArgs<
//     abi,
//     "nonpayable" | "payable",
//     functionName
//   >,
//   chainId extends config["chains"][number]["id"] | undefined
// >(
//   options: SimulateContractOptions<
//     abi,
//     functionName,
//     args,
//     config,
//     chainId
//   > = {} as any
// ) {
//   const { abi: _, connector: _c, ...rest } = options;
//   return ["simulateContract", filterQueryOptions(rest)] as const;
// }

// export type SimulateContractQueryKey<
//   abi extends Abi | readonly unknown[],
//   functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
//   args extends ContractFunctionArgs<
//     abi,
//     "nonpayable" | "payable",
//     functionName
//   >,
//   config extends Config,
//   chainId extends config["chains"][number]["id"] | undefined
// > = ReturnType<
//   typeof simulateContractQueryKey<config, abi, functionName, args, chainId>
// >;
