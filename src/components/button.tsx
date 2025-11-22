import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { useAccount } from "wagmi";
import Logo from "./logos";
import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ButtonPage: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  
  

  return (
    <div
  style={{
    position: 'absolute',
    top: '0.0rem',
    left: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 396px', // 🔹 adiciona espaço interno horizontal
    width: 'auto',
    zIndex: 1000,
  }}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
   

    {/* Botão dinâmico: muda texto e rota conforme a página */}
    <button
      onClick={() => {
        if (router.pathname === '/dashboard') {
          router.push('/assets');
        } else {
          router.push('/dashboard');
        }
      }}
      style={{
        height: '40px',
        padding: '0 30px',
        backgroundColor: '#1a73e8',
        color: 'white',
        fontWeight: 600,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '12px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#1559b3';
        e.currentTarget.style.transform = 'scale(1.03)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#1a73e8';
        e.currentTarget.style.transform = 'scale(1.0)';
      }}
    >
      {router.pathname === '/dashboard' ? 'Wallet' : 'Return'}
    </button>
  </div>
</div>

  );
};

export default ButtonPage;
