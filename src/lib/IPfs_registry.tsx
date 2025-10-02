import { PinataSDK } from "pinata";
import { Blob } from "node:buffer"; // só precisamos do Blob do Node

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL!,
});

export async function POST_Ipfs(base64Image: string): Promise<string> {
  try {
    // separa header (data:image/png;base64,...) do conteúdo
    const arr = base64Image.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = Buffer.from(arr[1], "base64");

    // cria um Blob
    const blob = new Blob([bstr], { type: mime });

    // força o cast para File (o SDK aceita, mas TS reclama)
    const file = blob as unknown as File;

    // faz upload para a Pinata
    const { cid } = await pinata.upload.public.file(file);

    // converte para URL pública
    const url = await pinata.gateways.public.convert(cid);

    console.log("✅ Arquivo enviado para IPFS:", url);
    return url;
  } catch (e) {
    console.error("❌ Erro no POST_Ipfs:", e);
    throw new Error("Erro ao enviar para o IPFS");
  }
}
