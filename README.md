```markdown
# NFT 4U – AI Generated NFT Creator
**IA382A – Seminars in Computer Engineering**

## 📌 Project Description

This project was developed as the final assignment for the course **IA382A – Seminars in Computer Engineering**, based on the seminar “*Overview of Blockchain: Concepts, Applications, and Relevant Initiatives*”.

The main goal is to demonstrate, in a practical and fully functional way, the **integration of Artificial Intelligence and 
Blockchain** to create an innovative digital product.

## 🎥 Demo Video

[![NFT 4U – Full Demo (click to watch on YouTube)](https://img.youtube.com/vi/Uxuyz1IH6UA/maxresdefault.jpg)](https://www.youtube.com/watch?v=Uxuyz1IH6UA)


[![Demonstração em vídeo](https://www.youtube.com/watch?v=Uxuyz1IH6UA)](https://www.youtube.com/watch?v=Uxuyz1IH6UA)]

*Watch the complete demonstration: from text prompt to AI-generated image and NFT minting preparation (1:30 min)*



### ✨ dApp Features

1. **AI Image Generation**  
   Users submit text prompts to state-of-the-art generative models:
   - Stable Diffusion v1.5
   - Stable Diffusion 2.1
   - SDXL Turbo (final version – high speed and quality)

2. **Unique Digital Artwork Creation**  
   The AI generates a 100% original image based on the prompt.

3. **NFT Minting**  
   The generated image can be minted as an NFT using smart contracts, ensuring:
   - Immutable ownership
   - Verifiable authenticity
   - Full traceability
   - Digital scarcity

4. **AI-Generated Branding**  
   The entire branding, logos, and visual identity of the project were also created using AI tools, reinforcing the concept of complete AI–Blockchain integration.

## 🔀 Branch History & Tested Models

During development, different branches were created to test various models and execution environments:

| Branch                          | Description                                              | Environment     |
|---------------------------------|----------------------------------------------------------|-----------------|
| `local-model-diffusion-v1-5`    | Stable Diffusion 1.5 running locally                     | CPU             |
| `diffusion-2.1-on-google-colab` | Stable Diffusion 2.1 with GPU acceleration               | Google Colab    |
| `main_sdxl-turbo`               | **Final version** – SDXL Turbo (high speed + quality)    | Google Colab + GPU |

Each branch documents the lessons learned regarding performance, image quality, and execution feasibility.

## 🚀 How to Run the Project

### 🟦 1. Frontend (Next.js)

#### Prerequisites
- Node.js 18.x or 20.x
- npm or yarn
- Git
- Code editor (VS Code recommended)

#### Steps

```bash
# Check versions
node -v
npm -v

# Clone and enter the project
git clone <your-repository>
cd nft-4u

# Install dependencies
npm install

# Start development server
npm run dev
```

Open: **http://localhost:3000**

### 🤖 2. AI Backend (Google Colab + FastAPI + SDXL Turbo)

#### Step-by-step

1. Go to: https://colab.research.google.com/
2. Create a new notebook
3. Paste the entire content of the file `GoogleColab.py` into a cell
4. **Important**: `Runtime > Change runtime type > Hardware accelerator > GPU`
5. Set up NGROK:
   - Create an account at https://ngrok.com
   - Copy your **Authtoken**
   - Replace in the code:
     ```python
     NGROK_AUTH_TOKEN = "YOUR_TOKEN_HERE"
     ```
6. Run the cell

You should see something like:
```
[INFO] Using device: cuda
Loading pipeline components...: 100%
[INFO] Public URL: NgrokTunnel: "https://abcd1234.ngrok-free.app"
INFO: Uvicorn running on http://0.0.0.0:7860
```

7. Copy the public ngrok URL (e.g., `https://abcd1234.ngrok-free.app`)
8. In the frontend’s `.env` file (project root), add:
   ```env
   GOOGLE_COLAB_URL="https://abcd1234.ngrok-free.app"
   ```


```markdown
[![NFT 4U – Demo Video](https://img.youtube.com/vi/SEU_VIDEO_AQUI/maxresdefault.jpg)](https://www.youtube.com/watch?v=SEU_VIDEO_AQUI)
```

*(Just replace `SEU_VIDEO_AQUI` with your actual YouTube video ID)*

## 🎉 Done! Everything is running!

You now have:
- Next.js frontend running locally
- AI backend with SDXL Turbo on Google Colab
- Public API exposed via NGROK
- Prompt-to-image generation
- System ready for NFT minting on blockchain

