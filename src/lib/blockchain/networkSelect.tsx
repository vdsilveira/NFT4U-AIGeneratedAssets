import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";

const Connections = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [contractAddress, setContractAddress] = useState("");
  const [rpcUrl, setRpcUrl] = useState("");

  useEffect(() => {
    if (!isConnected) return;

    if (chainId === 11155111) { // Sepolia
      setContractAddress(process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT as string);
      setRpcUrl(process.env.NEXT_PUBLIC_SEPOLIA_RPC as string);
    } else if (chainId === 80002) { // Amoy
      setContractAddress(process.env.NEXT_PUBLIC_AMOY_CONTRACT as string);
      setRpcUrl(process.env.NEXT_PUBLIC_AMOY_RPC as string);
    } else {
      alert("Please connect to Sepolia or Amoy network");
    }
  }, [isConnected, chainId]);

  return (
    { contractAddress, rpcUrl }
  );
};

export default Connections;
