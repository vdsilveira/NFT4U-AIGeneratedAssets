# Setting Up Stable Diffusion 2.1 on Google Colab
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

1. Install Next.js, which is required for the development server:
   ```bash
   npm install next
   ```
2. Install other project dependencies (if not already installed):
   ```bash
   npm install
   ```

### Step 2: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the result.

## Configuration in Google Colab

1. **Access Google Colab**  
   Open the following link in your browser:  
   [https://colab.research.google.com/](https://colab.research.google.com/)

2. **Add the Code**  
   Copy and paste the code from the `__GoogleColab.py__` file into a cell in Google Colab. Ensure you select the GPU runtime environment.

3. **Set Up Ngrok**  
   - Visit [ngrok.com](https://ngrok.com/) and copy your **Authtoken**.  
   - In the `__GoogleColab.py__` file, replace `[YOUR_AUTH_TOKEN_NGROK]` with your token in the following section:

   ```python
   # 1️⃣ Insert your Ngrok Authtoken here
   NGROK_AUTH_TOKEN = "[YOUR_AUTH_TOKEN_NGROK]"
   ```

4. **Run the Cell**  
   After configuring the token, execute the cell in Google Colab. You will receive an output similar to this, containing the public API URL:

   ```bash
   Requirement already satisfied: pyngrok in /usr/local/lib/python3.12/dist-packages (7.4.0)
   Requirement already satisfied: PyYAML>=5.1 in /usr/local/lib/python3.12/dist-packages (from pyngrok) (6.0.2)
   [INFO] Using device: cuda
   Loading pipeline components...: 100% 6/6 [00:21<00:00, 4.12s/it]
   [INFO] **Public API available at: NgrokTunnel:** "https://uncallused-....dev" -> "http://localhost:7860"
   INFO: Started server process [341]
   INFO: Waiting for application startup.
   INFO: Application startup complete.
   INFO: Uvicorn running on http://0.0.0.0:7860 (Press CTRL+C to quit)
   ```

5. **Copy the Public URL**  
   Copy the public URL provided in the output (e.g., `https://uncallused-....dev`) and paste it into your `.env` configuration file:

   ```env
   GOOGLE_COLAB_URL = "https://uncallused-....dev"
   ```

## Conclusion

Done! Your **NFT 4U** instance is now running and accessible via the public API.