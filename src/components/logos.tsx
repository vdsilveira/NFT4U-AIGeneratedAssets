import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import styles from '../styles/Home.module.css';
import { FaGithub } from "react-icons/fa";

const Logo: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  return (
    <div 
      className={styles.container}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        gap: '20px', // espaçamento entre elementos
      }}
    >
      <img 
        src="https://azure-wooden-mite-506.mypinata.cloud/ipfs/bafkreifyqrpz4dy7a24kgieyxwnh2h5figmlipjzha2ge64bwbay6fenmu" 
        alt="Logo" 
        style={{ maxWidth: '300px', height: '300px' }}
      />

      <ConnectButton />

      <h1 style={{ maxWidth: '600px', fontSize: '1.5rem' }}>
        Welcome to the AI platform for creating unique, non-fungible digital assets.
      </h1>
    </div>
  );
};

export default Logo;
