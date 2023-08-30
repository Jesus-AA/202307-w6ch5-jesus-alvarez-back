import { Request, Response } from 'express';
import { FilmMongoRepository } from '../repository/film.mongo.repository';
import { FilmController } from './film.controller';

describe('FilmsController', () => {
  describe('HappyPath getAll', () => {
    const mockRepo: FilmMongoRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as FilmMongoRepository;

    const filmController = new FilmController(mockRepo);

    test('Should call getAll and return data', async () => {
      const mockData = [{ name: 'Jaja', id: '1' }];
      (mockRepo.getAll as jest.Mock).mockResolvedValue(mockData);
      const mockRequest = {} as Request;
      const mockResponse = { json: jest.fn() } as unknown as Response;
      const mockNext = jest.fn();
      await filmController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('Error Path', () => {
    const mockRepo: FilmMongoRepository = {
      getAll: jest.fn().mockRejectedValue(new Error('GetAll Error')),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as FilmMongoRepository;

    const filmController = new FilmController(mockRepo);

    test('Should throw error when calling getAll', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await filmController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockNext).toHaveBeenCalledWith(new Error('GetAll Error'));
    });
  });
});
