import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';

@Injectable()
export class TileService {
  private processLatitudeAndLongitude(
    latitude: number,
    longitude: number,
    zoom: number = 8,
  ) {
    const n = 2 ** zoom;

    const y = Math.floor(((90.0 - latitude) / 180.0) * n);
    const x = Math.floor(((longitude + 180.0) / 360.0) * n);

    return {
      x: Math.max(0, Math.min(n - 1, x)),
      y: Math.max(0, Math.min(n - 1, y)),
    };
  }

  async generateImage(
    latitude: string,
    longitude: string,
    zoom: number = 8,
  ): Promise<string> {
    const { x, y } = this.processLatitudeAndLongitude(
      Number(latitude),
      Number(longitude),
      zoom,
    );

    const today = new Date().toISOString().split('T').at(0);

    const mode = 'MODIS_Terra_CorrectedReflectance_Bands721';

    const url = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/${mode}/default/${today}/250m/${zoom}/${y}/${x}.jpg`;

    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error - ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());

    const filename = `sample/tile_${today}_${zoom}_${x}_${y}.jpg`;

    writeFileSync(filename, buffer);

    return filename;
  }
}
