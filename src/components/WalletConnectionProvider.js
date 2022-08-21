import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  getPhantomWallet,
  getLedgerWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
//import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

export const WalletConnectionProvider = ({ children, network = "mainnet-beta" }) => {
  // console.log('Network:');
  // console.log(network);

  // You can also provide a custom RPC endpoint
  const endpoint = 'https://solana-api.projectserum.com';//'https://solana-mainnet.g.alchemy.com/v2/DtwUWpHP3LKTvu3HKclT1l1lk4Le8UHu';//'https://solana-api.projectserum.com';
  console.log(endpoint)

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
