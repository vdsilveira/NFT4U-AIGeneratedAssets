import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { FaGithub } from "react-icons/fa";
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

import styles from '../styles/Home.module.css';
import ButtonPage from '../components/button';
import NftCard from '../components/NftCard';

const AssetsDashborad: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  // Redireciona para home se desconectar
  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT 4U</title>
      </Head>

      {/* Botões fixos no topo */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 1000,
        display: 'flex',
        gap: '1rem'
      }}>
        <ConnectButton />
        <ButtonPage />
      </div>

      <main className={styles.main}>
        {/* Container centralizado para NFTs */}
        <NftCard />
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

export default AssetsDashborad;
