import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { FaGithub } from "react-icons/fa";
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

import styles from '../styles/Home.module.css';
// import Logo from '.logo';

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  // Redireciona para home se desconectar
  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT 4U</title>
        <meta name="description" content="NFT 4U - AI platform for creating unique NFTs" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      {/* Botão de conectar no canto superior esquerdo */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 1000,
      }}>
        <ConnectButton />
      </div>

      <main className={styles.main}>
        {/* <Logo /> */}

        <h1 className={styles.title}>
          Welcome to the AI platform for creating unique, non-fungible digital assets.
        </h1>
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

export default Home;
