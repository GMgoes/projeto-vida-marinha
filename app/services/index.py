import requests
from datetime import date

def latlon_to_tile(latitude: float, longitude: float, zoom: int = 8) -> tuple[int, int]:
    n = 2 ** zoom

    y = int((90.0 - latitude) / 180.0 * n)
    x = int((longitude + 180.0) / 360.0 * n)

    x = max(0, min(n - 1, x))
    y = max(0, min(n - 1, y))

    #A "tile" is a small, square image that represents a specific portion of a map or satellite imagery.
    #Instead of downloading a single large image for an entire area, mapping services divide the map into many tiles.
    #Each tile is identified by coordinates X (horizontal), Y (vertical), and Z (zoom level), forming a grid.
    #Tiles allow efficient map rendering, fast downloads, and easy scaling across different zoom levels.
    return x, y

def download_tile(latitude: float, longitude: float, zoom: int = 8) -> str:
    x, y = latlon_to_tile(latitude, longitude, zoom)

    today = date.today().isoformat()

    mode = "MODIS_Terra_CorrectedReflectance_Bands721"

    url = (f"https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/{mode}/default/{today}/250m/{zoom}/{y}/{x}.jpg")

    response = requests.get(url)

    if response.status_code == 200:
        filename = f"tile_{today}_{zoom}_{x}_{y}.jpg"
        with open(filename, "wb") as f:
            f.write(response.content)
        return filename
    else:
        raise Exception(f"Error: {response.status_code}")
