from fastapi import FastAPI
from app.routers import index

app = FastAPI()

app.include_router(index.router)

@app.get("/health")
def health():
    return {"message": "Ok"}
