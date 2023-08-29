import { Request, Response } from 'express';
import { PlayersFsRepository } from '../repository/player.fs.repository';
import { PlayerController } from './player.controller';

describe('Player controller', () => {
  describe('Correct Path', () => {
    const mockRepo: PlayersFsRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as PlayersFsRepository;

    const playerController = new PlayerController(mockRepo);

    test('should call getAll and return data', async () => {
      const mockData = [
        {
          name: 'Roger',
          nationality: 'String',
          tour: 'ATP',
          titles: 1,
          prizemoney: 1,
          img: 'string',
          id: '1',
        },
      ];
      (mockRepo.getAll as jest.Mock).mockResolvedValue(mockData);
      const mockRequest = {} as Request;
      const mockResponse = { json: jest.fn() } as unknown as Response;
      const mockNextFunction = jest.fn();

      await playerController.getAll(
        mockRequest,
        mockResponse,
        mockNextFunction
      );
      expect(mockRepo.getAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('Error Path', () => {
    const mockRepo: PlayersFsRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as PlayersFsRepository;
    const playerController = new PlayerController(mockRepo);
  });
});
