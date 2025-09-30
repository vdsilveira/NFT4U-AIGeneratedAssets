import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface PromptProps {
  onSubmit: (prompt: string) => Promise<string>; // retorna a URL da imagem
}

const Prompt: React.FC<PromptProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const url = await onSubmit(prompt);
      setImageUrl(url); 
      setPrompt('');
    } catch (err) {
      console.error('Erro ao enviar prompt:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageUrl(null);
  };

  const handleMint = () => {
    router.push('/mint');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '4rem auto',
        gap: '1rem',
        padding: '0 1rem',
      }}
    >
      {!imageUrl ? (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Digite seu prompt aqui..."
            rows={8}
            style={{
              width: '100%',
              minHeight: '100px',
              fontSize: '1.1rem',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #d1d5db',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              outline: 'none',
              resize: 'vertical',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: '#fff',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {loading && <div className="spinner" />}
            {loading ? 'Gerando imagem...' : 'Enviar Prompt'}
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
        <div style={{ textAlign: 'center' }}>
          {loading && <div className="spinner" style={{ margin: '1rem auto' }} />}
          <img
            src={imageUrl}
            alt="Imagem gerada"
            width={400}
            height={400}
            style={{
              maxWidth: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={handleReset}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>

            <button
              onClick={handleMint}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#10b981',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Mint NFT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prompt;
