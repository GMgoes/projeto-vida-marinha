import { Module } from '@nestjs/common';
import { TileController } from './tile.controller';
import { TileService } from './tile.service';

@Module({
  imports: [],
  providers: [TileService],
  controllers: [TileController],
})
export class TileModule {}
