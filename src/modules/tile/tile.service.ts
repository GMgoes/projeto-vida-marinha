import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { GenerateImageQuery, GEOGRAPHIC_LAYERS, PROJECTION } from './types';
import axios from 'axios';

@Injectable()
export class TileService {
  private processLatitudeAndLongitude(
    zoom: number,
    latitude: number,
    longitude: number,
  ) {
    const n = 2 ** zoom;

    const y = Math.floor(((90.0 - latitude) / 180.0) * n);
    const x = Math.floor(((longitude + 180.0) / 360.0) * n);

    return {
      x: Math.max(0, Math.min(n - 1, x)),
      y: Math.max(0, Math.min(n - 1, y)),
    };
  }

  async generateImage({
    latitude,
    longitude,
    zoom = '6',
    ...input
  }: GenerateImageQuery) {
    try {
      const { x, y } = this.processLatitudeAndLongitude(
        Number(zoom),
        Number(latitude),
        Number(longitude),
      );

      const layer = GEOGRAPHIC_LAYERS[input.layer];
      const projection = PROJECTION[input.projection];

      const day = input.day || new Date().toISOString().split('T').at(0);

      const response = await axios.get(
        `https://gibs.earthdata.nasa.gov/wmts/${projection}/best/${layer}/default/${day}/250m/${zoom}/${y}/${x}.jpg`,
        {
          responseType: 'arraybuffer',
        },
      );

      const buffer = Buffer.from(response.data);

      const filename = `sample/tile_from_${projection}_${day}_${zoom}_${x}_${y}.jpg`;

      writeFileSync(filename, buffer);

      return filename;
    } catch (error) {
      console.error('Tile > Service > Error', error);
      throw error;
    }
  }
}
