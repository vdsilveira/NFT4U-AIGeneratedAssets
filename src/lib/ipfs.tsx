// src/lib/ipfs.ts
export async function uploadImageToIPFS(base64Image: string, fileName: string) {
  try {
    // Converte base64 em Blob
    const res = await fetch(base64Image);
    const blob = await res.blob();

    // Cria um File a partir do Blob
    const file = new File([blob], fileName, { type: blob.type });

    // Prepara o FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("network", "public"); // público

    // Opcional: adicionar metadata
    const metadata = JSON.stringify({
      name: fileName,
      keyvalues: { app: "NFT-4U" },
    });
    formData.append("keyvalues", metadata);

    // Faz upload para o Pinata
    const response = await fetch("https://uploads.pinata.cloud/v3/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: formData,
    });

    const data = await response.json();

    // Retorna link público IPFS
    return `https://gateway.pinata.cloud/ipfs/${data.data.cid}`;
  } catch (error) {
    console.error("Erro ao enviar imagem para IPFS:", error);
    throw error;
  }
}
