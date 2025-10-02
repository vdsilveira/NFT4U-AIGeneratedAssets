import { useState, useEffect } from "react";
import { ethers } from "ethers";


interface UseBlockchainReturn {
  mintToken?: (amount: number, link: string) => Promise<string>;
}

const useBlockchain = (contractAddress: string | undefined): UseBlockchainReturn => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    if ((window as any).ethereum) {
      const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(ethProvider);
    } else {
      console.warn("⚠️ MetaMask não encontrada");
    }
  }, []);

  if (!provider || !contractAddress) {
    console.warn("⚠️ Conecte-se com sua carteira ou passe o endereço do contrato");
    return { mintToken: undefined };
  }

  // ABI legível
  const readableABI = [
    "function setTokenURI(uint256 tokenId, string tokenURI) external",
    "function uri(uint256 tokenId) external view returns (string memory)",
    "function setFee(uint256 newFee) external",
    "function mint(uint256 amount, string link, bytes data) external payable",
    "function fee() external view returns (uint256)",
    "function withdraw() external"
  ];

  

  const mintToken = async (amount: number, link: string) => {
    try {
   
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, readableABI, signer);
      console.log(await contract.getAddress());
     


      const feeEth = "0.001"; // em ETH
      const feeWei = ethers.parseEther(feeEth);

      const tx = await contract.mint(amount, link, "0x", { value: feeWei * BigInt(amount) });

      console.log("Transaction sent:", tx);
      await tx.wait();
      console.log("Transaction confirmed:", tx.hash);
      return tx.hash;
    } catch (err) {
      console.error("Erro ao mintar token:", err);
      throw err;
    }
  };

  return { mintToken };
};

export default useBlockchain;
