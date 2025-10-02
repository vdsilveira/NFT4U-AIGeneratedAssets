# server_async.py
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
import torch
import base64
from io import BytesIO
import uuid

app = FastAPI()

device = "cuda" if torch.cuda.is_available() else "cpu"
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-2-1")
pipe = pipe.to(device)

jobs = {}  # {job_id: base64_image or None}

class Prompt(BaseModel):
    prompt: str

def generate_image_job(prompt: str, job_id: str):
    result = pipe(prompt, guidance_scale=7.5)
    image = result.images[0]
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
    jobs[job_id] = img_str

@app.post("/generate-image")
async def generate_image(data: Prompt, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = None  # inicializa como pendente
    background_tasks.add_task(generate_image_job, data.prompt, job_id)
    return {"job_id": job_id}

@app.get("/image/{job_id}")
async def get_image(job_id: str):
    if job_id not in jobs:
        return {"status": "error", "error": "Job ID inválido"}
    if jobs[job_id] is None:
        return {"status": "pending"}
    return {"status": "done", "image": jobs[job_id]}
