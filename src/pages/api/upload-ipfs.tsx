// src/pages/api/upload-ipfs.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { POST_Ipfs } from "../../lib/IPfs_registry";


export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Nenhuma imagem enviada" });
    }

    const url = await POST_Ipfs(image);
    return res.status(200).json({ url });
  } catch (e: any) {
    console.error("Erro no handler:", e);
    return res.status(500).json({ error: e.message || "Erro interno" });
  }
}
