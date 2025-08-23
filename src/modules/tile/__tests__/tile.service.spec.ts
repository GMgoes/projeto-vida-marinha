/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TileService } from '../tile.service';
import { TileController } from '../tile.controller';
import axios from 'axios';
import { GEOGRAPHIC_LAYERS, PROJECTION } from '../types';

jest.mock('fs');
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TileService', () => {
  let service: TileService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [TileService],
      controllers: [TileController],
    }).compile();

    service = app.get<TileService>(TileService);

    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-08-22T12:00:00Z'));
  });

  afterAll(() => jest.useRealTimers());

  describe('generateImage', () => {
    it('should generate a image', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: Buffer.from('Test') });

      const output = await service.generateImage({
        latitude: '50',
        longitude: '50',
        layer: 'MODIS_TERRA',
        projection: 'GEOGRAPHIC',
      });

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(output).toBe('sample/tile_from_epsg4326_2025-08-22_6_40_14.jpg');
    });

    it('should throw an exception if an error occurs', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Fetching error'));

      await expect(
        service.generateImage({
          latitude: '50',
          longitude: '50',
          layer: 'MODIS_TERRA',
          projection: 'GEOGRAPHIC',
        }),
      ).rejects.toThrow('Fetching error');

      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });
});
