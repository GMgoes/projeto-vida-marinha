from pydantic import BaseModel

class GenerateImageResponse(BaseModel):
    fileName: str
