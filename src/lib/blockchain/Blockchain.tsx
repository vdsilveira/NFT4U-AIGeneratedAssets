import Connections from "./networkSelect";
import catchABI from "./readABI";
import { ethers } from "ethers";
import { useWalletClient } from "wagmi";

const Blockchain = () => {
  const { contractAddress, rpcUrl } = Connections();
  const { data: walletClient } = useWalletClient();

  const ABI = catchABI();

  if (!contractAddress || !rpcUrl || !walletClient) {
    console.warn("⚠️ Conecte-se na Sepolia ou Amoy com sua carteira");
    return { mintToken: undefined };
  }

  
  const provider = new ethers.BrowserProvider(walletClient);

  
  const mintToken = async (amount: number, link: string) => {
    try {
      const signer = await provider.getSigner(); 
      const contract = new ethers.Contract(contractAddress, ABI, signer); 

      const tx = await contract.mint(amount, link, "0x0"); 
      console.log("Transaction sent:", tx);
      await tx.wait();
      return tx.hash;
    } catch (err) {
      console.error(err);
    }
  };

  return { mintToken };
};

export default Blockchain;
