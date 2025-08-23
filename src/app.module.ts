import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TileModule } from './modules/tile/tile.module';
import envConfig from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    TileModule,
  ],
})
export class AppModule {}
