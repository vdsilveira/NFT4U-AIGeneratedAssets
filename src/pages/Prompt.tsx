import React, { useState } from "react";
import useBlockchain from "../lib/blockchain/useBlockchain"; // hook com mintToken
import Connections from "../lib/blockchain/networkSelect";


interface PromptProps {
  onSubmit: (prompt: string) => Promise<string>; // retorna imagem Base64
}

const Prompt: React.FC<PromptProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [amount, setAmount] = useState<number>(1);
   const address= Connections();

  const { mintToken } = useBlockchain(address);

  

  // Gera imagem do prompt
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const base64Url = await onSubmit(prompt);
      setImageUrl(base64Url);
      setPrompt("");
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
    } finally {
      setLoading(false);
    }
  };

  // Abre caixa de quantidade
  const handleMintClick = () => {
    setShowAmountInput(true);
  };

  // Mint NFT chamando blockchain
  const handleMintConfirm = async () => {
    if (!imageUrl) return;
    if (!mintToken) {
      alert("Conecte sua carteira primeiro!");
      return;
    }

    setLoading(true);
    try {
      // Envia imagem para IPFS
      const res = await fetch("/api/upload-ipfs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar para IPFS");

      const ipfsUrl = data.url;

      // Chama mintToken
      const txHash = await mintToken(amount, ipfsUrl);
      alert(`NFT(s) mintado(s) com sucesso! TX: ${txHash}`);
      setShowAmountInput(false);
      setImageUrl(null);
    setShowAmountInput(false);
    } catch (err) {
      console.error("Erro ao mintar NFT:", err);
      alert("Erro ao mintar NFT, veja console.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageUrl(null);
    setShowAmountInput(false);
    setAmount(1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "1200px",
        margin: "4rem auto",
        gap: "1rem",
        padding: "0 1rem",
      }}
    >
      {!imageUrl ? (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Digite seu prompt aqui..."
            rows={8}
            style={{
              width: "100%",
              minHeight: "100px",
              fontSize: "1.1rem",
              padding: "1rem",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              outline: "none",
              resize: "vertical",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {loading && <div className="spinner" />}
            {loading ? "Gerando imagem..." : "Enviar Prompt"}
          </button>

          <style jsx>{`
            .spinner {
              border: 3px solid rgba(255, 255, 255, 0.3);
              border-top: 3px solid #fff;
              border-radius: 50%;
              width: 16px;
              height: 16px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </form>
      ) : (
        <div style={{ textAlign: "center" }}>
          {loading && <div className="spinner" style={{ margin: "1rem auto" }} />}
          <img
            src={imageUrl}
            alt="Imagem gerada"
            width={400}
            height={400}
            style={{
              maxWidth: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          />

          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button
              onClick={handleReset}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>

            {!showAmountInput && (
              <button
                onClick={handleMintClick}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#10b981",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Mint NFT
              </button>
            )}

            {showAmountInput && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  style={{
                    width: "80px",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    textAlign: "center",
                  }}
                />
                <button
                  onClick={handleMintConfirm}
                  disabled={loading}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#10b981",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {loading ? "Mintando..." : "Confirmar"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Prompt;
