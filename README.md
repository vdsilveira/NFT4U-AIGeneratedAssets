# Stable Diffusion v1.5 - Local Setup

This guide explains how to set up and run Stable Diffusion v1.5 locally on your machine.

## Getting Started

### Prerequisites
- Ensure you have the necessary dependencies installed, including Python, Uvicorn, and the required model libraries.
- Clone the repository and switch to the branch for Stable Diffusion v1.5.

### Running the Development Server
1. Open a terminal and navigate to the project directory.
2. Start the development server by running:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the result.

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