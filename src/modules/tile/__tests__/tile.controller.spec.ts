import { Test, TestingModule } from '@nestjs/testing';
import { TileController } from '../tile.controller';
import { TileService } from '../tile.service';

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
    it('should generate a image', () => {
      jest
        .spyOn(tileServiceMock, 'generateImage')
        .mockResolvedValueOnce('fileName');

      const output = controller.generateImage({
        latitude: '50',
        longitude: '50',
      });

      expect(output).toBe('fileName');
    });
  });
});
