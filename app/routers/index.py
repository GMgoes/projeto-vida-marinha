from fastapi import APIRouter, Query
from app.services.index import download_tile
from app.models.index import GenerateImageResponse

router = APIRouter()

@router.get("/generate-image", response_model=GenerateImageResponse)
def generate_image(
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location"),
):

    fileName = download_tile(latitude, longitude)

    return GenerateImageResponse(
        fileName=fileName
    )