import { Test, TestingModule } from '@nestjs/testing';
import { TileController } from '../tile.controller';
import { TileService } from '../tile.service';
import { GEOGRAPHIC_LAYERS, PROJECTION } from '../types';

const tileServiceMock = { generateImage: jest.fn() };

describe('TileController', () => {
  let controller: TileController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [{ provide: TileService, useValue: tileServiceMock }],
      controllers: [TileController],
    }).compile();

    controller = app.get<TileController>(TileController);
  });

  describe('generateImage', () => {
    it('should generate a image', async () => {
      jest
        .spyOn(tileServiceMock, 'generateImage')
        .mockResolvedValueOnce('sample/tile_2025-08-22_8_163_56.jpg');

      const output = await controller.generateImage({
        latitude: '50',
        longitude: '50',
        layer: 'MODIS_TERRA',
        projection: 'GEOGRAPHIC',
      });

      expect(output).toBe('sample/tile_2025-08-22_8_163_56.jpg');
    });
  });
});
