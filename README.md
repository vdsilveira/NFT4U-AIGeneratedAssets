# Stable Diffusion v1.5 - Local Setup

This repository contains the setup for running Stable Diffusion v1.5 locally to power the NFT4U AI-Generated Assets Platform, an AI-driven solution for creating and managing digital assets for NFTs.

## Prerequisites
- **Node.js and npm**: Install Node.js (LTS version, e.g., 18.x or 20.x) from [nodejs.org](https://nodejs.org/). Verify with:
  ```bash
  node -v
  npm -v
  ```
- **Python**: Install Python 3.8+ from [python.org](https://www.python.org/). Verify with:
  ```bash
  python3 --version
  ```
- **Uvicorn and dependencies**: Ensure Uvicorn and Stable Diffusion dependencies are installed (see setup below).
- Clone this repository and switch to the branch for Stable Diffusion v1.5.

## Setup Instructions

### Step 1: Install Project Dependencies
1. Navigate to the project directory:
   ```bash
   cd ~/Projetos/projetos_pessoais/NFT4U-AIGeneratedAssets
   ```
2. Install Next.js, which is required for the development server:
   ```bash
   npm install next
   ```
3. Install other project dependencies (if not already installed):
   ```bash
   npm install
   ```

### Step 2: Run the Development Server
1. Start the Next.js development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the result.


### Running the Local Model Server
1. Open a **separate terminal** (different from the one used for `npm run dev`).
2. Navigate to the `IA-model` directory:

   ```bash
   cd IA-model/
   ```

3. Start the Uvicorn server with the following command:

   ```bash
   uvicorn server:app --host 0.0.0.0 --port 8000
   ```

4. Once the server starts, you will see an output similar to this:

   ```bash
   Loading pipeline components...: 100% 7/7 [00:00<00:00, 17.64it/s]
   INFO:     Started server process [1622872]
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
   ```

5. The model is now running locally and accessible at [http://0.0.0.0:8000](http://0.0.0.0:8000).

## Conclusion
Your Stable Diffusion v1.5 instance is now running locally. Ensure both the development server and the Uvicorn server are active to interact with the model.