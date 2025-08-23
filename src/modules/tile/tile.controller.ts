import { Controller, Get, Query } from '@nestjs/common';
import { TileService } from './tile.service';
import type { GenerateImageQuery } from './types';

@Controller('Tile')
export class TileController {
  constructor(private readonly service: TileService) {}

  @Get('generate-image')
  async generateImage(@Query() query: GenerateImageQuery) {
    const output = await this.service.generateImage(query);

    return output;
  }
}
