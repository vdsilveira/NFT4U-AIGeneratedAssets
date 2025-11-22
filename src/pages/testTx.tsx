import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { FaGithub } from "react-icons/fa";
import { useAccount } from "wagmi";
import { useState } from "react";
import useBlockchain from "../lib/blockchain/useBlockchain";
import Connections from "../lib/blockchain/networkSelect";

import styles from "../styles/Home.module.css";

const TextPage: NextPage = () => {
  const { isConnected } = useAccount();
  const address = Connections();

  // Agora extraímos tanto mintToken quanto GetAssetlist
  const { mintToken, GetAssetlist } = useBlockchain(address);

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [tokens, setTokens] = useState<string[] | null>(null);

  const handleMintClick = async () => {
    if (!mintToken) {
      alert("⚠️ Conecte sua carteira primeiro!");
      return;
    }

    const ipfsURL =
      "https://azure-wooden-mite-506.mypinata.cloud/ipfs/bafybeifvptblqrjgytqezxometaf665slnv7pgdbskbovzdtl6i6oc6bbi";

    const amountStr = window.prompt("Quantos NFTs deseja mintar?", "1");
    if (!amountStr) return;
    const amount = parseInt(amountStr);
    if (isNaN(amount) || amount < 1) {
      alert("Quantidade inválida!");
      return;
    }

    setLoading(true);
    try {
      const txHash = await mintToken(amount, ipfsURL);
      alert(`✅ NFT(s) mintado(s) com sucesso!\nTX: ${txHash}`);
    } catch (err) {
      console.error(err);
      alert("❌ Erro ao mintar NFT, veja o console.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetAssets = async () => {
    if (!GetAssetlist) {
      alert("⚠️ Conecte sua carteira primeiro!");
      return;
    }

   setChecking(true);
    try {
      const result = await GetAssetlist(); // { uris: [...] }
      console.log("Tokens do usuário:", result.uris);

      setTokens(result.uris);

      alert(`Você possui ${result.uris.length} NFT(s).`);
    } catch (err) {
      console.error(err);
      alert("❌ Erro ao buscar seus NFTs, veja o console.");
    } finally {
      setChecking(false);
    }

  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT 4U</title>
        <meta
          name="description"
          content="NFT 4U - AI platform for creating unique NFTs"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 1000,
          display: "flex",
          gap: "1rem",
        }}
      >
        <ConnectButton />

        <button
          onClick={handleMintClick}
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#10b981",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Mintando..." : "Mint NFT"}
        </button>

        <button
          onClick={handleGetAssets}
          disabled={checking}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: checking ? "not-allowed" : "pointer",
          }}
        >
          {checking ? "Checando..." : "Checar meus NFTs"}
        </button>
      </div>

      <main className={styles.main}>
        {tokens && (
          <div style={{ marginTop: "2rem" }}>
            <h2>Seus NFTs:</h2>
            <pre>{JSON.stringify(tokens, null, 2)}</pre>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/vdsilveira"
          rel="noopener noreferrer"
          target="_blank"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          Vdsilveira <FaGithub />
        </a>
      </footer>
    </div>
  );
};

export default TextPage;
