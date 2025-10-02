// pages/api/generate-image.ts
import type { NextApiRequest, NextApiResponse } from "next";

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Coloque aqui a URL pública do ngrok do Colab
const COLAB_API_URL = process.env.GOOGLE_COLAB_URL 

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
    const jobResponse = await fetch(`${COLAB_API_URL}/generate-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!jobResponse.ok) {
      throw new Error(`Erro ao criar job: ${jobResponse.statusText}`);
    }

    const { job_id } = await jobResponse.json();

    // 2️⃣ Polling para verificar se a imagem ficou pronta
    let imageData: string | null = null;
    const maxAttempts = 100; // aprox 10 minutos
    const delay = 6000; // 6 segundos

    for (let i = 0; i < maxAttempts; i++) {
      const pollResponse = await fetch(`${COLAB_API_URL}/image/${job_id}`);
      if (!pollResponse.ok) {
        throw new Error(`Erro ao verificar job: ${pollResponse.statusText}`);
      }

      const data = await pollResponse.json();
      if (data.status === "done") {
        imageData = data.image;
        break;
      } else if (data.status === "error") {
        throw new Error(data.error || "Erro desconhecido no job");
      }

      await wait(delay);
    }

    if (!imageData) {
      return res.status(500).json({ error: "Timeout gerando imagem" });
    }

    // Retorna a imagem como URL base64
    res.status(200).json({ url: `data:image/png;base64,${imageData}` });
  } catch (err: any) {
    console.error("Erro ao gerar imagem:", err);
    res.status(500).json({ error: err.message || "Erro ao gerar imagem" });
  }
}
