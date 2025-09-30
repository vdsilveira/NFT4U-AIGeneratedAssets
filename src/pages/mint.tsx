// pages/mint.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function MintPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    // ler do sessionStorage
    const img = sessionStorage.getItem("mintImage");
    const cid = sessionStorage.getItem("mintCID"); // se você usou CID/IPFS
    if (img) {
      setImage(img);
    } else if (cid) {
      // transformar CID em URL pública (ex.: ipfs.io) ou gateway custom
      setImage(`https://ipfs.io/ipfs/${cid}`);
    } else {
      // sem imagem: volta para a página anterior (ou prompt)
      router.replace("/");
    }
  }, [router]);

  const handleMint = async () => {
    if (!image) return;
    setIsMinting(true);
    try {
      // Aqui você implementa sua lógica de mint:
      // - enviar metadata para IPFS (se ainda não tiver feito)
      // - chamar seu smart contract (via wagmi/ethers)
      // - ou chamar sua API que faz o mint server-side
      //
      // Exemplo de pseudo-fluxo:
      // 1) upload metadata JSON para IPFS -> recebe metadataCid
      // 2) call contract.mintToken(owner, `ipfs://metadataCid`)
      //
      // Substitua abaixo com sua implementação:
      await new Promise((r) => setTimeout(r, 1500)); // placeholder

      // limpar sessionStorage ao concluir
      sessionStorage.removeItem("mintImage");
      sessionStorage.removeItem("mintCID");

      // redireciona para página de sucesso / token ou dashboard
      router.push("/mint-success");
    } catch (err) {
      console.error("Erro ao mintar:", err);
      alert("Erro ao mintar. Veja console.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Mint NFT</title>
      </Head>

      <main style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
        <h1>Mint NFT</h1>

        {image ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>
            <div>
              <img
                src={image}
                alt="To mint"
                style={{ width: "100%", maxWidth: 760, height: "auto", borderRadius: 12 }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8 }}>
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="NFT name"
                  style={{ width: "100%", padding: 8, marginTop: 6, borderRadius: 8 }}
                />
              </label>

              <label style={{ display: "block", marginTop: 12 }}>
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description"
                  rows={6}
                  style={{ width: "100%", padding: 8, marginTop: 6, borderRadius: 8 }}
                />
              </label>

              <button
                onClick={handleMint}
                disabled={isMinting}
                style={{
                  marginTop: 12,
                  padding: "10px 16px",
                  backgroundColor: "#10b981",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: isMinting ? "not-allowed" : "pointer",
                }}
              >
                {isMinting ? "Minting..." : "Mint NFT"}
              </button>
            </div>
          </div>
        ) : (
          <p>Carregando imagem...</p>
        )}
      </main>
    </>
  );
}
