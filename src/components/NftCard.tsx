"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import useBlockchain from "../lib/blockchain/useBlockchain"
import useConnections from "../lib/blockchain/networkSelect"
import styles from "../styles/NftCard.module.css"

interface NFT {
  tokenId: number
  image: string
  name: string
}

export function NftCard() {
  const address = useConnections()
  const { GetAssetlist } = useBlockchain(address)

  const [tokens, setTokens] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({})

  const normalize = (url: string) => {
    if (!url) return ""
    if (url.startsWith("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/")
    }
    return url
  }

  const fetchMetadata = async (uri: string) => {
    try {
      const url = normalize(uri)

      if (!url.endsWith(".json")) {
        return { image: url, name: "NFT" }
      }

      const res = await fetch(url)
      const json = await res.json()

      return {
        image: normalize(json.image),
        name: json.name || "NFT",
      }
    } catch (e) {
      console.error("Erro lendo metadata:", e)
      return { image: "", name: "NFT" }
    }
  }

  const load = useCallback(async () => {
    if (!GetAssetlist) return

    try {
      const result = await GetAssetlist()

      if (!result || !result.uris?.length) {
        setTokens([])
        return
      }

      const finalList: NFT[] = []

      for (const item of result.uris) {
        const tokenId = Number(item.tokenId)
        const metadata = await fetchMetadata(item.uri)

        finalList.push({
          tokenId,
          image: metadata.image,
          name: metadata.name,
        })
      }

      setTokens(finalList)
    } catch (err) {
      console.error("Erro ao carregar NFTs:", err)
    } finally {
      setLoading(false)
    }
  }, [GetAssetlist])

  useEffect(() => {
    load()
  }, [load])

  if (loading) return <p className={styles.message}>Carregando NFTs...</p>

  if (tokens.length === 0) return <p className={styles.message}>Você ainda não possui NFTs.</p>

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {tokens.map((token) => (
          <div key={token.tokenId} className={styles.card}>
            <div className={styles.imageContainer}>
              {imageErrorMap[token.tokenId] || !token.image ? (
                <div className={styles.placeholder}>Imagem indisponível</div>
              ) : (
                <Image
                  src={token.image || "/placeholder.svg"}
                  alt={token.name}
                  width={256}
                  height={256}
                  className={styles.image}
                  onError={() =>
                    setImageErrorMap((prev) => ({
                      ...prev,
                      [token.tokenId]: true,
                    }))
                  }
                />
              )}
            </div>
            <div className={styles.info}>
              <p className={styles.tokenId}>ID: {token.tokenId}</p>
              <p className={styles.name}>{token.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NftCard
