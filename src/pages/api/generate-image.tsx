// pages/api/generate-image.ts
import type { NextApiRequest, NextApiResponse } from "next";

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt inválido" });
  }

  try {
    // 1️⃣ Envia prompt para criar o job
    const jobResponse = await fetch("http://localhost:8000/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const { job_id } = await jobResponse.json();

    // 2️⃣ Polling para verificar se a imagem ficou pronta
    let imageData = null;
    for (let i = 0; i < 100; i++) { // tenta por 100 vezes (aprox 10 minutos)
      const pollResponse = await fetch(`http://localhost:8000/image/${job_id}`);
      const data = await pollResponse.json();
      if (data.status === "done") {
        imageData = data.image;
        break;
      }
      await wait(6000); // espera 6 segundos antes de tentar de novo
    }

    if (!imageData) {
      return res.status(500).json({ error: "Timeout gerando imagem" });
    }

    res.status(200).json({ url: `data:image/png;base64,${imageData}` });
  } catch (err) {
    console.error("Erro ao gerar imagem:", err);
    res.status(500).json({ error: "Erro ao gerar imagem" });
  }
}
