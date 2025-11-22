import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";

const useConnections = (): string => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [contractAddress, setContractAddress] = useState("");

  useEffect(() => {
    if (!isConnected) {
      setContractAddress("");
      return;
    }

    switch (chainId) {
      case 11155111: // Sepolia
        setContractAddress(process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT || "");
        break;

      case 80002: // Amoy
        setContractAddress(process.env.NEXT_PUBLIC_AMOY_CONTRACT || "");
        break;

      default:
        alert("Please connect to Sepolia or Amoy network");
        setContractAddress("");
    }
  }, [isConnected, chainId]);

  return contractAddress;
};

export default useConnections;
