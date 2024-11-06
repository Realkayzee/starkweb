import { createPublicClient, http } from "starkweb";
import { mainnet } from "starkweb/chains";
export default async function Home() {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });
  const blockNumber = await publicClient.getBlockNumber();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Hello Starkweb</h1>
        <p>Block number: {blockNumber}</p>
      </main>
    </div>
  );
}
