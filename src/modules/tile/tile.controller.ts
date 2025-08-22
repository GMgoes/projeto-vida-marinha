import { Controller, Get, Query } from '@nestjs/common';
import { TileService } from './tile.service';

@Controller('tile')
export class TileController {
  constructor(private readonly service: TileService) {}

  @Get('generate-image')
  async generateImage(@Query() query: { latitude: string; longitude: string }) {
    const { latitude, longitude } = query;

    const output = await this.service.generateImage(latitude, longitude);

    return output;
  }
}
