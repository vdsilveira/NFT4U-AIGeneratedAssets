import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { FaGithub } from "react-icons/fa";
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css';
import Prompt from './Prompt';

const Dashboard: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  // Estados do Prompt
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redireciona para home se desconectar
  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  // Função que chama o backend e retorna a URL da imagem
  const handlePromptSubmit = async (prompt: string): Promise<string> => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url); // salva a imagem no estado
        return data.url;
      } else {
        console.error("Nenhuma imagem retornada");
        return '';
      }
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
      return '';
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT 4U</title>
      </Head>

      <main className={styles.main}>
        <div style={{
          position: 'absolute',
          top: '1rem',    
          left: '1rem',  
          zIndex: 1000,   
        }}>
          <ConnectButton />
        </div>

        {/* Prompt centralizado e estilizado */}
        <Prompt onSubmit={handlePromptSubmit} />

        {/* A imagem agora já é controlada pelo Prompt */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/vdsilveira"
          rel="noopener noreferrer"
          target="_blank"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
        >
          Vdsilveira <FaGithub />
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;
