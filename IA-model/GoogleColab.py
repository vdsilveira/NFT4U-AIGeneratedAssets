!pip install pyngrok
# server_async_colab.py
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
import torch
import base64
from io import BytesIO
import uuid
import nest_asyncio
import uvicorn
from pyngrok import ngrok  # ngrok for public URL

# necessary to run FastAPI inside Jupyter/Colab
nest_asyncio.apply()

app = FastAPI()

# ---------------- Device configuration ----------------
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"[INFO] Using device: {device}")

# Load the model in FP16 if using GPU to save VRAM
pipe = StableDiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-2-1",
    torch_dtype=torch.float16 if device == "cuda" else torch.float32
)

pipe = pipe.to(device)

# ---------------- Jobs dictionary ----------------
jobs = {}  # {job_id: base64_image or None}

class Prompt(BaseModel):
    prompt: str

# ---------------- Image generation function ----------------
def generate_image_job(prompt: str, job_id: str):
    print(f"[INFO] Generating image for job {job_id}")
    result = pipe(prompt, guidance_scale=7.5)
    image = result.images[0]
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
    jobs[job_id] = img_str
    print(f"[INFO] Job {job_id} completed")

# ---------------- Routes ----------------
@app.post("/generate-image")
async def generate_image(data: Prompt, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = None  # initialize as pending
    background_tasks.add_task(generate_image_job, data.prompt, job_id)
    return {"job_id": job_id}

@app.get("/image/{job_id}")
async def get_image(job_id: str):
    if job_id not in jobs:
        return {"status": "error", "error": "Invalid Job ID"}
    if jobs[job_id] is None:
        return {"status": "pending"}
    return {"status": "done", "image": jobs[job_id]}

# ---------------- START: ngrok with authentication ----------------
if __name__ == "__main__":
    # 1️⃣ Place your ngrok AuthToken here
    NGROK_AUTH_TOKEN = [YOUR_AUTH_TOKEN_NGROK]  # <---------------
    ngrok.set_auth_token(NGROK_AUTH_TOKEN)

    # 2️⃣ Connect ngrok to port 7860
    public_url = ngrok.connect(7860)
    print(f"[INFO] Public API available at: {public_url}")

    # 3️⃣ Start the FastAPI server
    uvicorn.run(app, host="0.0.0.0", port=7860)
