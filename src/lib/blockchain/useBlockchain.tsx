"use client"
import { useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"

interface UseBlockchainReturn {
  mintToken?: (amount: number, link: string) => Promise<string>
  GetAssetlist?: () => Promise<any>
}

const useBlockchain = (contractAddress: string | undefined): UseBlockchainReturn => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)

  // inicializa provider sempre
  useEffect(() => {
    if ((window as any).ethereum) {
      setProvider(new ethers.BrowserProvider((window as any).ethereum))
    } else {
      console.warn("MetaMask não encontrada")
    }
  }, [])

  /** contract pode ser null — mas hook é válido */
  const getContract = useCallback(
    async () => {
      if (!provider || !contractAddress) return null
      const signer = await provider.getSigner()
      const abi = [
        "function mint(uint256 amount, string link, bytes data) external payable",
        "function uri(uint256 tokenId) external view returns (string)",
        "function getTokens(address owner) external view returns (uint256[])",
        "function fee() external view returns (uint256)"
      ]
      return new ethers.Contract(contractAddress, abi, signer)
    },
    [provider, contractAddress]
  )

  /** mint sempre existe, mas pode falhar se provider=null */
  const mintToken = useCallback(
    async (amount: number, link: string) => {
      const contract = await getContract()
      if (!contract) throw new Error("Contrato não inicializado")

      const feeEth = "0.001"
      const tx = await contract.mint(amount, link, "0x", {
        value: ethers.parseEther(feeEth) * BigInt(amount)
      })

      await tx.wait()
      return tx.hash
    },
    [getContract]
  )

  const GetAssetlist = useCallback(
    async () => {
      // if (!provider) throw new Error("Provider não encontrado")

      const accounts = await provider.send("eth_accounts", [])
      const userAddress = accounts[0]
      if (!userAddress) throw new Error("Wallet não conectada")

      const contract = await getContract()
      if (!contract) throw new Error("Contrato não inicializado")

      const ids: bigint[] = await contract.getTokens(userAddress)

      const uris = []
      for (const id of ids) {
        const tokenId = Number(id)
        const uri = await contract.uri(tokenId)
        uris.push({ tokenId, uri })
      }

      return { tokens: ids, uris }
    },
    [provider, getContract]
  )

  return { mintToken, GetAssetlist }
}

export default useBlockchain
