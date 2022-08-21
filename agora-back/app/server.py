from typing import List

import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import logic
import models

app = FastAPI(title="Agora hack competition - 'MISSION FAILED' team")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/web/sample", response_model=List[models.WebOutputModel],
          description="Return 10 random non-reference items with predictions")
async def hackathons_root(count: int = 10):
    return logic.web_work_examples(int(count))


@app.post("/web", response_model=List[models.WebOutputModel], description="Input point for web")
async def web_root(input_model: List[models.InputItemModel]):
    return list(map(logic.web_process_item, input_model))


@app.post("/hackathon", response_model=List[models.HackOutputItemModel], description="Input point for hackathon managers")
async def hackathons_root(input_model: List[models.InputItemModel]):
    return list(map(logic.hack_process_item, input_model))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=os.environ.get('BACKEND_PORT', 8000))
